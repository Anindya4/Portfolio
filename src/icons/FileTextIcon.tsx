"use client";

import { motion, useAnimation } from "motion/react";
import type React from "react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";

import { cn } from "./lib/utils";

export interface FileTextIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface FileTextIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  parentHover?: boolean;
}

const FILE_TEXT = forwardRef<FileTextIconHandle, FileTextIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 16, parentHover = true, ...props }, ref) => {
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
        <motion.svg
          animate={controls}
          fill="none"
          height={size}
          initial="normal"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          variants={{
            normal: { scale: 1 },
            animate: {
              scale: 1.05,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
          }}
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />

          <motion.path
            d="M10 9H8"
            stroke="currentColor"
            strokeWidth="2"
            variants={{
              normal: {
                pathLength: 1,
                x1: 8,
                x2: 10,
              },
              animate: {
                pathLength: [1, 0, 1],
                x1: [8, 10, 8],
                x2: [10, 10, 10],
                transition: {
                  duration: 0.7,
                  delay: 0,
                },
              },
            }}
          />
          <motion.path
            d="M16 13H8"
            stroke="currentColor"
            strokeWidth="2"
            variants={{
              normal: {
                pathLength: 1,
                x1: 8,
                x2: 16,
              },
              animate: {
                pathLength: [1, 0, 1],
                x1: [8, 16, 8],
                x2: [16, 16, 16],
                transition: {
                  duration: 0.7,
                  delay: 0.1,
                },
              },
            }}
          />
          <motion.path
            d="M16 17H8"
            stroke="currentColor"
            strokeWidth="2"
            variants={{
              normal: {
                pathLength: 1,
                x1: 8,
                x2: 16,
              },
              animate: {
                pathLength: [1, 0, 1],
                x1: [8, 16, 8],
                x2: [16, 16, 16],
                transition: {
                  duration: 0.7,
                  delay: 0.2,
                },
              },
            }}
          />
        </motion.svg>
      </div>
    );
  },
);

FILE_TEXT.displayName = "FileTextIcon";

export { FILE_TEXT as FileTextIcon };
