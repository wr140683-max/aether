/**
 * Helix LLM layer — BYOK first
 * Ready for Vercel AI SDK. Real generateText when packages are installed.
 */

export type ProviderId = "xai" | "openai" | "anthropic" | "ollama" | "google";

export interface LLMConfig {
  provider: ProviderId;
  model: string;
  apiKey?: string;
  baseURL?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface GenerateResult {
  text: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  finishReason?: string;
}

export const PROVIDER_DEFAULTS: Record<
  ProviderId,
  { models: string[]; envKey: string; costPer1MInput?: number; costPer1MOutput?: number }
> = {
  xai: {
    models: ["grok-3", "grok-3-mini", "grok-2"],
    envKey: "XAI_API_KEY",
    costPer1MInput: 3,
    costPer1MOutput: 15,
  },
  openai: {
    models: ["gpt-4o", "gpt-4o-mini", "o3-mini"],
    envKey: "OPENAI_API_KEY",
    costPer1MInput: 2.5,
    costPer1MOutput: 10,
  },
  anthropic: {
    models: ["claude-sonnet-4-20250514", "claude-3-5-haiku-latest"],
    envKey: "ANTHROPIC_API_KEY",
    costPer1MInput: 3,
    costPer1MOutput: 15,
  },
  ollama: {
    models: ["llama3.2", "qwen2.5-coder", "deepseek-r1"],
    envKey: "",
    costPer1MInput: 0,
    costPer1MOutput: 0,
  },
  google: {
    models: ["gemini-2.0-flash", "gemini-2.5-pro"],
    envKey: "GOOGLE_GENERATIVE_AI_API_KEY",
    costPer1MInput: 0.15,
    costPer1MOutput: 0.6,
  },
};

export function estimateCost(
  provider: ProviderId,
  promptTokens: number,
  completionTokens: number
): number {
  const p = PROVIDER_DEFAULTS[provider];
  if (!p) return 0;
  const input = ((p.costPer1MInput ?? 0) * promptTokens) / 1_000_000;
  const output = ((p.costPer1MOutput ?? 0) * completionTokens) / 1_000_000;
  return input + output;
}

export async function generate(
  config: LLMConfig,
  system: string,
  prompt: string
): Promise<GenerateResult> {
  const key =
    config.apiKey ||
    process.env[PROVIDER_DEFAULTS[config.provider]?.envKey || ""] ||
    process.env.XAI_API_KEY ||
    process.env.OPENAI_API_KEY;

  try {
    const { generateText } = await import("ai");

    let model: any;
    if (config.provider === "xai") {
      const { createXai } = await import("@ai-sdk/xai");
      const xai = createXai({ apiKey: key });
      model = xai(config.model || "grok-3-mini");
    } else if (config.provider === "openai") {
      const { createOpenAI } = await import("@ai-sdk/openai");
      const openai = createOpenAI({ apiKey: key });
      model = openai(config.model || "gpt-4o-mini");
    } else if (config.provider === "anthropic") {
      const { createAnthropic } = await import("@ai-sdk/anthropic");
      const anthropic = createAnthropic({ apiKey: key });
      model = anthropic(config.model || "claude-3-5-haiku-latest");
    } else if (config.provider === "google") {
      const { createGoogleGenerativeAI } = await import("@ai-sdk/google");
      const google = createGoogleGenerativeAI({ apiKey: key });
      model = google(config.model || "gemini-2.0-flash");
    } else if (config.provider === "ollama") {
      const { createOpenAI } = await import("@ai-sdk/openai");
      const ollama = createOpenAI({
        baseURL: config.baseURL || "http://localhost:11434/v1",
        apiKey: "ollama",
      });
      model = ollama(config.model || "llama3.2");
    } else {
      throw new Error(`Unsupported provider: ${config.provider}`);
    }

    const result = await generateText({
      model,
      system,
      prompt,
      temperature: config.temperature ?? 0.4,
      maxTokens: config.maxTokens ?? 4096,
    });

    return {
      text: result.text,
      usage: result.usage
        ? {
            promptTokens: result.usage.promptTokens ?? 0,
            completionTokens: result.usage.completionTokens ?? 0,
            totalTokens: result.usage.totalTokens ?? 0,
          }
        : undefined,
      finishReason: result.finishReason,
    };
  } catch (err: any) {
    const reason = err?.message || String(err);
    return {
      text: `[Helix LLM fallback]
Provider: ${config.provider} | Model: ${config.model}
Key present: ${key ? "yes" : "no"}

Could not call real model (${reason}).

To enable real generation:
1. pnpm add ai @ai-sdk/xai @ai-sdk/openai @ai-sdk/anthropic @ai-sdk/google
2. Set XAI_API_KEY (or OPENAI_API_KEY / ANTHROPIC_API_KEY) in .env.local
3. Restart the dev server

System prompt preview: ${system.slice(0, 100)}...
User goal preview: ${prompt.slice(0, 150)}...`,
      usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
      finishReason: "error",
    };
  }
}
