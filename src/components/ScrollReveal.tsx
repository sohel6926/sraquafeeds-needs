import React, { useEffect, useRef } from 'react';

export type RevealAnimation =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'slide-left'
  | 'slide-right'
  | 'slide-up'
  | 'slide-down'
  | 'scale'
  | 'blur';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: RevealAnimation;
  delay?: number; // in ms
  duration?: number; // in ms
  threshold?: number;
  className?: string;
  as?: React.ElementType;
  stagger?: boolean;
}

/**
 * Reusable wrapper component that triggers a smooth reveal animation
 * when the element scrolls into view.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration,
  threshold = 0.12,
  className = '',
  as: Component = 'div',
  stagger = false,
}) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If reduced motion is preferred, immediately reveal
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-revealed');
      return;
    }

    // Check if element is already in viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      // If above the fold on initial mount, reveal smoothly
      requestAnimationFrame(() => {
        setTimeout(() => {
          el.classList.add('is-revealed');
        }, delay);
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.classList.add('is-revealed');
            }, delay);
            observer.unobserve(el);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [delay, threshold]);

  const animationClass = `reveal-${animation}`;
  const staggerClass = stagger ? 'reveal-group' : '';
  const customStyle: React.CSSProperties = {
    ...(duration ? { transitionDuration: `${duration}ms` } : {}),
  };

  const ComponentTag = Component as any;

  return (
    <ComponentTag
      ref={ref}
      style={customStyle}
      className={`reveal ${animationClass} ${staggerClass} ${className}`.trim()}
    >
      {children}
    </ComponentTag>
  );
};

/**
 * Global Scroll Reveal Controller:
 * Automatically discovers all sections, cards, and tagged elements across the entire website
 * and adds smooth, high-performance scroll-reveal animations.
 */
export const GlobalScrollRevealObserver: React.FC = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Helper to observe targets
    const observeElements = () => {
      // Find elements marked with .reveal, [data-reveal], or sections that aren't excluded
      const elements = document.querySelectorAll<HTMLElement>(
        '.reveal:not(.is-revealed), [data-reveal]:not(.is-revealed), section:not([data-no-reveal]):not(.is-revealed)'
      );

      elements.forEach((el) => {
        // If element is a section without specific reveal class, give it standard fade-up
        if (el.tagName === 'SECTION' && !el.classList.contains('reveal')) {
          el.classList.add('reveal', 'reveal-fade-up');
        }

        if (prefersReducedMotion) {
          el.classList.add('is-revealed');
          return;
        }

        // If already in viewport
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 40 && rect.bottom > 0) {
          el.classList.add('is-revealed');
          return;
        }

        observer.observe(el);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.classList.add('is-revealed');
            observer.unobserve(target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    // Initial pass
    observeElements();

    // Listen for DOM changes (page transitions, tabs, filters)
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Also observe on window resize or orientation change
    window.addEventListener('resize', observeElements, { passive: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener('resize', observeElements);
    };
  }, []);

  return null;
};
