// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { Heart, MessageCircle, Share2, MoreHorizontal, Send, Image as ImageIcon, X, MapPin, Users, Globe, Loader2, Trash2, AlertTriangle, Sparkles, ChevronDown } from 'lucide-react';
// import Navbar from '@/components/Navbar';
// import ImageUploader from '@/components/ImageUploader';
// import { motion, AnimatePresence } from 'framer-motion';
// import api from '@/lib/api';

// interface Author { _id: string; name: string; username: string; city: string; profileImage?: string; dob?: string; }
// interface Comment { _id: string; user: Author; text: string; createdAt: string; }
// interface Post {
//   _id: string; author: Author; text: string; images: string[];
//   category: string; city: string; state: string;
//   likesCount: number; commentsCount: number; sharesCount: number;
//   isLiked: boolean; isFollowing: boolean;
//   comments: Comment[]; createdAt: string;
// }
// interface BirthdayUser { _id: string; name: string; username: string; dob: string; }

// const CATEGORIES = ['General', 'Pooja', 'Katha', 'Bhandara', 'Bhajan', 'Temple'];
// const CAT_EMOJI: Record<string, string> = { General: '🙏', Pooja: '🪔', Katha: '📖', Bhandara: '🍛', Bhajan: '🎵', Temple: '🛕' };
// const CAT_COLOR: Record<string, string> = { General: 'bg-orange-100 text-orange-700', Pooja: 'bg-yellow-100 text-yellow-700', Katha: 'bg-blue-100 text-blue-700', Bhandara: 'bg-green-100 text-green-700', Bhajan: 'bg-purple-100 text-purple-700', Temple: 'bg-red-100 text-red-700' };

// function timeAgo(date: string) {
//   const diff = Date.now() - new Date(date).getTime();
//   const m = Math.floor(diff / 60000);
//   if (m < 1) return 'just now';
//   if (m < 60) return `${m}m ago`;
//   const h = Math.floor(m / 60);
//   if (h < 24) return `${h}h ago`;
//   return `${Math.floor(h / 24)}d ago`;
// }

// function isTodayBirthday(dob?: string): boolean {
//   if (!dob) return false;
//   const d = new Date(dob);
//   const today = new Date();
//   return d.getMonth() === today.getMonth() && d.getDate() === today.getDate();
// }

// function Avatar({ user, size = 'md' }: { user: Author; size?: 'sm' | 'md' | 'lg' }) {
//   const s = size === 'sm' ? 'w-8 h-8 text-sm' : size === 'lg' ? 'w-12 h-12 text-xl' : 'w-10 h-10 text-base';
//   return (
//     <div className="relative flex-shrink-0">
//       {user.profileImage ? (
//         <img src={user.profileImage} alt={user.name} className={`${s} rounded-full object-cover ring-2 ring-orange-100`} />
//       ) : (
//         <div className={`${s} rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-black`}>
//           {user.name[0].toUpperCase()}
//         </div>
//       )}
//       {isTodayBirthday(user.dob) && (
//         <span className="absolute -top-1 -right-1 text-base leading-none" title="🎂 Birthday today!">🎂</span>
//       )}
//     </div>
//   );
// }

// function CreatePost({ currentUser, onPost }: { currentUser: any; onPost: (p: Post) => void }) {
//   const [text, setText] = useState('');
//   const [images, setImages] = useState<string[]>([]);
//   const [category, setCategory] = useState('General');
//   const [showImageUpload, setShowImageUpload] = useState(false);
//   const [posting, setPosting] = useState(false);

//   const submit = async () => {
//     if (!text.trim() && images.length === 0) return;
//     setPosting(true);
//     try {
//       const res = await api.post('/api/community/posts', { text, images, category });
//       const data = await res.json();
//       if (data.success) { onPost(data.post); setText(''); setImages([]); setCategory('General'); setShowImageUpload(false); }
//     } catch (e) { console.error(e); }
//     finally { setPosting(false); }
//   };

//   return (
//     <div className="bg-white rounded-[2rem] border border-orange-100 shadow-sm p-5 mb-4">
//       <div className="flex gap-3">
//         <Avatar user={currentUser} size="md" />
//         <div className="flex-1">
//           <textarea
//             value={text} onChange={e => setText(e.target.value)}
//             placeholder="🙏 अपना अनुभव साझा करें..."
//             rows={3}
//             className="w-full resize-none border-2 border-orange-100 rounded-2xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-colors text-sm bg-orange-50/30"
//           />
//           <div className="flex gap-2 mt-2 flex-wrap">
//             {CATEGORIES.map(c => (
//               <button key={c} onClick={() => setCategory(c)}
//                 className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${category === c ? 'bg-orange-600 text-white shadow-md' : 'bg-orange-50 text-orange-700 hover:bg-orange-100'}`}>
//                 {CAT_EMOJI[c]} {c}
//               </button>
//             ))}
//           </div>
//           {showImageUpload && (
//             <div className="mt-3">
//               <ImageUploader value={images} onChange={v => setImages(v as string[])} multiple folder="community" label="" />
//             </div>
//           )}
//           <div className="flex items-center justify-between mt-3">
//             <button onClick={() => setShowImageUpload(!showImageUpload)}
//               className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-xl transition-all ${showImageUpload ? 'bg-orange-100 text-orange-700' : 'text-gray-500 hover:bg-gray-100'}`}>
//               <ImageIcon className="w-4 h-4" />
//               {images.length > 0 ? `${images.length} photo${images.length > 1 ? 's' : ''}` : 'Photo'}
//             </button>
//             <button onClick={submit} disabled={posting || (!text.trim() && images.length === 0)}
//               className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-5 py-2 rounded-xl font-bold text-sm hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95">
//               {posting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />} Post
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function PostCard({ post, currentUserId, onUpdate, onDelete }: {
//   post: Post; currentUserId: string;
//   onUpdate: (id: string, changes: Partial<Post>) => void;
//   onDelete: (id: string) => void;
// }) {
//   const [showComments, setShowComments] = useState(false);
//   const [commentText, setCommentText] = useState('');
//   const [commenting, setCommenting] = useState(false);
//   const [showMenu, setShowMenu] = useState(false);
//   const [imgIdx, setImgIdx] = useState(0);
//   const menuRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handler = (e: MouseEvent) => { if (menuRef.current && !menuRef.current.contains(e.target as Node)) setShowMenu(false); };
//     document.addEventListener('mousedown', handler);
//     return () => document.removeEventListener('mousedown', handler);
//   }, []);

//   const handleLike = async () => {
//     onUpdate(post._id, { isLiked: !post.isLiked, likesCount: post.isLiked ? post.likesCount - 1 : post.likesCount + 1 });
//     try { await api.post(`/api/community/posts/${post._id}/like`); }
//     catch { onUpdate(post._id, { isLiked: post.isLiked, likesCount: post.likesCount }); }
//   };

//   const handleFollow = async () => {
//     onUpdate(post._id, { isFollowing: !post.isFollowing });
//     try { await api.post(`/api/community/follow/${post.author._id}`); }
//     catch { onUpdate(post._id, { isFollowing: post.isFollowing }); }
//   };

//   const handleShare = async () => {
//     const url = `${window.location.origin}/community#${post._id}`;
//     try {
//       await navigator.clipboard.writeText(url);
//       // Use a non-blocking notification instead of alert
//       const el = document.createElement('div');
//       el.textContent = '🔗 Link copied!';
//       el.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#1e293b;color:white;padding:8px 20px;border-radius:999px;font-size:13px;font-weight:700;z-index:99999;pointer-events:none;';
//       document.body.appendChild(el);
//       setTimeout(() => el.remove(), 2000);
//     } catch {
//       // fallback - just copy silently
//     }
//     try {
//       await api.post(`/api/community/posts/${post._id}/share`);
//       onUpdate(post._id, { sharesCount: post.sharesCount + 1 });
//     } catch {}
//   };

//   const handleComment = async () => {
//     if (!commentText.trim()) return;
//     setCommenting(true);
//     try {
//       const res = await api.post(`/api/community/posts/${post._id}/comment`, { text: commentText });
//       const data = await res.json();
//       if (data.success) { onUpdate(post._id, { comments: [...post.comments, data.comment], commentsCount: data.commentsCount }); setCommentText(''); }
//     } catch (e) { console.error(e); }
//     finally { setCommenting(false); }
//   };

//   const handleDeleteComment = async (commentId: string) => {
//     try {
//       const res = await api.delete(`/api/community/posts/${post._id}/comment/${commentId}`);
//       const data = await res.json();
//       if (data.success) onUpdate(post._id, { comments: post.comments.filter(c => c._id !== commentId), commentsCount: data.commentsCount });
//     } catch (e) { console.error(e); }
//   };

//   const handleReport = async () => {
//     setShowMenu(false);
//     if (!window.confirm('Report this post?')) return;
//     try {
//       await api.post(`/api/community/posts/${post._id}/report`);
//     } catch {}
//   };

//   const handleDelete = async () => {
//     setShowMenu(false);
//     if (!window.confirm('Delete this post?')) return;
//     try {
//       const res = await api.delete(`/api/community/posts/${post._id}`);
//       const data = await res.json();
//       if (data.success) onDelete(post._id);
//     } catch (e) { console.error(e); }
//   };

//   const isOwn = post.author._id === currentUserId;

//   return (
//     <motion.div
//       id={post._id}
//       layout
//       initial={{ opacity: 0, y: 16 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, scale: 0.97 }}
//       className="bg-white rounded-[2rem] border border-orange-50 overflow-hidden mb-4 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
//     >
//       {/* Header */}
//       <div className="flex items-start justify-between p-5 pb-3">
//         <div className="flex items-center gap-3">
//           <Link href={`/community/${post.author.username}`}>
//             <Avatar user={post.author} />
//           </Link>
//           <div>
//             <div className="flex items-center gap-2 flex-wrap">
//               <Link href={`/community/${post.author.username}`} className="font-black text-slate-900 text-sm hover:text-orange-600 transition-colors tracking-tight">
//                 {post.author.name}
//               </Link>
//               <span className="text-slate-400 text-xs font-medium">@{post.author.username}</span>
//               {post.author.city && (
//                 <span className="flex items-center gap-0.5 text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full font-semibold">
//                   <MapPin className="w-3 h-3" />{post.author.city}
//                 </span>
//               )}
//             </div>
//             <div className="flex items-center gap-2 mt-1">
//               <span className="text-xs text-slate-400">{timeAgo(post.createdAt)}</span>
//               <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${CAT_COLOR[post.category] || 'bg-orange-100 text-orange-700'}`}>
//                 {CAT_EMOJI[post.category]} {post.category}
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center gap-2">
//           {!isOwn && (
//             <button onClick={handleFollow}
//               className={`text-xs font-black px-3 py-1.5 rounded-full transition-all active:scale-95 ${post.isFollowing ? 'bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600' : 'bg-orange-600 text-white hover:bg-orange-700 shadow-md shadow-orange-200'}`}>
//               {post.isFollowing ? '✓ Following' : '+ Follow'}
//             </button>
//           )}
//           <div className="relative" ref={menuRef}>
//             <button onClick={() => setShowMenu(!showMenu)} className="p-1.5 rounded-full hover:bg-orange-50 transition-colors">
//               <MoreHorizontal className="w-4 h-4 text-slate-400" />
//             </button>
//             {showMenu && (
//               <div className="absolute right-0 top-8 bg-white rounded-2xl shadow-xl border border-slate-100 py-1 z-20 w-40">
//                 {isOwn ? (
//                   <button onClick={handleDelete} className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-semibold">
//                     <Trash2 className="w-4 h-4" /> Delete Post
//                   </button>
//                 ) : (
//                   <button onClick={handleReport} className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors font-semibold">
//                     <AlertTriangle className="w-4 h-4" /> Report
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Text */}
//       {post.text && <p className="px-5 pb-4 text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">{post.text}</p>}

//       {/* Images */}
//       {post.images.length > 0 && (
//         <div className="relative mx-3 mb-3 rounded-2xl overflow-hidden">
//           <img src={post.images[imgIdx]} alt="post" className="w-full max-h-96 object-cover" />
//           {post.images.length > 1 && (
//             <>
//               <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
//                 {post.images.map((_, i) => (
//                   <button key={i} onClick={() => setImgIdx(i)}
//                     className={`w-2 h-2 rounded-full transition-all ${i === imgIdx ? 'bg-white scale-125' : 'bg-white/60'}`} />
//                 ))}
//               </div>
//               {imgIdx < post.images.length - 1 && (
//                 <button onClick={() => setImgIdx(i => i + 1)} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/40 text-white rounded-full flex items-center justify-center hover:bg-black/60 text-lg">›</button>
//               )}
//               {imgIdx > 0 && (
//                 <button onClick={() => setImgIdx(i => i - 1)} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/40 text-white rounded-full flex items-center justify-center hover:bg-black/60 text-lg">‹</button>
//               )}
//             </>
//           )}
//         </div>
//       )}

//       {/* Action Bar */}
//       <div className="px-4 py-3 flex items-center gap-1 border-t border-orange-50/80">
//         <button onClick={handleLike}
//           className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95 ${post.isLiked ? 'text-red-500 bg-red-50' : 'text-slate-500 hover:bg-slate-100'}`}>
//           <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-red-500' : ''}`} />
//           {post.likesCount > 0 && <span>{post.likesCount}</span>}
//         </button>
//         <button onClick={() => setShowComments(!showComments)}
//           className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold transition-all ${showComments ? 'text-orange-600 bg-orange-50' : 'text-slate-500 hover:bg-slate-100'}`}>
//           <MessageCircle className="w-4 h-4" />
//           {post.commentsCount > 0 && <span>{post.commentsCount}</span>}
//         </button>
//         <button onClick={handleShare}
//           className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-100 transition-all">
//           <Share2 className="w-4 h-4" />
//           {post.sharesCount > 0 && <span>{post.sharesCount}</span>}
//         </button>
//       </div>

//       {/* Comments */}
//       <AnimatePresence>
//         {showComments && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             className="border-t border-orange-50 px-4 py-4 space-y-3 overflow-hidden"
//           >
//             {post.comments.length === 0 && <p className="text-xs text-slate-400 text-center py-2">No comments yet. Be the first!</p>}
//             {post.comments.map(c => (
//               <div key={c._id} className="flex gap-2.5 group">
//                 <Avatar user={c.user} size="sm" />
//                 <div className="flex-1 bg-orange-50/60 rounded-2xl px-3 py-2">
//                   <div className="flex items-center justify-between">
//                     <span className="text-xs font-black text-slate-800">{c.user.name}</span>
//                     <div className="flex items-center gap-1">
//                       <span className="text-xs text-slate-400">{timeAgo(c.createdAt)}</span>
//                       {c.user._id === currentUserId && (
//                         <button onClick={() => handleDeleteComment(c._id)} className="opacity-0 group-hover:opacity-100 p-0.5 text-red-400 hover:text-red-600 transition-all">
//                           <X className="w-3 h-3" />
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                   <p className="text-sm text-slate-700 mt-0.5">{c.text}</p>
//                 </div>
//               </div>
//             ))}
//             <div className="flex gap-2 pt-1">
//               <input value={commentText} onChange={e => setCommentText(e.target.value)}
//                 onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleComment()}
//                 placeholder="Write a comment..."
//                 className="flex-1 bg-orange-50 rounded-2xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all border border-orange-100" />
//               <button onClick={handleComment} disabled={commenting || !commentText.trim()}
//                 className="w-9 h-9 bg-orange-600 text-white rounded-xl flex items-center justify-center hover:bg-orange-700 transition-all disabled:opacity-40 active:scale-95">
//                 {commenting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// }

// function CollapsibleCard({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
//   const [open, setOpen] = useState(defaultOpen);
//   return (
//     <div className="bg-white rounded-[2rem] border border-orange-100 shadow-sm overflow-hidden">
//       <button
//         onClick={() => setOpen(o => !o)}
//         className="w-full flex items-center justify-between px-5 py-4 hover:bg-orange-50/50 transition-colors"
//       >
//         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</span>
//         <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
//           <ChevronDown className="w-4 h-4 text-slate-400" />
//         </motion.div>
//       </button>
//       <AnimatePresence initial={false}>
//         {open && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: 'auto', opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.25, ease: 'easeInOut' }}
//             className="overflow-hidden"
//           >
//             <div className="px-4 pb-4">{children}</div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default function CommunityPage() {
//   const router = useRouter();
//   const [currentUser, setCurrentUser] = useState<any>(null);
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [cities, setCities] = useState<string[]>([]);
//   const [feedFilter, setFeedFilter] = useState<'all' | 'following'>('all');
//   const [cityFilter, setCityFilter] = useState('all');
//   const [categoryFilter, setCategoryFilter] = useState('all');
//   const [birthdayUsers, setBirthdayUsers] = useState<BirthdayUser[]>([]);
//   const observerRef = useRef<IntersectionObserver | null>(null);
//   const loadMoreRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) { router.push('/login'); return; }

//     // Try localStorage first for instant load
//     const userStr = localStorage.getItem('user');
//     if (userStr) {
//       try {
//         setCurrentUser(JSON.parse(userStr));
//       } catch {}
//     }

//     // Always verify with API to get fresh data
//     const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3100';
//     fetch(`${API_URL}/api/me`, {
//       headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
//       credentials: 'include',
//     })
//       .then(res => {
//         if (res.status === 401) {
//           // Only on explicit 401 - clear and redirect
//           localStorage.removeItem('token');
//           localStorage.removeItem('user');
//           router.push('/login');
//           return null;
//         }
//         return res.ok ? res.json() : null;
//       })
//       .then(data => {
//         if (data?.success && data.user) {
//           setCurrentUser(data.user);
//           localStorage.setItem('user', JSON.stringify(data.user));
//         }
//       })
//       .catch(() => {
//         // Network error - keep user logged in if token exists
//         if (!userStr) setCurrentUser({ _id: '', name: 'User', username: 'user', city: '' });
//       });

//     fetchCities();
//     fetchBirthdays();
//   }, []);  useEffect(() => {
//     if (!currentUser) return;
//     setPosts([]); setPage(1); setHasMore(true);
//     fetchPosts(1, true);
//   }, [feedFilter, cityFilter, categoryFilter, currentUser]);

//   useEffect(() => {
//     if (observerRef.current) observerRef.current.disconnect();
//     observerRef.current = new IntersectionObserver(entries => {
//       if (entries[0].isIntersecting && hasMore && !loadingMore) loadMore();
//     }, { threshold: 0.1 });
//     if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);
//     return () => observerRef.current?.disconnect();
//   }, [hasMore, loadingMore, page]);

//   const fetchCities = async () => {
//     try {
//       const res = await api.get('/api/community/cities');
//       const data = await res.json();
//       if (data.success) setCities(data.cities);
//     } catch (e) {}
//   };

//   const fetchBirthdays = async () => {
//     try {
//       const res = await api.get('/api/birthdays');
//       const data = await res.json();
//       if (data.success && data.users.length > 0) {
//         setBirthdayUsers(data.users);
//       }
//     } catch (e) {}
//   };

//   const fetchPosts = async (p: number, reset = false) => {
//     if (reset) setLoading(true); else setLoadingMore(true);
//     try {
//       const params = new URLSearchParams({
//         page: String(p), limit: '10', filter: feedFilter,
//         ...(cityFilter !== 'all' && { city: cityFilter }),
//         ...(categoryFilter !== 'all' && { category: categoryFilter }),
//       });
//       const res = await api.get(`/api/community/posts?${params}`);
//       const data = await res.json();
//       if (data.success) {
//         setPosts(prev => reset ? data.posts : [...prev, ...data.posts]);
//         setHasMore(data.hasMore);
//         setPage(p);
//       }
//     } catch (e) { console.error(e); }
//     finally { setLoading(false); setLoadingMore(false); }
//   };

//   const loadMore = () => { if (!loadingMore && hasMore) fetchPosts(page + 1); };
//   const handleNewPost = (post: Post) => setPosts(prev => [post, ...prev]);
//   const handleUpdate = (id: string, changes: Partial<Post>) => setPosts(prev => prev.map(p => p._id === id ? { ...p, ...changes } : p));
//   const handleDelete = (id: string) => setPosts(prev => prev.filter(p => p._id !== id));

//   if (!currentUser) return (
//     <div className="min-h-screen bg-[#FFFAF3] flex items-center justify-center">
//       <div className="text-center">
//         <div className="w-14 h-14 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
//         <p className="text-orange-700 font-bold">जय श्री राम...</p>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-[#FFFAF3] text-slate-900 antialiased selection:bg-orange-200">
//       <Navbar showAuthButtons={true} />

//       <main className="max-w-6xl mx-auto px-2 sm:px-6 pt-24 pb-12">

//         {/* Header */}
//         <div className="mb-8 text-center md:text-left px-3">
//           <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
//             <h1 className="text-3xl md:text-6xl font-black tracking-tight text-slate-900 leading-none">
//               भक्त <span className="text-orange-600 italic">समुदाय</span>
//             </h1>
//             <div className="h-1 w-16 bg-orange-500 mx-auto md:mx-0 mt-3 rounded-full" />
//             <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mt-3">
//               Community Feed · Share Your Spiritual Journey
//             </p>
//           </motion.div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

//           {/* Left Sidebar */}
//           <aside className="lg:col-span-3 space-y-3">
//             <CollapsibleCard title="Feed" defaultOpen={true}>
//               <div className="space-y-1.5">
//                 <button onClick={() => setFeedFilter('all')}
//                   className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${feedFilter === 'all' ? 'bg-orange-600 text-white shadow-md shadow-orange-200' : 'text-slate-600 hover:bg-orange-50'}`}>
//                   <Globe className="w-4 h-4" /> All Posts
//                 </button>
//                 <button onClick={() => setFeedFilter('following')}
//                   className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${feedFilter === 'following' ? 'bg-orange-600 text-white shadow-md shadow-orange-200' : 'text-slate-600 hover:bg-orange-50'}`}>
//                   <Users className="w-4 h-4" /> Following
//                   {feedFilter === 'following' && <span className="ml-auto text-[10px] bg-white/20 px-2 py-0.5 rounded-full">Active</span>}
//                 </button>
//               </div>
//             </CollapsibleCard>

//             <CollapsibleCard title="Category" defaultOpen={true}>
//               <div className="space-y-1">
//                 <button onClick={() => setCategoryFilter('all')}
//                   className={`w-full text-left px-4 py-2.5 rounded-2xl text-sm font-bold transition-all flex items-center justify-between ${categoryFilter === 'all' ? 'bg-orange-100 text-orange-700' : 'text-slate-500 hover:bg-orange-50'}`}>
//                   <span>🌐 All</span>
//                   {categoryFilter === 'all' && <span className="w-2 h-2 rounded-full bg-orange-500" />}
//                 </button>
//                 {CATEGORIES.map(c => (
//                   <button key={c} onClick={() => setCategoryFilter(c)}
//                     className={`w-full text-left px-4 py-2.5 rounded-2xl text-sm font-bold transition-all flex items-center justify-between ${categoryFilter === c ? 'bg-orange-100 text-orange-700' : 'text-slate-500 hover:bg-orange-50'}`}>
//                     <span>{CAT_EMOJI[c]} {c}</span>
//                     {categoryFilter === c && <span className="w-2 h-2 rounded-full bg-orange-500" />}
//                   </button>
//                 ))}
//               </div>
//             </CollapsibleCard>

//             {cities.length > 0 && (
//               <CollapsibleCard title="City" defaultOpen={false}>
//                 <div className="flex items-center gap-2 bg-orange-50 rounded-2xl px-3 py-2">
//                   <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
//                   <select value={cityFilter} onChange={e => setCityFilter(e.target.value)}
//                     className="bg-transparent text-sm font-bold text-orange-700 focus:outline-none cursor-pointer w-full">
//                     <option value="all">All Cities</option>
//                     {cities.map(c => <option key={c} value={c}>{c}</option>)}
//                   </select>
//                 </div>
//               </CollapsibleCard>
//             )}

//           </aside>

//           {/* Main Feed */}
//           <div className="lg:col-span-9">
//             {/* Following banner */}
//             {feedFilter === 'following' && (
//               <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
//                 className="flex items-center gap-3 bg-orange-600 text-white rounded-2xl px-5 py-3 mb-4 shadow-md shadow-orange-200">
//                 <Users className="w-5 h-5 shrink-0" />
//                 <div className="flex-1">
//                   <p className="text-sm font-black">Following Feed</p>
//                   <p className="text-xs text-orange-100">Posts from devotees you follow</p>
//                 </div>
//                 <Sparkles className="w-4 h-4 opacity-70" />
//               </motion.div>
//             )}

//             <CreatePost currentUser={currentUser} onPost={handleNewPost} />

//             {loading ? (
//               <div className="space-y-4">
//                 {[1, 2, 3].map(i => (
//                   <div key={i} className="bg-white rounded-[2rem] border border-orange-50 p-5 animate-pulse">
//                     <div className="flex gap-3 mb-4">
//                       <div className="w-10 h-10 bg-orange-100 rounded-full" />
//                       <div className="flex-1 space-y-2">
//                         <div className="h-3 bg-orange-100 rounded-full w-1/3" />
//                         <div className="h-2 bg-orange-50 rounded-full w-1/4" />
//                       </div>
//                     </div>
//                     <div className="space-y-2">
//                       <div className="h-3 bg-orange-50 rounded-full" />
//                       <div className="h-3 bg-orange-50 rounded-full w-4/5" />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : posts.length === 0 ? (
//               <div className="bg-white rounded-[2rem] border border-dashed border-orange-200 p-16 text-center shadow-inner">
//                 <div className="text-5xl mb-4">🙏</div>
//                 <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">
//                   {feedFilter === 'following' ? 'Follow devotees to see their posts' : 'No posts yet'}
//                 </p>
//                 <p className="text-xs text-slate-400">Be the first to share your spiritual experience!</p>
//               </div>
//             ) : (
//               <AnimatePresence mode="popLayout">
//                 {posts.map(post => (
//                   <PostCard key={post._id} post={post} currentUserId={currentUser._id}
//                     onUpdate={handleUpdate} onDelete={handleDelete} />
//                 ))}
//               </AnimatePresence>
//             )}

//             <div ref={loadMoreRef} className="py-6 text-center">
//               {loadingMore && <Loader2 className="w-6 h-6 text-orange-500 animate-spin mx-auto" />}
//               {!hasMore && posts.length > 0 && (
//                 <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">🙏 जय श्री राम</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>

//       <footer className="py-12 text-center border-t border-orange-100 mt-4">
//         <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.8em]">जय श्री राम</p>
//       </footer>
//     </div>
//   );
// }

'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Heart, MessageCircle, Share2, MoreHorizontal, Send, Image as ImageIcon, X, MapPin, Users, Globe, Loader2, Trash2, AlertTriangle, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import ImageUploader from '@/components/ImageUploader';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';

interface Author { _id: string; name: string; username: string; city: string; profileImage?: string; dob?: string; }
interface Comment { _id: string; user: Author; text: string; createdAt: string; }
interface Post {
  _id: string; author: Author; text: string; images: string[];
  category: string; city: string; state: string;
  likesCount: number; commentsCount: number; sharesCount: number;
  isLiked: boolean; isFollowing: boolean;
  comments: Comment[]; createdAt: string;
}
interface BirthdayUser { _id: string; name: string; username: string; dob: string; }

const CATEGORIES = ['General', 'Pooja', 'Katha', 'Bhandara', 'Bhajan', 'Temple'];
const CAT_EMOJI: Record<string, string> = { General: '🙏', Pooja: '🪔', Katha: '📖', Bhandara: '🍛', Bhajan: '🎵', Temple: '🛕' };
const CAT_COLOR: Record<string, string> = { General: 'bg-orange-100 text-orange-700', Pooja: 'bg-yellow-100 text-yellow-700', Katha: 'bg-blue-100 text-blue-700', Bhandara: 'bg-green-100 text-green-700', Bhajan: 'bg-purple-100 text-purple-700', Temple: 'bg-red-100 text-red-700' };

const brown = '#4a2410';
const muted = '#9a6b4b';

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function isTodayBirthday(dob?: string): boolean {
  if (!dob) return false;
  const d = new Date(dob);
  const today = new Date();
  return d.getMonth() === today.getMonth() && d.getDate() === today.getDate();
}

function Avatar({ user, size = 'md' }: { user: Author; size?: 'sm' | 'md' | 'lg' }) {
  const s = size === 'sm' ? 'w-8 h-8 text-sm' : size === 'lg' ? 'w-12 h-12 text-xl' : 'w-11 h-11 text-base';
  return (
    <div className="relative flex-shrink-0">
      {user.profileImage ? (
        <img src={user.profileImage} alt={user.name} className={`${s} rounded-2xl object-cover ring-2 ring-orange-100`} />
      ) : (
        <div className={`${s} rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-black`}>
          {user.name?.[0]?.toUpperCase()}
        </div>
      )}
      {isTodayBirthday(user.dob) && (
        <span className="absolute -top-1 -right-1 text-base leading-none" title="🎂 Birthday today!">🎂</span>
      )}
    </div>
  );
}

function CreatePost({ currentUser, onPost }: { currentUser: any; onPost: (p: Post) => void }) {
  const [text, setText] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [category, setCategory] = useState('General');
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [posting, setPosting] = useState(false);

  const submit = async () => {
    if (!text.trim() && images.length === 0) return;
    setPosting(true);
    try {
      const res = await api.post('/api/community/posts', { text, images, category });
      const data = await res.json();
      if (data.success) { onPost(data.post); setText(''); setImages([]); setCategory('General'); setShowImageUpload(false); }
    } catch (e) { console.error(e); }
    finally { setPosting(false); }
  };

  return (
    <div className="clay-card p-4 sm:p-5 mb-5" style={{ borderRadius: '1.75rem' }}>
      <div className="flex gap-3">
        <Avatar user={currentUser} size="md" />
        <div className="flex-1 min-w-0">
          <textarea
            value={text} onChange={e => setText(e.target.value)}
            placeholder="🙏 अपना अनुभव साझा करें..."
            rows={3}
            className="clay-input w-full resize-none text-sm font-semibold"
            style={{ paddingLeft: '1rem' }}
          />
          <div className="-mx-1 px-1 mt-3 overflow-x-auto dash-scroll">
            <div className="flex gap-2 w-max sm:w-auto sm:flex-wrap pb-1">
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setCategory(c)} aria-pressed={category === c}
                  className={`min-h-[36px] px-3.5 rounded-full text-xs font-black whitespace-nowrap transition-all active:scale-95 ${category === c ? 'text-white shadow-md' : 'bg-orange-50 text-orange-700 hover:bg-orange-100'}`}
                  style={category === c ? { background: 'linear-gradient(135deg, #fb923c, #ea580c)' } : undefined}>
                  {CAT_EMOJI[c]} {c}
                </button>
              ))}
            </div>
          </div>
          {showImageUpload && (
            <div className="mt-3">
              <ImageUploader value={images} onChange={v => setImages(v as string[])} multiple folder="community" label="" />
            </div>
          )}
          <div className="flex items-center justify-between mt-3 gap-3">
            <button onClick={() => setShowImageUpload(!showImageUpload)}
              className={`flex items-center gap-1.5 min-h-[44px] text-sm font-black px-4 rounded-2xl transition-all active:scale-95 ${showImageUpload ? 'bg-orange-100 text-orange-700' : 'text-[#9a6b4b] bg-orange-50/70 hover:bg-orange-100'}`}>
              <ImageIcon className="w-4 h-4" />
              {images.length > 0 ? `${images.length} photo${images.length > 1 ? 's' : ''}` : 'Photo'}
            </button>
            <button onClick={submit} disabled={posting || (!text.trim() && images.length === 0)}
              className="clay-btn clay-btn-saffron flex items-center gap-2 px-6 min-h-[44px] text-sm disabled:opacity-40 disabled:cursor-not-allowed">
              {posting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />} Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PostCard({ post, currentUserId, onUpdate, onDelete }: {
  post: Post; currentUserId: string;
  onUpdate: (id: string, changes: Partial<Post>) => void;
  onDelete: (id: string) => void;
}) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commenting, setCommenting] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);
  const [toast, setToast] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (menuRef.current && !menuRef.current.contains(e.target as Node)) setShowMenu(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const flash = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2000); };

  const handleLike = async () => {
    onUpdate(post._id, { isLiked: !post.isLiked, likesCount: post.isLiked ? post.likesCount - 1 : post.likesCount + 1 });
    try { await api.post(`/api/community/posts/${post._id}/like`); }
    catch { onUpdate(post._id, { isLiked: post.isLiked, likesCount: post.likesCount }); }
  };

  const handleFollow = async () => {
    onUpdate(post._id, { isFollowing: !post.isFollowing });
    try { await api.post(`/api/community/follow/${post.author._id}`); }
    catch { onUpdate(post._id, { isFollowing: post.isFollowing }); }
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/community#${post._id}`;
    try {
      if (navigator.share) await navigator.share({ title: 'Ram Ji Ki Sena', url });
      else { await navigator.clipboard.writeText(url); flash('🔗 Link copy ho gaya!'); }
    } catch {}
    try {
      await api.post(`/api/community/posts/${post._id}/share`);
      onUpdate(post._id, { sharesCount: post.sharesCount + 1 });
    } catch {}
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;
    setCommenting(true);
    try {
      const res = await api.post(`/api/community/posts/${post._id}/comment`, { text: commentText });
      const data = await res.json();
      if (data.success) { onUpdate(post._id, { comments: [...post.comments, data.comment], commentsCount: data.commentsCount }); setCommentText(''); }
    } catch (e) { console.error(e); }
    finally { setCommenting(false); }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const res = await api.delete(`/api/community/posts/${post._id}/comment/${commentId}`);
      const data = await res.json();
      if (data.success) onUpdate(post._id, { comments: post.comments.filter(c => c._id !== commentId), commentsCount: data.commentsCount });
    } catch (e) { console.error(e); }
  };

  const handleReport = async () => {
    setShowMenu(false);
    if (!window.confirm('Report this post?')) return;
    try { await api.post(`/api/community/posts/${post._id}/report`); flash('Report bhej di gayi'); } catch {}
  };

  const handleDelete = async () => {
    setShowMenu(false);
    if (!window.confirm('Delete this post?')) return;
    try {
      const res = await api.delete(`/api/community/posts/${post._id}`);
      const data = await res.json();
      if (data.success) onDelete(post._id);
    } catch (e) { console.error(e); }
  };

  const isOwn = post.author._id === currentUserId;

  return (
    <motion.div
      id={post._id}
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      className="clay-card relative mb-5 scroll-mt-28"
      style={{ borderRadius: '1.75rem' }}
    >
      {toast && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 bg-slate-900 text-white text-xs font-black px-4 py-2 rounded-full shadow-lg pointer-events-none">{toast}</div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-2 p-4 sm:p-5 pb-3">
        <div className="flex items-center gap-3 min-w-0">
          <Link href={`/community/${post.author.username}`}>
            <Avatar user={post.author} />
          </Link>
          <div className="min-w-0">
            <div className="flex items-center gap-x-2 gap-y-0.5 flex-wrap">
              <Link href={`/community/${post.author.username}`} className="font-black text-sm hover:text-orange-600 transition-colors tracking-tight truncate max-w-[10rem] sm:max-w-none" style={{ color: brown }}>
                {post.author.name}
              </Link>
              <span className="text-xs font-semibold hidden sm:inline" style={{ color: muted }}>@{post.author.username}</span>
              {post.author.city && (
                <span className="flex items-center gap-0.5 text-[11px] text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full font-bold">
                  <MapPin className="w-3 h-3" />{post.author.city}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-semibold" style={{ color: muted }}>{timeAgo(post.createdAt)}</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-black ${CAT_COLOR[post.category] || 'bg-orange-100 text-orange-700'}`}>
                {CAT_EMOJI[post.category]} {post.category}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          {!isOwn && (
            <button onClick={handleFollow}
              className={`text-xs font-black px-3.5 min-h-[36px] rounded-full transition-all active:scale-95 ${post.isFollowing ? 'bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600' : 'text-white shadow-md shadow-orange-200'}`}
              style={!post.isFollowing ? { background: 'linear-gradient(135deg, #fb923c, #ea580c)' } : undefined}>
              {post.isFollowing ? '✓ Following' : '+ Follow'}
            </button>
          )}
          <div className="relative" ref={menuRef}>
            <button onClick={() => setShowMenu(!showMenu)} aria-label="Options"
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-orange-50 active:scale-90 transition-all">
              <MoreHorizontal className="w-5 h-5 text-slate-400" />
            </button>
            {showMenu && (
              <div className="absolute right-0 top-11 bg-white rounded-2xl shadow-xl border border-orange-100 py-1 z-20 w-44">
                {isOwn ? (
                  <button onClick={handleDelete} className="flex items-center gap-2 w-full px-4 min-h-[44px] text-sm text-red-600 hover:bg-red-50 transition-colors font-bold">
                    <Trash2 className="w-4 h-4" /> Delete Post
                  </button>
                ) : (
                  <button onClick={handleReport} className="flex items-center gap-2 w-full px-4 min-h-[44px] text-sm text-slate-700 hover:bg-orange-50 transition-colors font-bold">
                    <AlertTriangle className="w-4 h-4" /> Report
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Text */}
      {post.text && <p className="px-4 sm:px-5 pb-4 text-slate-700 text-[15px] leading-relaxed whitespace-pre-wrap break-words">{post.text}</p>}

      {/* Images */}
      {post.images.length > 0 && (
        <div className="relative mx-3 mb-3 rounded-2xl overflow-hidden bg-orange-50">
          <img src={post.images[imgIdx]} alt="post" className="w-full max-h-[28rem] object-cover" loading="lazy" />
          {post.images.length > 1 && (
            <>
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
                {post.images.map((_, i) => (
                  <button key={i} onClick={() => setImgIdx(i)} aria-label={`Photo ${i + 1}`}
                    className={`w-2 h-2 rounded-full transition-all ${i === imgIdx ? 'bg-white scale-125' : 'bg-white/60'}`} />
                ))}
              </div>
              {imgIdx < post.images.length - 1 && (
                <button onClick={() => setImgIdx(i => i + 1)} aria-label="Agli photo" className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 text-white rounded-full flex items-center justify-center hover:bg-black/60 text-xl">›</button>
              )}
              {imgIdx > 0 && (
                <button onClick={() => setImgIdx(i => i - 1)} aria-label="Pichli photo" className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 text-white rounded-full flex items-center justify-center hover:bg-black/60 text-xl">‹</button>
              )}
            </>
          )}
        </div>
      )}

      {/* Action Bar */}
      <div className="px-3 sm:px-4 py-2.5 flex items-center gap-1 border-t border-orange-100">
        <button onClick={handleLike} aria-pressed={post.isLiked}
          className={`flex items-center gap-1.5 px-3.5 min-h-[44px] rounded-2xl text-sm font-black transition-all active:scale-90 ${post.isLiked ? 'text-red-500 bg-red-50' : 'text-[#9a6b4b] hover:bg-orange-50'}`}>
          <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-red-500' : ''}`} />
          {post.likesCount > 0 && <span>{post.likesCount}</span>}
        </button>
        <button onClick={() => setShowComments(!showComments)} aria-expanded={showComments}
          className={`flex items-center gap-1.5 px-3.5 min-h-[44px] rounded-2xl text-sm font-black transition-all active:scale-90 ${showComments ? 'text-orange-600 bg-orange-50' : 'text-[#9a6b4b] hover:bg-orange-50'}`}>
          <MessageCircle className="w-5 h-5" />
          {post.commentsCount > 0 && <span>{post.commentsCount}</span>}
        </button>
        <button onClick={handleShare}
          className="flex items-center gap-1.5 px-3.5 min-h-[44px] rounded-2xl text-sm font-black text-[#9a6b4b] hover:bg-orange-50 transition-all active:scale-90">
          <Share2 className="w-5 h-5" />
          {post.sharesCount > 0 && <span>{post.sharesCount}</span>}
        </button>
      </div>

      {/* Comments */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-orange-100 px-3 sm:px-4 py-4 space-y-3 overflow-hidden"
          >
            {post.comments.length === 0 && <p className="text-sm font-semibold text-center py-2" style={{ color: muted }}>Abhi koi comment nahi. Pehle aap likhein! 🙏</p>}
            {post.comments.map(c => (
              <div key={c._id} className="flex gap-2.5">
                <Avatar user={c.user} size="sm" />
                <div className="flex-1 min-w-0 bg-orange-50/70 border border-orange-100 rounded-2xl px-3.5 py-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black truncate" style={{ color: brown }}>{c.user.name}</span>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <span className="text-[11px] font-semibold" style={{ color: muted }}>{timeAgo(c.createdAt)}</span>
                      {c.user._id === currentUserId && (
                        <button onClick={() => handleDeleteComment(c._id)} aria-label="Comment delete karein"
                          className="w-7 h-7 flex items-center justify-center rounded-full text-red-400 hover:text-red-600 hover:bg-red-50 transition-all">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 mt-0.5 break-words">{c.text}</p>
                </div>
              </div>
            ))}
            <div className="flex gap-2 pt-1">
              <input value={commentText} onChange={e => setCommentText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleComment()}
                placeholder="Comment likhein..."
                className="dash-input flex-1 min-w-0" style={{ borderRadius: '1rem', padding: '0.65rem 1rem' }} />
              <button onClick={handleComment} disabled={commenting || !commentText.trim()} aria-label="Comment bhejein"
                className="w-11 h-11 flex-shrink-0 text-white rounded-2xl flex items-center justify-center transition-all disabled:opacity-40 active:scale-90"
                style={{ background: 'linear-gradient(135deg, #fb923c, #ea580c)' }}>
                {commenting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function CommunityPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [cities, setCities] = useState<string[]>([]);
  const [feedFilter, setFeedFilter] = useState<'all' | 'following'>('all');
  const [cityFilter, setCityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [birthdayUsers, setBirthdayUsers] = useState<BirthdayUser[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/login'); return; }

    // Try localStorage first for instant load
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        setCurrentUser(JSON.parse(userStr));
      } catch {}
    }

    // Always verify with API to get fresh data
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3100';
    fetch(`${API_URL}/api/me`, {
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then(res => {
        if (res.status === 401) {
          // Only on explicit 401 - clear and redirect
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/login');
          return null;
        }
        return res.ok ? res.json() : null;
      })
      .then(data => {
        if (data?.success && data.user) {
          setCurrentUser(data.user);
          localStorage.setItem('user', JSON.stringify(data.user));
        }
      })
      .catch(() => {
        // Network error - keep user logged in if token exists
        if (!userStr) setCurrentUser({ _id: '', name: 'User', username: 'user', city: '' });
      });

    fetchCities();
    fetchBirthdays();
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    setPosts([]); setPage(1); setHasMore(true);
    fetchPosts(1, true);
  }, [feedFilter, cityFilter, categoryFilter, currentUser]);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !loadingMore) loadMore();
    }, { threshold: 0.1 });
    if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);
    return () => observerRef.current?.disconnect();
  }, [hasMore, loadingMore, page]);

  const fetchCities = async () => {
    try {
      const res = await api.get('/api/community/cities');
      const data = await res.json();
      if (data.success) setCities(data.cities);
    } catch (e) {}
  };

  const fetchBirthdays = async () => {
    try {
      const res = await api.get('/api/birthdays');
      const data = await res.json();
      if (data.success && data.users.length > 0) {
        setBirthdayUsers(data.users);
      }
    } catch (e) {}
  };

  const fetchPosts = async (p: number, reset = false) => {
    if (reset) setLoading(true); else setLoadingMore(true);
    try {
      const params = new URLSearchParams({
        page: String(p), limit: '10', filter: feedFilter,
        ...(cityFilter !== 'all' && { city: cityFilter }),
        ...(categoryFilter !== 'all' && { category: categoryFilter }),
      });
      const res = await api.get(`/api/community/posts?${params}`);
      const data = await res.json();
      if (data.success) {
        setPosts(prev => reset ? data.posts : [...prev, ...data.posts]);
        setHasMore(data.hasMore);
        setPage(p);
      }
    } catch (e) { console.error(e); }
    finally { setLoading(false); setLoadingMore(false); }
  };

  const loadMore = () => { if (!loadingMore && hasMore) fetchPosts(page + 1); };
  const handleNewPost = (post: Post) => setPosts(prev => [post, ...prev]);
  const handleUpdate = (id: string, changes: Partial<Post>) => setPosts(prev => prev.map(p => p._id === id ? { ...p, ...changes } : p));
  const handleDelete = (id: string) => setPosts(prev => prev.filter(p => p._id !== id));

  if (!currentUser) return (
    <div className="clay-bg min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-14 h-14 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-orange-700 font-black">जय श्री राम...</p>
      </div>
    </div>
  );

  const pill = (active: boolean) =>
    `min-h-[44px] px-4 rounded-2xl text-sm font-black whitespace-nowrap flex items-center gap-2 transition-all active:scale-95 ${
      active ? 'text-white shadow-md' : 'bg-white text-[#9a6b4b] border border-orange-100 hover:bg-orange-50'}`;
  const pillStyle = (active: boolean) => active ? { background: 'linear-gradient(135deg, #fb923c, #ea580c)' } : undefined;

  const sideBtn = (active: boolean) =>
    `w-full flex items-center gap-2.5 px-4 min-h-[48px] rounded-2xl text-sm font-black transition-all active:scale-[0.97] ${
      active ? 'text-white shadow-md' : 'hover:bg-orange-50'}`;

  return (
    <div className="clay-bg clay-bigtext min-h-screen relative overflow-x-hidden">
      <Navbar showAuthButtons={true} />

      <div className="clay-om-wrap"><span className="clay-om">ॐ</span></div>
      <div className="clay-blob w-56 h-56 -top-16 -left-16 bg-[#ffd0a8]" style={{ animation: 'float 7s ease-in-out infinite' }} />
      <div className="clay-blob w-40 h-40 bottom-10 -right-10 bg-[#ffc3a0]" style={{ animation: 'float 9s ease-in-out infinite' }} />

      <main className="relative z-10 max-w-6xl mx-auto px-3 sm:px-6 pt-28 sm:pt-32 pb-12">

        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center lg:text-left">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight" style={{ color: brown }}>
              भक्त <span className="text-orange-600">समुदाय</span>
            </h1>
            <p className="text-sm font-semibold mt-2" style={{ color: muted }}>
              Community Feed · अपनी आध्यात्मिक यात्रा साझा करें
            </p>
          </motion.div>
        </div>

        {/* Birthday banner */}
        {birthdayUsers.length > 0 && (
          <div className="clay-card flex items-center gap-3 p-4 mb-5" style={{ borderRadius: '1.5rem', background: 'linear-gradient(135deg, #fff7e0, #ffedc2)' }}>
            <span className="text-3xl">🎂</span>
            <div className="min-w-0">
              <p className="text-sm font-black" style={{ color: brown }}>आज जन्मदिन है!</p>
              <p className="text-xs font-semibold truncate" style={{ color: muted }}>
                {birthdayUsers.slice(0, 3).map(u => u.name).join(', ')}{birthdayUsers.length > 3 ? ` +${birthdayUsers.length - 3} aur` : ''} 🙏
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">

          {/* Filters: mobile par chips, laptop par left sidebar */}
          <aside className="lg:col-span-3 min-w-0">
            {/* Mobile / tablet */}
            <div className="lg:hidden space-y-2.5 mb-1">
              <div className="-mx-3 px-3 sm:mx-0 sm:px-0 overflow-x-auto dash-scroll">
                <div className="flex gap-2 w-max sm:w-auto sm:flex-wrap pb-1">
                  <button onClick={() => setFeedFilter('all')} className={pill(feedFilter === 'all')} style={pillStyle(feedFilter === 'all')}>
                    <Globe className="w-4 h-4" /> All Posts
                  </button>
                  <button onClick={() => setFeedFilter('following')} className={pill(feedFilter === 'following')} style={pillStyle(feedFilter === 'following')}>
                    <Users className="w-4 h-4" /> Following
                  </button>
                  {cities.length > 0 && (
                    <div className="min-h-[44px] flex items-center gap-2 bg-white border border-orange-100 rounded-2xl px-3">
                      <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                      <select value={cityFilter} onChange={e => setCityFilter(e.target.value)} aria-label="City"
                        className="bg-transparent text-sm font-black text-orange-700 focus:outline-none cursor-pointer">
                        <option value="all">All Cities</option>
                        {cities.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  )}
                </div>
              </div>
              <div className="-mx-3 px-3 sm:mx-0 sm:px-0 overflow-x-auto dash-scroll">
                <div className="flex gap-2 w-max sm:w-auto sm:flex-wrap pb-1">
                  <button onClick={() => setCategoryFilter('all')} className={pill(categoryFilter === 'all')} style={pillStyle(categoryFilter === 'all')}>🌐 All</button>
                  {CATEGORIES.map(c => (
                    <button key={c} onClick={() => setCategoryFilter(c)} className={pill(categoryFilter === c)} style={pillStyle(categoryFilter === c)}>
                      {CAT_EMOJI[c]} {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Laptop */}
            <div className="hidden lg:block space-y-4 sticky top-28">
              <div className="clay-card p-4" style={{ borderRadius: '1.75rem' }}>
                <p className="dash-section mb-3 ml-1">Feed</p>
                <div className="space-y-1.5">
                  <button onClick={() => setFeedFilter('all')} className={sideBtn(feedFilter === 'all')}
                    style={{ ...(feedFilter === 'all' ? { background: 'linear-gradient(135deg, #fb923c, #ea580c)' } : { color: muted }) }}>
                    <Globe className="w-4 h-4" /> All Posts
                  </button>
                  <button onClick={() => setFeedFilter('following')} className={sideBtn(feedFilter === 'following')}
                    style={{ ...(feedFilter === 'following' ? { background: 'linear-gradient(135deg, #fb923c, #ea580c)' } : { color: muted }) }}>
                    <Users className="w-4 h-4" /> Following
                  </button>
                </div>
              </div>

              <div className="clay-card p-4" style={{ borderRadius: '1.75rem' }}>
                <p className="dash-section mb-3 ml-1">Category</p>
                <div className="space-y-1">
                  {['all', ...CATEGORIES].map(c => (
                    <button key={c} onClick={() => setCategoryFilter(c)}
                      className={`w-full text-left px-4 min-h-[44px] rounded-2xl text-sm font-black transition-all flex items-center justify-between ${categoryFilter === c ? 'bg-orange-100 text-orange-700' : 'hover:bg-orange-50'}`}
                      style={categoryFilter === c ? undefined : { color: muted }}>
                      <span>{c === 'all' ? '🌐 All' : `${CAT_EMOJI[c]} ${c}`}</span>
                      {categoryFilter === c && <span className="w-2 h-2 rounded-full bg-orange-500" />}
                    </button>
                  ))}
                </div>
              </div>

              {cities.length > 0 && (
                <div className="clay-card p-4" style={{ borderRadius: '1.75rem' }}>
                  <p className="dash-section mb-3 ml-1">City</p>
                  <div className="flex items-center gap-2 bg-orange-50 rounded-2xl px-3 min-h-[44px]">
                    <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                    <select value={cityFilter} onChange={e => setCityFilter(e.target.value)}
                      className="bg-transparent text-sm font-black text-orange-700 focus:outline-none cursor-pointer w-full">
                      <option value="all">All Cities</option>
                      {cities.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Main Feed */}
          <div className="lg:col-span-9 min-w-0">
            {feedFilter === 'following' && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 text-white rounded-2xl px-5 py-3 mb-4 shadow-md shadow-orange-200"
                style={{ background: 'linear-gradient(135deg, #fb923c, #ea580c)' }}>
                <Users className="w-5 h-5 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-black">Following Feed</p>
                  <p className="text-xs text-orange-100">Aap jin bhakton ko follow karte hain unki posts</p>
                </div>
                <Sparkles className="w-4 h-4 opacity-70" />
              </motion.div>
            )}

            <CreatePost currentUser={currentUser} onPost={handleNewPost} />

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="clay-card p-5 animate-pulse" style={{ borderRadius: '1.75rem' }}>
                    <div className="flex gap-3 mb-4">
                      <div className="w-11 h-11 bg-orange-100 rounded-2xl" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 bg-orange-100 rounded-full w-1/3" />
                        <div className="h-2 bg-orange-50 rounded-full w-1/4" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-orange-50 rounded-full" />
                      <div className="h-3 bg-orange-50 rounded-full w-4/5" />
                    </div>
                  </div>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="clay-card p-12 sm:p-16 text-center" style={{ borderRadius: '1.75rem' }}>
                <div className="text-5xl mb-4">🙏</div>
                <p className="text-base font-black mb-1" style={{ color: brown }}>
                  {feedFilter === 'following' ? 'Bhakton ko follow karein, unki posts yaha dikhengi' : 'Abhi koi post nahi'}
                </p>
                <p className="text-sm font-semibold" style={{ color: muted }}>Pehle apna spiritual anubhav share karein!</p>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {posts.map(post => (
                  <PostCard key={post._id} post={post} currentUserId={currentUser._id}
                    onUpdate={handleUpdate} onDelete={handleDelete} />
                ))}
              </AnimatePresence>
            )}

            <div ref={loadMoreRef} className="py-6 text-center">
              {loadingMore && <Loader2 className="w-6 h-6 text-orange-500 animate-spin mx-auto" />}
              {!hasMore && posts.length > 0 && (
                <p className="text-[11px] font-black uppercase tracking-[0.5em]" style={{ color: muted }}>🙏 जय श्री राम</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
