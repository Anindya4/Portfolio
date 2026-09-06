"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";

import { cn } from "./lib/utils";

export interface SparklesIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SparklesIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  parentHover?: boolean;
  autoAnimate?: boolean;
}

const SPARKLE_VARIANTS: Variants = {
  normal: {
    fillOpacity: 0,
    pathLength: 1,
    opacity: 0.8,
    transition: {
      duration: 0.3,
    },
  },
  animate: {
    fillOpacity: [0, 0.7, 0.2, 0.6],
    pathLength: [0.4, 1],
    opacity: [0.5, 1, 0.8, 1],
    transition: {
      duration: 1.2,
      ease: "easeInOut",
    },
  },
};

const STAR_VARIANTS: Variants = {
  normal: {
    opacity: 0.5,
    pathLength: 1,
    transition: {
      duration: 0.3,
    },
  },
  animate: {
    opacity: [0.2, 1, 0.2, 1],
    pathLength: [0.3, 1],
    transition: {
      duration: 1.2,
      delay: 0.15,
      ease: "easeInOut",
    },
  },
};

const SparklesIcon = forwardRef<SparklesIconHandle, SparklesIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 18, parentHover = true, autoAnimate = true, ...props }, ref) => {
    const starControls = useAnimation();
    const sparkleControls = useAnimation();
    const isControlledRef = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const startAnimation = useCallback(() => {
      sparkleControls.start("animate");
      starControls.start("animate");
    }, [sparkleControls, starControls]);

    const stopAnimation = useCallback(() => {
      sparkleControls.start("normal");
      starControls.start("normal");
    }, [sparkleControls, starControls]);

    useEffect(() => {
      if (!autoAnimate) return;
      startAnimation();
    }, [autoAnimate, startAnimation]);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation,
        stopAnimation,
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        onMouseEnter?.(e);
        if (!isControlledRef.current) {
          startAnimation();
        }
      },
      [isControlledRef, onMouseEnter, startAnimation],
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        onMouseLeave?.(e);
        if (!isControlledRef.current) {
          const target =
            containerRef.current?.closest('button, a, [role="button"], .group') ||
            containerRef.current?.parentElement;
          if (target && e.relatedTarget && target.contains(e.relatedTarget as Node)) {
            return;
          }
          stopAnimation();
        }
      },
      [isControlledRef, onMouseLeave, stopAnimation],
    );

    useEffect(() => {
      if (!parentHover) return;

      const target =
        containerRef.current?.closest('button, a, [role="button"], .group') ||
        containerRef.current?.parentElement;

      if (!target || target === document.body || target === document.documentElement) {
        return;
      }

      const handleParentEnter = () => {
        startAnimation();
      };
      const handleParentLeave = () => {
        stopAnimation();
      };

      target.addEventListener("mouseenter", handleParentEnter);
      target.addEventListener("mouseleave", handleParentLeave);

      return () => {
        target.removeEventListener("mouseenter", handleParentEnter);
        target.removeEventListener("mouseleave", handleParentLeave);
      };
    }, [parentHover, startAnimation, stopAnimation]);

    return (
      <div
        ref={containerRef}
        className={cn("inline-flex items-center justify-center shrink-0", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
          className="pointer-events-none block shrink-0"
        >
          <motion.path
            fill="currentColor"
            animate={sparkleControls}
            initial="normal"
            d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
            variants={SPARKLE_VARIANTS}
          />
          <motion.path
            animate={starControls}
            initial="normal"
            d="M20 3v4"
            variants={STAR_VARIANTS}
          />
          <motion.path
            animate={starControls}
            initial="normal"
            d="M22 5h-4"
            variants={STAR_VARIANTS}
          />
          <motion.path
            animate={starControls}
            initial="normal"
            d="M4 17v2"
            variants={STAR_VARIANTS}
          />
          <motion.path
            animate={starControls}
            initial="normal"
            d="M5 18H3"
            variants={STAR_VARIANTS}
          />
        </svg>
      </div>
    );
  },
);

SparklesIcon.displayName = "SparklesIcon";

export { SparklesIcon };
