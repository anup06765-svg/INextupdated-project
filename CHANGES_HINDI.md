# Kya-kya badla hai (beginner guide)

Saare UI changes `ramjikisena-nextjs/` folder me hain. Backend me sirf Samagri ko comment kiya gaya hai.

## 1. UI / UX (laptop, tablet, mobile)
| File | Kya badla |
|---|---|
| `ramjikisena-nextjs/app/globals.css` | Rang (design tokens), Hindi font, mobile fixes (side-scroll band, input zoom band, 100dvh), focus ring, laggy `* {transition}` hataya, scrollbar sirf desktop par |
| `ramjikisena-nextjs/tailwind.config.ts` | `xs` breakpoint, brand colors (saffron, gold, cream), container padding, font |
| `ramjikisena-nextjs/app/layout.tsx` | Mobile viewport, theme color, Noto Sans Devanagari (Hindi) font |
| `ramjikisena-nextjs/app/page.tsx` | Home page ka "सभी सेवाएं" carousel ab responsive: mobile 1, tablet 2, laptop 3 card; arrows screen ke andar |
| `ramjikisena-nextjs/components/DashboardSidebar.tsx` | Sidebar collapse hone par content bhi saath badle, mobile menu chhote phone par fit, nested page par active highlight |
| `ramjikisena-nextjs/app/pandit/layout.tsx` | Sidebar ke saath sahi margin, mobile par top space |

## 2. Admin Panel (`ramjikisena-nextjs/app/admin/`)
| File | Kya badla |
|---|---|
| `app/admin/layout.tsx` | Mobile top bar, collapse-aware layout |
| `app/admin/admin-dashboard/page.tsx` | Samagri tile hata (comment), Pandits + Bookings tile joda, mobile spacing |
| `app/admin/admin-pandits/page.tsx` | **NAYA** - sabhi pandits ki list + search (existing API `/api/pandits`) |
| `app/admin/admin-bookings/page.tsx` | **NAYA** - "jald aa raha hai" page (sidebar link ab 404 nahi dega) |

## 3. Pooja Samagri comment kiya (har jagah)
Frontend (`ramjikisena-nextjs/`):
- `app/samagri/page.tsx`, `app/samagri/cart/page.tsx`, `app/samagri/orders/page.tsx`, `app/samagri/orders/[id]/page.tsx`
- `app/admin/admin-samagri/page.tsx`, `app/(dashboard)/my-orders/page.tsx`
  (inme poora code `//` se comment hai; neeche chhota placeholder hai jo 404 dikhata hai)
- `components/UserSidebar.tsx`, `app/(dashboard)/dashboard/page.tsx` (My Orders link)
- `app/pandit/bookings/page.tsx` ("Samagri Needed" line)
- Pehle se comment tha: `components/Navbar.tsx`, `components/DashboardSidebar.tsx`, `app/page.tsx`, `app/pandits/[id]/page.tsx`

Backend (project root):
- `app.js`, `routes/admin.js`, `swagger.js` (require/mount lines)
- `routes/samagri.js`, `routes/adminSamagri.js`, `models/SamagriProduct.js`, `models/SamagriPackage.js`, `models/SamagriOrder.js` (poori file comment)

Wapas chalu karna ho to `//` hatayein aur placeholder wala export delete karein.

## 4. Localhost par chalana
1. MongoDB chalu rakhein (`.env` me `DB_CONNECTION_STRING` dekhein).
2. Backend (project root me): `npm install` phir `npm start` -> http://localhost:3100
3. Frontend: `cd ramjikisena-nextjs` -> `npm install` -> `npm run dev` -> http://localhost:3000
   (`.env.local` me `NEXT_PUBLIC_API_URL=http://localhost:3100` pehle se set hai)
4. Internet chahiye (Google Fonts aur Cloudinary ke liye).
