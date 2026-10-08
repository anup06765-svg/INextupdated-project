// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import Link from 'next/link';

// interface Blog {
//   _id: string;
//   title: string;
//   content: string;
//   category: string;
//   author: {
//     _id: string;
//     name: string;
//     username: string;
//   };
//   likes: string[];
//   comments: Array<{
//     _id: string;
//     user: {
//       name: string;
//       username: string;
//     };
//     text: string;
//     createdAt: string;
//   }>;
//   createdAt: string;
// }

// export default function BlogDetailPage() {
//   const router = useRouter();
//   const params = useParams();
//   const [blog, setBlog] = useState<Blog | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [commentText, setCommentText] = useState('');
//   const [commenting, setCommenting] = useState(false);
//   const [liking, setLiking] = useState(false);

//   useEffect(() => {
//     if (params.id) {
//       fetchBlog();
//     }
//   }, [params.id]);

//   const fetchBlog = async () => {
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${params.id}`);
//       const data = await res.json();
      
//       if (data.success) {
//         setBlog(data.blog);
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching blog:', error);
//       setLoading(false);
//     }
//   };

//   const handleLike = async () => {
//     if (liking) return;
//     setLiking(true);

//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${params.id}/like`, {
//         method: 'POST',
//         credentials: 'include',
//       });

//       const data = await res.json();

//       if (data.success) {
//         fetchBlog(); // Refresh blog data
//       }
//     } catch (error) {
//       console.error('Error liking blog:', error);
//     } finally {
//       setLiking(false);
//     }
//   };

//   const handleComment = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!commentText.trim() || commenting) return;

//     setCommenting(true);

//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${params.id}/comment`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ text: commentText }),
//       });

//       const data = await res.json();

//       if (data.success) {
//         setCommentText('');
//         fetchBlog(); // Refresh blog data
//       }
//     } catch (error) {
//       console.error('Error commenting:', error);
//     } finally {
//       setCommenting(false);
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: 'long',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-6xl mb-4">📖</div>
//           <p className="text-xl text-orange-700">Loading blog...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!blog) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-6xl mb-4">❌</div>
//           <p className="text-xl text-gray-700">Blog not found</p>
//           <Link href="/blogs" className="mt-4 inline-block text-orange-600 hover:text-orange-700">
//             ← Back to Blogs
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
//       {/* Header */}
//       <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 shadow-lg">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
//                 <span className="text-2xl">📖</span>
//               </div>
//               <h1 className="text-2xl font-bold">Blog</h1>
//             </div>
//             <Link href="/blogs" className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition">
//               ← Back
//             </Link>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-8">
//         <div className="max-w-4xl mx-auto space-y-6">
//           {/* Blog Content */}
//           <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-orange-200">
//             {/* Category & Date */}
//             <div className="flex items-center justify-between mb-4">
//               <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
//                 {blog.category}
//               </span>
//               <span className="text-gray-500 text-sm">
//                 {formatDate(blog.createdAt)}
//               </span>
//             </div>

//             {/* Title */}
//             <h1 className="text-4xl font-bold text-orange-700 mb-4">
//               {blog.title}
//             </h1>

//             {/* Author */}
//             <div className="flex items-center gap-3 mb-6 pb-6 border-b">
//               <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-2xl">
//                 👤
//               </div>
//               <div>
//                 <p className="font-semibold text-gray-800">{blog.author.name}</p>
//                 <p className="text-sm text-gray-500">@{blog.author.username}</p>
//               </div>
//             </div>

//             {/* Content */}
//             <div className="prose max-w-none">
//               <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
//                 {blog.content}
//               </p>
//             </div>

//             {/* Like Button */}
//             <div className="mt-8 pt-6 border-t">
//               <button
//                 onClick={handleLike}
//                 disabled={liking}
//                 className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg hover:shadow-lg transition disabled:opacity-50"
//               >
//                 <span className="text-2xl">❤️</span>
//                 <span className="font-semibold">{blog.likes.length} Likes</span>
//               </button>
//             </div>
//           </div>

//           {/* Comments Section */}
//           <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-orange-200">
//             <h2 className="text-2xl font-bold text-orange-700 mb-6">
//               💬 Comments ({blog.comments.length})
//             </h2>

//             {/* Add Comment Form */}
//             <form onSubmit={handleComment} className="mb-6">
//               <textarea
//                 value={commentText}
//                 onChange={(e) => setCommentText(e.target.value)}
//                 placeholder="Write a comment..."
//                 rows={3}
//                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none mb-3"
//               />
//               <button
//                 type="submit"
//                 disabled={commenting || !commentText.trim()}
//                 className="px-6 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
//               >
//                 {commenting ? 'Posting...' : 'Post Comment'}
//               </button>
//             </form>

//             {/* Comments List */}
//             <div className="space-y-4">
//               {blog.comments.length === 0 ? (
//                 <p className="text-gray-500 text-center py-8">No comments yet. Be the first to comment!</p>
//               ) : (
//                 blog.comments.map((comment) => (
//                   <div key={comment._id} className="bg-gray-50 rounded-lg p-4">
//                     <div className="flex items-start gap-3">
//                       <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
//                         👤
//                       </div>
//                       <div className="flex-1">
//                         <div className="flex items-center justify-between mb-1">
//                           <p className="font-semibold text-gray-800">{comment.user.name}</p>
//                           <span className="text-xs text-gray-500">
//                             {formatDate(comment.createdAt)}
//                           </span>
//                         </div>
//                         <p className="text-gray-700">{comment.text}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Heart, MessageCircle, Send, Loader2, Share2 } from 'lucide-react';

interface Blog {
  _id: string;
  title: string;
  content: string;
  category: string;
  author: { _id: string; name: string; username: string };
  likes: string[];
  comments: Array<{
    _id: string;
    user: { name: string; username: string };
    text: string;
    createdAt: string;
  }>;
  createdAt: string;
}

export default function BlogDetailPage() {
  const params = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [commenting, setCommenting] = useState(false);
  const [liking, setLiking] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (params.id) fetchBlog();
  }, [params.id]);

  const fetchBlog = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${params.id}`);
      const data = await res.json();
      if (data.success) setBlog(data.blog);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blog:', error);
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (liking) return;
    setLiking(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${params.id}/like`, {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) fetchBlog();
    } catch (error) {
      console.error('Error liking blog:', error);
    } finally {
      setLiking(false);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || commenting) return;
    setCommenting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${params.id}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ text: commentText }),
      });
      const data = await res.json();
      if (data.success) {
        setCommentText('');
        fetchBlog();
      }
    } catch (error) {
      console.error('Error commenting:', error);
    } finally {
      setCommenting(false);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: blog?.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {}
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const formatDateTime = (d: string) =>
    new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });

  const readMins = (text: string) => Math.max(1, Math.round(text.trim().split(/\s+/).length / 200));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-orange-700 font-black">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-md mx-auto dash-card p-10 text-center mt-10">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-red-50 flex items-center justify-center text-4xl mb-4">❌</div>
        <p className="text-lg font-black text-slate-900 mb-1">Blog nahi mila</p>
        <p className="text-sm font-semibold text-[#9a6b4b] mb-6">Ye blog hat chuka hai ya link galat hai.</p>
        <Link href="/blogs" className="dash-btn"><ArrowLeft className="w-4 h-4" /> Back to Blogs</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      <Link href="/blogs" className="inline-flex items-center gap-2 min-h-[44px] text-sm font-black text-orange-700 hover:text-orange-800">
        <ArrowLeft className="w-4 h-4" /> Sabhi Blogs
      </Link>

      {/* Article */}
      <article className="dash-card overflow-hidden">
        <div className="h-2" style={{ background: 'linear-gradient(90deg, #fb923c, #ea580c, #f59e0b)' }} />
        <div className="p-5 sm:p-8">
          <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-black">{blog.category}</span>
            <span className="text-[#9a6b4b] text-xs font-bold">
              {formatDate(blog.createdAt)} · {readMins(blog.content)} min read
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight tracking-tight break-words mb-5">{blog.title}</h1>

          <div className="flex items-center gap-3 pb-5 mb-6 border-b border-orange-100">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg flex-shrink-0"
              style={{ background: 'linear-gradient(145deg, #fb923c, #ea580c)' }}>
              {blog.author.name?.charAt(0)?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="font-black text-slate-900 truncate">{blog.author.name}</p>
              <p className="text-sm font-semibold text-[#9a6b4b] truncate">@{blog.author.username}</p>
            </div>
          </div>

          <p className="text-slate-700 leading-[1.9] whitespace-pre-wrap text-base sm:text-lg break-words">{blog.content}</p>

          {/* Actions */}
          <div className="mt-8 pt-6 border-t border-orange-100 flex items-center gap-3 flex-wrap">
            <button onClick={handleLike} disabled={liking}
              className="dash-btn" style={{ background: 'linear-gradient(135deg, #fb7185, #e11d48)', boxShadow: '0 10px 22px -10px rgba(225,29,72,0.7)' }}>
              <Heart className="w-5 h-5" fill="currentColor" /> {blog.likes.length} Likes
            </button>
            <a href="#comments" className="dash-btn-ghost"><MessageCircle className="w-5 h-5" /> {blog.comments.length}</a>
            <button onClick={handleShare} className="dash-btn-ghost ml-auto">
              <Share2 className="w-5 h-5" /> {copied ? 'Link copy hua ✓' : 'Share'}
            </button>
          </div>
        </div>
      </article>

      {/* Comments */}
      <section id="comments" className="dash-card p-5 sm:p-8 scroll-mt-24">
        <h2 className="text-xl font-black text-slate-900 mb-5">💬 Comments ({blog.comments.length})</h2>

        <form onSubmit={handleComment} className="mb-6">
          <textarea value={commentText} onChange={e => setCommentText(e.target.value)}
            placeholder="Apna comment likhein..." rows={3} maxLength={500}
            className="dash-input resize-none mb-3" />
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-black text-[#9a6b4b]">{commentText.length}/500</span>
            <button type="submit" disabled={commenting || !commentText.trim()} className="dash-btn">
              {commenting ? <><Loader2 className="w-4 h-4 animate-spin" /> Posting...</> : <><Send className="w-4 h-4" /> Post Comment</>}
            </button>
          </div>
        </form>

        <div className="space-y-3">
          {blog.comments.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">🙏</div>
              <p className="text-[#9a6b4b] font-bold">Abhi koi comment nahi. Pehle aap likhein!</p>
            </div>
          ) : (
            blog.comments.map(c => (
              <div key={c._id} className="bg-orange-50/60 border border-orange-100 rounded-2xl p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black flex-shrink-0"
                  style={{ background: 'linear-gradient(145deg, #fdba74, #f97316)' }}>
                  {c.user.name?.charAt(0)?.toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2 flex-wrap mb-0.5">
                    <p className="font-black text-slate-900 truncate">{c.user.name}</p>
                    <span className="text-xs font-semibold text-[#9a6b4b]">{formatDateTime(c.createdAt)}</span>
                  </div>
                  <p className="text-slate-700 break-words whitespace-pre-wrap">{c.text}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}