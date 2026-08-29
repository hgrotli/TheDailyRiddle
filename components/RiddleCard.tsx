"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const CHAR_DELAY_MS = 25;
const TRANSITION_DURATION_MS = 300;

type RiddleCardProps = {
  riddle: string;
  result?: "wrong" | null;
  onRevealComplete?: () => void;
};

export default function RiddleCard({
  riddle,
  result,
  onRevealComplete,
}: RiddleCardProps) {
  const content =
    result === "wrong"
      ? "Hmm, that is not quite right. Try again, young one."
      : riddle;

  const [prevContent, setPrevContent] = useState(content);
  const [revealed, setRevealed] = useState(false);

  if (content !== prevContent) {
    setPrevContent(content);
    setRevealed(false);
  }

  useEffect(() => {
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setRevealed(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [content]);

  useEffect(() => {
    if (!revealed) return;
    const totalDuration =
      content.length * CHAR_DELAY_MS + TRANSITION_DURATION_MS;
    const timeout = setTimeout(() => {
      onRevealComplete?.();
    }, totalDuration);
    return () => clearTimeout(timeout);
  }, [revealed, content, onRevealComplete]);

  return (
    <Card className="w-full max-w-[336px] border border-transparent bg-transparent ring-0">
      <CardContent className="text-center text-lg">
        {content.split("").map((char, i) => (
          <span
            key={`${content}-${i}`}
            className="ease-out"
            style={{
              opacity: revealed ? 1 : 0,
              transitionProperty: "opacity",
              transitionDuration: `${TRANSITION_DURATION_MS}ms`,
              transitionDelay: `${i * CHAR_DELAY_MS}ms`,
            }}
          >
            {char}
          </span>
        ))}
      </CardContent>
    </Card>
  );
}
