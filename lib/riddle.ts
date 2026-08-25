import { getSupabaseClient } from "@/lib/supabase";

const ROTATION_INTERVAL_MINUTES = Number(
  process.env.RIDDLE_INTERVAL_MINUTES ?? 1440
);

function getIntervalMs() {
  return ROTATION_INTERVAL_MINUTES * 60 * 1000;
}

function getCurrentPeriod() {
  return Math.floor(Date.now() / getIntervalMs());
}

export function getNextRotationTime() {
  return (getCurrentPeriod() + 1) * getIntervalMs();
}

export async function getCurrentRiddle() {
  const supabase = getSupabaseClient();

  const { data: riddles, error } = await supabase
    .from("riddles")
    .select("id, riddle, answer, solve_count, last_period")
    .order("id", { ascending: true });

  if (error || !riddles || riddles.length === 0) return null;

  const period = getCurrentPeriod();
  const index = period % riddles.length;
  const data = riddles[index];

  if (data.last_period !== period) {
    await supabase
      .from("riddles")
      .update({ solve_count: 0, last_period: period })
      .eq("id", data.id);
    return { ...data, solve_count: 0 };
  }

  return data;
}
