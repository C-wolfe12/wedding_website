'use client';

import { CheckCircle, Users, AlertCircle } from 'lucide-react';
import { useRSVPForm } from '@/src/hooks/useRSVPForm';

/**
 * RSVP section component - handles guest RSVPs with API integration
 */
export default function RSVP(): React.JSX.Element {
  const { formData, loading, success, successMessage, error, handleChange, handleSubmit } = useRSVPForm();

  return (
    <section id="rsvp" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Users className="w-16 h-16 mx-auto mb-4 text-cornflower" />
            <h2 className="font-playfair text-5xl md:text-6xl font-bold text-cornflower mb-4">
              RSVP
            </h2>
            <p className="text-gray-600 text-lg">
              To help us plan responsibly and with care, we kindly ask that RSVPs be submitted only once your attendance is fully confirmed. For guests who will be traveling, this means having flights and accommodations secured; for our local guests, it simply means being certain you are able to join us on the day. Deadline for RSVP is August 31st, 2026.
            </p>
          </div>

          {success && (
            <div className="mb-8 bg-green-50 border-2 border-green-500 rounded-lg p-6 flex items-center space-x-3 animate-fade-in">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
              <p className="text-green-700 font-medium">
                {successMessage}
              </p>
            </div>
          )}

          {error && (
            <div className="mb-8 bg-red-50 border-2 border-red-500 rounded-lg p-6 flex items-center space-x-3">
              <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-gradient-to-br from-cornflower-light to-white rounded-2xl shadow-2xl p-8">
            <div className="space-y-6">
              <div>
                <label htmlFor="guest_name" className="block text-gray-700 font-semibold mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="guest_name"
                  required
                  value={formData.guest_name}
                  onChange={(e) => handleChange('guest_name', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-cornflower focus:ring-2 focus:ring-cornflower/20 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-cornflower focus:ring-2 focus:ring-cornflower/20 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone || ''}
                    onChange={(e) => handleChange('phone', e.target.value || null)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-cornflower focus:ring-2 focus:ring-cornflower/20 outline-none transition-all"
                    placeholder="(123) 456-7890"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-3">
                  Will you be attending? *
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="attending"
                      checked={formData.attending === true}
                      onChange={() => handleChange('attending', true)}
                      className="w-5 h-5 text-cornflower focus:ring-cornflower"
                    />
                    <span className="text-gray-700">Joyfully Accept</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="attending"
                      checked={formData.attending === false}
                      onChange={() => handleChange('attending', false)}
                      className="w-5 h-5 text-cornflower focus:ring-cornflower"
                    />
                    <span className="text-gray-700">Regretfully Decline</span>
                  </label>
                </div>
              </div>

              {formData.attending && (
                <div>
                  <label htmlFor="dietary_restrictions" className="block text-gray-700 font-semibold mb-2">
                    Dietary Restrictions or Allergies
                  </label>
                  <input
                    type="text"
                    id="dietary_restrictions"
                    value={formData.dietary_restrictions || ''}
                    onChange={(e) => handleChange('dietary_restrictions', e.target.value || null)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-cornflower focus:ring-2 focus:ring-cornflower/20 outline-none transition-all"
                    placeholder="Vegetarian, fish allergies, etc."
                  />
                </div>
              )}

              <div>
                <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                  Message or questions for the couple (optional)
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message || ''}
                  onChange={(e) => handleChange('message', e.target.value || null)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-cornflower focus:ring-2 focus:ring-cornflower/20 outline-none transition-all resize-none"
                  placeholder="Share your love and wishes or ask any questions you have for us!"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-russet text-white py-4 rounded-lg font-semibold text-lg hover:bg-russet-dark transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Submit RSVP'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
