'use client';

import Image from 'next/image';
import { Clock, MapPin, Shirt, Info } from 'lucide-react';
import { EVENT_DETAILS_CONFIG } from '@/src/constants/wedding';

export default function EventDetails() {
  return (
    <section id="details" className="py-20 bg-gradient-to-br from-cornflower-light via-white to-russet-light">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-5xl md:text-6xl font-bold text-center text-cornflower mb-4">
          Event Details
        </h2>
        <p className="text-center text-gray-600 mb-16 text-lg">Everything you need to know</p>

        <div className="mx-auto grid max-w-7xl items-start gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.5fr)_minmax(0,0.85fr)]">
          <div className="relative h-80 overflow-hidden rounded-[2rem] shadow-2xl lg:sticky lg:top-28 lg:h-[34rem]">
            <Image
              src={EVENT_DETAILS_CONFIG.CEREMONY_IMAGE}
              alt="Ceremony"
              fill
              quality={92}
              sizes="(min-width: 1024px) 26vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="mx-auto w-full max-w-3xl space-y-8 text-center">
            <div className="rounded-[2rem] bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl md:p-10">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-cornflower text-white">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-playfair text-3xl font-bold text-gray-800">{EVENT_DETAILS_CONFIG.CEREMONY.title}</h3>
              <p className="mb-6 text-gray-600">{EVENT_DETAILS_CONFIG.CEREMONY.time}</p>
              <div className="mx-auto mb-6 max-w-md rounded-2xl bg-cornflower-light p-5">
                <div className="mb-2 flex items-center justify-center gap-3">
                  <MapPin className="h-5 w-5 text-cornflower" />
                  <h4 className="font-playfair text-xl font-bold text-gray-800">{EVENT_DETAILS_CONFIG.CEREMONY.venueArea}</h4>
                </div>
                <p className="text-gray-600">{EVENT_DETAILS_CONFIG.CEREMONY.venueName}</p>
              </div>
              <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-600 md:text-base">
                {EVENT_DETAILS_CONFIG.CEREMONY.description}
              </p>
            </div>

            <div className="rounded-[2rem] bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl md:p-10">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-russet text-white">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-playfair text-3xl font-bold text-gray-800">{EVENT_DETAILS_CONFIG.RECEPTION.title}</h3>
              <p className="mb-6 text-gray-600">{EVENT_DETAILS_CONFIG.RECEPTION.time}</p>
              <div className="mx-auto mb-6 max-w-md rounded-2xl bg-russet-light p-5">
                <div className="mb-2 flex items-center justify-center gap-3">
                  <MapPin className="h-5 w-5 text-russet" />
                  <h4 className="font-playfair text-xl font-bold text-gray-800">{EVENT_DETAILS_CONFIG.RECEPTION.venueArea}</h4>
                </div>
                <p className="text-gray-600">{EVENT_DETAILS_CONFIG.RECEPTION.venueName}</p>
              </div>
              <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-600 md:text-base">
                {EVENT_DETAILS_CONFIG.RECEPTION.description}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 text-left">
              <div className="rounded-[2rem] bg-white p-8 shadow-xl">
                <div className="mb-4 flex items-center justify-center gap-3 md:justify-start">
                  <Shirt className="h-8 w-8 text-cornflower" />
                  <h3 className="font-playfair text-2xl font-bold text-gray-800">{EVENT_DETAILS_CONFIG.DRESS_CODE.title}</h3>
                </div>
                <p className="mb-3 text-gray-600">
                  <strong>{EVENT_DETAILS_CONFIG.DRESS_CODE.label}</strong>
                </p>
                <p className="text-sm leading-relaxed text-gray-600">
                  {EVENT_DETAILS_CONFIG.DRESS_CODE.description}
                </p>
              </div>

              <div className="rounded-[2rem] bg-white p-8 shadow-xl">
                <div className="mb-4 flex items-center justify-center gap-3 md:justify-start">
                  <Info className="h-8 w-8 text-russet" />
                  <h3 className="font-playfair text-2xl font-bold text-gray-800">{EVENT_DETAILS_CONFIG.IMPORTANT_NOTES.title}</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  {EVENT_DETAILS_CONFIG.IMPORTANT_NOTES.items.map((item) => (
                    <li key={item} className="flex items-start">
                      <span className="mr-2 text-russet">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="relative h-80 overflow-hidden rounded-[2rem] shadow-2xl lg:sticky lg:top-28 lg:h-[34rem]">
            <Image
              src={EVENT_DETAILS_CONFIG.RECEPTION_IMAGE}
              alt="Reception"
              fill
              quality={92}
              sizes="(min-width: 1024px) 26vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
