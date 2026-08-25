import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100svh-3.5rem)] w-full max-w-2xl flex-col justify-center gap-8 border border-dashed border-transparent p-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">What is TheDailyRiddle?</h2>
        <p className="text-muted-foreground text-lg">
          A daily riddle challenge — one new riddle every day. Guess the
          answer before you run out of lives.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">How to play</h2>
        <ul className="text-muted-foreground flex list-inside list-disc flex-col gap-1 text-lg">
          <li>Read the riddle carefully</li>
          <li>Type your guess and press Guess (or hit Enter)</li>
          <li>You start with 5 lives — a wrong guess costs one</li>
          <li>Solve the riddle before you run out of lives</li>
        </ul>
      </div>
    </main>
  );
}
