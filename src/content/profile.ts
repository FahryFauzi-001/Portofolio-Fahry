import type { Profile } from "@/types";

export const profile: Profile = {
  name: "Muhammad Fahry Fauzi",
  shortName: "Fahry Fauzi",
  headline: "Bina Nusantara University · Computer Science",
  university: "Bina Nusantara University",
  location: "Bandung, Indonesia",
  status: "Open to Internships & Collaborations",
  bio: "Computer Science student at Bina Nusantara University with a strong focus on task management, Web Development, and Mobile App Development, backed by technical experience in Machine Learning and IoT systems.",
  longBio: [
    "I am a Computer Science student at Bina Nusantara University with a strong interest in task management, Web Development, and Mobile App Development, supported by technical foundations in Machine Learning and IoT systems.",
    "With hands-on experience building end-to-end projects—from APIs and web interfaces to Android applications and hardware integration—I naturally step into team coordination roles.",
    "I focus on translating technical requirements into clear task breakdowns, tracking project milestones, and keeping team collaboration synchronized so products ship cleanly and on schedule.",
    "I leverage AI-assisted engineering workflows to accelerate prototyping, debugging, and documentation—while maintaining full ownership over system architecture, validation, and code quality.",
  ],
  email: "mfahryfauzi@gmail.com",
  avatar: "/images/profile/fahry-cutout.png",
  // Drop your real PDF at public/cv/Muhammad-Fahry-Fauzi-CV.pdf
  cvPath: "/cv/Muhammad-Fahry-Fauzi-CV.pdf?v=5",
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/FahryFauzi-001",
      handle: "@FahryFauzi-001",
      icon: "github",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/fahry-fauzi-69a816326/",
      handle: "in/fahry-fauzi-69a816326",
      icon: "linkedin",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/fahryfauzii/",
      handle: "@fahryfauzii",
      icon: "instagram",
    },
    {
      label: "Email",
      href: "mailto:mfahryfauzi@gmail.com",
      handle: "mfahryfauzi@gmail.com",
      icon: "mail",
    },
  ],
  skills: [
    {
      name: "Programming Languages",
      items: ["Python", "Kotlin", "JavaScript", "C++", "C", "SQL"],
    },
    {
      name: "Web & Mobile",
      items: ["HTML", "CSS", "Web Service APIs", "Jetpack Compose"],
    },
    {
      name: "IoT & Hardware",
      items: ["ESP32 Microcontrollers", "Arduino", "Internet of Things (IoT)"],
    },
    {
      name: "Tools & Workflow",
      items: [
        "Git",
        "GitHub",
        "Figma",
        "Jupyter Notebook",
        "AI-Assisted Development",
        "Prompt Engineering",
        "LLM API Integration",
      ],
    },
  ],
};
