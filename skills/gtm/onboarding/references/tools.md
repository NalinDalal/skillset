# Optional tools for ACX

You do not need any external tool, MCP server, or API key to use the core ACX skills. They work with normal web research and files in the member's working folder.

## Use only when needed

| Tool | Use it when | Do not use it when |
|---|---|---|
| Google Drive or Sheets | The member's lead list or report already lives in Google Drive. | They gave you a CSV or pasted the list in chat. |
| Apify | The member wants Outlier Finder to collect recent LinkedIn posts from chosen public profiles or normal web research cannot collect enough public information. | A few web pages, reviews, job posts, or competitor sites answer the question. |
| Prospeo MCP | The member runs Market Scanner (counts companies) or Signal Watcher (looks up single companies). | Market Scanner never searches people, emails or phone numbers. |
| Composio MCP (Google Sheets) | The member runs Signal Watcher. It creates and updates the member's signal sheet. | Any other Composio app. Signal Watcher uses Composio only for Google Sheets. |
| Treg MCP | The member runs Signal Watcher. It finds companies with buying signals, and pays for company, people and email lookups when the member's own accounts are not connected. | Phone numbers or personal emails. Signal Watcher never looks those up. |
| Icypeas and MillionVerifier | Signal Watcher finds the right person at an ICP-match company, their work email, and checks it. The member's own account is used first, through its MCP server or a key registered in Treg. | Any other skill. |

## Not needed for this plugin

This plugin does not require a sending tool, CRM or automation platform. Only Signal Watcher finds people and checks emails, and it stops at the sheet: it never sends. Prospeo is required for Market Scanner and is connected as an MCP server. The member signs in through OpenCode's MCP authentication (run `/mcps` or `opencode mcp auth prospeo`); never save a Prospeo key in the ACX folder. Apify is optional, and Outlier Finder uses only `harvestapi/linkedin-profile-posts`. Treg is optional and needed only for Signal Watcher; it is connected as an MCP server, bills a prepaid Treg balance, and Signal Watcher uses only the endpoints listed in its own `references/treg-signals.md`. Signal Watcher also needs Composio with Google Sheets connected, used only for its signal sheet.

## Safety rule

Before using any paid API, scraper, enrichment service, or sending tool, tell the member what it will do, what it may cost, and ask for a clear yes. Never save credentials in the ACX folder.
