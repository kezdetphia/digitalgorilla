"use client";
import { LucideShoppingCart } from "lucide-react";
import { Sheet, SheetTrigger } from "./ui/sheet";

export default function Cart() {
  return (
    <Sheet>
      <SheetTrigger className="group">
        <LucideShoppingCart className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
      </SheetTrigger>
    </Sheet>
  );
}
