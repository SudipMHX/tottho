import { Metadata } from "next";
import { PortfolioGallery } from "@/components/ui/portfolio-gallery";
import RadialGallerySection from "./RadialGallerySection";

export const metadata: Metadata = {
  title: "Themes",
  description:
    "Discover our collection of beautifully crafted themes designed to elevate your digital presence.",
};

const themePreview = [
  {
    id: 1,
    title: "Default",
    cat: "Minimal",
    img: "/images/theme-preview/white.png",
    description: "Clean & minimal",

  },
  {
    id: 2,
    title: "Dark",
    cat: "Dark",
    img: "/images/theme-preview/dark.png",
    description: "Pure black elegance",
  },
  {
    id: 3,
    title: "Gradient",
    cat: "Colorful",
    img: "/images/theme-preview/gradient.png",
    description: "Vibrant & colorful",
  },
  {
    id: 4,
    title: "Glass",
    cat: "Glassmorphism",
    img: "/images/theme-preview/glass.png",
    description: "Frosted glass effect",
  },
  {
    id: 5,
    title: "Neon",
    cat: "Tech",
    img: "/images/theme-preview/neon.png",
    description: "Electric glow",
  },
  {
    id: 6,
    title: "Geometric",
    cat: "Abstract",
    img: "/images/theme-preview/geometric.png",
    description: "Floating shapes",
  },
  {
    id: 7,
    title: "Gooey",
    cat: "Interactive",
    img: "/images/theme-preview/gooey.png",
    description: "Interactive trail",
  },
  {
    id: 8,
    title: "Beams",
    cat: "Canvas",
    img: "/images/theme-preview/beams.png",
    description: "Light beam canvas",
  },
  {
    id: 9,
    title: "Smoke",
    cat: "WebGL",
    img: "/images/theme-preview/smoke.png",
    description: "WebGL smoke",
  },
  {
    id: 10,
    title: "Aurora",
    cat: "Nature",
    img: "/images/theme-preview/aurora.png",
    description: "Gradient blobs",
  },
  {
    id: 11,
    title: "Paper",
    cat: "Minimal",
    img: "/images/theme-preview/paper.png",
    description: "Warm & minimal",
  },
  {
    id: 12,
    title: "Grain",
    cat: "Texture",
    img: "/images/theme-preview/grain.png",
    description: "Warm noise gradient",
  },
  {
    id: 13,
    title: "Orb Grid",
    cat: "Grid",
    img: "/images/theme-preview/grid-light.png",
    description: "Magenta orb grid",
  },
  {
    id: 14,
    title: "Dark Grid",
    cat: "Grid",
    img: "/images/theme-preview/grid-dark.png",
    description: "Small dark grid",
  },
  {
    id: 15,
    title: "Confetti",
    cat: "3D",
    img: "/images/theme-preview/confetti.png",
    description: "3D falling confetti",
  },
  {
    id: 16,
    title: "Dark Glow",
    cat: "Glow",
    img: "/images/theme-preview/glow-dark.png",
    description: "Minimal slate glow",
  },
  {
    id: 17,
    title: "Lime Glow",
    cat: "Glow",
    img: "/images/theme-preview/glow-lime.png",
    description: "Neon lime glow",
  },
  {
    id: 18,
    title: "Fluid",
    cat: "Interactive",
    img: "/images/theme-preview/interactive.png",
    description: "Interactive gradient",
  },
  {
    id: 19,
    title: "Stars",
    cat: "Space",
    img: "/images/theme-preview/stars.png",
    description: "Interactive starfield",
  },
  {
    id: 20,
    title: "GLSL Hills",
    cat: "3D",
    img: "/images/theme-preview/hills.png",
    description: "3D wireframe mesh",
  },
  {
    id: 21,
    title: "Living Vine",
    cat: "Organic",
    img: "/images/theme-preview/vine.png",
    description: "Organic mouse trails",
  },
  {
    id: 22,
    title: "Matrix Rain",
    cat: "Cyberpunk",
    img: "/images/theme-preview/matrix.png",
    description: "Terminal letters",
  },
  {
    id: 23,
    title: "Portfolio Hero",
    cat: "Hero",
    img: "/images/theme-preview/portfolio.png",
    description: "Animated hero with blur text",
  },
];

export default function ThemePage() {
  return (
    <>
      {/* Hero / gallery header */}
      <PortfolioGallery images={themePreview} />

      {/* Radial scroll showcase */}
      <RadialGallerySection themePreview={themePreview} />
    </>
  );
}
