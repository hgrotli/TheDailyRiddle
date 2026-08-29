"use client";

import { AnimatePresence, motion } from "motion/react";
import { Heart } from "lucide-react";

const MAX_LIVES = 5;
export const HEART_ANIMATION_DURATION_MS = 500;

type LivesCardProps = {
  lives: number;
};

export default function LivesCard({ lives }: LivesCardProps) {
  return (
    <div className="flex shrink-0 gap-1.5">
      <AnimatePresence>
        {Array.from({ length: Math.min(lives, MAX_LIVES) }, (_, i) => (
          <motion.div
            key={i}
            layout
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: HEART_ANIMATION_DURATION_MS / 1000 }}
          >
            <Heart
              className="size-5 animate-[float_2s_ease-in-out_infinite] text-[#F5C371]"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
