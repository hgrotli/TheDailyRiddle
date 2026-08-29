"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import RiddleCard from "@/components/RiddleCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import LivesCard, { HEART_ANIMATION_DURATION_MS } from "@/components/LivesCard";
import ResultScreen from "@/components/ResultScreen";

const GAME_FADE_MS = 500;

export default function Home() {
  const [riddleText, setRiddleText] = useState<string | null>(null);
  const [solveCount, setSolveCount] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const [guess, setGuess] = useState("");
  const [lives, setLives] = useState(5);
  const [isLocked, setIsLocked] = useState(true);
  const [result, setResult] = useState<"wrong" | null>(null);
  const [gameFading, setGameFading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [gameStatus, setGameStatus] = useState<"won" | "lost" | null>(null);
  const nextRotationAt = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const loadRiddle = useCallback(() => {
    fetch("/api/riddle")
      .then((res) => res.json())
      .then((data) => {
        nextRotationAt.current = data.nextRotationAt;
        setRiddleText(data.riddle);
        setSolveCount(data.solveCount);
        setAnswer(null);
        setGuess("");
        setLives(5);
        setIsLocked(true);
        setResult(null);
        setGameFading(false);
        setShowResult(false);
        setGameStatus(null);
      });
  }, []);

  useEffect(() => {
    loadRiddle();
    const interval = setInterval(() => {
      if (
        nextRotationAt.current !== null &&
        Date.now() >= nextRotationAt.current
      ) {
        loadRiddle();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [loadRiddle]);

  const handleSubmit = useCallback(() => {
    if (isLocked || guess.length === 0) return;
    const willLoseIfWrong = lives <= 1;
    setIsLocked(true);
    fetch("/api/guess", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guess, reveal: willLoseIfWrong }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.correct) {
          setAnswer(data.answer);
          setSolveCount((prev) => prev + 1);
          setGameStatus("won");
          setGameFading(true);
          setTimeout(() => {
            setShowResult(true);
          }, GAME_FADE_MS);
        } else if (willLoseIfWrong) {
          setAnswer(data.answer);
          setLives(0);
          setGameStatus("lost");
          setGameFading(true);
          setTimeout(() => {
            setShowResult(true);
          }, GAME_FADE_MS);
        } else {
          setResult("wrong");
        }
      });
  }, [isLocked, guess, lives]);

  const handleRevealComplete = useCallback(() => {
    if (result === "wrong") {
      setLives((prev) => prev - 1);
      setTimeout(() => {
        setResult(null);
      }, HEART_ANIMATION_DURATION_MS * 2);
    } else if (result === null) {
      setGuess("");
      setIsLocked(false);
      inputRef.current?.focus();
    }
  }, [result]);

  return (
    <main className="flex h-[calc(100svh-3.5rem)] flex-col items-center justify-start">
      {showResult && gameStatus && answer ? (
        <ResultScreen
          status={gameStatus}
          riddle={riddleText ?? ""}
          answer={answer}
          solveCount={solveCount}
        />
      ) : (
        <div
          className={`mx-auto flex h-full w-full max-w-[336px] flex-col items-center justify-center gap-8 border border-dashed border-transparent transition-opacity duration-500 ${
            gameFading ? "opacity-0" : "opacity-100"
          }`}
        >
          {riddleText === null ? (
            <span className="text-muted-foreground m-auto text-lg">
              Loading today&apos;s riddle...
            </span>
          ) : (
            <>
              <RiddleCard
                riddle={riddleText}
                result={result}
                onRevealComplete={handleRevealComplete}
              />
              <Card className="w-full max-w-[336px] border border-transparent bg-transparent ring-0">
                <CardContent className="flex flex-col gap-4">
                  <div className="flex justify-center">
                    <LivesCard lives={lives} />
                  </div>
                  <div className="flex gap-2">
                    <Input
                      ref={inputRef}
                      className="w-full"
                      placeholder="Type your answer"
                      value={guess}
                      onChange={(e) =>
                        setGuess(e.target.value.replace(/[^a-zA-Z]/g, ""))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSubmit();
                      }}
                      disabled={isLocked}
                      autoCapitalize="off"
                      autoCorrect="off"
                      autoComplete="off"
                      spellCheck={false}
                      enterKeyHint="done"
                      lang="en"
                    />
                    <Button
                      onClick={handleSubmit}
                      disabled={isLocked || guess.length === 0}
                    >
                      Guess
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      )}
    </main>
  );
}
