"use client";
import { PRODUCT_CATERGORIES } from "@/config";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Category = (typeof PRODUCT_CATERGORIES)[number];

interface NavItemProps {
  category: Category;
  handleOpen: () => void;
  isOpen: boolean;
  isAnyOpen: boolean;
}

export default function NavItem({
  category,
  handleOpen,
  isOpen,
  isAnyOpen,
}: NavItemProps) {
  return (
    <div className="flex">
      <div className="relative flex items-center">
        <Button
          className="gap-1.5"
          onClick={handleOpen}
          variant={isOpen ? "secondary" : "ghost"}
        >
          {category.label || "undefined label"}
          <ChevronDown
            className={cn("h-4 w-4 trainsitioan-all text-muted-foreground", {
              "-rotate-180": isOpen,
            })}
          />
        </Button>
      </div>
    </div>
  );
}
