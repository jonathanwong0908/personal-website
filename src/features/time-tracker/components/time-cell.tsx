import type { Activity } from "../types"
import { cn } from "@/lib/utils"

export type TimeCellProps = {
  activity?: Activity
  isSelected?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onPointerDown?: (e: React.PointerEvent<HTMLButtonElement>) => void
}

export function TimeCell({
  activity,
  isSelected = false,
  onClick,
  onPointerDown,
}: TimeCellProps) {
  const isFilled = Boolean(activity)

  return (
    <button
      type="button"
      aria-label={activity?.label ?? "Empty slot"}
      onClick={onClick}
      onPointerDown={onPointerDown}
      className={cn(
        "size-7 shrink-0 rounded-sm border text-xs leading-none",
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
