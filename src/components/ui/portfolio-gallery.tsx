"use client";

import { ArrowDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface PortfolioGalleryProps {
  title?: string;
  archiveButton?: {
    text: string;
    href: string;
  };
  images?: Array<{
    img: string;
    description: string;
    title?: string;
  }>;
  className?: string;
  maxHeight?: number;
  spacing?: string;
  onImageClick?: (index: number) => void;
  /**
   * Whether to pause marquee animation on hover (mobile only)
   * @default true
   */
  pauseOnHover?: boolean;
  /**
   * Number of times to repeat the content in marquee (mobile only)
   * @default 4
   */
  marqueeRepeat?: number;
}

export function PortfolioGallery({
  images: customImages,
  className = "",
  maxHeight = 120,
  spacing = "-space-x-72 md:-space-x-80",
  onImageClick,

}: PortfolioGalleryProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);


  const defaultImages = [
    {
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80",
      description: "SaaS Dashboard Design",
    },
    {
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80",
      description: "Web Development",
    },
    {
      img: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=800&h=600&fit=crop&q=80",
      description: "E-Commerce Platform",
    },
    {
      img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&q=80",
      description: "Mobile App Design",
    },
    {
      img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop&q=80",
      description: "Brand Identity",
    },
    {
      img: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&q=80",
      description: "Marketing Campaign",
    },
    {
      img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop&q=80",
      description: "Product Photography",
    },
    {
      img: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=600&fit=crop&q=80",
      description: "Packaging Design",
    },
    {
      img: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=800&h=600&fit=crop&q=80",
      description: "Tech Innovation",
    },
    {
      img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop&q=80",
      description: "Future Vision",
    },
  ];

  const images = customImages || defaultImages;

  return (
    <section
      className={cn(
        "relative pt-10 px-4 overflow-hidden bg-[#050816]",
        className,
      )}
      id="archives"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.15),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.15),transparent_30%)]" />

        {/* Top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-fuchsia-500/20 blur-[140px] rounded-full" />

        {/* Bottom glow */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full" />

        {/* Floating orb */}
        <div className="absolute top-40 left-20 w-40 h-40 rounded-full border border-white/10 bg-white/5 backdrop-blur-3xl" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
        linear-gradient(to right, white 1px, transparent 1px),
        linear-gradient(to bottom, white 1px, transparent 1px)
      `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>
      <div className="overflow-hidden">
        {/* Header Section */}
        <div className="relative z-10 text-center pt-16 pb-8 px-8">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight mb-3 max-w-3xl mx-auto tracking-tight">
            Explore Our <span className="gradient-text">Themes</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-4">
            Discover our collection of beautifully crafted themes designed to
            elevate your digital presence.
          </p>

          <div className="flex items-center justify-center gap-3 flex-col md:flex-row pb-16 md:pb-0">
            <Link href={"/showcase"} className="btn btn-secondary btn-sm">
              <span>View Showcase</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href={"#explore"} className="btn btn-primary btn-sm">
              <span>Explore Themes</span>
              <ArrowDown className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Desktop 3D overlapping layout - hidden on mobile */}
        <div className="hidden md:block relative bottom-0 overflow-hidden h-[500px] -mb-[200px]">
          <div
            className={`flex ${spacing} pb-8 pt-40 items-end justify-center`}
          >
            {images.map((image, index) => {
              // Calculate stagger height - peak in middle, descending to edges
              const totalImages = images.length;
              const middle = Math.floor(totalImages / 2);
              const distanceFromMiddle = Math.abs(index - middle);
              const staggerOffset = maxHeight - distanceFromMiddle * 20;

              const zIndex = totalImages - index;

              const isHovered = hoveredIndex === index;
              const isOtherHovered =
                hoveredIndex !== null && hoveredIndex !== index;

              // When hovering: hovered card moves to consistent top position, others move to baseline
              const yOffset = isHovered
                ? -120
                : isOtherHovered
                  ? 0
                  : -staggerOffset;

              return (
                <motion.div
                  key={index}
                  className="group cursor-pointer flex-shrink-0"
                  style={{
                    zIndex: zIndex,
                  }}
                  initial={{
                    transform: `perspective(5000px) rotateY(-45deg) translateY(200px)`,
                    opacity: 0,
                  }}
                  animate={{
                    transform: `perspective(5000px) rotateY(-45deg) translateY(${yOffset}px)`,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.2, // Much faster hover animation
                    delay: index * 0.05, // Faster entrance stagger
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  onClick={() => onImageClick?.(index)}
                >
                  <div
                    className="relative aspect-video w-64 md:w-80 lg:w-96 rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105"
                    style={{
                      boxShadow: `
                        rgba(0, 0, 0, 0.01) 0.796192px 0px 0.796192px 0px,
                        rgba(0, 0, 0, 0.03) 2.41451px 0px 2.41451px 0px,
                        rgba(0, 0, 0, 0.08) 6.38265px 0px 6.38265px 0px,
                        rgba(0, 0, 0, 0.25) 20px 0px 20px 0px
                      `,
                    }}
                  >
                    <Image
                      width={300}
                      height={300}
                      loading="lazy"
                      quality={75}
                      src={image.img || "/logo.png"}
                      alt={image.description}
                      className="w-full h-full object-cover object-left-top"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
