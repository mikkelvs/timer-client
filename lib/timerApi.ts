export interface TimerStatus {
  id: string;
  duration: number;
  remaining: number;
  running: boolean;
  endsAt: string;
}

export const createTimer = async (duration: number): Promise<string> => {
  const res = await fetch("http://localhost:3000/timers", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      duration,
    }),
  });

  const data = await res.json();
  return data.id;
};

export const startTimer = async (id: string) =>
  await fetch(`http://localhost:3000/timers/${id}/start`, {
    method: "POST",
  });

export const pauseTimer = async (id: string) =>
  await fetch(`http://localhost:3000/timers/${id}/pause`, {
    method: "POST",
  });

export const resetTimer = async (id: string) =>
  await fetch(`http://localhost:3000/timers/${id}/reset`, {
    method: "POST",
  });

export const getTimerStatus = async (id: string): Promise<TimerStatus> => {
  const res = await fetch(`http://localhost:3000/timers/${id}/status`);
  return res.json();
};
