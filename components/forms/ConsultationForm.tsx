'use client';

import { useState, type FormEvent } from 'react';
import { submitConsultation } from '@/app/actions/submitConsultation';

export default function ConsultationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    startupIdea: '',
  });
  const [honeypot, setHoneypot] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Honeypot spam check
    if (honeypot) {
      // Bot detected — silently pretend success
      setSubmitted(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitConsultation(formData);

      if (result.success) {
        setSubmitted(true);
        setFormData({ fullName: '', email: '', phone: '', startupIdea: '' });
      } else {
        setError(result.error || 'Failed to submit form');
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center mx-auto mb-5">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M26 11L13 24L6 17" />
          </svg>
        </div>
        <h3 className="font-heading font-bold text-xl mb-3 text-[var(--color-text-primary)]">
          Thank You for Reaching Out
        </h3>
        <p className="text-[var(--color-text-secondary)] leading-relaxed max-w-[400px] mx-auto">
          Thank you for reaching out to Larsva. We have received your startup idea and will contact you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100">
          {error}
        </div>
      )}

      {/* Honeypot field — hidden from users, visible to bots */}
      <div className="absolute opacity-0 h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="fullName" className="block font-display font-semibold text-sm mb-2 text-[var(--color-text-primary)]">
          Full Name <span className="text-red-400">*</span>
        </label>
        <input
          id="fullName"
          type="text"
          required
          placeholder="Your full name"
          className="form-input"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="email" className="block font-display font-semibold text-sm mb-2 text-[var(--color-text-primary)]">
          Email Address <span className="text-red-400">*</span>
        </label>
        <input
          id="email"
          type="email"
          required
          placeholder="you@example.com"
          className="form-input"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="phone" className="block font-display font-semibold text-sm mb-2 text-[var(--color-text-primary)]">
          Phone Number <span className="text-red-400">*</span>
        </label>
        <input
          id="phone"
          type="tel"
          required
          placeholder="+91 98765 43210"
          className="form-input"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="startupIdea" className="block font-display font-semibold text-sm mb-2 text-[var(--color-text-primary)]">
          Startup Idea Description <span className="text-red-400">*</span>
        </label>
        <textarea
          id="startupIdea"
          required
          placeholder="Describe your startup idea in 3-5 sentences. What problem does it solve? Who is the target audience?"
          className="form-input"
          rows={5}
          value={formData.startupIdea}
          onChange={(e) => setFormData({ ...formData, startupIdea: e.target.value })}
          disabled={isSubmitting}
        />
        <p className="mt-1.5 text-xs text-[var(--color-text-muted)]">
          Minimum 3-5 sentences. Your idea is kept confidential.
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full justify-center text-lg py-4 mt-2 disabled:opacity-70 rounded-xl"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </>
        ) : (
          <>
            Request Founder Consultation
            <svg className="btn-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
