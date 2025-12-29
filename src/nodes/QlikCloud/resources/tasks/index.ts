import type { INodeProperties } from 'n8n-workflow';

const taskIdField = {
	displayName: 'Task ID',
	name: 'taskId',
	type: 'string',
	default: '',
	required: true,
	description: 'The unique identifier of the task',
} satisfies INodeProperties;

const runIdField = {
	displayName: 'Run ID',
	name: 'runId',
	type: 'string',
	default: '',
	required: true,
	description: 'The identifier of the task run',
} satisfies INodeProperties;

const resourceIdField = {
	displayName: 'Resource ID',
	name: 'resourceId',
	type: 'string',
	default: '',
	required: true,
	description: 'Target resource ID the task is associated with',
} satisfies INodeProperties;

export const analyticsTasksGetAllDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['analyticsTasks'],
				operation: ['getAll'],
			},
		},
		description: 'Whether to return all tasks',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 20,
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		displayOptions: {
			show: {
				resource: ['analyticsTasks'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		description: 'Max number of tasks to return (1-100)',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['analyticsTasks'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Page Cursor',
				name: 'page',
				type: 'string',
				default: '',
				description: 'Cursor for fetching a specific page of tasks',
			},
			{
				displayName: 'Resource ID',
				name: 'resourceId',
				type: 'string',
				default: '',
				description: 'Filter tasks by the target resource ID',
			},
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'options',
				options: [
					{ name: 'Updated At (Newest First)', value: '-updatedAt' },
					{ name: 'Updated At (Oldest First)', value: '+updatedAt' },
					{ name: 'Created At (Newest First)', value: '-createdAt' },
					{ name: 'Created At (Oldest First)', value: '+createdAt' },
				],
				default: '-updatedAt',
				description: 'Property to sort on',
			},
		],
	},
];

export const analyticsTasksCreateDescription: INodeProperties[] = [
	{
		displayName: 'Task (JSON)',
		name: 'body',
		type: 'json',
		default: '{}',
		required: true,
		displayOptions: {
			show: {
				resource: ['analyticsTasks'],
				operation: ['create'],
			},
		},
		description: 'Task definition payload',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['analyticsTasks'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Migrate From Task ID',
				name: 'migrateFrom',
				type: 'string',
				default: '',
				description: 'Reload-task ID to migrate from the old system',
			},
		],
	},
];

export const analyticsTasksGetDescription: INodeProperties[] = [
	{
		...taskIdField,
		displayOptions: {
			show: {
				resource: ['analyticsTasks'],
				operation: ['get'],
			},
		},
	},
];

export const analyticsTasksUpdateDescription: INodeProperties[] = [
	{
		...taskIdField,
		displayOptions: {
			show: {
				resource: ['analyticsTasks'],
				operation: ['update'],
			},
		},
	},
	{
		displayName: 'Task (JSON)',
		name: 'body',
		type: 'json',
		default: '{}',
		required: true,
		displayOptions: {
			show: {
				resource: ['analyticsTasks'],
				operation: ['update'],
			},
		},
		description: 'Updated task definition; ownership transfers to caller if needed',
	},
];

export const analyticsTasksDeleteDescription: INodeProperties[] = [
	{
		...taskIdField,
		displayOptions: {
			show: {
				resource: ['analyticsTasks'],
				operation: ['delete'],
			},
		},
		description: 'Task ID to delete',
	},
];

export const analyticsTasksStartDescription: INodeProperties[] = [
	{
		...taskIdField,
		displayOptions: {
			show: {
				resource: ['analyticsTasks'],
				operation: ['start'],
			},
		},
	},
	{
		displayName: 'Trigger Source',
		name: 'source',
		type: 'string',
		default: 'manual',
		displayOptions: {
			show: {
				resource: ['analyticsTasks'],
				operation: ['start'],
			},
		},
		description: 'Origin of the trigger; defaults to manual if not set',
	},
];

export const analyticsTasksRunsGetAllDescription: INodeProperties[] = [
	{
		...taskIdField,
		displayOptions: {
			show: {
				resource: ['analyticsTasks'],
				operation: ['getRuns'],
			},
		},
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['analyticsTasks'],
				operation: ['getRuns'],
			},
		},
		description: 'Whether to return all task runs',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 20,
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		displayOptions: {
			show: {
				resource: ['analyticsTasks'],
				operation: ['getRuns'],
				returnAll: [false],
			},
		},
		description: 'Max number of task runs to return (1-100)',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['analyticsTasks'],
				operation: ['getRuns'],
			},
		},
		options: [
			{
				displayName: 'Page Cursor',
				name: 'page',
				type: 'string',
				default: '',
				description: 'Cursor for fetching a specific page of task runs',
			},
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'options',
				options: [
					{ name: 'Started At (Newest First)', value: '-startedAt' },
					{ name: 'Started At (Oldest First)', value: '+startedAt' },
					{ name: 'Ended At (Newest First)', value: '-endedAt' },
					{ name: 'Ended At (Oldest First)', value: '+endedAt' },
					{ name: 'Status (Ascending)', value: '+status' },
					{ name: 'Status (Descending)', value: '-status' },
					{ name: 'Task ID (Ascending)', value: '+taskId' },
					{ name: 'Task ID (Descending)', value: '-taskId' },
					{ name: 'Action ID (Ascending)', value: '+actionId' },
					{ name: 'Action ID (Descending)', value: '-actionId' },
				],
				default: '-startedAt',
				description: 'Property to sort runs on',
			},
		],
	},
];

export const analyticsTasksRunsLastDescription: INodeProperties[] = [
	{
		...taskIdField,
		displayOptions: {
			show: {
				resource: ['analyticsTasks'],
				operation: ['getLastRun'],
			},
		},
		description: 'Task ID whose latest run should be returned',
	},
];

export const analyticsTasksRunLogDescription: INodeProperties[] = [
	{
		...taskIdField,
		displayOptions: {
			show: {
				resource: ['analyticsTasks'],
				operation: ['getRunLog'],
			},
		},
	},
	{
		...runIdField,
		displayOptions: {
			show: {
				resource: ['analyticsTasks'],
				operation: ['getRunLog'],
			},
		},
	},
	{
		displayName: 'Response Format',
		name: 'responseFormat',
		type: 'options',
		options: [
			{ name: 'JSON', value: 'json' },
			{ name: 'Plain Text', value: 'text' },
		],
		default: 'json',
		displayOptions: {
			show: {
				resource: ['analyticsTasks'],
				operation: ['getRunLog'],
			},
		},
		description: 'Content type to request for the log',
	},
];

export const analyticsTasksResourceRunsDescription: INodeProperties[] = [
	{
		...resourceIdField,
		displayOptions: {
			show: {
				resource: ['analyticsTasks'],
				operation: ['getResourceRuns'],
			},
		},
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['analyticsTasks'],
				operation: ['getResourceRuns'],
			},
		},
		description: 'Whether to return all task runs for the resource',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 20,
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		displayOptions: {
			show: {
				resource: ['analyticsTasks'],
				operation: ['getResourceRuns'],
				returnAll: [false],
			},
		},
		description: 'Max number of task runs to return (1-100)',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['analyticsTasks'],
				operation: ['getResourceRuns'],
			},
		},
		options: [
			{
				displayName: 'Page Cursor',
				name: 'page',
				type: 'string',
				default: '',
				description: 'Cursor for fetching a specific page of task runs',
			},
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'options',
				options: [
					{ name: 'Started At (Newest First)', value: '-startedAt' },
					{ name: 'Started At (Oldest First)', value: '+startedAt' },
					{ name: 'Ended At (Newest First)', value: '-endedAt' },
					{ name: 'Ended At (Oldest First)', value: '+endedAt' },
					{ name: 'Status (Ascending)', value: '+status' },
					{ name: 'Status (Descending)', value: '-status' },
					{ name: 'Task ID (Ascending)', value: '+taskId' },
					{ name: 'Task ID (Descending)', value: '-taskId' },
					{ name: 'Action ID (Ascending)', value: '+actionId' },
					{ name: 'Action ID (Descending)', value: '-actionId' },
				],
				default: '-startedAt',
				description: 'Property to sort runs on',
			},
		],
	},
];

export const analyticsTaskDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['analyticsTasks'],
			},
		},
		options: [
			{
				name: 'Get All Tasks',
				value: 'getAll',
				action: 'Get all analytics tasks',
				description: 'List analytics tasks available to the user',
			},
			{
				name: 'Create Task',
				value: 'create',
				action: 'Create an analytics task',
				description: 'Create a new analytics task',
			},
			{
				name: 'Get Task',
				value: 'get',
				action: 'Get an analytics task',
				description: 'Retrieve a specific analytics task',
			},
			{
				name: 'Update Task',
				value: 'update',
				action: 'Update an analytics task',
				description: 'Update a specific analytics task',
			},
			{
				name: 'Delete Task',
				value: 'delete',
				action: 'Delete an analytics task',
				description: 'Delete a specific analytics task',
			},
			{
				name: 'Start Task',
				value: 'start',
				action: 'Start an analytics task',
				description: 'Trigger execution of a task',
			},
			{
				name: 'Get Task Runs',
				value: 'getRuns',
				action: 'Get runs for a task',
				description: 'List runs for a specific task',
			},
			{
				name: 'Get Last Task Run',
				value: 'getLastRun',
				action: 'Get last run for a task',
				description: 'Retrieve the last run of a task',
			},
			{
				name: 'Get Task Run Log',
				value: 'getRunLog',
				action: 'Get run log for a task',
				description: 'Retrieve the log for a specific task run',
			},
			{
				name: 'Get Resource Task Runs',
				value: 'getResourceRuns',
				action: 'Get task runs for a resource',
				description: 'List task runs linked to a resource ID',
			},
		],
		default: 'getAll',
	},
	...analyticsTasksGetAllDescription,
	...analyticsTasksCreateDescription,
	...analyticsTasksGetDescription,
	...analyticsTasksUpdateDescription,
	...analyticsTasksDeleteDescription,
	...analyticsTasksStartDescription,
	...analyticsTasksRunsGetAllDescription,
	...analyticsTasksRunsLastDescription,
	...analyticsTasksRunLogDescription,
	...analyticsTasksResourceRunsDescription,
];
