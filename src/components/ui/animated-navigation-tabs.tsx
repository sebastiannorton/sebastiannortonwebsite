"use client"

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function AnimatedNavigationTabs({ items }: { items: Array<{ id: number; tile: string }> }) {
  const [active, setActive] = useState(items[0]);
  const [isHover, setIsHover] = useState<{ id: number; tile: string } | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scrollTo state when navigating from another page
  useEffect(() => {
    if (location.state?.scrollTo && location.pathname === "/") {
      const sectionId = location.state.scrollTo;
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
      // Clear the state without triggering re-render
      window.history.replaceState({}, document.title, location.pathname);
    }
  }, [location.pathname, location.state?.scrollTo]);

  const handleNavLinkClick = (item: { id: number; tile: string }) => {
    setActive(item);
    const sectionId = item.tile.toLowerCase();
    if (location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };

  return (
    <div className="relative">
      <ul className="flex items-center justify-center">
        {items.map((item) => {
          return (
            <button
              key={item.id}
              className={cn(
                "py-2 relative duration-300 transition-colors hover:!text-foreground min-h-[44px] min-w-[44px]",
                isHover?.id === item.id || active.id === item.id ? "text-foreground" : "text-muted-foreground"
              )}
              onClick={() => handleNavLinkClick(item)}
              onMouseEnter={() => setIsHover(item)}
              onMouseLeave={() => setIsHover(null)}
            >
              <div className="px-5 py-2 relative">
                {item.tile}
                <div
                  className={cn(
                    "absolute inset-0 rounded-[6px] transition-opacity duration-200",
                    isHover?.id === item.id ? "opacity-100 bg-primary/10" : "opacity-0"
                  )}
                />
              </div>
              {active.id === item.id && (
                <motion.div
                  layoutId="active"
                  className="absolute bottom-0 left-0 right-0 w-full h-0.5 bg-primary"
                />
              )}
              {isHover?.id === item.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 w-full h-0.5 bg-primary"
                />
              )}
            </button>
          );
        })}
      </ul>
    </div>
  );
}

// Mobile hamburger navigation component
export function MobileNav({ items }: { items: Array<{ id: number; tile: string }> }) {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(items[0]);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavLinkClick = (item: { id: number; tile: string }) => {
    setActive(item);
    setIsOpen(false);
    const sectionId = item.tile.toLowerCase();
    if (location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <div className="relative">
      {/* Plus button (replaces hamburger) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-11 h-11 rounded-md border border-border transition-colors hover:bg-muted/60 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <X size={24} className="text-foreground" />
        ) : (
          <Plus size={24} className="text-foreground" />
        )}
      </button>

      {/* Mobile menu panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed right-4 top-20 z-50 w-56 rounded-lg border border-border bg-white dark:bg-neutral-900 shadow-xl"
          >
            <nav className="py-2">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavLinkClick(item)}
                  className={cn(
                    "w-full text-left px-5 py-3.5 text-base transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 min-h-[44px]",
                    active.id === item.id
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground"
                  )}
                >
                  {item.tile}
                </button>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </div>
  );
}
