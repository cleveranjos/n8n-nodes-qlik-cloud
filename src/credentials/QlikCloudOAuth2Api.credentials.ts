import type {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

const scopes = [
	'https://analysis.windows.net/powerbi/api/.default',
];

export class QlikCloudOAuth2Api implements ICredentialType {
	name = 'qlikCloudOAuth2Api';
	displayName = 'Qlik Cloud OAuth2 API';
	documentationUrl = 'https://qlik.dev/authenticate/';
	extends = ['oAuth2Api'];

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
			displayName: 'Authorization URL',
			name: 'authUrl',
			type: 'hidden',
			default: '',
			required: true,
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'hidden',
			default: '',
			required: true,
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'hidden',
			default: scopes.join(' '),
			description: 'OAuth2 scopes required for Qlik Cloud API access',
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'hidden',
			default: 'body',
		},
	];

	async preAuthentication(this: any, credentials: any) {
		const baseUrl = credentials.baseUrl as string;
		
		// Extract tenant and region from base URL
		// Expected format: https://tenant.region.qlikcloud.com
		const urlParts = new URL(baseUrl);
		const hostname = urlParts.hostname;
		const parts = hostname.split('.');
		
		if (parts.length < 3) {
			throw new Error('Invalid Qlik Cloud tenant URL format');
		}

		const tenant = parts[0];
		const region = parts[1];

		// Construct OAuth endpoints
		const authEndpoint = `https://auth.${region}.qlikcloud.com/oauth/authorize`;
		const tokenEndpoint = `https://auth.${region}.qlikcloud.com/oauth/token`;

		credentials.authUrl = authEndpoint;
		credentials.accessTokenUrl = tokenEndpoint;
		
		return credentials;
	}
}
