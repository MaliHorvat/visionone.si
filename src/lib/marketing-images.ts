/**
 * =============================================================================
 * MARKETING SLIKE — pregled (vse poti: mapa `public/`, začetek z `/`)
 * =============================================================================
 *
 * Datoteke `vo-*.png` so pripravljene ilustracije (AI); jih lahko zamenjaš s svojimi.
 *
 * Že vezane na strani:
 *  MARKETING_IMG_HERO              → Domov: hero ozadje (page.tsx)
 *  MARKETING_IMG_CCTV             → Domov + Storitve: velik split levo (ServiceImageSplit)
 *  MARKETING_IMG_PORTAL_SOFTWARE  → Produkti: kartica VisionOne portal
 *  (DOMOV_* / STORITVE_* / PRODUKTI_* / KONTAKT_* → glej spodaj in JSX „SLIKA“)
 *
 * =============================================================================
 */

/** Domov — hero, polno širina za napisom */
export const MARKETING_IMG_HERO = "/vo-home-hero.png";

/** Domov + Storitve — velika kartica (split), leva polovica */
export const MARKETING_IMG_CCTV = "/vo-home-cctv-split.png";

/** Produkti — kartica portala, levi stolpec */
export const MARKETING_IMG_PORTAL_SOFTWARE = "/vo-produkti-portal-card.png";

// --- Dodatna mesta ---

/** Domov — med številkami (100+ / 24/7) in naslovom „Zakaj VisionOne portal“ (široka pasica) */
export const MARKETING_IMG_DOMOV_ZAKAJ_INTRO: string | null = "/vo-domov-zakaj-intro.png";

/** Domov — nad mrežo „Kaj nudimo“ (polna širina) */
export const MARKETING_IMG_DOMOV_KAJ_NUDIMO: string | null = "/vo-domov-kaj-nudimo.png";

/** Domov — v sekciji „24/7 proaktivna podpora“ (pod besedilom) */
export const MARKETING_IMG_DOMOV_PODPORA: string | null = "/vo-domov-podpora.png";

/** Storitve — pod uvodnim odstavkom (H1), polna širina */
export const MARKETING_IMG_STORITVE_UVOD: string | null = "/vo-storitve-uvod.png";

/** Storitve — pod blokom „Brezžični in hibridni alarmni sistemi“ */
export const MARKETING_IMG_STORITVE_ALARM: string | null = "/vo-storitve-alarm.png";

/** Storitve — pod blokom „Požarna signalizacija“ */
export const MARKETING_IMG_STORITVE_POZAR: string | null = "/vo-storitve-pozar.png";

/** Storitve — pod blokom „Domofonija“ */
export const MARKETING_IMG_STORITVE_DOMOFON: string | null = "/vo-storitve-domofon.png";

/** Storitve — pod blokom „Omrežne montaže“ */
export const MARKETING_IMG_STORITVE_MREZA: string | null = "/vo-storitve-mreza.png";

/** Storitve — pod blokom „Wi‑Fi in pokritost“ */
export const MARKETING_IMG_STORITVE_WIFI: string | null = "/vo-storitve-wifi.png";

/** Storitve — pod blokom „Podpora in servis“ */
export const MARKETING_IMG_STORITVE_SERVIS: string | null = "/vo-storitve-servis.png";

/** Storitve — pod blokom „Ostale montaže“ */
export const MARKETING_IMG_STORITVE_OSTALO: string | null = "/vo-storitve-ostalo.png";

/** Produkti — pod kartico portala (polna širina) */
export const MARKETING_IMG_PRODUKTI_POD_KARTO: string | null = "/vo-produkti-pod-karto.png";

/** Kontakt — nad obrazcem (polna širina pod uvodom) */
export const MARKETING_IMG_KONTAKT_UVOD: string | null = "/vo-kontakt-uvod.png";
