import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import { getCurrentRiddle } from "@/lib/riddle";
import { isCorrectGuess } from "@/lib/validateGuess";

export async function POST(request: Request) {
  const { guess, reveal } = await request.json();

  if (typeof guess !== "string" || guess.trim().length === 0) {
    return NextResponse.json({ error: "Invalid guess" }, { status: 400 });
  }

  const riddle = await getCurrentRiddle();

  if (!riddle) {
    return NextResponse.json(
      { error: "No riddle available" },
      { status: 404 }
    );
  }

  const correct = isCorrectGuess(guess, riddle.answer);

  if (correct) {
    const supabase = getSupabaseClient();
    await supabase
      .from("riddles")
      .update({ solve_count: riddle.solve_count + 1 })
      .eq("id", riddle.id);
  }

  return NextResponse.json({
    correct,
    ...(correct || reveal ? { answer: riddle.answer } : {}),
  });
}
