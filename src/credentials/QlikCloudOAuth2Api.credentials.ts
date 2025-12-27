import type { ICredentialType, INodeProperties } from 'n8n-workflow';

const DEFAULT_SCOPES = ['openid', 'profile', 'email', 'offline_access'];

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
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'hidden',
			default: '',
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'string',
			default: DEFAULT_SCOPES.join(' '),
			description: 'OAuth2 scopes requested from Qlik Cloud (space-separated)',
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
		let parsed: URL;

		try {
			parsed = new URL(baseUrl);
		} catch (error) {
			throw new Error('Invalid Qlik Cloud tenant URL format');
		}

		if (parsed.protocol !== 'https:') {
			throw new Error('Qlik Cloud tenant URL must use HTTPS');
		}

		if (!parsed.hostname.endsWith('.qlikcloud.com')) {
			throw new Error('Tenant URL must end with .qlikcloud.com');
		}

		const oauthBase = `${parsed.origin}/oauth`;

		credentials.authUrl = `${oauthBase}/authorize`;
		credentials.accessTokenUrl = `${oauthBase}/token`;

		if (!credentials.scope) {
			credentials.scope = DEFAULT_SCOPES.join(' ');
		}

		return credentials;
	}
}
