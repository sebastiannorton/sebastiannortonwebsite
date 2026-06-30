"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Define the type for a single category item
export interface Category {
  id: string | number;
  title: string;
  subtitle?: string;
  description?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  featured?: boolean;
}

// Define the props for the CategoryList component
export interface CategoryListProps {
  title: string;
  subtitle?: string;
  categories: Category[];
  headerIcon?: React.ReactNode;
  className?: string;
}

export const CategoryList = ({
  title,
  subtitle,
  categories,
  headerIcon,
  className,
}: CategoryListProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount and resize
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // On mobile, all cards are always "hovered" (expanded)
  const effectivelyHovered = isMobile ? true : hoveredItem;

  return (
    <div className={cn("w-full bg-background text-foreground", className)}>
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        {title && (
          <div className="text-center mb-12 md:mb-16">
            {headerIcon && (
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/80 to-primary mb-6 text-primary-foreground">
                {headerIcon}
              </div>
            )}
            <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">{title}</h1>
            {subtitle && (
              <h2 className="text-4xl md:text-5xl font-bold text-muted-foreground">{subtitle}</h2>
            )}
          </div>
        )}

        {/* Categories List */}
        <div className="space-y-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative group"
              onMouseEnter={() => setHoveredItem(category.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={category.onClick}
            >
              <motion.div
                layout={!isMobile}
                className={cn(
                  "relative overflow-hidden border bg-white/50 dark:bg-neutral-900/50 transition-colors duration-300 ease-in-out cursor-pointer rounded-lg",
                  effectivelyHovered === category.id || isMobile
                    ? "border-primary shadow-lg shadow-primary/20"
                    : "border-border hover:border-primary/50"
                )}
              >
                {/* Corner brackets that always show on mobile, only on hover on desktop */}
                <AnimatePresence>
                  {(hoveredItem === category.id || isMobile) && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="absolute top-3 left-3 w-6 h-6">
                        <div className="absolute top-0 left-0 w-4 h-0.5 bg-primary" />
                        <div className="absolute top-0 left-0 w-0.5 h-4 bg-primary" />
                      </div>
                      <div className="absolute bottom-3 right-3 w-6 h-6">
                        <div className="absolute bottom-0 right-0 w-4 h-0.5 bg-primary" />
                        <div className="absolute bottom-0 right-0 w-0.5 h-4 bg-primary" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Content */}
                <div className="px-6 md:px-8 py-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3
                        className={cn(
                          "font-bold transition-colors duration-300",
                          category.featured ? "text-2xl md:text-3xl" : "text-xl md:text-2xl",
                          effectivelyHovered === category.id || isMobile ? "text-primary" : "text-foreground"
                        )}
                      >
                        {category.title}
                      </h3>
                      {category.subtitle && (
                        <p
                          className={cn(
                            "mt-1 transition-colors duration-300 text-sm md:text-base",
                             effectivelyHovered === category.id || isMobile ? "text-foreground/90" : "text-muted-foreground"
                          )}
                        >
                          {category.subtitle}
                        </p>
                      )}
                    </div>

                    {/* Icon always visible on mobile, only on hover on desktop */}
                    <AnimatePresence>
                      {(hoveredItem === category.id || isMobile) && category.icon && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="text-primary ml-4 mt-1 flex-shrink-0"
                        >
                          {category.icon}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Animated description always visible on mobile, only on hover on desktop */}
                  <AnimatePresence initial={false}>
                    {(hoveredItem === category.id || isMobile) && category.description && (
                      <motion.div
                        initial={isMobile ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={isMobile ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2 border-t border-primary/20 pt-2">
                          <p className="text-sm md:text-base text-foreground">
                            {category.description}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};