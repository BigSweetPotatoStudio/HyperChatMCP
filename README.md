## 这个是HyperChat的官方维护的列表，更加人性化，通过jsonSchema生成表单转成MCP配置

如下是一个简单的例子，欢迎提交代码，合并后会自动发布HyperChat MCP Extension列表

### 定义MCP src/@modelcontextprotocol/server-filesystem/index.ts
```typescript
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

import { Package, MCP } from "../../mcp";

// 参数
const config = z.object({
  path: z.string({
    required_error: "Path is required",
    description: "allow path",
  }),
});

type Config = z.infer<typeof config>;

const p: Package = {
  type: "npx",
  name: "@modelcontextprotocol/server-filesystem",
  github: "https://github.com/modelcontextprotocol/servers.git",
  description: "Server filesystem",
  keywords: ["server", "filesystem"],
  // 参数转 mcp 配置
  resolve: (config: Config) => {
    return {
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-filesystem", config.path],
      env: {},
    };
  },
  configSchema: zodToJsonSchema(config),
};

MCP.register(p);
```

### 注册 src/register.ts
```typescript
import "./@modelcontextprotocol/server-filesystem";
import "./@modelcontextprotocol/sqlite";
import "./mcp-obsidian/index";

//ADD  import "./xxxxx";

```