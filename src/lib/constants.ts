import type { Category, OrbitObjectConfig, OrbitTarget } from "@/types";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://fahry.vercel.app");

export const CATEGORY_META: Record<
  Category,
  { label: string; shortLabel: string; description: string; accent: string }
> = {
  mobile: {
    label: "Mobile Apps",
    shortLabel: "Mobile",
    description:
      "Cross-platform & native mobile experiences built for everyday utility.",
    accent: "bg-[#EFECE5] text-[#141414] border-[#DDD7CB]",
  },
  "computer-vision": {
    label: "Computer Vision",
    shortLabel: "Vision",
    description:
      "Real-time object detection, visual analytics, and edge inference.",
    accent: "bg-[#EFECE5] text-[#141414] border-[#DDD7CB]",
  },
  web: {
    label: "Web Engineering",
    shortLabel: "Web",
    description:
      "Modern full-stack web apps with crisp interfaces and solid architecture.",
    accent: "bg-[#EFECE5] text-[#141414] border-[#DDD7CB]",
  },
  iot: {
    label: "Internet of Things",
    shortLabel: "IoT",
    description:
      "Connected Arduino hardware, real-time sensors, and WiFi alert systems.",
    accent: "bg-[#EFECE5] text-[#141414] border-[#DDD7CB]",
  },
  ml: {
    label: "Machine Learning",
    shortLabel: "ML",
    description:
      "Predictive modeling, experimentation pipelines, and explainable AI.",
    accent: "bg-[#EFECE5] text-[#141414] border-[#DDD7CB]",
  },
};

export const ALL_CATEGORIES: Category[] = [
  "mobile",
  "computer-vision",
  "web",
  "iot",
  "ml",
];

/**
 * Exact polar-angle circular orbit around the centered portrait (radius = 232px).
 * Angles are strictly mirror-symmetric (left <-> right) so every icon sits cleanly
 * on the orbital circle perimeter with generous breathing room around the portrait.
 */
export const ORBIT_RADIUS_PX = 232;

export const ORBIT_OBJECTS: OrbitObjectConfig[] = [
  {
    id: "mobile",
    label: "Mobile Apps",
    shortLabel: "Mobile",
    subtitle: "Flutter & Mobile UI",
    image: "/images/objects/phone.svg",
    alt: "Clay 3D Smartphone",
    angleDeg: -126,
    radiusPx: ORBIT_RADIUS_PX,
    rotate: -12,
    size: 98,
    depth: 1.15,
    floatAmplitude: 5,
    floatDuration: 5.6,
    floatDelay: 0,
    tooltipSide: "left",
  },
  {
    id: "computer-vision",
    label: "Computer Vision",
    shortLabel: "Vision",
    subtitle: "Detection & Edge AI",
    image: "/images/objects/webcam.svg",
    alt: "Clay 3D Webcam",
    angleDeg: -54,
    radiusPx: ORBIT_RADIUS_PX,
    rotate: 4,
    size: 98,
    depth: 1.1,
    floatAmplitude: 5,
    floatDuration: 6.0,
    floatDelay: 0.6,
    tooltipSide: "right",
  },
  {
    id: "iot",
    label: "IoT & Hardware",
    shortLabel: "IoT",
    subtitle: "Arduino & Embedded",
    image: "/images/objects/esp32.svg",
    alt: "Clay 3D Microcontroller Board",
    angleDeg: 180,
    radiusPx: ORBIT_RADIUS_PX,
    rotate: -14,
    size: 102,
    depth: 1.15,
    floatAmplitude: 5,
    floatDuration: 6.4,
    floatDelay: 0.4,
    tooltipSide: "left",
  },
  {
    id: "web",
    label: "Web Apps",
    shortLabel: "Web",
    subtitle: "Next.js & Full-Stack",
    image: "/images/objects/monitor.svg",
    alt: "Clay 3D Monitor",
    angleDeg: 0,
    radiusPx: ORBIT_RADIUS_PX,
    rotate: 8,
    size: 108,
    depth: 1.25,
    floatAmplitude: 6,
    floatDuration: 5.8,
    floatDelay: 1.1,
    tooltipSide: "right",
  },
  {
    id: "ml",
    label: "Machine Learning",
    shortLabel: "ML",
    subtitle: "Models & Notebooks",
    image: "/images/objects/notebook.svg",
    alt: "Clay 3D ML Notebook",
    angleDeg: 130,
    radiusPx: ORBIT_RADIUS_PX,
    rotate: -10,
    size: 102,
    depth: 1.15,
    floatAmplitude: 5,
    floatDuration: 5.4,
    floatDelay: 1.5,
    tooltipSide: "left",
  },
  {
    id: "about",
    label: "About & CV",
    shortLabel: "About",
    subtitle: "Bio · Exp · Certs · CV",
    image: "/images/objects/mug.svg",
    alt: "Clay 3D Coffee Mug",
    angleDeg: 50,
    radiusPx: ORBIT_RADIUS_PX,
    rotate: 6,
    size: 98,
    depth: 1.2,
    floatAmplitude: 5,
    floatDuration: 6.2,
    floatDelay: 0.9,
    tooltipSide: "right",
  },
];

export function getOrbitObject(id: OrbitTarget): OrbitObjectConfig | undefined {
  return ORBIT_OBJECTS.find((item) => item.id === id);
}
