"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TrackerPage() {
  return (
    <div className="bg-background min-h-screen w-full max-w-full px-4 py-8">
      <Card className="mx-auto w-full max-w-4xl">
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div>
            <CardTitle>Time Tracker</CardTitle>
            <CardDescription>
              Full-month 30-minute activity grid — coming soon.
            </CardDescription>
          </div>
          <Button variant="outline" disabled>
            July 2026
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Grid will render here in Phase 2.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
