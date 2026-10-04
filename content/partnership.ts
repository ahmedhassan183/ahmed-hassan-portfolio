import type { Locale } from "./types";

export const partnershipPath = "/partnerships/higher-technological-institute-beni-suef";

export type PartnershipPhoto = { src: string; alt: string; caption?: string; width: number; height: number };
type ActivityEvidence = {
  number: string; kind: "field" | "seminar" | "technical" | "milestone"; title: string; date: string; dateLabel: string;
  participantCount?: number; participants?: string; locationType: string; projectStage: string;
  narrative: string; objective: string; observedActivities: readonly string[]; photos: readonly PartnershipPhoto[];
};
// Dates never promote an activity to completed. Completion requires a verified outcome.
export type PartnershipActivity = ActivityEvidence & (
  | { status: "scheduled"; outcome?: never }
  | { status: "completed"; outcome: string }
);
type PartnershipCase = {
  meta: { title: string; description: string }; label: string; title: string; subtitle: string;
  direction: string; summary: string; executionSummary: string; back: string; contact: string;
  snapshot: { summary: string; signed: string; execution: string; cta: string };
  roleHeading: string; roles: readonly string[]; journeyHeading: string;
  timeline: readonly { title: string; detail: string }[];
  recordHeading: string; completedHeading: string; completedEmpty: string; upcomingHeading: string;
  completedLabel: string; scheduledLabel: string; activityLabel: string; firstFieldHeading: string;
  dateLabel: string; participantsLabel: string; completedParticipantsLabel: string; locationLabel: string; stageLabel: string;
  activityKinds: Record<ActivityEvidence["kind"], string>;
  objectiveLabel: string; outcomeLabel: string; activities: readonly PartnershipActivity[];
  streamsHeading: string; valueHeading: string; values: readonly string[];
};

const en: PartnershipCase = {
  meta: { title: "Institutional Partnership Development | Ahmed Hassan", description: "Ahmed Hassan’s business development journey: institutional outreach, signed cooperation and a completed field activity with 10 students from the Higher Technological Institute of Beni Suef." },
  label: "PARTNERSHIP CASE", title: "Institutional Partnership Development",
  subtitle: "Higher Technological Institute of Beni Suef × Innovation for Solar Systems",
  direction: "From relationship origination to signed cooperation and completed field execution.",
  summary: "Ahmed initiated the relationship with the Higher Technological Institute of Beni Suef, led direct communication and follow-up meetings, helped structure the cooperation framework and advanced the opportunity through to a formally signed cooperation protocol between the institute and Innovation for Solar Systems.",
  executionSummary: "Field execution commenced on 5 October 2026 with a completed first field activity involving 10 institute students.",
  back: "Back to portfolio", contact: "Contact Ahmed",
  snapshot: { summary: "Ahmed originated and developed the institute relationship through direct communication, meetings and follow-up to a formally signed cooperation protocol.", signed: "Signed Cooperation Protocol", execution: "Field execution commenced on 5 October 2026 with a completed first field activity involving 10 institute students.", cta: "View Partnership Journey" },
  roleHeading: "Ahmed’s Role", roles: ["Relationship Origination", "Direct Communication", "Stakeholder Meetings", "Follow-up & Opportunity Development", "Cooperation Framework Development", "Transition from Agreement to Execution"],
  journeyHeading: "Partnership Journey",
  timeline: [
    { title: "Relationship Initiated", detail: "Ahmed initiated direct contact with the institute." },
    { title: "Meetings & Direct Communication", detail: "Led communication and meetings with the stakeholders." },
    { title: "Follow-up & Opportunity Development", detail: "Maintained follow-up and advanced the cooperation opportunity." },
    { title: "Cooperation Framework Structured", detail: "Helped structure the practical cooperation framework." },
    { title: "Formal Protocol Signed", detail: "Cooperation protocol signed between the two organizations." },
    { title: "Field Execution — Completed Activity #01", detail: "10 institute students participated in the first completed field activity on 5 October 2026." },
  ],
  recordHeading: "Execution Record", completedHeading: "Completed", completedEmpty: "No completed field or technical activities have been confirmed yet.", upcomingHeading: "Upcoming",
  completedLabel: "COMPLETED", scheduledLabel: "SCHEDULED", activityLabel: "Field Activity", firstFieldHeading: "Completed Field Activity",
  dateLabel: "Date", participantsLabel: "Expected participants", completedParticipantsLabel: "Participants", locationLabel: "Location type", stageLabel: "Project stage", objectiveLabel: "Practical objective", outcomeLabel: "Completed outcome",
  activityKinds: { field: "Field Activity", seminar: "Educational Seminar", technical: "Technical Session", milestone: "Milestone" },
  activities: [{
    number: "01", kind: "field", status: "completed", title: "Solar Structure Fabrication — First Field Exposure", date: "2026-10-05", dateLabel: "5 October 2026",
    participantCount: 10, participants: "10 students from the Higher Technological Institute of Beni Suef", locationType: "Innovation-affiliated fabrication / metalworking workshop", projectStage: "Early structural fabrication / assembly",
    narrative: "On 5 October 2026, 10 students from the Higher Technological Institute of Beni Suef participated in the first completed field activity under the cooperation protocol at an Innovation-affiliated fabrication workshop. The students observed the early design, fabrication and assembly stages of a custom steel mounting structure for a solar-energy station that will later be installed.",
    objective: "The cooperation is intended to allow students to follow successive implementation stages of real solar-energy projects.",
    observedActivities: ["Structure design", "Initial preparation and formation", "Beginning of fabrication", "Assembly and early metalworking"],
    outcome: "The activity gave students direct exposure to the first physical stage of a real solar-project implementation cycle and established the starting point for following subsequent project stages through to installation.", photos: [],
  }],
  streamsHeading: "Cooperation in Action", valueHeading: "Why This Partnership Matters",
  values: ["Converting direct outreach into institutional access.", "Managing stakeholder interactions and sustained commercial follow-up.", "Advancing discussions into formally signed cooperation.", "Following through from signed agreement to a completed field activity.", "Building a repeatable institutional partnership channel."],
};

const ar: PartnershipCase = {
  meta: { title: "تطوير شراكة مؤسسية | أحمد حسن", description: "رحلة أحمد حسن في تطوير الأعمال: بدء التواصل المؤسسي، وتوقيع بروتوكول تعاون، وتنفيذ نشاط ميداني مكتمل بمشاركة 10 طلاب من المعهد التكنولوجي العالي ببني سويف." },
  label: "حالة شراكة مؤسسية", title: "تطوير شراكة مؤسسية",
  subtitle: "المعهد التكنولوجي العالي ببني سويف × Innovation for Solar Systems",
  direction: "من بدء التواصل إلى توقيع البروتوكول والتنفيذ الميداني وأول نشاط مكتمل.",
  summary: "بادرت بالتواصل مع المعهد التكنولوجي العالي ببني سويف، وقدت التواصل المباشر والاجتماعات والمتابعة، وساهمت في تطوير إطار التعاون حتى تم توقيع بروتوكول تعاون رسمي بين المعهد وشركة Innovation for Solar Systems، ثم بدأ التنفيذ الميداني بأول نشاط مكتمل.",
  executionSummary: "بدأ التنفيذ الميداني في 5 أكتوبر 2026 بأول نشاط ميداني مكتمل بمشاركة 10 طلاب من المعهد.",
  back: "العودة إلى الملف المهني", contact: "تواصل مع أحمد",
  snapshot: { summary: "بدأ أحمد العلاقة مع المعهد وطوّرها عبر التواصل المباشر والاجتماعات والمتابعة حتى توقيع بروتوكول تعاون رسمي.", signed: "بروتوكول تعاون موقّع", execution: "بدأ التنفيذ الميداني في 5 أكتوبر 2026 بأول نشاط ميداني مكتمل بمشاركة 10 طلاب من المعهد.", cta: "استعرض رحلة الشراكة" },
  roleHeading: "دوري في تطوير الشراكة", roles: ["بدء العلاقة والتواصل", "التواصل المباشر", "الاجتماعات مع الأطراف المعنية", "المتابعة وتطوير الفرصة", "المساهمة في بناء إطار التعاون", "الانتقال من الاتفاق إلى التنفيذ"],
  journeyHeading: "رحلة تطوير الشراكة",
  timeline: [
    { title: "بدء التواصل", detail: "بادر أحمد بالتواصل المباشر مع المعهد." },
    { title: "الاجتماعات والتواصل المباشر", detail: "قاد التواصل والاجتماعات مع الأطراف المعنية." },
    { title: "المتابعة وتطوير الفرصة", detail: "واصل المتابعة وطوّر فرصة التعاون." },
    { title: "تطوير إطار التعاون", detail: "ساهم في بناء إطار للتعاون العملي." },
    { title: "توقيع بروتوكول التعاون", detail: "تم توقيع بروتوكول تعاون رسمي بين المؤسستين." },
    { title: "التنفيذ الميداني — نشاط مكتمل #01", detail: "شارك 10 طلاب من المعهد في أول نشاط ميداني مكتمل في 5 أكتوبر 2026." },
  ],
  recordHeading: "سجل التنفيذ", completedHeading: "المكتمل", completedEmpty: "لم تُؤكد أنشطة ميدانية أو فنية مكتملة حتى الآن.", upcomingHeading: "القادم",
  completedLabel: "مكتمل", scheduledLabel: "مقرر", activityLabel: "نشاط ميداني", firstFieldHeading: "نشاط ميداني مكتمل",
  dateLabel: "التاريخ", participantsLabel: "المشاركون المتوقعون", completedParticipantsLabel: "المشاركون", locationLabel: "نوع الموقع", stageLabel: "مرحلة المشروع", objectiveLabel: "الهدف التطبيقي", outcomeLabel: "النتيجة المكتملة",
  activityKinds: { field: "نشاط ميداني", seminar: "ندوة تعليمية", technical: "جلسة فنية", milestone: "مرحلة تنفيذ" },
  activities: [{
    number: "01", kind: "field", status: "completed", title: "المتابعة الميدانية لمراحل تصنيع هيكل محطة طاقة شمسية", date: "2026-10-05", dateLabel: "5 أكتوبر 2026",
    participantCount: 10, participants: "10 طلاب من المعهد التكنولوجي العالي ببني سويف", locationType: "ورشة تصنيع وأعمال معدنية تابعة لـInnovation", projectStage: "المراحل الأولية لتصنيع وتجميع الهيكل المعدني",
    narrative: "في 5 أكتوبر 2026، شارك 10 طلاب من المعهد التكنولوجي العالي ببني سويف في أول نشاط ميداني مكتمل ضمن بروتوكول التعاون، وذلك داخل ورشة تصنيع تابعة لـInnovation. تابع الطلاب المراحل الأولية لتصميم وتجهيز وتجميع الهيكل المعدني الخاص بمحطة طاقة شمسية سيتم تركيبها لاحقًا.",
    objective: "يهدف نموذج التعاون إلى إتاحة متابعة المراحل المتتالية لتنفيذ مشروعات طاقة شمسية حقيقية.",
    observedActivities: ["تصميم الهيكل", "التشكيل والتجهيز الأولي", "بداية التصنيع", "التجميع والمراحل الأولية للأعمال المعدنية"],
    outcome: "أتاحت الزيارة للطلاب التعرف بصورة مباشرة على أولى المراحل الفعلية لتنفيذ مشروع طاقة شمسية، وتمثل بداية لمسار تطبيقي يتيح لهم متابعة المراحل التالية للمشروع وصولًا إلى التركيب.", photos: [],
  }],
  streamsHeading: "مجالات التعاون العملي", valueHeading: "قيمة الشراكة في تطوير الأعمال",
  values: ["تحويل التواصل المباشر إلى علاقة مؤسسية.", "إدارة التواصل مع الأطراف المعنية والحفاظ على المتابعة التجارية.", "تطوير المناقشات حتى الوصول إلى تعاون رسمي موقّع.", "تحويل الاتفاق إلى أنشطة تنفيذ محددة وقابلة للتطبيق.", "بناء مسار قابل للتكرار لتطوير الشراكات المؤسسية."],
};

export function getPartnershipCase(locale: Locale): PartnershipCase { return locale === "ar" ? ar : en; }
