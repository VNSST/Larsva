'use client';

import { useState, type FormEvent } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Here you would connect to your backend / API
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', projectType: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[560px] flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block font-display font-semibold text-sm mb-2 text-[var(--color-text-primary)]">
            Your Name
          </label>
          <input
            id="name"
            type="text"
            required
            placeholder="Jane Doe"
            className="form-input"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-display font-semibold text-sm mb-2 text-[var(--color-text-primary)]">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="jane@company.com"
            className="form-input"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label htmlFor="projectType" className="block font-display font-semibold text-sm mb-2 text-[var(--color-text-primary)]">
          Project Type
        </label>
        <select
          id="projectType"
          required
          className="form-input appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20fill%3D%22%238896ab%22%20d%3D%22M4%206l4%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center]"
          value={formData.projectType}
          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
        >
          <option value="" disabled>Select a project type</option>
          <option value="mvp">MVP / Prototype</option>
          <option value="website">Website</option>
          <option value="mobile">Mobile App</option>
          <option value="webapp">Web Application</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block font-display font-semibold text-sm mb-2 text-[var(--color-text-primary)]">
          Tell Us About Your Idea
        </label>
        <textarea
          id="message"
          required
          placeholder="Give us the elevator pitch — we love hearing about new ideas..."
          className="form-input"
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
      </div>

      <button
        type="submit"
        className="btn-primary w-full justify-center text-lg py-4 mt-2"
      >
        {submitted ? (
          <>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Sent! We&apos;ll be in touch 🚀
          </>
        ) : (
          <>
            Send It Over
            <svg className="btn-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
