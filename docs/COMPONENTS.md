## Components

#### PageStateProvider
`PageStateProvider` must provided to show the according StateComponent. The StateComponent would be placed as sibling with the children of `PageStateProvider`.

| Property | Type   | Default Value | Description                             |
|----------|--------|---------------|-----------------------------------------|
| `config`   | `object` |               | key as path, value as StateComponent |

#### PageStateConsumer
`PageStateConsumer` give functions to show / reset the path component.

| Property                      | Type | Default Value | Description                                        |
|-------------------------------|------|---------------|----------------------------------------------------|
| `setPageState(path, {payload})` | func |               | Show given path, with pass the payload as property |
| `resetPageState(path)`          | func |               | Reset given path                                   |
| `reset()`                       | func |               | Reset all paths