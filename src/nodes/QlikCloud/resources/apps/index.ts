import type { INodeProperties } from 'n8n-workflow';

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
		displayName: 'App ID',
		name: 'appId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['get'],
			},
		},
		description: 'The ID of the app to retrieve',
	},
];

export const appsCreateDescription: INodeProperties[] = [
	{
		displayName: 'App Name',
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
		description: 'Name of the new app',
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
				description: 'Description of the app',
			},
			{
				displayName: 'Locale',
				name: 'locale',
				type: 'string',
				default: '',
				description: 'Locale for the app (e.g., en-US)',
			},
			{
				displayName: 'Space ID',
				name: 'spaceId',
				type: 'string',
				default: '',
				description: 'Space where the app will be created',
			},
		],
	},
];

export const appsUpdateDescription: INodeProperties[] = [
	{
		displayName: 'App ID',
		name: 'appId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['update'],
			},
		},
		description: 'The ID of the app to update',
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
		displayName: 'App ID',
		name: 'appId',
		type: 'string',
		default: '',
		required: true,
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
		displayName: 'Source App ID',
		name: 'appId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['copy'],
			},
		},
		description: 'The ID of the app to copy',
	},
	{
		displayName: 'New App Name',
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
				description: 'Description for the copied app',
			},
			{
				displayName: 'Space ID',
				name: 'spaceId',
				type: 'string',
				default: '',
				description: 'Space where the app will be copied',
			},
		],
	},
];

export const appsExportDescription: INodeProperties[] = [
	{
		displayName: 'App ID',
		name: 'appId',
		type: 'string',
		default: '',
		required: true,
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
		displayName: 'App ID',
		name: 'appId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['apps'],
				operation: ['publish'],
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
				operation: ['publish'],
			},
		},
		options: [
			{
				displayName: 'Target Space ID',
				name: 'spaceId',
				type: 'string',
				default: '',
				description: 'Space ID where app will be published',
			},
		],
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
			{
				name: 'Get All',
				value: 'getAll',
				action: 'Get all apps',
				description: 'Retrieve all available apps',
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get an app',
				description: 'Retrieve a specific app by ID',
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create an app',
				description: 'Create a new app',
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update an app',
				description: 'Update app properties',
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete an app',
				description: 'Delete an app',
			},
			{
				name: 'Copy',
				value: 'copy',
				action: 'Copy an app',
				description: 'Create a copy of an app',
			},
			{
				name: 'Export',
				value: 'export',
				action: 'Export an app',
				description: 'Export app data',
			},
			{
				name: 'Publish',
				value: 'publish',
				action: 'Publish an app',
				description: 'Publish an app to a space',
			},
			{
				name: 'Get Privileges',
				value: 'privileges',
				action: 'Get app privileges',
				description: 'Retrieve app access privileges',
			},
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
	...appsPrivilegesDescription,
];
