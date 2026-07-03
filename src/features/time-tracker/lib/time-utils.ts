import { SLOTS_PER_DAY, SLOT_MINUTES } from "../constants"
import type { MonthKey, SlotKey } from "../types"

export function getDaysInMonth(year: number, month: number): Date[] {
  const daysInMonth = new Date(year, month, 0).getDate()
  const days: Date[] = []

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month - 1, day))
  }

  return days
}

export function toMonthKey(year: number, month: number): MonthKey {
  const paddedMonth = String(month).padStart(2, "0")
  return `${year}-${paddedMonth}`
}

export function formatDateKey(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export function toSlotKey(date: Date, slotIndex: number): SlotKey {
  return `${formatDateKey(date)}:${slotIndex}`
}

export function slotIndexToTimeLabel(slotIndex: number): string {
  const hours = Math.floor(slotIndex / 2)
  const minutes = (slotIndex % 2) * SLOT_MINUTES
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
}

export function parseSlotKey(key: string): {
  dateKey: string
  slotIndex: number
  date: Date
} {
  const separatorIndex = key.lastIndexOf(":")
  if (separatorIndex === -1) {
    throw new Error(`Invalid slot key: ${key}`)
  }

  const dateKey = key.slice(0, separatorIndex)
  const slotIndex = Number(key.slice(separatorIndex + 1))

  if (
    !Number.isInteger(slotIndex) ||
    slotIndex < 0 ||
    slotIndex >= SLOTS_PER_DAY
  ) {
    throw new Error(`Invalid slot index in key: ${key}`)
  }

  const [year, month, day] = dateKey.split("-").map(Number)
  if (!year || !month || !day) {
    throw new Error(`Invalid date in slot key: ${key}`)
  }

  return {
    dateKey,
    slotIndex,
    date: new Date(year, month - 1, day),
  }
}

export function getSlotKeysInRange(
  anchorKey: SlotKey,
  focusKey: SlotKey,
  year: number,
  month: number
): SlotKey[] {
  const days = getDaysInMonth(year, month)
  const dayIndexByKey = new Map(
    days.map((date, index) => [formatDateKey(date), index])
  )

  const anchor = parseSlotKey(anchorKey)
  const focus = parseSlotKey(focusKey)

  const anchorDayIndex = dayIndexByKey.get(anchor.dateKey)
  const focusDayIndex = dayIndexByKey.get(focus.dateKey)

  if (anchorDayIndex === undefined || focusDayIndex === undefined) {
    return []
  }

  const minDay = Math.min(anchorDayIndex, focusDayIndex)
  const maxDay = Math.max(anchorDayIndex, focusDayIndex)
  const minSlot = Math.min(anchor.slotIndex, focus.slotIndex)
  const maxSlot = Math.max(anchor.slotIndex, focus.slotIndex)

  const keys: SlotKey[] = []

  for (let dayIndex = minDay; dayIndex <= maxDay; dayIndex++) {
    for (let slotIndex = minSlot; slotIndex <= maxSlot; slotIndex++) {
      keys.push(toSlotKey(days[dayIndex], slotIndex))
    }
  }

  return keys
}
