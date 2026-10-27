import type { FileChange } from "../agents/coder";

export function parseCoderFromText(text: string): {
  summary: string;
  files: FileChange[];
} {
  const jsonMatch =
    text.match(/```json\s*([\s\S]*?)```/) ||
    text.match(/\{[\s\S]*"files"[\s\S]*\}/);

  if (jsonMatch) {
    try {
      const raw = jsonMatch[1] || jsonMatch[0];
      const data = JSON.parse(raw);
      if (data && Array.isArray(data.files)) {
        return {
          summary: String(data.summary || "Code generated"),
          files: data.files.map((f: any) => ({
            path: String(f.path || "unknown"),
            action: (["create", "modify", "delete"].includes(f.action)
              ? f.action
              : "create") as FileChange["action"],
            content: f.content != null ? String(f.content) : undefined,
            summary: String(f.summary || f.path || ""),
          })),
        };
      }
    } catch {
      // fall through
    }
  }

  return {
    summary: "Could not parse coder output — review raw text.",
    files: [],
  };
}
