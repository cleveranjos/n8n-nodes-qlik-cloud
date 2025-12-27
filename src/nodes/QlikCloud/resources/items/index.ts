import type { INodeProperties } from 'n8n-workflow';

export const itemsGetAllDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['items'],
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
				resource: ['items'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		description: 'Max number of items to return (1-100)',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['items'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Search by Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Case-insensitive search for item by name',
			},
			{
				displayName: 'Filter by Resource Type',
				name: 'resourceType',
				type: 'string',
				default: '',
				placeholder: 'e.g., app,qvapp,dataasset',
				description: 'Filter by resource type(s)',
			},
			{
				displayName: 'Filter by Space',
				name: 'spaceId',
				type: 'string',
				default: '',
				description: 'Filter by space ID',
			},
			{
				displayName: 'Filter by Owner',
				name: 'ownerId',
				type: 'string',
				default: '',
				description: 'Filter by owner ID',
			},
			{
				displayName: 'Sort By',
				name: 'sort',
				type: 'options',
				options: [
					{
						name: 'Created (Ascending)',
						value: '+createdAt',
					},
					{
						name: 'Created (Descending)',
						value: '-createdAt',
					},
					{
						name: 'Name (Ascending)',
						value: '+name',
					},
					{
						name: 'Name (Descending)',
						value: '-name',
					},
					{
						name: 'Updated (Ascending)',
						value: '+updatedAt',
					},
					{
						name: 'Updated (Descending)',
						value: '-updatedAt',
					},
				],
				default: '+createdAt',
				description: 'Property to sort by',
			},
		],
	},
];

export const itemsGetDescription: INodeProperties[] = [
	{
		displayName: 'Item ID',
		name: 'itemId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['items'],
				operation: ['get'],
			},
		},
		description: 'The ID of the item to retrieve',
	},
];

export const itemsUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Item ID',
		name: 'itemId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['items'],
				operation: ['update'],
			},
		},
		description: 'The ID of the item to update',
	},
	{
		displayName: 'Body (JSON)',
		name: 'body',
		type: 'json',
		default: '{}',
		required: true,
		displayOptions: {
			show: {
				resource: ['items'],
				operation: ['update'],
			},
		},
		description: 'Item attributes to update',
	},
];

export const itemsDeleteDescription: INodeProperties[] = [
	{
		displayName: 'Item ID',
		name: 'itemId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['items'],
				operation: ['delete'],
			},
		},
		description: 'The ID of the item to delete',
	},
];

export const itemsCollectionsDescription: INodeProperties[] = [
	{
		displayName: 'Item ID',
		name: 'itemId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['items'],
				operation: ['collections'],
			},
		},
		description: 'The ID of the item',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['items'],
				operation: ['collections'],
			},
		},
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 10,
				description: 'Max number of collections to return',
			},
		],
	},
];

export const itemsPublishedItemsDescription: INodeProperties[] = [
	{
		displayName: 'Item ID',
		name: 'itemId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['items'],
				operation: ['publishedItems'],
			},
		},
		description: 'The ID of the item',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['items'],
				operation: ['publishedItems'],
			},
		},
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 10,
				description: 'Max number of published items to return',
			},
		],
	},
];

export const itemsSettingsDescription: INodeProperties[] = [
	{
		displayName: 'Operation Type',
		name: 'settingsOperation',
		type: 'options',
		default: 'get',
		displayOptions: {
			show: {
				resource: ['items'],
				operation: ['settings'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve items service settings',
			},
			{
				name: 'Patch',
				value: 'patch',
				description: 'Update items service settings',
			},
		],
	},
	{
		displayName: 'Patch Body (JSON)',
		name: 'body',
		type: 'json',
		default: '[]',
		displayOptions: {
			show: {
				resource: ['items'],
				operation: ['settings'],
				settingsOperation: ['patch'],
			},
		},
		description: 'JSONPatch document per RFC 6902',
	},
];

export const itemDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['items'],
			},
		},
		options: [
			{
				name: 'Get All',
				value: 'getAll',
				action: 'Get all items',
				description: 'Retrieve all accessible items',
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get an item',
				description: 'Retrieve a specific item by ID',
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update an item',
				description: 'Update item properties',
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete an item',
				description: 'Delete an item',
			},
			{
				name: 'Collections',
				value: 'collections',
				action: 'Get item collections',
				description: 'List collections (tags) for an item',
			},
			{
				name: 'Published Items',
				value: 'publishedItems',
				action: 'Get published items',
				description: 'List published copies for an item',
			},
			{
				name: 'Settings',
				value: 'settings',
				action: 'Get/Update items settings',
				description: 'Manage items service settings',
			},
		],
		default: 'getAll',
	},
	...itemsGetAllDescription,
	...itemsGetDescription,
	...itemsUpdateDescription,
	...itemsDeleteDescription,
	...itemsCollectionsDescription,
	...itemsPublishedItemsDescription,
	...itemsSettingsDescription,
];
