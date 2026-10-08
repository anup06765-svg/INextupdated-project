'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import UserSidebar from '@/components/UserSidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        if (userData.role === 'admin') {
          router.push('/admin/admin-dashboard');
          return;
        }
        setUser(userData);
        setLoading(false);
        return;
      } catch {}
    }

    // user object missing - fetch from API
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3100';
    fetch(`${API_URL}/api/me`, {
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then(res => {
        if (res.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/login');
          return null;
        }
        return res.ok ? res.json() : null;
      })
      .then(data => {
        if (data?.success && data.user) {
          if (data.user.role === 'admin') {
            router.push('/admin/admin-dashboard');
            return;
          }
          localStorage.setItem('user', JSON.stringify(data.user));
          setUser(data.user);
        } else {
          router.push('/login');
        }
      })
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="clay-bg flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-orange-700 font-black">जय श्री राम...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dash-shell min-h-screen relative overflow-x-clip"
      style={{ background: 'linear-gradient(165deg, #fff4e6 0%, #ffe9d2 55%, #ffeedd 100%)' }}>
      <UserSidebar
        userName={user?.name || 'Devotee'}
        userPhoto={user?.photo || user?.profileImage}
        rank={user?.rank}
      />

      {/* Content: desktop par sidebar ki jagah chhodta hai, mobile par top bar + bottom tabs ki */}
      <div className="lg:ml-[var(--dash-side,17rem)] transition-[margin] duration-300">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
          className="dash-main px-4 sm:px-6 lg:px-10">
          {children}
        </motion.main>
      </div>
    </div>
  );
}