'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  User, AtSign, Phone, Mail, MapPin, Building2, Briefcase,
  Sparkles, Languages, Lock, ShieldCheck, ArrowLeft, Loader2,
} from 'lucide-react';

// Ek field: label + clay icon chip + (input) + chhota hint.
// Input har jagah neeche explicitly likha hai, ye sirf layout sambhalta hai.
function Field({
  label, required, hint, icon: Icon, children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-black mb-2 ml-1" style={{ color: '#6b4129' }}>
        {label} {required && <span style={{ color: '#dc2626' }}>*</span>}
      </label>
      <div className="relative">
        <span className="clay-chip absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center">
          <Icon className="w-4 h-4" style={{ color: '#ff6b35' }} />
        </span>
        {children}
      </div>
      {hint && <p className="text-xs mt-2 ml-1 font-semibold" style={{ color: '#b08a70' }}>{hint}</p>}
    </div>
  );
}

const inputCls = 'clay-input w-full pl-14 pr-4 py-4 text-sm font-semibold';
const sectionCls = 'text-lg font-black pb-2 mb-1';
const sectionStyle = { color: '#4a2410', borderBottom: '2px dashed rgba(204,120,60,0.25)' };

export default function PanditRegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    state: '',
    experience: '',
    specialization: '',
    languages: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.phone.length < 10) {
      setError('Please enter a valid phone number');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pandit-auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          username: formData.username,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
          city: formData.city,
          state: formData.state,
          experience: formData.experience ? parseInt(formData.experience) : 0,
          specialization: formData.specialization,
          languages: formData.languages
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Save token and pandit info to localStorage
        localStorage.setItem('panditToken', data.token);
        localStorage.setItem('pandit', JSON.stringify(data.pandit));
        
        // Redirect to pandit dashboard
        router.push('/pandit/dashboard');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="clay-bg clay-bigtext min-h-screen py-12 px-4 relative overflow-hidden">

      {/* Background me bada ubhra hua ॐ */}
      <div className="clay-om-wrap"><span className="clay-om">ॐ</span></div>

      {/* Claymorphism blobs (sirf sajawat) */}
      <div className="clay-blob w-56 h-56 -top-16 -left-16 bg-[#ffd0a8]" style={{ animation: 'float 7s ease-in-out infinite' }} />
      <div className="clay-blob w-40 h-40 bottom-10 -right-10 bg-[#ffc3a0]" style={{ animation: 'float 9s ease-in-out infinite' }} />

      <div className="w-full max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="clay-icon inline-flex items-center justify-center w-20 h-20 mb-5">
            <span className="text-4xl drop-shadow">🕉️</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight" style={{ color: '#4a2410' }}>Pandit Registration</h1>
          <p className="mt-1 font-semibold" style={{ color: '#9a6b4b' }}>Join our platform and serve devotees</p>
        </div>

        {/* Registration Form */}
        <div className="clay-card p-6 sm:p-8">
          {error && (
            <div className="clay-alert px-4 py-3 mb-6 flex items-center gap-2 text-sm font-bold">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info Section */}
            <div className="space-y-5">
              <h3 className={sectionCls} style={sectionStyle}>Basic Information</h3>

              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Full Name" required icon={User}>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Pandit Shri..."
                    required
                    className={inputCls}
                  />
                </Field>

                <Field label="Username" required icon={AtSign} hint="Unique username for login">
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value.toLowerCase() })}
                    placeholder="panditji123"
                    required
                    className={inputCls}
                  />
                </Field>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Phone Number" required icon={Phone}>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="10 digit mobile number"
                    required
                    className={inputCls}
                  />
                </Field>

                <Field label="Email (Optional)" icon={Mail}>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className={inputCls}
                  />
                </Field>
              </div>
            </div>

            {/* Location Section */}
            <div className="space-y-5">
              <h3 className={sectionCls} style={sectionStyle}>Location</h3>

              <div className="grid md:grid-cols-2 gap-5">
                <Field label="City" required icon={MapPin}>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Your city"
                    required
                    className={inputCls}
                  />
                </Field>

                <Field label="State" required icon={Building2}>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="Your state"
                    required
                    className={inputCls}
                  />
                </Field>
              </div>
            </div>

            {/* Professional Details */}
            <div className="space-y-5">
              <h3 className={sectionCls} style={sectionStyle}>Professional Details</h3>

              <Field label="Experience (Years)" icon={Briefcase}>
                <input
                  type="number"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="Years of experience"
                  min="0"
                  className={inputCls}
                />
              </Field>

              <Field label="Specialization" icon={Sparkles} hint="Separate multiple specializations with commas">
                <input
                  type="text"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  placeholder="e.g., Vedic Rituals, Marriage, Griha Pravesh (comma separated)"
                  className={inputCls}
                />
              </Field>

              <Field label="Languages" icon={Languages} hint="Separate multiple languages with commas">
                <input
                  type="text"
                  value={formData.languages}
                  onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                  placeholder="e.g., Hindi, Sanskrit, English (comma separated)"
                  className={inputCls}
                />
              </Field>
            </div>

            {/* Password Section */}
            <div className="space-y-5">
              <h3 className={sectionCls} style={sectionStyle}>Security</h3>

              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Password" required icon={Lock}>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Create a strong password"
                    required
                    minLength={6}
                    className={inputCls}
                  />
                </Field>

                <Field label="Confirm Password" required icon={ShieldCheck}>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Re-enter password"
                    required
                    minLength={6}
                    className={inputCls}
                  />
                </Field>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="clay-btn clay-btn-saffron w-full py-4 text-sm flex items-center justify-center gap-2"
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Registering...</> : 'Register as Pandit'}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 pt-5 text-center space-y-3" style={{ borderTop: '2px dashed rgba(204,120,60,0.2)' }}>
            <p className="text-sm font-semibold" style={{ color: '#9a6b4b' }}>
              Already have an account?{' '}
              <Link href="/pandit/login" className="font-black hover:underline" style={{ color: '#c2410c' }}>
                Login
              </Link>
            </p>
            <p className="text-sm font-semibold" style={{ color: '#9a6b4b' }}>
              Are you a user?{' '}
              <Link href="/register" className="font-black hover:underline" style={{ color: '#c2410c' }}>
                User Registration
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