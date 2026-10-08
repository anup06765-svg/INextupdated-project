'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Lock, ArrowLeft, Loader2 } from 'lucide-react';

export default function PanditLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pandit-auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Save token and pandit info to localStorage
        localStorage.setItem('panditToken', data.token);
        localStorage.setItem('pandit', JSON.stringify(data.pandit));
        
        // Redirect to pandit dashboard
        router.push('/pandit/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Login error:', err);
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
        {/* Header */}
        <div className="text-center mb-8">
          <div className="clay-icon inline-flex items-center justify-center w-20 h-20 mb-5">
            <span className="text-4xl drop-shadow">🕉️</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight" style={{ color: '#4a2410' }}>Pandit Login</h1>
          <p className="mt-1 font-semibold" style={{ color: '#9a6b4b' }}>Welcome back, Pandit Ji</p>
        </div>

        {/* Login Form */}
        <div className="clay-card p-6 sm:p-8">
          {error && (
            <div className="clay-alert px-4 py-3 mb-5 flex items-center gap-2 text-sm font-bold">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Phone/Username */}
            <div>
              <label className="block text-sm font-black mb-2 ml-1" style={{ color: '#6b4129' }}>
                Phone Number or Username
              </label>
              <div className="relative">
                <span className="clay-chip absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center">
                  <User className="w-4 h-4" style={{ color: '#ff6b35' }} />
                </span>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter phone or username"
                  required
                  className="clay-input w-full pl-14 pr-4 py-4 text-sm font-bold"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-black mb-2 ml-1" style={{ color: '#6b4129' }}>
                Password
              </label>
              <div className="relative">
                <span className="clay-chip absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center">
                  <Lock className="w-4 h-4" style={{ color: '#ff6b35' }} />
                </span>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter your password"
                  required
                  className="clay-input w-full pl-14 pr-4 py-4 text-sm font-bold"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="clay-btn clay-btn-saffron w-full py-4 text-sm flex items-center justify-center gap-2"
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Logging in...</> : 'Login'}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 pt-5 text-center space-y-3" style={{ borderTop: '2px dashed rgba(204,120,60,0.2)' }}>
            <p className="text-sm font-semibold" style={{ color: '#9a6b4b' }}>
              Don&apos;t have an account?{' '}
              <Link href="/pandit/register" className="font-black hover:underline" style={{ color: '#c2410c' }}>
                Register as Pandit
              </Link>
            </p>
            <p className="text-sm font-semibold" style={{ color: '#9a6b4b' }}>
              Are you a user?{' '}
              <Link href="/login" className="font-black hover:underline" style={{ color: '#c2410c' }}>
                User Login
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-7">
          <Link href="/" className="text-sm font-black inline-flex items-center gap-2 hover:gap-3 transition-all" style={{ color: '#9a6b4b' }}>
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}