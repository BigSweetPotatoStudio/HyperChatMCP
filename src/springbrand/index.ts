import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

import { Package, MCP } from "../mcp";

// No configuration is required: the connector uses OAuth 2.1 with dynamic
// client registration, so mcp-remote opens a browser window on first run.
const config = z.object({});

type Config = z.infer<typeof config>;

const p: Package = {
  type: "other",
  name: "springbrand",
  github: "https://github.com/springbrand-lab/springbrand-agent-setup",
  description:
    "GTM tools for agents: social listening, traffic and SEO research, lead and creator discovery",
  keywords: ["marketing", "seo", "social-listening", "traffic", "leads"],
  markdown:
    "SpringBrand is a hosted MCP connector for go-to-market work: social listening across X, TikTok, Instagram, YouTube, Reddit and Xiaohongshu; website traffic, traffic-source and SEO research; company, contact and creator discovery; and copy, image, video and voiceover generation.\n\nEndpoint: `https://connector.springbrand.ai/mcp` (Streamable HTTP). Auth is OAuth 2.1 with dynamic client registration and PKCE, so there is no API key to enter — `mcp-remote` opens a browser window on first connection. Usage is billed per call.\n\nHomepage: https://springbrand.ai",
  resolve: (config: Config) => {
    return {
      command: "npx",
      args: ["-y", "mcp-remote", "https://connector.springbrand.ai/mcp"],
      env: {},
    };
  },
  configSchema: zodToJsonSchema(config),
};

MCP.register(p);
