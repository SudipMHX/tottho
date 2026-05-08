"use client";

import { getIcon } from "@/lib/icons";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Link = {
  _id: string;
  title: string;
  url: string;
  icon: string;
  clicks: number;
};

type ThemeName =
  | "default"
  | "dark"
  | "gradient"
  | "glass"
  | "neon"
  | "aurora"
  | "beams"
  | "confetti"
  | "geometric"
  | "glowDark"
  | "glowLime"
  | "gooey"
  | "grain"
  | "gridDark"
  | "gridLight"
  | "hills"
  | "interactive"
  | "matrix"
  | "paper"
  | "smoke"
  | "stars"
  | "vine"
  | "portfolio";

type Props = {
  link: Link;
  username: string;
  theme: ThemeName;
};

export default function LinkButton({ link, username, theme }: Props) {
  const Icon = getIcon(link.icon);

  async function handleClick() {
    try {
      await fetch("/api/analytics/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, linkId: link._id }),
      });
    } catch {}
    // window.open(link.url, "_blank", "noopener,noreferrer");
  }

  // --- Theme Specific Configurations ---

  // 1. Framer Motion Animations
  const hoverAnimations: Record<ThemeName, any> = {
    default: { scale: 1.02 },
    dark: { scale: 1.02 },
    gradient: { scale: 1.05 },
    glass: { scale: 1.02 },
    neon: { scale: 1.05 },
    aurora: { scale: 1.025, y: -2 },
    beams: { scale: 1.02 },
    confetti: { scale: 1.05, rotate: 1 },
    geometric: { scale: 1.03, borderRadius: "24px" },
    glowDark: {
      scale: 1.04,
      boxShadow: "0px 0px 20px 0px rgba(255,255,255,0.2)",
    },
    glowLime: {
      scale: 1.04,
      boxShadow: "0px 0px 20px 0px rgba(132,204,34,0.4)",
    },
    gooey: { scale: 1.03 },
    grain: { scale: 1.01 },
    gridDark: { scale: 1.02, x: 5 },
    gridLight: { scale: 1.02, x: 5 },
    hills: { scale: 1.02, y: -4 },
    interactive: { scale: 1.05 },
    matrix: { scale: 1.02, boxShadow: "0px 0px 15px 0px rgba(34,197,94,0.4)" },
    paper: { scale: 1.02, rotate: -1 },
    smoke: { scale: 1.03 },
    stars: { scale: 1.02 },
    vine: { scale: 1.02, rotate: 1 },
    portfolio: {
      scale: 1.04,
      boxShadow: "5px 8px 10px 0px rgba(195,228,29,0.4)",
    },
  };

  const tapAnimations: Record<ThemeName, any> = {
    default: { scale: 0.98 },
    dark: { scale: 0.98 },
    gradient: { scale: 0.95 },
    glass: { scale: 0.98 },
    neon: { scale: 0.95 },
    aurora: { scale: 0.975 },
    beams: { scale: 0.98 },
    confetti: { scale: 0.95 },
    geometric: { scale: 0.97 },
    glowDark: { scale: 0.98 },
    glowLime: { scale: 0.98 },
    gooey: { scale: 0.97 },
    grain: { scale: 0.99 },
    gridDark: { scale: 0.98 },
    gridLight: { scale: 0.98 },
    hills: { scale: 0.98 },
    interactive: { scale: 0.95 },
    matrix: { scale: 0.98 },
    paper: { scale: 0.98 },
    smoke: { scale: 0.97 },
    stars: { scale: 0.98 },
    vine: { scale: 0.98 },
    portfolio: { scale: 0.98 },
  };

  // 2. Tailwind Classes
  const themeClasses: Record<ThemeName, string> = {
    default:
      "bg-white border border-gray-200 text-gray-800 hover:border-[#FF5240]/30 hover:shadow-md",
    dark: "bg-gray-800 border border-gray-700 text-white hover:bg-gray-700",
    gradient:
      "bg-white/20 backdrop-blur border border-white/30 text-white hover:bg-white/30",
    glass:
      "bg-white/10 backdrop-blur-xs border border-white/20 text-white hover:border-white/40 shadow-xl",
    neon: "bg-transparent border border-[rgba(59,99,247,0.4)] text-white hover:border-[#FF5240]/50 hover:shadow-[0_0_16px_rgba(59,99,247,0.5)]",
    aurora:
      "bg-white/10 border border-white/20 backdrop-blur-xl text-white hover:bg-white/20 hover:border-white/40 hover:shadow-[0_0_30px_rgba(209,0,209,0.3)] shadow-[0_2px_20px_rgba(0,0,0,0.3)]",
    beams:
      "bg-white/5 border border-white/10 backdrop-blur-md text-white hover:bg-white/10 hover:border-cyan-400/50 shadow-[0_4px_24px_rgba(0,0,0,0.2)]",
    confetti:
      "bg-white border-2 border-indigo-100 text-indigo-900 shadow-sm hover:border-indigo-300 hover:shadow-md font-bold",
    geometric:
      "bg-white/5 border border-white/10 backdrop-blur-md text-white hover:bg-white/10 hover:border-rose-500/50 shadow-[0_4px_24px_rgba(0,0,0,0.2)]",
    glowDark:
      "bg-zinc-900 border border-zinc-800 text-zinc-100 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:border-white/20",
    glowLime:
      "bg-zinc-900/80 border border-lime-500/20 backdrop-blur-md text-lime-100 shadow-[0_0_15px_rgba(132,204,34,0.1)] hover:border-lime-500/40",
    gooey:
      "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:bg-indigo-400 border-none rounded-full",
    grain:
      "bg-[#E5E0D8] border border-[#D5D0C8] text-[#2C2C2C] shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_2px_4px_rgba(0,0,0,0.05)] hover:bg-[#EAE5DD]",
    gridDark:
      "bg-zinc-900/50 border border-zinc-800 text-zinc-300 backdrop-blur-sm hover:bg-zinc-800/80 hover:text-white",
    gridLight:
      "bg-white/50 border border-gray-200 text-gray-700 backdrop-blur-sm hover:bg-white hover:text-gray-900",
    hills:
      "bg-emerald-900/40 border border-emerald-500/30 backdrop-blur-md text-emerald-50 hover:bg-emerald-800/50 hover:border-emerald-400/50 shadow-[0_4px_24px_rgba(0,0,0,0.2)]",
    interactive:
      "bg-white border-2 border-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] transition-none",
    matrix:
      "bg-black border border-green-500/30 text-green-400 font-mono hover:bg-green-900/20 hover:border-green-400",
    paper:
      "bg-[#FDFBF7] border border-[#E8E6E1] text-gray-800 shadow-[2px_3px_0px_0px_rgba(0,0,0,0.05)] hover:bg-white hover:shadow-[4px_5px_0px_0px_rgba(0,0,0,0.05)]",
    smoke:
      "bg-black/40 border border-purple-500/20 backdrop-blur-xl text-white hover:bg-black/60 hover:border-purple-500/40 shadow-[0_4px_24px_rgba(0,0,0,0.4)]",
    stars:
      "bg-black/40 border border-white/10 backdrop-blur-xl text-zinc-100 hover:bg-black/60 hover:border-white/20 shadow-[0_4px_24px_rgba(0,0,0,0.4)]",
    vine: "bg-emerald-950/40 border border-emerald-500/20 backdrop-blur-xl text-emerald-100 hover:bg-emerald-900/60 hover:border-emerald-500/40 shadow-[0_4px_24px_rgba(0,0,0,0.3)]",
    portfolio:
      "bg-black/40 border border-3 border-[#C3E41D]/20 backdrop-blur-xl text-white hover:bg-black/60 hover:border-[#C3E41D]/40",
  };

  const iconClasses: Partial<Record<ThemeName, string>> = {
    aurora: "text-pink-200/80",
    beams: "text-cyan-200/80",
    glowLime: "text-lime-400",
    hills: "text-emerald-300",
    matrix: "text-green-500",
    smoke: "text-purple-300",
    vine: "text-emerald-300",
  };

  return (
    <Link
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="w-full"
    >
      <motion.div
        whileHover={hoverAnimations[theme] || hoverAnimations.default}
        whileTap={tapAnimations[theme] || tapAnimations.default}
        className={cn(
          "w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl cursor-pointer",
          "font-semibold text-sm transition-colors duration-200",
          themeClasses[theme] || themeClasses.default,
        )}
      >
        <span className={cn("text-lg shrink-0", iconClasses[theme] || "")}>
          <Icon />
        </span>
        <span className="flex-1 text-center">{link.title}</span>
      </motion.div>
    </Link>
  );
}
