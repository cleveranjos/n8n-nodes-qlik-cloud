# n8n-nodes-qlik-cloud

This package contains an n8n community node for integrating with **Qlik Cloud** REST APIs.

## Features

Complete integration with Qlik Cloud REST APIs covering:

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
2. Select the **Resource** (Apps, Assistants, Audits, or Items)
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
