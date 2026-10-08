'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/auth';
import { User, Lock, ArrowLeft, Loader2, Flag } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await authApi.login(formData.username, formData.password);
      if (result.success) {
        if (result.redirect) router.push(result.redirect);
        else if (result.user?.role === 'admin') router.push('/admin/admin-dashboard');
        else router.push('/dashboard');
      } else {
        setError(result.message || 'Invalid credentials');
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
            JAI SHRI <span style={{ color: '#ff6b35' }}>RAM NAAM</span>
          </h1>
          <p className="text-sm mt-1 font-semibold" style={{ color: '#9a6b4b' }}>राम नाम लेखन हेतु लॉगिन करें</p>
        </div>

        {/* Card */}
        <div className="clay-card p-6 sm:p-8">

          <h2 className="text-xl font-black text-center mb-6" style={{ color: '#4a2410' }}>लॉगिन / Login</h2>

          {error && (
            <div className="clay-alert px-4 py-3 mb-5 flex items-center gap-2 text-sm font-bold">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] font-black uppercase tracking-widest mb-2 ml-1" style={{ color: '#9a6b4b' }}>Username</label>
              <div className="relative">
                <span className="clay-chip absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center">
                  <User className="w-4 h-4" style={{ color: '#ff6b35' }} />
                </span>
                <input type="text" value={formData.username}
                  onChange={e => setFormData({ ...formData, username: e.target.value })}
                  className="clay-input w-full pl-14 pr-4 py-4 text-sm font-bold"
                  placeholder="Enter your username"
                  required />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-black uppercase tracking-widest mb-2 ml-1" style={{ color: '#9a6b4b' }}>Password</label>
              <div className="relative">
                <span className="clay-chip absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center">
                  <Lock className="w-4 h-4" style={{ color: '#ff6b35' }} />
                </span>
                <input type="password" value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  className="clay-input w-full pl-14 pr-4 py-4 text-sm font-bold"
                  placeholder="Enter your password"
                  required />
              </div>
            </div>

            <div className="text-right">
              <Link href="/forgot" className="text-xs font-black hover:underline" style={{ color: '#c2410c' }}>
                📱 मोबाइल नंबर से लॉगिन?
              </Link>
            </div>

            <button type="submit" disabled={loading}
              className="clay-btn clay-btn-saffron w-full py-4 text-sm flex items-center justify-center gap-2">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Loading...</> : '🙏 लॉगिन / Login'}
            </button>
          </form>

          <div className="mt-6 pt-5 text-center" style={{ borderTop: '2px dashed rgba(204,120,60,0.2)' }}>
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