import React, { useEffect, useState } from 'react';

const noTimeLeft = '0 : 00';

function getTimeLeft (expires: number): string {
  let timeLeft = noTimeLeft;
  if (expires) {
    const seconds = Math.floor((expires - Date.now()) / 1000);
    if (seconds > 0) {
      const secs = seconds % 60;
      const mins = (seconds - secs) / 60;
      const zeroPaddedSecs = String(secs).padStart(2, '0');
      timeLeft = `${mins} : ${zeroPaddedSecs}`;
    }
  }
  return timeLeft;
}

export interface TimerProps {
  expires: number;
  signOut: () => void;
}

export default function Timer (props: TimerProps) {
  const { expires, signOut } = props;
  const [timer, setTimer] = useState(noTimeLeft);

  useEffect(() => {
    const interval: number | null = null;
    let mounted = true;
    if (expires) {
      let timeLeft = getTimeLeft(expires);
      setTimer(timeLeft);
      const interval = setInterval(() => {
        timeLeft = getTimeLeft(expires);
        if (timeLeft === noTimeLeft) {
          clearInterval(interval);
          signOut();
        }
        mounted && setTimer(timeLeft);
      }, 1000);
    }
    return () => {
      mounted = false;
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [expires, setTimer, signOut]);

  return <span>{timer}</span>;
}
