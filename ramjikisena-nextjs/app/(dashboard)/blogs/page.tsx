// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';

// interface Blog {
//   _id: string; title: string; content: string; category: string;
//   author: { name: string; username: string };
//   likes: string[]; comments: any[]; createdAt: string;
// }

// export default function BlogsPage() {
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`)
//       .then(r => r.json())
//       .then(d => { if (d.success) setBlogs(d.blogs); setLoading(false); })
//       .catch(() => setLoading(false));
//   }, []);

//   const formatDate = (d: string) =>
//     new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

//   const truncate = (s: string, n = 120) => s.length <= n ? s : s.slice(0, n) + '...';

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-5xl space-y-6">

//       {/* Page Header */}
//       <div className="flex items-center justify-between flex-wrap gap-3">
//         <div>
//           <h1 className="text-2xl font-black text-slate-900">Spiritual Blogs</h1>
//           <p className="text-slate-500 text-sm mt-1">Spiritual experiences padhein aur share karein</p>
//         </div>
//         <Link
//           href="/blogs/create"
//           className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-xl text-sm hover:shadow-lg transition-all"
//         >
//           ✍️ Write Blog
//         </Link>
//       </div>

//       {/* Blogs Grid */}
//       {blogs.length === 0 ? (
//         <div className="bg-white rounded-2xl p-12 text-center border-2 border-orange-100">
//           <div className="text-5xl mb-3">📝</div>
//           <h2 className="text-lg font-black text-slate-700 mb-2">No blogs yet</h2>
//           <p className="text-slate-500 text-sm mb-5">Pehle blog likhne wale banein!</p>
//           <Link href="/blogs/create"
//             className="inline-block px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-xl text-sm hover:shadow-lg transition-all">
//             Write First Blog
//           </Link>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {blogs.map(blog => (
//             <Link
//               key={blog._id}
//               href={`/blogs/${blog._id}`}
//               className="bg-white rounded-2xl shadow-sm border-2 border-orange-100 hover:border-orange-300 hover:shadow-md transition-all group overflow-hidden"
//             >
//               <div className="h-32 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center text-5xl">
//                 📖
//               </div>
//               <div className="p-4">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-lg font-bold">
//                     {blog.category}
//                   </span>
//                   <span className="text-xs text-slate-400">{formatDate(blog.createdAt)}</span>
//                 </div>
//                 <h3 className="font-black text-slate-800 mb-1.5 group-hover:text-orange-600 transition-colors line-clamp-2">
//                   {blog.title}
//                 </h3>
//                 <p className="text-slate-500 text-xs mb-3 line-clamp-2">{truncate(blog.content)}</p>
//                 <div className="flex items-center justify-between text-xs text-slate-400">
//                   <span className="font-semibold">{blog.author.name}</span>
//                   <div className="flex gap-2">
//                     <span>❤️ {blog.likes.length}</span>
//                     <span>💬 {blog.comments.length}</span>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PenSquare, Heart, MessageCircle } from 'lucide-react';

interface Blog {
  _id: string; title: string; content: string; category: string;
  author: { name: string; username: string };
  likes: string[]; comments: any[]; createdAt: string;
}

const CAT_STYLE: Record<string, { bg: string; chip: string; emoji: string }> = {
  'Spiritual Knowledge': { bg: 'from-orange-100 to-amber-50',  chip: 'bg-orange-100 text-orange-700', emoji: '📖' },
  'Mandir Stories':      { bg: 'from-red-100 to-rose-50',      chip: 'bg-red-100 text-red-700',       emoji: '🛕' },
  'Pooja Guides':        { bg: 'from-yellow-100 to-amber-50',  chip: 'bg-yellow-100 text-yellow-800', emoji: '🪔' },
  'Personal Experience': { bg: 'from-purple-100 to-fuchsia-50', chip: 'bg-purple-100 text-purple-700', emoji: '🙏' },
};
const fallbackCat = { bg: 'from-slate-100 to-slate-50', chip: 'bg-slate-100 text-slate-700', emoji: '📝' };

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState('All');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`)
      .then(r => r.json())
      .then(d => { if (d.success) setBlogs(d.blogs); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  const truncate = (s: string, n = 120) => (s.length <= n ? s : s.slice(0, n) + '...');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  const categories = ['All', ...Array.from(new Set(blogs.map(b => b.category)))];
  const shown = cat === 'All' ? blogs : blogs.filter(b => b.category === cat);

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="dash-title">Spiritual Blogs 📖</h1>
          <p className="dash-sub">Spiritual experiences padhein aur share karein</p>
        </div>
        <Link href="/blogs/create" className="dash-btn"><PenSquare className="w-4 h-4" /> Write Blog</Link>
      </div>

      {categories.length > 2 && (
        <div className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto dash-scroll">
          <div className="flex gap-2 w-max sm:w-auto sm:flex-wrap pb-1">
            {categories.map(c => (
              <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c}
                className={`min-h-[40px] px-4 rounded-2xl font-black text-sm whitespace-nowrap transition-all active:scale-95 ${
                  cat === c ? 'text-white' : 'bg-white text-[#9a6b4b] border border-orange-100 hover:bg-orange-50'}`}
                style={cat === c ? { background: 'linear-gradient(135deg, #fb923c, #ea580c)' } : undefined}>
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {shown.length === 0 ? (
        <div className="dash-card p-10 sm:p-14 text-center">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-orange-50 flex items-center justify-center text-4xl mb-4">📝</div>
          <h2 className="text-lg font-black text-slate-900 mb-1">Abhi koi blog nahi</h2>
          <p className="text-[#9a6b4b] text-sm font-semibold mb-6">Pehle blog likhne wale banein!</p>
          <Link href="/blogs/create" className="dash-btn">Write First Blog</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {shown.map(blog => {
            const st = CAT_STYLE[blog.category] || fallbackCat;
            return (
              <Link key={blog._id} href={`/blogs/${blog._id}`} className="dash-card dash-card-hover group overflow-hidden flex flex-col">
                <div className={`h-28 bg-gradient-to-br ${st.bg} flex items-center justify-center text-5xl group-hover:scale-105 transition-transform`}>{st.emoji}</div>
                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className={`text-[11px] px-2.5 py-1 rounded-full font-black ${st.chip}`}>{blog.category}</span>
                    <span className="text-xs font-semibold text-[#9a6b4b]">{formatDate(blog.createdAt)}</span>
                  </div>
                  <h3 className="font-black text-slate-900 text-lg leading-snug mb-1.5 group-hover:text-orange-600 transition-colors line-clamp-2">{blog.title}</h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">{truncate(blog.content)}</p>
                  <div className="mt-auto flex items-center justify-between text-sm text-[#9a6b4b]">
                    <span className="font-black truncate pr-2">{blog.author.name}</span>
                    <div className="flex gap-3 flex-shrink-0 font-bold">
                      <span className="inline-flex items-center gap-1"><Heart className="w-4 h-4 text-red-400" />{blog.likes.length}</span>
                      <span className="inline-flex items-center gap-1"><MessageCircle className="w-4 h-4 text-blue-400" />{blog.comments.length}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}