// Countdown timer state
export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// RSVP form data
export interface RSVPFormData {
  guest_name: string;
  email: string;
  phone: string | null;
  attending: boolean;
  dietary_restrictions: string | null;
  message: string | null;
}

// Navigation item
export interface NavItem {
  name: string;
  href: string;
}

// Countdown item for display
export interface CountdownItem {
  label: string;
  value: number;
}
