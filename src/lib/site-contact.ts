/** Javni kontaktni podatki (prepišejo se z env, če so nastavljeni). */
export const SITE_CONTACT = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "info@visionone.si",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || "",
  phoneDisplay: process.env.NEXT_PUBLIC_CONTACT_PHONE_DISPLAY?.trim() || "",
  address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS?.trim() || "Slovenija",
  hours: process.env.NEXT_PUBLIC_CONTACT_HOURS?.trim() || "Pon–pet, 8:00–16:00",
};

export function sitePhoneHref(): string | null {
  const raw = SITE_CONTACT.phone.replace(/\s/g, "");
  if (!raw) return null;
  return raw.startsWith("+") ? `tel:${raw}` : `tel:${raw}`;
}

export function sitePhoneLabel(): string | null {
  return SITE_CONTACT.phoneDisplay || SITE_CONTACT.phone || null;
}
