"use client";

import * as React from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowLeft } from "lucide-react";
import type {
  Category,
  Certificate,
  Experience,
  OrbitTarget,
  Profile,
  ProjectSummary,
} from "@/types";
import { ORBIT_OBJECTS, getOrbitObject } from "@/lib/constants";
import { HeroText } from "@/components/hero/HeroText";
import { ProfileCutout } from "@/components/hero/ProfileCutout";
import { OrbitObject } from "./OrbitObject";
import { ProjectPanel } from "@/components/project/ProjectPanel";
import { AboutPanel } from "@/components/about/AboutPanel";
import { cn } from "@/lib/utils";

interface OrbitStageProps {
  profile: Profile;
  projects: ProjectSummary[];
  experiences: Experience[];
  certificates: Certificate[];
}

export function OrbitStage({
  profile,
  projects,
  experiences,
  certificates,
}: OrbitStageProps) {
  const [activeTarget, setActiveTarget] = React.useState<OrbitTarget | null>(
    null
  );
  const stageRef = React.useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mouseX = useSpring(rawX, { stiffness: 120, damping: 20, mass: 0.4 });
  const mouseY = useSpring(rawY, { stiffness: 120, damping: 20, mass: 0.4 });

  React.useEffect(() => {
    if (!activeTarget) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveTarget(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeTarget]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    rawX.set(nx);
    rawY.set(ny);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const getCountLabel = (id: OrbitTarget) => {
    if (id === "about") return "Bio, Exp & CV";
    const count = projects.filter((p) => p.category === id).length;
    return `${count} ${count === 1 ? "project" : "projects"}`;
  };

  const activeProjects = React.useMemo(() => {
    if (!activeTarget || activeTarget === "about") return [];
    return projects.filter((p) => p.category === (activeTarget as Category));
  }, [activeTarget, projects]);

  const activeConfig = activeTarget ? getOrbitObject(activeTarget) : undefined;

  return (
    <LayoutGroup>
      <section
        ref={stageRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative flex flex-col justify-between overflow-hidden border-b border-[#E7E3DA] bg-[#F6F4EF] pt-24 pb-12 lg:min-h-[94vh] lg:pt-24 lg:pb-10"
      >
        <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 sm:px-10">
          {/* DESKTOP LAYOUT (lg+) */}
          <div className="hidden lg:block">
            <AnimatePresence mode="wait">
              {!activeTarget ? (
                <motion.div
                  key="orbit-hero-resting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="grid min-h-[560px] grid-cols-12 items-center gap-6"
                >
                  {/* Left: Clean Editorial Name + Subtitle + Social Icons */}
                  <div className="col-span-5 pr-4">
                    <HeroText profile={profile} />
                  </div>

                  {/* Right-center: Centered Square Orbit Stage so portrait & 6 icons share exact center */}
                  <div className="col-span-7 flex items-center justify-center">
                    <div className="relative flex h-[540px] w-[540px] items-center justify-center">
                      {/* Exact circular orbital guide matching ORBIT_RADIUS_PX * 2 = 464px */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute h-[464px] w-[464px] rounded-full border border-[#E5E0D5]"
                      />

                      <ProfileCutout src={profile.avatar} alt={profile.name} />

                      {ORBIT_OBJECTS.map((item) => (
                        <OrbitObject
                          key={item.id}
                          item={item}
                          countLabel={getCountLabel(item.id)}
                          isSelected={false}
                          isDimmed={false}
                          mouseX={mouseX}
                          mouseY={mouseY}
                          onSelect={() => setActiveTarget(item.id)}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="orbit-hero-focused"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="grid min-h-[580px] grid-cols-12 items-center gap-8"
                >
                  {/* Left column: Shifted cutout + spotlighted clay object + clean orbit dock */}
                  <div className="col-span-5 flex flex-col justify-between gap-6">
                    <div>
                      <button
                        type="button"
                        onClick={() => setActiveTarget(null)}
                        className="inline-flex items-center gap-2 rounded-full border border-[#DDD7CB] bg-[#FAF9F5] px-4 py-2 text-xs font-medium text-[#141414] transition-all hover:border-[#141414] hover:bg-[#141414] hover:text-[#F6F4EF]"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        <span>Back to Orbit</span>
                        <kbd className="ml-1 rounded bg-black/5 px-1.5 py-0.5 font-mono text-[10px] opacity-70">
                          ESC
                        </kbd>
                      </button>
                    </div>

                    <div className="relative flex items-center justify-center py-4">
                      <div className="-translate-x-8 opacity-90 transition-transform duration-300">
                        <ProfileCutout
                          src={profile.avatar}
                          alt={profile.name}
                          compact
                        />
                      </div>

                      {activeConfig && (
                        <motion.div
                          layoutId={`orbit-object-${activeConfig.id}`}
                          transition={{
                            type: "spring",
                            stiffness: 290,
                            damping: 26,
                          }}
                          className="relative z-30 -ml-12 flex h-36 w-36 flex-col items-center justify-center"
                        >
                          <img
                            src={activeConfig.image}
                            alt={activeConfig.alt}
                            className="h-32 w-32 object-contain clay-object-img clay-object-img-active"
                          />
                        </motion.div>
                      )}
                    </div>

                    {/* Clean minimal object dock */}
                    <div className="rounded-2xl border border-[#E5E1D8] bg-[#FAF9F5]/90 p-2">
                      <div className="grid grid-cols-6 gap-1">
                        {ORBIT_OBJECTS.map((item) => {
                          const selected = item.id === activeTarget;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setActiveTarget(item.id)}
                              title={item.label}
                              className={cn(
                                "group flex flex-col items-center gap-1 rounded-xl p-2 transition-all",
                                selected
                                  ? "bg-[#141414] text-[#F6F4EF]"
                                  : "text-[#66635D] hover:bg-[#EFECE5] hover:text-[#0E0E0E]"
                              )}
                            >
                              <img
                                src={item.image}
                                alt={item.alt}
                                className="h-9 w-9 object-contain transition-transform group-hover:scale-110"
                              />
                              <span className="font-mono text-[9px] font-medium">
                                {item.shortLabel}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Right column: Active Panel */}
                  <div className="col-span-7">
                    <AnimatePresence mode="wait">
                      {activeTarget === "about" ? (
                        <AboutPanel
                          key="about-panel"
                          profile={profile}
                          experiences={experiences}
                          certificates={certificates}
                          onClose={() => setActiveTarget(null)}
                        />
                      ) : (
                        <ProjectPanel
                          key={`project-panel-${activeTarget}`}
                          category={activeTarget}
                          projects={activeProjects}
                          onClose={() => setActiveTarget(null)}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* MOBILE & TABLET LAYOUT (< lg) */}
          <div className="lg:hidden">
            <HeroText profile={profile} />

            <div className="mt-10 flex flex-col items-center">
              <ProfileCutout src={profile.avatar} alt={profile.name} compact />

              <p className="mt-4 text-xs font-medium text-[#7A766E]">
                Tap an object to explore
              </p>

              <div className="mt-4 grid w-full max-w-md grid-cols-3 gap-3">
                {ORBIT_OBJECTS.map((item) => {
                  const selected = activeTarget === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveTarget(item.id)}
                      className={cn(
                        "flex flex-col items-center rounded-2xl border p-3 transition-all active:scale-95",
                        selected
                          ? "border-[#141414] bg-[#141414] text-[#F6F4EF]"
                          : "border-[#E5E1D8] bg-[#FAF9F5] text-[#0E0E0E]"
                      )}
                    >
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="h-14 w-14 object-contain"
                      />
                      <span className="mt-2 font-display text-xs font-semibold">
                        {item.shortLabel}
                      </span>
                      <span
                        className={cn(
                          "mt-0.5 text-[10px]",
                          selected ? "text-[#D4D0C8]" : "text-[#7A766E]"
                        )}
                      >
                        {getCountLabel(item.id)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Bottom Sheet */}
            <AnimatePresence>
              {activeTarget && (
                <div className="fixed inset-0 z-50 flex items-end justify-center lg:hidden">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setActiveTarget(null)}
                    className="fixed inset-0 bg-black/45 backdrop-blur-sm"
                  />
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", stiffness: 320, damping: 32 }}
                    className="relative z-10 max-h-[86vh] w-full overflow-y-auto rounded-t-[28px] bg-[#FAF9F5] p-2 shadow-2xl"
                  >
                    <div className="mx-auto my-2 h-1.5 w-12 rounded-full bg-[#D8D3C9]" />
                    {activeTarget === "about" ? (
                      <AboutPanel
                        profile={profile}
                        experiences={experiences}
                        certificates={certificates}
                        onClose={() => setActiveTarget(null)}
                      />
                    ) : (
                      <ProjectPanel
                        category={activeTarget}
                        projects={activeProjects}
                        onClose={() => setActiveTarget(null)}
                      />
                    )}
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Quiet bottom-left caption matching the reference */}
        {!activeTarget && (
          <div className="mx-auto mt-8 hidden w-full max-w-7xl px-6 sm:px-10 lg:block">
            <p className="text-sm font-normal text-[#7A766E]">
              Hover &amp; click objects to explore
            </p>
          </div>
        )}
      </section>
    </LayoutGroup>
  );
}
