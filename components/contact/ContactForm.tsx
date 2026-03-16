'use client';

import { useState, FormEvent } from 'react';

export function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\nSubject: ${values.subject}\n\n${values.message}`
    );
    window.location.href = `mailto:hello@artemis-watches.com?subject=${encodeURIComponent(values.subject || 'Message from artemis-watches.com')}&body=${body}`;
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#F5F3EF',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.65rem',
    fontWeight: 600,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: '#6B6965',
    marginBottom: 8,
  };

  if (sent) {
    return (
      <div
        style={{
          padding: '48px 32px',
          textAlign: 'center',
          background: 'rgba(201,169,110,0.04)',
          border: '1px solid rgba(201,169,110,0.15)',
        }}
      >
        <p
          style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            color: '#F5F3EF',
            marginBottom: 12,
          }}
        >
          Message sent.
        </p>
        <p style={{ fontSize: '0.9rem', color: '#A8A5A0' }}>
          Your email client should have opened. We&apos;ll get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-row">
        <style>{`
          @media (max-width: 560px) { .form-row { grid-template-columns: 1fr !important; } }
          .artemis-input:focus { border-color: rgba(201,169,110,0.4) !important; }
          .artemis-input::placeholder { color: #3A3835; }
        `}</style>

        <div>
          <label htmlFor="name" style={labelStyle}>Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            value={values.name}
            onChange={handleChange}
            className="artemis-input"
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="email" style={labelStyle}>Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="your@email.com"
            value={values.email}
            onChange={handleChange}
            className="artemis-input"
            style={inputStyle}
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" style={labelStyle}>Subject</label>
        <select
          id="subject"
          name="subject"
          value={values.subject}
          onChange={handleChange}
          className="artemis-input"
          style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }}
        >
          <option value="" disabled style={{ background: '#141414' }}>Select a subject</option>
          <option value="General Inquiry" style={{ background: '#141414' }}>General Inquiry</option>
          <option value="Product Question" style={{ background: '#141414' }}>Product Question</option>
          <option value="Order Support" style={{ background: '#141414' }}>Order Support</option>
          <option value="Return Request" style={{ background: '#141414' }}>Return Request</option>
          <option value="Private Viewing" style={{ background: '#141414' }}>Private Viewing (Montreal)</option>
          <option value="Wholesale / Collaboration" style={{ background: '#141414' }}>Wholesale / Collaboration</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" style={labelStyle}>Message</label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Tell us how we can help..."
          value={values.message}
          onChange={handleChange}
          className="artemis-input"
          style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }}
        />
      </div>

      <button
        type="submit"
        style={{
          padding: '16px 40px',
          background: '#F5F3EF',
          color: '#0A0A0A',
          border: 'none',
          cursor: 'pointer',
          fontSize: '0.78rem',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          transition: 'background 0.2s',
          alignSelf: 'flex-start',
          fontFamily: 'inherit',
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = '#C9A96E')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = '#F5F3EF')}
      >
        Send Message
      </button>
    </form>
  );
}
