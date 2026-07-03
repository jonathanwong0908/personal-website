"use client"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover"
import type { Activity } from "../types"

export type ActivityPickerAnchorRect = {
  top: number
  left: number
  width: number
  height: number
}

export type ActivityPickerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  anchorRect: ActivityPickerAnchorRect | null
  activities: Activity[]
  onSelect: (activityId: string) => void
  onClear: () => void
}

export function ActivityPicker({
  open,
  onOpenChange,
  anchorRect,
  activities,
  onSelect,
  onClear,
}: ActivityPickerProps) {
  if (!open || !anchorRect) {
    return null
  }

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverAnchor asChild>
        <div
          aria-hidden
          className="pointer-events-none fixed"
          style={{
            top: anchorRect.top,
            left: anchorRect.left,
            width: anchorRect.width,
            height: anchorRect.height,
          }}
        />
      </PopoverAnchor>
      <PopoverContent
        className="w-56 p-0"
        align="start"
        side="bottom"
        onOpenAutoFocus={(event) => event.preventDefault()}
        onCloseAutoFocus={(event) => event.preventDefault()}
      >
        <Command>
          <CommandInput placeholder="Search activities…" />
          <CommandList>
            <CommandEmpty>No activity found.</CommandEmpty>
            <CommandGroup heading="Activities">
              {activities.map((activity) => (
                <CommandItem
                  key={activity.id}
                  value={activity.label}
                  onSelect={() => onSelect(activity.id)}
                >
                  <span
                    aria-hidden
                    className="size-3 shrink-0 rounded-sm border border-border/60"
                    style={{ backgroundColor: activity.color }}
                  />
                  <span>{activity.emoji}</span>
                  <span>{activity.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Actions">
              <CommandItem value="clear slot" onSelect={onClear}>
                Clear slot
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
