'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authApi, User } from '@/lib/auth';
import {
  History, Users, BookOpen, PenSquare, Calendar, MessageSquare,
  User as UserIcon, TrendingUp, Award, Flame, ChevronRight, Sparkles, ArrowRight,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Booking {
  _id: string;
  poojaType: string;
  poojaDate: string;
  status: string;
  pandit: { name: string };
}

const quickLinks = [
  { href: '/history',     label: 'Lekhan History', desc: 'Daily count & streak', Icon: History,       tint: 'from-purple-100 to-purple-50', ic: 'text-purple-600' },
  { href: '/devotees',    label: 'All Devotees',   desc: 'Sabhi bhakt',          Icon: Users,         tint: 'from-orange-100 to-orange-50', ic: 'text-orange-600' },
  { href: '/my-bookings', label: 'My Bookings',    desc: 'Pandit bookings',      Icon: Calendar,      tint: 'from-blue-100 to-blue-50',     ic: 'text-blue-600' },
  { href: '/blogs',       label: 'Blogs',          desc: 'Padhein & seekhein',   Icon: BookOpen,      tint: 'from-green-100 to-green-50',   ic: 'text-green-600' },
  { href: '/my-blogs',    label: 'My Blogs',       desc: 'Aapke likhe blogs',    Icon: PenSquare,     tint: 'from-teal-100 to-teal-50',     ic: 'text-teal-600' },
  { href: '/community',   label: 'Community',      desc: 'Bhakton se judein',    Icon: MessageSquare, tint: 'from-pink-100 to-pink-50',     ic: 'text-pink-600' },
  { href: '/profile',     label: 'My Profile',     desc: 'Profile edit karein',  Icon: UserIcon,      tint: 'from-slate-200 to-slate-50',   ic: 'text-slate-600' },
];

const statusStyle: Record<string, string> = {
  pending:   'bg-yellow-100 text-yellow-800 border-yellow-300',
  confirmed: 'bg-green-100 text-green-800 border-green-300',
  completed: 'bg-blue-100 text-blue-800 border-blue-300',
  rejected:  'bg-red-100 text-red-800 border-red-300',
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authApi.getCurrentUser().then(userData => {
      if (!userData) { router.push('/login'); return; }
      setUser(userData);
      setLoading(false);
      fetchRecentBookings();
    }).catch(() => router.push('/login'));
  }, []);

  const fetchRecentBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/my-bookings`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setRecentBookings(data.bookings.slice(0, 3));
    } catch {}
  };

  const todayCount = () => {
    if (!user?.dailyCounts?.length) return 0;
    const today = new Date().toDateString();
    const last = user.dailyCounts[user.dailyCounts.length - 1];
    return new Date(last.date).toDateString() === today ? last.count : 0;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-orange-700 font-black">जय श्री राम...</p>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Rank',         value: `#${user?.rank || '-'}`,              Icon: Award,      tint: 'from-orange-100 to-amber-50', ic: 'text-orange-600' },
    { label: 'Total Jaap',   value: Number(user?.totalCount || 0).toLocaleString('en-IN'), Icon: TrendingUp, tint: 'from-red-100 to-rose-50', ic: 'text-red-600' },
    { label: 'Total Mala',   value: Number(user?.mala || 0).toFixed(1),   Icon: Sparkles,   tint: 'from-purple-100 to-fuchsia-50', ic: 'text-purple-600' },
    { label: "Today's Jaap", value: todayCount().toLocaleString('en-IN'), Icon: Flame,      tint: 'from-blue-100 to-sky-50', ic: 'text-blue-600' },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 max-w-5xl mx-auto">

      {/* Welcome banner */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] p-5 sm:p-8 text-white"
        style={{ background: 'linear-gradient(135deg, #ff8a3d 0%, #ea580c 50%, #c2410c 100%)', boxShadow: '0 22px 44px -18px rgba(194,65,12,0.7)' }}>
        <span aria-hidden className="absolute -right-4 -top-10 text-[10rem] sm:text-[13rem] font-black leading-none select-none pointer-events-none"
          style={{ color: 'rgba(255,255,255,0.09)' }}>ॐ</span>
        <div className="relative flex items-center justify-between gap-4 flex-wrap">
          <div className="min-w-0">
            <p className="text-orange-100 text-sm font-bold mb-1">🙏 जय श्री राम</p>
            <h1 className="text-2xl sm:text-3xl font-black leading-tight break-words">Welcome, {user?.name}!</h1>
            <p className="text-orange-50/90 text-sm sm:text-base font-semibold mt-1.5">
              {todayCount() > 0
                ? `आज ${todayCount().toLocaleString('en-IN')} राम नाम लिखे 🔥 — बढ़िया!`
                : 'आपकी आध्यात्मिक यात्रा जारी है'}
            </p>
          </div>
          <Link href="/"
            className="inline-flex items-center gap-2 min-h-[48px] px-5 rounded-2xl font-black text-sm active:scale-95 hover:-translate-y-0.5 transition-all"
            style={{ background: '#fff', color: '#c2410c', boxShadow: '0 10px 22px -10px rgba(0,0,0,0.45)' }}>
            🙏 Jaap Shuru Karein <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map(({ label, value, Icon, tint, ic }, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="dash-card p-4 sm:p-5">
            <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${tint} flex items-center justify-center mb-3 ${ic}`}>
              <Icon className="w-5 h-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 leading-none break-words">{value}</p>
            <p className="text-xs sm:text-sm font-bold text-[#9a6b4b] mt-1.5">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick access */}
      <section>
        <h2 className="dash-section mb-3 ml-1">Quick Access</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {quickLinks.map(({ href, label, desc, Icon, tint, ic }, i) => (
            <motion.div key={href} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 + i * 0.04 }}>
              <Link href={href} className="dash-card dash-card-hover group flex flex-col gap-3 p-4 sm:p-5 h-full">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${tint} flex items-center justify-center ${ic} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <p className="font-black text-slate-900 text-[15px] leading-tight">{label}</p>
                  <p className="text-xs font-semibold text-[#9a6b4b] mt-0.5">{desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent bookings */}
      <section>
        <div className="flex items-center justify-between mb-3 mx-1">
          <h2 className="dash-section">Recent Bookings</h2>
          <Link href="/my-bookings" className="text-sm font-black text-orange-600 hover:text-orange-700 flex items-center gap-1 min-h-[36px]">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {recentBookings.length === 0 ? (
          <div className="dash-card p-8 sm:p-10 text-center">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-orange-50 flex items-center justify-center text-3xl mb-4">📅</div>
            <p className="text-slate-900 font-black text-lg">अभी कोई booking नहीं</p>
            <p className="text-[#9a6b4b] text-sm font-semibold mt-1 mb-5">अपनी अगली पूजा के लिए पंडित बुक करें</p>
            <Link href="/pandits" className="dash-btn">Book a Pandit</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recentBookings.map(b => (
              <div key={b._id} className="dash-card dash-card-hover p-4 flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-2xl flex-shrink-0">🕉️</div>
                <div className="min-w-0 flex-1">
                  <p className="font-black text-slate-900 truncate">{b.poojaType}</p>
                  <p className="text-sm font-semibold text-[#9a6b4b] truncate">
                    {b.pandit?.name} · {new Date(b.poojaDate).toLocaleDateString('en-IN')}
                  </p>
                </div>
                <span className={`text-[11px] font-black px-3 py-1 rounded-full border flex-shrink-0 uppercase ${statusStyle[b.status] || 'bg-gray-100 text-gray-700 border-gray-300'}`}>
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}