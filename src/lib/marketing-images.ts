/**
 * Marketing slike — lokalne datoteke v `public/images/marketing/`.
 * Portal: resničen posnetek (stranke anonimizirane). Storitve: tematske fotografije.
 */

const img = (file: string) => `/images/marketing/${file}`;

/** Domov — hero ozadje (poslovna arhitektura) */
export const MARKETING_IMG_HERO = img("hero.jpg");

/** Domov + Storitve — split levo (videonadzor) */
export const MARKETING_IMG_CCTV = img("cctv.jpg");

/** Produkti — kartica portala (resničen VisionOne portal) */
export const MARKETING_IMG_PORTAL_SOFTWARE = img("portal.jpg");

/** Domov — pasica pred „Zakaj portal“ */
export const MARKETING_IMG_DOMOV_ZAKAJ_INTRO = img("domov-zakaj.jpg");

/** Domov — nad „Kaj nudimo“ */
export const MARKETING_IMG_DOMOV_KAJ_NUDIMO = img("domov-kaj-nudimo.jpg");

/** Domov — podpora sekcija */
export const MARKETING_IMG_DOMOV_PODPORA = img("domov-podpora.jpg");

export const MARKETING_IMG_STORITVE_UVOD: string | null = null;

/** Alarm — tipkovnica / sirena */
export const MARKETING_IMG_STORITVE_ALARM = img("alarm.jpg");

/** Požar — požarna centrala / signalizacija */
export const MARKETING_IMG_STORITVE_POZAR = img("pozar.jpg");

/** Domofon — sodoben objekt z IP varnostjo */
export const MARKETING_IMG_STORITVE_DOMOFON = img("domofon.jpg");

/** Omrežje — strukturirano kabliranje / stikala */
export const MARKETING_IMG_STORITVE_MREZA = img("mreza.jpg");

/** Wi‑Fi — pokritost in povezane naprave */
export const MARKETING_IMG_STORITVE_WIFI = img("wifi.jpg");

/** Servis — VisionOne portal (proaktivni nadzor) */
export const MARKETING_IMG_STORITVE_SERVIS = img("servis.jpg");

/** Ostale montaže — rack / kabliranje */
export const MARKETING_IMG_STORITVE_OSTALO = img("ostalo.jpg");

/** Produkti — širši posnetek portala */
export const MARKETING_IMG_PRODUKTI_POD_KARTO = img("produkti.jpg");

export const MARKETING_IMG_KONTAKT_UVOD = img("kontakt.jpg");
