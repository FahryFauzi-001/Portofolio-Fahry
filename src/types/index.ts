export type Category = "mobile" | "computer-vision" | "web" | "iot" | "ml";

export type OrbitTarget = Category | "about";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectLinks {
  github?: string;
  demo?: string;
  playstore?: string;
  apk?: string;
  video?: string;
}

export interface Project {
  slug: string;
  title: string;
  category: Category;
  summary: string;
  role: string;
  period: string;
  tech: string[];
  cover: string;
  gallery?: string[];
  video?: string;
  metrics?: ProjectMetric[];
  links: ProjectLinks;
  featured?: boolean;
  content: string;
}

export type ProjectSummary = Omit<Project, "content">;

export interface Experience {
  id: string;
  org: string;
  role: string;
  type: "volunteer" | "organization" | "work";
  period: string;
  location?: string;
  logo?: string;
  highlights?: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  image?: string;
  tags?: string[];
  featured?: boolean;
}

export interface SkillGroup {
  name: string;
  items: string[];
}

export interface SocialLink {
  label: string;
  href: string;
  handle: string;
  icon: "github" | "linkedin" | "instagram" | "mail";
}

export interface Profile {
  name: string;
  shortName: string;
  headline: string;
  university: string;
  location: string;
  status: string;
  bio: string;
  longBio: string[];
  email: string;
  avatar: string;
  cvPath: string;
  socials: SocialLink[];
  skills: SkillGroup[];
}

export interface OrbitObjectConfig {
  id: OrbitTarget;
  label: string;
  shortLabel: string;
  subtitle: string;
  image: string;
  alt: string;
  /** Angle in degrees around the center circle (0 = 3 o'clock, -90 = 12 o'clock) */
  angleDeg: number;
  /** Orbit radius in px from stage center */
  radiusPx: number;
  /** Resting rotation in degrees */
  rotate: number;
  /** Visual size in px on desktop */
  size: number;
  /** Parallax depth multiplier (higher = closer to viewer) */
  depth: number;
  /** Float animation amplitude in px and cycle duration in seconds */
  floatAmplitude: number;
  floatDuration: number;
  floatDelay: number;
  /** Tooltip side relative to icon */
  tooltipSide: "left" | "right" | "top";
}
