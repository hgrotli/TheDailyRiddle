import { NextResponse } from "next/server";
import { getCurrentRiddle, getNextRotationTime } from "@/lib/riddle";

export async function GET() {
  const riddle = await getCurrentRiddle();

  if (!riddle) {
    return NextResponse.json(
      { error: "No riddle available" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    riddle: riddle.riddle,
    solveCount: riddle.solve_count,
    nextRotationAt: getNextRotationTime(),
  });
}
