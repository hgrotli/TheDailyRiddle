"use client";

import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Countdown from "@/components/Countdown";

const LINKS = [
  { href: "/", label: "Play" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const router = useRouter();

  return (
    <header className="bg-background/76 sticky top-0 z-50 w-full backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-2xl items-center justify-between px-8">
        <span className="font-heading text-sm font-medium">
          TheDailyRiddle
        </span>
        <div className="flex items-center gap-4">
          <Countdown />
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
                  key={link.href}
                  onClick={() => router.push(link.href)}
                >
                  {link.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
