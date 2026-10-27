/**
 * Helix LLM layer — BYOK first
 * Uses Vercel AI SDK patterns for multi-provider support.
 * User pays the model provider directly. Zero platform tax on tokens.
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
  const stub = `[Helix LLM stub — provider=${config.provider} model=${config.model}]
System: ${system.slice(0, 80)}...
Prompt: ${prompt.slice(0, 120)}...

Replace this with real generateText() from the Vercel AI SDK.
See packages/core/llm.ts for the integration point.`;

  return {
    text: stub,
    usage: { promptTokens: 100, completionTokens: 50, totalTokens: 150 },
    finishReason: "stop",
  };
}
