import type { MonthKey, SlotMap } from "../types"

const PREFIX = "time-tracker:"

function storageKey(monthKey: MonthKey): string {
  return `${PREFIX}${monthKey}`
}

function isSlotMap(value: unknown): value is SlotMap {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

export function loadMonth(monthKey: MonthKey): SlotMap | null {
  if (typeof window === "undefined") {
    return null
  }

  try {
    const raw = window.localStorage.getItem(storageKey(monthKey))
    if (!raw) {
      return null
    }

    const parsed: unknown = JSON.parse(raw)
    if (!isSlotMap(parsed)) {
      return null
    }

    return parsed
  } catch {
    return null
  }
}

export function saveMonth(monthKey: MonthKey, slots: SlotMap): void {
  if (typeof window === "undefined") {
    return
  }

  try {
    window.localStorage.setItem(storageKey(monthKey), JSON.stringify(slots))
  } catch {
    // Quota exceeded or storage unavailable — fail silently
  }
}
