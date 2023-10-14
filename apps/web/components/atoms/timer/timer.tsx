"use client";

import { useState, useEffect } from "react";
import s from "./timer.module.css";
import { calcCircleDasharray, msToSeconds } from "./utils.timer";

interface TimerProps {
  time?: number;
  countdown?: number;
  onTimeout?: () => void;
}

export default function Timer({
  time = 10_000,
  countdown = 1_000,
  onTimeout,
}: TimerProps) {
  const [remaining, setRemaining] = useState(time);

  useEffect(() => {
    const interval = setInterval(
      () =>
        setRemaining(rem => {
          const res = rem - countdown;
          if (res <= 0) clearInterval(interval);
          return res;
        }),
      countdown
    );

    return () => clearInterval(interval);
  }, [time, countdown]);

  useEffect(() => {
    remaining <= 0 && setTimeout(() => onTimeout?.(), 1_000);
  }, [onTimeout, remaining]);

  return (
    <div className={s.timer}>
      <svg
        className={s.timerSvg}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className={s.timerCircle}>
          <circle className={s.timerTimePathElapsed} cx="50" cy="50" r="45" />
          <path
            id="base-timer-path-remaining"
            stroke-dasharray="283"
            className={s.timerPathRemaining}
            d="
                M 50, 50
                m -45, 0
                a 45,45 0 1,0 90,0
                a 45,45 0 1,0 -90,0
              "
            strokeDasharray={calcCircleDasharray(time, remaining)}
          ></path>
        </g>
      </svg>
      <span className={s.timerLable}>{msToSeconds(remaining)}</span>
    </div>
  );
}
