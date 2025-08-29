"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  duration: number;
  remaining: number;
  running: boolean;
  endsAt: string;
}

const Countdown = (props: CountdownProps): React.JSX.Element => {
  const { duration, remaining, running, endsAt } = props;

  const [time, setTime] = useState<number>(remaining);

  useEffect(() => {
    // reset timer
    if (remaining === duration) setTime(duration);

    if (!running) return;

    const interval = setInterval(() => {
      if (!endsAt) return;
      const diff = Math.max(
        0,
        Math.ceil((new Date(endsAt).getTime() - Date.now()) / 1000)
      );
      setTime(diff);
    }, 500);

    return () => clearInterval(interval);
  }, [duration, remaining, running, endsAt]);

  // format time for rendering
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="w-50 text-center text-5xl font-bold text-green-800 border-4 border-green-600 bg-green-100 p-4 rounded-md">
      {minutes}:{seconds.toString().padStart(2, "0")}
    </div>
  );
};

export default Countdown;
