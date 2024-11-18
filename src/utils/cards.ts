import type { Card } from "./types";

export const CARDS: Map<string, Card> = new Map<string, Card>([
  ["wizard", {Name: "wizard", Cost: 2}],
  ["hog rider", {Name: "hog_rider", Cost: 5}],
  ["archer", {Name: "archer", Cost: 3}],
  ["bowler", {Name: "bowler", Cost: 7}],
])
