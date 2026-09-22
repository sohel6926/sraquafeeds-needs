import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;

      if (windowHeight > 0) {
        const progress = Math.min(100, Math.max(0, (totalScroll / windowHeight) * 100));
        setScrollProgress(progress);
      }

      if (totalScroll > 180) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  // SVG circular ring calculations
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <button
        id="scroll-to-top-btn"
        onClick={scrollToTop}
        aria-label={`Scroll to top of page (${Math.round(scrollProgress)}% scrolled)`}
        className="relative group w-12 h-12 rounded-full bg-white text-slate-700 hover:text-emerald-600 shadow-lg hover:shadow-xl border border-slate-200/80 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        {/* SVG Circular Progress Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 44 44">
          {/* Background Ring */}
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="3"
          />
          {/* Active Animated Progress Ring */}
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            stroke="#059669"
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-150 ease-out"
          />
        </svg>

        {/* Arrow Icon */}
        <ArrowUp className="w-5 h-5 z-10 transition-transform duration-200 group-hover:-translate-y-0.5" />
      </button>
    </div>
  );
};
