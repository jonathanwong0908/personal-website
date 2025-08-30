"use client";

import { Menu } from "lucide-react";
import { useState } from "react";

import { DialogTitle } from "@workspace/ui/components/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@workspace/ui/components/drawer";

import { HeaderLinks } from "./header-links";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="top">
      <DrawerTrigger>
        <Menu />
      </DrawerTrigger>
      <DrawerContent className="py-10">
        <DialogTitle className="sr-only">Menu</DialogTitle>
        <div className="px-7 sm:px-8">
          <HeaderLinks
            onLinkClick={() => setOpen(false)}
            className="gap-2 text-lg"
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
