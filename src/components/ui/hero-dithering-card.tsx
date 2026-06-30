"use client"

import { ArrowRight } from "lucide-react"
import { useState, Suspense, lazy } from "react"

const Dithering = lazy(() => 
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.Dithering }))
)

export function HeroDitheringCard() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="absolute inset-0 bg-muted/20" />}>
          <div className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-30 mix-blend-multiply dark:mix-blend-screen">
            <Dithering
              colorBack="#00000000" // Transparent
              colorFront="#f9c22b"  // Accent
              shape="warp"
              type="4x4"
              speed={isHovered ? 0.6 : 0.2}
              className="size-full"
              minPixelRatio={1}
            />
          </div>
        </Suspense>
      </div>
      {/* Top spacer to push content down */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative z-10 text-center max-w-3xl px-4">
          <h1 className="font-bold mb-6 text-foreground">
            What are you here to create?
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            I am a Transformational Coach and Next Culture Growness Architect. I see complex systems and human inner workings with clarity and hold space for people to begin and move from exactly where they are.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="#contact" className="inline-flex items-center justify-center bg-accent text-accent-foreground px-8 py-3.5 text-lg font-medium transition-all hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/25 hover:scale-[1.02] active:scale-[0.98]">
              Book a Session
            </a>
            <a href="#spaces" className="inline-flex items-center justify-center border border-border bg-card text-card-foreground px-8 py-3.5 text-lg font-medium transition-all hover:bg-muted/80 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]">
              Learn More
            </a>
          </div>
        </div>
      </div>
      {/* Spinning principles wheel - sits at bottom naturally */}
      <div className="hidden md:flex items-center justify-center pb-12">
        <div className="w-72 h-72">
          <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_60s_linear_infinite]">
            <defs>
              <path id="principle-path" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
            </defs>
            <text className="text-[5.6px] font-small tracking-[0.3em] uppercase" style={{ fill: 'var(--principles-text-color)' }}>
              <textPath href="#principle-path" startOffset="0%">Creation • Clarity • Connection • Authenticity •</textPath>
            </text>
          </svg>
        </div>
      </div>
    </section>
  )
}