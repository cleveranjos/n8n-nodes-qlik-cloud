# n8n-nodes-qlik-cloud

This package contains an n8n community node for integrating with **Qlik Cloud** REST APIs.

## Scope

My goal is to deliver a complete integration with the Qlik Cloud REST APIs, covering all available endpoints. This is still a work in progress because Qlik Cloud continues to add new endpoints and methods. As of 12/29/2025, the integration includes 564 methods across 64 endpoints, and 72 calls were already implemented.

- /apis/rest/.well-known: 1
- /apis/rest/api-keys: 7
- /apis/rest/apps: 45
- /apis/rest/assistants: 29
- /apis/rest/audits: 7
- /apis/rest/automation-connections: 8
- /apis/rest/automation-connectors: 1
- /apis/rest/automations: 18
- /apis/rest/automl-deployments: 1
- /apis/rest/automl-predictions: 6
- /apis/rest/banners: 2
- /apis/rest/brands: 12
- /apis/rest/collections: 11
- /apis/rest/conditions: 11
- /apis/rest/consumption: 1
- /apis/rest/core/ip-policies: 5
- /apis/rest/csp-origins: 6
- /apis/rest/csrf-token: 1
- /apis/rest/data-alerts: 16
- /apis/rest/data-assets: 5
- /apis/rest/data-connections: 9
- /apis/rest/data-credentials: 5
- /apis/rest/data-files: 12
- /apis/rest/data-qualities: 3
- /apis/rest/data-sets: 6
- /apis/rest/data-sources: 5
- /apis/rest/data-stores: 10
- /apis/rest/di-projects: 19
- /apis/rest/direct-access-agents: 15
- /apis/rest/encryption: 10
- /apis/rest/extensions: 7
- /apis/rest/glossaries: 24
- /apis/rest/groups: 8
- /apis/rest/identity-providers: 8
- /apis/rest/items: 8
- /apis/rest/knowledgebases: 18
- /apis/rest/licenses: 9
- /apis/rest/lineage-graphs: 8
- /apis/rest/login: 2
- /apis/rest/ml: 42
- /apis/rest/notes: 2
- /apis/rest/notifications: 1
- /apis/rest/oauth: 3
- /apis/rest/oauth-clients: 11
- /apis/rest/oauth-tokens: 2
- /apis/rest/pagination-sorting-filtering: 1
- /apis/rest/questions: 2
- /apis/rest/quotas: 2
- /apis/rest/rate-limiting: 1
- /apis/rest/reload-tasks: 5
- /apis/rest/reloads: 4
- /apis/rest/report-templates: 7
- /apis/rest/reports: 3
- /apis/rest/roles: 5
- /apis/rest/sharing-tasks: 13
- /apis/rest/spaces: 17
- /apis/rest/tasks: 10
- /apis/rest/temp-contents: 5
- /apis/rest/tenants: 6
- /apis/rest/themes: 7
- /apis/rest/transports: 7
- /apis/rest/ui-config: 7
- /apis/rest/users: 9
- /apis/rest/web-integrations: 5
- /apis/rest/web-notifications: 6
- /apis/rest/webhooks: 10 


### Apps Management
- **Get All Apps** - Retrieve all apps with filtering and pagination
- **Get App** - Retrieve a specific app by ID
- **Create / Update / Delete / Copy** - Full CRUD on apps plus copy
- **Export / Import** - Export apps and import QVF files
- **Publish / Republish / Move / Remove** - Publish or republish to a space, move between spaces, or remove from a space
- **Ownership** - Change object owner or update app owner
- **Data Insights** - Get data lineage, data metadata, list insight analyses, recommend insights, and fetch the insight model
- **Media** - Upload, download, delete, and list media files; fetch app thumbnail
- **Reloads** - List reload logs, fetch a specific reload log, and retrieve reload metadata
- **Report Filters** - List, create, get, update, delete, and count report filters
- **Scripts** - List, create, get, update, delete scripts
- **Evaluations** - List/create evaluations, compare evaluations, and download results
- **Validate Script** - Validate a script payload
- **Get Privileges** - Retrieve app access privileges

### Assistants
- **Get All Assistants** - List all available assistants with pagination and sorting
- **Get Assistant** - Retrieve a specific assistant by ID
- **Create Assistant** - Create a new assistant with name, title, description, and space
- **Update Assistant** - Update assistant properties using JSON Patch operations
- **Search** - Perform semantic search in assistant sources
- **Get Feedback** - Retrieve feedback summary for an assistant
- **Bulk Search Sources** - Perform bulk search for source chunks by chunk IDs
- **List Starters** - List all starter questions for an assistant
- **Create Starter** - Create a new starter question with optional followups
- **List Threads** - List conversation threads for an assistant with filtering
- **Create Thread** - Create a new conversation thread
- **Delete Assistant** - Delete an assistant and all its resources

### Audits
- **Get All Audits** - List recent audit events with filtering
- **Get Audit** - Retrieve a specific audit event by ID
- **Get Sources** - List possible audit event sources
- **Get Types** - List possible audit event types
- **Get Settings** - Retrieve audit server configuration

### Items
- **Get All Items** - List items accessible to the user
- **Get Item** - Retrieve a specific item by ID
- **Update Item** - Update item properties
- **Delete Item** - Delete an item
- **Collections** - List collections (tags) for an item
- **Published Items** - List published copies of an item
- **Settings** - Get or update items service settings

### Analytics Tasks
- **Get All Tasks** - List analytics tasks with paging, sorting, and resource filtering
- **Create / Update / Delete** - Manage task definitions, including migration via `migrateFrom`
- **Start Task** - Trigger execution of a task with an optional source label
- **Task Runs** - List runs for a task or for a resource, and fetch the latest run
- **Run Logs** - Retrieve logs for a specific task run in JSON or plain text

## Authentication

This node supports **Bearer Token Authentication**:

1. **Get your Qlik Cloud tenant URL**
   - Format: `https://{tenant}.{region}.qlikcloud.com`
   - Example: `https://mycompany.us.qlikcloud.com`

2. **Generate an API Key**
   - Access your Qlik Cloud console
   - Navigate to API Keys section
   - Create a new API key with appropriate scopes
   - Copy the generated token

3. **Configure credentials in n8n**
   - Create a new "Qlik Cloud API" credential
   - Paste your tenant URL
   - Paste your API key as the access token

## Installation

To install this node in your n8n instance:

```bash
npm install n8n-nodes-qlik-cloud
```

## Configuration

### Node Configuration

1. Add the **Qlik Cloud** node to your workflow
2. Select the **Resource** (Apps, Analytics Tasks, Assistants, Audits, or Items)
3. Select the **Operation** you want to perform
4. Configure any required parameters
5. Set up your Qlik Cloud API credentials

### Example: List All Apps

1. Add a **Qlik Cloud** node
2. Select Resource: **Apps**
3. Select Operation: **Get All**
4. Configure return settings (return all or limit)
5. Set Qlik Cloud credentials
6. Execute the workflow

## API Documentation

For detailed API documentation, visit:
- [Qlik Cloud REST APIs](https://qlik.dev/apis/rest/)
- [Apps API](https://qlik.dev/apis/rest/apps)
- [Tasks API](https://qlik.dev/apis/rest/tasks)
- [Items API](https://qlik.dev/apis/rest/items)
- [Audits API](https://qlik.dev/apis/rest/audits)
- [Assistants API](https://qlik.dev/apis/rest/assistants)

## Limitations

- **Rate Limiting**: The Qlik Cloud API has rate limits per tier. Check documentation for your plan.
- **Permissions**: Many operations require specific permissions in Qlik Cloud
- **Binary Operations**: File upload/download operations return data references; handle file transfers separately
- **Pagination**: Use `returnAll` option to retrieve all results or `limit` for pagination

## Support

For issues or feature requests:
- GitHub Issues: [n8n-nodes-qlik-cloud](https://github.com/yourusername/n8n-nodes-qlik-cloud/issues)
- n8n Community: [n8n Community Forum](https://community.n8n.io)

## Development

This node follows the n8n community node development guidelines. For more information on implementing custom nodes, refer to the [n8n nodes starter repository](https://github.com/n8n-io/n8n-nodes-starter), which is the recommended way to implement nodes provided by n8n.

## License

MIT

## Contributing

Contributions are welcome! Please fork this repository and submit pull requests.

## Changelog

### Version 1.0.0
- Initial release with support for Apps, Items, Audits, and Assistants APIs
