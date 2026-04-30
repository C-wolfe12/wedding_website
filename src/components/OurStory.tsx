'use client';

import Image from 'next/image';
import { Heart, Home, Sparkles } from 'lucide-react';
import { OUR_STORY_MOMENTS } from '@/src/constants/wedding';

function getStoryIcon(iconName: string) {
  if (iconName === 'heart') {
    return Heart;
  }

  if (iconName === 'home') {
    return Home;
  }

  return Sparkles;
}

export default function OurStory() {
  return (
    <section id="story" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-5xl md:text-6xl font-bold text-center text-cornflower mb-4">
          Our Story
        </h2>
        <p className="text-center text-gray-600 mb-16 text-lg">The journey that led us here</p>

        <div className="mx-auto flex max-w-6xl flex-col gap-12">
          {OUR_STORY_MOMENTS.map((moment) => {
            const Icon = getStoryIcon(moment.icon);

            return (
              <div
                key={moment.title}
                className="grid items-center gap-8 md:grid-cols-2"
              >
                {moment.imageLeft && (
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl">
                    <Image
                      src={moment.image}
                      alt={moment.alt}
                      fill
                      quality={92}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="group relative w-full rounded-[2rem] bg-gradient-to-br from-cornflower-light to-white p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl md:p-10">
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 transform">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-russet text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-8 w-8" />
                    </div>
                  </div>
                  <div className="mt-8">
                    <div className="mb-3 font-playfair text-4xl font-bold text-cornflower">{moment.year}</div>
                    <h3 className="mb-4 font-playfair text-2xl font-bold text-gray-800">{moment.title}</h3>
                    <p className="leading-relaxed text-gray-600">{moment.description}</p>
                  </div>
                </div>

                {!moment.imageLeft && (
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl">
                    <Image
                      src={moment.image}
                      alt={moment.alt}
                      fill
                      quality={92}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
