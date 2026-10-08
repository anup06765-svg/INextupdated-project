'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Trophy, Flame } from 'lucide-react';

const getAuthHeaders = (): HeadersInit => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
};

interface User {
  _id: string; name: string; rank: number; totalCount: number;
  dailyCounts: Array<{ date: string; count: number }>;
}

const medal = (rank: number) => (rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : null);

export default function AllDevoteesPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/devotees`, {
      headers: getAuthHeaders(), credentials: 'include',
    }).then(res => {
      if (!res.ok) { router.push('/login'); return null; }
      return res.json();
    }).then(data => {
      if (data?.success) setUsers(data.users);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const filtered = search.trim()
    ? users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()))
    : users;

  const getTodayCount = (u: User) => {
    if (!u.dailyCounts?.length) return 0;
    const today = new Date().toDateString();
    const last = u.dailyCounts[u.dailyCounts.length - 1];
    return new Date(last.date).toDateString() === today ? last.count : 0;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  const top3 = !search.trim() ? users.filter(u => u.rank <= 3).sort((a, b) => a.rank - b.rank) : [];

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      <div>
        <h1 className="dash-title">All Devotees 🙏</h1>
        <p className="dash-sub">Sabhi bhakton ki list aur unka naam jaap</p>
      </div>

      {/* Top 3 */}
      {top3.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {top3.map(u => (
            <div key={u._id} className="dash-card p-4 flex items-center gap-3"
              style={u.rank === 1 ? { background: 'linear-gradient(135deg, #fff7e0, #ffedc2)', borderColor: '#fcd34d' } : undefined}>
              <div className="text-3xl">{medal(u.rank)}</div>
              <div className="min-w-0">
                <p className="font-black text-slate-900 truncate">{u.name}</p>
                <p className="text-xs font-bold text-[#9a6b4b] flex items-center gap-1">
                  <Trophy className="w-3 h-3" /> {u.totalCount.toLocaleString('en-IN')} jaap
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Search */}
      <div className="dash-card p-3 sm:p-4 flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-orange-400 pointer-events-none" />
          <input type="search" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Naam se bhakt khojein..." className="dash-input" style={{ paddingLeft: '3rem' }} />
        </div>
        <span className="text-sm font-black text-[#9a6b4b] whitespace-nowrap hidden sm:block">{filtered.length} devotees</span>
      </div>

      {/* List: mobile par cards, tablet/desktop par table */}
      {filtered.length === 0 ? (
        <div className="dash-card p-10 text-center">
          <div className="text-4xl mb-2">🔍</div>
          <p className="font-black text-slate-800">Koi devotee nahi mila</p>
          <p className="text-sm font-semibold text-[#9a6b4b] mt-1">Dusra naam try karein</p>
        </div>
      ) : (
        <>
          <div className="space-y-3 md:hidden">
            {filtered.map(u => (
              <div key={u._id} className="dash-card p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-black flex-shrink-0 text-white"
                  style={{ background: 'linear-gradient(145deg, #fb923c, #ea580c)' }}>
                  {medal(u.rank) || `#${u.rank}`}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-black text-slate-900 truncate">{u.name}</p>
                  <p className="text-xs font-bold text-blue-600 flex items-center gap-1 mt-0.5">
                    <Flame className="w-3 h-3" /> Aaj: {getTodayCount(u).toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-lg font-black text-green-600 leading-none">{u.totalCount.toLocaleString('en-IN')}</p>
                  <p className="text-[10px] font-bold text-[#9a6b4b] mt-1">Total</p>
                </div>
              </div>
            ))}
          </div>

          <div className="dash-card overflow-hidden hidden md:block">
            <div className="overflow-x-auto dash-scroll">
              <table className="w-full">
                <thead>
                  <tr style={{ background: 'linear-gradient(135deg, #fb923c, #ea580c)' }} className="text-white">
                    {['Rank', 'Name', "Today's Count", 'Total Count'].map(h => (
                      <th key={h} className="px-5 py-3.5 text-left text-sm font-black whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u, i) => (
                    <tr key={u._id} className={`border-b border-orange-50 hover:bg-orange-50 transition-colors ${i % 2 ? 'bg-orange-50/30' : 'bg-white'}`}>
                      <td className="px-5 py-3.5 font-black text-red-500 whitespace-nowrap">{medal(u.rank) || `#${u.rank}`}</td>
                      <td className="px-5 py-3.5 font-bold text-slate-900">{u.name}</td>
                      <td className="px-5 py-3.5 font-bold text-blue-600">{getTodayCount(u).toLocaleString('en-IN')}</td>
                      <td className="px-5 py-3.5 font-black text-green-600">{u.totalCount.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}