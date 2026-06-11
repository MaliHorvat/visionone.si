import type { SiteDictionary } from "./types";

export function mergeDict(base: SiteDictionary, patch: Partial<SiteDictionary>): SiteDictionary {
  return {
    ...base,
    ...patch,
    meta: { ...base.meta, ...patch.meta },
    nav: { ...base.nav, ...patch.nav },
    footer: { ...base.footer, ...patch.footer },
    contactForm: {
      ...base.contactForm,
      ...patch.contactForm,
      siteTypes: { ...base.contactForm.siteTypes, ...patch.contactForm?.siteTypes },
      timelines: { ...base.contactForm.timelines, ...patch.contactForm?.timelines },
      errors: { ...base.contactForm.errors, ...patch.contactForm?.errors },
    },
    trustStrip: patch.trustStrip
      ? { ...base.trustStrip, ...patch.trustStrip, items: patch.trustStrip.items ?? base.trustStrip.items }
      : base.trustStrip,
    testimonials: patch.testimonials ?? base.testimonials,
    routes: patch.routes ?? base.routes,
    blocks: patch.blocks ?? base.blocks,
  };
}
