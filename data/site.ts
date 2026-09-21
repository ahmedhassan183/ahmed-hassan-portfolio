export const site = {
  name: "Ahmed Hassan",
  title: "Growth & Business Development Professional",
  description:
    "Growth & Business Development professional combining consultative selling, B2B prospecting and account development with CRM, pipeline management and sales operations in renewable energy.",
  portrait: {
    // Add the prepared portrait here and rebuild; missing assets show a fallback.
    src: "/images/ahmed-hassan-hero.png",
    alt: "Ahmed Hassan — Growth and Business Development professional",
    objectPosition: "50% 16%",
  },
  resumeUrl: "/Ahmed-Hassan-Sales-Business-Development-Resume.pdf",
  resumeFilename: "Ahmed-Hassan-Sales-Business-Development-Resume.pdf",
  contact: {
    linkedin: "https://www.linkedin.com/in/ahmedhassan-growth",
    email: "a7md07san@gmail.com",
    phone: "+201018797298",
    phoneDisplay: "+20 101 879 7298",
    secondaryPhone: "+201095638790",
    secondaryPhoneDisplay: "+20 109 563 8790",
    whatsapp: "https://wa.me/201018797298",
    secondaryWhatsapp: "https://wa.me/201095638790",
  },
};

export const navigation = [
  { label: "Sales", href: "#sales" },
  { label: "Systems", href: "#systems" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;
