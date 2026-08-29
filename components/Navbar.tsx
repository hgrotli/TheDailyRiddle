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

const LINKS = [
  { href: "/", label: "Play" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
];

export default function Navbar() {
  const router = useRouter();

  return (
    <header className="mx-auto w-full max-w-[336px]">
      <div className="flex h-14 w-full items-center justify-between px-4">
        <span className="text-muted-foreground font-heading text-sm font-medium">
          TheDailyRiddle
        </span>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
              >
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
    </header>
  );
}
