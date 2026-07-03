import type { SlotKey } from "../types"

export const SLOT_KEY_ATTR = "data-slot-key"

export function getSlotKeyFromPoint(
  clientX: number,
  clientY: number
): SlotKey | null {
  const element = document.elementFromPoint(clientX, clientY)
  if (!element) {
    return null
  }

  const cell = element.closest(`[${SLOT_KEY_ATTR}]`)
  if (!cell) {
    return null
  }

  const key = cell.getAttribute(SLOT_KEY_ATTR)
  return key ? (key as SlotKey) : null
}
