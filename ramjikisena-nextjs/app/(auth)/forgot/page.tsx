'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Phone, ArrowLeft, Loader2, Flag } from 'lucide-react';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [contact, setContact] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!/^[0-9]{10}$/.test(contact)) {
      setError('कृपया 10 अंकों का मोबाइल नंबर डालें');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forgot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ contact }),
      });
      const data = await res.json();
      if (data.success) {
        if (data.token) localStorage.setItem('token', data.token);
        if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
        router.push(data.redirect || '/dashboard');
      } else {
        setError(data.message || 'Invalid phone number');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="clay-bg clay-bigtext min-h-screen flex items-center justify-center p-4 py-10 relative overflow-hidden">

      {/* Background me bada ubhra hua ॐ */}
      <div className="clay-om-wrap"><span className="clay-om">ॐ</span></div>

      {/* Claymorphism blobs (sirf sajawat) */}
      <div className="clay-blob w-56 h-56 -top-16 -left-16 bg-[#ffd0a8]" style={{ animation: 'float 7s ease-in-out infinite' }} />
      <div className="clay-blob w-40 h-40 bottom-10 -right-10 bg-[#ffc3a0]" style={{ animation: 'float 9s ease-in-out infinite' }} />
      <div className="clay-blob w-20 h-20 top-1/3 right-[12%] bg-[#ffe0b8] hidden sm:block" style={{ animation: 'float 6s ease-in-out infinite' }} />

      <div className="w-full max-w-md relative z-10">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="clay-icon inline-flex items-center justify-center w-20 h-20 mb-5">
            <Flag className="w-9 h-9 text-white drop-shadow" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: '#4a2410' }}>
            RAMJI KI <span style={{ color: '#ff6b35' }}>SENA</span>
          </h1>
          <p className="text-sm mt-1 font-semibold" style={{ color: '#9a6b4b' }}>मोबाइल नंबर से लॉगिन करें</p>
        </div>

        {/* Card */}
        <div className="clay-card p-6 sm:p-8">

          <h2 className="text-xl font-black text-center mb-6" style={{ color: '#4a2410' }}>
            📱 Mobile Login
          </h2>

          {error && (
            <div className="clay-alert px-4 py-3 mb-5 flex items-center gap-2 text-sm font-bold">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] font-black uppercase tracking-widest mb-2 ml-1" style={{ color: '#9a6b4b' }}>मोबाइल नंबर</label>
              <div className="relative">
                <span className="clay-chip absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center">
                  <Phone className="w-4 h-4" style={{ color: '#ff6b35' }} />
                </span>
                <input type="tel" value={contact}
                  onChange={e => setContact(e.target.value)}
                  className="clay-input w-full pl-14 pr-4 py-4 text-sm font-bold"
                  placeholder="9876543210"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  required />
              </div>
              <p className="text-xs mt-2 ml-1 font-semibold" style={{ color: '#b08a70' }}>
                अपना रजिस्टर्ड मोबाइल नंबर डालें
              </p>
            </div>

            <button type="submit" disabled={loading}
              className="clay-btn clay-btn-saffron w-full py-4 text-sm flex items-center justify-center gap-2">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Loading...</> : '🙏 लॉगिन / Login'}
            </button>
          </form>

          <div className="mt-6 pt-5 space-y-3 text-center" style={{ borderTop: '2px dashed rgba(204,120,60,0.2)' }}>
            <p className="text-sm font-semibold" style={{ color: '#9a6b4b' }}>
              Username से लॉगिन करें?{' '}
              <Link href="/login" className="font-black hover:underline" style={{ color: '#c2410c' }}>
                Login with Username
              </Link>
            </p>
            <p className="text-sm font-semibold" style={{ color: '#9a6b4b' }}>
              नये सदस्य हैं?{' '}
              <Link href="/register" className="font-black hover:underline" style={{ color: '#c2410c' }}>
                Register करें ✨
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-7">
          <Link href="/" className="text-sm font-black inline-flex items-center gap-2 hover:gap-3 transition-all" style={{ color: '#9a6b4b' }}>
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}