/*
  # Create RSVP Table for Wedding Website

  ## Description
  This migration creates a table to store wedding RSVP responses from guests.

  ## New Tables
  - `rsvps`
    - `id` (uuid, primary key) - Unique identifier for each RSVP
    - `guest_name` (text) - Full name of the guest
    - `email` (text) - Guest's email address
    - `phone` (text) - Guest's phone number
    - `attending` (boolean) - Whether the guest is attending
    - `guest_count` (integer) - Number of guests attending
    - `dietary_restrictions` (text) - Any dietary restrictions or allergies
    - `message` (text) - Personal message from the guest
    - `created_at` (timestamptz) - Timestamp of when RSVP was submitted

  ## Security
  - Enable RLS on `rsvps` table
  - Add policy for anyone to insert RSVPs (public form)
  - Add policy for authenticated users to read all RSVPs (for couple to view)
*/

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name text NOT NULL,
  email text NOT NULL,
  phone text,
  attending boolean NOT NULL DEFAULT true,
  guest_count integer DEFAULT 1,
  dietary_restrictions text,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon')
     AND NOT EXISTS (
       SELECT 1
       FROM pg_policies
       WHERE schemaname = 'public'
         AND tablename = 'rsvps'
         AND policyname = 'Anyone can submit RSVP'
     ) THEN
    EXECUTE 'CREATE POLICY "Anyone can submit RSVP" ON rsvps FOR INSERT TO anon WITH CHECK (true)';
  END IF;

  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated')
     AND NOT EXISTS (
       SELECT 1
       FROM pg_policies
       WHERE schemaname = 'public'
         AND tablename = 'rsvps'
         AND policyname = 'Authenticated users can view all RSVPs'
     ) THEN
    EXECUTE 'CREATE POLICY "Authenticated users can view all RSVPs" ON rsvps FOR SELECT TO authenticated USING (true)';
  END IF;
END $$;