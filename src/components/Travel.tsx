'use client';

import Image from 'next/image';
import { Plane, Hotel } from 'lucide-react';
import { TRAVEL_HOTELS } from '@/src/constants/wedding';

export default function Travel() {
  return (
    <section id="travel" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-5xl md:text-6xl font-bold text-center text-cornflower mb-4">
          Travel & Accommodations
        </h2>
        <p className="text-center text-gray-600 mb-16 text-lg">Everything you need to plan your stay</p>

        <div className="mx-auto grid max-w-7xl items-start gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)_minmax(0,0.8fr)]">
          <div className="relative h-80 overflow-hidden rounded-[2rem] shadow-2xl lg:sticky lg:top-28 lg:h-[34rem]">
            <Image
              src="/LEM00063.jpg"
              alt="Getting There"
              fill
              quality={92}
              sizes="(min-width: 1024px) 24vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="space-y-8 text-center">
            <div className="bg-gradient-to-br from-cornflower-light to-white rounded-2xl shadow-xl p-8">
              <div className="mb-6 flex items-center justify-center space-x-3">
                <div className="bg-cornflower text-white p-3 rounded-full">
                  <Plane className="w-6 h-6" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-gray-800">Getting There</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Nearest Airports</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-cornflower mr-2">•</span>
                      <span><strong>Norman Manley International Airport</strong> - 105 km (2h 20 min drive)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cornflower mr-2">•</span>
                      <span><strong>Sangster International Airport</strong> - 104 km (1h 45min drive)</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Transportation</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Guests may choose to rent a car at the airport for added flexibility. For reliable transportation throughout your stay—including airport transfers, hotel pick-up and drop-off, excursions, and wedding day travel—we also recommend <strong>George White Tour Agency</strong>, who offer dependable and comfortable service from arrival to departure. Contact them at <strong>(876) 278-6608</strong>.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cornflower-light to-russet-light rounded-2xl shadow-xl p-8">
              <div className="mb-6 flex items-center justify-center space-x-3">
                <div className="bg-cornflower text-white p-3 rounded-full">
                  <Hotel className="w-6 h-6" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-gray-800">Recommended Hotels</h3>
              </div>
              <p className="text-gray-600 mb-6">
                We recommend the following hotels based on personal experiences and their close proximity to the wedding venue in St. Mary.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {TRAVEL_HOTELS.map((hotel) => (
                  <div key={hotel.name} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300">
                    <h4 className="font-playfair text-lg font-bold text-gray-800 mb-2">{hotel.name}</h4>
                    <p className="text-sm text-russet font-semibold mb-2">{hotel.distance}</p>
                    <p className="text-gray-600 text-sm mb-4">{hotel.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative h-80 overflow-hidden rounded-[2rem] shadow-2xl lg:sticky lg:top-28 lg:h-[34rem]">
            <Image
              src="/LEM00027.jpg"
              alt="Wedding travel and accommodations"
              fill
              quality={92}
              sizes="(min-width: 1024px) 24vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
