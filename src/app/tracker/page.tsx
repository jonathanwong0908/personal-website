"use client";

import { useCallback, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
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
import { ActivityToolbar } from "@/features/time-tracker/components/activity-toolbar";
import { MonthNav } from "@/features/time-tracker/components/month-nav";
import { StatsPanel } from "@/features/time-tracker/components/stats-panel";
import { TimeGrid } from "@/features/time-tracker/components/time-grid";
import { useSlotSelection } from "@/features/time-tracker/hooks/use-slot-selection";
import { useTouchPaint } from "@/features/time-tracker/hooks/use-touch-paint";
import { useTimeTracker } from "@/features/time-tracker/hooks/use-time-tracker";
import { shiftMonth } from "@/features/time-tracker/lib/time-utils";
import type { PaintBrush, SlotKey } from "@/features/time-tracker/types";
import { useIsMobile } from "@/hooks/use-mobile";

export default function TrackerPage() {
  const now = new Date();
  const [viewYear, setViewYear] = useState(() => now.getFullYear());
  const [viewMonth, setViewMonth] = useState(() => now.getMonth() + 1);
  const isMobile = useIsMobile();
  const gridScrollRef = useRef<HTMLDivElement>(null);

  const { slots, activities, saveStatus, setSlot, clearSlot, setSlots, clearSlots } =
    useTimeTracker({
      year: viewYear,
      month: viewMonth,
    });

  const [activeBrush, setActiveBrush] = useState<PaintBrush | null>(() =>
    activities[0]
      ? { mode: "fill", activityId: activities[0].id }
      : null
  );

  const [pickerOpen, setPickerOpen] = useState(false);
  const [activeSlotKey, setActiveSlotKey] = useState<SlotKey | null>(null);
  const [selectionKeys, setSelectionKeys] = useState<Set<SlotKey>>(
    () => new Set()
  );
  const [anchorRect, setAnchorRect] = useState<ActivityPickerAnchorRect | null>(
    null
  );

  const handleClickActivate = useCallback(
    (key: SlotKey, rect: ActivityPickerAnchorRect) => {
      setActiveSlotKey(key);
      setSelectionKeys(new Set());
      setAnchorRect(rect);
      setPickerOpen(true);
    },
    []
  );

  const handleSelectionComplete = useCallback(
    (keys: Set<SlotKey>, rect: ActivityPickerAnchorRect) => {
      setActiveSlotKey(null);
      setSelectionKeys(keys);
      setAnchorRect(rect);
      setPickerOpen(true);
    },
    []
  );

  const {
    selectedKeys,
    isSelecting,
    handlePointerDown: handleSelectionPointerDown,
    clearSelection,
  } = useSlotSelection({
    year: viewYear,
    month: viewMonth,
    onClickActivate: handleClickActivate,
    onSelectionComplete: handleSelectionComplete,
  });

  const {
    isPainting,
    paintedKeys,
    handlePointerDown: handleTouchPaintPointerDown,
    clearPaintSession,
  } = useTouchPaint({
    activeBrush,
    scrollContainerRef: gridScrollRef,
    setSlot,
    clearSlot,
  });

  const closePicker = useCallback(() => {
    setPickerOpen(false);
    setActiveSlotKey(null);
    setSelectionKeys(new Set());
    setAnchorRect(null);
    clearSelection();
  }, [clearSelection]);

  const goToPreviousMonth = useCallback(() => {
    closePicker();
    clearPaintSession();
    const next = shiftMonth(viewYear, viewMonth, -1);
    setViewYear(next.year);
    setViewMonth(next.month);
  }, [clearPaintSession, closePicker, viewMonth, viewYear]);

  const goToNextMonth = useCallback(() => {
    closePicker();
    clearPaintSession();
    const next = shiftMonth(viewYear, viewMonth, 1);
    setViewYear(next.year);
    setViewMonth(next.month);
  }, [clearPaintSession, closePicker, viewMonth, viewYear]);

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

  const handleSelect = useCallback(
    (activityId: string) => {
      if (selectionKeys.size > 0) {
        setSlots([...selectionKeys], activityId);
        closePicker();
        return;
      }

      if (!activeSlotKey) {
        return;
      }

      setSlot(activeSlotKey, activityId);
      closePicker();
    },
    [activeSlotKey, closePicker, selectionKeys, setSlot, setSlots]
  );

  const handleClear = useCallback(() => {
    if (selectionKeys.size > 0) {
      clearSlots([...selectionKeys]);
      closePicker();
      return;
    }

    if (!activeSlotKey) {
      return;
    }

    clearSlot(activeSlotKey);
    closePicker();
  }, [activeSlotKey, clearSlot, clearSlots, closePicker, selectionKeys]);

  const handleCellPointerDown = useCallback(
    (key: SlotKey, event: React.PointerEvent<HTMLButtonElement>) => {
      if (event.pointerType !== "mouse") {
        handleTouchPaintPointerDown(key, event);
        return;
      }

      handleSelectionPointerDown(key, event);
    },
    [handleSelectionPointerDown, handleTouchPaintPointerDown]
  );

  const gridSelectedKeys = new Set([
    ...selectedKeys,
    ...paintedKeys,
  ]);

  const pickerSelectionCount =
    selectionKeys.size > 0 ? selectionKeys.size : activeSlotKey ? 1 : 0;

  return (
    <div className="bg-background min-h-screen w-full max-w-full px-4 py-8">
      <Card className="mx-auto w-full max-w-full">
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div>
            <CardTitle>Time Tracker</CardTitle>
            <CardDescription>
              {isMobile
                ? "Select an activity, then tap or drag on the grid."
                : "Click or drag to select cells, then choose an activity. Data is saved locally in your browser."}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {saveStatus === "saving" && (
              <Badge variant="secondary">Saving…</Badge>
            )}
            {saveStatus === "saved" && (
              <Badge variant="outline">Saved</Badge>
            )}
            <MonthNav
              year={viewYear}
              month={viewMonth}
              onPrevious={goToPreviousMonth}
              onNext={goToNextMonth}
            />
          </div>
        </CardHeader>
        <CardContent className={isMobile ? "pb-28" : undefined}>
          <StatsPanel year={viewYear} month={viewMonth} slots={slots} />
          <div className="mt-6">
            <TimeGrid
              year={viewYear}
              month={viewMonth}
              slots={slots}
              activeSlotKey={activeSlotKey}
              selectedKeys={gridSelectedKeys}
              isSelecting={isSelecting}
              isPainting={isPainting}
              scrollContainerRef={gridScrollRef}
              onCellPointerDown={handleCellPointerDown}
            />
          </div>
          <ActivityPicker
            open={pickerOpen}
            onOpenChange={handlePickerOpenChange}
            anchorRect={anchorRect}
            activities={activities}
            selectionCount={pickerSelectionCount}
            onSelect={handleSelect}
            onClear={handleClear}
          />
        </CardContent>
      </Card>
      {isMobile && (
        <ActivityToolbar
          activities={activities}
          activeBrush={activeBrush}
          onBrushChange={setActiveBrush}
        />
      )}
    </div>
  );
}
