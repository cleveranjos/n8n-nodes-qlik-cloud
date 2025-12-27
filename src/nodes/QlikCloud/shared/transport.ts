import type {
	IExecuteFunctions,
	IHttpRequestOptions,
	IHttpRequestMethods,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

export async function qlikApiRequest(
	this: IExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body?: Record<string, any>,
	qs?: Record<string, any>,
): Promise<Record<string, any>> {
	const credentials = await this.getCredentials('qlikCloudApi');

	if (!credentials) {
		throw new NodeApiError(this.getNode(), {
			message: 'No credentials found for Qlik Cloud API',
		} as any);
	}

	const baseUrl = credentials.baseUrl as string;
	const accessToken = credentials.accessToken as string;

	const options: IHttpRequestOptions = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'Content-Type': 'application/json',
		},
		method,
		url: `${baseUrl}${endpoint}`,
		qs,
	};

	if (body !== undefined) {
		options.body = body;
	}

	try {
		return await this.helpers.httpRequest(options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), {
			message: (error as Error).message,
		} as any);
	}
}
