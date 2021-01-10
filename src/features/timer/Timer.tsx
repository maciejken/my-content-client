import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectAuthExpires, setAuthExpires, setAuthSeconds } from '../auth/authSlice';

interface TimeLeft {
  seconds: number;
  timer: string;
}

function calculateTimeLeft(authExpires?: number): TimeLeft {
  let value = { seconds: 0, timer: '0:00' };
  if (authExpires) {
    const seconds = Math.floor((authExpires - Date.now())/1000);
    if (seconds > 0) {
      value.seconds = seconds;
      const secs = seconds % 60;
      const mins = (seconds - secs)/60;
      const zeroPaddedSecs = String(secs).padStart(2, '0');
      value.timer = `${mins} : ${zeroPaddedSecs}`;
    }
  }
  return value;
}

export default function Timer() {
  const authExpires = useSelector(selectAuthExpires);
  const dispatch = useDispatch();
  const [timer, setTimer] = useState('0:00');

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (authExpires) {
      let timeLeft = calculateTimeLeft(authExpires);
      setTimer(timeLeft.timer);
      interval = setInterval(() => {
        timeLeft = calculateTimeLeft(authExpires);
        if (timeLeft.seconds === 0) {
          dispatch(setAuthExpires(0));
          clearInterval(interval); 
        }
        setTimer(timeLeft.timer);
        dispatch(setAuthSeconds(timeLeft.seconds));
      }, 1000);    
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    }
  }, [authExpires, dispatch]);

  return <span>{timer}</span>;
}
