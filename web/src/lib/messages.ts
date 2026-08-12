export const REACTIONS = ["dove", "sparkle", "camera", "autumn_leaf", "green_leaf"] as const;
export type Reaction = typeof REACTIONS[number];
export const REACTION_EMOJI: Record<Reaction, string> = { dove: "🕊️", sparkle: "✨", camera: "📸", autumn_leaf: "🍂", green_leaf: "🌿" };

export type PublicMessage = {
  id: string;
  name: string;
  message: string;
  created_at: string;
  approved_at: string | null;
  is_featured: boolean;
  reactions: Record<Reaction, number>;
  selectedReaction: Reaction | null;
};

export function cleanText(value: unknown, max: number) {
  return typeof value === "string" ? value.replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, max) : "";
}
