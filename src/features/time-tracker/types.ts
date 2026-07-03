export type Activity = {
  id: string
  emoji: string
  label: string
  color: string
}

export type SlotKey = `${string}:${number}`
export type MonthKey = `${number}-${string}`
export type SlotMap = Record<SlotKey, string>
