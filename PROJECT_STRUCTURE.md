# Project Structure & Refactoring Guide

## Overview
This wedding website has been refactored to follow industry-standard practices for React/Next.js applications with improved code organization, type safety, and maintainability.

## Directory Structure

```
src/
├── components/          # React components
│   ├── Hero.tsx        # Wedding announcement with countdown
│   ├── Navigation.tsx   # Navigation bar with mobile menu
│   ├── RSVP.tsx        # RSVP form component
│   ├── CountdownCard.tsx # Reusable countdown card
│   ├── OurStory.tsx     # Couple's story section
│   ├── EventDetails.tsx # Event information
│   ├── Registry.tsx     # Gift registry section
│   ├── Travel.tsx       # Travel information
│   ├── FAQ.tsx          # Frequently asked questions
│   └── Footer.tsx       # Site footer
├── hooks/              # Custom React hooks
│   ├── useCountdown.ts  # Countdown timer logic
│   └── useRSVPForm.ts   # RSVP form state management
├── lib/                # Utilities and configurations
│   └── supabase.ts     # Supabase client initialization
├── constants/          # Application constants
│   └── wedding.ts      # Wedding configuration & form fields
├── types/              # TypeScript interfaces
│   └── index.ts        # Shared type definitions
└── index.css          # Global styles

app/
├── layout.tsx          # Root layout with metadata
└── page.tsx            # Homepage
```

## Key Improvements

### 1. **Separation of Concerns**
- **Components**: Focused on UI rendering
- **Hooks**: Encapsulate business logic and state management
- **Constants**: Centralized configuration data
- **Types**: Shared TypeScript interfaces

### 2. **Custom Hooks**
- `useCountdown()`: Manages wedding countdown timer
- `useAnimationOnMount()`: Handles fade-in animations
- `useRSVPForm()`: Manages RSVP form state and submission

### 3. **Type Safety**
- Full TypeScript interfaces for form data, UI elements, and hooks
- Proper return types on all components and functions
- Type-safe configuration constants

### 4. **Constants & Configuration**
Located in `src/constants/wedding.ts`:
- Wedding event details (dates, locations, couple names)
- Navigation items
- Hero section configuration
- RSVP form field definitions

### 5. **Improved Error Handling**
- Better error messages in RSVP form
- Proper error boundaries pattern
- Null-safe property handling

### 6. **Component Organization**
- Extracted reusable `CountdownCard` component
- Simplified parent components
- Clear component responsibilities

## Best Practices Applied

✅ **DRY (Don't Repeat Yourself)**
- Magic strings replaced with constants
- Logic extracted to reusable hooks
- Components focused on rendering

✅ **Single Responsibility Principle**
- Each component has one clear purpose
- Hooks handle specific concerns
- Clear separation between data and presentation

✅ **Type Safety**
- TypeScript interfaces for all data structures
- Explicit return types on functions/components
- Better IDE support and compile-time error detection

✅ **Performance**
- Efficient re-render prevention through proper hook usage
- Memoization-ready structure
- Clean dependency arrays

✅ **Maintainability**
- Centralized configuration for easy updates
- Clear file organization
- Comprehensive type definitions
- JSDoc comments for complex functions

## Common Updates

### Update Wedding Configuration
Edit `src/constants/wedding.ts` to modify:
- Couple names
- Wedding date
- Location
- Hero background image

### Modify Navigation Items
Update `NAV_ITEMS` in `src/constants/wedding.ts`

### Add New Form Fields
1. Add field to `RSVP_FORM_FIELDS` in `src/constants/wedding.ts`
2. Update `RSVPFormData` interface in `src/types/index.ts`
3. Add form input in `src/components/RSVP.tsx`

## Dependencies
- **Next.js 15+**: React framework
- **React 19**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **MySQL**: Backend database
- **Lucide React**: Icon library

## Development
```bash
npm install
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run linter
npm run typecheck # Type checking
```
