# VisionOne — spletna stran in portal

Next.js 15 (App Router) + Tailwind 4 + Prisma.

- **Javna stran** — `src/app/(marketing)`
- **Portal za spremljanje strank** — `src/app/portal` (prijava na `/portal-login`)

## Zagon

```bash
npm install
cp .env.example .env.local   # izpolnite vrednosti
npm run dev                  # http://localhost:3000
```

Brez `DATABASE_URL` portal prikazuje demo podatke (dodajanje in brisanje sta onemogočena).
Z bazo: `npm run db:push` in po želji `npm run db:seed`.

## Portal — okoljske spremenljivke

| Spremenljivka | Namen |
| --- | --- |
| `PORTAL_USERNAME` | Uporabniško ime (privzeto `admin`) |
| `PORTAL_PASSWORD` | Geslo — **v produkciji obvezno nastavite** |
| `PORTAL_SESSION_SECRET` | Skrivnost za podpis sejnega piškotka (`openssl rand -hex 32`) |

Seja je podpisana (HMAC-SHA256) in velja 8 ur. Sprememba gesla ali skrivnosti odjavi vse uporabnike.

## Struktura portala

| Pot | Vsebina |
| --- | --- |
| `/portal` | Danes — hitra dejanja, opomniki ta teden, poslovanje, stanje objektov |
| `/portal/stranke` | Seznam strank z iskanjem, filtri, dodajanjem in urejanjem |
| `/portal/stranke/[id]` | Profil objekta — kamere, NVR, stikala, diski, topologija, rack |
| `/portal/opomniki` | Vzdrževalni opomniki, razvrščeni po roku |
| `/portal/ponudbe` | Sestavljanje ponudbe z DDV in tiskom v PDF |
| `/portal/orodja`, `/cas`, `/inventar`, `/paketi`, `/obvestila` | Terenska orodja in nastavitve |

Skupni gradniki vmesnika so v `src/components/portal/ui.tsx`, barvni žetoni pa v `.vo-portal` v `src/app/globals.css`.
