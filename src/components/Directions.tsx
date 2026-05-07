'use client';

import { CarFront, Clock3, MapPin, Navigation } from 'lucide-react';
import { DIRECTIONS_CONFIG } from '@/src/constants/wedding';

export default function Directions(): React.JSX.Element {
  const venueAddress = [DIRECTIONS_CONFIG.ADDRESS_LINE_1, DIRECTIONS_CONFIG.ADDRESS_LINE_2]
    .filter(Boolean)
    .join(', ');

  return (
    <section id="directions" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <MapPin className="mx-auto mb-4 h-16 w-16 text-russet" />
          <h2 className="mb-4 font-playfair text-5xl font-bold text-cornflower md:text-6xl">
            {DIRECTIONS_CONFIG.SECTION_TITLE}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            {DIRECTIONS_CONFIG.SECTION_DESCRIPTION}
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]">
          <div className="overflow-hidden rounded-[2rem] border border-cornflower/10 bg-white shadow-2xl">
            <div className="border-b border-gray-100 px-6 py-5">
              <h3 className="font-playfair text-2xl font-bold text-gray-800">{DIRECTIONS_CONFIG.MAP_TITLE}</h3>
              <p className="mt-2 text-gray-600">
                {venueAddress}
              </p>
            </div>
            <iframe
              title="Map to Villa Viento"
              src={DIRECTIONS_CONFIG.MAP_EMBED_URL}
              className="h-[28rem] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] bg-gradient-to-br from-russet-light to-white p-8 shadow-xl">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-full bg-russet p-3 text-white">
                  <CarFront className="h-6 w-6" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-gray-800">{DIRECTIONS_CONFIG.PARKING.title}</h3>
              </div>
              <p className="mb-4 leading-relaxed text-gray-600">
                {DIRECTIONS_CONFIG.PARKING.description}
              </p>
              <div className="rounded-2xl bg-white p-5">
                <div className="mb-3 flex items-center gap-3">
                  <Clock3 className="h-5 w-5 text-russet" />
                  <p className="font-semibold text-gray-800">{DIRECTIONS_CONFIG.PARKING.arrivalWindowTitle}</p>
                </div>
                <p className="text-sm leading-relaxed text-gray-600">
                  {DIRECTIONS_CONFIG.PARKING.arrivalWindowDescription}
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] bg-gradient-to-br from-cornflower-light to-white p-8 shadow-xl">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-full bg-cornflower p-3 text-white">
                  <Navigation className="h-6 w-6" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-gray-800">{DIRECTIONS_CONFIG.DIRECTIONS_CARD.title}</h3>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong className="text-gray-800">{DIRECTIONS_CONFIG.DIRECTIONS_CARD.addressLabel}</strong> {venueAddress}
                </p>
                <p>
                  <strong className="text-gray-800">{DIRECTIONS_CONFIG.DIRECTIONS_CARD.gpsLabel}</strong> {DIRECTIONS_CONFIG.GPS}
                </p>
                <p className="text-sm leading-relaxed">
                  {DIRECTIONS_CONFIG.DIRECTIONS_CARD.rideshareDescription}
                </p>
              </div>
              <a
                href={DIRECTIONS_CONFIG.MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-cornflower px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-cornflower-dark"
              >
                {DIRECTIONS_CONFIG.DIRECTIONS_CARD.buttonLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}