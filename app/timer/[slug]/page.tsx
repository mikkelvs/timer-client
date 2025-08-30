"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Countdown from "../../../components/Countdown";
import { getTimerStatus, TimerStatus } from "@/lib/timerApi";

const TimerPage = (): React.JSX.Element => {
  const [status, setStatus] = useState<TimerStatus | null>(null);
  const params = useParams<{ slug: string }>();
  const { slug } = params;

  useEffect(() => {
    if (!slug) return;

    const fetchStatus = async () => {
      try {
        const timerStatus = await getTimerStatus(slug);
        setStatus(timerStatus);
      } catch {
        setStatus(null);
      }
    };

    const interval = setInterval(fetchStatus, 500);
    return () => clearInterval(interval);
  }, [slug]);

  return (
    <main className="flex items-center justify-center h-screen">
      {status && (
        <Countdown
          duration={status.duration}
          remaining={status.remaining}
          running={status.running}
          endsAt={status.endsAt}
        ></Countdown>
      )}
    </main>
  );
};

export default TimerPage;
