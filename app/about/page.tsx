import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <main className="mx-auto flex w-full max-w-[336px] flex-col gap-8 pt-16 pb-24">
      <Card className="w-full border border-transparent bg-transparent ring-0">
        <CardContent className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">What is TheDailyRiddle?</h2>
          <p className="text-muted-foreground text-lg">
            A daily riddle challenge — one new riddle every day. Guess the
            answer before you run out of lives.
          </p>
        </CardContent>
      </Card>
      <Card className="w-full border border-transparent bg-transparent ring-0">
        <CardContent className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">How to play</h2>
          <ul className="text-muted-foreground flex list-inside list-disc flex-col gap-1 text-lg">
            <li>Read the riddle carefully</li>
            <li>Type your guess and press Guess (or hit Enter)</li>
            <li>You start with 5 lives — a wrong guess costs one</li>
            <li>Solve the riddle before you run out of lives</li>
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}
