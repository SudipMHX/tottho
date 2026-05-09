"use client";

import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RadialScrollGallery } from "@/components/ui/portfolio-and-image-gallery";
import Image from "next/image";


export default function RadialGallerySection({themePreview}: {themePreview: any[]}) {
  return (
    <section className="relative bg-[#050816] overflow-hidden" id="explore">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-fuchsia-500/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full" />
      </div>

      {/* Section header */}
      <div className="relative z-10 h-[280px] flex flex-col items-center justify-center space-y-4 px-4">
        <div className="space-y-1 text-center">
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#C3E41D]">
            Showcase
          </span>
          <h2 className="text-4xl font-bold tracking-tighter text-white">
            Featured Themes
          </h2>
          <p className="text-sm text-gray-400 max-w-xs mx-auto pt-1">
            Scroll to explore our curated collection
          </p>
        </div>
        <div className="animate-bounce text-gray-500 text-xs hidden md:block">
          ↓ Scroll
        </div>
      </div>

      {/* Mobile: simple 2-column image grid */}
      <div className="block md:hidden relative z-10 px-4 pb-12">
        <div className="grid grid-cols-2 gap-3">
          {themePreview.map((theme) => (
            <div
              key={theme.id}
              className="relative h-[160px] overflow-hidden rounded-xl"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <Image
                width={400}
                height={400}
                src={theme.img}
                alt={theme.title}
                className="h-full w-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)",
                }}
              />
              <div className="absolute bottom-2 left-3">
                <span className="text-[10px] text-[#C3E41D] font-semibold uppercase tracking-widest">
                  {theme.cat}
                </span>
                <p className="text-white text-sm font-bold leading-tight">
                  {theme.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: radial scroll wheel */}
      <div className="hidden md:block">
        <RadialScrollGallery
          className="!min-h-[600px]"
          baseRadius={420}
          mobileRadius={260}
          visiblePercentage={50}
          scrollDuration={2200}
        >
          {(hoveredIndex) =>
            themePreview.map((theme, index) => {
              const isActive = hoveredIndex === index;
              return (
                <div
                  key={theme.id}
                  className="group relative w-[200px] h-[280px] lg:w-[340px] lg:h-[320px] overflow-hidden rounded-xl shadow-2xl"
                  style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      width={1000}
                      height={1000}
                      loading="eager"
                      quality={75}
                      src={theme.img}
                      alt={theme.title}
                      className={`h-full w-full object-cover transition-transform duration-700 ease-out ${isActive
                        ? "scale-110 blur-0"
                        : "scale-100 blur-[1px] grayscale-[40%]"
                        }`}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
                      }}
                    />
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-between p-4">
                    <div className="flex justify-between items-start">
                      <Badge
                        variant="secondary"
                        className="text-[10px] px-2 py-0"
                        style={{
                          backgroundColor: "rgba(0,0,0,0.65)",
                          backdropFilter: "blur(6px)",
                          color: "#fff",
                          border: "1px solid rgba(255,255,255,0.12)",
                        }}
                      >
                        {theme.cat}
                      </Badge>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 ${isActive
                          ? "opacity-100 rotate-0"
                          : "opacity-0 -rotate-45"
                          }`}
                        style={{ backgroundColor: "#C3E41D", color: "#000" }}
                      >
                        <ArrowUpRight size={12} />
                      </div>
                    </div>

                    <div
                      className={`transition-transform duration-500 ${isActive ? "translate-y-0" : "translate-y-2"
                        }`}
                    >
                      <h3 className="text-xl font-bold leading-tight text-white tracking-tight">
                        {theme.title}
                      </h3>
                      <div
                        className={`h-0.5 mt-2 transition-all duration-500 ${isActive ? "w-full opacity-100" : "w-0 opacity-0"
                          }`}
                        style={{ backgroundColor: "#C3E41D" }}
                      />
                    </div>
                  </div>
                </div>
              );
            })
          }
        </RadialScrollGallery>
      </div>
    </section>
  );
}
