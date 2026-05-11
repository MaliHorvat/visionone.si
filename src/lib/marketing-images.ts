/**
 * =============================================================================
 * MARKETING SLIKE — pregled (vse poti: mapa `public/`, začetek z `/`)
 * =============================================================================
 *
 * Že vezane na strani:
 *  MARKETING_IMG_HERO              → Domov: hero ozadje (page.tsx)
 *  MARKETING_IMG_CCTV             → Domov + Storitve: velik split levo (ServiceImageSplit)
 *  MARKETING_IMG_PORTAL_SOFTWARE  → Produkti: kartica VisionOne portal
 *
 * Rezervirana mesta (spodaj): nastavi npr. `"/moja-slika.webp"` ko dodaš datoteko v `public/`.
 * Na strani poišči isto IME konstante v JSX (komentar z besedo SLIKA).
 *
 * =============================================================================
 */

/** Domov — hero, polno širina za napisom */
export const MARKETING_IMG_HERO = "/image2.png";

/** Domov + Storitve — velika kartica (split), leva polovica */
export const MARKETING_IMG_CCTV = "/image2.png";

/** Produkti — kartica portala, levi stolpec */
export const MARKETING_IMG_PORTAL_SOFTWARE = "/image1.png";

// --- Dodatna mesta (null = prikaže se črtkana oznaka, dokler ne nastaviš poti) ---

/** Domov — med številkami (100+ / 24/7) in naslovom „Zakaj VisionOne portal“ (široka pasica) */
export const MARKETING_IMG_DOMOV_ZAKAJ_INTRO: string | null = null;

/** Domov — nad mrežo „Kaj nudimo“ (polna širina) */
export const MARKETING_IMG_DOMOV_KAJ_NUDIMO: string | null = null;

/** Domov — v sekciji „24/7 proaktivna podpora“ (pod besedilom) */
export const MARKETING_IMG_DOMOV_PODPORA: string | null = null;

/** Storitve — pod uvodnim odstavkom (H1), polna širina */
export const MARKETING_IMG_STORITVE_UVOD: string | null = null;

/** Storitve — pod blokom „Brezžični in hibridni alarmni sistemi“ */
export const MARKETING_IMG_STORITVE_ALARM: string | null = null;

/** Storitve — pod blokom „Požarna signalizacija“ */
export const MARKETING_IMG_STORITVE_POZAR: string | null = null;

/** Storitve — pod blokom „Domofonija“ */
export const MARKETING_IMG_STORITVE_DOMOFON: string | null = null;

/** Storitve — pod blokom „Omrežne montaže“ */
export const MARKETING_IMG_STORITVE_MREZA: string | null = null;

/** Storitve — pod blokom „Wi‑Fi in pokritost“ */
export const MARKETING_IMG_STORITVE_WIFI: string | null = null;

/** Storitve — pod blokom „Podpora in servis“ */
export const MARKETING_IMG_STORITVE_SERVIS: string | null = null;

/** Storitve — pod blokom „Ostale montaže“ */
export const MARKETING_IMG_STORITVE_OSTALO: string | null = null;

/** Produkti — pod kartico portala (polna širina) */
export const MARKETING_IMG_PRODUKTI_POD_KARTO: string | null = null;

/** Kontakt — nad obrazcem / ob strani (polna širina pod uvodom) */
export const MARKETING_IMG_KONTAKT_UVOD: string | null = null;
