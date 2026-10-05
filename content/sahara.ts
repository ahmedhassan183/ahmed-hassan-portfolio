import type { Locale } from "./types";

const en = {
  category: "FIELD BUSINESS DEVELOPMENT", heading: "Selected Companies Engaged",
  stages: [
    { label: "BEFORE", detail: "Target-account research and preparation, including 20 prioritized accounts, qualification, CRM capture and same-day next-step planning." },
    { label: "DURING", detail: "Attended Sahara Expo 2026 with Innovation for Solar Systems; met companies and held on-site commercial discussions." },
    { label: "AFTER", detail: "Discussed potential cooperation, coordinated follow-up and future meetings, and communicated with a solar mounting-structure manufacturer." },
  ],
  companies: [
    { name: "Al Waha", context: "Wells / Pumps" }, { name: "Al Mohamadia", context: "Greenhouses" },
    { name: "Nile Drip", context: "Irrigation" }, { name: "Shouman", context: "Commercial Discussion" },
    { name: "IMAG", context: "Commercial Discussion" }, { name: "Mounting Structure Manufacturer", context: "Supplier / Execution Ecosystem" },
  ],
  chips: ["Field Prospecting", "Market Intelligence", "Supplier Discovery", "Partnership Development", "Networking", "Follow-up"],
  detail: "Field execution evidence", safety: "Commercial discussions and active follow-up; no closed deals or signed partnerships are claimed.",
};
const ar = {
  category: "تطوير أعمال ميداني", heading: "جهات تم التواصل معها",
  stages: [
    { label: "قبل المعرض", detail: "بحث الحسابات المستهدفة والتحضير، بما يشمل 20 جهة ذات أولوية والتأهيل والتسجيل في CRM وتحديد الخطوة التالية في اليوم نفسه." },
    { label: "خلال المعرض", detail: "المشاركة مع Innovation for Solar Systems في معرض Sahara 2026، وعقد لقاءات ومناقشات تجارية ميدانية مع شركات." },
    { label: "بعد المعرض", detail: "مناقشة فرص التعاون المحتمل وتنسيق المتابعة والاجتماعات المقبلة، والتواصل مع شركة لتصنيع هياكل تثبيت محطات الطاقة الشمسية." },
  ],
  companies: [
    { name: "الواحة لخدمات الآبار والطلمبات", context: "آبار / طلمبات" }, { name: "المحمدية لمبيعات الصوب الزراعية", context: "صوب زراعية" },
    { name: "نايل دريب", context: "ري" }, { name: "Shouman", context: "مناقشة تجارية" },
    { name: "IMAG", context: "مناقشة تجارية" }, { name: "شركة تصنيع هياكل تثبيت الطاقة الشمسية", context: "منظومة الموردين والتنفيذ" },
  ],
  chips: ["استكشاف ميداني", "معلومات السوق", "اكتشاف الموردين", "تطوير الشراكات", "بناء العلاقات", "المتابعة"],
  detail: "دليل التنفيذ الميداني", safety: "مناقشات تجارية ومتابعة مستمرة؛ دون ادعاء إغلاق صفقات أو توقيع شراكات.",
};
export function getSahara(locale: Locale) { return locale === "ar" ? ar : en; }
