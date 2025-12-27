import type { INodeProperties } from 'n8n-workflow';

const appIdField = {
	displayName: 'App ID',
	name: 'appId',
	type: 'string',
	default: '',
	required: true,
	description: 'The ID of the app',
} satisfies INodeProperties;

export const appsGetAllDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['getAll'],
			},
		},
		description: 'Whether to return all results',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Filter by Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Filter apps by name (case-insensitive)',
			},
			{
				displayName: 'Filter by Space',
				name: 'spaceId',
				type: 'string',
				default: '',
				description: 'Filter apps by space ID',
			},
		],
	},
];

export const appsGetDescription: INodeProperties[] = [
	{
		...appIdField,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['get'],
			},
		},
	},
];

export const appsCreateDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['create'],
			},
		},
		description: 'Name for the new app',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Optional description for the app',
			},
			{
				displayName: 'Locale',
				name: 'locale',
				type: 'string',
				default: '',
				placeholder: 'en-US',
				description: 'Locale for the app (e.g. en-US)',
			},
			{
				displayName: 'Space ID',
				name: 'spaceId',
				type: 'string',
				default: '',
				description: 'Space ID where the app will be created',
			},
		],
	},
];

export const appsUpdateDescription: INodeProperties[] = [
	{
		...appIdField,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['update'],
			},
		},
	},
	{
		displayName: 'Body (JSON)',
		name: 'body',
		type: 'json',
		default: '{}',
		required: true,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['update'],
			},
		},
		description: 'App attributes to update',
	},
];

export const appsDeleteDescription: INodeProperties[] = [
	{
		...appIdField,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['delete'],
			},
		},
		description: 'The ID of the app to delete',
	},
];

export const appsCopyDescription: INodeProperties[] = [
	{
		...appIdField,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['copy'],
			},
		},
		description: 'The ID of the app to copy',
	},
	{
		displayName: 'New Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['copy'],
			},
		},
		description: 'Name for the copied app',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['copy'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Optional description for the copied app',
			},
			{
				displayName: 'Space ID',
				name: 'spaceId',
				type: 'string',
				default: '',
				description: 'Space ID where the app copy will be placed',
			},
		],
	},
];

export const appsExportDescription: INodeProperties[] = [
	{
		...appIdField,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['export'],
			},
		},
		description: 'The ID of the app to export',
	},
];

export const appsPublishDescription: INodeProperties[] = [
	{
		...appIdField,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['publish', 'republish'],
			},
		},
		description: 'The ID of the app to publish',
	},
	{
		displayName: 'Publish Options',
		name: 'publishOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['publish', 'republish'],
			},
		},
		options: [
			{
				displayName: 'Space ID',
				name: 'spaceId',
				type: 'string',
				default: '',
				description: 'Space ID where the app will be (re)published',
			},
		],
	},
];

export const appsDataLineageDescription: INodeProperties[] = [
	{
		...appIdField,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['dataLineage'],
			},
		},
		description: 'Retrieve lineage information for the app',
	},
];

export const appsDataMetadataDescription: INodeProperties[] = [
	{
		...appIdField,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['dataMetadata'],
			},
		},
		description: 'Retrieve data model metadata for the app',
	},
];

export const appsInsightAnalysesDescription: INodeProperties[] = [
	{
		...appIdField,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['listInsights'],
			},
		},
		description: 'List insight analyses for the app',
	},
];

export const appsInsightRecommendDescription: INodeProperties[] = [
	{
		...appIdField,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['recommendInsights'],
			},
		},
		description: 'Recommend insights for the app',
	},
	{
		displayName: 'Recommendation Body (JSON)',
		name: 'body',
		type: 'json',
		default: '{}',
		required: true,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['recommendInsights'],
			},
		},
		description: 'Payload describing fields/measures to recommend insights for',
	},
];

export const appsInsightModelDescription: INodeProperties[] = [
	{
		...appIdField,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['getInsightModel'],
			},
		},
		description: 'Retrieve the insight analyses model',
	},
];

export const appsMediaGetFileDescription: INodeProperties[] = [
	{
		...appIdField,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['mediaGetFile'],
			},
		},
	},
	{
		displayName: 'File Path',
		name: 'path',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['mediaGetFile'],
			},
		},
		description: 'Path within the app media folder (e.g. my/image.png)',
	},
	{
		displayName: 'Binary Property',
		name: 'binaryProperty',
		type: 'string',
		default: 'data',
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['mediaGetFile'],
			},
		},
		description: 'Name of the binary property to store the file in',
	},
];

export const appsMediaUploadFileDescription: INodeProperties[] = [
	{
		...appIdField,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['mediaUploadFile'],
			},
		},
	},
	{
		displayName: 'File Path',
		name: 'path',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['mediaUploadFile'],
			},
		},
		description: 'Path within the app media folder to upload to',
	},
	{
		displayName: 'Binary Property',
		name: 'binaryProperty',
		type: 'string',
		default: 'data',
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['mediaUploadFile'],
			},
		},
		description: 'Name of the incoming binary property to upload',
	},
	{
		displayName: 'Content Type',
		name: 'contentType',
		type: 'string',
		default: 'application/octet-stream',
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['mediaUploadFile'],
			},
		},
		description: 'MIME type for the upload',
	},
];

export const appsMediaDeleteFileDescription: INodeProperties[] = [
	{
		...appIdField,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['mediaDeleteFile'],
			},
		},
	},
	{
		displayName: 'File Path',
		name: 'path',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['mediaDeleteFile'],
			},
		},
		description: 'Path within the app media folder to delete',
	},
];

export const appsMediaListDescription: INodeProperties[] = [
	{
		...appIdField,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['mediaList'],
			},
		},
	},
	{
		displayName: 'Folder Path',
		name: 'path',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['mediaList'],
			},
		},
		description: 'Folder path to list (empty for root)',
	},
];

export const appsMediaThumbnailDescription: INodeProperties[] = [
	{
		...appIdField,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['mediaThumbnail'],
			},
		},
	},
	{
		displayName: 'Binary Property',
		name: 'binaryProperty',
		type: 'string',
		default: 'thumbnail',
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['mediaThumbnail'],
			},
		},
		description: 'Name of the binary property to store the thumbnail in',
	},
];

export const appsChangeObjectOwnerDescription: INodeProperties[] = [
	{
		...appIdField,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['changeObjectOwner'],
			},
		},
	},
	{
		displayName: 'Object ID',
		name: 'objectId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['changeObjectOwner'],
			},
		},
		description: 'App object ID to transfer ownership for',
	},
	{
		displayName: 'New Owner ID',
		name: 'ownerId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['changeObjectOwner'],
			},
		},
		description: 'User ID of the new owner',
	},
];

export const appsUpdateOwnerDescription: INodeProperties[] = [
	{
		...appIdField,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['updateOwner'],
			},
		},
	},
	{
		displayName: 'New Owner ID',
		name: 'ownerId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['updateOwner'],
			},
		},
		description: 'User ID of the new app owner',
	},
];

export const appsReloadLogsDescription: INodeProperties[] = [
	{
		...appIdField,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['reloadLogs'],
			},
		},
		description: 'App ID whose reload logs will be listed',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['reloadLogs'],
			},
		},
		description: 'Whether to return all reload logs',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['reloadLogs'],
				returnAll: [false],
			},
		},
		description: 'Max number of reload logs to return',
	},
];

export const appsReloadLogDescription: INodeProperties[] = [
	{
		...appIdField,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['reloadLog'],
			},
		},
	},
	{
		displayName: 'Reload ID',
		name: 'reloadId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['reloadLog'],
			},
		},
		description: 'Reload ID whose log will be fetched',
	},
];

export const appsReloadMetadataDescription: INodeProperties[] = [
	{
		...appIdField,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['reloadMetadata'],
			},
		},
	},
	{
		displayName: 'Reload ID',
		name: 'reloadId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['reloadMetadata'],
			},
		},
		description: 'Reload ID whose metadata will be fetched',
	},
];

export const appsReportFiltersGetAllDescription: INodeProperties[] = [
	{
		...appIdField,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['reportFiltersGetAll'],
			},
		},
		description: 'App ID whose report filters will be listed',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['reportFiltersGetAll'],
			},
		},
		description: 'Whether to return all report filters',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['reportFiltersGetAll'],
				returnAll: [false],
			},
		},
		description: 'Max number of report filters to return',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['reportFiltersGetAll'],
			},
		},
		options: [
			{
				displayName: 'Filter Query',
				name: 'filter',
				type: 'string',
				default: '',
				description: 'Free text filter for report filters',
			},
			{
				displayName: 'Filter Types',
				name: 'filterTypes',
				type: 'string',
				default: '',
				description: 'Comma separated filter types (e.g. REP)',
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 0,
				description: 'Page number (0-based) when not returning all',
			},
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'string',
				default: '',
				description: 'Sort expression, e.g. +name or -name',
			},
		],
	},
];

export const appsReportFiltersCreateDescription: INodeProperties[] = [
	{
		...appIdField,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['reportFiltersCreate'],
			},
		},
	},
	{
		displayName: 'Filter Body (JSON)',
		name: 'body',
		type: 'json',
		default: '{}',
		required: true,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['reportFiltersCreate'],
			},
		},
		description: 'Report filter definition to create',
	},
];

export const appsReportFiltersGetDescription: INodeProperties[] = [
	{
		...appIdField,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['reportFiltersGet'],
			},
		},
	},
	{
		displayName: 'Filter ID',
		name: 'filterId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['reportFiltersGet'],
			},
		},
		description: 'Report filter ID to retrieve',
	},
];

export const appsReportFiltersUpdateDescription: INodeProperties[] = [
	{
		...appIdField,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['reportFiltersUpdate'],
			},
		},
	},
	{
		displayName: 'Filter ID',
		name: 'filterId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['reportFiltersUpdate'],
			},
		},
	},
	{
		displayName: 'Update Body (JSON)',
		name: 'body',
		type: 'json',
		default: '{}',
		required: true,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['reportFiltersUpdate'],
			},
		},
		description: 'Patch document for the report filter',
	},
];

export const appsReportFiltersDeleteDescription: INodeProperties[] = [
	{
		...appIdField,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['reportFiltersDelete'],
			},
		},
	},
	{
		displayName: 'Filter ID',
		name: 'filterId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['reportFiltersDelete'],
			},
		},
	},
];

export const appsReportFiltersCountDescription: INodeProperties[] = [
	{
		...appIdField,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['reportFiltersCount'],
			},
		},
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['reportFiltersCount'],
			},
		},
		options: [
			{
				displayName: 'Filter Query',
				name: 'filter',
				type: 'string',
				default: '',
				description: 'Free text filter for report filters',
			},
			{
				displayName: 'Filter Types',
				name: 'filterTypes',
				type: 'string',
				default: '',
				description: 'Comma separated filter types (e.g. REP)',
			},
		],
	},
];

export const appsScriptsGetAllDescription: INodeProperties[] = [
	{
		...appIdField,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['scriptsGetAll'],
			},
		},
		description: 'List load scripts for the app',
	},
];

export const appsScriptsCreateDescription: INodeProperties[] = [
	{
		...appIdField,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['scriptsCreate'],
			},
		},
	},
	{
		displayName: 'Script Body (JSON)',
		name: 'body',
		type: 'json',
		default: '{}',
		required: true,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['scriptsCreate'],
			},
		},
		description: 'Script definition to create',
	},
];

export const appsScriptsGetDescription: INodeProperties[] = [
	{
		...appIdField,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['scriptsGet'],
			},
		},
	},
	{
		displayName: 'Script ID',
		name: 'scriptId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['scriptsGet'],
			},
		},
		description: 'Script ID to retrieve',
	},
];

export const appsScriptsUpdateDescription: INodeProperties[] = [
	{
		...appIdField,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['scriptsUpdate'],
			},
		},
	},
	{
		displayName: 'Script ID',
		name: 'scriptId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['scriptsUpdate'],
			},
		},
	},
	{
		displayName: 'Update Body (JSON)',
		name: 'body',
		type: 'json',
		default: '{}',
		required: true,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['scriptsUpdate'],
			},
		},
		description: 'Patch document for the script',
	},
];

export const appsScriptsDeleteDescription: INodeProperties[] = [
	{
		...appIdField,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['scriptsDelete'],
			},
		},
	},
	{
		displayName: 'Script ID',
		name: 'scriptId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['scriptsDelete'],
			},
		},
	},
];

export const appsSpaceMoveDescription: INodeProperties[] = [
	{
		...appIdField,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['moveToSpace'],
			},
		},
	},
	{
		displayName: 'Target Space ID',
		name: 'spaceId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['moveToSpace'],
			},
		},
		description: 'Space ID to move the app to',
	},
];

export const appsSpaceRemoveDescription: INodeProperties[] = [
	{
		...appIdField,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['removeFromSpace'],
			},
		},
		description: 'Remove the app from its current space',
	},
];

export const appsEvaluationsGetAllDescription: INodeProperties[] = [
	{
		...appIdField,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['evaluationsGetAll'],
			},
		},
	},
];

export const appsEvaluationsCreateDescription: INodeProperties[] = [
	{
		...appIdField,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['evaluationsCreate'],
			},
		},
	},
	{
		displayName: 'Evaluation Body (JSON)',
		name: 'body',
		type: 'json',
		default: '{}',
		required: true,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['evaluationsCreate'],
			},
		},
		description: 'Evaluation definition to create',
	},
];

export const appsEvaluationsCompareDescription: INodeProperties[] = [
	{
		displayName: 'Base Evaluation ID',
		name: 'baseEvaluationId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['evaluationsCompare'],
			},
		},
	},
	{
		displayName: 'Comparison Evaluation ID',
		name: 'comparisonEvaluationId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['evaluationsCompare'],
			},
		},
	},
];

export const appsEvaluationsDownloadCompareDescription: INodeProperties[] = [
	{
		displayName: 'Base Evaluation ID',
		name: 'baseEvaluationId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['evaluationsDownloadCompare'],
			},
		},
	},
	{
		displayName: 'Comparison Evaluation ID',
		name: 'comparisonEvaluationId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['evaluationsDownloadCompare'],
			},
		},
	},
	{
		displayName: 'Binary Property',
		name: 'binaryProperty',
		type: 'string',
		default: 'comparison',
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['evaluationsDownloadCompare'],
			},
		},
		description: 'Binary property to store the download in',
	},
];

export const appsEvaluationGetDescription: INodeProperties[] = [
	{
		displayName: 'Evaluation ID',
		name: 'evaluationId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['evaluationGet'],
			},
		},
		description: 'Evaluation ID to retrieve',
	},
];

export const appsEvaluationDownloadDescription: INodeProperties[] = [
	{
		displayName: 'Evaluation ID',
		name: 'evaluationId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['evaluationDownload'],
			},
		},
	},
	{
		displayName: 'Binary Property',
		name: 'binaryProperty',
		type: 'string',
		default: 'evaluation',
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['evaluationDownload'],
			},
		},
		description: 'Binary property to store the download in',
	},
];

export const appsImportDescription: INodeProperties[] = [
	{
		displayName: 'Binary Property',
		name: 'binaryProperty',
		type: 'string',
		default: 'data',
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['importApp'],
			},
		},
		description: 'Binary property containing the QVF file to import',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['importApp'],
			},
		},
		options: [
			{
				displayName: 'App Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Name to use for the imported app',
			},
			{
				displayName: 'Space ID',
				name: 'spaceId',
				type: 'string',
				default: '',
				description: 'Space ID to place the imported app in',
			},
		],
	},
];

export const appsValidateScriptDescription: INodeProperties[] = [
	{
		displayName: 'Validation Body (JSON)',
		name: 'body',
		type: 'json',
		default: '{}',
		required: true,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['validateScript'],
			},
		},
		description: 'Script validation payload',
	},
];

export const appsPrivilegesDescription: INodeProperties[] = [
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['privileges'],
			},
		},
		options: [
			{
				displayName: 'Filter by Role',
				name: 'role',
				type: 'string',
				default: '',
				description: 'Filter privileges by role',
			},
		],
	},
];

export const appDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['apps'],
			},
		},
		options: [
			{ name: 'Change Object Owner', value: 'changeObjectOwner', action: 'Change object owner', description: 'Transfer ownership of an app object' },
			{ name: 'Copy', value: 'copy', action: 'Copy an app', description: 'Create a copy of an app' },
			{ name: 'Create', value: 'create', action: 'Create an app', description: 'Create a new app' },
			{ name: 'Data Lineage', value: 'dataLineage', action: 'Get data lineage', description: 'Retrieve data lineage for an app' },
			{ name: 'Data Metadata', value: 'dataMetadata', action: 'Get data metadata', description: 'Retrieve data model metadata for an app' },
			{ name: 'Delete', value: 'delete', action: 'Delete an app', description: 'Delete an app' },
			{ name: 'Evaluation Download', value: 'evaluationDownload', action: 'Download evaluation', description: 'Download an evaluation result' },
			{ name: 'Evaluation Get', value: 'evaluationGet', action: 'Get evaluation', description: 'Retrieve a specific evaluation' },
			{ name: 'Evaluations Compare', value: 'evaluationsCompare', action: 'Compare evaluations', description: 'Compare two app evaluations' },
			{ name: 'Evaluations Download Compare', value: 'evaluationsDownloadCompare', action: 'Download evaluation comparison', description: 'Download comparison results between evaluations' },
			{ name: 'Evaluations Get All', value: 'evaluationsGetAll', action: 'List evaluations', description: 'List evaluations for an app' },
			{ name: 'Evaluations Create', value: 'evaluationsCreate', action: 'Create evaluation', description: 'Create a new evaluation for an app' },
			{ name: 'Export', value: 'export', action: 'Export an app', description: 'Export app data' },
			{ name: 'Get', value: 'get', action: 'Get an app', description: 'Retrieve a specific app by ID' },
			{ name: 'Get All', value: 'getAll', action: 'Get all apps', description: 'Retrieve all available apps' },
			{ name: 'Get Insight Model', value: 'getInsightModel', action: 'Get insight model', description: 'Retrieve the insight analyses model' },
			{ name: 'Import', value: 'importApp', action: 'Import an app', description: 'Import an app from a QVF file' },
			{ name: 'List Insight Analyses', value: 'listInsights', action: 'List insight analyses', description: 'List insight analyses for an app' },
			{ name: 'Media Delete File', value: 'mediaDeleteFile', action: 'Delete media file', description: 'Delete a media file in the app' },
			{ name: 'Media Get File', value: 'mediaGetFile', action: 'Download media file', description: 'Download a media file from the app' },
			{ name: 'Media List', value: 'mediaList', action: 'List media files', description: 'List media files in the app' },
			{ name: 'Media Thumbnail', value: 'mediaThumbnail', action: 'Get app thumbnail', description: 'Download app thumbnail' },
			{ name: 'Media Upload File', value: 'mediaUploadFile', action: 'Upload media file', description: 'Upload a media file to the app' },
			{ name: 'Move to Space', value: 'moveToSpace', action: 'Move app to space', description: 'Move app to another space' },
			{ name: 'Privileges', value: 'privileges', action: 'Get app privileges', description: 'Retrieve app access privileges' },
			{ name: 'Publish', value: 'publish', action: 'Publish an app', description: 'Publish an app to a space' },
			{ name: 'Reload Log', value: 'reloadLog', action: 'Get a reload log', description: 'Retrieve a specific reload log' },
			{ name: 'Reload Logs', value: 'reloadLogs', action: 'Get reload logs', description: 'Retrieve reload logs for an app' },
			{ name: 'Reload Metadata', value: 'reloadMetadata', action: 'Get reload metadata', description: 'Retrieve reload metadata for a reload' },
			{ name: 'Remove From Space', value: 'removeFromSpace', action: 'Remove app from space', description: 'Remove the app from its current space' },
			{ name: 'Report Filters Count', value: 'reportFiltersCount', action: 'Count report filters', description: 'Count report filters for an app' },
			{ name: 'Report Filters Create', value: 'reportFiltersCreate', action: 'Create report filter', description: 'Create a new report filter' },
			{ name: 'Report Filters Delete', value: 'reportFiltersDelete', action: 'Delete report filter', description: 'Delete a report filter' },
			{ name: 'Report Filters Get', value: 'reportFiltersGet', action: 'Get report filter', description: 'Retrieve a specific report filter' },
			{ name: 'Report Filters Get All', value: 'reportFiltersGetAll', action: 'List report filters', description: 'List report filters for an app' },
			{ name: 'Report Filters Update', value: 'reportFiltersUpdate', action: 'Update report filter', description: 'Update a report filter' },
			{ name: 'Republish', value: 'republish', action: 'Republish an app', description: 'Republish an app to a space' },
			{ name: 'Recommend Insights', value: 'recommendInsights', action: 'Recommend insights', description: 'Get recommended insights for an app' },
			{ name: 'Scripts Create', value: 'scriptsCreate', action: 'Create script', description: 'Create a new script entry' },
			{ name: 'Scripts Delete', value: 'scriptsDelete', action: 'Delete script', description: 'Delete a script entry' },
			{ name: 'Scripts Get', value: 'scriptsGet', action: 'Get script', description: 'Retrieve a specific script entry' },
			{ name: 'Scripts Get All', value: 'scriptsGetAll', action: 'List scripts', description: 'List scripts for an app' },
			{ name: 'Scripts Update', value: 'scriptsUpdate', action: 'Update script', description: 'Update a script entry' },
			{ name: 'Update', value: 'update', action: 'Update an app', description: 'Update app properties' },
			{ name: 'Update Owner', value: 'updateOwner', action: 'Update app owner', description: 'Transfer ownership of the app' },
			{ name: 'Validate Script', value: 'validateScript', action: 'Validate script', description: 'Validate a script for an app' },
		],
		default: 'getAll',
	},
	...appsGetAllDescription,
	...appsGetDescription,
	...appsCreateDescription,
	...appsUpdateDescription,
	...appsDeleteDescription,
	...appsCopyDescription,
	...appsExportDescription,
	...appsPublishDescription,
	...appsDataLineageDescription,
	...appsDataMetadataDescription,
	...appsInsightAnalysesDescription,
	...appsInsightRecommendDescription,
	...appsInsightModelDescription,
	...appsMediaGetFileDescription,
	...appsMediaUploadFileDescription,
	...appsMediaDeleteFileDescription,
	...appsMediaListDescription,
	...appsMediaThumbnailDescription,
	...appsChangeObjectOwnerDescription,
	...appsUpdateOwnerDescription,
	...appsReloadLogsDescription,
	...appsReloadLogDescription,
	...appsReloadMetadataDescription,
	...appsReportFiltersGetAllDescription,
	...appsReportFiltersCreateDescription,
	...appsReportFiltersGetDescription,
	...appsReportFiltersUpdateDescription,
	...appsReportFiltersDeleteDescription,
	...appsReportFiltersCountDescription,
	...appsScriptsGetAllDescription,
	...appsScriptsCreateDescription,
	...appsScriptsGetDescription,
	...appsScriptsUpdateDescription,
	...appsScriptsDeleteDescription,
	...appsSpaceMoveDescription,
	...appsSpaceRemoveDescription,
	...appsEvaluationsGetAllDescription,
	...appsEvaluationsCreateDescription,
	...appsEvaluationsCompareDescription,
	...appsEvaluationsDownloadCompareDescription,
	...appsEvaluationGetDescription,
	...appsEvaluationDownloadDescription,
	...appsImportDescription,
	...appsValidateScriptDescription,
	...appsPrivilegesDescription,
];
