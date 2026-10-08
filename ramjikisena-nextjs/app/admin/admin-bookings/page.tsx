'use client';

import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';

// Abhi backend me admin ke liye bookings ki API nahi hai, isliye ye ek saaf "jald aa raha hai" page hai
// (sidebar ka link 404 na de). API ban jaye to yaha table laga sakte hain.
export default function AdminBookings() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-[2rem] border border-orange-100 shadow-sm p-8 md:p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center">
          <Calendar className="w-8 h-8 text-teal-600" />
        </div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-2">Admin Panel</p>
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">Bookings</h1>
        <p className="text-slate-500 font-semibold mb-8">
          Sabhi pandit bookings ka admin view jald aa raha hai. Tab tak pandits apni bookings apne portal me dekh sakte hain.
        </p>
        <Link href="/admin/admin-dashboard"
          className="inline-flex items-center gap-2 bg-slate-900 text-white font-black text-sm px-6 py-3 rounded-2xl hover:bg-slate-800">
          Dashboard par wapas <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
