'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { services } from '@/data/services';

export const OTHER = 'Other';
export const REQUIREMENT_OPTIONS = [...services.map((s) => s.title), 'Talent Solutions', 'Corporate training', OTHER];

type Props = {
  selected: string[];
  onChange: (selected: string[]) => void;
  otherText: string;
  onOtherTextChange: (text: string) => void;
  disabled?: boolean;
  invalid?: boolean;
};

// Multi-select dropdown: a button that opens a list of checkboxes. "Other" reveals a text box.
export default function RequirementSelect({ selected, onChange, otherText, onOtherTextChange, disabled, invalid }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const toggle = (option: string) =>
    onChange(selected.includes(option) ? selected.filter((o) => o !== option) : [...selected, option]);

  // Keep the visible order the same as the list, whatever order things were ticked in.
  const summary = REQUIREMENT_OPTIONS.filter((o) => selected.includes(o)).join(', ');

  return (
    <div>
      <span id={`${listId}-label`} className="form-label">Requirement</span>
      <div className="relative" ref={ref}>
        <button
          ref={buttonRef}
          id="requirement"
          type="button"
          disabled={disabled}
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="true"
          aria-expanded={open}
          aria-controls={listId}
          aria-labelledby={`${listId}-label requirement`}
          className={`form-input flex cursor-pointer items-center justify-between gap-3 text-left ${invalid ? 'border-red-400' : ''}`}
        >
          <span className={`truncate ${summary ? '' : 'text-[#64748B]'}`}>{summary || 'Choose one or more'}</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className={`shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}>
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {open && (
          <fieldset
            id={listId}
            className="absolute left-0 right-0 top-full z-40 mt-1 overflow-hidden rounded-lg border border-[var(--color-line)] bg-white py-1 shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
          >
            <legend className="sr-only">What do you need? Choose one or more.</legend>
            {REQUIREMENT_OPTIONS.map((option) => {
              const checked = selected.includes(option);
              return (
                <label
                  key={option}
                  className={`flex min-h-[44px] cursor-pointer items-center gap-3 px-4 py-2 hover:bg-[var(--color-bg-alt)] ${
                    option === OTHER ? 'border-t border-[var(--color-line)]' : ''
                  } ${checked ? 'font-medium' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggle(option)}
                    className="h-4 w-4 shrink-0 accent-[var(--color-accent)]"
                  />
                  {option}
                </label>
              );
            })}
          </fieldset>
        )}
      </div>

      {selected.includes(OTHER) && (
        <div className="mt-3">
          <label htmlFor="requirementOther" className="sr-only">Tell us what you need</label>
          <input
            id="requirementOther"
            type="text"
            required
            disabled={disabled}
            placeholder="Tell us what you need"
            className="form-input"
            value={otherText}
            onChange={(e) => onOtherTextChange(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}

// Turns the choices into the single requirement text the server expects (it needs at least 30
// characters; the shortest possible result, "Looking for help with: Websites", is 31).
export function requirementText(selected: string[], otherText: string) {
  const parts = REQUIREMENT_OPTIONS.filter((o) => selected.includes(o)).map((o) =>
    o === OTHER ? `Other (${otherText.trim()})` : o,
  );
  return `Looking for help with: ${parts.join(', ')}`;
}
