"use client";

import { useState } from "react";
import { CircleX, ThumbsDown, ThumbsUp, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Countdown from "@/components/Countdown";

type ResultScreenProps = {
  status: "won" | "lost";
  riddle: string;
  answer: string;
  solveCount: number;
};

export default function ResultScreen({
  status,
  riddle,
  answer,
  solveCount,
}: ResultScreenProps) {
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const won = status === "won";

  return (
    <>
      <div className="flex w-full max-w-md flex-col items-center gap-4 pb-[116px] lg:pb-8">
        <Countdown />
        <Card className="w-full max-w-md animate-in fade-in zoom-in-95 bg-transparent ring-0 duration-500">
          <CardContent className="flex flex-col items-center gap-2 py-4 text-center">
            {won ? (
              <Trophy className="size-10 text-[#F5C371]" />
            ) : (
              <CircleX className="text-destructive size-10" />
            )}
            <span
              className={`text-2xl font-bold ${
                won ? "text-[#F5C371]" : "text-destructive"
              }`}
            >
              {won ? "Riddle Solved!" : "Riddle Failed"}
            </span>
          </CardContent>
        </Card>
        <Card
          className="w-full max-w-md animate-in fade-in bg-transparent ring-0 duration-500"
          style={{ animationDelay: "150ms", animationFillMode: "backwards" }}
        >
          <CardContent className="flex flex-col divide-y divide-border">
            <div className="flex flex-col gap-1 pb-3">
              <span className="text-muted-foreground text-sm">Answer</span>
              <span className="text-lg text-[#F5C371] capitalize">
                {answer}
              </span>
            </div>
            <div className="flex flex-col gap-1 py-3">
              <span className="text-muted-foreground text-sm">Riddle</span>
              <span className="text-lg italic">{riddle}</span>
            </div>
            <div className="flex flex-col gap-1 pt-3">
              <span className="text-muted-foreground text-sm">Solved by</span>
              <span className="text-lg">
                {solveCount} {solveCount === 1 ? "player" : "players"}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card
          className="w-full max-w-md animate-in fade-in bg-transparent ring-0 duration-500"
          style={{ animationDelay: "300ms", animationFillMode: "backwards" }}
        >
          <CardContent className="flex flex-col items-center gap-3 text-lg">
            <span>
              {feedback
                ? "Thank you for the feedback!"
                : "Was this riddle fair?"}
            </span>
            <div className="flex gap-2">
              <Button
                variant={feedback === "up" ? "default" : "secondary"}
                size="icon"
                onClick={() => setFeedback("up")}
              >
                <ThumbsUp />
              </Button>
              <Button
                variant={feedback === "down" ? "default" : "secondary"}
                size="icon"
                onClick={() => setFeedback("down")}
              >
                <ThumbsDown />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-50 flex h-[100px] items-center justify-center border-t border-border bg-background text-center text-sm text-muted-foreground lg:hidden">
        Advertisement placeholder (320x100)
      </div>
    </>
  );
}
