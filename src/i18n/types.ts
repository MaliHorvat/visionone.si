import type { MarketingBlock } from "@/lib/marketing-site/types";

export type SiteDictionary = {
  meta: { title: string; description: string };
  nav: {
    home: string;
    services: string;
    products: string;
    contact: string;
    portalLogin: string;
    headerCta: string;
  };
  footer: {
    tagline: string;
    navigation: string;
    contact: string;
    contactForm: string;
    privacy: string;
    cookies: string;
    rights: string;
    hours: string;
    location: string;
  };
  contactForm: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    phone: string;
    phoneOptional: string;
    siteType: string;
    siteTypePlaceholder: string;
    siteTypes: Record<string, string>;
    cameraCount: string;
    cameraPlaceholder: string;
    timeline: string;
    timelinePlaceholder: string;
    timelines: Record<string, string>;
    message: string;
    messagePlaceholder: string;
    submit: string;
    sending: string;
    successTitle: string;
    successBody: string;
    sendAnother: string;
    errors: Record<string, string>;
  };
  trustStrip: { label: string; items: string[] };
  testimonials: { quote: string; author: string; role: string }[];
  servicesMenu: { id: string; label: string }[];
  process: {
    kicker: string;
    title: string;
    subtitle: string;
    steps: { title: string; body: string }[];
  };
  routes: { slug: string; label: string }[];
  blocks: Record<string, MarketingBlock[]>;
};
