export type ServiceId = "videonadzor" | "alarm" | "pozar" | "domofon" | "mreza" | "wifi" | "servis" | "ostalo";
export type TopicId = "cctv" | "alarm" | "pozar" | "domofon" | "mreza" | "servis" | "portal" | "anketa" | "razvoj" | "general";
export type SiteTypeId = "hisa" | "stanovanje" | "pisarna" | "trgovina" | "skladisce" | "drugo";

export type Service = {
  id: ServiceId;
  title: string;
  /** ena vrstica za seznam na začetni strani */
  short: string;
  lead: string;
  points: string[];
  imageAlt: string;
};

export type Step = { title: string; body: string };

export type SiteCopy = {
  meta: {
    title: string;
    description: string;
    pages: Record<"storitve" | "produkti" | "portal" | "anketa" | "kontakt" | "zasebnost" | "piskotki", { title: string; description: string }>;
  };
  nav: {
    home: string;
    services: string;
    portal: string;
    survey: string;
    contact: string;
    cta: string;
    menuOpen: string;
    menuClose: string;
    language: string;
    skip: string;
  };
  hero: {
    title: string;
    lead: string;
    primary: string;
    secondary: string;
    facts: string[];
    imageAlt: string;
  };
  home: {
    servicesTitle: string;
    servicesIntro: string;
    servicesAll: string;
    sectorsTitle: string;
    sectors: { title: string; body: string; imageAlt: string }[];
    featureTitle: string;
    featureBody: string;
    featureChecks: string[];
    featureAlt: string;
    processTitle: string;
  };
  steps: Step[];
  cta: { title: string; body: string; button: string };
  services: Service[];
  servicesPage: {
    title: string;
    lead: string;
    ask: string;
    processTitle: string;
  };
  productsPage: {
    title: string;
    lead: string;
    portalTitle: string;
    portalBody: string;
    portalMore: string;
    surveyTitle: string;
    surveyBody: string;
    surveyMore: string;
  };
  portalPage: {
    title: string;
    lead: string;
    login: string;
    demo: string;
    shotAlt: string;
    blocks: { title: string; body: string }[];
    offerTitle: string;
    offerBody: string;
    offerChecks: string[];
    offerAlt: string;
    installersTitle: string;
    installersBody: string;
  };
  surveyPage: {
    title: string;
    lead: string;
    open: string;
    ask: string;
    howTitle: string;
    howBody: string;
    howChecks: string[];
    uiAlt: string;
    dashTitle: string;
    dashBody: string;
    dashNote: string;
    dashAlt: string;
  };
  contactPage: {
    title: string;
    lead: string;
    email: string;
    phone: string;
    hours: string;
    hoursValue: string;
    area: string;
    areaValue: string;
    afterTitle: string;
    after: string[];
  };
  form: {
    title: string;
    intro: string;
    topicLegend: string;
    topics: Record<TopicId, string>;
    name: string;
    email: string;
    phone: string;
    company: string;
    siteType: string;
    siteTypes: Record<SiteTypeId, string>;
    siteTypeEmpty: string;
    devices: string;
    message: string;
    messagePlaceholder: string;
    optional: string;
    contactHint: string;
    privacyBefore: string;
    privacyLink: string;
    privacyAfter: string;
    submit: string;
    sending: string;
    doneTitle: string;
    doneBody: string;
    again: string;
    errors: {
      name: string;
      contact: string;
      email: string;
      message: string;
      rate: string;
      generic: string;
    };
  };
  footer: {
    about: string;
    services: string;
    company: string;
    contact: string;
    products: string;
    login: string;
    privacy: string;
    cookies: string;
    cookieSettings: string;
  };
  cookie: {
    title: string;
    body: string;
    policy: string;
    settings: string;
    reject: string;
    accept: string;
    prefsTitle: string;
    prefsBody: string;
    necessary: string;
    necessaryBody: string;
    alwaysOn: string;
    analytics: string;
    analyticsBody: string;
    marketing: string;
    marketingBody: string;
    cancel: string;
    close: string;
    save: string;
  };
  legal: { onlySlovenian: string; updated: string };
  notFound: { title: string; body: string; home: string };
};
