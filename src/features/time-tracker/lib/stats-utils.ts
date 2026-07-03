import {
  ACTIVITY_BY_ID,
  SLOTS_PER_DAY,
  SLOT_MINUTES,
} from "../constants"
import type { Activity, SlotMap } from "../types"
import { getDaysInMonth } from "./time-utils"

const HOURS_PER_SLOT = SLOT_MINUTES / 60

export type ActivityStat = {
  activity: Activity
  slotCount: number
  hours: number
  percentOfTracked: number
}

export type MonthStats = {
  byActivity: ActivityStat[]
  totalTrackedSlots: number
  totalTrackedHours: number
  totalSlotsInMonth: number
  untrackedSlots: number
  untrackedHours: number
  percentTracked: number
}

export function formatHours(hours: number): string {
  return Number.isInteger(hours) ? `${hours}h` : `${hours.toFixed(1)}h`
}

export function computeMonthStats(
  slots: SlotMap,
  year: number,
  month: number
): MonthStats {
  const totalSlotsInMonth = getDaysInMonth(year, month).length * SLOTS_PER_DAY

  const countsByActivityId = new Map<string, number>()

  for (const activityId of Object.values(slots)) {
    if (!(activityId in ACTIVITY_BY_ID)) {
      continue
    }

    countsByActivityId.set(
      activityId,
      (countsByActivityId.get(activityId) ?? 0) + 1
    )
  }

  const totalTrackedSlots = [...countsByActivityId.values()].reduce(
    (sum, count) => sum + count,
    0
  )

  const totalTrackedHours = totalTrackedSlots * HOURS_PER_SLOT

  const byActivity: ActivityStat[] = [...countsByActivityId.entries()]
    .map(([activityId, slotCount]) => {
      const activity = ACTIVITY_BY_ID[activityId]
      const hours = slotCount * HOURS_PER_SLOT
      const percentOfTracked =
        totalTrackedSlots > 0 ? (slotCount / totalTrackedSlots) * 100 : 0

      return {
        activity,
        slotCount,
        hours,
        percentOfTracked,
      }
    })
    .sort((a, b) => b.hours - a.hours)

  const untrackedSlots = Math.max(0, totalSlotsInMonth - totalTrackedSlots)
  const untrackedHours = untrackedSlots * HOURS_PER_SLOT
  const percentTracked =
    totalSlotsInMonth > 0 ? (totalTrackedSlots / totalSlotsInMonth) * 100 : 0

  return {
    byActivity,
    totalTrackedSlots,
    totalTrackedHours,
    totalSlotsInMonth,
    untrackedSlots,
    untrackedHours,
    percentTracked,
  }
}
