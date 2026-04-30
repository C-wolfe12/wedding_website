import type { RSVPFormData } from '@/src/types';

const VILLA_VIENTO_LOCATION = 'Tower Isles, St. Mary, Jamaica';
const BEACH_FORMAL_DESCRIPTION =
  'Our celebration is a beachside formal event in soft pastel tones. We kindly ask guests to dress elegantly in colours that complement the setting while avoiding black, white, light blues, beige, and champagne tones for both ladies and gentlemen, as we want to ensure these shades remain reserved for the bridal party and overall wedding aesthetic.';

// Wedding event details
export const WEDDING_CONFIG = {
  COUPLE_NAMES: {
    FIRST: 'Hugeoleen',
    SECOND: 'Carl',
  },
  DATE: '2027-01-07T00:00:00',
  LOCATION: 'Villa Viento',
  DISPLAY_DATE: 'January 7th, 2027',
} as const;

// Navigation items
export const NAV_ITEMS = [
  { name: 'Home', href: '#home' },
  { name: 'Our Story', href: '#story' },
  { name: 'Details', href: '#details' },
  { name: 'Directions', href: '#directions' },
  { name: 'RSVP', href: '#rsvp' },
  { name: 'Registry', href: '#registry' },
  { name: 'Travel', href: '#travel' },
  { name: 'FAQ', href: '#faq' },
] as const;

// Hero section
export const HERO_CONFIG = {
  BACKGROUND_IMAGE: '/LEM00118.jpg',
  OVERLAY_OPACITY: 'bg-gradient-to-b from-black/35 via-black/15 to-black/45',
} as const;

export const EVENT_DETAILS_CONFIG = {
  CEREMONY_IMAGE: '/LEM00009.jpg',
  RECEPTION_IMAGE: '/LEM00064.jpg',
  CEREMONY: {
    title: 'Ceremony',
    time: '3:00 PM - 4:00 PM',
    venueArea: 'Villa Viento',
    venueName: VILLA_VIENTO_LOCATION,
    description:
      'Please arrive at least 20 to 30 minutes early so everyone can be seated before the processional begins. Venue access, parking, and turn-by-turn directions are outlined in the directions section below.',
  },
  RECEPTION: {
    title: 'Reception',
    time: '6:00 PM - 11:00 PM',
    venueArea: 'Villa Viento',
    venueName: VILLA_VIENTO_LOCATION,
    description:
      'Cocktail hour begins at 4:00 PM, dinner service follows at 7:00 PM, and then we dance the night away.',
  },
  DRESS_CODE: {
    title: 'Dress Code',
    label: 'Beach Formal in Pastels',
    description: BEACH_FORMAL_DESCRIPTION,
  },
  IMPORTANT_NOTES: {
    title: 'Important Notes',
    items: [
      'Adult-only celebration',
      'Unplugged ceremony - please keep phones tucked away during the vows. You can capture all the photos you want during the reception!',
      'Dinner and full bar provided',
      'Hotel and transportation options are listed in Travel & Accommodations if needed.',
    ],
  },
} as const;

export const DIRECTIONS_CONFIG = {
  SECTION_TITLE: 'Directions',
  SECTION_DESCRIPTION:
    'Use the map below to find the venue before you head out.',
  MAP_TITLE: 'Venue Map',
  ADDRESS_LINE_1: 'The Rocks Restaurant and Bar',
  ADDRESS_LINE_2: 'Villa Viento, St. Mary, Jamaica',
  GPS: '18.422226997375088, -77.04641418394563',
  MAP_EMBED_URL:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1125.392493025839!2d-77.04641418394563!3d18.422226997375088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8edafd702405c2bf%3A0x666c3923533b85ba!2sThe%20rocks%20restaurant%20and%20bar!5e0!3m2!1sen!2sjm!4v1776623447442!5m2!1sen!2sjm',
  MAPS_URL:
    'https://www.google.com/maps/search/?api=1&query=The%20Rocks%20Restaurant%20and%20Bar%20Ocho%20Rios%20Jamaica',
  PARKING: {
    title: 'Parking',
    description:
      'Free secure parking will be available at Villa Viento.',
    arrivalWindowTitle: 'Arrival Window',
    arrivalWindowDescription:
      'Aim to arrive between 2:00 PM and 2:15 PM so parking, photos and check-in are handled before the ceremony begins.',
  },
  DIRECTIONS_CARD: {
    title: 'Directions',
    addressLabel: 'Address:',
    gpsLabel: 'GPS:',
    rideshareDescription:
      'It is recommended to travel to Ocho Rios, St. Ann then head to the venue from there.',
    buttonLabel: 'Open in Google Maps',
  },
} as const;

export const WEDDING_PARTY_CONTACTS = [
  {
    role: 'Best Man',
    name: 'Steven Hill',
    phone: '(876) 413-9125',
  },
  {
    role: 'Maid of Honor',
    name: 'Kleone Thompson',
    phone: '(876) 842-8908',
  },
] as const;

// Countdown timer labels
export const COUNTDOWN_LABELS = ['Days', 'Hours', 'Minutes', 'Seconds'] as const;

// RSVP form fields configuration
export const RSVP_FORM_FIELDS = {
  GUEST_NAME: {
    id: 'guest_name',
    label: 'Full Name',
    placeholder: 'John Doe',
    required: true,
  },
  EMAIL: {
    id: 'email',
    label: 'Email Address',
    placeholder: 'john@example.com',
    required: true,
    type: 'email',
  },
  PHONE: {
    id: 'phone',
    label: 'Phone Number',
    placeholder: '(123) 456-7890',
    required: false,
    type: 'tel',
  },
  DIETARY_RESTRICTIONS: {
    id: 'dietary_restrictions',
    label: 'Dietary Restrictions (if any)',
    placeholder: 'e.g., Vegetarian, Gluten-free',
    required: false,
  },
  MESSAGE: {
    id: 'message',
    label: 'Additional Message',
    placeholder: 'Share your thoughts...',
    required: false,
  },
} as const;

export const INITIAL_RSVP_FORM_STATE: RSVPFormData = {
  guest_name: '',
  email: '',
  phone: null,
  attending: true,
  dietary_restrictions: null,
  message: null,
};

export const RSVP_SUCCESS_DISPLAY_TIME = 5000;

export const OUR_STORY_MOMENTS = [
  {
    year: '2021',
    title: 'First Date',
    description:
      'For our first date, we went to Cru Bar & Restaurant. What was supposed to be a simple plan turned into a bit of playful back-and-forth—Hugeoleen wasn’t interested in ice cream, so she suggested Cru instead. The date lasted much longer than expected, and we ended the night driving along Gordon Town Road up to look out point. Looking out over the city together, somewhere in that quiet moment, we both knew this was the beginning of something real, and we decided to start our relationship.',
    image: '/LEM00090.jpg',
    alt: 'Hugeoleen and Carl during the early days of their relationship',
    imageLeft: true,
    icon: 'heart',
  },
  {
    year: '2025',
    title: 'Moving In Together',
    description:
      'We spent a year apart while Hugeoleen was in St. Ann working as a pastry chef at Sandals and later as a high school teacher, while Carl continued working as a software engineer in Kingston. Long distance was not easy for either of us, but it gave us clarity about what we truly wanted. When her contract ended, Carl asked Hugeoleen to move in with him, and from there we began building our life side by side.',
    image: '/LEM00136.jpg',
    alt: 'Hugeoleen and Carl sharing a quiet moment together',
    imageLeft: false,
    icon: 'home',
  },
  {
    year: '2026',
    title: 'The Proposal',
    description:
      'The proposal came with a little planning and a clever twist. Since Hugeoleen works at the Jamaica Pegasus Hotel, Carl asked her permission to take some pictures on the rooftop—something that felt simple and unsuspecting in the moment. Once together at the top of the 17-story building, the New Year’s Eve fireworks began lighting up the sky. In that moment, overlooking the city, Carl got down on one knee—and together, we said yes to forever.',
    image: '/LEM00041.jpg',
    alt: 'Hugeoleen and Carl celebrating their engagement',
    imageLeft: true,
    icon: 'sparkles',
  },
] as const;

export const REGISTRY_BANK_DETAILS = {
  firstName: 'CARL WOLFE',
  lastName: 'OR HUGEOLEEN WHITE',
  bankName: 'Scotiabank',
  accountType: 'SAVINGS',
  accountNumber: '50575 000987129',
  currency: 'JMD',
} as const;

export const REGISTRY_CONFIG = {
  WISHLIST_URL: 'https://www.amazon.com/wedding/guest-view/CXOY1UCDJOCP',
} as const;

export const TRAVEL_HOTELS = [
  {
    name: 'Moon Palace Jamaica (Ocho Rios)',
    distance: '7.4 km from venue',
    description: 'A large beachfront all-inclusive resort offering modern rooms, multiple dining options, and plenty of entertainment. It’s ideal for guests who want comfort and everything in one place.',
  },
  {
    name: 'Riu Ocho Rios',
    distance: '15 km from venue',
    description: 'A lively beachfront all-inclusive resort with a wide range of dining, pools, and entertainment. It’s a great option for guests looking for a fun and relaxed stay.',
  },
  {
    name: 'Sandals Ochi Beach Resort',
    distance: '4.8 km from venue',
    description: 'An adults-only all-inclusive resort offering both vibrant social areas and quieter romantic spaces. It’s perfect for couples or guests wanting a more upscale, relaxed experience.',
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: 'What should I wear?',
    answer: BEACH_FORMAL_DESCRIPTION,
  },
  {
    question: 'Can I bring a plus one?',
    answer:
      'We kindly ask that guests do not bring additional plus ones unless they are specifically named on the invitation. Each guest, including spouses, will receive their own individual invitation. If you have been allocated a plus one, this will be clearly indicated on your invitation. We truly appreciate your understanding as we celebrate with our closest family and friends.',
  },
  {
    question: 'Are children welcome?',
    answer:
      'While we absolutely adore your little ones, this will be an adults only celebration. We have curated an elegant evening and as the night unfolds it will become a bit more uncensored, and we hope it gives you the opportunity to relax and fully enjoy the festivities with us.',
  },
  {
    question: 'Will there be food and drinks?',
    answer:
      'Yes, a full menu will be provided with vegan and pescatarian options available. Guests can also look forward to a light starter during cocktails, along with a full open bar throughout the evening.',
  },
  {
    question: 'When is the RSVP deadline?',
    answer:
      'Please RSVP by August 31st, 2026. This gives us enough time to finalize catering numbers and seating arrangements. We appreciate your prompt response!',
  },
  {
    question: 'Is there parking available at the venue?',
    answer:
      'Yes! Villa Viento offers free secure parking for all wedding guests.',
  },
  {
    question: 'What time should I arrive?',
    answer:
      'We recommend arriving between 2:00 PM and 2:15 PM to allow time for parking, photos, and check-in before the ceremony begins at 3:00 PM. There will be plenty of beautiful photo opportunities throughout the property in natural daylight that we would love for you to enjoy and not miss.',
  },
  {
    question: 'Can I take photos during the ceremony?',
    answer:
      'We are having an unplugged ceremony, which means we kindly ask that you put away phones and cameras during the ceremony. Our professional photographer will capture all the special moments, and we will share them with you afterward. Feel free to take as many photos as you like during the reception!',
  },
  {
    question: 'What if I have dietary restrictions?',
    answer:
      'Please indicate any dietary restrictions or allergies in the RSVP form. Our caterer will work with us to ensure everyone has delicious meal options that meet their needs.',
  },
] as const;
