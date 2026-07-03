import type { Activity } from "./types"

export const SLOTS_PER_DAY = 48
export const SLOT_MINUTES = 30

export const DEFAULT_ACTIVITIES: Activity[] = [
  { id: "sleep", emoji: "😴", label: "Sleep", color: "#6366f1" },
  { id: "work", emoji: "💼", label: "Work", color: "#3b82f6" },
  { id: "exercise", emoji: "🏃", label: "Exercise", color: "#22c55e" },
  { id: "commute", emoji: "🚗", label: "Commute", color: "#f59e0b" },
  { id: "meals", emoji: "🍽️", label: "Meals", color: "#f97316" },
  { id: "leisure", emoji: "🎮", label: "Leisure", color: "#a855f7" },
  { id: "social", emoji: "👥", label: "Social", color: "#ec4899" },
  { id: "chores", emoji: "🧹", label: "Chores", color: "#84cc16" },
  { id: "learning", emoji: "📚", label: "Learning", color: "#06b6d4" },
  {
    id: "personal-care",
    emoji: "🚿",
    label: "Personal care",
    color: "#14b8a6",
  },
  { id: "rest", emoji: "☕", label: "Rest", color: "#78716c" },
  { id: "travel", emoji: "✈️", label: "Travel", color: "#0ea5e9" },
]

export const ACTIVITY_BY_ID: Record<string, Activity> = Object.fromEntries(
  DEFAULT_ACTIVITIES.map((activity) => [activity.id, activity])
)
