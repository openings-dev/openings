const LOCALIZED_CANONICAL_LABELS = {
  en: {
    junior: "Junior",
    pleno: "Mid-Level",
    senior: "Senior",
    especialista: "Specialist",
    estagio: "Internship / Trainee",
    lead: "Lead",
    principal: "Principal",
    staff: "Staff",
    remote: "Remote",
    hybrid: "Hybrid",
    "on-site": "On-Site",
  },
  pt: {
    junior: "Júnior",
    pleno: "Pleno",
    senior: "Sênior",
    especialista: "Especialista",
    estagio: "Estágio / Trainee",
    lead: "Lead",
    principal: "Principal",
    staff: "Staff",
    remote: "Remoto",
    hybrid: "Híbrido",
    "on-site": "Presencial",
  },
  es: {
    junior: "Junior",
    pleno: "Semi Senior",
    senior: "Senior",
    especialista: "Especialista",
    estagio: "Pasantía / Trainee",
    lead: "Líder",
    principal: "Principal",
    staff: "Staff",
    remote: "Remoto",
    hybrid: "Híbrido",
    "on-site": "Presencial",
  },
  fr: {
    junior: "Junior",
    pleno: "Intermédiaire",
    senior: "Senior",
    especialista: "Spécialiste",
    estagio: "Stage / Trainee",
    lead: "Lead",
    principal: "Principal",
    staff: "Staff",
    remote: "Télétravail",
    hybrid: "Hybride",
    "on-site": "Sur Site",
  },
  it: {
    junior: "Junior",
    pleno: "Intermedio",
    senior: "Senior",
    especialista: "Specialista",
    estagio: "Stage / Trainee",
    lead: "Lead",
    principal: "Principal",
    staff: "Staff",
    remote: "Remoto",
    hybrid: "Ibrido",
    "on-site": "In Sede",
  },
  de: {
    junior: "Junior",
    pleno: "Mid-Level",
    senior: "Senior",
    especialista: "Spezialist",
    estagio: "Praktikum / Trainee",
    lead: "Lead",
    principal: "Principal",
    staff: "Staff",
    remote: "Remote",
    hybrid: "Hybrid",
    "on-site": "Vor Ort",
  },
} as const;

const UNIVERSAL_CANONICAL_LABELS: Record<string, string> = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  nodejs: "Node.js",
  react: "React",
  "react-native": "React Native",
  nextjs: "Next.js",
  vue: "Vue",
  angular: "Angular",
  python: "Python",
  django: "Django",
  flask: "Flask",
  fastapi: "FastAPI",
  java: "Java",
  spring: "Spring",
  kotlin: "Kotlin",
  php: "PHP",
  laravel: "Laravel",
  ruby: "Ruby",
  "ruby-on-rails": "Ruby on Rails",
  go: "Go",
  rust: "Rust",
  csharp: "C#",
  dotnet: ".NET",
  mysql: "MySQL",
  postgres: "PostgreSQL",
  mongodb: "MongoDB",
  redis: "Redis",
  aws: "AWS",
  gcp: "GCP",
  azure: "Azure",
  docker: "Docker",
  kubernetes: "Kubernetes",
  terraform: "Terraform",
  frontend: "Front-End",
  backend: "Back-End",
  fullstack: "Full Stack",
  mobile: "Mobile",
  devops: "DevOps",
  qa: "QA",
  "data-engineering": "Data Engineering",
  "data-science": "Data Science",
  ai: "AI",
  ml: "Machine Learning",
};

function resolveLocale(locale: string) {
  const normalized = locale.toLowerCase();
  return normalized in LOCALIZED_CANONICAL_LABELS ? normalized as keyof typeof LOCALIZED_CANONICAL_LABELS : "en";
}
export function toLocaleTitleCase(value: string, locale: string) {
  const normalized = value.trim().toLocaleLowerCase(locale);
  if (!normalized) return "";
  return normalized
    .split(/(\s+|\/|-)/)
    .map((chunk) => {
      if (!chunk || chunk === "/" || chunk === "-" || /^\s+$/.test(chunk)) return chunk;
      return `${chunk[0]?.toLocaleUpperCase(locale)}${chunk.slice(1)}`;
    })
    .join("");
}
export function canonicalTagLabel(canonical: string, fallback: string, locale: string) {
  const localeKey = resolveLocale(locale);
  return LOCALIZED_CANONICAL_LABELS[localeKey][canonical as keyof typeof LOCALIZED_CANONICAL_LABELS[typeof localeKey]]
    ?? UNIVERSAL_CANONICAL_LABELS[canonical]
    ?? toLocaleTitleCase(fallback, locale);
}
