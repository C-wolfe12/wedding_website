'use client';

import Image from 'next/image';
import { Heart } from 'lucide-react';
import { useCountdown, useAnimationOnMount } from '@/src/hooks/useCountdown';
import CountdownCard from '@/src/components/CountdownCard';
import { WEDDING_CONFIG, HERO_CONFIG } from '@/src/constants/wedding';
import { scrollToSection } from '@/src/lib/scrollToSection';

/**
 * Hero section component - displays wedding announcement and countdown
 */
export default function Hero(): React.JSX.Element {
  const timeLeft = useCountdown(WEDDING_CONFIG.DATE);
  const isVisible = useAnimationOnMount();

  const countdownItems = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      <Image
        src={HERO_CONFIG.BACKGROUND_IMAGE}
        alt="Hugeoleen and Carl on the beach"
        fill
        priority
        quality={95}
        sizes="100vw"
        className="absolute inset-0 object-cover object-center md:object-[center_32%]"
      />
      <div className={`absolute inset-0 ${HERO_CONFIG.OVERLAY_OPACITY}`} />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/10 to-transparent" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 pb-16 pt-28 md:pt-24">
        <div
          className={`container mx-auto text-center transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/20 bg-white/12 px-6 py-10 shadow-2xl backdrop-blur-sm md:px-12 md:py-14">
            <Heart className="mx-auto mb-6 h-16 w-16 animate-pulse text-russet" />

            <h1 className="mb-4 font-playfair text-5xl font-bold text-white md:text-8xl">
              <span className="block md:inline">{WEDDING_CONFIG.COUPLE_NAMES.FIRST}</span>
              <span className="block leading-none text-russet md:mx-3 md:inline">&</span>
              <span className="block md:inline">{WEDDING_CONFIG.COUPLE_NAMES.SECOND}</span>
            </h1>

            <p className="mb-8 text-xl text-white/90 md:text-3xl"> forever begins here...</p>

            <div className="mb-8 space-y-2">
              <p className="text-xl font-medium text-white md:text-2xl">{WEDDING_CONFIG.DISPLAY_DATE}</p>
              <p className="text-lg text-white/80 md:text-xl">{WEDDING_CONFIG.LOCATION}</p>
            </div>

            <div className="mx-auto mb-8 grid max-w-2xl grid-cols-2 gap-4 md:grid-cols-4">
              {countdownItems.map((item) => (
                <CountdownCard key={item.label} label={item.label} value={item.value} />
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollToSection('#rsvp')}
              className="inline-block rounded-full bg-russet px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-russet-dark hover:shadow-2xl"
            >
              RSVP Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
