"use client"

import { useCallback, useRef, useState, type RefObject } from "react"

import { getSlotKeyFromPoint } from "../lib/slot-hit-test"
import type { PaintBrush, SlotKey } from "../types"

type UseTouchPaintOptions = {
  activeBrush: PaintBrush | null
  scrollContainerRef: RefObject<HTMLElement | null>
  setSlot: (key: SlotKey, activityId: string) => void
  clearSlot: (key: SlotKey) => void
}

type UseTouchPaintReturn = {
  isPainting: boolean
  paintedKeys: Set<SlotKey>
  handlePointerDown: (
    key: SlotKey,
    event: React.PointerEvent<HTMLButtonElement>
  ) => void
  clearPaintSession: () => void
}

type PaintSession = {
  isPaintingRef: { current: boolean }
  paintedInSessionRef: { current: Set<SlotKey> }
  captureTargetRef: { current: HTMLElement | null }
  scrollContainerRef: RefObject<HTMLElement | null>
  pointerIdRef: { current: number | null }
  activeBrushRef: { current: PaintBrush | null }
  setSlotRef: { current: (key: SlotKey, activityId: string) => void }
  clearSlotRef: { current: (key: SlotKey) => void }
  setIsPainting: (isPainting: boolean) => void
  setPaintedKeys: (keys: Set<SlotKey>) => void
}

const PAINT_LISTENER_OPTIONS: AddEventListenerOptions = { passive: false }

function lockScrollContainer(session: PaintSession) {
  session.scrollContainerRef.current?.style.setProperty("touch-action", "none")
}

function unlockScrollContainer(session: PaintSession) {
  session.scrollContainerRef.current?.style.removeProperty("touch-action")
}

const paintSessionRef: { current: PaintSession | null } = { current: null }

function applyBrushToSlot(
  key: SlotKey,
  brush: PaintBrush,
  setSlot: (key: SlotKey, activityId: string) => void,
  clearSlot: (key: SlotKey) => void
) {
  if (brush.mode === "fill") {
    setSlot(key, brush.activityId)
    return
  }

  clearSlot(key)
}

function removePaintListeners() {
  document.removeEventListener("pointermove", onPaintPointerMove, PAINT_LISTENER_OPTIONS)
  document.removeEventListener("pointerup", onPaintPointerUp, PAINT_LISTENER_OPTIONS)
  document.removeEventListener("pointercancel", onPaintPointerUp, PAINT_LISTENER_OPTIONS)
  document.removeEventListener("touchmove", onPaintTouchMove, PAINT_LISTENER_OPTIONS)
}

function paintSlotIfNew(key: SlotKey | null) {
  if (!key) {
    return
  }

  const session = paintSessionRef.current
  if (!session || !session.isPaintingRef.current) {
    return
  }

  if (session.paintedInSessionRef.current.has(key)) {
    return
  }

  const brush = session.activeBrushRef.current
  if (!brush) {
    return
  }

  session.paintedInSessionRef.current.add(key)
  applyBrushToSlot(
    key,
    brush,
    session.setSlotRef.current,
    session.clearSlotRef.current
  )
  session.setPaintedKeys(new Set(session.paintedInSessionRef.current))
}

function finishPaintSession() {
  const session = paintSessionRef.current
  if (!session || !session.isPaintingRef.current) {
    return
  }

  session.isPaintingRef.current = false
  session.setIsPainting(false)
  removePaintListeners()
  unlockScrollContainer(session)

  const captureTarget = session.captureTargetRef.current
  const pointerId = session.pointerIdRef.current

  if (captureTarget && pointerId !== null) {
    try {
      captureTarget.releasePointerCapture(pointerId)
    } catch {
      // Pointer capture may already be released.
    }
  }

  session.captureTargetRef.current = null
  session.pointerIdRef.current = null
  session.paintedInSessionRef.current = new Set()
  session.setPaintedKeys(new Set())
}

function onPaintPointerMove(event: PointerEvent) {
  const session = paintSessionRef.current
  if (!session?.isPaintingRef.current) {
    return
  }

  event.preventDefault()
  paintSlotIfNew(getSlotKeyFromPoint(event.clientX, event.clientY))
}

function onPaintTouchMove(event: TouchEvent) {
  const session = paintSessionRef.current
  if (!session?.isPaintingRef.current) {
    return
  }

  event.preventDefault()

  const touch = event.touches[0]
  if (!touch) {
    return
  }

  paintSlotIfNew(getSlotKeyFromPoint(touch.clientX, touch.clientY))
}

function onPaintPointerUp() {
  finishPaintSession()
}

export function useTouchPaint({
  activeBrush,
  scrollContainerRef,
  setSlot,
  clearSlot,
}: UseTouchPaintOptions): UseTouchPaintReturn {
  const [isPainting, setIsPainting] = useState(false)
  const [paintedKeys, setPaintedKeys] = useState<Set<SlotKey>>(() => new Set())

  const isPaintingRef = useRef(false)
  const paintedInSessionRef = useRef<Set<SlotKey>>(new Set())
  const captureTargetRef = useRef<HTMLElement | null>(null)
  const pointerIdRef = useRef<number | null>(null)
  const activeBrushRef = useRef(activeBrush)
  const setSlotRef = useRef(setSlot)
  const clearSlotRef = useRef(clearSlot)

  activeBrushRef.current = activeBrush
  setSlotRef.current = setSlot
  clearSlotRef.current = clearSlot

  paintSessionRef.current = {
    isPaintingRef,
    paintedInSessionRef,
    captureTargetRef,
    scrollContainerRef,
    pointerIdRef,
    activeBrushRef,
    setSlotRef,
    clearSlotRef,
    setIsPainting,
    setPaintedKeys,
  }

  const clearPaintSession = useCallback(() => {
    finishPaintSession()
  }, [])

  const handlePointerDown = useCallback(
    (key: SlotKey, event: React.PointerEvent<HTMLButtonElement>) => {
      if (event.button !== 0) {
        return
      }

      if (!activeBrushRef.current) {
        return
      }

      event.preventDefault()

      const session = paintSessionRef.current
      const scrollContainer = scrollContainerRef.current
      const captureTarget = scrollContainer ?? event.currentTarget

      isPaintingRef.current = true
      setIsPainting(true)
      paintedInSessionRef.current = new Set()
      captureTargetRef.current = captureTarget
      pointerIdRef.current = event.pointerId

      if (session) {
        lockScrollContainer(session)
      }

      captureTarget.setPointerCapture(event.pointerId)

      paintSlotIfNew(key)

      document.addEventListener("pointermove", onPaintPointerMove, PAINT_LISTENER_OPTIONS)
      document.addEventListener("pointerup", onPaintPointerUp, PAINT_LISTENER_OPTIONS)
      document.addEventListener("pointercancel", onPaintPointerUp, PAINT_LISTENER_OPTIONS)
      document.addEventListener("touchmove", onPaintTouchMove, PAINT_LISTENER_OPTIONS)
    },
    []
  )

  return {
    isPainting,
    paintedKeys,
    handlePointerDown,
    clearPaintSession,
  }
}
