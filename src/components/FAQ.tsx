'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { HelpCircle, ChevronDown, Phone, Users, X } from 'lucide-react';
import { FAQ_ITEMS, WEDDING_PARTY_CONTACTS } from '@/src/constants/wedding';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    if (!isContactModalOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setIsContactModalOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isContactModalOpen]);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-cornflower-light via-white to-russet-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <HelpCircle className="w-16 h-16 mx-auto mb-4 text-cornflower" />
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-cornflower mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg">Everything you need to know about our special day</p>
        </div>

        <div className="mx-auto grid max-w-7xl items-start gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)_minmax(0,0.8fr)]">
          <div className="relative h-80 overflow-hidden rounded-[2rem] shadow-2xl lg:sticky lg:top-28 lg:h-[34rem]">
            <Image
              src="/LEM00081.jpg"
              alt="Frequently Asked Questions"
              fill
              quality={92}
              sizes="(min-width: 1024px) 24vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-gray-50"
                >
                  <span className="pr-4 text-lg font-semibold text-gray-800">{faq.question}</span>
                  <ChevronDown
                    className={`h-6 w-6 flex-shrink-0 text-cornflower transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-5 leading-relaxed text-gray-600">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="relative h-80 overflow-hidden rounded-[2rem] shadow-2xl lg:sticky lg:top-28 lg:h-[34rem]">
            <Image
              src="/LEM00037.jpg"
              alt="Hugeoleen and Carl enjoying time together"
              fill
              quality={92}
              sizes="(min-width: 1024px) 24vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="mb-4 text-gray-600">Still have questions?</p>
          <button
            type="button"
            onClick={() => setIsContactModalOpen(true)}
            className="inline-flex items-center gap-2 font-semibold text-cornflower underline transition-colors hover:text-cornflower-dark"
          >
            <Users className="h-5 w-5" />
            Contact Us
          </button>
        </div>

        {isContactModalOpen && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/55 px-4 py-8"
            onClick={() => setIsContactModalOpen(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-modal-title"
              className="relative w-full max-w-2xl rounded-[2rem] bg-white p-8 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsContactModalOpen(false)}
                className="absolute right-5 top-5 rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200"
                aria-label="Close contact modal"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mb-8 text-center">
                <Phone className="mx-auto mb-4 h-12 w-12 text-russet" />
                <h3 id="contact-modal-title" className="font-playfair text-3xl font-bold text-cornflower">
                  Wedding Party Contacts
                </h3>
                <p className="mt-3 text-gray-600">
                  Reach out to our best man or maid of honor if you need help on the wedding day.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {WEDDING_PARTY_CONTACTS.map((contact) => (
                  <div key={contact.role} className="rounded-2xl bg-gradient-to-br from-cornflower-light to-white p-6 text-center shadow-lg">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-russet">{contact.role}</p>
                    <h4 className="mt-3 font-playfair text-2xl font-bold text-gray-800">{contact.name}</h4>
                    <a href={`tel:${contact.phone}`} className="mt-4 inline-block text-lg font-semibold text-cornflower hover:text-cornflower-dark">
                      {contact.phone}
                    </a>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center text-sm text-gray-500">
                
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
