'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, BookOpen, Church, Scroll, User as UserIcon,
  Image as ImageIcon, Phone, Calendar, BarChart3, Flag,
  Sparkles, ShoppingBag, Users, HelpCircle, Compass,
  LogOut, Crown, Menu, X, Star, MessageSquare, Home
} from 'lucide-react';
import { requestGlobalNavigation } from '@/lib/jaapContext';
interface NavbarProps { showAuthButtons?: boolean; }

/*
const exploreLinks = [
  { href: '/katha-vachaks', label: 'कथा वाचक',       icon: Scroll,       desc: 'Find katha vachaks',            color: 'text-purple-600 bg-purple-50' },
  { href: '/forum',         label: 'फोरम',            icon: HelpCircle,   desc: 'Ask spiritual questions',       color: 'text-teal-600 bg-teal-50' },
  { href: '/gallery',       label: 'गैलरी',           icon: ImageIcon,    desc: 'Divine moments & events',       color: 'text-pink-600 bg-pink-50' },
  { href: '/glory',         label: 'राम महिमा',       icon: Star,         desc: 'Glory of Ram Naam',             color: 'text-amber-600 bg-amber-50' },
  { href: '/mission',       label: 'हमारा मिशन',      icon: Flag,         desc: 'Our spiritual mission',         color: 'text-red-600 bg-red-50' },
  { href: '/about',         label: 'हमारे बारे में',  icon: BookOpen,     desc: 'About Jai Shri Ram Naam',       color: 'text-indigo-600 bg-indigo-50' },
  { href: '/contact',       label: 'संपर्क',          icon: Phone,        desc: 'Get in touch with us',          color: 'text-slate-600 bg-slate-50' },
  { href: '/blogs',         label: 'ब्लॉग',           icon: MessageSquare,desc: 'Spiritual blogs & articles',    color: 'text-cyan-600 bg-cyan-50' },
];
*/
const exploreLinks = [
  { href: '/katha-vachaks', label: 'कथा वाचक',       icon: Scroll,        desc: 'Find katha vachaks',          accent: '#c4a4ff' },
  { href: '/forum',         label: 'फोरम',            icon: HelpCircle,    desc: 'Ask spiritual questions',     accent: '#5eead4' },
  { href: '/gallery',       label: 'गैलरी',           icon: ImageIcon,     desc: 'Divine moments & events',     accent: '#f9a8d4' },
  { href: '/glory',         label: 'राम महिमा',       icon: Star,          desc: 'Glory of Ram Naam',           accent: '#fcd34d' },
  { href: '/mission',       label: 'हमारा मिशन',      icon: Flag,          desc: 'Our spiritual mission',       accent: '#fca5a5' },
  { href: '/about',         label: 'हमारे बारे में',  icon: BookOpen,      desc: 'About Jai Shri Ram Naam',     accent: '#a5b4fc' },
  { href: '/contact',       label: 'संपर्क',          icon: Phone,         desc: 'Get in touch with us',        accent: '#fdba74' },
  { href: '/blogs',         label: 'ब्लॉग',           icon: MessageSquare, desc: 'Spiritual blogs & articles',  accent: '#67e8f9' },
];

const mainLinks = [
  { href: '/mandirs',   label: 'Mandirs',   icon: Church },
  { href: '/pandits',   label: 'Pandits',   icon: Sparkles },
  // { href: '/samagri',   label: 'Samagri',   icon: ShoppingBag }, // Pooja Samagri (commented)
  { href: '/community', label: 'Community', icon: Users },
];

/* ---------- Button styles (yaha se sab buttons ka look badal sakte hain) ---------- */
// Desktop menu ka button: bada tap area, hover glow, dabane par chhota hota hai (active:scale)
const navBtn =
  'relative inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl text-[15px] font-bold whitespace-nowrap select-none ' +
  'transition-all duration-200 active:scale-95 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f9e07a]/80';
const navIdle = 'text-white/80 hover:text-white hover:bg-white/10 hover:shadow-[0_4px_14px_rgba(0,0,0,0.25)]';
// Jo page khula hai uska sunehra "active" look
const goldActive: React.CSSProperties = {
  background: 'linear-gradient(135deg, #d4920a, #f9e07a, #b8760a)',
  color: '#3a0f00',
  boxShadow: '0 6px 16px rgba(180,100,0,0.45), inset 0 1px 0 rgba(255,255,255,0.45)',
};
// Mobile drawer ke bade buttons
const mBtn =
  'flex items-center gap-2.5 px-3.5 py-3 min-h-[52px] rounded-2xl text-[15px] font-bold transition-all active:scale-[0.97] ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f9e07a]/80';

export default function Navbar({ showAuthButtons = true }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const navigate = (href: string) => {
    router.push(href);
    setExploreOpen(false);
    setUserMenuOpen(false);
    setLoginOpen(false);
    setMobileOpen(false);
  };

  const safeNavigate = (href: string) => {
    requestGlobalNavigation(href, navigate);
    setExploreOpen(false);
    setUserMenuOpen(false);
    setLoginOpen(false);
    setMobileOpen(false);
  };

  const [auth, setAuth] = useState({
    isLoggedIn: false, isPanditLoggedIn: false,
    userName: '', panditName: '', isAdmin: false,
  });
  const isHomePage = pathname === '/';
  const [scrolled, setScrolled]           = useState(false);
  const [exploreOpen, setExploreOpen]     = useState(false);
  const [userMenuOpen, setUserMenuOpen]   = useState(false);
  const [loginOpen, setLoginOpen]         = useState(false);
  const [mobileOpen, setMobileOpen]       = useState(false);

  const exploreRef  = useRef<HTMLDivElement>(null);
  const userRef     = useRef<HTMLDivElement>(null);
  const loginRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const token      = localStorage.getItem('token');
    const panditTok  = localStorage.getItem('panditToken');
    const user       = JSON.parse(localStorage.getItem('user')   || '{}');
    const pandit     = JSON.parse(localStorage.getItem('pandit') || '{}');
    setAuth({
      isLoggedIn:       !!token,
      isPanditLoggedIn: !!panditTok,
      userName:         user.name   || 'User',
      panditName:       pandit.name || 'Pandit',
      isAdmin:          user.role   === 'admin',
    });
  }, []);

  // Bahar click / touch karne par dropdown band (mobile touch par bhi kaam karta hai)
  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      const t = e.target as Node;
      if (exploreRef.current && !exploreRef.current.contains(t)) setExploreOpen(false);
      if (userRef.current   && !userRef.current.contains(t))    setUserMenuOpen(false);
      if (loginRef.current  && !loginRef.current.contains(t))   setLoginOpen(false);
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, []);

  // Esc dabane par sab menu band
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setExploreOpen(false); setUserMenuOpen(false); setLoginOpen(false); setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Page badalne par mobile menu band
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Mobile menu khula ho to peeche ka page scroll na ho
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const logout = (type: 'user' | 'pandit') => {
    // 1. Clear all localStorage
    localStorage.clear();

    // 2. Clear all cookies
    document.cookie.split(';').forEach(c => {
      const key = c.trim().split('=')[0];
      document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
      document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;domain=${window.location.hostname}`;
    });

    // 3. Call backend logout to clear server-side cookie
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3100';
    fetch(`${apiUrl}/api/logout`, { method: 'GET', credentials: 'include' })
      .finally(() => { window.location.href = '/'; });
  };

  const dashboardHref = auth.isAdmin ? '/admin/admin-dashboard' : '/dashboard';
  const isActive = (p: string) => pathname === p;

  return (
    <>
      <header
        className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
          isHomePage
            ? scrolled ? 'py-2 shadow-2xl shadow-black/40' : 'bg-transparent py-3 md:py-4'
            : 'py-2.5 md:py-3 shadow-lg'
        }`}
        style={
          !isHomePage
            ? { background: 'rgba(15,5,0,0.97)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(200,130,0,0.2)' }
            : scrolled
            ? { background: 'rgba(15,5,0,0.96)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(200,130,0,0.15)' }
            : {}
        }
      >
        {/* iPhone notch ke neeche se shuru hone ke liye (baki devices par 0) */}
        <div style={{ height: 'env(safe-area-inset-top, 0px)' }} />

        <div className="container mx-auto flex items-center justify-between gap-3 md:gap-4"
          style={{
            paddingLeft: 'max(1rem, env(safe-area-inset-left))',
            paddingRight: 'max(1rem, env(safe-area-inset-right))',
          }}>

          {/* Logo */}
          <button onClick={() => safeNavigate('/')} aria-label="Home"
            className="flex items-center gap-3 group flex-shrink-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f9e07a]/80 active:scale-95 transition-transform">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform"
              style={{ background: 'linear-gradient(135deg, #f9e07a 0%, #d4920a 60%, #b8760a 100%)', boxShadow: '0 4px 12px rgba(180,100,0,0.4)' }}>
              <Flag className="w-5 h-5" style={{ color: '#5a1a00' }} />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-base md:text-lg font-black tracking-tighter text-white leading-none">
                JAI SHRI <span style={{ color: '#f9e07a' }}>RAM NAAM</span>
              </p>
              <p className="text-[10px] text-white/50 tracking-[0.2em] uppercase mt-1">Spiritual Portal</p>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav aria-label="Main" className="hidden lg:flex items-center gap-1 rounded-2xl p-1 backdrop-blur-md"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(200,130,0,0.25)' }}>

            {/* Home Button */}
            <button onClick={() => safeNavigate('/')}
              aria-current={isActive('/') ? 'page' : undefined}
              className={`${navBtn} ${isActive('/') ? '' : navIdle}`}
              style={isActive('/') ? goldActive : {}}>
              <Home className="w-4 h-4" /> Home
            </button>

            {mainLinks.map(({ href, label, icon: Icon }) => (
              <button key={href} onClick={() => safeNavigate(href)}
                aria-current={isActive(href) ? 'page' : undefined}
                className={`${navBtn} ${isActive(href) ? '' : navIdle}`}
                style={isActive(href) ? goldActive : {}}>
                <Icon className="w-4 h-4" /> {label}
              </button>
            ))}

            {/* Explore Dropdown */}
            <div className="relative" ref={exploreRef}>
              <button
                aria-haspopup="true" aria-expanded={exploreOpen}
                onClick={() => { setExploreOpen(o => !o); setUserMenuOpen(false); setLoginOpen(false); }}
                className={`${navBtn} ${exploreOpen ? 'bg-white/15 text-white' : navIdle}`}>
                <Compass className="w-4 h-4" />
                Explore
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${exploreOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {exploreOpen && (
                  
                                    <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 14px)',
                      right: '0',
                      width: 'min(540px, calc(100vw - 2rem))',
                      zIndex: 9999,
                    }}
                  >
                    {/* Arrow */}
                    <div className="absolute -top-1.5 right-10 w-3.5 h-3.5 rotate-45"
                      style={{ background: '#1f1006', border: '1px solid rgba(212,146,10,0.45)', borderBottom: 'none', borderRight: 'none' }} />

                    {/* Solid panel (peeche ka text ab nahi dikhega) */}
                    <div className="relative rounded-3xl overflow-hidden"
                      style={{
                        background: 'linear-gradient(180deg, #1f1006 0%, #150a03 100%)',
                        border: '1px solid rgba(212,146,10,0.4)',
                        boxShadow: '0 30px 70px -10px rgba(0,0,0,0.75), 0 0 0 1px rgba(0,0,0,0.4)',
                      }}>
                      {/* Header */}
                      <div className="px-5 py-4 flex items-center justify-between"
                        style={{ borderBottom: '1px solid rgba(212,146,10,0.25)', background: 'linear-gradient(135deg, rgba(212,146,10,0.18), rgba(212,146,10,0.04))' }}>
                        <div>
                          <p className="text-[11px] font-black uppercase tracking-[0.25em]" style={{ color: 'rgba(249,224,122,0.75)' }}>सभी सेवाएं</p>
                          <p className="text-lg font-black text-white leading-tight mt-0.5">Explore Everything</p>
                        </div>
                        <div className="text-[12px] font-bold px-3.5 py-1.5 rounded-full"
                          style={{ background: 'rgba(212,146,10,0.18)', color: '#f9e07a', border: '1px solid rgba(212,146,10,0.4)' }}>
                          🚩 Jai Shri Ram Naam
                        </div>
                      </div>

                      {/* Grid: 2 columns, icon left + text right */}
                      <div className="p-3 grid grid-cols-2 gap-2">
                        {exploreLinks.map(({ href, label, icon: Icon, desc, accent }, i) => (
                          <motion.button key={href}
                            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.03 * i, duration: 0.2 }}
                            onClick={() => safeNavigate(href)}
                            aria-current={isActive(href) ? 'page' : undefined}
                            className="group flex items-center gap-3.5 p-3 rounded-2xl text-left w-full border transition-all active:scale-[0.97] hover:-translate-y-0.5 hover:bg-[#d4920a]/15 hover:border-[#d4920a]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f9e07a]/70"
                            style={{
                              background: isActive(href) ? 'rgba(212,146,10,0.18)' : 'rgba(255,255,255,0.035)',
                              borderColor: isActive(href) ? 'rgba(212,146,10,0.55)' : 'rgba(255,255,255,0.07)',
                            }}>
                            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                              style={{ background: `${accent}1f`, border: `1px solid ${accent}55` }}>
                              <Icon className="w-5 h-5" style={{ color: accent }} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[15px] font-black leading-tight text-white">{label}</p>
                              <p className="text-xs leading-snug mt-0.5 text-white/60">{desc}</p>
                            </div>
                          </motion.button>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="px-5 py-3.5 flex items-center justify-between gap-3"
                        style={{ borderTop: '1px solid rgba(212,146,10,0.25)', background: 'rgba(212,146,10,0.07)' }}>
                        <p className="text-xs font-semibold" style={{ color: 'rgba(249,224,122,0.8)' }}>🙏 जय श्री राम — सेवा में आपका स्वागत है</p>
                        <button onClick={() => safeNavigate(dashboardHref)}
                          className="text-xs font-black flex items-center gap-1 px-4 min-h-[36px] rounded-full transition-all hover:brightness-110 active:scale-95"
                          style={{ background: 'linear-gradient(135deg, #f9e07a, #d4920a)', color: '#3a0f00', boxShadow: '0 4px 12px rgba(180,100,0,0.4)' }}>
                          Dashboard →
                        </button>
                      </div>
                    </div>
                  </motion.div>
                  
                  // <motion.div
                  //   initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  //   animate={{ opacity: 1, y: 0, scale: 1 }}
                  //   exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  //   transition={{ duration: 0.15 }}
                  //   style={{
                  //     position: 'absolute',
                  //     top: 'calc(100% + 10px)',
                  //     right: '0',
                  //     width: 'min(480px, calc(100vw - 2rem))',
                  //     zIndex: 9999,
                  //   }}
                  // >
                  //   {/* Arrow pointing to Explore button */}
                  //   <div className="flex justify-end pr-8 mb-1">
                  //     <div className="w-3 h-3 rotate-45" style={{ background: 'rgba(15,5,0,0.97)', border: '1px solid rgba(200,130,0,0.3)', borderBottom: 'none', borderRight: 'none' }} />
                  //   </div>
                  //   <div className="rounded-[1.5rem] shadow-2xl overflow-hidden"
                  //     style={{ background: 'rgba(15,5,0,0.97)', border: '1px solid rgba(200,130,0,0.3)', backdropFilter: 'blur(20px)' }}>
                  //     {/* Header */}
                  //     <div className="px-4 py-3 border-b"
                  //       style={{ borderColor: 'rgba(200,130,0,0.2)', background: 'rgba(212,146,10,0.08)' }}>
                  //       <div className="flex items-center justify-between">
                  //         <div>
                  //           <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: 'rgba(249,224,122,0.6)' }}>सभी सेवाएं</p>
                  //           <p className="text-base font-black text-white">Explore Everything</p>
                  //         </div>
                  //         <div className="flex items-center gap-1 text-[11px] font-bold px-3 py-1.5 rounded-full"
                  //           style={{ background: 'rgba(212,146,10,0.15)', color: '#f9e07a', border: '1px solid rgba(212,146,10,0.3)' }}>
                  //           🚩 Jai Shri Ram Naam
                  //         </div>
                  //       </div>
                  //     </div>

                  //     {/* Grid */}
                  //     <div className="p-3 grid grid-cols-4 gap-1.5">
                  //       {exploreLinks.map(({ href, label, icon: Icon, desc }) => (
                  //         <button key={href} onClick={() => safeNavigate(href)}
                  //           className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all group text-center w-full border border-transparent hover:bg-[#d4920a]/15 hover:border-[#d4920a]/30 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f9e07a]/70">
                  //           <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                  //             style={{ background: 'rgba(212,146,10,0.15)', border: '1px solid rgba(212,146,10,0.25)' }}>
                  //             <Icon className="w-5 h-5" style={{ color: '#f9e07a' }} />
                  //           </div>
                  //           <div>
                  //             <p className="text-[13px] font-black leading-tight text-white">{label}</p>
                  //             <p className="text-[11px] leading-tight mt-1 text-white/45">{desc}</p>
                  //           </div>
                  //         </button>
                  //       ))}
                  //     </div>

                  //     {/* Footer */}
                  //     <div className="px-4 py-3 flex items-center justify-between gap-2"
                  //       style={{ borderTop: '1px solid rgba(200,130,0,0.2)', background: 'rgba(212,146,10,0.05)' }}>
                  //       <p className="text-[11px] font-medium" style={{ color: 'rgba(249,224,122,0.6)' }}>🙏 जय श्री राम — सेवा में आपका स्वागत है</p>
                  //       <button onClick={() => safeNavigate('/dashboard')}
                  //         className="text-[11px] font-black flex items-center gap-1 px-3 py-1.5 rounded-full transition-all hover:bg-[#d4920a]/30 active:scale-95"
                  //         style={{ color: '#f9e07a', background: 'rgba(212,146,10,0.15)', border: '1px solid rgba(212,146,10,0.3)' }}>
                  //         Dashboard →
                  //       </button>
                  //     </div>
                  //   </div>
                  // </motion.div>
                  
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right: Auth */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            {showAuthButtons && (
              <>
                {auth.isLoggedIn ? (
                  <div className="relative" ref={userRef}>
                    <button
                      aria-haspopup="true" aria-expanded={userMenuOpen}
                      onClick={() => { setUserMenuOpen(o => !o); setExploreOpen(false); }}
                      className="flex items-center gap-2 min-h-[44px] bg-white/10 border border-white/15 hover:bg-white/15 transition-all px-3 py-2 rounded-2xl active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f9e07a]/80">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-black ${auth.isAdmin ? 'bg-orange-600' : 'bg-white/20'}`}>
                        {auth.isAdmin ? <Crown className="w-4 h-4" /> : auth.userName[0]?.toUpperCase()}
                      </div>
                      <span className="text-white text-[15px] font-bold max-w-[110px] truncate">{auth.userName}</span>
                      {auth.isAdmin && <span className="text-[10px] bg-orange-600 text-white px-1.5 py-0.5 rounded-full font-black">ADMIN</span>}
                      <ChevronDown className={`w-4 h-4 text-white/60 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {userMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-full mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50">
                          <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                            <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Signed in as</p>
                            <p className="text-base font-black text-slate-900 truncate">{auth.userName}</p>
                          </div>
                          <div className="p-1.5 space-y-0.5">
                            <button onClick={() => safeNavigate(dashboardHref)}
                              className="w-full flex items-center gap-2.5 px-3 py-3 rounded-xl text-[15px] font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-700 active:scale-[0.98] transition-all">
                              <BarChart3 className="w-4 h-4" />
                              {auth.isAdmin ? 'Admin Dashboard' : 'Dashboard'}
                            </button>
                            {!auth.isAdmin && (
                              <>
                                <button onClick={() => safeNavigate('/my-bookings')}
                                  className="w-full flex items-center gap-2.5 px-3 py-3 rounded-xl text-[15px] font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-700 active:scale-[0.98] transition-all">
                                  <Calendar className="w-4 h-4" /> My Bookings
                                </button>
                                {/* Pooja Samagri Orders (commented)
                                <button onClick={() => safeNavigate('/samagri/orders')}
                                  className="w-full flex items-center gap-2.5 px-3 py-3 rounded-xl text-[15px] font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-700 transition-all">
                                  <ShoppingBag className="w-4 h-4" /> My Orders
                                </button>
                                */}
                              </>
                            )}
                          </div>
                          <div className="p-1.5 border-t border-slate-100">
                            <button onClick={() => logout('user')}
                              className="w-full flex items-center gap-2.5 px-3 py-3 rounded-xl text-[15px] font-bold text-red-600 hover:bg-red-50 active:scale-[0.98] transition-all">
                              <LogOut className="w-4 h-4" /> Logout
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : auth.isPanditLoggedIn ? (
                  <div className="flex items-center gap-2">
                    <button onClick={() => safeNavigate('/pandit/dashboard')}
                      className="flex items-center gap-2 min-h-[44px] bg-white/10 border border-white/15 px-4 py-2 rounded-2xl text-white text-[15px] font-bold hover:bg-white/15 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f9e07a]/80">
                      <Sparkles className="w-4 h-4 text-orange-400" />
                      {auth.panditName}
                    </button>
                    <button onClick={() => logout('pandit')} aria-label="Logout"
                      className="w-11 h-11 flex items-center justify-center bg-red-500/20 text-red-300 hover:bg-red-500 hover:text-white rounded-xl active:scale-95 transition-all">
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2" ref={loginRef}>
                    <button onClick={() => { setLoginOpen(o => !o); setExploreOpen(false); }}
                      aria-haspopup="true" aria-expanded={loginOpen}
                      className="flex items-center gap-1.5 min-h-[44px] text-white/85 hover:text-white text-[15px] font-bold px-4 py-2 rounded-xl hover:bg-white/10 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f9e07a]/80">
                      Login <ChevronDown className={`w-4 h-4 transition-transform ${loginOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <button onClick={() => safeNavigate('/register')}
                      className="font-black px-6 py-2.5 min-h-[44px] rounded-xl text-[15px] active:scale-95 hover:brightness-110 hover:-translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                      style={{
                        background: 'linear-gradient(135deg, #f9e07a 0%, #d4920a 50%, #b8760a 100%)',
                        color: '#3a0f00',
                        boxShadow: '0 6px 18px rgba(180,100,0,0.45), inset 0 1px 0 rgba(255,255,255,0.45)',
                      }}>
                      Sign Up
                    </button>

                    <AnimatePresence>
                      {loginOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-5 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50">
                          <button onClick={() => safeNavigate('/login')}
                            className="w-full flex items-center gap-3 px-4 py-3.5 text-[15px] font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-700 active:bg-orange-100 transition-all border-b border-slate-100">
                            <UserIcon className="w-4 h-4" /> User Login
                          </button>
                          <button onClick={() => safeNavigate('/pandit/login')}
                            className="w-full flex items-center gap-3 px-4 py-3.5 text-[15px] font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-700 active:bg-orange-100 transition-all">
                            <Sparkles className="w-4 h-4" /> Pandit Login
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Menu band karein' : 'Menu kholein'} aria-expanded={mobileOpen}
            className="lg:hidden w-11 h-11 flex items-center justify-center bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/15 active:scale-90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f9e07a]/80">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[98]" />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              role="dialog" aria-modal="true" aria-label="Menu"
              className="lg:hidden fixed top-0 right-0 h-[100dvh] w-[88%] max-w-sm bg-slate-950 border-l border-white/10 z-[99] flex flex-col overflow-y-auto overscroll-contain"
              style={{ paddingTop: 'env(safe-area-inset-top, 0px)', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>

              {/* Mobile Header */}
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #f9e07a, #d4920a)' }}>
                    <Flag className="w-5 h-5" style={{ color: '#5a1a00' }} />
                  </div>
                  <p className="text-base font-black text-white">JAI SHRI <span style={{ color: '#f9e07a' }}>RAM NAAM</span></p>
                </div>
                <button onClick={() => setMobileOpen(false)} aria-label="Menu band karein"
                  className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center text-white active:scale-90 transition-all">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 p-4 space-y-6">
                {/* Main Links */}
                <div>
                  <p className="text-[11px] font-black text-white/40 uppercase tracking-[0.25em] mb-2.5 px-1">Main</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => safeNavigate('/')}
                      className={`${mBtn} ${isActive('/') ? '' : 'bg-white/5 text-white/85 hover:bg-white/10'}`}
                      style={isActive('/') ? goldActive : {}}>
                      <Home className="w-5 h-5" /> Home
                    </button>
                    {mainLinks.map(({ href, label, icon: Icon }) => (
                      <button key={href} onClick={() => safeNavigate(href)}
                        className={`${mBtn} ${isActive(href) ? '' : 'bg-white/5 text-white/85 hover:bg-white/10'}`}
                        style={isActive(href) ? goldActive : {}}>
                        <Icon className="w-5 h-5" /> {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Explore */}
                <div>
                  <p className="text-[11px] font-black text-white/40 uppercase tracking-[0.25em] mb-2.5 px-1">Explore</p>
                  <div className="grid grid-cols-2 gap-2">
                    {exploreLinks.map(({ href, label, icon: Icon }) => (
                      <button key={href} onClick={() => safeNavigate(href)}
                        className={`${mBtn} ${isActive(href) ? '' : 'bg-white/5 text-white/80 hover:bg-white/10 hover:text-white'}`}
                        style={isActive(href) ? goldActive : {}}>
                        <Icon className="w-5 h-5 flex-shrink-0" /> <span className="text-left leading-tight">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Auth */}
                {showAuthButtons && (
                  <div>
                    <p className="text-[11px] font-black text-white/40 uppercase tracking-[0.25em] mb-2.5 px-1">Account</p>
                    {auth.isLoggedIn ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 bg-white/5 rounded-2xl p-3.5">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-black ${auth.isAdmin ? 'bg-orange-600' : 'bg-white/20'}`}>
                            {auth.isAdmin ? <Crown className="w-5 h-5" /> : auth.userName[0]?.toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="text-white text-base font-black truncate">{auth.userName}</p>
                            {auth.isAdmin && <p className="text-orange-400 text-[11px] font-black uppercase">Admin</p>}
                          </div>
                        </div>
                        <button onClick={() => safeNavigate(dashboardHref)}
                          className={`${mBtn} w-full bg-orange-600 text-white font-black hover:bg-orange-500`}>
                          <BarChart3 className="w-5 h-5" /> {auth.isAdmin ? 'Admin Dashboard' : 'Dashboard'}
                        </button>
                        {!auth.isAdmin && (
                          <button onClick={() => safeNavigate('/my-bookings')}
                            className={`${mBtn} w-full bg-white/5 text-white/85 hover:bg-white/10`}>
                            <Calendar className="w-5 h-5" /> My Bookings
                          </button>
                        )}
                        <button onClick={() => logout('user')}
                          className={`${mBtn} w-full justify-center bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white`}>
                          <LogOut className="w-5 h-5" /> Logout
                        </button>
                      </div>
                    ) : auth.isPanditLoggedIn ? (
                      <div className="space-y-2">
                        <button onClick={() => safeNavigate('/pandit/dashboard')}
                          className={`${mBtn} w-full bg-orange-600 text-white font-black hover:bg-orange-500`}>
                          <Sparkles className="w-5 h-5" /> {auth.panditName} Dashboard
                        </button>
                        <button onClick={() => logout('pandit')}
                          className={`${mBtn} w-full justify-center bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white`}>
                          Logout
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <button onClick={() => safeNavigate('/login')}
                            className={`${mBtn} justify-center bg-white/10 text-white hover:bg-white/15`}>Login</button>
                          <button onClick={() => safeNavigate('/register')}
                            className={`${mBtn} justify-center font-black`}
                            style={{ background: 'linear-gradient(135deg, #f9e07a 0%, #d4920a 50%, #b8760a 100%)', color: '#3a0f00', boxShadow: '0 6px 16px rgba(180,100,0,0.4)' }}>
                            Sign Up
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <button onClick={() => safeNavigate('/pandit/login')}
                            className={`${mBtn} justify-center bg-white/5 text-white/80 hover:bg-white/10 !text-sm`}>Pandit Login</button>
                          <button onClick={() => safeNavigate('/pandit/register')}
                            className={`${mBtn} justify-center bg-white/5 text-white/80 hover:bg-white/10 !text-sm`}>Pandit Register</button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}