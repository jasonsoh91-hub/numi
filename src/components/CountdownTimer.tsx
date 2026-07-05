"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetIso: string; // e.g. "2026-07-22T01:00:00Z" (8pm EST July 21 = 01:00 UTC July 22)
  variant?: "dark" | "light";
}

interface TimeParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function computeParts(targetMs: number, nowMs: number): TimeParts {
  const diff = targetMs - nowMs;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds, isPast: false };
}

export function CountdownTimer({ targetIso, variant = "dark" }: CountdownTimerProps) {
  const targetMs = new Date(targetIso).getTime();
  const [parts, setParts] = useState<TimeParts | null>(null);

  useEffect(() => {
    setParts(computeParts(targetMs, Date.now()));
    const id = setInterval(() => {
      setParts(computeParts(targetMs, Date.now()));
    }, 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  if (!parts) {
    return (
      <div className="flex items-center justify-center gap-2 py-2" aria-hidden />
    );
  }

  if (parts.isPast) {
    return (
      <div
        className={`flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider ${
          variant === "dark" ? "text-[#D8B86A]" : "text-[#0A0E27]"
        }`}
      >
        <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-red-500" />
        <span>Session in progress</span>
      </div>
    );
  }

  const boxCls =
    variant === "dark"
      ? "min-w-[52px] rounded-md bg-white/10 px-2 py-1.5 text-center backdrop-blur"
      : "min-w-[52px] rounded-md bg-[#0A0E27] px-2 py-1.5 text-center";
  const numCls =
    variant === "dark"
      ? "block text-lg font-bold leading-none text-[#D8B86A] md:text-xl tabular-nums"
      : "block text-lg font-bold leading-none text-[#D8B86A] md:text-xl tabular-nums";
  const labCls =
    variant === "dark"
      ? "mt-1 block text-[9px] font-semibold uppercase tracking-wider text-white/60 md:text-[10px]"
      : "mt-1 block text-[9px] font-semibold uppercase tracking-wider text-white/60 md:text-[10px]";

  const cells: [number, string][] = [
    [parts.days, "Days"],
    [parts.hours, "Hrs"],
    [parts.minutes, "Min"],
    [parts.seconds, "Sec"],
  ];

  return (
    <div
      className="flex items-center justify-center gap-1.5 md:gap-2"
      role="timer"
      aria-label="Time until masterclass begins"
    >
      {cells.map(([value, label], i) => (
        <div key={label} className="flex items-center gap-1.5 md:gap-2">
          <div className={boxCls}>
            <span className={numCls}>{String(value).padStart(2, "0")}</span>
            <span className={labCls}>{label}</span>
          </div>
          {i < cells.length - 1 && (
            <span
              className={`text-lg font-bold leading-none ${
                variant === "dark" ? "text-[#D8B86A]/40" : "text-[#0A0E27]/40"
              }`}
              aria-hidden
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
