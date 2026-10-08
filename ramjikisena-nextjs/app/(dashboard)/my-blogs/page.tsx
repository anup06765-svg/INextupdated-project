// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';

// interface Blog {
//   _id: string; title: string; content: string; category: string;
//   likes: string[]; comments: any[]; published: boolean; approved: boolean; createdAt: string;
// }

// export default function MyBlogsPage() {
//   const router = useRouter();
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) { router.push('/login'); return; }
//     fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/my/posts`, {
//       headers: { 'Authorization': `Bearer ${token}` },
//       credentials: 'include',
//     })
//       .then(r => { if (r.status === 401) { router.push('/login'); return null; } return r.json(); })
//       .then(d => { if (d?.success) setBlogs(d.blogs); setLoading(false); })
//       .catch(() => setLoading(false));
//   }, []);

//   const formatDate = (d: string) =>
//     new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

//   const truncate = (s: string, n = 100) => s.length <= n ? s : s.slice(0, n) + '...';

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl space-y-6">

//       {/* Page Header */}
//       <div className="flex items-center justify-between flex-wrap gap-3">
//         <div>
//           <h1 className="text-2xl font-black text-slate-900">My Blogs</h1>
//           <p className="text-slate-500 text-sm mt-1">Apne likhe blogs manage karein</p>
//         </div>
//         <Link
//           href="/blogs/create"
//           className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-xl text-sm hover:shadow-lg transition-all"
//         >
//           ✍️ Write New
//         </Link>
//       </div>

//       {/* Blogs */}
//       {blogs.length === 0 ? (
//         <div className="bg-white rounded-2xl p-12 text-center border-2 border-orange-100">
//           <div className="text-5xl mb-3">📝</div>
//           <h2 className="text-lg font-black text-slate-700 mb-2">No blogs yet</h2>
//           <p className="text-slate-500 text-sm mb-5">Apna pehla spiritual blog likhein!</p>
//           <Link href="/blogs/create"
//             className="inline-block px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-xl text-sm hover:shadow-lg transition-all">
//             Write Your First Blog
//           </Link>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {blogs.map(blog => (
//             <div key={blog._id} className="bg-white rounded-2xl p-5 shadow-sm border-2 border-orange-100 hover:border-orange-300 transition-all">
//               <div className="flex items-start justify-between gap-4">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-2 flex-wrap mb-2">
//                     <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-lg font-bold">
//                       {blog.category}
//                     </span>
//                     <span className="text-xs text-slate-400">{formatDate(blog.createdAt)}</span>
//                     {blog.approved ? (
//                       <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-lg font-bold">✅ Approved</span>
//                     ) : (
//                       <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-lg font-bold">⏳ Pending</span>
//                     )}
//                   </div>
//                   <h3 className="font-black text-slate-800 mb-1.5">{blog.title}</h3>
//                   <p className="text-slate-500 text-sm mb-3">{truncate(blog.content)}</p>
//                   <div className="flex gap-4 text-sm text-slate-400">
//                     <span>❤️ {blog.likes.length}</span>
//                     <span>💬 {blog.comments.length}</span>
//                   </div>
//                 </div>
//                 {blog.approved && (
//                   <Link href={`/blogs/${blog._id}`}
//                     className="px-4 py-2 bg-orange-500 text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition-colors flex-shrink-0">
//                     View
//                   </Link>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PenSquare, Heart, MessageCircle, Eye } from 'lucide-react';

interface Blog {
  _id: string; title: string; content: string; category: string;
  likes: string[]; comments: any[]; published: boolean; approved: boolean; createdAt: string;
}

export default function MyBlogsPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/login'); return; }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/my/posts`, {
      headers: { 'Authorization': `Bearer ${token}` },
      credentials: 'include',
    })
      .then(r => { if (r.status === 401) { router.push('/login'); return null; } return r.json(); })
      .then(d => { if (d?.success) setBlogs(d.blogs); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  const truncate = (s: string, n = 140) => (s.length <= n ? s : s.slice(0, n) + '...');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  const approvedCount = blogs.filter(b => b.approved).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="dash-title">My Blogs ✍️</h1>
          <p className="dash-sub">
            {blogs.length > 0 ? `${blogs.length} blogs · ${approvedCount} approved` : 'Apne likhe blogs manage karein'}
          </p>
        </div>
        <Link href="/blogs/create" className="dash-btn"><PenSquare className="w-4 h-4" /> Write New</Link>
      </div>

      {blogs.length === 0 ? (
        <div className="dash-card p-10 sm:p-14 text-center">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-orange-50 flex items-center justify-center text-4xl mb-4">📝</div>
          <h2 className="text-lg font-black text-slate-900 mb-1">Abhi koi blog nahi</h2>
          <p className="text-[#9a6b4b] text-sm font-semibold mb-6">Apna pehla spiritual blog likhein!</p>
          <Link href="/blogs/create" className="dash-btn">Write Your First Blog</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {blogs.map(blog => (
            <div key={blog._id} className="dash-card dash-card-hover p-4 sm:p-5">
              <div className="flex flex-wrap items-center gap-2 mb-2.5">
                <span className="text-[11px] bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full font-black">{blog.category}</span>
                <span className="text-xs font-semibold text-[#9a6b4b]">{formatDate(blog.createdAt)}</span>
                {blog.approved ? (
                  <span className="text-[11px] bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-black">✅ Approved</span>
                ) : (
                  <span className="text-[11px] bg-yellow-100 text-yellow-800 px-2.5 py-1 rounded-full font-black">⏳ Pending</span>
                )}
              </div>
              <h3 className="font-black text-slate-900 text-lg leading-snug mb-1.5 break-words">{blog.title}</h3>
              <p className="text-slate-600 text-sm mb-4 break-words">{truncate(blog.content)}</p>
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex gap-4 text-sm font-bold text-[#9a6b4b]">
                  <span className="inline-flex items-center gap-1.5"><Heart className="w-4 h-4 text-red-400" />{blog.likes.length}</span>
                  <span className="inline-flex items-center gap-1.5"><MessageCircle className="w-4 h-4 text-blue-400" />{blog.comments.length}</span>
                </div>
                {blog.approved ? (
                  <Link href={`/blogs/${blog._id}`} className="dash-btn"><Eye className="w-4 h-4" /> View</Link>
                ) : (
                  <span className="text-xs font-bold text-[#9a6b4b]">Admin approval ka intezaar</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
