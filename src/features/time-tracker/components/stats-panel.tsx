import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  computeMonthStats,
  formatHours,
} from "@/features/time-tracker/lib/stats-utils"
import type { SlotMap } from "@/features/time-tracker/types"

export type StatsPanelProps = {
  year: number
  month: number
  slots: SlotMap
}

export function StatsPanel({ year, month, slots }: StatsPanelProps) {
  const stats = computeMonthStats(slots, year, month)
  const totalMonthHours = stats.totalSlotsInMonth * 0.5

  return (
    <Card>
      <CardHeader>
        <CardTitle>This month</CardTitle>
        <CardDescription>
          {stats.totalTrackedSlots > 0
            ? `${formatHours(stats.totalTrackedHours)} tracked across ${stats.byActivity.length} ${stats.byActivity.length === 1 ? "activity" : "activities"}`
            : "No time logged yet"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {stats.totalTrackedSlots === 0 ? (
          <p className="text-sm text-muted-foreground">
            Fill cells in the grid below to see a breakdown by activity.
          </p>
        ) : (
          <ul className="space-y-4">
            {stats.byActivity.map(({ activity, hours, percentOfTracked }) => (
              <li key={activity.id} className="space-y-2">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="flex min-w-0 items-center gap-2">
                    <span aria-hidden="true">{activity.emoji}</span>
                    <span className="truncate font-medium">{activity.label}</span>
                  </span>
                  <span className="shrink-0 tabular-nums text-muted-foreground">
                    {formatHours(hours)}
                  </span>
                </div>
                <Progress
                  value={percentOfTracked}
                  aria-label={`${activity.label}: ${formatHours(hours)}`}
                  className="[&_[data-slot=progress-indicator]]:bg-(--activity-color)"
                  style={
                    {
                      "--activity-color": activity.color,
                    } as React.CSSProperties
                  }
                />
              </li>
            ))}
          </ul>
        )}

        <Separator />

        <section className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-medium">Month coverage</h3>
            <Badge variant="secondary">
              {formatHours(stats.totalTrackedHours)} / {formatHours(totalMonthHours)}{" "}
              tracked
            </Badge>
          </div>
          <Progress
            value={stats.percentTracked}
            aria-label={`${Math.round(stats.percentTracked)}% of month logged`}
          />
          <p className="text-sm text-muted-foreground">
            {formatHours(stats.untrackedHours)} untracked ·{" "}
            {Math.round(stats.percentTracked)}% of month logged
          </p>
        </section>
      </CardContent>
    </Card>
  )
}
