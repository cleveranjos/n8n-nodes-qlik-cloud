import type { INodeProperties } from 'n8n-workflow';

const alertIdField = {
	displayName: 'Alert ID',
	name: 'alertId',
	type: 'string',
	default: '',
	required: true,
	description: 'The ID of the data alert task',
} satisfies INodeProperties;

const executionIdField = {
	displayName: 'Execution ID',
	name: 'executionId',
	type: 'string',
	default: '',
	required: true,
	description: 'The ID of the execution',
} satisfies INodeProperties;

const taskIdField = {
	displayName: 'Task ID',
	name: 'taskId',
	type: 'string',
	default: '',
	required: true,
	description: 'The ID of the data alert task',
} satisfies INodeProperties;

export const dataAlertsGetAllDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['dataAlerts'],
				operation: ['getAll'],
			},
		},
		description: 'Whether to return all data alert tasks',
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
				resource: ['dataAlerts'],
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
				resource: ['dataAlerts'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'App ID',
				name: 'appId',
				type: 'string',
				default: '',
				description: 'Filter alerts by app ID',
			},
			{
				displayName: 'Condition ID',
				name: 'conditionId',
				type: 'string',
				default: '',
				description: 'Filter alerts by condition ID',
			},
			{
				displayName: 'Owner ID',
				name: 'ownerId',
				type: 'string',
				default: '',
				description: 'Filter alerts by owner ID',
			},
			{
				displayName: 'Owner Name',
				name: 'ownerName',
				type: 'string',
				default: '',
				description: 'Filter alerts by owner name',
			},
			{
				displayName: 'Role',
				name: 'role',
				type: 'string',
				default: '',
				description: 'Filter alerts by role',
			},
			{
				displayName: 'Next Cursor',
				name: 'next',
				type: 'string',
				default: '',
				description: 'Cursor for the next page',
			},
			{
				displayName: 'Previous Cursor',
				name: 'prev',
				type: 'string',
				default: '',
				description: 'Cursor for the previous page',
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				typeOptions: { minValue: 0 },
				default: 0,
				description: 'Offset to start listing from',
			},
		],
	},
];

export const dataAlertsCreateDescription: INodeProperties[] = [
	{
		displayName: 'Alert Task (JSON)',
		name: 'body',
		type: 'json',
		default: '{}',
		required: true,
		displayOptions: {
			show: {
				resource: ['dataAlerts'],
				operation: ['create'],
			},
		},
		description: 'Definition of the data alert task to create',
	},
];

export const dataAlertsGetDescription: INodeProperties[] = [
	{
		...alertIdField,
		displayOptions: {
			show: {
				resource: ['dataAlerts'],
				operation: ['get'],
			},
		},
	},
];

export const dataAlertsUpdateDescription: INodeProperties[] = [
	{
		...alertIdField,
		displayOptions: {
			show: {
				resource: ['dataAlerts'],
				operation: ['update'],
			},
		},
	},
	{
		displayName: 'Alert Task (JSON)',
		name: 'body',
		type: 'json',
		default: '{}',
		required: true,
		displayOptions: {
			show: {
				resource: ['dataAlerts'],
				operation: ['update'],
			},
		},
		description: 'JSON Patch payload for the data alert task',
	},
];

export const dataAlertsDeleteDescription: INodeProperties[] = [
	{
		...alertIdField,
		displayOptions: {
			show: {
				resource: ['dataAlerts'],
				operation: ['delete'],
			},
		},
		description: 'The ID of the data alert task to delete',
	},
];

export const dataAlertsConditionDescription: INodeProperties[] = [
	{
		...alertIdField,
		displayOptions: {
			show: {
				resource: ['dataAlerts'],
				operation: ['getCondition'],
			},
		},
		description: 'The data alert task whose condition will be retrieved',
	},
];

export const dataAlertsExecutionDescription: INodeProperties[] = [
	{
		...alertIdField,
		displayOptions: {
			show: {
				resource: ['dataAlerts'],
				operation: ['getExecution', 'deleteExecution'],
			},
		},
	},
	{
		...executionIdField,
		displayOptions: {
			show: {
				resource: ['dataAlerts'],
				operation: ['getExecution', 'deleteExecution'],
			},
		},
	},
];

export const dataAlertsRecipientStatsDescription: INodeProperties[] = [
	{
		...alertIdField,
		displayOptions: {
			show: {
				resource: ['dataAlerts'],
				operation: ['recipientStats'],
			},
		},
		description: 'The data alert task whose recipient stats will be retrieved',
	},
];

export const dataAlertsExecutionsListDescription: INodeProperties[] = [
	{
		...taskIdField,
		displayOptions: {
			show: {
				resource: ['dataAlerts'],
				operation: ['listExecutions'],
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
				resource: ['dataAlerts'],
				operation: ['listExecutions'],
			},
		},
		description: 'Whether to return all executions',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 20,
		typeOptions: { minValue: 1, maxValue: 100 },
		displayOptions: {
			show: {
				resource: ['dataAlerts'],
				operation: ['listExecutions'],
				returnAll: [false],
			},
		},
		description: 'Max number of executions to return (1-100)',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['dataAlerts'],
				operation: ['listExecutions'],
			},
		},
		options: [
			{
				displayName: 'Next Cursor',
				name: 'next',
				type: 'string',
				default: '',
				description: 'Cursor for the next page',
			},
			{
				displayName: 'Previous Cursor',
				name: 'prev',
				type: 'string',
				default: '',
				description: 'Cursor for the previous page',
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				typeOptions: { minValue: 0 },
				default: 0,
				description: 'Offset to start listing from',
			},
		],
	},
];

export const dataAlertsExecutionEvaluationDescription: INodeProperties[] = [
	{
		...taskIdField,
		displayOptions: {
			show: {
				resource: ['dataAlerts'],
				operation: ['getExecutionEvaluation'],
			},
		},
	},
	{
		...executionIdField,
		displayOptions: {
			show: {
				resource: ['dataAlerts'],
				operation: ['getExecutionEvaluation'],
			},
		},
	},
];

export const dataAlertsExecutionStatsDescription: INodeProperties[] = [
	{
		...taskIdField,
		displayOptions: {
			show: {
				resource: ['dataAlerts'],
				operation: ['getExecutionStats'],
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
				resource: ['dataAlerts'],
				operation: ['getExecutionStats'],
			},
		},
		options: [
			{
				displayName: 'Period',
				name: 'period',
				type: 'string',
				default: '',
				description: 'Time period for stats (e.g. day, week, month)',
			},
		],
	},
];

export const dataAlertsTriggerDescription: INodeProperties[] = [
	{
		displayName: 'Trigger Payload (JSON)',
		name: 'body',
		type: 'json',
		default: '{}',
		required: true,
		displayOptions: {
			show: {
				resource: ['dataAlerts'],
				operation: ['trigger'],
			},
		},
		description: 'Payload describing alert tasks to trigger',
	},
];

export const dataAlertsValidateDescription: INodeProperties[] = [
	{
		displayName: 'Validation Payload (JSON)',
		name: 'body',
		type: 'json',
		default: '{}',
		required: true,
		displayOptions: {
			show: {
				resource: ['dataAlerts'],
				operation: ['validate'],
			},
		},
		description: 'Payload to validate a data alert task definition',
	},
];

export const dataAlertsSettingsGetDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'hidden',
		default: 'getSettings',
		displayOptions: {
			show: {
				resource: ['dataAlerts'],
				operation: ['getSettings'],
			},
		},
	},
];

export const dataAlertsSettingsUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Settings Payload (JSON)',
		name: 'body',
		type: 'json',
		default: '{}',
		required: true,
		displayOptions: {
			show: {
				resource: ['dataAlerts'],
				operation: ['updateSettings'],
			},
		},
		description: 'Settings to apply to the data alert service',
	},
];

export const dataAlertDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['dataAlerts'],
			},
		},
		options: [
			{
				name: 'List Alert Tasks',
				value: 'getAll',
				action: 'List data alert tasks',
				description: 'Retrieve data alert tasks accessible to the user',
			},
			{
				name: 'Create Alert Task',
				value: 'create',
				action: 'Create a data alert task',
				description: 'Create a new data alert task',
			},
			{
				name: 'Get Alert Task',
				value: 'get',
				action: 'Get a data alert task',
				description: 'Retrieve a specific data alert task',
			},
			{
				name: 'Update Alert Task',
				value: 'update',
				action: 'Update a data alert task',
				description: 'Update a specific data alert task',
			},
			{
				name: 'Delete Alert Task',
				value: 'delete',
				action: 'Delete a data alert task',
				description: 'Delete a specific data alert task',
			},
			{
				name: 'Get Alert Condition',
				value: 'getCondition',
				action: 'Get the condition for an alert',
				description: 'Retrieve the condition for a data alert task',
			},
			{
				name: 'Get Alert Execution',
				value: 'getExecution',
				action: 'Get an alert execution',
				description: 'Retrieve an execution for a data alert task',
			},
			{
				name: 'Delete Alert Execution',
				value: 'deleteExecution',
				action: 'Delete an alert execution',
				description: 'Delete a specific execution for a data alert task',
			},
			{
				name: 'Get Recipient Stats',
				value: 'recipientStats',
				action: 'Get recipient stats for an alert',
				description: 'Retrieve recipient statistics for a data alert task',
			},
			{
				name: 'List Task Executions',
				value: 'listExecutions',
				action: 'List executions for an alert task',
				description: 'Retrieve executions for a data alert task',
			},
			{
				name: 'Get Execution Evaluation',
				value: 'getExecutionEvaluation',
				action: 'Get evaluation for an execution',
				description: 'Retrieve evaluation details for an alert execution',
			},
			{
				name: 'Get Execution Stats',
				value: 'getExecutionStats',
				action: 'Get execution stats for an alert task',
				description: 'Retrieve execution statistics for a data alert task',
			},
			{
				name: 'Trigger Alert Tasks',
				value: 'trigger',
				action: 'Trigger data alert tasks',
				description: 'Trigger one or more data alert tasks',
			},
			{
				name: 'Validate Alert Task',
				value: 'validate',
				action: 'Validate a data alert task',
				description: 'Validate a data alert task definition',
			},
			{
				name: 'Get Alert Settings',
				value: 'getSettings',
				action: 'Get data alert settings',
				description: 'Retrieve settings for data alerts',
			},
			{
				name: 'Update Alert Settings',
				value: 'updateSettings',
				action: 'Update data alert settings',
				description: 'Update settings for data alerts',
			},
		],
		default: 'getAll',
	},
	...dataAlertsGetAllDescription,
	...dataAlertsCreateDescription,
	...dataAlertsGetDescription,
	...dataAlertsUpdateDescription,
	...dataAlertsDeleteDescription,
	...dataAlertsConditionDescription,
	...dataAlertsExecutionDescription,
	...dataAlertsRecipientStatsDescription,
	...dataAlertsExecutionsListDescription,
	...dataAlertsExecutionEvaluationDescription,
	...dataAlertsExecutionStatsDescription,
	...dataAlertsTriggerDescription,
	...dataAlertsValidateDescription,
	...dataAlertsSettingsGetDescription,
	...dataAlertsSettingsUpdateDescription,
];
