import type { INodeProperties } from 'n8n-workflow';

export const auditsGetAllDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['audits'],
				operation: ['getAll'],
			},
		},
		description: 'Whether to return all results',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 10,
		displayOptions: {
			show: {
				resource: ['audits'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		description: 'Max number of audit events to return (1-100)',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['audits'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Filter by Event Type',
				name: 'eventType',
				type: 'string',
				default: '',
				description: 'Filter by event type',
			},
			{
				displayName: 'Filter by User ID',
				name: 'userId',
				type: 'string',
				default: '',
				description: 'Filter by user who triggered the event',
			},
			{
				displayName: 'Filter by Source',
				name: 'source',
				type: 'string',
				default: '',
				description: 'Filter by event source',
			},
			{
				displayName: 'Event Time Range',
				name: 'eventTime',
				type: 'string',
				default: '',
				placeholder: 'YYYY-MM-DDThh:mm:ss.sssZ/YYYY-MM-DDThh:mm:ss.sssZ',
				description: 'ISO 8601 formatted time range',
			},
			{
				displayName: 'Sort By',
				name: 'sort',
				type: 'options',
				options: [
					{
						name: 'Event Time (Descending)',
						value: '-eventTime',
					},
					{
						name: 'Event Time (Ascending)',
						value: '+eventTime',
					},
					{
						name: 'Source',
						value: 'source',
					},
					{
						name: 'Event Type',
						value: 'eventType',
					},
				],
				default: '-eventTime',
				description: 'Property to sort by',
			},
		],
	},
];

export const auditsGetDescription: INodeProperties[] = [
	{
		displayName: 'Audit Event ID',
		name: 'auditId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['audits'],
				operation: ['get'],
			},
		},
		description: 'The ID of the audit event to retrieve',
	},
];

export const auditsGetSourcesDescription: INodeProperties[] = [
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		default: 'Retrieves list of possible event sources for audit events',
		displayOptions: {
			show: {
				resource: ['audits'],
				operation: ['getSources'],
			},
		},
		description: 'Returns available audit event sources',
	},
];

export const auditsGetTypesDescription: INodeProperties[] = [
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		default: 'Retrieves list of possible event types for audit events',
		displayOptions: {
			show: {
				resource: ['audits'],
				operation: ['getTypes'],
			},
		},
		description: 'Returns available audit event types',
	},
];

export const auditsGetSettingsDescription: INodeProperties[] = [
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		default: 'Retrieves audit server configuration options',
		displayOptions: {
			show: {
				resource: ['audits'],
				operation: ['getSettings'],
			},
		},
		description: 'Returns audit server configuration including TTL and archive settings',
	},
];

export const auditDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['audits'],
			},
		},
		options: [
			{
				name: 'Get All',
				value: 'getAll',
				action: 'Get all audit events',
				description: 'Retrieve recent audit events',
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get an audit event',
				description: 'Retrieve a specific audit event by ID',
			},
			{
				name: 'Get Sources',
				value: 'getSources',
				action: 'Get available event sources',
				description: 'List possible audit event sources',
			},
			{
				name: 'Get Types',
				value: 'getTypes',
				action: 'Get available event types',
				description: 'List possible audit event types',
			},
			{
				name: 'Get Settings',
				value: 'getSettings',
				action: 'Get audit settings',
				description: 'Retrieve audit server configuration',
			},
		],
		default: 'getAll',
	},
	...auditsGetAllDescription,
	...auditsGetDescription,
	...auditsGetSourcesDescription,
	...auditsGetTypesDescription,
	...auditsGetSettingsDescription,
];
