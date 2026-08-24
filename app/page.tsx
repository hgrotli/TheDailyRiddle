"use client";

import { useCallback, useEffect, useState } from "react";
import RiddleCard from "@/components/RiddleCard";
import AnswerCard from "@/components/AnswerCard";
import Keyboard from "@/components/Keyboard";
import LivesCard, { HEART_ANIMATION_DURATION_MS } from "@/components/LivesCard";
import ResultScreen from "@/components/ResultScreen";
import SideAds from "@/components/SideAds";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import { riddles } from "@/data/riddles";
import { isCorrectGuess } from "@/lib/validateGuess";

const GAME_FADE_MS = 500;

export default function Home() {
  const [guess, setGuess] = useState("");
  const [lives, setLives] = useState(5);
  const [isLocked, setIsLocked] = useState(true);
  const [result, setResult] = useState<"wrong" | null>(null);
  const [gameFading, setGameFading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [gameStatus, setGameStatus] = useState<"won" | "lost" | null>(null);
  const currentRiddle = riddles[0];

  const handleKeyPress = useCallback(
    (key: string) => {
      if (isLocked) return;
      if (key === "Backspace") {
        setGuess((prev) => prev.slice(0, -1));
      } else if (key === "Enter") {
        if (guess.length === 0) return;
        if (isCorrectGuess(guess, currentRiddle.answer)) {
          setGameStatus("won");
          setGameFading(true);
          setTimeout(() => {
            setShowResult(true);
          }, GAME_FADE_MS);
        } else if (lives <= 1) {
          setLives(0);
          setGameStatus("lost");
          setGameFading(true);
          setTimeout(() => {
            setShowResult(true);
          }, GAME_FADE_MS);
        } else {
          setIsLocked(true);
          setResult("wrong");
        }
      } else {
        setGuess((prev) => prev + key);
      }
    },
    [isLocked, guess, currentRiddle.answer, lives]
  );

  const handleRevealComplete = useCallback(() => {
    if (result === "wrong") {
      const remainingLives = Math.max(0, lives - 1);
      setLives(remainingLives);
      setTimeout(
        () => {
          if (remainingLives === 0) {
            setGameStatus("lost");
            setGameFading(true);
            setTimeout(() => {
              setShowResult(true);
            }, GAME_FADE_MS);
          } else {
            setResult(null);
          }
        },
        HEART_ANIMATION_DURATION_MS * 2
      );
    } else if (result === null) {
      setGuess("");
      setIsLocked(false);
    }
  }, [result, lives]);

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
    <>
      <main id="play" className="flex scroll-mt-14 flex-col items-center justify-start">
        <SideAds />
        {showResult && gameStatus ? (
          <ResultScreen
            status={gameStatus}
            riddle={currentRiddle.riddle}
            answer={currentRiddle.answer}
            solvedPercentage={currentRiddle.solvedPercentage}
          />
        ) : (
          <div
            className={`mx-auto flex min-h-[calc(100svh-3.5rem)] w-full max-w-2xl flex-col items-center justify-between gap-4 border border-dashed border-transparent p-8 transition-opacity duration-500 ${
              gameFading ? "opacity-0" : "opacity-100"
            }`}
          >
            <LivesCard lives={lives} />
            <RiddleCard
              riddle={currentRiddle.riddle}
              result={result}
              onRevealComplete={handleRevealComplete}
            />
            <AnswerCard guess={guess} locked={isLocked} />
            <Keyboard
              onKeyPress={handleKeyPress}
              hasGuess={guess.length > 0}
              locked={isLocked}
            />
          </div>
        )}
      </main>
      <AboutSection />
      <ContactSection />
    </>
  );
}
