import { useEffect, useState } from 'react';
import type { CountdownTime } from '@/src/types';

/**
 * Custom hook for calculating and updating countdown timer
 * @param weddingDateString - ISO string of the wedding date
 * @returns Countdown time object with days, hours, minutes, seconds
 */
export const useCountdown = (weddingDateString: string): CountdownTime => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const weddingDate = new Date(weddingDateString);

    const calculateTimeLeft = (): void => {
      const difference = weddingDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately on mount
    calculateTimeLeft();

    // Set up interval to update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [weddingDateString]);

  return timeLeft;
};

/**
 * Custom hook for fade-in animation on component mount
 * @returns Boolean indicating if component is visible
 */
export const useAnimationOnMount = (): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return isVisible;
};
