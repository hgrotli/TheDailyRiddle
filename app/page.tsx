"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import RiddleCard from "@/components/RiddleCard";
import AnswerCard from "@/components/AnswerCard";
import Keyboard from "@/components/Keyboard";
import LivesCard, { HEART_ANIMATION_DURATION_MS } from "@/components/LivesCard";
import ResultScreen from "@/components/ResultScreen";
import SideAds from "@/components/SideAds";

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

  const handleKeyPress = useCallback(
    (key: string) => {
      if (isLocked) return;
      if (key === "Backspace") {
        setGuess((prev) => prev.slice(0, -1));
      } else if (key === "Enter") {
        if (guess.length === 0) return;
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
      } else {
        setGuess((prev) => prev + key);
      }
    },
    [isLocked, guess, lives]
  );

  const handleRevealComplete = useCallback(() => {
    if (result === "wrong") {
      setLives((prev) => prev - 1);
      setTimeout(() => {
        setResult(null);
      }, HEART_ANIMATION_DURATION_MS * 2);
    } else if (result === null) {
      setGuess("");
      setIsLocked(false);
    }
  }, [result]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Backspace" || e.key === "Enter") {
        handleKeyPress(e.key);
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleKeyPress(e.key.toUpperCase());
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleKeyPress]);

  return (
    <main className="flex h-[calc(100svh-3.5rem)] flex-col items-center justify-start">
      <SideAds />
      {showResult && gameStatus && answer ? (
        <ResultScreen
          status={gameStatus}
          riddle={riddleText ?? ""}
          answer={answer}
          solveCount={solveCount}
        />
      ) : (
        <div
          className={`mx-auto flex h-full w-full max-w-2xl flex-col items-center justify-between gap-4 border border-dashed border-transparent p-8 transition-opacity duration-500 ${
            gameFading ? "opacity-0" : "opacity-100"
          }`}
        >
          {riddleText === null ? (
            <span className="text-muted-foreground m-auto text-lg">
              Loading today&apos;s riddle...
            </span>
          ) : (
            <>
              <LivesCard lives={lives} />
              <RiddleCard
                riddle={riddleText}
                result={result}
                onRevealComplete={handleRevealComplete}
              />
              <AnswerCard guess={guess} locked={isLocked} />
              <Keyboard
                onKeyPress={handleKeyPress}
                hasGuess={guess.length > 0}
                locked={isLocked}
              />
            </>
          )}
        </div>
      )}
    </main>
  );
}
