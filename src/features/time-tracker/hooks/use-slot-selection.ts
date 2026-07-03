"use client"

import { useCallback, useRef, useState } from "react"

import type { ActivityPickerAnchorRect } from "../components/activity-picker"
import { getSlotKeyFromPoint } from "../lib/slot-hit-test"
import { getSlotKeysInRange } from "../lib/time-utils"
import type { SlotKey } from "../types"

type UseSlotSelectionOptions = {
  year: number
  month: number
  dragThreshold?: number
  onClickActivate: (key: SlotKey, anchorRect: ActivityPickerAnchorRect) => void
  onSelectionComplete: (
    keys: Set<SlotKey>,
    anchorRect: ActivityPickerAnchorRect
  ) => void
}

type UseSlotSelectionReturn = {
  selectedKeys: Set<SlotKey>
  isSelecting: boolean
  handlePointerDown: (
    key: SlotKey,
    event: React.PointerEvent<HTMLButtonElement>
  ) => void
  clearSelection: () => void
}

type SelectionSession = {
  dragThreshold: number
  isSelectingRef: { current: boolean }
  anchorSlotRef: { current: SlotKey | null }
  focusSlotRef: { current: SlotKey | null }
  anchorRectRef: { current: ActivityPickerAnchorRect | null }
  startPointRef: { current: { x: number; y: number } | null }
  captureTargetRef: { current: HTMLElement | null }
  pointerIdRef: { current: number | null }
  yearRef: { current: number }
  monthRef: { current: number }
  onClickActivateRef: {
    current: (key: SlotKey, anchorRect: ActivityPickerAnchorRect) => void
  }
  onSelectionCompleteRef: {
    current: (keys: Set<SlotKey>, anchorRect: ActivityPickerAnchorRect) => void
  }
  setSelectedKeys: (keys: Set<SlotKey>) => void
  setIsSelecting: (isSelecting: boolean) => void
}

const sessionRef: { current: SelectionSession | null } = { current: null }

function toAnchorRect(element: HTMLElement): ActivityPickerAnchorRect {
  const rect = element.getBoundingClientRect()

  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  }
}

function removeDocumentListeners() {
  document.removeEventListener("pointermove", onDocumentPointerMove)
  document.removeEventListener("pointerup", onDocumentPointerUp)
  document.removeEventListener("pointercancel", onDocumentPointerUp)
}

function finishSelection(event: PointerEvent) {
  const session = sessionRef.current
  if (!session || !session.isSelectingRef.current) {
    return
  }

  const anchor = session.anchorSlotRef.current
  const focus = session.focusSlotRef.current ?? anchor
  const startPoint = session.startPointRef.current
  const anchorRect = session.anchorRectRef.current
  const captureTarget = session.captureTargetRef.current
  const pointerId = session.pointerIdRef.current

  session.isSelectingRef.current = false
  session.setIsSelecting(false)
  removeDocumentListeners()

  if (captureTarget && pointerId !== null) {
    try {
      captureTarget.releasePointerCapture(pointerId)
    } catch {
      // Pointer capture may already be released.
    }
  }

  session.anchorSlotRef.current = null
  session.focusSlotRef.current = null
  session.anchorRectRef.current = null
  session.startPointRef.current = null
  session.captureTargetRef.current = null
  session.pointerIdRef.current = null

  if (!anchor || !startPoint || !anchorRect || !focus) {
    session.setSelectedKeys(new Set())
    return
  }

  const dx = event.clientX - startPoint.x
  const dy = event.clientY - startPoint.y
  const distance = Math.hypot(dx, dy)
  const keys = getSlotKeysInRange(
    anchor,
    focus,
    session.yearRef.current,
    session.monthRef.current
  )

  if (distance < session.dragThreshold) {
    session.setSelectedKeys(new Set())
    session.onClickActivateRef.current(anchor, anchorRect)
    return
  }

  if (keys.length > 0) {
    const keySet = new Set(keys)
    session.setSelectedKeys(keySet)
    session.onSelectionCompleteRef.current(keySet, anchorRect)
    return
  }

  session.setSelectedKeys(new Set())
}

function onDocumentPointerMove(event: PointerEvent) {
  const session = sessionRef.current
  if (!session || !session.isSelectingRef.current) {
    return
  }

  const anchor = session.anchorSlotRef.current
  if (!anchor) {
    return
  }

  const slotKey = getSlotKeyFromPoint(event.clientX, event.clientY)
  if (slotKey) {
    session.focusSlotRef.current = slotKey
  }

  const focus = session.focusSlotRef.current ?? anchor
  session.setSelectedKeys(
    new Set(
      getSlotKeysInRange(
        anchor,
        focus,
        session.yearRef.current,
        session.monthRef.current
      )
    )
  )
}

function onDocumentPointerUp(event: PointerEvent) {
  finishSelection(event)
}

export function useSlotSelection({
  year,
  month,
  dragThreshold = 4,
  onClickActivate,
  onSelectionComplete,
}: UseSlotSelectionOptions): UseSlotSelectionReturn {
  const [selectedKeys, setSelectedKeys] = useState<Set<SlotKey>>(() => new Set())
  const [isSelecting, setIsSelecting] = useState(false)

  const anchorSlotRef = useRef<SlotKey | null>(null)
  const focusSlotRef = useRef<SlotKey | null>(null)
  const anchorRectRef = useRef<ActivityPickerAnchorRect | null>(null)
  const startPointRef = useRef<{ x: number; y: number } | null>(null)
  const captureTargetRef = useRef<HTMLElement | null>(null)
  const pointerIdRef = useRef<number | null>(null)
  const isSelectingRef = useRef(false)

  const onClickActivateRef = useRef(onClickActivate)
  const onSelectionCompleteRef = useRef(onSelectionComplete)
  const yearRef = useRef(year)
  const monthRef = useRef(month)
  onClickActivateRef.current = onClickActivate
  onSelectionCompleteRef.current = onSelectionComplete
  yearRef.current = year
  monthRef.current = month

  sessionRef.current = {
    dragThreshold,
    isSelectingRef,
    anchorSlotRef,
    focusSlotRef,
    anchorRectRef,
    startPointRef,
    captureTargetRef,
    pointerIdRef,
    yearRef,
    monthRef,
    onClickActivateRef,
    onSelectionCompleteRef,
    setSelectedKeys,
    setIsSelecting,
  }

  const clearSelection = useCallback(() => {
    removeDocumentListeners()
    setSelectedKeys(new Set())
    setIsSelecting(false)
    anchorSlotRef.current = null
    focusSlotRef.current = null
    anchorRectRef.current = null
    startPointRef.current = null
    captureTargetRef.current = null
    pointerIdRef.current = null
    isSelectingRef.current = false
  }, [])

  const handlePointerDown = useCallback(
    (key: SlotKey, event: React.PointerEvent<HTMLButtonElement>) => {
      if (event.button !== 0) {
        return
      }

      event.preventDefault()

      anchorSlotRef.current = key
      focusSlotRef.current = key
      anchorRectRef.current = toAnchorRect(event.currentTarget)
      startPointRef.current = { x: event.clientX, y: event.clientY }
      captureTargetRef.current = event.currentTarget
      pointerIdRef.current = event.pointerId
      isSelectingRef.current = true
      setIsSelecting(true)
      setSelectedKeys(new Set([key]))

      event.currentTarget.setPointerCapture(event.pointerId)

      document.addEventListener("pointermove", onDocumentPointerMove)
      document.addEventListener("pointerup", onDocumentPointerUp)
      document.addEventListener("pointercancel", onDocumentPointerUp)
    },
    []
  )

  return {
    selectedKeys,
    isSelecting,
    handlePointerDown,
    clearSelection,
  }
}
