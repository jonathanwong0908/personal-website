"use client"

import { useCallback, useEffect, useState } from "react"

import { DEFAULT_ACTIVITIES } from "../constants"
import type { Activity, SlotKey, SlotMap } from "../types"

type UseTimeTrackerOptions = {
  year: number
  month: number
}

type UseTimeTrackerReturn = {
  year: number
  month: number
  slots: SlotMap
  activities: Activity[]
  getSlot: (key: SlotKey) => string | undefined
  setSlot: (key: SlotKey, activityId: string) => void
  clearSlot: (key: SlotKey) => void
}

export function useTimeTracker({
  year,
  month,
}: UseTimeTrackerOptions): UseTimeTrackerReturn {
  const [slots, setSlots] = useState<SlotMap>({})
  const [activities] = useState<Activity[]>(() => [...DEFAULT_ACTIVITIES])

  useEffect(() => {
    setSlots({})
  }, [year, month])

  const getSlot = useCallback(
    (key: SlotKey) => slots[key],
    [slots]
  )

  const setSlot = useCallback((key: SlotKey, activityId: string) => {
    setSlots((prev) => ({ ...prev, [key]: activityId }))
  }, [])

  const clearSlot = useCallback((key: SlotKey) => {
    setSlots((prev) => {
      if (!(key in prev)) {
        return prev
      }

      const next = { ...prev }
      delete next[key]
      return next
    })
  }, [])

  return {
    year,
    month,
    slots,
    activities,
    getSlot,
    setSlot,
    clearSlot,
  }
}
