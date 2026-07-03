export type Activity = {
  id: string
  emoji: string
  label: string
  color: string
}

export type PaintBrush =
  | { mode: "fill"; activityId: string }
  | { mode: "erase" }

export type SlotKey = `${string}:${number}`
export type MonthKey = `${number}-${string}`
export type SlotMap = Record<SlotKey, string>
