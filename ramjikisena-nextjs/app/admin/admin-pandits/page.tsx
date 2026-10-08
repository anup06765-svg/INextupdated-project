'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Phone, Star, BadgeCheck, Sparkles } from 'lucide-react';
import api from '@/lib/api';

interface PanditType {
  _id: string;
  name: string;
  photo?: string;
  experience?: number;
  specialization?: string[];
  location?: { city?: string; state?: string };
  contact?: { phone?: string; email?: string };
  averageRating?: number;
  totalBookings?: number;
  isVerified?: boolean;
}

// Admin ke liye sabhi pandits ki list (sirf dekhne ke liye - existing API /api/pandits use hoti hai)
export default function AdminPandits() {
  const [pandits, setPandits] = useState<PanditType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/api/pandits');
        const data = await res.json();
        if (data.success) setPandits(data.pandits);
      } catch (e) {
        console.error('Error fetching pandits:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return pandits;
    return pandits.filter(p =>
      p.name?.toLowerCase().includes(q) ||
      p.location?.city?.toLowerCase().includes(q) ||
      p.specialization?.some(s => s.toLowerCase().includes(q))
    );
  }, [pandits, search]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-slate-900 rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8 flex flex-wrap items-center gap-4">
        <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.25em]">Admin Panel</p>
          <h1 className="text-xl md:text-2xl font-black text-white">Pandits</h1>
        </div>
        <span className="bg-white/10 border border-white/10 text-white text-sm font-black px-4 py-2 rounded-2xl">
          {pandits.length} total
        </span>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Naam, shehar ya specialization se khojein..."
          className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-orange-100 rounded-2xl focus:border-orange-400 focus:outline-none font-semibold text-slate-700"
        />
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-[2rem] border border-orange-100 p-12 text-center">
          <div className="text-5xl mb-3">🙏</div>
          <p className="font-black text-slate-700">Koi pandit nahi mila</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((p, i) => (
            <motion.div key={p._id}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.04, 0.4) }}
              className="bg-white rounded-[1.5rem] border border-orange-100 shadow-sm hover:shadow-lg p-5 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-100 overflow-hidden flex items-center justify-center flex-shrink-0 text-3xl">
                  {p.photo
                    // eslint-disable-next-line @next/next/no-img-element
                    ? <img src={p.photo} alt={p.name} className="w-full h-full object-cover" />
                    : '🙏'}
                </div>
                <div className="min-w-0">
                  <p className="font-black text-slate-900 truncate flex items-center gap-1.5">
                    {p.name}
                    {p.isVerified && <BadgeCheck className="w-4 h-4 text-blue-500 flex-shrink-0" />}
                  </p>
                  <p className="text-xs font-bold text-slate-400">
                    {p.experience ? `${p.experience} saal ka anubhav` : 'Anubhav jaankari nahi'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {(p.specialization || []).slice(0, 4).map(s => (
                  <span key={s} className="text-[11px] font-black px-2.5 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-100">{s}</span>
                ))}
              </div>

              <div className="space-y-1.5 text-sm font-semibold text-slate-600">
                {(p.location?.city || p.location?.state) && (
                  <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400" /> {[p.location?.city, p.location?.state].filter(Boolean).join(', ')}</p>
                )}
                {p.contact?.phone && (
                  <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-slate-400" /> {p.contact.phone}</p>
                )}
              </div>

              <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 font-black text-amber-600">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {(p.averageRating ?? 0).toFixed(1)}
                </span>
                <span className="font-bold text-slate-500">{p.totalBookings ?? 0} bookings</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
