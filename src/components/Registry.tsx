'use client';

import Image from 'next/image';
import { Gift, ShoppingBag, Building2, Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { REGISTRY_BANK_DETAILS, REGISTRY_CONFIG } from '@/src/constants/wedding';

export default function Registry() {
  const [copied, setCopied] = useState(false);
  const accountName = [REGISTRY_BANK_DETAILS.firstName, REGISTRY_BANK_DETAILS.lastName]
    .filter(Boolean)
    .join(' ');

  const copyToClipboard = () => {
    const text = `Account Number: ${REGISTRY_BANK_DETAILS.accountNumber}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="registry" className="py-20 bg-gradient-to-br from-russet-light via-white to-cornflower-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Gift className="w-16 h-16 mx-auto mb-4 text-russet" />
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-cornflower mb-4">
            Registry
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, here are some options.
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl items-start gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)_minmax(0,0.8fr)]">
          <div className="relative h-80 overflow-hidden rounded-[2rem] shadow-2xl lg:sticky lg:top-28 lg:h-[34rem]">
            <Image
              src="/LEM00101.jpg"
              alt="Amazon Wish List"
              fill
              quality={92}
              sizes="(min-width: 1024px) 24vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="space-y-8 text-center">
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
              <div className="mb-6 flex items-center justify-center space-x-3">
                <div className="bg-cornflower text-white p-3 rounded-full">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-gray-800">Amazon Wish List</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We’ve put together a simple registry for your convenience, featuring a few select items and gift options.
              </p>
              <a
                href={REGISTRY_CONFIG.WISHLIST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full bg-cornflower text-white px-6 py-3 rounded-lg font-semibold hover:bg-cornflower-dark transition-all duration-300 shadow-md hover:shadow-lg"
              >
                View Wish List
              </a>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
              <div className="mb-6 flex items-center justify-center space-x-3">
                <div className="bg-russet text-white p-3 rounded-full">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-gray-800">Monetary Gift</h3>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                If you prefer to give a monetary gift, you can transfer directly to our account. Feel free to reach out for USD options.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-semibold text-gray-800">{accountName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bank:</span>
                  <span className="font-semibold text-gray-800">{REGISTRY_BANK_DETAILS.bankName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-semibold text-gray-800">{REGISTRY_BANK_DETAILS.accountType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account:</span>
                  <span className="font-semibold text-gray-800">{REGISTRY_BANK_DETAILS.accountNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Currency:</span>
                  <span className="font-semibold text-gray-800">{REGISTRY_BANK_DETAILS.currency}</span>
                </div>
              </div>
              <button
                onClick={copyToClipboard}
                className="inline-flex items-center justify-center w-full bg-russet text-white px-6 py-3 rounded-lg font-semibold hover:bg-russet-dark transition-all duration-300 shadow-md hover:shadow-lg space-x-2"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    <span>Copy Account Number</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="relative h-80 overflow-hidden rounded-[2rem] shadow-2xl lg:sticky lg:top-28 lg:h-[34rem]">
            <Image
              src="/LEM00077.jpg"
              alt="Monetary Gift"
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
