export type ContactProduct = "cctv" | "anketa" | "portal" | "general";

export const CONTACT_PRODUCTS = new Set<ContactProduct>(["cctv", "anketa", "portal", "general"]);

export function parseContactProduct(value: unknown): ContactProduct | null {
  const s = String(value ?? "").trim();
  return CONTACT_PRODUCTS.has(s as ContactProduct) ? (s as ContactProduct) : null;
}

export type ContactFieldKey =
  | "siteType"
  | "cameraCount"
  | "company"
  | "employeeCount"
  | "timeline"
  | "message";

export const CONTACT_FIELDS_BY_PRODUCT: Record<ContactProduct, ContactFieldKey[]> = {
  cctv: ["siteType", "cameraCount", "timeline", "message"],
  general: ["siteType", "cameraCount", "timeline", "message"],
  anketa: ["company", "employeeCount", "timeline", "message"],
  portal: ["company", "cameraCount", "timeline", "message"],
};

export const PRODUCT_LABELS: Record<ContactProduct, string> = {
  cctv: "Videonadzor / storitve",
  anketa: "Anonimna anketa (SaaS)",
  portal: "VisionOne portal",
  general: "Splošno povpraševanje",
};
