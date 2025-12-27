import type { INodeProperties } from 'n8n-workflow';

// Get All Assistants
export const assistantsGetAllDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['assistants'],
				operation: ['getAll'],
			},
		},
		description: 'Whether to return all assistants',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		displayOptions: {
			show: {
				resource: ['assistants'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		description: 'The number of assistants to get',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['assistants'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Next Page',
				name: 'next',
				type: 'string',
				default: '',
				description: 'Optional parameter to request the next page',
			},
			{
				displayName: 'Previous Page',
				name: 'prev',
				type: 'string',
				default: '',
				description: 'Optional parameter to request the previous page',
			},
			{
				displayName: 'Sort By',
				name: 'sort',
				type: 'string',
				default: '',
				description: 'Optional resource field name to sort on (e.g., name). Prefix with `-` for descending order',
			},
		],
	},
];

// Get Single Assistant
export const assistantsGetDescription: INodeProperties[] = [
	{
		displayName: 'Assistant ID',
		name: 'assistantId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['assistants'],
				operation: ['get'],
			},
		},
		description: 'The ID of the assistant to retrieve',
	},
];

// Create Assistant
export const assistantsCreateDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['assistants'],
				operation: ['create'],
			},
		},
		description: 'The name of the assistant',
	},
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['assistants'],
				operation: ['create'],
			},
		},
		description: 'The title of the assistant',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['assistants'],
				operation: ['create'],
			},
		},
		description: 'The description of the assistant',
	},
	{
		displayName: 'Space ID',
		name: 'spaceId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['assistants'],
				operation: ['create'],
			},
		},
		description: 'Unique identifier of the space to contain the assistant',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['assistants'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
				description: 'Comma-separated list of tags for the assistant',
			},
			{
				displayName: 'Knowledge Bases',
				name: 'knowledgeBases',
				type: 'string',
				default: '',
				description: 'Comma-separated list of knowledge base IDs',
			},
			{
				displayName: 'Welcome Message',
				name: 'welcomeMessage',
				type: 'string',
				default: '',
				description: 'Initial message in the chat conversation',
			},
			{
				displayName: 'Custom Properties (JSON)',
				name: 'customProperties',
				type: 'json',
				default: '{}',
				description: 'Freeform JSON to allow custom customization options',
			},
		],
	},
];

// Update Assistant
export const assistantsUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Assistant ID',
		name: 'assistantId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['assistants'],
				operation: ['update'],
			},
		},
		description: 'The ID of the assistant to update',
	},
	{
		displayName: 'JSON Patch Operations',
		name: 'body',
		type: 'json',
		default: '[]',
		required: true,
		displayOptions: {
			show: {
				resource: ['assistants'],
				operation: ['update'],
			},
		},
		description: 'Array of JSON Patch operations to apply to the assistant',
	},
];

// Search Assistant
export const assistantsSearchDescription: INodeProperties[] = [
	{
		displayName: 'Assistant ID',
		name: 'assistantId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['assistants'],
				operation: ['search'],
			},
		},
		description: 'The ID of the assistant to search in',
	},
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['assistants'],
				operation: ['search'],
			},
		},
		description: 'Search query to execute',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['assistants'],
				operation: ['search'],
			},
		},
		options: [
			{
				displayName: 'Top N Results',
				name: 'topN',
				type: 'number',
				default: 5,
				description: 'Number of top results to return (max 50)',
			},
			{
				displayName: 'Search Mode',
				name: 'mode',
				type: 'options',
				options: [
					{
						name: 'SIMPLE',
						value: 'SIMPLE',
						description: 'Semantic search only',
					},
					{
						name: 'FULL',
						value: 'FULL',
						description: 'Semantic search with reranking and hybrid search',
					},
				],
				default: 'SIMPLE',
				description: 'Search mode to use',
			},
		],
	},
];

// Get Feedback
export const assistantsGetFeedbackDescription: INodeProperties[] = [
	{
		displayName: 'Assistant ID',
		name: 'assistantId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['assistants'],
				operation: ['getFeedback'],
			},
		},
		description: 'The ID of the assistant to get feedback for',
	},
];

// Bulk Search Source Chunks
export const assistantsBulkSearchSourcesDescription: INodeProperties[] = [
	{
		displayName: 'Assistant ID',
		name: 'assistantId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['assistants'],
				operation: ['bulkSearchSources'],
			},
		},
		description: 'The ID of the assistant to search sources for',
	},
	{
		displayName: 'Chunk IDs',
		name: 'chunkIds',
		type: 'json',
		default: '[]',
		required: true,
		displayOptions: {
			show: {
				resource: ['assistants'],
				operation: ['bulkSearchSources'],
			},
		},
		description: 'Array of chunk IDs to search for',
	},
];

// Delete Assistant
export const assistantsDeleteDescription: INodeProperties[] = [
	{
		displayName: 'Assistant ID',
		name: 'assistantId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['assistants'],
				operation: ['delete'],
			},
		},
		description: 'The ID of the assistant to delete',
	},
];

// List Starters
export const assistantsListStartersDescription: INodeProperties[] = [
	{
		displayName: 'Assistant ID',
		name: 'assistantId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['assistants'],
				operation: ['listStarters'],
			},
		},
		description: 'The ID of the assistant',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['assistants'],
				operation: ['listStarters'],
			},
		},
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 50,
				description: 'The number of starters to get',
			},
		],
	},
];

// Create Starter
export const assistantsCreateStarterDescription: INodeProperties[] = [
	{
		displayName: 'Assistant ID',
		name: 'assistantId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['assistants'],
				operation: ['createStarter'],
			},
		},
		description: 'The ID of the assistant',
	},
	{
		displayName: 'Question',
		name: 'question',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['assistants'],
				operation: ['createStarter'],
			},
		},
		description: 'Starter sample question',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['assistants'],
				operation: ['createStarter'],
			},
		},
		options: [
			{
				displayName: 'Followups (JSON)',
				name: 'followups',
				type: 'json',
				default: '[]',
				description: 'List of followup questions',
			},
			{
				displayName: 'Additional Context',
				name: 'additionalContext',
				type: 'string',
				default: '',
				description: 'Optional context for the question',
			},
		],
	},
];

// List Threads
export const assistantsListThreadsDescription: INodeProperties[] = [
	{
		displayName: 'Assistant ID',
		name: 'assistantId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['assistants'],
				operation: ['listThreads'],
			},
		},
		description: 'The ID of the assistant',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['assistants'],
				operation: ['listThreads'],
			},
		},
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 50,
				description: 'The number of threads to get',
			},
			{
				displayName: 'Filter',
				name: 'filter',
				type: 'string',
				default: '',
				description: 'Optional parameter to filter threads',
			},
		],
	},
];

// Create Thread
export const assistantsCreateThreadDescription: INodeProperties[] = [
	{
		displayName: 'Assistant ID',
		name: 'assistantId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['assistants'],
				operation: ['createThread'],
			},
		},
		description: 'The ID of the assistant',
	},
	{
		displayName: 'Thread Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['assistants'],
				operation: ['createThread'],
			},
		},
		description: 'The name of the thread',
	},
];

// Stream Thread
export const assistantsStreamThreadDescription: INodeProperties[] = [
	{
		displayName: 'Assistant ID',
		name: 'assistantId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['assistants'],
				operation: ['streamThread'],
			},
		},
		description: 'The ID of the assistant',
	},
	{
		displayName: 'Thread ID',
		name: 'threadId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['assistants'],
				operation: ['streamThread'],
			},
		},
		description: 'The ID of the thread to stream',
	},
	{
		displayName: 'Messages',
		name: 'messages',
		type: 'json',
		default: '[]',
		required: true,
		displayOptions: {
			show: {
				resource: ['assistants'],
				operation: ['streamThread'],
			},
		},
		description: 'Array of message objects to send to the stream',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['assistants'],
				operation: ['streamThread'],
			},
		},
		options: [
			{
				displayName: 'Follow Up Context (JSON)',
				name: 'followUpContext',
				type: 'json',
				default: '{}',
				description: 'Optional context for follow-up interactions',
			},
		],
	},
];

// Invoke Thread
export const assistantsInvokeThreadDescription: INodeProperties[] = [
	{
		displayName: 'Assistant ID',
		name: 'assistantId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['assistants'],
				operation: ['invokeThread'],
			},
		},
		description: 'The ID of the assistant',
	},
	{
		displayName: 'Thread ID',
		name: 'threadId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['assistants'],
				operation: ['invokeThread'],
			},
		},
		description: 'The ID of the thread to invoke',
	},
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['assistants'],
				operation: ['invokeThread'],
			},
		},
		description: 'The message to send to the thread',
	},
];

export const assistantDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['assistants'],
			},
		},
		options: [
			{
				name: 'Get All',
				value: 'getAll',
				action: 'Get all assistants',
				description: 'Retrieve all available assistants',
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get an assistant',
				description: 'Retrieve a specific assistant by ID',
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create an assistant',
				description: 'Create a new assistant',
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update an assistant',
				description: 'Update assistant properties',
			},
			{
				name: 'Search',
				value: 'search',
				action: 'Search assistant sources',
				description: 'Perform search in assistant sources',
			},
			{
				name: 'Get Feedback',
				value: 'getFeedback',
				action: 'Get assistant feedback',
				description: 'Retrieve feedback summary for the assistant',
			},
			{
				name: 'Bulk Search Sources',
				value: 'bulkSearchSources',
				action: 'Bulk search source chunks',
				description: 'Perform a bulk search for source chunks',
			},
			{
				name: 'List Starters',
				value: 'listStarters',
				action: 'List assistant starters',
				description: 'Retrieve list of starters for the assistant',
			},
			{
				name: 'Create Starter',
				value: 'createStarter',
				action: 'Create an assistant starter',
				description: 'Create a new starter for the assistant',
			},
			{
				name: 'List Threads',
				value: 'listThreads',
				action: 'List assistant threads',
				description: 'Retrieve list of threads for the assistant',
			},
			{
				name: 'Create Thread',
				value: 'createThread',
				action: 'Create an assistant thread',
				description: 'Create a new thread for the assistant',
			},
			{
				name: 'Stream Thread',
				value: 'streamThread',
				action: 'Stream thread conversation',
				description: 'Stream messages to a thread with real-time responses',
			},
			{
				name: 'Invoke Thread',
				value: 'invokeThread',
				action: 'Invoke thread action',
				description: 'Send a message to a thread and get a response',
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete an assistant',
				description: 'Delete an assistant and all its resources',
			},
		],
		default: 'getAll',
	},
	...assistantsGetAllDescription,
	...assistantsGetDescription,
	...assistantsCreateDescription,
	...assistantsUpdateDescription,
	...assistantsSearchDescription,
	...assistantsGetFeedbackDescription,
	...assistantsBulkSearchSourcesDescription,
	...assistantsListStartersDescription,
	...assistantsCreateStarterDescription,
	...assistantsListThreadsDescription,
	...assistantsCreateThreadDescription,
	...assistantsStreamThreadDescription,
	...assistantsInvokeThreadDescription,
	...assistantsDeleteDescription,
];
