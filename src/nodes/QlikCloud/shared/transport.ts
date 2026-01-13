import type {
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

	const baseUrl = (credentials.baseUrl as string).replace(/\/+$/, '');
	const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

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
			return await this.helpers.httpRequestWithAuthentication.call(this, credentialType, options);
		}

		return await this.helpers.httpRequest(options);
	} catch (error) {
		const errMessage = error instanceof Error ? error.message : typeof error === 'string' ? error : JSON.stringify(error);
		throw new NodeApiError(this.getNode(), { message: errMessage }, {
			message: 'Qlik Cloud API request failed',
		} as any);
	}
}
