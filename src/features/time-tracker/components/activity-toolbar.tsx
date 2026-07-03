"use client"

import { useState } from "react"
import { Eraser, MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import type { Activity, PaintBrush } from "../types"

export type ActivityToolbarProps = {
  activities: Activity[]
  activeBrush: PaintBrush | null
  onBrushChange: (brush: PaintBrush) => void
}

function isFillBrushActive(
  activeBrush: PaintBrush | null,
  activityId: string
): boolean {
  return activeBrush?.mode === "fill" && activeBrush.activityId === activityId
}

export function ActivityToolbar({
  activities,
  activeBrush,
  onBrushChange,
}: ActivityToolbarProps) {
  const [sheetOpen, setSheetOpen] = useState(false)

  const handleSelectActivity = (activityId: string) => {
    onBrushChange({ mode: "fill", activityId })
    setSheetOpen(false)
  }

  return (
    <>
      <div className="bg-background/95 fixed inset-x-0 bottom-0 z-50 border-t pb-[env(safe-area-inset-bottom)] backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="px-3 py-2">
          <p className="text-muted-foreground mb-2 text-center text-xs">
            {activeBrush
              ? activeBrush.mode === "erase"
                ? "Eraser — tap or drag to clear"
                : "Tap or drag on the grid to fill"
              : "Pick an activity below"}
          </p>
          <ScrollArea className="w-full">
            <div className="flex w-max items-center gap-2 pb-2">
              <button
                type="button"
                aria-label="Eraser"
                aria-pressed={activeBrush?.mode === "erase"}
                onClick={() => onBrushChange({ mode: "erase" })}
                className={cn(
                  "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  activeBrush?.mode === "erase"
                    ? "border-primary bg-primary text-primary-foreground ring-ring ring-2 ring-offset-1"
                    : "border-border bg-muted hover:bg-muted/80"
                )}
              >
                <Eraser className="size-3.5" />
                Eraser
              </button>

              {activities.map((activity) => {
                const isActive = isFillBrushActive(activeBrush, activity.id)

                return (
                  <button
                    key={activity.id}
                    type="button"
                    aria-label={activity.label}
                    aria-pressed={isActive}
                    onClick={() =>
                      onBrushChange({ mode: "fill", activityId: activity.id })
                    }
                    className={cn(
                      "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                      isActive
                        ? "ring-ring ring-2 ring-offset-1"
                        : "border-border hover:bg-muted/80"
                    )}
                    style={
                      isActive
                        ? { backgroundColor: activity.color, color: "#fff" }
                        : undefined
                    }
                  >
                    <span
                      aria-hidden
                      className="size-2.5 shrink-0 rounded-sm border border-border/60"
                      style={{ backgroundColor: activity.color }}
                    />
                    <span>{activity.emoji}</span>
                    <span>{activity.label}</span>
                  </button>
                )
              })}

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="shrink-0 rounded-full"
                onClick={() => setSheetOpen(true)}
              >
                <MoreHorizontal className="size-4" />
                More
              </Button>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="bottom" className="max-h-[70vh]">
          <SheetHeader>
            <SheetTitle>Activities</SheetTitle>
            <SheetDescription>
              Choose an activity to use as your paint brush.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-1 overflow-y-auto px-4 pb-4">
            <button
              type="button"
              onClick={() => {
                onBrushChange({ mode: "erase" })
                setSheetOpen(false)
              }}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors hover:bg-muted",
                activeBrush?.mode === "erase" && "bg-muted"
              )}
            >
              <Eraser className="text-muted-foreground size-4" />
              <span className="font-medium">Eraser</span>
              {activeBrush?.mode === "erase" && (
                <Badge variant="secondary" className="ml-auto">
                  Active
                </Badge>
              )}
            </button>

            {activities.map((activity) => {
              const isActive = isFillBrushActive(activeBrush, activity.id)

              return (
                <button
                  key={activity.id}
                  type="button"
                  onClick={() => handleSelectActivity(activity.id)}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors hover:bg-muted",
                    isActive && "bg-muted"
                  )}
                >
                  <span
                    aria-hidden
                    className="size-4 shrink-0 rounded-sm border border-border/60"
                    style={{ backgroundColor: activity.color }}
                  />
                  <span>{activity.emoji}</span>
                  <span className="font-medium">{activity.label}</span>
                  {isActive && (
                    <Badge variant="secondary" className="ml-auto">
                      Active
                    </Badge>
                  )}
                </button>
              )
            })}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
