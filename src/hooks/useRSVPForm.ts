'use client';

import { useState, FormEvent } from 'react';
import type { RSVPFormData } from '@/src/types';
import { INITIAL_RSVP_FORM_STATE, RSVP_SUCCESS_DISPLAY_TIME } from '@/src/constants/wedding';

interface UseRSVPFormReturn {
  formData: RSVPFormData;
  loading: boolean;
  success: boolean;
  successMessage: string;
  error: string;
  handleChange: (field: keyof RSVPFormData, value: unknown) => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
  resetForm: () => void;
}

/**
 * Custom hook for managing RSVP form state and submission
 */
export const useRSVPForm = (): UseRSVPFormReturn => {
  const [formData, setFormData] = useState<RSVPFormData>(INITIAL_RSVP_FORM_STATE);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (field: keyof RSVPFormData, value: unknown): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = (): void => {
    setFormData(INITIAL_RSVP_FORM_STATE);
    setError('');
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate required fields
      if (!formData.guest_name || !formData.email) {
        throw new Error('Please fill in all required fields');
      }

      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error ?? 'Failed to submit RSVP. Please try again.');
        return;
      }

      const data = (await response.json().catch(() => null)) as { message?: string } | null;

      // Show success message
      setSuccess(true);
      setSuccessMessage(data?.message ?? "Thank you for your RSVP! We're so excited to celebrate with you.");
      resetForm();

      // Auto-hide success message
      setTimeout(() => {
        setSuccess(false);
        setSuccessMessage('');
      }, RSVP_SUCCESS_DISPLAY_TIME);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit RSVP. Please try again.';
      setError(errorMessage);
      console.error('RSVP Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    success,
    successMessage,
    error,
    handleChange,
    handleSubmit,
    resetForm,
  };
};
