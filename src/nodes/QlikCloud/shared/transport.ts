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
	const credentials = await this.getCredentials('qlikCloudApi');

	if (!credentials) {
		throw new NodeApiError(this.getNode(), {
			message: 'No credentials found for Qlik Cloud API',
		} as any);
	}

	const baseUrl = (credentials.baseUrl as string).replace(/\/+$/, '');
	const accessToken = credentials.accessToken as string;
	const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

	const headers = {
		Authorization: `Bearer ${accessToken}`,
		'Content-Type': 'application/json',
		...(extraOptions.headers || {}),
	};

	const options: IHttpRequestOptions = {
		method,
		url,
		qs,
		json: extraOptions.json ?? true,
		returnFullResponse,
		...extraOptions,
		headers,
	};

	if (body !== undefined) {
		options.body = body;
	}

	try {
		return await this.helpers.httpRequest(options);
	} catch (error) {
		const errMessage = error instanceof Error ? error.message : typeof error === 'string' ? error : JSON.stringify(error);
		throw new NodeApiError(this.getNode(), { message: errMessage }, {
			message: 'Qlik Cloud API request failed',
		} as any);
	}
}
