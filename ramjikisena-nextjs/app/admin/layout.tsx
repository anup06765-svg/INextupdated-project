'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import DashboardSidebar from '@/components/DashboardSidebar';

// Page ke naam (mobile top bar me dikhane ke liye)
const PAGE_TITLES: Record<string, string> = {
  '/admin/admin-dashboard': 'Dashboard',
  '/admin/users': 'All Users',
  '/admin/admin-mandirs': 'Mandirs',
  '/admin/admin-katha-vachaks': 'Katha Vachaks',
  '/admin/admin-pandits': 'Pandits',
  '/admin/admin-bookings': 'Bookings',
  '/admin/admin-blogs': 'All Blogs',
  '/admin/admin-blogs/pending': 'Pending Blogs',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const userStr = localStorage.getItem('user');
      if (!userStr) {
        router.push('/login');
        return;
      }

      const userData = JSON.parse(userStr);
      if (userData.role !== 'admin') {
        router.push('/dashboard');
        return;
      }

      setUser(userData);
      setLoading(false);
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/login');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFAF3]">
      <DashboardSidebar
        role="admin"
        userName={user?.name || 'Admin'}
        userPhoto={user?.profileImage}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
      />

      {/* Mobile top bar (menu button sidebar ke andar se aata hai) */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-30 h-[68px] bg-slate-900 border-b border-white/10 flex items-center pl-[72px] pr-4 shadow-lg">
        <div className="min-w-0">
          <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.25em] leading-none">Admin Panel</p>
          <p className="text-white font-black text-base truncate">{PAGE_TITLES[pathname] ?? 'Admin'}</p>
        </div>
      </div>

      {/* Content: sidebar ke collapse hone par margin bhi badalta hai */}
      <div className={`transition-all duration-300 ${collapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        <div className="p-4 sm:p-6 lg:p-8 pt-[84px] lg:pt-8">
          {children}
        </div>
      </div>
    </div>
  );
}
