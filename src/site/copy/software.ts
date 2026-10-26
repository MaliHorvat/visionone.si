import type { Locale } from "@/i18n/config";

export type SoftwareId = "portal" | "vms" | "esp32" | "anketa" | "poroka";

export type SoftwareItem = {
  id: SoftwareId;
  name: string;
  /** kratka oznaka: kdo ga uporablja / odprta koda */
  tag: string;
  body: string;
  points: string[];
  imageAlt?: string;
};

export type SoftwareCopy = {
  nav: string;
  title: string;
  lead: string;
  open: string;
  source: string;
  more: string;
  openSource: string;
  items: SoftwareItem[];
  customTitle: string;
  customBody: string;
  customCta: string;
  homeKicker: string;
  homeTitle: string;
  homeBody: string;
  homeCta: string;
  homeAlt: string;
};

const sl: SoftwareCopy = {
  nav: "Programske rešitve",
  title: "Programske rešitve",
  lead:
    "Poleg montaže razvijamo programsko opremo: orodja, s katerimi sami delamo, rešitve za stranke in projekte z odprto kodo. Če potrebujete spletno aplikacijo ali orodje po meri, nam pišite.",
  open: "Odprite",
  source: "Izvorna koda",
  more: "Več",
  openSource: "Odprta koda",
  items: [
    {
      id: "portal",
      name: "VisionOne portal",
      tag: "Za monterje varnostnih sistemov",
      body:
        "Stranke, objekti, kamere, snemalniki in diski z IP naslovi, šifriranimi gesli in garancijami. Iz istih podatkov nastanejo ponudba, delovni nalog in račun z UPN QR kodo.",
      points: ["Koledar terminov in servisni opomniki", "Katalog z uvozom ponudbe dobavitelja", "Povpraševanja s spletne strani"],
      imageAlt: "VisionOne portal: današnji termini, povpraševanja in poslovanje",
    },
    {
      id: "vms",
      name: "VisionOne VMS",
      tag: "Videonadzor v brskalniku",
      body:
        "Sistem za videonadzor, ki teče na strežniku pri stranki in je dosegljiv tudi od zunaj. Snemalnike Hikvision, Dahua in Uniview ali kamere ONVIF uvozi skupaj z imeni kamer in stanjem diskov.",
      points: [
        "Živa slika v mreži do 36 kamer, PTZ in dvosmerni zvok",
        "Predvajanje s časovnico in dogodki, pametno iskanje",
        "Po želji zaznavanje oseb in vozil z umetno inteligenco",
      ],
      imageAlt: "VisionOne View: živa slika štirih kamer",
    },
    {
      id: "esp32",
      name: "ESP32 programator",
      tag: "Del VisionOne VMS",
      body:
        "Firmware na ESP32 naložite kar iz brskalnika prek USB kabla, brez nameščanja orodij. Ob tem je na voljo serijski monitor za pregled delovanja.",
      points: ["Ena ali več datotek z naslovi", "Brisanje celotnega flasha pred nalaganjem", "Serijski monitor z izbiro hitrosti"],
      imageAlt: "ESP32 programator v VisionOne VMS",
    },
    {
      id: "anketa",
      name: "Anonimna anketa o izgorelosti",
      tag: "Odprta koda",
      body:
        "Kratka anketa za zaposlene brez prijave. Vsako podjetje dobi svojo povezavo, vodstvo pa vidi le povprečja, trende in neobvezne opombe, nikoli imen.",
      points: ["Osem privzetih vprašanj, ki jih lahko prilagodite", "Brez imen, e-pošte in IP naslovov", "Ločeni podatki za vsako podjetje"],
      imageAlt: "Anonimna anketa na telefonu in računalniku",
    },
    {
      id: "poroka",
      name: "Poročni organizator",
      tag: "Odprta koda",
      body:
        "Spletna stran za poroko, pripravljena v petnajstih minutah. Gostje na njej potrdijo udeležbo, izberejo meni in po poroki naložijo fotografije.",
      points: ["Potrditev udeležbe, izbira menija in alergije", "QR koda za natis na vabila", "Galerija fotografij gostov in pregled odzivov za par"],
    },
  ],
  customTitle: "Potrebujete rešitev po meri?",
  customBody:
    "Spletne aplikacije, portale za stranke, povezave med sistemi in orodja za vaše delo razvijemo od ideje do zagona. Opišite, kaj bi radi poenostavili.",
  customCta: "Opišite svoj projekt",
  homeKicker: "Programske rešitve",
  homeTitle: "Razvijamo tudi programsko opremo",
  homeBody:
    "Za videonadzor smo naredili svoj VMS, za vodenje sistemov portal, nekaj projektov pa je odprte kode. Enako lahko razvijemo rešitev za vas.",
  homeCta: "Vse programske rešitve",
  homeAlt: "VisionOne VMS: živa slika štirih kamer v brskalniku",
};

const en: SoftwareCopy = {
  nav: "Software",
  title: "Software",
  lead:
    "Besides installation we build software: tools we use ourselves, solutions for customers and open-source projects. If you need a web application or a custom tool, get in touch.",
  open: "Open",
  source: "Source code",
  more: "More",
  openSource: "Open source",
  items: [
    {
      id: "portal",
      name: "VisionOne portal",
      tag: "For security installers",
      body:
        "Customers, sites, cameras, recorders and disks with IP addresses, encrypted passwords and warranties. Quotes, work orders and invoices with a UPN QR code come from the same data.",
      points: ["Appointment calendar and service reminders", "Catalogue with supplier range import", "Enquiries from the website"],
      imageAlt: "VisionOne portal: today's appointments, enquiries and business overview",
    },
    {
      id: "vms",
      name: "VisionOne VMS",
      tag: "CCTV in the browser",
      body:
        "A video management system that runs on a server at the customer's site and is reachable from outside. It imports Hikvision, Dahua and Uniview recorders or ONVIF cameras with camera names and disk status.",
      points: ["Live view in grids of up to 36 cameras, PTZ and two-way audio", "Playback with timeline and events, smart search", "Optional person and vehicle detection with AI"],
      imageAlt: "VisionOne View: live view of four cameras",
    },
    {
      id: "esp32",
      name: "ESP32 programmer",
      tag: "Part of VisionOne VMS",
      body: "Flash firmware to an ESP32 straight from the browser over USB, with nothing to install. A serial monitor shows what the device is doing.",
      points: ["One or several files with addresses", "Optional full flash erase before writing", "Serial monitor with selectable baud rate"],
      imageAlt: "ESP32 programmer in VisionOne VMS",
    },
    {
      id: "anketa",
      name: "Anonymous burnout survey",
      tag: "Open source",
      body:
        "A short survey for employees with no login. Every company gets its own link; management only sees averages, trends and optional notes, never names.",
      points: ["Eight default questions you can adapt", "No names, emails or IP addresses", "Separate data for every company"],
      imageAlt: "The survey on a phone and a computer",
    },
    {
      id: "poroka",
      name: "Wedding organiser",
      tag: "Open source",
      body: "A wedding website ready in fifteen minutes. Guests confirm attendance, choose their menu and upload photos after the wedding.",
      points: ["RSVP, menu choice and allergies", "QR code to print on invitations", "Guest photo gallery and a response overview for the couple"],
    },
  ],
  customTitle: "Need a custom solution?",
  customBody:
    "We build web applications, customer portals, integrations between systems and tools for your work, from idea to launch. Tell us what you would like to simplify.",
  customCta: "Describe your project",
  homeKicker: "Software",
  homeTitle: "We build software too",
  homeBody:
    "We built our own VMS for CCTV and a portal for managing systems, and some projects are open source. We can build a solution for you in the same way.",
  homeCta: "All software",
  homeAlt: "VisionOne VMS: live view of four cameras in the browser",
};

const de: SoftwareCopy = {
  nav: "Software",
  title: "Software",
  lead:
    "Neben der Montage entwickeln wir Software: Werkzeuge für unsere eigene Arbeit, Lösungen für Kunden und Open-Source-Projekte. Brauchen Sie eine Webanwendung oder ein Werkzeug nach Maß, schreiben Sie uns.",
  open: "Öffnen",
  source: "Quellcode",
  more: "Mehr",
  openSource: "Open Source",
  items: [
    {
      id: "portal",
      name: "VisionOne-Portal",
      tag: "Für Errichter von Sicherheitsanlagen",
      body: "Kunden, Objekte, Kameras, Rekorder und Festplatten mit IP-Adressen, verschlüsselten Passwörtern und Garantien. Angebote, Aufträge und Rechnungen aus denselben Daten.",
      points: ["Terminkalender und Wartungserinnerungen", "Katalog mit Import des Lieferantensortiments", "Anfragen von der Website"],
      imageAlt: "VisionOne-Portal: Termine, Anfragen und Übersicht",
    },
    {
      id: "vms",
      name: "VisionOne VMS",
      tag: "Videoüberwachung im Browser",
      body: "Ein Videomanagementsystem, das beim Kunden läuft und auch von außen erreichbar ist. Es importiert Rekorder von Hikvision, Dahua und Uniview oder ONVIF-Kameras samt Namen und Festplattenstatus.",
      points: ["Live-Bild mit bis zu 36 Kameras, PTZ und Gegensprechen", "Wiedergabe mit Zeitleiste und Ereignissen, intelligente Suche", "Optional Personen- und Fahrzeugerkennung mit KI"],
      imageAlt: "VisionOne View: Live-Bild von vier Kameras",
    },
    {
      id: "esp32",
      name: "ESP32-Programmierer",
      tag: "Teil von VisionOne VMS",
      body: "Firmware direkt aus dem Browser per USB auf einen ESP32 laden, ohne Installation. Ein serieller Monitor zeigt, was das Gerät tut.",
      points: ["Eine oder mehrere Dateien mit Adressen", "Optional vollständiges Löschen vor dem Schreiben", "Serieller Monitor mit wählbarer Baudrate"],
      imageAlt: "ESP32-Programmierer in VisionOne VMS",
    },
    {
      id: "anketa",
      name: "Anonyme Burnout-Umfrage",
      tag: "Open Source",
      body: "Eine kurze Umfrage ohne Anmeldung. Jedes Unternehmen hat seinen eigenen Link; die Leitung sieht nur Durchschnittswerte, Trends und optionale Notizen.",
      points: ["Acht anpassbare Standardfragen", "Keine Namen, E-Mails oder IP-Adressen", "Getrennte Daten für jedes Unternehmen"],
      imageAlt: "Die Umfrage auf Handy und Computer",
    },
    {
      id: "poroka",
      name: "Hochzeitsplaner",
      tag: "Open Source",
      body: "Eine Hochzeitswebsite in fünfzehn Minuten. Gäste bestätigen die Teilnahme, wählen das Menü und laden nach der Feier Fotos hoch.",
      points: ["Zusage, Menüwahl und Allergien", "QR-Code für die Einladungen", "Fotogalerie der Gäste und Übersicht für das Paar"],
    },
  ],
  customTitle: "Brauchen Sie eine Lösung nach Maß?",
  customBody: "Wir entwickeln Webanwendungen, Kundenportale, Schnittstellen zwischen Systemen und Werkzeuge für Ihre Arbeit, von der Idee bis zum Start.",
  customCta: "Projekt beschreiben",
  homeKicker: "Software",
  homeTitle: "Wir entwickeln auch Software",
  homeBody: "Für die Videoüberwachung haben wir ein eigenes VMS gebaut, für die Verwaltung ein Portal, und einige Projekte sind Open Source. Genauso entwickeln wir eine Lösung für Sie.",
  homeCta: "Alle Softwarelösungen",
  homeAlt: "VisionOne VMS: Live-Bild von vier Kameras im Browser",
};

const it: SoftwareCopy = {
  nav: "Software",
  title: "Software",
  lead:
    "Oltre alle installazioni sviluppiamo software: strumenti che usiamo noi stessi, soluzioni per i clienti e progetti open source. Se vi serve un'applicazione web o uno strumento su misura, scriveteci.",
  open: "Apri",
  source: "Codice sorgente",
  more: "Scopri",
  openSource: "Open source",
  items: [
    {
      id: "portal",
      name: "Portale VisionOne",
      tag: "Per installatori di sicurezza",
      body: "Clienti, sedi, telecamere, registratori e dischi con indirizzi IP, password cifrate e garanzie. Preventivi, ordini di lavoro e fatture dagli stessi dati.",
      points: ["Calendario appuntamenti e promemoria", "Catalogo con importazione dal fornitore", "Richieste dal sito web"],
      imageAlt: "Portale VisionOne: appuntamenti, richieste e andamento",
    },
    {
      id: "vms",
      name: "VisionOne VMS",
      tag: "Videosorveglianza nel browser",
      body: "Un sistema di gestione video che gira presso il cliente ed è raggiungibile anche dall'esterno. Importa registratori Hikvision, Dahua e Uniview o telecamere ONVIF con nomi e stato dei dischi.",
      points: ["Live fino a 36 telecamere, PTZ e audio bidirezionale", "Riproduzione con timeline ed eventi, ricerca intelligente", "Rilevamento opzionale di persone e veicoli con IA"],
      imageAlt: "VisionOne View: quattro telecamere dal vivo",
    },
    {
      id: "esp32",
      name: "Programmatore ESP32",
      tag: "Parte di VisionOne VMS",
      body: "Caricate il firmware su un ESP32 direttamente dal browser via USB, senza installare nulla. Un monitor seriale mostra cosa fa il dispositivo.",
      points: ["Uno o più file con indirizzi", "Cancellazione completa opzionale", "Monitor seriale con velocità selezionabile"],
      imageAlt: "Programmatore ESP32 in VisionOne VMS",
    },
    {
      id: "anketa",
      name: "Sondaggio anonimo sul burnout",
      tag: "Open source",
      body: "Un breve sondaggio senza accesso. Ogni azienda ha il proprio link; la direzione vede solo medie, tendenze e note facoltative.",
      points: ["Otto domande predefinite modificabili", "Nessun nome, email o indirizzo IP", "Dati separati per ogni azienda"],
      imageAlt: "Il sondaggio su telefono e computer",
    },
    {
      id: "poroka",
      name: "Organizzatore di matrimoni",
      tag: "Open source",
      body: "Un sito per il matrimonio pronto in quindici minuti. Gli ospiti confermano la presenza, scelgono il menu e caricano le foto dopo la festa.",
      points: ["Conferma, scelta del menu e allergie", "Codice QR da stampare sugli inviti", "Galleria foto degli ospiti e riepilogo per gli sposi"],
    },
  ],
  customTitle: "Vi serve una soluzione su misura?",
  customBody: "Sviluppiamo applicazioni web, portali per clienti, integrazioni tra sistemi e strumenti di lavoro, dall'idea al lancio.",
  customCta: "Descrivete il progetto",
  homeKicker: "Software",
  homeTitle: "Sviluppiamo anche software",
  homeBody: "Abbiamo creato un nostro VMS per la videosorveglianza e un portale per gestire gli impianti; alcuni progetti sono open source. Allo stesso modo possiamo sviluppare una soluzione per voi.",
  homeCta: "Tutto il software",
  homeAlt: "VisionOne VMS: quattro telecamere dal vivo nel browser",
};

const hr: SoftwareCopy = {
  nav: "Softverska rješenja",
  title: "Softverska rješenja",
  lead:
    "Uz montažu razvijamo softver: alate kojima sami radimo, rješenja za klijente i projekte otvorenog koda. Ako trebate web aplikaciju ili alat po mjeri, javite nam se.",
  open: "Otvorite",
  source: "Izvorni kod",
  more: "Više",
  openSource: "Otvoreni kod",
  items: [
    {
      id: "portal",
      name: "VisionOne portal",
      tag: "Za instalatere sigurnosnih sustava",
      body: "Klijenti, objekti, kamere, snimači i diskovi s IP adresama, šifriranim lozinkama i jamstvima. Ponude, radni nalozi i računi iz istih podataka.",
      points: ["Kalendar termina i podsjetnici za servis", "Katalog s uvozom ponude dobavljača", "Upiti s web stranice"],
      imageAlt: "VisionOne portal: termini, upiti i poslovanje",
    },
    {
      id: "vms",
      name: "VisionOne VMS",
      tag: "Videonadzor u pregledniku",
      body: "Sustav za videonadzor koji radi na poslužitelju kod klijenta i dostupan je i izvana. Uvozi snimače Hikvision, Dahua i Uniview ili ONVIF kamere s imenima i stanjem diskova.",
      points: ["Slika uživo do 36 kamera, PTZ i dvosmjerni zvuk", "Reprodukcija s vremenskom crtom i događajima, pametno pretraživanje", "Po želji prepoznavanje osoba i vozila umjetnom inteligencijom"],
      imageAlt: "VisionOne View: slika uživo četiri kamere",
    },
    {
      id: "esp32",
      name: "ESP32 programator",
      tag: "Dio VisionOne VMS-a",
      body: "Firmware na ESP32 učitajte izravno iz preglednika preko USB-a, bez instalacije. Serijski monitor prikazuje rad uređaja.",
      points: ["Jedna ili više datoteka s adresama", "Po želji brisanje cijelog flasha", "Serijski monitor s odabirom brzine"],
      imageAlt: "ESP32 programator u VisionOne VMS-u",
    },
    {
      id: "anketa",
      name: "Anonimna anketa o izgaranju",
      tag: "Otvoreni kod",
      body: "Kratka anketa bez prijave. Svaka tvrtka dobiva svoju poveznicu, a uprava vidi samo prosjeke, trendove i neobavezne napomene.",
      points: ["Osam zadanih pitanja koja možete prilagoditi", "Bez imena, e-pošte i IP adresa", "Odvojeni podaci za svaku tvrtku"],
      imageAlt: "Anketa na mobitelu i računalu",
    },
    {
      id: "poroka",
      name: "Organizator vjenčanja",
      tag: "Otvoreni kod",
      body: "Web stranica za vjenčanje gotova za petnaest minuta. Gosti potvrđuju dolazak, biraju meni i nakon vjenčanja učitavaju fotografije.",
      points: ["Potvrda dolaska, odabir menija i alergije", "QR kod za ispis na pozivnice", "Galerija fotografija gostiju i pregled odgovora za par"],
    },
  ],
  customTitle: "Trebate rješenje po mjeri?",
  customBody: "Razvijamo web aplikacije, portale za klijente, povezivanje sustava i alate za vaš posao, od ideje do pokretanja.",
  customCta: "Opišite svoj projekt",
  homeKicker: "Softverska rješenja",
  homeTitle: "Razvijamo i softver",
  homeBody: "Za videonadzor smo napravili vlastiti VMS, za vođenje sustava portal, a neki su projekti otvorenog koda. Isto tako možemo razviti rješenje za vas.",
  homeCta: "Sva softverska rješenja",
  homeAlt: "VisionOne VMS: slika uživo četiri kamere u pregledniku",
};

export const SOFTWARE: Record<Locale, SoftwareCopy> = { sl, en, de, it, hr };

/** Povezave do živih aplikacij in izvorne kode. */
export const SOFTWARE_LINKS: Record<SoftwareId, { open?: string; source?: string; page?: string; image?: string; wide?: boolean }> = {
  portal: { page: "/produkti/portal", open: "https://portal.visionone.si", image: "/img/portal/danes-light.webp" },
  vms: { open: "https://vms.visionone.si", image: "/img/sw/vms-view.webp" },
  esp32: { open: "https://vms.visionone.si/view/", image: "/img/sw/vms-esp32.webp" },
  anketa: {
    page: "/produkti/anketa",
    open: "https://anketa.visionone.si",
    source: "https://github.com/MaliHorvat/anonymous-burnout-tracker",
    image: "/img/anketa-obrazec.webp",
  },
  poroka: { open: "https://porocni-organizator.visionone.si", source: "https://github.com/MaliHorvat/porocni_organizator" },
};
