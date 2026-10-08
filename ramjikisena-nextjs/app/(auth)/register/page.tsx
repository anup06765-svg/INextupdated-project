'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/auth';
import { motion } from 'framer-motion';
import { User, Lock, MapPin, Phone, FileText, ArrowLeft, Loader2 } from 'lucide-react';
import MusicPlayer from '@/components/MusicPlayer';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    city: '',
    contact: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate contact
    if (!/^[0-9]{10}$/.test(formData.contact)) {
      setError('Contact number should be 10 digits');
      setLoading(false);
      return;
    }

    try {
      const result = await authApi.register(formData);

      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.message || 'Registration failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="clay-bg clay-bigtext min-h-screen flex items-center justify-center p-4 py-12 relative overflow-hidden">
      {/* Music Player */}
      <MusicPlayer />

      {/* Background me bada ubhra hua ॐ */}
      <div className="clay-om-wrap"><span className="clay-om">ॐ</span></div>

      {/* Claymorphism blobs (sirf sajawat) */}
      <motion.div animate={{ y: [0, -18, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="clay-blob w-56 h-56 -top-16 -left-16 bg-[#ffd0a8]" />
      <motion.div animate={{ y: [0, 18, 0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="clay-blob w-44 h-44 bottom-8 -right-12 bg-[#ffc3a0]" />
      <div className="clay-blob w-20 h-20 top-1/3 right-[10%] bg-[#ffe0b8] hidden sm:block" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo Section */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="clay-icon inline-flex items-center justify-center w-20 h-20 mb-4"
          >
            <span className="text-4xl drop-shadow">🚩</span>
          </motion.div>

          <h1 className="text-3xl sm:text-4xl font-black mb-2" style={{ color: '#4a2410' }}>
            Jai Shri <span style={{ color: '#ff6b35' }}>Ram Naam</span>
          </h1>
          <p className="text-base font-semibold" style={{ color: '#9a6b4b' }}>नये सदस्यता के लिए रजिस्टर करें</p>
        </div>

        {/* Register Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="clay-card p-6 sm:p-8"
        >
          <h2 className="text-2xl font-black text-center mb-6" style={{ color: '#4a2410' }}>
            रजिस्टर / Register
          </h2>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="clay-alert px-4 py-3 mb-6 flex items-center gap-2 text-sm font-bold"
            >
              <span className="text-xl">⚠️</span>
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-black mb-2 ml-1" style={{ color: '#6b4129' }}>
                यूजर लॉगिन आइडी / Username
              </label>
              <div className="relative">
                <span className="clay-chip absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center">
                  <User className="w-4 h-4" style={{ color: '#ff6b35' }} />
                </span>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="clay-input w-full pl-14 pr-4 py-3.5 text-sm font-semibold"
                  placeholder="Choose a username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black mb-2 ml-1" style={{ color: '#6b4129' }}>
                पूरा नाम / Full Name
              </label>
              <div className="relative">
                <span className="clay-chip absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center">
                  <FileText className="w-4 h-4" style={{ color: '#ff6b35' }} />
                </span>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="clay-input w-full pl-14 pr-4 py-3.5 text-sm font-semibold"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black mb-2 ml-1" style={{ color: '#6b4129' }}>
                शहर / City
              </label>
              <div className="relative">
                <span className="clay-chip absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center">
                  <MapPin className="w-4 h-4" style={{ color: '#ff6b35' }} />
                </span>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="clay-input w-full pl-14 pr-4 py-3.5 text-sm font-semibold"
                  placeholder="Enter your city"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black mb-2 ml-1" style={{ color: '#6b4129' }}>
                मोबाइल नंबर / Mobile No.
              </label>
              <div className="relative">
                <span className="clay-chip absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center">
                  <Phone className="w-4 h-4" style={{ color: '#ff6b35' }} />
                </span>
                <input
                  type="tel"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="clay-input w-full pl-14 pr-4 py-3.5 text-sm font-semibold"
                  placeholder="10 digit mobile number"
                  pattern="[0-9]{10}"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black mb-2 ml-1" style={{ color: '#6b4129' }}>
                पासवर्ड / Password
              </label>
              <div className="relative">
                <span className="clay-chip absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center">
                  <Lock className="w-4 h-4" style={{ color: '#ff6b35' }} />
                </span>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="clay-input w-full pl-14 pr-4 py-3.5 text-sm font-semibold"
                  placeholder="Create a strong password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="clay-btn clay-btn-green w-full py-4 text-base mt-2"
            >
              <span className="flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    ✨ रजिस्टर / Register
                  </>
                )}
              </span>
            </button>
          </form>

          <div className="mt-7 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full" style={{ borderTop: '2px dashed rgba(204,120,60,0.2)' }}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 font-bold" style={{ background: '#fff3e6', color: '#9a6b4b' }}>या</span>
              </div>
            </div>

            <p className="mt-6 font-semibold" style={{ color: '#6b4129' }}>
              पहले से सदस्य हैं?{' '}
              <Link href="/login" className="font-black hover:underline" style={{ color: '#c2410c' }}>
                लॉगिन करें / Login 🙏
              </Link>
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <Link href="/" className="font-black inline-flex items-center gap-2 hover:gap-3 transition-all" style={{ color: '#9a6b4b' }}>
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}