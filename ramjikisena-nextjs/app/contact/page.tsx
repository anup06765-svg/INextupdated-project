'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import {
  Mail, Phone, MapPin, Instagram, Youtube, Send, CheckCircle2,
  Clock, ArrowUpRight, Loader2, User, MessageSquare, MessagesSquare,
} from 'lucide-react';

/* ---------- Yaha apni asli details daalein ---------- */
const CONTACT = {
  email: 'contact@ramjikisena.com',
  phone: '+91 98765 43210',
  address: 'Ayodhya, Uttar Pradesh, India',
  instagram: '#', // apna Instagram link
  youtube: '#',   // apna YouTube link
};

const infoCards = [
  { Icon: Mail,   label: 'Email',   value: CONTACT.email,   href: `mailto:${CONTACT.email}` },
  { Icon: Phone,  label: 'Phone',   value: CONTACT.phone,   href: `tel:${CONTACT.phone.replace(/\s/g, '')}` },
  { Icon: MapPin, label: 'Address', value: CONTACT.address, href: `https://maps.google.com/?q=${encodeURIComponent(CONTACT.address)}` },
];

const MAX_MSG = 500;
const brown = '#4a2410';
const muted = '#9a6b4b';
const saffron = '#ff6b35';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setStatus('sending');
    try {
      // TODO: yaha apni backend API call lagayein (abhi sirf demo delay hai)
      await new Promise(r => setTimeout(r, 900));
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('idle');
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="clay-bg clay-bigtext min-h-screen relative overflow-x-hidden">
      <Navbar showAuthButtons={true} />

      {/* Background: bada ॐ + clay blobs (login jaisa) */}
      <div className="clay-om-wrap"><span className="clay-om">ॐ</span></div>
      <div className="clay-blob w-56 h-56 -top-16 -left-16 bg-[#ffd0a8]" style={{ animation: 'float 7s ease-in-out infinite' }} />
      <div className="clay-blob w-40 h-40 bottom-10 -right-10 bg-[#ffc3a0]" style={{ animation: 'float 9s ease-in-out infinite' }} />
      <div className="clay-blob w-20 h-20 top-1/3 right-[12%] bg-[#ffe0b8] hidden sm:block" style={{ animation: 'float 6s ease-in-out infinite' }} />

      <main className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-14">

        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="clay-icon inline-flex items-center justify-center w-20 h-20 mb-5">
            <MessagesSquare className="w-9 h-9 text-white drop-shadow" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight" style={{ color: brown }}>
            संपर्क <span style={{ color: saffron }}>करें</span>
          </h1>
          <p className="mt-2 font-semibold" style={{ color: muted }}>
            कोई सवाल या सुझाव? हमें लिखिए, हम जल्द जवाब देंगे 🙏
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-start max-w-2xl lg:max-w-none mx-auto">

          {/* ---------- Left: info ---------- */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-5 min-w-0">
            {infoCards.map(({ Icon, label, value, href }) => (
              <a key={label} href={href}
                target={label === 'Address' ? '_blank' : undefined} rel="noreferrer"
                className="clay-card group flex items-center gap-4 p-4 sm:p-5 transition-transform hover:-translate-y-1 active:translate-y-0"
                style={{ borderRadius: '1.75rem' }}>
                <span className="clay-chip flex items-center justify-center flex-shrink-0 w-12 h-12">
                  <Icon className="w-5 h-5" style={{ color: saffron }} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] font-black uppercase tracking-widest" style={{ color: muted }}>{label}</span>
                  <span className="block font-black mt-0.5 break-anywhere" style={{ color: brown }}>{value}</span>
                </span>
                <ArrowUpRight className="w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: muted }} />
              </a>
            ))}

            {/* Response time */}
            <div className="clay-card flex items-center gap-4 p-4 sm:p-5" style={{ borderRadius: '1.75rem' }}>
              <span className="clay-chip flex items-center justify-center flex-shrink-0 w-12 h-12">
                <Clock className="w-5 h-5" style={{ color: saffron }} />
              </span>
              <div className="min-w-0">
                <p className="font-black" style={{ color: brown }}>24-48 घंटे में जवाब</p>
                <p className="text-sm font-semibold mt-0.5" style={{ color: muted }}>हम हर संदेश पढ़ते हैं 🙏</p>
              </div>
            </div>

            {/* Social */}
            <div className="clay-card p-4 sm:p-5" style={{ borderRadius: '1.75rem' }}>
              <p className="text-[11px] font-black uppercase tracking-widest mb-3 ml-1" style={{ color: muted }}>Follow Us</p>
              <div className="grid grid-cols-2 gap-3">
                <a href={CONTACT.instagram}
                  className="clay-btn inline-flex items-center justify-center gap-2 py-3.5 text-sm"
                  style={{ background: 'linear-gradient(145deg, #f9a24f, #dd2a7b 60%, #8134af)' }}>
                  <Instagram className="w-4 h-4" /> Instagram
                </a>
                <a href={CONTACT.youtube}
                  className="clay-btn inline-flex items-center justify-center gap-2 py-3.5 text-sm"
                  style={{ background: 'linear-gradient(145deg, #ff6b6b, #dc2626)' }}>
                  <Youtube className="w-4 h-4" /> YouTube
                </a>
              </div>
            </div>
          </div>

          {/* ---------- Right: form ---------- */}
          <div className="lg:col-span-3 clay-card p-6 sm:p-8 min-w-0">
            {status === 'sent' ? (
              <div className="text-center py-8 sm:py-14">
                <div className="clay-icon inline-flex items-center justify-center w-20 h-20 mb-5"
                  style={{ background: 'linear-gradient(145deg, #5eead4, #16a34a)' }}>
                  <CheckCircle2 className="w-10 h-10 text-white drop-shadow" />
                </div>
                <h2 className="text-xl font-black" style={{ color: brown }}>संदेश भेज दिया गया! 🙏</h2>
                <p className="mt-2 font-semibold max-w-sm mx-auto" style={{ color: muted }}>
                  धन्यवाद! हम जल्द ही आपसे संपर्क करेंगे। जय श्री राम।
                </p>
                <button onClick={() => setStatus('idle')}
                  className="clay-btn clay-btn-saffron mt-7 px-7 py-3.5 text-sm">
                  ✨ एक और संदेश भेजें
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-black text-center mb-1" style={{ color: brown }}>संदेश भेजें / Message</h2>
                <p className="text-sm text-center font-semibold mb-6" style={{ color: muted }}>नीचे फॉर्म भरें, बाकी हम पर छोड़ दें</p>

                {error && (
                  <div className="clay-alert px-4 py-3 mb-5 flex items-center gap-2 text-sm font-bold">⚠️ {error}</div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="c-name" className="block text-[11px] font-black uppercase tracking-widest mb-2 ml-1" style={{ color: muted }}>नाम / Name</label>
                    <div className="relative">
                      <span className="clay-chip absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center">
                        <User className="w-4 h-4" style={{ color: saffron }} />
                      </span>
                      <input id="c-name" type="text" required autoComplete="name" value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="clay-input w-full pl-14 pr-4 py-4 text-sm font-bold"
                        placeholder="आपका नाम" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="c-email" className="block text-[11px] font-black uppercase tracking-widest mb-2 ml-1" style={{ color: muted }}>Email</label>
                    <div className="relative">
                      <span className="clay-chip absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center">
                        <Mail className="w-4 h-4" style={{ color: saffron }} />
                      </span>
                      <input id="c-email" type="email" required autoComplete="email" inputMode="email" value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        className="clay-input w-full pl-14 pr-4 py-4 text-sm font-bold"
                        placeholder="आपका ईमेल" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2 mx-1">
                      <label htmlFor="c-msg" className="text-[11px] font-black uppercase tracking-widest" style={{ color: muted }}>संदेश / Message</label>
                      <span className="text-[11px] font-black" style={{ color: form.message.length > MAX_MSG - 30 ? '#c2410c' : muted }}>
                        {form.message.length}/{MAX_MSG}
                      </span>
                    </div>
                    <div className="relative">
                      <span className="clay-chip absolute left-2.5 top-3 w-9 h-9 flex items-center justify-center">
                        <MessageSquare className="w-4 h-4" style={{ color: saffron }} />
                      </span>
                      <textarea id="c-msg" rows={5} required maxLength={MAX_MSG} value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        className="clay-input w-full pl-14 pr-4 py-4 text-sm font-bold resize-none"
                        placeholder="अपना संदेश लिखें..." />
                    </div>
                  </div>

                  <button type="submit" disabled={status === 'sending'}
                    className="clay-btn clay-btn-saffron w-full py-4 text-sm flex items-center justify-center gap-2">
                    {status === 'sending'
                      ? <><Loader2 className="w-4 h-4 animate-spin" /> भेजा जा रहा है...</>
                      : <><Send className="w-4 h-4" /> 🙏 संदेश भेजें</>}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        <p className="text-center mt-10 text-[11px] font-black uppercase tracking-[0.6em]" style={{ color: muted }}>जय श्री राम</p>
      </main>
    </div>
  );
}