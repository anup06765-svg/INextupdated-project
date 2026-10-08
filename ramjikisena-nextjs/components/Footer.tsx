import Link from 'next/link';
import { ExternalLink, Youtube, Facebook, Instagram, Twitter, ChevronRight } from 'lucide-react';

const footerLinks = {
  'Quick Links': [
    { label: 'होम', href: '/' },
    { label: 'हमारे बारे में', href: '/about' },
    { label: 'संपर्क', href: '/contact' },
  ],
  'सेवाएं': [
    { label: 'राम नाम लेखन', href: '/dashboard' },
    { label: 'मंदिर दर्शन', href: '/mandirs' },
    { label: 'पंडित बुकिंग', href: '/pandits' },
  ],
  'समुदाय': [
    { label: 'भक्त गण', href: '/devotees' },
    { label: 'ब्लॉग', href: '/blogs' },
    { label: 'लीडरबोर्ड', href: '/history' },
  ],
};

// Social buttons (href="#" ki jagah apne asli links daal sakte hain)
const socials = [
  { name: 'YouTube',   Icon: Youtube,   href: '#', hover: 'hover:bg-red-500/20 hover:border-red-400/60 hover:text-red-300' },
  { name: 'Facebook',  Icon: Facebook,  href: '#', hover: 'hover:bg-blue-500/20 hover:border-blue-400/60 hover:text-blue-300' },
  { name: 'Instagram', Icon: Instagram, href: '#', hover: 'hover:bg-pink-500/20 hover:border-pink-400/60 hover:text-pink-300' },
  { name: 'Twitter',   Icon: Twitter,   href: '#', hover: 'hover:bg-sky-500/20 hover:border-sky-400/60 hover:text-sky-300' },
];

export default function Footer() {
  const marqueeStyle = {
    display: 'inline-block',
    whiteSpace: 'nowrap',
    animation: 'marquee 40s linear infinite',
  };

  const marqueeReverseStyle = {
    display: 'inline-block',
    whiteSpace: 'nowrap',
    animation: 'marquee-reverse 40s linear infinite',
  };

  return (
    <footer className="relative overflow-hidden w-full" style={{ background: 'linear-gradient(180deg, #2a0e02 0%, #1a0800 100%)' }}>

      {/* Keyframes for Animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes marquee-reverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
      `}} />

      {/* Upar ki sunehri chamakti line */}
      <div className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(249,224,122,0.6), transparent)' }} />

      {/* --- Small "Ram Ram" Watermark (pehle jaisa, badla nahi) --- */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none flex flex-col justify-around py-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex overflow-hidden">
            <div style={i % 2 === 0 ? marqueeReverseStyle : marqueeStyle} className="text-[24px] font-bold tracking-[15px] text-orange-200">
              राम राम राम राम राम राम राम राम राम राम राम राम राम राम राम राम राम राम राम राम राम राम राम राम
            </div>
            <div style={i % 2 === 0 ? marqueeReverseStyle : marqueeStyle} className="text-[24px] font-bold tracking-[15px] text-orange-200">
              राम राम राम राम राम राम राम राम राम राम राम राम राम राम राम राम राम राम राम राम राम राम राम राम
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="container relative z-10 mx-auto px-5 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">

          {/* Brand Section */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #f9e07a, #d4920a 60%, #b8760a)',
                  color: '#3a0f00',
                  boxShadow: '0 8px 24px rgba(212,146,10,0.35), inset 0 1px 0 rgba(255,255,255,0.45)',
                }}>
                🚩
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                JAI SHRI <span className="text-[#f9e07a]">RAM NAAM</span>
              </h2>
            </div>

            <p className="text-base sm:text-lg leading-relaxed mb-6 text-white/75 max-w-md">
              डिजिटल माध्यम से अपनी भक्ति यात्रा को नई ऊंचाइयों पर ले जाएं।
            </p>

            <span className="inline-flex items-center gap-2 text-base font-bold px-4 py-2 rounded-full mb-7"
              style={{ background: 'rgba(212,146,10,0.12)', color: '#f9e07a', border: '1px solid rgba(212,146,10,0.3)' }}>
              🙏 जय श्री राम
            </span>

            <div className="flex flex-wrap gap-3">
              {socials.map(({ name, Icon, href, hover }) => (
                <a key={name} href={href} aria-label={name}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center border border-white/15 bg-white/5 text-white/70 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f9e07a]/70 ${hover}`}>
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Section */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="font-black text-sm sm:text-base uppercase tracking-[0.15em] mb-2 text-[#f9e07a]">
                  {title}
                </h3>
                <div className="h-0.5 w-10 rounded-full mb-4" style={{ background: 'linear-gradient(90deg, #f9e07a, transparent)' }} />
                <ul className="space-y-1">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link href={href}
                        className="group inline-flex items-center gap-1.5 min-h-[44px] text-base sm:text-[17px] font-medium text-white/70 hover:text-[#f9e07a] transition-all duration-200 hover:translate-x-1 focus-visible:outline-none focus-visible:text-[#f9e07a]">
                        <ChevronRight size={16} className="opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-md">
        <div className="container mx-auto px-5 sm:px-6 pt-5 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left"
          style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}>
          <div className="text-sm sm:text-[15px] text-white/55 flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            <span>© 2026 Jai Shri Ram Naam</span>
            <Link href="/" className="hover:text-[#f9e07a] transition-colors py-2">Privacy</Link>
            <Link href="/" className="hover:text-[#f9e07a] transition-colors py-2">Terms</Link>
          </div>

          <a href="https://inextets.com" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm sm:text-[15px] font-bold text-white/45 hover:text-[#f9e07a] transition-all py-2">
            Powered by <span className="text-white/70">iNext ETS</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}