import type {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class QlikCloudApi implements ICredentialType {
	name = 'qlikCloudApi';
	displayName = 'Qlik Cloud API';
	documentationUrl = 'https://qlik.dev/apis/rest/';

	properties: INodeProperties[] = [
		{
			displayName: 'Tenant URL',
			name: 'baseUrl',
			type: 'string',
			default: '',
			required: true,
			placeholder: 'https://{tenant}.{region}.qlikcloud.com',
			description: 'The base URL of your Qlik Cloud tenant',
		},
		{
			displayName: 'API Key (Access Token)',
			name: 'accessToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Bearer token for API authentication. Generate from Qlik Cloud console',
		},
	];
}
