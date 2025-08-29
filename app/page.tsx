"use client";

import Link from "next/link";
import Button from "@/components/Button";
import Countdown from "@/components/Countdown";
import { useEffect, useState } from "react";
import {
  TimerStatus,
  createTimer,
  startTimer,
  pauseTimer,
  resetTimer,
  getTimerStatus,
} from "@/lib/timerApi";

const Home = (): React.JSX.Element => {
  const [timerId, setTimerId] = useState<string | null>();
  const [timerStatus, setTimerStatus] = useState<TimerStatus | null>(null);
  const [duration, setDuration] = useState<string>("90");

  const handleInput = (val: string) => {
    setDuration(val);
  };

  const handleCreateTimer = async () => {
    const id = await createTimer(Number(duration));
    setTimerId(id);
    const status = await getTimerStatus(id);
    setTimerStatus(status);
  };

  const handleStartTimer = async () => {
    if (!timerId) return;
    await startTimer(timerId);
    const status = await getTimerStatus(timerId);
    setTimerStatus(status);
  };

  const handlePauseTimer = async () => {
    if (!timerId) return;
    await pauseTimer(timerId);
    const status = await getTimerStatus(timerId);
    setTimerStatus(status);
  };

  const handleResetTimer = async () => {
    if (!timerId) return;
    await resetTimer(timerId);
    const status = await getTimerStatus(timerId);
    setTimerStatus(status);
  };

  useEffect(() => {
    if (!timerId) return;
    const interval = setInterval(async () => {
      const updatedStatus = await getTimerStatus(timerId);
      setTimerStatus(updatedStatus);
    }, 500);
    return () => clearInterval(interval);
  }, [timerId]);

  const timerLink = `/timer/${timerId}`;

  return (
    <div className="flex gap-8">
      <main className="mx-auto gap-8">
        <div className="flex items-center justify-center h-64">
          {!timerId && <p>No timer set</p>}
          {timerStatus && (
            <Countdown
              duration={timerStatus.duration}
              remaining={timerStatus.remaining}
              running={timerStatus.running}
              endsAt={timerStatus.endsAt}
            />
          )}
        </div>

        <div className="flex flex-row gap-4 mb-12">
          <input
            type="text"
            value={duration}
            onChange={(event) => handleInput(event.target.value)}
            className="border border-gray-500 p-2 text-xl rounded-md"
          />
          <Button onClick={handleCreateTimer}>Create new timer</Button>
        </div>

        <div className="flex flex-row gap-4 mb-12">
          <Button onClick={handleStartTimer}>Start timer</Button>
          <Button onClick={handlePauseTimer}>Pause timer</Button>
          <Button onClick={handleResetTimer}>Reset timer</Button>
        </div>

        {timerId && (
          <div className="flex flex-row items-center">
            <input
              type="text"
              readOnly
              className="border border-gray-500 p-2 text-md rounded-md w-150 mr-4"
              value={`http://${location.host}${timerLink}`}
            />
            <Link href={timerLink} target="_blank">
              Visit &gt;&gt;
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
