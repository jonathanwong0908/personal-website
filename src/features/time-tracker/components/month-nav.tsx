import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

const monthLabelFormatter = new Intl.DateTimeFormat("en", {
  month: "long",
  year: "numeric",
})

export type MonthNavProps = {
  year: number
  month: number
  onPrevious: () => void
  onNext: () => void
}

export function MonthNav({ year, month, onPrevious, onNext }: MonthNavProps) {
  const label = monthLabelFormatter.format(new Date(year, month - 1, 1))

  return (
    <div className="flex items-center gap-1">
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        aria-label="Previous month"
        onClick={onPrevious}
      >
        <ChevronLeft />
      </Button>
      <span
        className="min-w-[9rem] px-2 text-center text-sm font-medium"
        aria-live="polite"
      >
        {label}
      </span>
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        aria-label="Next month"
        onClick={onNext}
      >
        <ChevronRight />
      </Button>
    </div>
  )
}
