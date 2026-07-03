"use client"

import { useCallback, useEffect, useState } from "react"

import { DEFAULT_ACTIVITIES } from "../constants"
import { loadMonth, saveMonth } from "../lib/storage"
import { toMonthKey } from "../lib/time-utils"
import type { Activity, SlotKey, SlotMap } from "../types"

type SaveStatus = "idle" | "saving" | "saved"

type UseTimeTrackerOptions = {
  year: number
  month: number
}

type UseTimeTrackerReturn = {
  year: number
  month: number
  slots: SlotMap
  activities: Activity[]
  saveStatus: SaveStatus
  getSlot: (key: SlotKey) => string | undefined
  setSlot: (key: SlotKey, activityId: string) => void
  clearSlot: (key: SlotKey) => void
  setSlots: (keys: SlotKey[], activityId: string) => void
  clearSlots: (keys: SlotKey[]) => void
}

export function useTimeTracker({
  year,
  month,
}: UseTimeTrackerOptions): UseTimeTrackerReturn {
  const monthKey = toMonthKey(year, month)
  const [slots, setSlotMap] = useState<SlotMap>({})
  const [activities] = useState<Activity[]>(() => [...DEFAULT_ACTIVITIES])
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(false)
    setSaveStatus("idle")
    const data = loadMonth(monthKey)
    setSlotMap(data ?? {})
    setIsLoaded(true)
  }, [monthKey])

  useEffect(() => {
    if (!isLoaded) {
      return
    }

    setSaveStatus("saving")
    const timer = setTimeout(() => {
      saveMonth(monthKey, slots)
      setSaveStatus("saved")
    }, 300)

    return () => clearTimeout(timer)
  }, [slots, monthKey, isLoaded])

  const getSlot = useCallback(
    (key: SlotKey) => slots[key],
    [slots]
  )

  const setSlot = useCallback((key: SlotKey, activityId: string) => {
    setSlotMap((prev) => ({ ...prev, [key]: activityId }))
  }, [])

  const clearSlot = useCallback((key: SlotKey) => {
    setSlotMap((prev) => {
      if (!(key in prev)) {
        return prev
      }

      const next = { ...prev }
      delete next[key]
      return next
    })
  }, [])

  const setSlots = useCallback((keys: SlotKey[], activityId: string) => {
    if (keys.length === 0) {
      return
    }

    setSlotMap((prev) => {
      const next = { ...prev }
      for (const key of keys) {
        next[key] = activityId
      }
      return next
    })
  }, [])

  const clearSlots = useCallback((keys: SlotKey[]) => {
    if (keys.length === 0) {
      return
    }

    setSlotMap((prev) => {
      const next = { ...prev }
      let changed = false

      for (const key of keys) {
        if (key in next) {
          delete next[key]
          changed = true
        }
      }

      return changed ? next : prev
    })
  }, [])

  return {
    year,
    month,
    slots,
    activities,
    saveStatus,
    getSlot,
    setSlot,
    clearSlot,
    setSlots,
    clearSlots,
  }
}
