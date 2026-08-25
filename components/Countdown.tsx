"use client";

import { useEffect, useRef, useState } from "react";

function formatDuration(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function Countdown() {
  const nextRotationAt = useRef<number | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    function fetchNextRotation() {
      fetch("/api/riddle")
        .then((res) => res.json())
        .then((data) => {
          nextRotationAt.current = data.nextRotationAt;
        });
    }

    fetchNextRotation();

    const interval = setInterval(() => {
      if (nextRotationAt.current === null) return;
      const diff = nextRotationAt.current - Date.now();
      setRemaining(diff);
      if (diff <= 0) {
        fetchNextRotation();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-muted-foreground text-xs tabular-nums">
      New riddle in {remaining === null ? "--:--:--" : formatDuration(remaining)}
    </span>
  );
}
