'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, User, History, Users, BookOpen,
  PenSquare, Calendar, Home, LogOut,
  ChevronLeft, ChevronRight, Menu, X, MessageSquare, Flag,
} from 'lucide-react';

interface SidebarLink {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface UserSidebarProps {
  userName: string;
  userPhoto?: string;
  rank?: number;
}

const links: SidebarLink[] = [
  { href: '/dashboard',   label: 'Dashboard',      icon: LayoutDashboard },
  { href: '/profile',     label: 'My Profile',     icon: User },
  { href: '/history',     label: 'Lekhan History', icon: History },
  { href: '/devotees',    label: 'All Devotees',   icon: Users },
  { href: '/my-bookings', label: 'My Bookings',    icon: Calendar },
  { href: '/blogs',       label: 'Blogs',          icon: BookOpen },
  { href: '/my-blogs',    label: 'My Blogs',       icon: PenSquare },
  { href: '/community',   label: 'Community',      icon: MessageSquare },
];

/* Mobile bottom bar me sirf sabse zaruri 4 links */
const bottomLinks = ['/dashboard', '/history', '/community', '/profile'];

export default function UserSidebar({ userName, userPhoto, rank }: UserSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Page badalne par mobile menu band + body scroll lock
  useEffect(() => { setMobileOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Desktop sidebar ki chaudai layout ko batane ke liye (CSS variable)
  useEffect(() => {
    document.documentElement.style.setProperty('--dash-side', collapsed ? '5rem' : '17rem');
  }, [collapsed]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  const renderContent = (isCollapsed: boolean, isMobile: boolean) => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      {/* <div className={`flex items-center gap-2.5 pt-5 pb-3 ${isCollapsed ? 'justify-center px-2' : 'px-5'}`}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #f9e07a, #d4920a)' }}>
          <Flag className="w-4 h-4" style={{ color: '#5a1a00' }} />
        </div>
        {!isCollapsed && (
          <p className="text-[13px] font-black tracking-tight text-white leading-none">
            JAI SHRI <span style={{ color: '#f9e07a' }}>RAM NAAM</span>
          </p>
        )}
      </div> */}

      {/* Profile card */}
        <div className={`${isCollapsed ? 'px-2' : 'px-4'} pt-5 pb-4`}>
        <Link href="/profile"
          title={isCollapsed ? userName : undefined}
          className={`flex items-center gap-3 rounded-2xl p-2.5 transition-colors hover:bg-white/[0.07] ${isCollapsed ? 'justify-center' : ''}`}
          style={{ background: 'rgba(255,255,255,0.045)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
            style={{ background: 'linear-gradient(145deg, rgba(251,146,60,0.35), rgba(234,88,12,0.2))', border: '1px solid rgba(251,146,60,0.45)' }}>
            {userPhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={userPhoto} alt={userName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-lg font-black text-orange-200">{userName?.charAt(0)?.toUpperCase() || 'U'}</span>
            )}
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: '#f9e07a' }}>
                {rank ? `🏆 Rank #${rank}` : 'Devotee'}
              </p>
              <p className="font-black text-white text-[15px] truncate leading-tight mt-0.5">{userName}</p>
            </div>
          )}
        </Link>
      </div>

      {/* Nav */}
      <nav aria-label="Dashboard menu" className="flex-1 overflow-y-auto dash-side-scroll px-3 pb-2 space-y-1">
        {!isCollapsed && (
          <p className="text-[10px] font-black text-white/35 uppercase tracking-[0.22em] px-3 mb-2">Menu</p>
        )}
        {links.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link key={href} href={href}
              title={isCollapsed ? label : undefined}
              aria-current={active ? 'page' : undefined}
              className={`group relative flex items-center gap-3 min-h-[48px] px-3.5 rounded-2xl transition-all active:scale-[0.97]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f9e07a]/70
                ${isCollapsed ? 'justify-center' : ''}
                ${active ? 'text-white' : 'text-white/65 hover:text-white hover:bg-white/[0.08]'}`}
              style={active ? {
                background: 'linear-gradient(135deg, #fb923c, #ea580c)',
                boxShadow: '0 10px 22px -8px rgba(234,88,12,0.7), inset 0 1px 0 rgba(255,255,255,0.3)',
              } : undefined}>
              <Icon className={`w-[22px] h-[22px] flex-shrink-0 transition-transform ${active ? '' : 'group-hover:scale-110'}`} />
              {!isCollapsed && <span className="text-[15px] font-bold truncate">{label}</span>}
              {active && !isCollapsed && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/80" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className={`p-3 space-y-1.5 ${isCollapsed ? 'px-2' : ''}`} style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <Link href="/" title={isCollapsed ? 'Home' : undefined}
          className={`flex items-center gap-3 min-h-[46px] px-3.5 rounded-2xl text-white/65 hover:bg-white/[0.08] hover:text-white transition-all active:scale-[0.97] ${isCollapsed ? 'justify-center' : ''}`}>
          <Home className="w-[22px] h-[22px] flex-shrink-0" />
          {!isCollapsed && <span className="text-[15px] font-bold">Home</span>}
        </Link>
        <button onClick={handleLogout} title={isCollapsed ? 'Logout' : undefined}
          className={`w-full flex items-center gap-3 min-h-[46px] px-3.5 rounded-2xl text-red-300 hover:bg-red-500 hover:text-white transition-all active:scale-[0.97] ${isCollapsed ? 'justify-center' : ''}`}
          style={{ background: 'rgba(239,68,68,0.14)', border: '1px solid rgba(239,68,68,0.25)' }}>
          <LogOut className="w-[22px] h-[22px] flex-shrink-0" />
          {!isCollapsed && <span className="text-[15px] font-bold">Logout</span>}
        </button>
        {!isMobile && (
          <button onClick={() => setCollapsed(c => !c)} aria-label={collapsed ? 'Sidebar kholein' : 'Sidebar chhota karein'}
            className="hidden lg:flex w-full items-center justify-center py-2 text-white/35 hover:text-white transition-colors">
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <><ChevronLeft className="w-4 h-4" /><span className="text-[11px] font-bold ml-1">Collapse</span></>}
          </button>
        )}
      </div>
    </div>
  );

  const sideBg = 'linear-gradient(180deg, #1a0e07 0%, #120904 60%, #0d0603 100%)';

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-40 flex items-center justify-between gap-3 px-4 pb-2.5"
        style={{
          paddingTop: 'calc(env(safe-area-inset-top, 0px) + 0.625rem)',
          background: 'rgba(18,9,4,0.96)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(212,146,10,0.25)',
        }}>
        <button onClick={() => setMobileOpen(true)} aria-label="Menu kholein" aria-expanded={mobileOpen}
          className="w-11 h-11 rounded-xl flex items-center justify-center text-white bg-white/10 border border-white/15 active:scale-90 transition-transform">
          <Menu className="w-5 h-5" />
        </button>
        {/* <p className="text-sm font-black text-white tracking-tight">
          JAI SHRI <span style={{ color: '#f9e07a' }}>RAM NAAM</span>
        </p> */}
        <Link href="/profile" aria-label="Profile"
          className="w-11 h-11 rounded-xl flex items-center justify-center overflow-hidden font-black text-orange-200 active:scale-90 transition-transform"
          style={{ background: 'rgba(251,146,60,0.2)', border: '1px solid rgba(251,146,60,0.45)' }}>
          {userPhoto
            // eslint-disable-next-line @next/next/no-img-element
            ? <img src={userPhoto} alt={userName} className="w-full h-full object-cover" />
            : (userName?.charAt(0)?.toUpperCase() || 'U')}
        </Link>
      </div>

      {/* Desktop sidebar */}
      <aside className={`hidden lg:flex fixed left-0 top-0 h-screen flex-col transition-all duration-300 z-40 ${collapsed ? 'w-20' : 'w-[17rem]'}`}
        style={{ background: sideBg, borderRight: '1px solid rgba(212,146,10,0.2)' }}>
        {renderContent(collapsed, false)}
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]" />
            <motion.aside
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              role="dialog" aria-modal="true" aria-label="Menu"
              className="lg:hidden fixed left-0 top-0 h-[100dvh] w-[86%] max-w-xs z-[70] flex flex-col"
              style={{ background: sideBg, borderRight: '1px solid rgba(212,146,10,0.25)', paddingTop: 'env(safe-area-inset-top, 0px)', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
              <button onClick={() => setMobileOpen(false)} aria-label="Menu band karein"
                className="absolute top-3 right-3 w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white active:scale-90 transition-all z-10">
                <X className="w-5 h-5" />
              </button>
              {renderContent(false, true)}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Mobile bottom tab bar */}
      <nav aria-label="Quick tabs"
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 grid grid-cols-5"
        style={{
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          background: 'rgba(18,9,4,0.97)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
          borderTop: '1px solid rgba(212,146,10,0.25)',
        }}>
        {links.filter(l => bottomLinks.includes(l.href)).map(({ href, label, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link key={href} href={href} aria-current={active ? 'page' : undefined}
              className={`flex flex-col items-center justify-center gap-0.5 min-h-[56px] text-[10px] font-bold active:scale-90 transition-transform ${active ? 'text-[#f9e07a]' : 'text-white/55'}`}>
              <Icon className="w-5 h-5" />
              <span className="truncate max-w-full px-1">{label.split(' ')[0]}</span>
            </Link>
          );
        })}
        <button onClick={() => setMobileOpen(true)}
          className="flex flex-col items-center justify-center gap-0.5 min-h-[56px] text-[10px] font-bold text-white/55 active:scale-90 transition-transform">
          <Menu className="w-5 h-5" />
          <span>More</span>
        </button>
      </nav>
    </>
  );
}