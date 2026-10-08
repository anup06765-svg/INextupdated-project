// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { Calendar, Phone, ExternalLink, X } from 'lucide-react';

// interface Booking {
//   _id: string;
//   pandit: {
//     _id: string;
//     name: string;
//     photo: string;
//     contact: { phone: string };
//   };
//   poojaType: string;
//   poojaDate: string;
//   poojaTime: string;
//   status: string;
//   location: { address: string; city: string };
//   price: number;
//   createdAt: string;
// }

// const STATUS_FILTERS = ['all', 'pending', 'confirmed', 'completed', 'rejected', 'cancelled'];

// const statusColor = (status: string) => {
//   switch (status) {
//     case 'pending':   return 'bg-yellow-100 text-yellow-800 border-yellow-300';
//     case 'confirmed': return 'bg-green-100 text-green-800 border-green-300';
//     case 'completed': return 'bg-blue-100 text-blue-800 border-blue-300';
//     case 'rejected':  return 'bg-red-100 text-red-800 border-red-300';
//     case 'cancelled': return 'bg-gray-100 text-gray-800 border-gray-300';
//     default:          return 'bg-gray-100 text-gray-800 border-gray-300';
//   }
// };

// const formatTime = (time: string) => {
//   if (!time) return '';
//   const [h, m] = time.split(':');
//   const hour = parseInt(h);
//   return `${hour % 12 || 12}:${m} ${hour >= 12 ? 'PM' : 'AM'}`;
// };

// export default function MyBookingsPage() {
//   const router = useRouter();
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState('all');
//   const [selected, setSelected] = useState<Booking | null>(null);

//   useEffect(() => {
//     fetchBookings();
//   }, [filter]);

//   const fetchBookings = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const url = filter === 'all'
//         ? `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/my-bookings`
//         : `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/my-bookings?status=${filter}`;
//       const res = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
//       const data = await res.json();
//       if (data.success) setBookings(data.bookings);
//     } catch {}
//     setLoading(false);
//   };

//   return (
//     <div className="max-w-4xl space-y-6">

//       {/* Page Header */}
//       <div>
//         <h1 className="text-2xl font-black text-slate-900">My Bookings</h1>
//         <p className="text-slate-500 text-sm mt-1">Apne pandit bookings manage karein</p>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-2xl p-4 shadow-sm border-2 border-orange-100">
//         <div className="flex flex-wrap gap-2">
//           {STATUS_FILTERS.map((s) => (
//             <button
//               key={s}
//               onClick={() => setFilter(s)}
//               className={`px-4 py-1.5 rounded-xl font-bold text-sm transition-all ${
//                 filter === s
//                   ? 'bg-orange-500 text-white shadow-md'
//                   : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//               }`}
//             >
//               {s.charAt(0).toUpperCase() + s.slice(1)}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Content */}
//       {loading ? (
//         <div className="flex items-center justify-center py-20">
//           <div className="text-center">
//             <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-3" />
//             <p className="text-orange-700 font-semibold">Loading...</p>
//           </div>
//         </div>
//       ) : bookings.length === 0 ? (
//         <div className="bg-white rounded-3xl p-12 text-center shadow-sm border-2 border-orange-100">
//           <div className="text-5xl mb-4">📭</div>
//           <h3 className="text-lg font-black text-slate-800 mb-2">No Bookings Found</h3>
//           <p className="text-slate-500 text-sm mb-6">
//             {filter === 'all' ? "Abhi tak koi booking nahi ki" : `Koi ${filter} booking nahi mili`}
//           </p>
//           <Link
//             href="/pandits"
//             className="inline-block px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-xl text-sm hover:shadow-lg transition-all"
//           >
//             Book a Pandit
//           </Link>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {bookings.map((booking) => (
//             <div
//               key={booking._id}
//               className="bg-white rounded-2xl p-5 shadow-sm border-2 border-orange-100 hover:border-orange-300 transition-all"
//             >
//               <div className="flex flex-col sm:flex-row gap-4">
//                 {/* Pandit Photo */}
//                 <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-br from-orange-100 to-red-100 flex-shrink-0 flex items-center justify-center text-2xl">
//                   {booking.pandit?.photo
//                     ? <img src={booking.pandit.photo} alt={booking.pandit.name} className="w-full h-full object-cover" />
//                     : '🕉️'}
//                 </div>

//                 {/* Info */}
//                 <div className="flex-1">
//                   <div className="flex items-center gap-2 flex-wrap mb-1">
//                     <h3 className="font-black text-slate-800">{booking.poojaType}</h3>
//                     <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${statusColor(booking.status)}`}>
//                       {booking.status.toUpperCase()}
//                     </span>
//                   </div>
//                   <p className="text-sm font-semibold text-slate-600 mb-2">{booking.pandit?.name}</p>
//                   <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
//                     <span>📅 {new Date(booking.poojaDate).toLocaleDateString('en-IN')} · {formatTime(booking.poojaTime)}</span>
//                     <span>📍 {booking.location?.city}</span>
//                     <span className="font-bold text-green-600">₹{booking.price?.toLocaleString()}</span>
//                   </div>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex sm:flex-col gap-2 justify-end">
//                   <button
//                     onClick={() => setSelected(booking)}
//                     className="px-4 py-2 bg-orange-500 text-white rounded-xl font-bold text-xs hover:bg-orange-600 transition-colors"
//                   >
//                     Details
//                   </button>
//                   {booking.pandit?.contact?.phone && (
//                     <a
//                       href={`tel:${booking.pandit.contact.phone}`}
//                       className="px-4 py-2 bg-green-500 text-white rounded-xl font-bold text-xs hover:bg-green-600 transition-colors text-center"
//                     >
//                       📞 Call
//                     </a>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Detail Modal */}
//       {selected && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
//             {/* Modal Header */}
//             <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-red-600 text-white p-5 rounded-t-3xl flex items-center justify-between">
//               <h2 className="text-xl font-black">Booking Details</h2>
//               <button onClick={() => setSelected(null)} className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-all">
//                 <X className="w-4 h-4" />
//               </button>
//             </div>

//             <div className="p-5 space-y-4">
//               {/* Status */}
//               <div className="text-center">
//                 <span className={`inline-block px-5 py-2 text-sm font-black rounded-full border-2 ${statusColor(selected.status)}`}>
//                   {selected.status.toUpperCase()}
//                 </span>
//               </div>

//               {/* Pandit */}
//               <div className="bg-orange-50 rounded-2xl p-4 border-2 border-orange-200">
//                 <p className="text-xs font-black text-orange-400 uppercase tracking-widest mb-3">Pandit</p>
//                 <div className="flex items-center gap-3 mb-3">
//                   <div className="w-14 h-14 rounded-xl overflow-hidden bg-orange-100 flex items-center justify-center text-2xl">
//                     {selected.pandit?.photo
//                       ? <img src={selected.pandit.photo} alt={selected.pandit.name} className="w-full h-full object-cover" />
//                       : '🕉️'}
//                   </div>
//                   <div>
//                     <p className="font-black text-slate-800">{selected.pandit?.name}</p>
//                     <p className="text-sm text-slate-500">📞 {selected.pandit?.contact?.phone}</p>
//                   </div>
//                 </div>
//                 <div className="flex gap-2">
//                   <Link href={`/pandits/${selected.pandit?._id}`}
//                     className="flex-1 py-2 bg-orange-500 text-white rounded-xl font-bold text-sm text-center hover:bg-orange-600 transition-colors flex items-center justify-center gap-1">
//                     <ExternalLink className="w-3 h-3" /> Profile
//                   </Link>
//                   <a href={`tel:${selected.pandit?.contact?.phone}`}
//                     className="flex-1 py-2 bg-green-500 text-white rounded-xl font-bold text-sm text-center hover:bg-green-600 transition-colors flex items-center justify-center gap-1">
//                     <Phone className="w-3 h-3" /> Call
//                   </a>
//                 </div>
//               </div>

//               {/* Pooja Details */}
//               <div className="bg-blue-50 rounded-2xl p-4 border-2 border-blue-200">
//                 <p className="text-xs font-black text-blue-400 uppercase tracking-widest mb-3">Pooja Details</p>
//                 <div className="space-y-2 text-sm">
//                   {[
//                     ['Pooja Type', selected.poojaType],
//                     ['Date', new Date(selected.poojaDate).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })],
//                     ['Time', formatTime(selected.poojaTime)],
//                     ['Amount', `₹${selected.price?.toLocaleString()}`],
//                   ].map(([k, v]) => (
//                     <div key={k} className="flex justify-between">
//                       <span className="font-bold text-slate-600">{k}</span>
//                       <span className="text-slate-800 font-semibold">{v}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Location */}
//               <div className="bg-green-50 rounded-2xl p-4 border-2 border-green-200">
//                 <p className="text-xs font-black text-green-400 uppercase tracking-widest mb-2">Location</p>
//                 <p className="text-sm text-slate-700"><span className="font-bold">Address:</span> {selected.location?.address}</p>
//                 <p className="text-sm text-slate-700"><span className="font-bold">City:</span> {selected.location?.city}</p>
//               </div>

//               {/* Booking ID */}
//               <div className="bg-gray-50 rounded-2xl p-4 border-2 border-gray-200">
//                 <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Booking Info</p>
//                 <p className="text-xs text-gray-500 break-all"><span className="font-bold">ID:</span> {selected._id}</p>
//                 <p className="text-xs text-gray-500"><span className="font-bold">Booked On:</span> {new Date(selected.createdAt).toLocaleDateString('en-IN')}</p>
//               </div>

//               <button onClick={() => setSelected(null)}
//                 className="w-full py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors text-sm">
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, ExternalLink, X, MapPin, CalendarDays, Clock } from 'lucide-react';

interface Booking {
  _id: string;
  pandit: {
    _id: string;
    name: string;
    photo: string;
    contact: { phone: string };
  };
  poojaType: string;
  poojaDate: string;
  poojaTime: string;
  status: string;
  location: { address: string; city: string };
  price: number;
  createdAt: string;
}

const STATUS_FILTERS = ['all', 'pending', 'confirmed', 'completed', 'rejected', 'cancelled'];

const statusColor = (status: string) => {
  switch (status) {
    case 'pending':   return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'confirmed': return 'bg-green-100 text-green-800 border-green-300';
    case 'completed': return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'rejected':  return 'bg-red-100 text-red-800 border-red-300';
    default:          return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

const formatTime = (time: string) => {
  if (!time) return '';
  const [h, m] = time.split(':');
  const hour = parseInt(h);
  return `${hour % 12 || 12}:${m} ${hour >= 12 ? 'PM' : 'AM'}`;
};

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<Booking | null>(null);

  useEffect(() => { fetchBookings(); }, [filter]);

  // Modal khula ho to peeche scroll na ho + Esc se band
  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelected(null); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [selected]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const url = filter === 'all'
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/my-bookings`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/my-bookings?status=${filter}`;
      const res = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await res.json();
      if (data.success) setBookings(data.bookings);
    } catch {}
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      <div>
        <h1 className="dash-title">My Bookings 📅</h1>
        <p className="dash-sub">Apne pandit bookings manage karein</p>
      </div>

      {/* Filters: mobile par side me scroll hone wali pills */}
      <div className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto dash-scroll">
        <div className="flex gap-2 w-max sm:w-auto sm:flex-wrap pb-1">
          {STATUS_FILTERS.map(s => (
            <button key={s} onClick={() => setFilter(s)} aria-pressed={filter === s}
              className={`min-h-[44px] px-5 rounded-2xl font-black text-sm whitespace-nowrap transition-all active:scale-95 ${
                filter === s ? 'text-white' : 'bg-white text-[#9a6b4b] border border-orange-100 hover:bg-orange-50'
              }`}
              style={filter === s ? { background: 'linear-gradient(135deg, #fb923c, #ea580c)', boxShadow: '0 10px 20px -10px rgba(234,88,12,0.7)' } : undefined}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-orange-700 font-black">Loading...</p>
          </div>
        </div>
      ) : bookings.length === 0 ? (
        <div className="dash-card p-10 sm:p-14 text-center">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-orange-50 flex items-center justify-center text-4xl mb-4">📭</div>
          <h3 className="text-lg font-black text-slate-900 mb-1">Koi booking nahi mili</h3>
          <p className="text-[#9a6b4b] text-sm font-semibold mb-6">
            {filter === 'all' ? 'Abhi tak koi booking nahi ki' : `Koi ${filter} booking nahi mili`}
          </p>
          <Link href="/pandits" className="dash-btn">Book a Pandit</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map(b => (
            <div key={b._id} className="dash-card dash-card-hover p-4 sm:p-5">
              <div className="flex gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-gradient-to-br from-orange-100 to-red-100 flex-shrink-0 flex items-center justify-center text-3xl">
                  {b.pandit?.photo
                    // eslint-disable-next-line @next/next/no-img-element
                    ? <img src={b.pandit.photo} alt={b.pandit.name} className="w-full h-full object-cover" />
                    : '🕉️'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <h3 className="font-black text-slate-900 text-lg leading-tight break-words">{b.poojaType}</h3>
                    <span className={`text-[11px] font-black px-3 py-1 rounded-full border uppercase ${statusColor(b.status)}`}>{b.status}</span>
                  </div>
                  <p className="text-sm font-bold text-[#9a6b4b] mt-0.5 truncate">{b.pandit?.name}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold text-slate-600 mt-2">
                    <span className="inline-flex items-center gap-1.5"><CalendarDays className="w-4 h-4 text-orange-500" />{new Date(b.poojaDate).toLocaleDateString('en-IN')}</span>
                    <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4 text-orange-500" />{formatTime(b.poojaTime)}</span>
                    <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4 text-orange-500" />{b.location?.city}</span>
                    <span className="font-black text-green-600">₹{b.price?.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <button onClick={() => setSelected(b)} className="dash-btn">Details</button>
                {b.pandit?.contact?.phone ? (
                  <a href={`tel:${b.pandit.contact.phone}`} className="dash-btn"
                    style={{ background: 'linear-gradient(135deg, #4ade80, #16a34a)', boxShadow: '0 10px 22px -10px rgba(22,163,74,0.7)' }}>
                    <Phone className="w-4 h-4" /> Call
                  </a>
                ) : <span />}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail modal: mobile par neeche se bottom-sheet, bade screen par beech me */}
      {selected && (
        <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm sm:p-4"
          onClick={() => setSelected(null)}>
          <div role="dialog" aria-modal="true" aria-label="Booking details" onClick={e => e.stopPropagation()}
            className="bg-[#fffaf3] w-full sm:max-w-lg max-h-[92dvh] overflow-y-auto dash-scroll rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl"
            style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
            <div className="sticky top-0 z-10 text-white p-5 flex items-center justify-between"
              style={{ background: 'linear-gradient(135deg, #fb923c, #ea580c)' }}>
              <h2 className="text-xl font-black">Booking Details</h2>
              <button onClick={() => setSelected(null)} aria-label="Band karein"
                className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 active:scale-90 transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="text-center">
                <span className={`inline-block px-5 py-2 text-sm font-black rounded-full border-2 uppercase ${statusColor(selected.status)}`}>{selected.status}</span>
              </div>

              <div className="dash-card p-4">
                <p className="dash-section mb-3">Pandit</p>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-orange-100 flex items-center justify-center text-2xl flex-shrink-0">
                    {selected.pandit?.photo
                      // eslint-disable-next-line @next/next/no-img-element
                      ? <img src={selected.pandit.photo} alt={selected.pandit.name} className="w-full h-full object-cover" />
                      : '🕉️'}
                  </div>
                  <div className="min-w-0">
                    <p className="font-black text-slate-900 truncate">{selected.pandit?.name}</p>
                    <p className="text-sm font-semibold text-[#9a6b4b]">📞 {selected.pandit?.contact?.phone}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link href={`/pandits/${selected.pandit?._id}`} className="dash-btn-ghost"><ExternalLink className="w-4 h-4" /> Profile</Link>
                  <a href={`tel:${selected.pandit?.contact?.phone}`} className="dash-btn"
                    style={{ background: 'linear-gradient(135deg, #4ade80, #16a34a)' }}><Phone className="w-4 h-4" /> Call</a>
                </div>
              </div>

              <div className="dash-card p-4">
                <p className="dash-section mb-3">Pooja Details</p>
                <div className="space-y-2.5 text-sm">
                  {[
                    ['Pooja Type', selected.poojaType],
                    ['Date', new Date(selected.poojaDate).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })],
                    ['Time', formatTime(selected.poojaTime)],
                    ['Amount', `₹${selected.price?.toLocaleString('en-IN')}`],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4">
                      <span className="font-bold text-[#9a6b4b]">{k}</span>
                      <span className="text-slate-900 font-black text-right">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="dash-card p-4">
                <p className="dash-section mb-2">Location</p>
                <p className="text-sm text-slate-700 break-words"><span className="font-black">Address:</span> {selected.location?.address}</p>
                <p className="text-sm text-slate-700"><span className="font-black">City:</span> {selected.location?.city}</p>
              </div>

              <div className="rounded-2xl p-4 bg-orange-50/60 border border-orange-100">
                <p className="text-xs text-[#9a6b4b] break-all"><span className="font-black">ID:</span> {selected._id}</p>
                <p className="text-xs text-[#9a6b4b] mt-1"><span className="font-black">Booked On:</span> {new Date(selected.createdAt).toLocaleDateString('en-IN')}</p>
              </div>

              <button onClick={() => setSelected(null)} className="dash-btn-ghost w-full">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
