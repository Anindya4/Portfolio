"use client";

import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";

import { cn } from "./lib/utils";

export interface FolderGit2IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface FolderGit2IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  parentHover?: boolean;
}

const DURATION = 0.3;

const CALCULATE_DELAY = (i: number) => {
  if (i === 0) return 0.1;

  return i * DURATION + 0.1;
};

const FolderGit2Icon = forwardRef<FolderGit2IconHandle, FolderGit2IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, parentHover = true, ...props }, ref) => {
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
          <path d="M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5" />
          <motion.circle
            animate={controls}
            cx="13"
            cy="12"
            r="2"
            transition={{
              duration: DURATION,
              delay: CALCULATE_DELAY(0),
              opacity: { delay: CALCULATE_DELAY(0) },
            }}
            variants={{
              normal: { pathLength: 1, opacity: 1, transition: { delay: 0 } },
              animate: {
                pathLength: [0, 1],
                opacity: [0, 1],
              },
            }}
          />
          <motion.path
            animate={controls}
            d="M18 19c-2.8 0-5-2.2-5-5v8"
            transition={{
              duration: DURATION,
              delay: CALCULATE_DELAY(1),
              opacity: { delay: CALCULATE_DELAY(1) },
            }}
            variants={{
              normal: {
                pathLength: 1,
                pathOffset: 0,
                opacity: 1,
                transition: { delay: 0 },
              },
              animate: {
                pathLength: [0, 1],
                opacity: [0, 1],
                pathOffset: [1, 0],
              },
            }}
          />
          <motion.circle
            animate={controls}
            cx="20"
            cy="19"
            r="2"
            transition={{
              duration: DURATION,
              delay: CALCULATE_DELAY(2),
              opacity: { delay: CALCULATE_DELAY(2) },
            }}
            variants={{
              normal: { pathLength: 1, opacity: 1, transition: { delay: 0 } },
              animate: {
                pathLength: [0, 1],
                opacity: [0, 1],
              },
            }}
          />
        </svg>
      </div>
    );
  },
);

FolderGit2Icon.displayName = "FolderGit2Icon";

export { FolderGit2Icon };
