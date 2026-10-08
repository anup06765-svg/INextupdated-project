// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';

// export default function CreateBlogPage() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     title: '',
//     content: '',
//     category: 'Spiritual Knowledge'
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   const categories = [
//     'Spiritual Knowledge',
//     'Mandir Stories',
//     'Pooja Guides',
//     'Personal Experience',
//     'Other'
//   ];

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/create`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (data.success) {
//         setMessage('✅ Blog created successfully! Waiting for admin approval.');
//         setTimeout(() => {
//           router.push('/blogs');
//         }, 2000);
//       } else {
//         setMessage(data.message || 'Failed to create blog');
//       }
//     } catch (error) {
//       setMessage('Error creating blog');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
//       {/* Header */}
//       <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 shadow-lg">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
//                 <span className="text-2xl">✍️</span>
//               </div>
//               <h1 className="text-2xl font-bold">Write Blog</h1>
//             </div>
//             <Link href="/blogs" className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition">
//               ← Back
//             </Link>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-8">
//         <div className="max-w-4xl mx-auto">
//           <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-orange-200">
//             <h2 className="text-3xl font-bold text-orange-700 mb-6">Share Your Spiritual Experience</h2>

//             {message && (
//               <div className={`mb-4 p-3 rounded-lg ${
//                 message.includes('✅') 
//                   ? 'bg-green-100 text-green-700' 
//                   : 'bg-red-100 text-red-700'
//               }`}>
//                 {message}
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label className="block text-gray-700 font-medium mb-2">Category</label>
//                 <select
//                   value={formData.category}
//                   onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                   className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
//                 >
//                   {categories.map((cat) => (
//                     <option key={cat} value={cat}>{cat}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-gray-700 font-medium mb-2">Title</label>
//                 <input
//                   type="text"
//                   value={formData.title}
//                   onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                   className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
//                   placeholder="Enter blog title..."
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-700 font-medium mb-2">Content</label>
//                 <textarea
//                   value={formData.content}
//                   onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//                   rows={12}
//                   className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
//                   placeholder="Write your blog content here..."
//                   required
//                 />
//               </div>

//               <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//                 <p className="text-sm text-yellow-800">
//                   📝 Note: Your blog will be reviewed by admin before publishing.
//                 </p>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
//               >
//                 {loading ? 'Publishing...' : 'Publish Blog'}
//               </button>
//             </form>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Send, Loader2, Info } from 'lucide-react';

const MAX_CONTENT = 5000;

export default function CreateBlogPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Spiritual Knowledge',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const categories = [
    'Spiritual Knowledge',
    'Mandir Stories',
    'Pooja Guides',
    'Personal Experience',
    'Other',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setMessage('✅ Blog created successfully! Waiting for admin approval.');
        setTimeout(() => { router.push('/blogs'); }, 2000);
      } else {
        setMessage(data.message || 'Failed to create blog');
      }
    } catch (error) {
      setMessage('Error creating blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="dash-title">Write Blog ✍️</h1>
          <p className="dash-sub">Apna spiritual experience sabke saath share karein</p>
        </div>
        <Link href="/blogs" className="dash-btn-ghost"><ArrowLeft className="w-4 h-4" /> Back</Link>
      </div>

      <div className="dash-card p-5 sm:p-8">
        {message && (
          <div className={`mb-5 px-4 py-3 rounded-2xl text-sm font-bold ${
            message.includes('✅') ? 'bg-green-100 text-green-800 border border-green-200' : 'clay-alert'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="b-cat" className="dash-label">Category</label>
            <select id="b-cat" value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
              className="dash-input">
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="b-title" className="dash-label">Title</label>
            <input id="b-title" type="text" value={formData.title} required maxLength={120}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="dash-input" placeholder="Blog ka title likhein..." />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="b-content" className="dash-label">Content</label>
              <span className="text-xs font-black text-[#9a6b4b] mb-1.5">{formData.content.length}/{MAX_CONTENT}</span>
            </div>
            <textarea id="b-content" value={formData.content} required rows={12} maxLength={MAX_CONTENT}
              onChange={e => setFormData({ ...formData, content: e.target.value })}
              className="dash-input resize-y min-h-[220px]" placeholder="Apna blog yaha likhein..." />
          </div>

          <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
            <Info className="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5" />
            <p className="text-sm font-semibold text-yellow-900">Aapka blog publish hone se pehle admin review karega.</p>
          </div>

          <button type="submit" disabled={loading} className="dash-btn w-full" style={{ minHeight: 54 }}>
            {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Publishing...</> : <><Send className="w-5 h-5" /> Publish Blog</>}
          </button>
        </form>
      </div>
    </div>
  );
}
