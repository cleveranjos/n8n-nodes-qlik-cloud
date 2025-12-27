import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import { qlikApiRequest } from './shared/transport';
import { appDescription } from './resources/apps/index';
import { assistantDescription } from './resources/assistants/index';
import { auditDescription } from './resources/audits/index';
import { itemDescription } from './resources/items/index';

const DEFAULT_PAGE_SIZE = 100;

function extractPageItems(response: any): any[] {
	const payload = response?.data ?? response;

	if (Array.isArray(payload)) {
		return payload;
	}

	if (payload === undefined || payload === null) {
		return [];
	}

	return [payload];
}

function extractNextCursor(response: any): string | undefined {
	const nextLink = response?.links?.next;
	const href = typeof nextLink === 'string' ? nextLink : nextLink?.href;

	if (typeof href === 'string' && href.length) {
		try {
			const url = href.startsWith('http') ? new URL(href) : new URL(href, 'https://qlik.cloud');
			return url.searchParams.get('next') ?? undefined;
		} catch {
			return undefined;
		}
	}

	if (typeof response?.next === 'string') {
		return response.next;
	}

	if (typeof response?.meta?.next === 'string') {
		return response.meta.next;
	}

	return undefined;
}

async function fetchPaginatedResults(
	context: IExecuteFunctions,
	endpoint: string,
	filters: Record<string, any>,
	limit?: number,
	pageSize: number = DEFAULT_PAGE_SIZE,
): Promise<any[]> {
	const collected: any[] = [];
	let cursor: string | undefined;

	do {
		const qs: Record<string, any> = { ...filters };
		const chunkSize = limit === undefined ? pageSize : Math.min(pageSize, limit - collected.length);

		if (chunkSize <= 0) {
			break;
		}

		qs.limit = chunkSize;

		if (cursor) {
			qs.next = cursor;
		}

		const response = await qlikApiRequest.call(context, 'GET', endpoint, undefined, qs);
		const pageItems = extractPageItems(response);
		collected.push(...pageItems);

		cursor = extractNextCursor(response);
	} while (cursor && (limit === undefined || collected.length < limit));

	return limit === undefined ? collected : collected.slice(0, limit);
}

async function handleAppsResource(operation: string, context: IExecuteFunctions): Promise<any> {
	if (operation === 'getAll') {
		const returnAll = context.getNodeParameter('returnAll', 0) as boolean;
		const limit = returnAll ? undefined : (context.getNodeParameter('limit', 0) as number);
		const options = context.getNodeParameter('options', 0) as any;

		const qs: Record<string, any> = {};
		if (options.name) {
			qs.name = options.name;
		}
		if (options.spaceId) {
			qs.spaceId = options.spaceId;
		}

		return await fetchPaginatedResults(context, '/api/v1/apps', qs, limit);
	}

	if (operation === 'get') {
		const appId = context.getNodeParameter('appId', 0) as string;
		return await qlikApiRequest.call(context, 'GET', `/api/v1/apps/${appId}`);
	}

	if (operation === 'create') {
		const name = context.getNodeParameter('name', 0) as string;
		const options = context.getNodeParameter('options', 0) as any;

		const body = { attributes: { name } };
		if (options.description) {
			(body.attributes as any).description = options.description;
		}
		if (options.locale) {
			(body.attributes as any).locale = options.locale;
		}
		if (options.spaceId) {
			(body.attributes as any).spaceId = options.spaceId;
		}

		return await qlikApiRequest.call(context, 'POST', '/api/v1/apps', body);
	}

	if (operation === 'update') {
		const appId = context.getNodeParameter('appId', 0) as string;
		const body = context.getNodeParameter('body', 0) as any;
		return await qlikApiRequest.call(context, 'PUT', `/api/v1/apps/${appId}`, body);
	}

	if (operation === 'delete') {
		const appId = context.getNodeParameter('appId', 0) as string;
		await qlikApiRequest.call(context, 'DELETE', `/api/v1/apps/${appId}`);
		return { success: true };
	}

	if (operation === 'copy') {
		const appId = context.getNodeParameter('appId', 0) as string;
		const name = context.getNodeParameter('name', 0) as string;
		const options = context.getNodeParameter('options', 0) as any;

		const body = { attributes: { name } };
		if (options.description) {
			(body.attributes as any).description = options.description;
		}
		if (options.spaceId) {
			(body.attributes as any).spaceId = options.spaceId;
		}

		return await qlikApiRequest.call(context, 'POST', `/api/v1/apps/${appId}/copy`, body);
	}

	if (operation === 'export') {
		const appId = context.getNodeParameter('appId', 0) as string;
		return await qlikApiRequest.call(context, 'POST', `/api/v1/apps/${appId}/export`, {});
	}

	if (operation === 'publish') {
		const appId = context.getNodeParameter('appId', 0) as string;
		const options = context.getNodeParameter('publishOptions', 0) as any;

		const body: any = {};
		if (options.spaceId) {
			body.spaceId = options.spaceId;
		}

		return await qlikApiRequest.call(context, 'POST', `/api/v1/apps/${appId}/publish`, body);
	}

	if (operation === 'privileges') {
		return await qlikApiRequest.call(context, 'GET', '/api/v1/apps/privileges');
	}

	throw new NodeOperationError(context.getNode(), `Unknown operation: ${operation}`);
}

async function handleAssistantsResource(operation: string, context: IExecuteFunctions): Promise<any> {
	if (operation === 'getAll') {
		const options = context.getNodeParameter('options', 0) as any;

		const qs: any = {};
		if (options.limit) {
			qs.limit = options.limit;
		}
		if (options.next) {
			qs.next = options.next;
		}
		if (options.prev) {
			qs.prev = options.prev;
		}
		if (options.sort) {
			qs.sort = options.sort;
		}

		return await qlikApiRequest.call(context, 'GET', '/api/v1/assistants', undefined, qs);
	}

	if (operation === 'get') {
		const assistantId = context.getNodeParameter('assistantId', 0) as string;
		return await qlikApiRequest.call(context, 'GET', `/api/v1/assistants/${assistantId}`);
	}

	if (operation === 'create') {
		const name = context.getNodeParameter('name', 0) as string;
		const title = context.getNodeParameter('title', 0) as string;
		const description = context.getNodeParameter('description', 0) as string;
		const spaceId = context.getNodeParameter('spaceId', 0) as string;
		const options = context.getNodeParameter('options', 0) as any;

		const body: any = { name, title, description, spaceId };
		if (options.tags) {
			body.tags = options.tags.split(',').map((tag: string) => tag.trim());
		}
		if (options.knowledgeBases) {
			body.knowledgeBases = options.knowledgeBases.split(',').map((kb: string) => kb.trim());
		}
		if (options.welcomeMessage) {
			body.welcomeMessage = options.welcomeMessage;
		}
		if (options.customProperties) {
			body.customProperties = typeof options.customProperties === 'string'
				? JSON.parse(options.customProperties)
				: options.customProperties;
		}

		return await qlikApiRequest.call(context, 'POST', '/api/v1/assistants', body);
	}

	if (operation === 'update') {
		const assistantId = context.getNodeParameter('assistantId', 0) as string;
		const body = context.getNodeParameter('body', 0) as any;

		const patchOps = typeof body === 'string' ? JSON.parse(body) : body;

		return await qlikApiRequest.call(
			context,
			'PATCH',
			`/api/v1/assistants/${assistantId}`,
			patchOps,
		);
	}

	if (operation === 'search') {
		const assistantId = context.getNodeParameter('assistantId', 0) as string;
		const query = context.getNodeParameter('query', 0) as string;
		const options = context.getNodeParameter('options', 0) as any;

		const body: any = { text: query };
		if (options.topN) {
			body.topN = options.topN;
		}
		if (options.mode) {
			body.mode = options.mode;
		}

		return await qlikApiRequest.call(
			context,
			'POST',
			`/api/v1/assistants/${assistantId}/actions/search`,
			body,
		);
	}

	if (operation === 'getFeedback') {
		const assistantId = context.getNodeParameter('assistantId', 0) as string;
		return await qlikApiRequest.call(context, 'GET', `/api/v1/assistants/${assistantId}/feedback`);
	}

	if (operation === 'bulkSearchSources') {
		const assistantId = context.getNodeParameter('assistantId', 0) as string;
		const chunkIds = context.getNodeParameter('chunkIds', 0) as any;

		const body = typeof chunkIds === 'string' ? JSON.parse(chunkIds) : chunkIds;

		return await qlikApiRequest.call(
			context,
			'POST',
			`/api/v1/assistants/${assistantId}/sources/plaintexts`,
			{ chunkIds: body },
		);
	}

	if (operation === 'listStarters') {
		const assistantId = context.getNodeParameter('assistantId', 0) as string;
		const options = context.getNodeParameter('options', 0) as any;

		const qs: any = {};
		if (options.limit) {
			qs.limit = options.limit;
		}

		return await qlikApiRequest.call(context, 'GET', `/api/v1/assistants/${assistantId}/starters`, undefined, qs);
	}

	if (operation === 'createStarter') {
		const assistantId = context.getNodeParameter('assistantId', 0) as string;
		const question = context.getNodeParameter('question', 0) as string;
		const options = context.getNodeParameter('options', 0) as any;

		const body: any = { question };
		if (options.followups) {
			body.followups = typeof options.followups === 'string'
				? JSON.parse(options.followups)
				: options.followups;
		}
		if (options.additionalContext) {
			body.additionalContext = options.additionalContext;
		}

		return await qlikApiRequest.call(
			context,
			'POST',
			`/api/v1/assistants/${assistantId}/starters`,
			body,
		);
	}

	if (operation === 'listThreads') {
		const assistantId = context.getNodeParameter('assistantId', 0) as string;
		const options = context.getNodeParameter('options', 0) as any;

		const qs: any = {};
		if (options.limit) {
			qs.limit = options.limit;
		}
		if (options.filter) {
			qs.filter = options.filter;
		}

		return await qlikApiRequest.call(context, 'GET', `/api/v1/assistants/${assistantId}/threads`, undefined, qs);
	}

	if (operation === 'createThread') {
		const assistantId = context.getNodeParameter('assistantId', 0) as string;
		const name = context.getNodeParameter('name', 0) as string;

		const body: any = { name };

		return await qlikApiRequest.call(
			context,
			'POST',
			`/api/v1/assistants/${assistantId}/threads`,
			body,
		);
	}

	if (operation === 'streamThread') {
		const assistantId = context.getNodeParameter('assistantId', 0) as string;
		const threadId = context.getNodeParameter('threadId', 0) as string;
		const messages = context.getNodeParameter('messages', 0) as any;
		const options = context.getNodeParameter('options', 0) as any;

		const body: any = {
			messages: typeof messages === 'string' ? JSON.parse(messages) : messages,
		};
		if (options.followUpContext) {
			body.followUpContext = typeof options.followUpContext === 'string'
				? JSON.parse(options.followUpContext)
				: options.followUpContext;
		}

		return await qlikApiRequest.call(
			context,
			'POST',
			`/api/v1/assistants/${assistantId}/threads/${threadId}/actions/stream`,
			body,
		);
	}

	if (operation === 'invokeThread') {
		const assistantId = context.getNodeParameter('assistantId', 0) as string;
		const threadId = context.getNodeParameter('threadId', 0) as string;
		const message = context.getNodeParameter('message', 0) as string;

		const body = { message };

		return await qlikApiRequest.call(
			context,
			'POST',
			`/api/v1/assistants/${assistantId}/threads/${threadId}/actions/invoke`,
			body,
		);
	}

	if (operation === 'delete') {
		const assistantId = context.getNodeParameter('assistantId', 0) as string;
		await qlikApiRequest.call(context, 'DELETE', `/api/v1/assistants/${assistantId}`);
		return { success: true };
	}

	throw new NodeOperationError(context.getNode(), `Unknown operation: ${operation}`);
}

async function handleAuditsResource(operation: string, context: IExecuteFunctions): Promise<any> {
	if (operation === 'getAll') {
		const returnAll = context.getNodeParameter('returnAll', 0) as boolean;
		const limit = returnAll ? undefined : (context.getNodeParameter('limit', 0) as number);
		const options = context.getNodeParameter('options', 0) as any;

		const qs: Record<string, any> = {};
		if (options.eventType) {
			qs.eventType = options.eventType;
		}
		if (options.userId) {
			qs.userId = options.userId;
		}
		if (options.source) {
			qs.source = options.source;
		}
		if (options.eventTime) {
			qs.eventTime = options.eventTime;
		}
		if (options.sort) {
			qs.sort = options.sort;
		}

		return await fetchPaginatedResults(context, '/api/v1/audits', qs, limit);
	}

	if (operation === 'get') {
		const auditId = context.getNodeParameter('auditId', 0) as string;
		return await qlikApiRequest.call(context, 'GET', `/api/v1/audits/${auditId}`);
	}

	if (operation === 'getSources') {
		const response = await qlikApiRequest.call(context, 'GET', '/api/v1/audits/sources');
		return response.data || response;
	}

	if (operation === 'getTypes') {
		const response = await qlikApiRequest.call(context, 'GET', '/api/v1/audits/types');
		return response.data || response;
	}

	if (operation === 'getSettings') {
		const response = await qlikApiRequest.call(context, 'GET', '/api/v1/audits/settings');
		return response.data || response;
	}

	throw new NodeOperationError(context.getNode(), `Unknown operation: ${operation}`);
}

async function handleItemsResource(operation: string, context: IExecuteFunctions): Promise<any> {
	if (operation === 'getAll') {
		const returnAll = context.getNodeParameter('returnAll', 0) as boolean;
		const limit = returnAll ? undefined : (context.getNodeParameter('limit', 0) as number);
		const options = context.getNodeParameter('options', 0) as any;

		const qs: Record<string, any> = {};
		if (options.name) {
			qs.name = options.name;
		}
		if (options.resourceType) {
			qs.resourceType = options.resourceType;
		}
		if (options.spaceId) {
			qs.spaceId = options.spaceId;
		}
		if (options.ownerId) {
			qs.ownerId = options.ownerId;
		}
		if (options.sort) {
			qs.sort = options.sort;
		}

		return await fetchPaginatedResults(context, '/api/v1/items', qs, limit);
	}

	if (operation === 'get') {
		const itemId = context.getNodeParameter('itemId', 0) as string;
		return await qlikApiRequest.call(context, 'GET', `/api/v1/items/${itemId}`);
	}

	if (operation === 'update') {
		const itemId = context.getNodeParameter('itemId', 0) as string;
		const body = context.getNodeParameter('body', 0) as any;
		return await qlikApiRequest.call(context, 'PUT', `/api/v1/items/${itemId}`, body);
	}

	if (operation === 'delete') {
		const itemId = context.getNodeParameter('itemId', 0) as string;
		await qlikApiRequest.call(context, 'DELETE', `/api/v1/items/${itemId}`);
		return { success: true };
	}

	if (operation === 'collections') {
		const itemId = context.getNodeParameter('itemId', 0) as string;
		const options = context.getNodeParameter('options', 0) as any;

		const qs: any = {};
		if (options.limit) {
			qs.limit = options.limit;
		}

		const response = await qlikApiRequest.call(
			context,
			'GET',
			`/api/v1/items/${itemId}/collections`,
			undefined,
			qs,
		);
		return response.data || response;
	}

	if (operation === 'publishedItems') {
		const itemId = context.getNodeParameter('itemId', 0) as string;
		const options = context.getNodeParameter('options', 0) as any;

		const qs: any = {};
		if (options.limit) {
			qs.limit = options.limit;
		}

		const response = await qlikApiRequest.call(
			context,
			'GET',
			`/api/v1/items/${itemId}/publisheditems`,
			undefined,
			qs,
		);
		return response.data || response;
	}

	if (operation === 'settings') {
		const settingsOperation = context.getNodeParameter('settingsOperation', 0) as string;

		if (settingsOperation === 'get') {
			const response = await qlikApiRequest.call(context, 'GET', '/api/v1/items/settings');
			return response.data || response;
		}

		if (settingsOperation === 'patch') {
			const body = context.getNodeParameter('body', 0) as any;
			const response = await qlikApiRequest.call(context, 'PATCH', '/api/v1/items/settings', body);
			return response.data || response;
		}
	}

	throw new NodeOperationError(context.getNode(), `Unknown operation: ${operation}`);
}

export class QlikCloud implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Qlik Cloud',
		name: 'qlikCloud',
		icon: 'file:../../icons/qlik.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'Interact with Qlik Cloud APIs (Apps, Items, Audits, Assistants)',
		defaults: {
			name: 'Qlik Cloud',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'qlikCloudApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Apps',
						value: 'apps',
						description: 'Manage Qlik Cloud applications',
					},
					{
						name: 'Assistants',
						value: 'assistants',
						description: 'Interact with AI assistants',
					},
					{
						name: 'Audits',
						value: 'audits',
						description: 'Access audit logs and events',
					},
					{
						name: 'Items',
						value: 'items',
						description: 'Manage items in Qlik Cloud',
					},
				],
				default: 'apps',
			},
			...appDescription,
			...assistantDescription,
			...auditDescription,
			...itemDescription,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		let responseData: any;
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'apps') {
					responseData = await handleAppsResource(operation, this);
				} else if (resource === 'assistants') {
					responseData = await handleAssistantsResource(operation, this);
				} else if (resource === 'audits') {
					responseData = await handleAuditsResource(operation, this);
				} else if (resource === 'items') {
					responseData = await handleItemsResource(operation, this);
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(Array.isArray(responseData) ? responseData : [responseData]),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: (error as Error).message },
						pairedItem: i,
					});
				} else {
					throw error;
				}
			}
		}

		return [returnData];
	}
}
