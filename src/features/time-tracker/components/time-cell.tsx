import type { Activity, SlotKey } from "../types"
import { cn } from "@/lib/utils"

export type TimeCellProps = {
  slotKey: SlotKey
  activity?: Activity
  isSelected?: boolean
  onPointerDown?: (e: React.PointerEvent<HTMLButtonElement>) => void
}

export function TimeCell({
  slotKey,
  activity,
  isSelected = false,
  onPointerDown,
}: TimeCellProps) {
  const isFilled = Boolean(activity)

  return (
    <button
      type="button"
      data-slot-key={slotKey}
      aria-label={activity?.label ?? "Empty slot"}
      onPointerDown={onPointerDown}
      className={cn(
        "size-7 shrink-0 touch-none rounded-sm border text-xs leading-none",
        isFilled
          ? "border-transparent"
          : "bg-muted border-border/60 hover:bg-muted/80",
        isSelected && "ring-ring ring-2 ring-offset-1"
      )}
      style={isFilled ? { backgroundColor: activity!.color } : undefined}
    >
      {activity?.emoji}
    </button>
  )
}
