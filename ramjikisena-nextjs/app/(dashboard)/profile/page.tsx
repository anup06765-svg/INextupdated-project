// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import { authApi, User } from '@/lib/auth';
// import { Edit2, Check, X, Camera, Upload } from 'lucide-react';
// import { useToast } from '@/components/Toast';

// const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
// const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

// async function uploadToCloudinary(file: File, folder: string): Promise<string> {
//   const fd = new FormData();
//   fd.append('file', file);
//   fd.append('upload_preset', UPLOAD_PRESET!);
//   fd.append('folder', folder);
//   const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, { method: 'POST', body: fd });
//   const data = await res.json();
//   if (!data.secure_url) throw new Error('Upload failed');
//   return data.secure_url;
// }

// function AvatarUpload({ src, name, onChange }: { src?: string | null; name: string; onChange: (url: string) => void }) {
//   const ref = useRef<HTMLInputElement>(null);
//   const [uploading, setUploading] = useState(false);

//   const handle = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setUploading(true);
//     try {
//       const url = await uploadToCloudinary(file, 'profile_avatars');
//       onChange(url);
//     } catch { alert('Upload failed'); }
//     setUploading(false);
//   };

//   return (
//     <div className="relative w-24 h-24 flex-shrink-0">
//       {src ? (
//         <img src={src} alt={name} className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg" />
//       ) : (
//         <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 border-4 border-white shadow-lg flex items-center justify-center text-white text-3xl font-black">
//           {name?.charAt(0)?.toUpperCase()}
//         </div>
//       )}
//       <button onClick={() => ref.current?.click()}
//         className="absolute -bottom-1 -right-1 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-orange-600 transition-colors">
//         {uploading ? <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Camera className="w-4 h-4" />}
//       </button>
//       <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handle} />
//     </div>
//   );
// }

// function CoverUpload({ src, onChange }: { src?: string | null; onChange: (url: string) => void }) {
//   const ref = useRef<HTMLInputElement>(null);
//   const [uploading, setUploading] = useState(false);

//   const handle = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setUploading(true);
//     try {
//       const url = await uploadToCloudinary(file, 'profile_covers');
//       onChange(url);
//     } catch { alert('Upload failed'); }
//     setUploading(false);
//   };

//   return (
//     <div className="relative h-32 rounded-t-3xl overflow-hidden group cursor-pointer" onClick={() => ref.current?.click()}>
//       {src ? (
//         <img src={src} alt="cover" className="w-full h-full object-cover" />
//       ) : (
//         <div className="w-full h-full bg-gradient-to-r from-orange-500 to-red-500" />
//       )}
//       <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
//         <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 bg-white/90 text-slate-800 px-4 py-2 rounded-xl font-bold text-sm">
//           {uploading ? <div className="w-4 h-4 border-2 border-slate-600 border-t-transparent rounded-full animate-spin" /> : <Upload className="w-4 h-4" />}
//           {uploading ? 'Uploading...' : 'Change Cover'}
//         </div>
//       </div>
//       <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handle} />
//     </div>
//   );
// }

// export default function ProfilePage() {
//   const router = useRouter();
//   const toast = useToast();
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '', city: '', contact: '', about: '', dob: '',
//     profileImage: '', coverImage: '',
//   });

//   useEffect(() => {
//     authApi.getCurrentUser().then(u => {
//       if (!u) { router.push('/login'); return; }
//       setUser(u);
//       setFormData({
//         name: u.name, city: u.city, contact: u.contact,
//         about: u.about || '', dob: u.dob ? u.dob.slice(0, 10) : '',
//         profileImage: u.profileImage || '', coverImage: u.coverImage || '',
//       });
//       setLoading(false);
//     }).catch(() => router.push('/login'));
//   }, []);

//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/update`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
//         credentials: 'include',
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (data.success) {
//         toast.success('Profile update ho gaya! ✅');
//         setEditing(false);
//         authApi.getCurrentUser().then(u => { if (u) setUser(u); });
//       } else {
//         toast.error(data.message || 'Update failed');
//       }
//     } catch { toast.error('Error updating profile'); }
//     setSaving(false);
//   };

//   // Save images immediately when changed
//   const saveImage = async (field: 'profileImage' | 'coverImage', url: string) => {
//     setFormData(f => ({ ...f, [field]: url }));
//     const token = localStorage.getItem('token');
//     try {
//       await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/update`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
//         credentials: 'include',
//         body: JSON.stringify({ [field]: url }),
//       });
//       toast.success(field === 'profileImage' ? 'Avatar update ho gaya!' : 'Cover update ho gaya!');
//       authApi.getCurrentUser().then(u => { if (u) setUser(u); });
//     } catch { toast.error('Image save failed'); }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-2xl space-y-6">
//       <div>
//         <h1 className="text-2xl font-black text-slate-900">My Profile</h1>
//         <p className="text-slate-500 text-sm mt-1">Apni profile manage karein</p>
//       </div>

//       {/* Profile Card */}
//       <div className="bg-white rounded-3xl shadow-sm border-2 border-orange-100 overflow-hidden">
//         {/* Cover */}
//         <CoverUpload src={user?.coverImage} onChange={url => saveImage('coverImage', url)} />

//         <div className="px-6 pb-6">
//           <div className="flex justify-between items-end -mt-12 mb-4">
//             <AvatarUpload
//               src={user?.profileImage}
//               name={user?.name || 'U'}
//               onChange={url => saveImage('profileImage', url)}
//             />
//             {!editing && (
//               <button onClick={() => setEditing(true)}
//                 className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition-colors">
//                 <Edit2 className="w-4 h-4" /> Edit Profile
//               </button>
//             )}
//           </div>

//           {editing ? (
//             <div className="space-y-4">
//               {[
//                 { label: 'Name', key: 'name', type: 'text' },
//                 { label: 'City', key: 'city', type: 'text' },
//                 { label: 'Contact', key: 'contact', type: 'tel' },
//               ].map(({ label, key, type }) => (
//                 <div key={key}>
//                   <label className="block text-sm font-bold text-slate-600 mb-1">{label}</label>
//                   <input type={type} value={formData[key as keyof typeof formData]}
//                     onChange={e => setFormData({ ...formData, [key]: e.target.value })}
//                     className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:outline-none text-sm" />
//                 </div>
//               ))}
//               <div>
//                 <label className="block text-sm font-bold text-slate-600 mb-1">Date of Birth 🎂</label>
//                 <input type="date" value={formData.dob}
//                   onChange={e => setFormData({ ...formData, dob: e.target.value })}
//                   max={new Date().toISOString().slice(0, 10)}
//                   className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:outline-none text-sm" />
//               </div>
//               <div>
//                 <label className="block text-sm font-bold text-slate-600 mb-1">
//                   About Me <span className="text-xs font-normal text-slate-400">({formData.about.length}/300)</span>
//                 </label>
//                 <textarea value={formData.about} rows={3}
//                   onChange={e => setFormData({ ...formData, about: e.target.value.slice(0, 300) })}
//                   placeholder="Apne baare mein kuch likhein..."
//                   className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:outline-none text-sm resize-none" />
//               </div>
//               <div className="flex gap-3 pt-1">
//                 <button onClick={handleSave} disabled={saving}
//                   className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-500 text-white rounded-xl font-bold text-sm hover:bg-green-600 disabled:opacity-50">
//                   <Check className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Changes'}
//                 </button>
//                 <button onClick={() => { setEditing(false); setFormData({ name: user?.name || '', city: user?.city || '', contact: user?.contact || '', about: user?.about || '', dob: user?.dob ? user.dob.slice(0, 10) : '', profileImage: user?.profileImage || '', coverImage: user?.coverImage || '' }); }}
//                   className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-300">
//                   <X className="w-4 h-4" /> Cancel
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div>
//               <h2 className="text-2xl font-black text-slate-900">{user?.name}</h2>
//               <p className="text-slate-400 text-sm mb-3">@{user?.username}</p>
//               {user?.about ? (
//                 <p className="text-slate-600 text-sm mb-4 leading-relaxed bg-orange-50 rounded-xl px-4 py-3 border border-orange-100">{user.about}</p>
//               ) : (
//                 <p className="text-slate-400 text-sm mb-4 italic">
//                   No bio yet. <button onClick={() => setEditing(true)} className="text-orange-500 hover:underline not-italic font-semibold">Add one</button>
//                 </p>
//               )}
//               <div className="grid grid-cols-2 gap-3">
//                 <div className="bg-orange-50 text-orange-700 rounded-xl p-3"><p className="text-xs font-bold opacity-60 mb-0.5">City</p><p className="font-bold">{user?.city || '—'}</p></div>
//                 <div className="bg-orange-50 text-orange-700 rounded-xl p-3"><p className="text-xs font-bold opacity-60 mb-0.5">Contact</p><p className="font-bold">{user?.contact || '—'}</p></div>
//                 <div className="bg-blue-50 text-blue-700 rounded-xl p-3"><p className="text-xs font-bold opacity-60 mb-0.5">Rank</p><p className="font-bold">#{user?.rank}</p></div>
//                 <div className="bg-green-50 text-green-700 rounded-xl p-3"><p className="text-xs font-bold opacity-60 mb-0.5">Role</p><p className="font-bold capitalize">{user?.role || '—'}</p></div>
//                 {user?.dob && (
//                   <div className="bg-pink-50 text-pink-700 rounded-xl p-3 col-span-2">
//                     <p className="text-xs font-bold opacity-60 mb-0.5">Date of Birth 🎂</p>
//                     <p className="font-bold">{new Date(user.dob).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Spiritual Stats */}
//       <div className="bg-white rounded-2xl shadow-sm border-2 border-orange-100 p-5">
//         <h3 className="font-black text-slate-800 mb-4">Spiritual Stats</h3>
//         <div className="grid grid-cols-3 gap-3">
//           <div className="bg-purple-50 rounded-xl p-3 text-center"><p className="text-2xl font-black text-purple-600">{user?.totalCount || 0}</p><p className="text-xs font-bold text-slate-500 mt-1">Total Count</p></div>
//           <div className="bg-pink-50 rounded-xl p-3 text-center"><p className="text-2xl font-black text-pink-600">{Number(user?.mala || 0).toFixed(2)}</p><p className="text-xs font-bold text-slate-500 mt-1">Total Mala</p></div>
//           <div className="bg-yellow-50 rounded-xl p-3 text-center"><p className="text-2xl font-black text-yellow-600">{user?.dailyCounts?.length || 0}</p><p className="text-xs font-bold text-slate-500 mt-1">Days Active</p></div>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { authApi, User } from '@/lib/auth';
import { Edit2, Check, X, Camera, Upload } from 'lucide-react';
import { useToast } from '@/components/Toast';

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

async function uploadToCloudinary(file: File, folder: string): Promise<string> {
  const fd = new FormData();
  fd.append('file', file);
  fd.append('upload_preset', UPLOAD_PRESET!);
  fd.append('folder', folder);
  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, { method: 'POST', body: fd });
  const data = await res.json();
  if (!data.secure_url) throw new Error('Upload failed');
  return data.secure_url;
}

function AvatarUpload({ src, name, onChange }: { src?: string | null; name: string; onChange: (url: string) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file, 'profile_avatars');
      onChange(url);
    } catch { alert('Upload failed'); }
    setUploading(false);
  };

  return (
    <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0">
      {src ? (
        <img src={src} alt={name} className="w-full h-full rounded-3xl object-cover border-4 border-white shadow-xl" />
      ) : (
        <div className="w-full h-full rounded-3xl bg-gradient-to-br from-orange-400 to-red-500 border-4 border-white shadow-xl flex items-center justify-center text-white text-4xl font-black">
          {name?.charAt(0)?.toUpperCase()}
        </div>
      )}
      <button type="button" aria-label="Photo badlein" onClick={() => ref.current?.click()}
        className="absolute -bottom-1 -right-1 w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:bg-orange-600 active:scale-90 transition-all">
        {uploading ? <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Camera className="w-4 h-4" />}
      </button>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handle} />
    </div>
  );
}

function CoverUpload({ src, onChange }: { src?: string | null; onChange: (url: string) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file, 'profile_covers');
      onChange(url);
    } catch { alert('Upload failed'); }
    setUploading(false);
  };

  return (
    <div className="relative h-36 sm:h-44 overflow-hidden group cursor-pointer" onClick={() => ref.current?.click()}>
      {src ? (
        <img src={src} alt="cover" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-gradient-to-r from-orange-500 via-red-500 to-amber-500" />
      )}
      <div className="absolute inset-0 bg-black/10 sm:bg-black/0 sm:group-hover:bg-black/30 transition-all flex items-end sm:items-center justify-end sm:justify-center p-3">
        <div className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex items-center gap-2 bg-white/90 text-slate-800 px-4 py-2 rounded-xl font-bold text-sm">
          {uploading ? <div className="w-4 h-4 border-2 border-slate-600 border-t-transparent rounded-full animate-spin" /> : <Upload className="w-4 h-4" />}
          {uploading ? 'Uploading...' : 'Change Cover'}
        </div>
      </div>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handle} />
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const toast = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '', city: '', contact: '', about: '', dob: '',
    profileImage: '', coverImage: '',
  });

  useEffect(() => {
    authApi.getCurrentUser().then(u => {
      if (!u) { router.push('/login'); return; }
      setUser(u);
      setFormData({
        name: u.name, city: u.city, contact: u.contact,
        about: u.about || '', dob: u.dob ? u.dob.slice(0, 10) : '',
        profileImage: u.profileImage || '', coverImage: u.coverImage || '',
      });
      setLoading(false);
    }).catch(() => router.push('/login'));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Profile update ho gaya! ✅');
        setEditing(false);
        authApi.getCurrentUser().then(u => { if (u) setUser(u); });
      } else {
        toast.error(data.message || 'Update failed');
      }
    } catch { toast.error('Error updating profile'); }
    setSaving(false);
  };

  // Save images immediately when changed
  const saveImage = async (field: 'profileImage' | 'coverImage', url: string) => {
    setFormData(f => ({ ...f, [field]: url }));
    const token = localStorage.getItem('token');
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        credentials: 'include',
        body: JSON.stringify({ [field]: url }),
      });
      toast.success(field === 'profileImage' ? 'Avatar update ho gaya!' : 'Cover update ho gaya!');
      authApi.getCurrentUser().then(u => { if (u) setUser(u); });
    } catch { toast.error('Image save failed'); }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  const infoTiles = [
    { label: 'City',    value: user?.city || '—',        tint: 'bg-orange-50 text-orange-800 border-orange-100' },
    { label: 'Contact', value: user?.contact || '—',     tint: 'bg-amber-50 text-amber-800 border-amber-100' },
    { label: 'Rank',    value: `#${user?.rank ?? '-'}`,  tint: 'bg-blue-50 text-blue-800 border-blue-100' },
    { label: 'Role',    value: user?.role || '—',        tint: 'bg-green-50 text-green-800 border-green-100 capitalize' },
  ];

  const resetForm = () => {
    setEditing(false);
    setFormData({
      name: user?.name || '', city: user?.city || '', contact: user?.contact || '', about: user?.about || '',
      dob: user?.dob ? user.dob.slice(0, 10) : '', profileImage: user?.profileImage || '', coverImage: user?.coverImage || '',
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="dash-title">My Profile</h1>
        <p className="dash-sub">Apni profile manage karein</p>
      </div>

      {/* Profile card */}
      <div className="dash-card overflow-hidden">
        <CoverUpload src={user?.coverImage} onChange={url => saveImage('coverImage', url)} />

        <div className="px-5 sm:px-8 pb-6 sm:pb-8">
          <div className="flex justify-between items-end -mt-12 sm:-mt-14 mb-5 gap-3">
            <AvatarUpload src={user?.profileImage} name={user?.name || 'U'} onChange={url => saveImage('profileImage', url)} />
            {!editing && (
              <button onClick={() => setEditing(true)} className="dash-btn">
                <Edit2 className="w-4 h-4" /> Edit Profile
              </button>
            )}
          </div>

          {editing ? (
            <div className="space-y-5">
              {[
                { label: 'Name', key: 'name', type: 'text' },
                { label: 'City', key: 'city', type: 'text' },
                { label: 'Contact', key: 'contact', type: 'tel' },
              ].map(({ label, key, type }) => (
                <div key={key}>
                  <label className="dash-label">{label}</label>
                  <input type={type} value={formData[key as keyof typeof formData]}
                    onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                    className="dash-input" />
                </div>
              ))}
              <div>
                <label className="dash-label">Date of Birth 🎂</label>
                <input type="date" value={formData.dob}
                  onChange={e => setFormData({ ...formData, dob: e.target.value })}
                  max={new Date().toISOString().slice(0, 10)}
                  className="dash-input" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="dash-label">About Me</label>
                  <span className="text-xs font-black text-[#9a6b4b] mb-1.5">{formData.about.length}/300</span>
                </div>
                <textarea value={formData.about} rows={4}
                  onChange={e => setFormData({ ...formData, about: e.target.value.slice(0, 300) })}
                  placeholder="Apne baare mein kuch likhein..."
                  className="dash-input resize-none" />
              </div>
              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-1">
                <button onClick={resetForm} className="dash-btn-ghost flex-1">
                  <X className="w-4 h-4" /> Cancel
                </button>
                <button onClick={handleSave} disabled={saving} className="dash-btn flex-1"
                  style={{ background: 'linear-gradient(135deg, #4ade80, #16a34a)', boxShadow: '0 10px 22px -10px rgba(22,163,74,0.7)' }}>
                  <Check className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 break-words">{user?.name}</h2>
              <p className="text-[#9a6b4b] text-sm font-bold mb-4">@{user?.username}</p>
              {user?.about ? (
                <p className="text-slate-700 text-[15px] mb-5 leading-relaxed bg-orange-50 rounded-2xl px-4 py-3.5 border border-orange-100 break-words">{user.about}</p>
              ) : (
                <p className="text-[#9a6b4b] text-sm mb-5 font-semibold">
                  Abhi koi bio nahi hai.{' '}
                  <button onClick={() => setEditing(true)} className="text-orange-600 hover:underline font-black">Bio jodein</button>
                </p>
              )}
              <div className="grid grid-cols-2 gap-3">
                {infoTiles.map(t => (
                  <div key={t.label} className={`rounded-2xl p-3.5 border ${t.tint}`}>
                    <p className="text-[11px] font-black uppercase tracking-widest opacity-60 mb-0.5">{t.label}</p>
                    <p className="font-black break-words">{t.value}</p>
                  </div>
                ))}
                {user?.dob && (
                  <div className="bg-pink-50 text-pink-800 border border-pink-100 rounded-2xl p-3.5 col-span-2">
                    <p className="text-[11px] font-black uppercase tracking-widest opacity-60 mb-0.5">Date of Birth 🎂</p>
                    <p className="font-black">{new Date(user.dob).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Spiritual stats */}
      <div className="dash-card p-5 sm:p-6">
        <h3 className="dash-section mb-4">Spiritual Stats</h3>
        <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
          {[
            { v: Number(user?.totalCount || 0).toLocaleString('en-IN'), l: 'Total Count', c: 'text-purple-600', b: 'from-purple-100 to-purple-50' },
            { v: Number(user?.mala || 0).toFixed(2), l: 'Total Mala', c: 'text-pink-600', b: 'from-pink-100 to-pink-50' },
            { v: user?.dailyCounts?.length || 0, l: 'Days Active', c: 'text-amber-600', b: 'from-amber-100 to-amber-50' },
          ].map(x => (
            <div key={x.l} className={`bg-gradient-to-br ${x.b} rounded-2xl p-3 sm:p-4 text-center`}>
              <p className={`text-xl sm:text-3xl font-black ${x.c} break-words`}>{x.v}</p>
              <p className="text-[11px] sm:text-xs font-bold text-slate-500 mt-1">{x.l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}