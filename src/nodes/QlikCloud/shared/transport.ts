import type {
	IAdditionalCredentialOptions,
	IExecuteFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

export async function qlikApiRequest(
	this: IExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body?: any,
	qs?: Record<string, any>,
	returnFullResponse: boolean = false,
	extraOptions: Partial<IHttpRequestOptions> = {},
): Promise<any> {
	const authenticationMethod = this.getNodeParameter('authentication', 0) as 'apiToken' | 'oAuth2';
	const credentialType = authenticationMethod === 'oAuth2' ? 'qlikCloudOAuth2Api' : 'qlikCloudApi';
	const credentials = await this.getCredentials(credentialType);

	if (!credentials) {
		throw new NodeApiError(this.getNode(), {
			message: `No credentials found for Qlik Cloud API (${authenticationMethod === 'oAuth2' ? 'OAuth2' : 'API Token'})`,
		} as any);
	}

	const rawBaseUrl = credentials.baseUrl as string | undefined;
	if (!rawBaseUrl) {
		throw new NodeApiError(this.getNode(), {
			message: 'Base URL is missing in the selected Qlik Cloud credentials',
		} as any);
	}

	let parsedBase: URL;
	try {
		parsedBase = new URL(rawBaseUrl);
	} catch {
		throw new NodeApiError(this.getNode(), {
			message: 'Base URL is not a valid URL. Expected format: https://{tenant}.{region}.qlikcloud.com',
		} as any);
	}

	if (parsedBase.protocol !== 'https:') {
		throw new NodeApiError(this.getNode(), {
			message: 'Base URL must use https://',
		} as any);
	}

	const normalizedBaseUrl = `${parsedBase.origin}${parsedBase.pathname.replace(/\/+$/, '')}`;
	const url = new URL(endpoint.startsWith('/') ? endpoint : `/${endpoint}`, `${normalizedBaseUrl}/`).toString();

	const baseHeaders = {
		'Content-Type': 'application/json',
		...(extraOptions.headers || {}),
	};

	const options: IHttpRequestOptions = {
		method,
		url,
		qs,
		returnFullResponse,
		...extraOptions,
		json: extraOptions.json ?? true,
		headers: baseHeaders,
	};

	if (authenticationMethod === 'apiToken') {
		const accessToken = credentials.accessToken as string;
		options.headers = {
			Authorization: `Bearer ${accessToken}`,
			...baseHeaders,
		};
	}

	if (body !== undefined) {
		options.body = body;
	}

	try {
		if (authenticationMethod === 'oAuth2') {
			const oauthBase = `${parsedBase.origin}/oauth`;
			const additionalCredentialOptions: IAdditionalCredentialOptions = {
				credentialsDecrypted: {
					...credentials,
					authUrl: (credentials as any).authUrl || `${oauthBase}/authorize`,
					accessTokenUrl: (credentials as any).accessTokenUrl || `${oauthBase}/token`,
				},
			};

			return await this.helpers.httpRequestWithAuthentication.call(
				this,
				credentialType,
				options,
				additionalCredentialOptions,
			);
		}

		return await this.helpers.httpRequest(options);
	} catch (error) {
		const errMessage = error instanceof Error ? error.message : typeof error === 'string' ? error : JSON.stringify(error);
		throw new NodeApiError(this.getNode(), { message: errMessage }, {
			message: 'Qlik Cloud API request failed',
		} as any);
	}
}
