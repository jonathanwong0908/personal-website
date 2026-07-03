import { ACTIVITY_BY_ID, SLOTS_PER_DAY } from "../constants"
import type { SlotKey, SlotMap } from "../types"
import {
  getDaysInMonth,
  slotIndexToTimeLabel,
  toSlotKey,
} from "../lib/time-utils"
import { TimeCell } from "./time-cell"
import { cn } from "@/lib/utils"

const weekdayFormatter = new Intl.DateTimeFormat("en", { weekday: "short" })

export type TimeGridProps = {
  year: number
  month: number
  slots?: SlotMap
  activeSlotKey?: SlotKey | null
  onCellActivate?: (
    key: SlotKey,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void
}

export function TimeGrid({
  year,
  month,
  slots = {},
  activeSlotKey = null,
  onCellActivate,
}: TimeGridProps) {
  const days = getDaysInMonth(year, month)

  return (
    <div className="overflow-x-auto">
      <div
        className="inline-grid gap-px"
        style={{
          gridTemplateColumns: `auto repeat(${days.length}, 28px)`,
          gridTemplateRows: `auto repeat(${SLOTS_PER_DAY}, 28px)`,
        }}
      >
        <div className="bg-background sticky left-0 z-20 border-border/60 border-r" />

        {days.map((date) => (
          <div
            key={toSlotKey(date, 0)}
            className="flex flex-col items-center justify-center px-0.5 text-center"
          >
            <span className="text-foreground text-xs font-medium leading-none">
              {date.getDate()}
            </span>
            <span className="text-muted-foreground text-[10px] leading-none">
              {weekdayFormatter.format(date)}
            </span>
          </div>
        ))}

        {Array.from({ length: SLOTS_PER_DAY }, (_, slotIndex) => (
          <div key={`row-${slotIndex}`} className="contents">
            <div
              className={cn(
                "bg-background text-muted-foreground sticky left-0 z-10 flex items-center justify-end border-border/60 border-r pr-1.5 font-mono text-[10px] leading-none",
                slotIndex % 2 === 1 && "opacity-60"
              )}
            >
              {slotIndexToTimeLabel(slotIndex)}
            </div>

            {days.map((date) => {
              const key = toSlotKey(date, slotIndex)
              const activityId = slots[key]
              const activity = activityId
                ? ACTIVITY_BY_ID[activityId]
                : undefined

              return (
                <TimeCell
                  key={key}
                  activity={activity}
                  isSelected={key === activeSlotKey}
                  onClick={(event) => onCellActivate?.(key, event)}
                />
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
