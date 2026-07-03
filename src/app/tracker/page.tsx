"use client";

import { useCallback, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ActivityPicker,
  type ActivityPickerAnchorRect,
} from "@/features/time-tracker/components/activity-picker";
import { TimeGrid } from "@/features/time-tracker/components/time-grid";
import { useTimeTracker } from "@/features/time-tracker/hooks/use-time-tracker";
import type { SlotKey } from "@/features/time-tracker/types";

function toAnchorRect(element: HTMLElement): ActivityPickerAnchorRect {
  const rect = element.getBoundingClientRect();

  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  };
}

export default function TrackerPage() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const { slots, activities, saveStatus, setSlot, clearSlot } = useTimeTracker({
    year,
    month,
  });

  const [pickerOpen, setPickerOpen] = useState(false);
  const [activeSlotKey, setActiveSlotKey] = useState<SlotKey | null>(null);
  const [anchorRect, setAnchorRect] = useState<ActivityPickerAnchorRect | null>(
    null
  );

  const monthLabel = new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(now);

  const closePicker = useCallback(() => {
    setPickerOpen(false);
    setActiveSlotKey(null);
    setAnchorRect(null);
  }, []);

  const handlePickerOpenChange = useCallback(
    (open: boolean) => {
      if (open) {
        setPickerOpen(true);
        return;
      }

      closePicker();
    },
    [closePicker]
  );

  const handleCellActivate = useCallback(
    (key: SlotKey, event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();

      setActiveSlotKey(key);
      setAnchorRect(toAnchorRect(event.currentTarget));
      setPickerOpen(true);
    },
    []
  );

  const handleSelect = useCallback(
    (activityId: string) => {
      if (!activeSlotKey) {
        return;
      }

      setSlot(activeSlotKey, activityId);
      closePicker();
    },
    [activeSlotKey, closePicker, setSlot]
  );

  const handleClear = useCallback(() => {
    if (!activeSlotKey) {
      return;
    }

    clearSlot(activeSlotKey);
    closePicker();
  }, [activeSlotKey, clearSlot, closePicker]);

  return (
    <div className="bg-background min-h-screen w-full max-w-full px-4 py-8">
      <Card className="mx-auto w-full max-w-full">
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div>
            <CardTitle>Time Tracker</CardTitle>
            <CardDescription>
              Click a cell to assign an activity. Data is saved locally in your
              browser.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {saveStatus === "saving" && (
              <Badge variant="secondary">Saving…</Badge>
            )}
            {saveStatus === "saved" && (
              <Badge variant="outline">Saved</Badge>
            )}
            <Button variant="outline" disabled>
              {monthLabel}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <TimeGrid
            year={year}
            month={month}
            slots={slots}
            activeSlotKey={activeSlotKey}
            onCellActivate={handleCellActivate}
          />
          <ActivityPicker
            open={pickerOpen}
            onOpenChange={handlePickerOpenChange}
            anchorRect={anchorRect}
            activities={activities}
            onSelect={handleSelect}
            onClear={handleClear}
          />
        </CardContent>
      </Card>
    </div>
  );
}
