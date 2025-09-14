import { useState, useEffect } from "react";

interface ScrollProgressBarProps {
  className?: string;
  hideDelay?: number;
}

export function ScrollProgressBar({ className = "", hideDelay = 2000 }: ScrollProgressBarProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;
      
      setScrollProgress(Math.min(scrollPercentage, 100));
      
      // Show progress bar when scrolling
      if (scrollTop > 50) { // Only show after scrolling a bit
        setIsVisible(true);
        
        // Clear existing timeout
        if (hideTimeout) {
          clearTimeout(hideTimeout);
        }
        
        // Set new timeout to hide
        const newTimeout = setTimeout(() => {
          setIsVisible(false);
        }, hideDelay);
        
        setHideTimeout(newTimeout);
      } else {
        // Hide immediately when at top
        setIsVisible(false);
        if (hideTimeout) {
          clearTimeout(hideTimeout);
        }
      }
    };

    // Add scroll listener
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    
    // Initial check
    updateScrollProgress();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, [hideTimeout, hideDelay]);

  return (
    <div
      className={`
        fixed top-0 left-0 right-0 z-50 h-1 
        bg-gradient-to-r from-primary/20 to-primary/10
        transition-all duration-300 ease-out
        ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
        ${className}
      `}
    >
      {/* Progress fill */}
      <div
        className="h-full bg-gradient-financial shadow-sm transition-all duration-150 ease-out"
        style={{ 
          width: `${scrollProgress}%`,
          boxShadow: scrollProgress > 0 ? "0 0 10px hsl(var(--primary) / 0.3)" : "none"
        }}
      />
      
      {/* Subtle glow effect */}
      <div
        className="absolute top-0 h-full bg-gradient-to-r from-transparent via-primary-glow/30 to-transparent blur-sm transition-all duration-150 ease-out"
        style={{ 
          width: `${Math.min(scrollProgress + 10, 100)}%`,
          opacity: scrollProgress > 0 ? 0.6 : 0
        }}
      />
    </div>
  );
}