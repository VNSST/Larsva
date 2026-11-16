'use client';

import { useState, useRef, useEffect, type FormEvent, type ChangeEvent } from 'react';
import { submitConsultation } from '@/app/actions/submitConsultation';
import countryCodes, { type CountryCode } from '@/data/countryCodes';
import { services } from '@/data/services';

// Lets visitors from countries not in the list type their own dialling code.
// 7–15 digits matches the phone check in submitConsultation.
const OTHER_COUNTRY: CountryCode = { code: 'OTHER', name: 'Other country', dialCode: '', flag: '', minDigits: 7, maxDigits: 15 };

const digitRule = (c: CountryCode) =>
  c.minDigits === c.maxDigits ? `${c.maxDigits} digits` : `${c.minDigits}–${c.maxDigits} digits`;
const where = (c: CountryCode) => (c.code === OTHER_COUNTRY.code ? 'Phone numbers' : `Phone numbers in ${c.name}`);

export default function ConsultationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    startupIdea: '',
  });
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(
    countryCodes.find((c) => c.code === 'IN')!
  );
  const [customDial, setCustomDial] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [phoneWarning, setPhoneWarning] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
        setSearchQuery('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close the country list with Escape and return focus to its button.
  useEffect(() => {
    if (!dropdownOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setDropdownOpen(false);
      setSearchQuery('');
      dropdownRef.current?.querySelector('button')?.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [dropdownOpen]);

  // "Get a quote for websites" links arrive with ?service=websites: start the brief for them.
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get('service');
    const service = services.find((s) => s.slug === slug);
    if (service) {
      setFormData((d) => (d.startupIdea ? d : { ...d, startupIdea: `I'd like a quote for: ${service.title}.\n\n` }));
    }
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (dropdownOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [dropdownOpen]);

  const filteredCountries = countryCodes.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.dialCode.includes(searchQuery) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const isOther = selectedCountry.code === OTHER_COUNTRY.code;
  const dialCode = isOther ? (customDial ? `+${customDial}` : '') : selectedCountry.dialCode;

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    // Only allow digits and spaces
    const cleaned = rawValue.replace(/[^\d\s]/g, '');
    const digitsOnly = cleaned.replace(/\s/g, '');

    if (digitsOnly.length > selectedCountry.maxDigits) {
      setPhoneWarning(
        `${where(selectedCountry)} should be ${digitRule(selectedCountry)}. You've entered ${digitsOnly.length} digits.`
      );
      // Don't update — cap the input
      return;
    }

    if (digitsOnly.length > 0 && digitsOnly.length < selectedCountry.minDigits) {
      setPhoneWarning(`${where(selectedCountry)} should be at least ${selectedCountry.minDigits} digits.`);
    } else {
      setPhoneWarning(null);
    }

    setFormData({ ...formData, phone: cleaned });
  };

  const handleCountrySelect = (country: CountryCode) => {
    setSelectedCountry(country);
    setDropdownOpen(false);
    setSearchQuery('');

    // Re-validate current phone against new country rules
    const digitsOnly = formData.phone.replace(/\s/g, '');
    if (digitsOnly.length > country.maxDigits) {
      setPhoneWarning(`${where(country)} should be ${digitRule(country)}. You've entered ${digitsOnly.length} digits.`);
      // Trim phone to max digits
      setFormData({ ...formData, phone: digitsOnly.slice(0, country.maxDigits) });
    } else if (digitsOnly.length > 0 && digitsOnly.length < country.minDigits) {
      setPhoneWarning(`${where(country)} should be at least ${country.minDigits} digits.`);
    } else {
      setPhoneWarning(null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Honeypot spam check
    if (honeypot) {
      setSubmitted(true);
      return;
    }

    // Validate phone digits
    const digitsOnly = formData.phone.replace(/\s/g, '');
    if (digitsOnly.length < selectedCountry.minDigits) {
      setPhoneWarning(`${where(selectedCountry)} must be at least ${selectedCountry.minDigits} digits.`);
      return;
    }

    if (!dialCode) {
      setError('Please enter your country code.');
      return;
    }

    setIsSubmitting(true);

    try {
      const fullPhone = `${dialCode} ${formData.phone}`;
      const result = await submitConsultation({
        ...formData,
        phone: fullPhone,
      });

      if (result.success) {
        setSubmitted(true);
        setFormData({ fullName: '', email: '', phone: '', startupIdea: '' });
        setPhoneWarning(null);
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
      <div className="py-8 text-center" role="status">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-bold">Thanks, we have your brief</h3>
        <p className="mx-auto max-w-[400px] leading-relaxed text-[var(--color-ink-2)]">
          We&apos;ll read it and reply with a clear quote within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex w-full flex-col gap-5">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">
          {error}
        </div>
      )}

      {/* Honeypot field — hidden from users, visible to bots */}
      <div className="absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
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
        <label htmlFor="fullName" className="form-label">Name</label>
        <input
          id="fullName"
          type="text"
          required
          autoComplete="name"
          placeholder="Your full name"
          className="form-input"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="email" className="form-label">Email</label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className="form-input"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          disabled={isSubmitting}
        />
      </div>

      {/* Phone with country code */}
      <div>
        <label htmlFor="phone" className="form-label">Phone</label>
        <div className="flex gap-2">
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              disabled={isSubmitting}
              className="form-input flex min-w-[92px] cursor-pointer items-center gap-2 whitespace-nowrap px-3"
              aria-label={`Country code: ${isOther ? 'other country' : `${selectedCountry.name} ${selectedCountry.dialCode}`}. Change`}
              aria-expanded={dropdownOpen}
            >
              <span className="text-[0.9375rem] font-medium">{isOther ? 'Other' : selectedCountry.dialCode}</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
                className={`ml-auto transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
              >
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 top-full z-50 mt-1 w-[280px] overflow-hidden rounded-lg border border-[var(--color-line)] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
                <div className="border-b border-[var(--color-line)] p-2">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search country or code"
                    aria-label="Search country or code"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-md border border-[var(--color-line)] px-3 py-2 text-sm outline-none focus:border-[var(--color-accent)]"
                  />
                </div>
                <div className="max-h-[240px] overflow-y-auto overscroll-contain">
                  {filteredCountries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => handleCountrySelect(country)}
                      className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-[var(--color-bg-alt)] ${
                        selectedCountry.code === country.code ? 'bg-[var(--color-accent-soft)] font-medium' : ''
                      }`}
                    >
                      <span className="flex-1 truncate">{country.name}</span>
                      <span className="font-mono text-xs text-[var(--color-ink-2)]">{country.dialCode}</span>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleCountrySelect(OTHER_COUNTRY)}
                    className={`flex w-full items-center gap-3 border-t border-[var(--color-line)] px-4 py-2.5 text-left text-sm hover:bg-[var(--color-bg-alt)] ${
                      isOther ? 'bg-[var(--color-accent-soft)] font-medium' : ''
                    }`}
                  >
                    <span className="flex-1">Other country (enter code)</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {isOther && (
            <div className="relative w-[84px] shrink-0">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-2)]" aria-hidden="true">+</span>
              <input
                id="dialCode"
                type="text"
                inputMode="numeric"
                required
                aria-label="Country code"
                placeholder="255"
                className="form-input pl-6"
                value={customDial}
                onChange={(e) => {
                  setCustomDial(e.target.value.replace(/\D/g, '').slice(0, 4));
                  setError(null);
                }}
                disabled={isSubmitting}
              />
            </div>
          )}

          <input
            id="phone"
            type="tel"
            required
            autoComplete="tel-national"
            placeholder={`${digitRule(selectedCountry)}`}
            className={`form-input min-w-0 flex-1 ${phoneWarning ? 'border-amber-500' : ''}`}
            value={formData.phone}
            onChange={handlePhoneChange}
            disabled={isSubmitting}
            aria-describedby="phone-hint"
          />
        </div>

        <p id="phone-hint" className={`form-hint ${phoneWarning ? 'text-amber-700' : ''}`}>
          {phoneWarning ?? (isOther ? 'Enter your country code, then your number.' : 'Digits only, without the country code.')}
        </p>
      </div>

      <div>
        <label htmlFor="startupIdea" className="form-label">What do you need built?</label>
        <textarea
          id="startupIdea"
          required
          minLength={30}
          placeholder="A website, app or automation? Tell us what it should do, who it is for, and any deadline or budget you have in mind."
          className="form-input"
          rows={5}
          value={formData.startupIdea}
          onChange={(e) => setFormData({ ...formData, startupIdea: e.target.value })}
          disabled={isSubmitting}
          aria-describedby="brief-hint"
        />
        <p id="brief-hint" className="form-hint">A few sentences is enough. Everything you share stays confidential.</p>
      </div>

      <button type="submit" disabled={isSubmitting || !!phoneWarning} className="btn btn-primary mt-1 w-full">
        {isSubmitting ? (
          <>
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </>
        ) : (
          'Get a quote'
        )}
      </button>
    </form>
  );
}
