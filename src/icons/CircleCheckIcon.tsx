"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";

import { cn } from "./lib/utils";

export interface CircleCheckIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CircleCheckIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  parentHover?: boolean;
}

const PATH_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 0.3,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
};

const CircleCheckIcon = forwardRef<CircleCheckIconHandle, CircleCheckIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 24, parentHover = true, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const startAnimation = useCallback(() => {
      controls.start("animate");
    }, [controls]);

    const stopAnimation = useCallback(() => {
      controls.start("normal");
    }, [controls]);

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
        className={cn(className)}
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
        >
          <circle cx="12" cy="12" r="10" />
          <motion.path
            animate={controls}
            d="m9 12 2 2 4-4"
            initial="normal"
            variants={PATH_VARIANTS}
          />
        </svg>
      </div>
    );
  },
);

CircleCheckIcon.displayName = "CircleCheckIcon";

export { CircleCheckIcon };
