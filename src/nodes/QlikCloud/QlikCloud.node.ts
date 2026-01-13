import type {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestOptions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import { qlikApiRequest } from './shared/transport';
import { appDescription } from './resources/apps/index';
import { assistantDescription } from './resources/assistants/index';
import { auditDescription } from './resources/audits/index';
import { analyticsTaskDescription } from './resources/tasks/index';
import { itemDescription } from './resources/items/index';
import { dataAlertDescription } from './resources/data-alerts/index';

const DEFAULT_PAGE_SIZE = 100;
const BINARY_DOWNLOAD_OPTIONS: Partial<IHttpRequestOptions> = {
	json: false,
	encoding: 'arraybuffer',
};

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
			const cursor = url.searchParams.get('next') ?? url.searchParams.get('page');
			return cursor ?? undefined;
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
	cursorParamName: string = 'next',
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
			qs[cursorParamName] = cursor;
		}

		const response = await qlikApiRequest.call(context, 'GET', endpoint, undefined, qs);
		const pageItems = extractPageItems(response);
		collected.push(...pageItems);

		cursor = extractNextCursor(response);
	} while (cursor && (limit === undefined || collected.length < limit));

	return limit === undefined ? collected : collected.slice(0, limit);
}

function encodeMediaPath(path: string): string {
	return encodeURIComponent(path).replace(/%2F/g, '/');
}

async function handleDataAlertsResource(
	operation: string,
	context: IExecuteFunctions,
	itemIndex: number,
): Promise<any> {
	switch (operation) {
		case 'getAll': {
			const returnAll = context.getNodeParameter('returnAll', itemIndex) as boolean;
			const limit = returnAll ? undefined : (context.getNodeParameter('limit', itemIndex) as number);
			const options = context.getNodeParameter('options', itemIndex) as any;

			const qs: Record<string, any> = {};
			if (options.appId) qs.appID = options.appId;
			if (options.conditionId) qs.conditionId = options.conditionId;
			if (options.ownerId) qs.ownerId = options.ownerId;
			if (options.ownerName) qs.ownerName = options.ownerName;
			if (options.role) qs.role = options.role;
			if (options.next) qs.next = options.next;
			if (options.prev) qs.prev = options.prev;
			if (options.offset !== undefined) qs.offset = options.offset;

			const pageSize = limit === undefined ? DEFAULT_PAGE_SIZE : Math.min(DEFAULT_PAGE_SIZE, limit);
			return await fetchPaginatedResults(context, '/api/v1/data-alerts', qs, limit, pageSize);
		}
		case 'create': {
			const body = context.getNodeParameter('body', itemIndex) as any;
			const payload = typeof body === 'string' ? JSON.parse(body) : body;
			return await qlikApiRequest.call(context, 'POST', '/api/v1/data-alerts', payload);
		}
		case 'get': {
			const alertId = context.getNodeParameter('alertId', itemIndex) as string;
			return await qlikApiRequest.call(context, 'GET', `/api/v1/data-alerts/${alertId}`);
		}
		case 'update': {
			const alertId = context.getNodeParameter('alertId', itemIndex) as string;
			const body = context.getNodeParameter('body', itemIndex) as any;
			const payload = typeof body === 'string' ? JSON.parse(body) : body;
			return await qlikApiRequest.call(context, 'PATCH', `/api/v1/data-alerts/${alertId}`, payload);
		}
		case 'delete': {
			const alertId = context.getNodeParameter('alertId', itemIndex) as string;
			await qlikApiRequest.call(context, 'DELETE', `/api/v1/data-alerts/${alertId}`);
			return { success: true };
		}
		case 'getCondition': {
			const alertId = context.getNodeParameter('alertId', itemIndex) as string;
			return await qlikApiRequest.call(context, 'GET', `/api/v1/data-alerts/${alertId}/condition`);
		}
		case 'getExecution': {
			const alertId = context.getNodeParameter('alertId', itemIndex) as string;
			const executionId = context.getNodeParameter('executionId', itemIndex) as string;
			return await qlikApiRequest.call(
				context,
				'GET',
				`/api/v1/data-alerts/${alertId}/executions/${executionId}`,
			);
		}
		case 'deleteExecution': {
			const alertId = context.getNodeParameter('alertId', itemIndex) as string;
			const executionId = context.getNodeParameter('executionId', itemIndex) as string;
			await qlikApiRequest.call(
				context,
				'DELETE',
				`/api/v1/data-alerts/${alertId}/executions/${executionId}`,
			);
			return { success: true };
		}
		case 'recipientStats': {
			const alertId = context.getNodeParameter('alertId', itemIndex) as string;
			return await qlikApiRequest.call(
				context,
				'GET',
				`/api/v1/data-alerts/${alertId}/recipient-stats`,
			);
		}
		case 'listExecutions': {
			const taskId = context.getNodeParameter('taskId', itemIndex) as string;
			const returnAll = context.getNodeParameter('returnAll', itemIndex) as boolean;
			const limit = returnAll ? undefined : (context.getNodeParameter('limit', itemIndex) as number);
			const options = context.getNodeParameter('options', itemIndex) as any;

			const qs: Record<string, any> = {};
			if (options.next) qs.next = options.next;
			if (options.prev) qs.prev = options.prev;
			if (options.offset !== undefined) qs.offset = options.offset;

			const pageSize = limit === undefined ? DEFAULT_PAGE_SIZE : Math.min(DEFAULT_PAGE_SIZE, limit);
			return await fetchPaginatedResults(
				context,
				`/api/v1/data-alerts/${taskId}/executions`,
				qs,
				limit,
				pageSize,
			);
		}
		case 'getExecutionEvaluation': {
			const taskId = context.getNodeParameter('taskId', itemIndex) as string;
			const executionId = context.getNodeParameter('executionId', itemIndex) as string;
			return await qlikApiRequest.call(
				context,
				'GET',
				`/api/v1/data-alerts/${taskId}/executions/${executionId}/evaluations`,
			);
		}
		case 'getExecutionStats': {
			const taskId = context.getNodeParameter('taskId', itemIndex) as string;
			const options = context.getNodeParameter('options', itemIndex) as any;
			const qs: Record<string, any> = {};
			if (options.period) qs.period = options.period;

			return await qlikApiRequest.call(
				context,
				'GET',
				`/api/v1/data-alerts/${taskId}/executions/stats`,
				undefined,
				qs,
			);
		}
		case 'trigger': {
			const body = context.getNodeParameter('body', itemIndex) as any;
			const payload = typeof body === 'string' ? JSON.parse(body) : body;
			return await qlikApiRequest.call(context, 'POST', '/api/v1/data-alerts/actions/trigger', payload);
		}
		case 'validate': {
			const body = context.getNodeParameter('body', itemIndex) as any;
			const payload = typeof body === 'string' ? JSON.parse(body) : body;
			return await qlikApiRequest.call(context, 'POST', '/api/v1/data-alerts/actions/validate', payload);
		}
		case 'getSettings': {
			return await qlikApiRequest.call(context, 'GET', '/api/v1/data-alerts/settings');
		}
		case 'updateSettings': {
			const body = context.getNodeParameter('body', itemIndex) as any;
			const payload = typeof body === 'string' ? JSON.parse(body) : body;
			return await qlikApiRequest.call(context, 'PUT', '/api/v1/data-alerts/settings', payload);
		}
		default:
			throw new NodeOperationError(context.getNode(), `Unknown operation: ${operation}`);
	}
}

async function handleAppsResource(
	operation: string,
	context: IExecuteFunctions,
	itemIndex: number,
): Promise<any> {
	switch (operation) {
		case 'getAll': {
			const returnAll = context.getNodeParameter('returnAll', itemIndex) as boolean;
			const limit = returnAll ? undefined : (context.getNodeParameter('limit', itemIndex) as number);
			const options = context.getNodeParameter('options', itemIndex) as any;

			const qs: Record<string, any> = {};
			if (options.name) {
				qs.name = options.name;
			}
			if (options.spaceId) {
				qs.spaceId = options.spaceId;
			}

			return await fetchPaginatedResults(context, '/api/v1/apps', qs, limit);
		}
		case 'get': {
			const appId = context.getNodeParameter('appId', itemIndex) as string;
			return await qlikApiRequest.call(context, 'GET', `/api/v1/apps/${appId}`);
		}
		case 'create': {
			const name = context.getNodeParameter('name', itemIndex) as string;
			const options = context.getNodeParameter('options', itemIndex) as any;

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
		case 'update': {
			const appId = context.getNodeParameter('appId', itemIndex) as string;
			const body = context.getNodeParameter('body', itemIndex) as any;
			return await qlikApiRequest.call(context, 'PUT', `/api/v1/apps/${appId}`, body);
		}
		case 'delete': {
			const appId = context.getNodeParameter('appId', itemIndex) as string;
			await qlikApiRequest.call(context, 'DELETE', `/api/v1/apps/${appId}`);
			return { success: true };
		}
		case 'copy': {
			const appId = context.getNodeParameter('appId', itemIndex) as string;
			const name = context.getNodeParameter('name', itemIndex) as string;
			const options = context.getNodeParameter('options', itemIndex) as any;

			const body = { attributes: { name } };
			if (options.description) {
				(body.attributes as any).description = options.description;
			}
			if (options.spaceId) {
				(body.attributes as any).spaceId = options.spaceId;
			}

			return await qlikApiRequest.call(context, 'POST', `/api/v1/apps/${appId}/copy`, body);
		}
		case 'export': {
			const appId = context.getNodeParameter('appId', itemIndex) as string;
			return await qlikApiRequest.call(context, 'POST', `/api/v1/apps/${appId}/export`, {});
		}
		case 'publish': {
			const appId = context.getNodeParameter('appId', itemIndex) as string;
			const options = context.getNodeParameter('publishOptions', itemIndex) as any;

			const body: any = {};
			if (options.spaceId) {
				body.spaceId = options.spaceId;
			}

			return await qlikApiRequest.call(context, 'POST', `/api/v1/apps/${appId}/publish`, body);
		}
		case 'republish': {
			const appId = context.getNodeParameter('appId', itemIndex) as string;
			const options = context.getNodeParameter('publishOptions', itemIndex) as any;

			const body: any = {};
			if (options.spaceId) {
				body.spaceId = options.spaceId;
			}

			return await qlikApiRequest.call(context, 'PUT', `/api/v1/apps/${appId}/publish`, body);
		}
		case 'dataLineage': {
			const appId = context.getNodeParameter('appId', itemIndex) as string;
			return await qlikApiRequest.call(context, 'GET', `/api/v1/apps/${appId}/data/lineage`);
		}
		case 'dataMetadata': {
			const appId = context.getNodeParameter('appId', itemIndex) as string;
			return await qlikApiRequest.call(context, 'GET', `/api/v1/apps/${appId}/data/metadata`);
		}
		case 'listInsights': {
			const appId = context.getNodeParameter('appId', itemIndex) as string;
			return await qlikApiRequest.call(context, 'GET', `/api/v1/apps/${appId}/insight-analyses`);
		}
		case 'recommendInsights': {
			const appId = context.getNodeParameter('appId', itemIndex) as string;
			const body = context.getNodeParameter('body', itemIndex) as any;
			const payload = typeof body === 'string' ? JSON.parse(body) : body;

			return await qlikApiRequest.call(
				context,
				'POST',
				`/api/v1/apps/${appId}/insight-analyses/actions/recommend`,
				payload,
			);
		}
		case 'getInsightModel': {
			const appId = context.getNodeParameter('appId', itemIndex) as string;
			return await qlikApiRequest.call(context, 'GET', `/api/v1/apps/${appId}/insight-analyses/model`);
		}
		case 'mediaGetFile': {
			const appId = context.getNodeParameter('appId', itemIndex) as string;
			const path = context.getNodeParameter('path', itemIndex) as string;
			const binaryProperty = context.getNodeParameter('binaryProperty', itemIndex) as string;

			const response = await qlikApiRequest.call(
				context,
				'GET',
				`/api/v1/apps/${appId}/media/files/${encodeMediaPath(path)}`,
				undefined,
				undefined,
				true,
				BINARY_DOWNLOAD_OPTIONS,
			);

			const data = (response as any).body ?? response;
			const buffer = Buffer.isBuffer(data) ? data : Buffer.from(data as any);
			const binary = await context.helpers.prepareBinaryData(buffer, path);

			return { json: {}, binary: { [binaryProperty]: binary } };
		}
		case 'mediaUploadFile': {
			const appId = context.getNodeParameter('appId', itemIndex) as string;
			const path = context.getNodeParameter('path', itemIndex) as string;
			const binaryProperty = context.getNodeParameter('binaryProperty', itemIndex) as string;
			const contentType = context.getNodeParameter('contentType', itemIndex) as string;
			const buffer = await context.helpers.getBinaryDataBuffer(itemIndex, binaryProperty);

			return await qlikApiRequest.call(
				context,
				'PUT',
				`/api/v1/apps/${appId}/media/files/${encodeMediaPath(path)}`,
				buffer,
				undefined,
				false,
				{
					json: false,
					headers: { 'Content-Type': contentType },
				},
			);
		}
		case 'mediaDeleteFile': {
			const appId = context.getNodeParameter('appId', itemIndex) as string;
			const path = context.getNodeParameter('path', itemIndex) as string;
			await qlikApiRequest.call(
				context,
				'DELETE',
				`/api/v1/apps/${appId}/media/files/${encodeMediaPath(path)}`,
			);
			return { success: true };
		}
		case 'mediaList': {
			const appId = context.getNodeParameter('appId', itemIndex) as string;
			const path = context.getNodeParameter('path', itemIndex) as string;
			return await qlikApiRequest.call(
				context,
				'GET',
				`/api/v1/apps/${appId}/media/list/${encodeMediaPath(path)}`,
			);
		}
		case 'mediaThumbnail': {
			const appId = context.getNodeParameter('appId', itemIndex) as string;
			const binaryProperty = context.getNodeParameter('binaryProperty', itemIndex) as string;

			const response = await qlikApiRequest.call(
				context,
				'GET',
				`/api/v1/apps/${appId}/media/thumbnail`,
				undefined,
				undefined,
				true,
				BINARY_DOWNLOAD_OPTIONS,
			);
			const data = (response as any).body ?? response;
			const buffer = Buffer.isBuffer(data) ? data : Buffer.from(data as any);
			const binary = await context.helpers.prepareBinaryData(buffer, 'thumbnail.png');

			return { json: {}, binary: { [binaryProperty]: binary } };
		}
		case 'changeObjectOwner': {
			const appId = context.getNodeParameter('appId', itemIndex) as string;
			const objectId = context.getNodeParameter('objectId', itemIndex) as string;
			const ownerId = context.getNodeParameter('ownerId', itemIndex) as string;

			return await qlikApiRequest.call(
				context,
				'POST',
				`/api/v1/apps/${appId}/objects/${objectId}/actions/change-owner`,
				{ ownerId },
			);
		}
		case 'updateOwner': {
			const appId = context.getNodeParameter('appId', itemIndex) as string;
			const ownerId = context.getNodeParameter('ownerId', itemIndex) as string;
			return await qlikApiRequest.call(context, 'PUT', `/api/v1/apps/${appId}/owner`, { ownerId });
		}
		case 'reloadLogs': {
			const appId = context.getNodeParameter('appId', itemIndex) as string;
			const returnAll = context.getNodeParameter('returnAll', itemIndex) as boolean;
			const limit = returnAll ? undefined : (context.getNodeParameter('limit', itemIndex) as number);

			return await fetchPaginatedResults(context, `/api/v1/apps/${appId}/reloads/logs`, {}, limit);
		}
		case 'reloadLog': {
			const appId = context.getNodeParameter('appId', itemIndex) as string;
			const reloadId = context.getNodeParameter('reloadId', itemIndex) as string;
			return await qlikApiRequest.call(
				context,
				'GET',
				`/api/v1/apps/${appId}/reloads/logs/${reloadId}`,
			);
		}
		case 'reloadMetadata': {
			const appId = context.getNodeParameter('appId', itemIndex) as string;
			const reloadId = context.getNodeParameter('reloadId', itemIndex) as string;
			return await qlikApiRequest.call(
				context,
				'GET',
				`/api/v1/apps/${appId}/reloads/metadata/${reloadId}`,
			);
		}
		case 'reportFiltersGetAll': {
			const appId = context.getNodeParameter('appId', itemIndex) as string;
			const returnAll = context.getNodeParameter('returnAll', itemIndex) as boolean;
			const limit = returnAll ? undefined : (context.getNodeParameter('limit', itemIndex) as number);
			const options = context.getNodeParameter('options', itemIndex) as any;

			const qs: Record<string, any> = {};
			if (options.filter) qs.filter = options.filter;
			if (options.filterTypes) qs.filterTypes = options.filterTypes;
			if (options.page !== undefined) qs.page = options.page;
			if (options.sort) qs.sort = options.sort;
			if (!returnAll && limit !== undefined) qs.limit = limit;

			return await fetchPaginatedResults(
				context,
				`/api/v1/apps/${appId}/report-filters`,
				qs,
				limit,
			);
		}
		case 'reportFiltersCreate': {
			const appId = context.getNodeParameter('appId', itemIndex) as string;
			const body = context.getNodeParameter('body', itemIndex) as any;
			const payload = typeof body === 'string' ? JSON.parse(body) : body;
			return await qlikApiRequest.call(context, 'POST', `/api/v1/apps/${appId}/report-filters`, payload);
		}
		case 'reportFiltersGet': {
			const appId = context.getNodeParameter('appId', itemIndex) as string;
			const filterId = context.getNodeParameter('filterId', itemIndex) as string;
			return await qlikApiRequest.call(
				context,
				'GET',
				`/api/v1/apps/${appId}/report-filters/${filterId}`,
			);
		}
		case 'reportFiltersUpdate': {
			const appId = context.getNodeParameter('appId', itemIndex) as string;
			const filterId = context.getNodeParameter('filterId', itemIndex) as string;
			const body = context.getNodeParameter('body', itemIndex) as any;
			const payload = typeof body === 'string' ? JSON.parse(body) : body;

			return await qlikApiRequest.call(
				context,
				'PATCH',
				`/api/v1/apps/${appId}/report-filters/${filterId}`,
				payload,
			);
		}
		case 'reportFiltersDelete': {
			const appId = context.getNodeParameter('appId', itemIndex) as string;
			const filterId = context.getNodeParameter('filterId', itemIndex) as string;
			await qlikApiRequest.call(context, 'DELETE', `/api/v1/apps/${appId}/report-filters/${filterId}`);
			return { success: true };
		}
		case 'reportFiltersCount': {
			const appId = context.getNodeParameter('appId', itemIndex) as string;
			const options = context.getNodeParameter('options', itemIndex) as any;
			const qs: Record<string, any> = {};
			if (options.filter) qs.filter = options.filter;
			if (options.filterTypes) qs.filterTypes = options.filterTypes;
			return await qlikApiRequest.call(
				context,
				'GET',
				`/api/v1/apps/${appId}/report-filters/actions/count`,
				undefined,
				qs,
			);
		}
		case 'scriptsGetAll': {
			const appId = context.getNodeParameter('appId', itemIndex) as string;
			return await qlikApiRequest.call(context, 'GET', `/api/v1/apps/${appId}/scripts`);
		}
		case 'scriptsCreate': {
			const appId = context.getNodeParameter('appId', itemIndex) as string;
			const body = context.getNodeParameter('body', itemIndex) as any;
			const payload = typeof body === 'string' ? JSON.parse(body) : body;
			return await qlikApiRequest.call(context, 'POST', `/api/v1/apps/${appId}/scripts`, payload);
		}
		case 'scriptsGet': {
			const appId = context.getNodeParameter('appId', itemIndex) as string;
			const scriptId = context.getNodeParameter('scriptId', itemIndex) as string;
			return await qlikApiRequest.call(context, 'GET', `/api/v1/apps/${appId}/scripts/${scriptId}`);
		}
		case 'scriptsUpdate': {
			const appId = context.getNodeParameter('appId', itemIndex) as string;
			const scriptId = context.getNodeParameter('scriptId', itemIndex) as string;
			const body = context.getNodeParameter('body', itemIndex) as any;
			const payload = typeof body === 'string' ? JSON.parse(body) : body;
			return await qlikApiRequest.call(
				context,
				'PATCH',
				`/api/v1/apps/${appId}/scripts/${scriptId}`,
				payload,
			);
		}
		case 'scriptsDelete': {
			const appId = context.getNodeParameter('appId', itemIndex) as string;
			const scriptId = context.getNodeParameter('scriptId', itemIndex) as string;
			await qlikApiRequest.call(context, 'DELETE', `/api/v1/apps/${appId}/scripts/${scriptId}`);
			return { success: true };
		}
		case 'moveToSpace': {
			const appId = context.getNodeParameter('appId', itemIndex) as string;
			const spaceId = context.getNodeParameter('spaceId', itemIndex) as string;
			return await qlikApiRequest.call(context, 'PUT', `/api/v1/apps/${appId}/space`, { spaceId });
		}
		case 'removeFromSpace': {
			const appId = context.getNodeParameter('appId', itemIndex) as string;
			await qlikApiRequest.call(context, 'DELETE', `/api/v1/apps/${appId}/space`);
			return { success: true };
		}
		case 'evaluationsGetAll': {
			const appId = context.getNodeParameter('appId', itemIndex) as string;
			return await qlikApiRequest.call(context, 'GET', `/api/v1/apps/${appId}/evaluations`);
		}
		case 'evaluationsCreate': {
			const appId = context.getNodeParameter('appId', itemIndex) as string;
			const body = context.getNodeParameter('body', itemIndex) as any;
			const payload = typeof body === 'string' ? JSON.parse(body) : body;
			return await qlikApiRequest.call(context, 'POST', `/api/v1/apps/${appId}/evaluations`, payload);
		}
		case 'evaluationsCompare': {
			const baseEvaluationId = context.getNodeParameter('baseEvaluationId', itemIndex) as string;
			const comparisonEvaluationId = context.getNodeParameter('comparisonEvaluationId', itemIndex) as string;
			return await qlikApiRequest.call(
				context,
				'GET',
				`/api/v1/apps/evaluations/${baseEvaluationId}/actions/compare/${comparisonEvaluationId}`,
			);
		}
		case 'evaluationsDownloadCompare': {
			const baseEvaluationId = context.getNodeParameter('baseEvaluationId', itemIndex) as string;
			const comparisonEvaluationId = context.getNodeParameter('comparisonEvaluationId', itemIndex) as string;
			const binaryProperty = context.getNodeParameter('binaryProperty', itemIndex) as string;

			const response = await qlikApiRequest.call(
				context,
				'GET',
				`/api/v1/apps/evaluations/${baseEvaluationId}/actions/compare/${comparisonEvaluationId}/actions/download`,
				undefined,
				undefined,
				true,
				BINARY_DOWNLOAD_OPTIONS,
			);
			const data = (response as any).body ?? response;
			const buffer = Buffer.isBuffer(data) ? data : Buffer.from(data as any);
			const binary = await context.helpers.prepareBinaryData(buffer, 'comparison');

			return { json: {}, binary: { [binaryProperty]: binary } };
		}
		case 'evaluationGet': {
			const evaluationId = context.getNodeParameter('evaluationId', itemIndex) as string;
			return await qlikApiRequest.call(context, 'GET', `/api/v1/apps/evaluations/${evaluationId}`);
		}
		case 'evaluationDownload': {
			const evaluationId = context.getNodeParameter('evaluationId', itemIndex) as string;
			const binaryProperty = context.getNodeParameter('binaryProperty', itemIndex) as string;

			const response = await qlikApiRequest.call(
				context,
				'GET',
				`/api/v1/apps/evaluations/${evaluationId}/actions/download`,
				undefined,
				undefined,
				true,
				BINARY_DOWNLOAD_OPTIONS,
			);
			const data = (response as any).body ?? response;
			const buffer = Buffer.isBuffer(data) ? data : Buffer.from(data as any);
			const binary = await context.helpers.prepareBinaryData(buffer, 'evaluation');

			return { json: {}, binary: { [binaryProperty]: binary } };
		}
		case 'importApp': {
			const binaryProperty = context.getNodeParameter('binaryProperty', itemIndex) as string;
			const options = context.getNodeParameter('options', itemIndex) as any;
			const qs: Record<string, any> = {};
			if (options.name) qs.name = options.name;
			if (options.spaceId) qs.spaceId = options.spaceId;

			const buffer = await context.helpers.getBinaryDataBuffer(itemIndex, binaryProperty);

			return await qlikApiRequest.call(
				context,
				'POST',
				'/api/v1/apps/import',
				buffer,
				qs,
				false,
				{ json: false, headers: { 'Content-Type': 'application/octet-stream' } },
			);
		}
		case 'validateScript': {
			const body = context.getNodeParameter('body', itemIndex) as any;
			const payload = typeof body === 'string' ? JSON.parse(body) : body;
			return await qlikApiRequest.call(context, 'POST', '/api/v1/apps/validatescript', payload);
		}
		case 'privileges': {
			const options = context.getNodeParameter('options', itemIndex) as any;
			const qs: Record<string, any> = {};
			if (options.role) qs.role = options.role;
			return await qlikApiRequest.call(context, 'GET', '/api/v1/apps/privileges', undefined, qs);
		}
		default:
			throw new NodeOperationError(context.getNode(), `Unknown operation: ${operation}`);
	}
}

async function handleAnalyticsTasksResource(
	operation: string,
	context: IExecuteFunctions,
	itemIndex: number,
): Promise<any> {
	switch (operation) {
		case 'getAll': {
			const returnAll = context.getNodeParameter('returnAll', itemIndex) as boolean;
			const limit = returnAll ? undefined : (context.getNodeParameter('limit', itemIndex) as number);
			const options = context.getNodeParameter('options', itemIndex) as any;

			const qs: Record<string, any> = {};
			if (options.resourceId) {
				qs.resourceId = options.resourceId;
			}
			if (options.sort) {
				qs.sort = options.sort;
			}
			if (options.page) {
				qs.page = options.page;
			}

			const pageSize = limit === undefined ? 100 : Math.min(100, limit);

			return await fetchPaginatedResults(context, '/api/v1/tasks', qs, limit, pageSize, 'page');
		}
		case 'create': {
			const body = context.getNodeParameter('body', itemIndex) as any;
			const payload = typeof body === 'string' ? JSON.parse(body) : body;
			const options = context.getNodeParameter('options', itemIndex) as any;

			const qs: Record<string, any> = {};
			if (options.migrateFrom) {
				qs.migrateFrom = options.migrateFrom;
			}

			return await qlikApiRequest.call(context, 'POST', '/api/v1/tasks', payload, qs);
		}
		case 'get': {
			const taskId = context.getNodeParameter('taskId', itemIndex) as string;
			return await qlikApiRequest.call(context, 'GET', `/api/v1/tasks/${taskId}`);
		}
		case 'update': {
			const taskId = context.getNodeParameter('taskId', itemIndex) as string;
			const body = context.getNodeParameter('body', itemIndex) as any;
			const payload = typeof body === 'string' ? JSON.parse(body) : body;

			return await qlikApiRequest.call(context, 'PUT', `/api/v1/tasks/${taskId}`, payload);
		}
		case 'delete': {
			const taskId = context.getNodeParameter('taskId', itemIndex) as string;
			await qlikApiRequest.call(context, 'DELETE', `/api/v1/tasks/${taskId}`);
			return { success: true };
		}
		case 'start': {
			const taskId = context.getNodeParameter('taskId', itemIndex) as string;
			const source = context.getNodeParameter('source', itemIndex) as string;
			const qs: Record<string, any> = {};
			if (source) {
				qs.source = source;
			}

			return await qlikApiRequest.call(context, 'POST', `/api/v1/tasks/${taskId}/actions/start`, {}, qs);
		}
		case 'getRuns': {
			const taskId = context.getNodeParameter('taskId', itemIndex) as string;
			const returnAll = context.getNodeParameter('returnAll', itemIndex) as boolean;
			const limit = returnAll ? undefined : (context.getNodeParameter('limit', itemIndex) as number);
			const options = context.getNodeParameter('options', itemIndex) as any;

			const qs: Record<string, any> = {};
			if (options.page) {
				qs.page = options.page;
			}
			if (options.sort) {
				qs.sort = options.sort;
			}

			const pageSize = limit === undefined ? 100 : Math.min(100, limit);
			return await fetchPaginatedResults(
				context,
				`/api/v1/tasks/${taskId}/runs`,
				qs,
				limit,
				pageSize,
				'page',
			);
		}
		case 'getLastRun': {
			const taskId = context.getNodeParameter('taskId', itemIndex) as string;
			return await qlikApiRequest.call(context, 'GET', `/api/v1/tasks/${taskId}/runs/last`);
		}
		case 'getRunLog': {
			const taskId = context.getNodeParameter('taskId', itemIndex) as string;
			const runId = context.getNodeParameter('runId', itemIndex) as string;
			const responseFormat = context.getNodeParameter('responseFormat', itemIndex) as string;

			if (responseFormat === 'text') {
				const response = await qlikApiRequest.call(
					context,
					'GET',
					`/api/v1/tasks/${taskId}/runs/${runId}/log`,
					undefined,
					undefined,
					false,
					{ headers: { Accept: 'text/plain' }, json: false },
				);

				const logContent = typeof response === 'string' ? response : JSON.stringify(response);
				return { logContent };
			}

			return await qlikApiRequest.call(
				context,
				'GET',
				`/api/v1/tasks/${taskId}/runs/${runId}/log`,
				undefined,
				undefined,
				false,
				{ headers: { Accept: 'application/json' } },
			);
		}
		case 'getResourceRuns': {
			const resourceId = context.getNodeParameter('resourceId', itemIndex) as string;
			const returnAll = context.getNodeParameter('returnAll', itemIndex) as boolean;
			const limit = returnAll ? undefined : (context.getNodeParameter('limit', itemIndex) as number);
			const options = context.getNodeParameter('options', itemIndex) as any;

			const qs: Record<string, any> = {};
			if (options.page) {
				qs.page = options.page;
			}
			if (options.sort) {
				qs.sort = options.sort;
			}

			const pageSize = limit === undefined ? 100 : Math.min(100, limit);
			return await fetchPaginatedResults(
				context,
				`/api/v1/tasks/resources/${resourceId}/runs`,
				qs,
				limit,
				pageSize,
				'page',
			);
		}
		default:
			throw new NodeOperationError(context.getNode(), `Unknown operation: ${operation}`);
	}
}

async function handleAssistantsResource(
	operation: string,
	context: IExecuteFunctions,
	itemIndex: number,
): Promise<any> {
	if (operation === 'getAll') {
		const returnAll = context.getNodeParameter('returnAll', itemIndex) as boolean;
		const limit = returnAll ? undefined : (context.getNodeParameter('limit', itemIndex) as number);
		const options = context.getNodeParameter('options', itemIndex) as any;

		const qs: any = {};
		if (options.next) {
			qs.next = options.next;
		}
		if (options.prev) {
			qs.prev = options.prev;
		}
		if (options.sort) {
			qs.sort = options.sort;
		}

		if (!returnAll && options.limit) {
			qs.limit = options.limit;
		}

		return await fetchPaginatedResults(context, '/api/v1/assistants', qs, limit);
	}

	if (operation === 'get') {
		const assistantId = context.getNodeParameter('assistantId', itemIndex) as string;
		return await qlikApiRequest.call(context, 'GET', `/api/v1/assistants/${assistantId}`);
	}

	if (operation === 'create') {
		const name = context.getNodeParameter('name', itemIndex) as string;
		const title = context.getNodeParameter('title', itemIndex) as string;
		const description = context.getNodeParameter('description', itemIndex) as string;
		const spaceId = context.getNodeParameter('spaceId', itemIndex) as string;
		const options = context.getNodeParameter('options', itemIndex) as any;

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
		const assistantId = context.getNodeParameter('assistantId', itemIndex) as string;
		const body = context.getNodeParameter('body', itemIndex) as any;

		const patchOps = typeof body === 'string' ? JSON.parse(body) : body;

		return await qlikApiRequest.call(
			context,
			'PATCH',
			`/api/v1/assistants/${assistantId}`,
			patchOps,
		);
	}

	if (operation === 'search') {
		const assistantId = context.getNodeParameter('assistantId', itemIndex) as string;
		const query = context.getNodeParameter('query', itemIndex) as string;
		const options = context.getNodeParameter('options', itemIndex) as any;

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
		const assistantId = context.getNodeParameter('assistantId', itemIndex) as string;
		return await qlikApiRequest.call(context, 'GET', `/api/v1/assistants/${assistantId}/feedback`);
	}

	if (operation === 'bulkSearchSources') {
		const assistantId = context.getNodeParameter('assistantId', itemIndex) as string;
		const chunkIds = context.getNodeParameter('chunkIds', itemIndex) as any;

		const body = typeof chunkIds === 'string' ? JSON.parse(chunkIds) : chunkIds;

		return await qlikApiRequest.call(
			context,
			'POST',
			`/api/v1/assistants/${assistantId}/sources/plaintexts`,
			{ chunkIds: body },
		);
	}

	if (operation === 'listStarters') {
		const assistantId = context.getNodeParameter('assistantId', itemIndex) as string;
		const options = context.getNodeParameter('options', itemIndex) as any;

		const qs: any = {};
		if (options.limit) {
			qs.limit = options.limit;
		}

		return await qlikApiRequest.call(context, 'GET', `/api/v1/assistants/${assistantId}/starters`, undefined, qs);
	}

	if (operation === 'createStarter') {
		const assistantId = context.getNodeParameter('assistantId', itemIndex) as string;
		const question = context.getNodeParameter('question', itemIndex) as string;
		const options = context.getNodeParameter('options', itemIndex) as any;

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
		const assistantId = context.getNodeParameter('assistantId', itemIndex) as string;
		const options = context.getNodeParameter('options', itemIndex) as any;

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
		const assistantId = context.getNodeParameter('assistantId', itemIndex) as string;
		const name = context.getNodeParameter('name', itemIndex) as string;

		const body: any = { name };

		return await qlikApiRequest.call(
			context,
			'POST',
			`/api/v1/assistants/${assistantId}/threads`,
			body,
		);
	}

	if (operation === 'streamThread') {
		const assistantId = context.getNodeParameter('assistantId', itemIndex) as string;
		const threadId = context.getNodeParameter('threadId', itemIndex) as string;
		const messages = context.getNodeParameter('messages', itemIndex) as any;
		const options = context.getNodeParameter('options', itemIndex) as any;

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
		const assistantId = context.getNodeParameter('assistantId', itemIndex) as string;
		const threadId = context.getNodeParameter('threadId', itemIndex) as string;
		const message = context.getNodeParameter('message', itemIndex) as string;

		const body = { message };

		return await qlikApiRequest.call(
			context,
			'POST',
			`/api/v1/assistants/${assistantId}/threads/${threadId}/actions/invoke`,
			body,
		);
	}

	if (operation === 'delete') {
		const assistantId = context.getNodeParameter('assistantId', itemIndex) as string;
		await qlikApiRequest.call(context, 'DELETE', `/api/v1/assistants/${assistantId}`);
		return { success: true };
	}

	throw new NodeOperationError(context.getNode(), `Unknown operation: ${operation}`);
}

async function handleAuditsResource(
	operation: string,
	context: IExecuteFunctions,
	itemIndex: number,
): Promise<any> {
	if (operation === 'getAll') {
		const returnAll = context.getNodeParameter('returnAll', itemIndex) as boolean;
		const limit = returnAll ? undefined : (context.getNodeParameter('limit', itemIndex) as number);
		const options = context.getNodeParameter('options', itemIndex) as any;

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
		const auditId = context.getNodeParameter('auditId', itemIndex) as string;
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

async function handleItemsResource(
	operation: string,
	context: IExecuteFunctions,
	itemIndex: number,
): Promise<any> {
	if (operation === 'getAll') {
		const returnAll = context.getNodeParameter('returnAll', itemIndex) as boolean;
		const limit = returnAll ? undefined : (context.getNodeParameter('limit', itemIndex) as number);
		const options = context.getNodeParameter('options', itemIndex) as any;

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
		const itemId = context.getNodeParameter('itemId', itemIndex) as string;
		return await qlikApiRequest.call(context, 'GET', `/api/v1/items/${itemId}`);
	}

	if (operation === 'update') {
		const itemId = context.getNodeParameter('itemId', itemIndex) as string;
		const body = context.getNodeParameter('body', itemIndex) as any;
		return await qlikApiRequest.call(context, 'PUT', `/api/v1/items/${itemId}`, body);
	}

	if (operation === 'delete') {
		const itemId = context.getNodeParameter('itemId', itemIndex) as string;
		await qlikApiRequest.call(context, 'DELETE', `/api/v1/items/${itemId}`);
		return { success: true };
	}

	if (operation === 'collections') {
		const itemId = context.getNodeParameter('itemId', itemIndex) as string;
		const options = context.getNodeParameter('options', itemIndex) as any;

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
		const itemId = context.getNodeParameter('itemId', itemIndex) as string;
		const options = context.getNodeParameter('options', itemIndex) as any;

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
		const settingsOperation = context.getNodeParameter('settingsOperation', itemIndex) as string;

		if (settingsOperation === 'get') {
			const response = await qlikApiRequest.call(context, 'GET', '/api/v1/items/settings');
			return response.data || response;
		}

		if (settingsOperation === 'patch') {
			const body = context.getNodeParameter('body', itemIndex) as any;
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
		description: 'Interact with Qlik Cloud APIs (Apps, Analytics Tasks, Items, Audits, Assistants, Data Alerts)',
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
			{
				name: 'qlikCloudOAuth2Api',
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
						name: 'Analytics Tasks',
						value: 'analyticsTasks',
						description: 'Manage analytics tasks and runs',
					},
					{
						name: 'Assistants',
						value: 'assistants',
						description: 'Interact with AI assistants',
					},
					{
						name: 'Data Alerts',
						value: 'dataAlerts',
						description: 'Manage data alert tasks and settings',
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
			...analyticsTaskDescription,
			...assistantDescription,
			...dataAlertDescription,
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
					responseData = await handleAppsResource(operation, this, i);
				} else if (resource === 'analyticsTasks') {
					responseData = await handleAnalyticsTasksResource(operation, this, i);
				} else if (resource === 'assistants') {
					responseData = await handleAssistantsResource(operation, this, i);
				} else if (resource === 'dataAlerts') {
					responseData = await handleDataAlertsResource(operation, this, i);
				} else if (resource === 'audits') {
					responseData = await handleAuditsResource(operation, this, i);
				} else if (resource === 'items') {
					responseData = await handleItemsResource(operation, this, i);
				}

				const responses = Array.isArray(responseData) ? responseData : [responseData];
				const executionItems: INodeExecutionData[] = responses.map((data) => {
					if ((data as INodeExecutionData).binary !== undefined || (data as INodeExecutionData).json !== undefined) {
						const asItem = data as INodeExecutionData;
						if (asItem.json === undefined) {
							asItem.json = {};
						}
						return asItem;
					}
					return { json: data as IDataObject };
				});

				const executionData = this.helpers.constructExecutionMetaData(executionItems, {
					itemData: { item: i },
				});
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
