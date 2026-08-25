"use client";

import { Button } from "@/components/ui/button";

const ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
];

type KeyboardProps = {
  onKeyPress?: (key: string) => void;
  hasGuess?: boolean;
  locked?: boolean;
};

export default function Keyboard({
  onKeyPress,
  hasGuess,
  locked,
}: KeyboardProps) {
  return (
    <div className="-mx-6 flex w-[calc(100%+3rem)] max-w-lg flex-col gap-1.5 sm:mx-0 sm:w-full">
      {ROWS.map((row, i) => (
        <div key={i} className="flex gap-1.5">
          {i === 1 && <div className="flex-[0.5]" />}
          {row.map((key) => {
            const isHighlightedEnter = key === "Enter" && hasGuess;
            return (
              <Button
                key={key}
                variant={isHighlightedEnter ? "default" : "secondary"}
                disabled={locked}
                className={`${
                  key === "Enter" || key === "Backspace"
                    ? "h-14 flex-[1.5] px-1 text-xs"
                    : "h-14 flex-1 px-0"
                } lowercase disabled:opacity-100 ${
                  isHighlightedEnter ? "" : "bg-secondary"
                }`}
                onClick={() => onKeyPress?.(key)}
              >
                {key === "Backspace" ? "⌫" : key === "Enter" ? "Guess" : key}
              </Button>
            );
          })}
          {i === 1 && <div className="flex-[0.5]" />}
        </div>
      ))}
    </div>
  );
}
