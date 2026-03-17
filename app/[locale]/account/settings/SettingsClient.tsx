'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

interface UserData {
  name: string;
  email: string;
  emailMarketing: boolean;
  shippingFirstName: string | null;
  shippingLastName: string | null;
  shippingAddress: string | null;
  shippingCity: string | null;
  shippingProvince: string | null;
  shippingPostal: string | null;
}

type Msg = { ok: boolean; text: string } | null;

const PROVINCES = [
  'AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT',
];

export function SettingsClient({ user }: { user: UserData }) {
  // ── Name ──
  const [nameValue, setNameValue] = useState('');
  const [nameLoading, setNameLoading] = useState(false);
  const [nameMsg, setNameMsg] = useState<Msg>(null);

  // ── Password ──
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdMsg, setPwdMsg] = useState<Msg>(null);

  // ── Address ──
  const [addr, setAddr] = useState({
    firstName: user.shippingFirstName ?? '',
    lastName: user.shippingLastName ?? '',
    address: user.shippingAddress ?? '',
    city: user.shippingCity ?? '',
    province: user.shippingProvince ?? '',
    postal: user.shippingPostal ?? '',
  });
  const [addrLoading, setAddrLoading] = useState(false);
  const [addrMsg, setAddrMsg] = useState<Msg>(null);

  // ── Email prefs ──
  const [emailMarketing, setEmailMarketing] = useState(user.emailMarketing);
  const [emailPrefLoading, setEmailPrefLoading] = useState(false);

  // ── Delete ──
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState<Msg>(null);
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  const handleNameSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameValue.trim()) return;
    setNameLoading(true);
    setNameMsg(null);
    const res = await fetch('/api/account/update-name', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: nameValue.trim() }),
    });
    setNameMsg(res.ok
      ? { ok: true, text: 'Name updated.' }
      : { ok: false, text: 'Failed to update name.' }
    );
    if (res.ok) setNameValue('');
    setNameLoading(false);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPwd !== confirmPwd) { setPwdMsg({ ok: false, text: 'Passwords do not match.' }); return; }
    if (newPwd.length < 8) { setPwdMsg({ ok: false, text: 'Min. 8 characters.' }); return; }
    setPwdLoading(true);
    setPwdMsg(null);
    const res = await fetch('/api/account/change-password', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword: currentPwd, newPassword: newPwd }),
    });
    const data = await res.json();
    setPwdMsg(res.ok
      ? { ok: true, text: 'Password updated.' }
      : { ok: false, text: data.error ?? 'Failed to update password.' }
    );
    if (res.ok) { setCurrentPwd(''); setNewPwd(''); setConfirmPwd(''); }
    setPwdLoading(false);
  };

  const handleAddressSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddrLoading(true);
    setAddrMsg(null);
    const res = await fetch('/api/account/update-address', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addr),
    });
    setAddrMsg(res.ok
      ? { ok: true, text: 'Address saved.' }
      : { ok: false, text: 'Failed to save address.' }
    );
    setAddrLoading(false);
  };

  const handleEmailPrefToggle = async (val: boolean) => {
    setEmailMarketing(val);
    setEmailPrefLoading(true);
    await fetch('/api/account/email-prefs', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emailMarketing: val }),
    });
    setEmailPrefLoading(false);
  };

  const handleDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (deleteConfirm !== 'DELETE') {
      setDeleteMsg({ ok: false, text: 'Type DELETE to confirm.' });
      return;
    }
    setDeleteLoading(true);
    const res = await fetch('/api/account/delete', { method: 'DELETE' });
    if (res.ok) {
      await signOut({ callbackUrl: '/' });
    } else {
      setDeleteMsg({ ok: false, text: 'Failed to delete account.' });
      setDeleteLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', padding: 'clamp(48px, 8vw, 96px) 24px' }}>
      <style>{`
        .s-input { width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 3px; padding: 13px 16px; font-size: 0.88rem; color: #F5F3EF; outline: none; transition: border-color 0.2s; box-sizing: border-box; }
        .s-input:focus { border-color: rgba(201,169,110,0.4); }
        .s-select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%236B6965'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; padding-right: 36px; cursor: pointer; }
        .s-section { padding: 28px 32px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 4px; display: flex; flex-direction: column; gap: 20px; }
        .s-label { font-size: 0.6rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: #6B6965; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .s-btn { align-self: flex-start; padding: 11px 28px; background: linear-gradient(135deg, #C9A96E 0%, #B8924A 100%); border: none; border-radius: 0; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #0A0A0A; cursor: pointer; }
        .s-btn:disabled { opacity: 0.45; cursor: not-allowed; }
        .s-btn-ghost { align-self: flex-start; padding: 11px 28px; background: transparent; border: 1px solid rgba(255,255,255,0.1); border-radius: 0; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: #6B6965; cursor: pointer; }
        .s-btn-danger { align-self: flex-start; padding: 11px 28px; background: transparent; border: 1px solid rgba(255,107,107,0.3); border-radius: 0; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #FF6B6B; cursor: pointer; }
        .s-toggle { position: relative; display: inline-flex; align-items: center; cursor: pointer; gap: 12px; }
        .s-toggle input { opacity: 0; width: 0; height: 0; position: absolute; }
        .s-toggle-track { width: 40px; height: 22px; background: rgba(255,255,255,0.08); border-radius: 11px; transition: background 0.2s; flex-shrink: 0; }
        .s-toggle input:checked ~ .s-toggle-track { background: rgba(201,169,110,0.5); }
        .s-toggle-thumb { position: absolute; left: 3px; top: 3px; width: 16px; height: 16px; background: #6B6965; border-radius: 50%; transition: transform 0.2s, background 0.2s; }
        .s-toggle input:checked ~ .s-toggle-track .s-toggle-thumb { transform: translateX(18px); background: #C9A96E; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        @media (max-width: 480px) { .grid-2 { grid-template-columns: 1fr; } }
      `}</style>

      <div style={{ maxWidth: 640, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 40 }}>

        {/* ── Header ── */}
        <div>
          <Link href="/account" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6B6965', textDecoration: 'none', marginBottom: 28 }}>
            ← Back to Account
          </Link>
          <p style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: 8 }}>
            Account Settings
          </p>
          <h1 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 600, letterSpacing: '-0.025em', color: '#F5F3EF', margin: 0 }}>
            Your Profile
          </h1>
        </div>

        {/* ── Current info ── */}
        <div className="s-section">
          <p className="s-label">Current Info</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', gap: 16 }}>
              <span style={{ fontSize: '0.75rem', color: '#6B6965', minWidth: 60 }}>Name</span>
              <span style={{ fontSize: '0.82rem', color: '#F5F3EF' }}>{user.name || '—'}</span>
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <span style={{ fontSize: '0.75rem', color: '#6B6965', minWidth: 60 }}>Email</span>
              <span style={{ fontSize: '0.82rem', color: '#F5F3EF' }}>{user.email}</span>
            </div>
          </div>
        </div>

        {/* ── Update name ── */}
        <form onSubmit={handleNameSave} className="s-section">
          <p className="s-label">Update Name</p>
          <input className="s-input" type="text" value={nameValue} onChange={(e) => setNameValue(e.target.value)} placeholder="New display name" />
          {nameMsg && <p style={{ fontSize: '0.75rem', color: nameMsg.ok ? '#7EB89A' : '#E24B4A', margin: 0 }}>{nameMsg.text}</p>}
          <button className="s-btn" type="submit" disabled={nameLoading || !nameValue.trim()}>
            {nameLoading ? 'Saving…' : 'Save Name'}
          </button>
        </form>

        {/* ── Change password ── */}
        <form onSubmit={handlePasswordChange} className="s-section">
          <p className="s-label">Change Password</p>
          <input className="s-input" type="password" value={currentPwd} onChange={(e) => setCurrentPwd(e.target.value)} placeholder="Current password" required />
          <input className="s-input" type="password" value={newPwd} onChange={(e) => setNewPwd(e.target.value)} placeholder="New password (min. 8 characters)" required minLength={8} />
          <input className="s-input" type="password" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} placeholder="Confirm new password" required />
          {pwdMsg && <p style={{ fontSize: '0.75rem', color: pwdMsg.ok ? '#7EB89A' : '#E24B4A', margin: 0 }}>{pwdMsg.text}</p>}
          <button className="s-btn" type="submit" disabled={pwdLoading}>
            {pwdLoading ? 'Updating…' : 'Update Password'}
          </button>
        </form>

        {/* ── Default shipping address ── */}
        <form onSubmit={handleAddressSave} className="s-section">
          <div>
            <p className="s-label" style={{ borderBottom: 'none', paddingBottom: 4 }}>Default Shipping Address</p>
            <p style={{ fontSize: '0.75rem', color: '#6B6965', margin: 0 }}>Pre-fills your address at checkout.</p>
          </div>
          <div className="grid-2">
            <input className="s-input" type="text" value={addr.firstName} onChange={(e) => setAddr({ ...addr, firstName: e.target.value })} placeholder="First name" />
            <input className="s-input" type="text" value={addr.lastName} onChange={(e) => setAddr({ ...addr, lastName: e.target.value })} placeholder="Last name" />
          </div>
          <input className="s-input" type="text" value={addr.address} onChange={(e) => setAddr({ ...addr, address: e.target.value })} placeholder="Street address" />
          <div className="grid-2">
            <input className="s-input" type="text" value={addr.city} onChange={(e) => setAddr({ ...addr, city: e.target.value })} placeholder="City" />
            <select className="s-input s-select" value={addr.province} onChange={(e) => setAddr({ ...addr, province: e.target.value })}>
              <option value="">Province</option>
              {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <input className="s-input" type="text" value={addr.postal} onChange={(e) => setAddr({ ...addr, postal: e.target.value.toUpperCase() })} placeholder="Postal code (e.g. H2X 1Y4)" maxLength={7} style={{ maxWidth: 200 }} />
          {addrMsg && <p style={{ fontSize: '0.75rem', color: addrMsg.ok ? '#7EB89A' : '#E24B4A', margin: 0 }}>{addrMsg.text}</p>}
          <button className="s-btn" type="submit" disabled={addrLoading}>
            {addrLoading ? 'Saving…' : 'Save Address'}
          </button>
        </form>

        {/* ── Email preferences ── */}
        <div className="s-section">
          <p className="s-label">Email Preferences</p>
          <label className="s-toggle">
            <input type="checkbox" checked={emailMarketing} onChange={(e) => handleEmailPrefToggle(e.target.checked)} disabled={emailPrefLoading} />
            <div className="s-toggle-track">
              <div className="s-toggle-thumb" />
            </div>
            <span style={{ fontSize: '0.82rem', color: emailMarketing ? '#F5F3EF' : '#6B6965' }}>
              Receive promo offers & new arrivals
            </span>
          </label>
          <p style={{ fontSize: '0.72rem', color: '#3A3835', margin: 0 }}>
            Order confirmations and shipping updates are always sent regardless of this setting.
          </p>
        </div>

        {/* ── Danger zone ── */}
        <div className="s-section" style={{ borderColor: 'rgba(255,107,107,0.12)' }}>
          <p className="s-label" style={{ color: 'rgba(255,107,107,0.6)', borderBottomColor: 'rgba(255,107,107,0.1)' }}>Danger Zone</p>

          {!showDeleteForm ? (
            <div>
              <p style={{ fontSize: '0.8rem', color: '#6B6965', marginBottom: 16, lineHeight: 1.6 }}>
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <button className="s-btn-danger" onClick={() => setShowDeleteForm(true)}>
                Delete My Account
              </button>
            </div>
          ) : (
            <form onSubmit={handleDeleteAccount} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <p style={{ fontSize: '0.8rem', color: '#A8A5A0', lineHeight: 1.6, margin: 0 }}>
                This will permanently delete your account, orders history, and promo code. Type <strong style={{ color: '#FF6B6B' }}>DELETE</strong> to confirm.
              </p>
              <input
                className="s-input"
                type="text"
                value={deleteConfirm}
                onChange={(e) => setDeleteConfirm(e.target.value)}
                placeholder="Type DELETE"
                style={{ maxWidth: 240 }}
              />
              {deleteMsg && <p style={{ fontSize: '0.75rem', color: '#E24B4A', margin: 0 }}>{deleteMsg.text}</p>}
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="s-btn-danger" type="submit" disabled={deleteLoading}>
                  {deleteLoading ? 'Deleting…' : 'Confirm Delete'}
                </button>
                <button className="s-btn-ghost" type="button" onClick={() => { setShowDeleteForm(false); setDeleteConfirm(''); setDeleteMsg(null); }}>
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
