"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LINKS = [
  { id: "play", label: "Play" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto flex h-14 w-full max-w-2xl items-center justify-between px-8">
        <span className="font-heading text-sm font-medium">
          TheDailyRiddle
        </span>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            {LINKS.map((link) => (
              <DropdownMenuItem
                key={link.id}
                onClick={() => scrollTo(link.id)}
              >
                {link.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
