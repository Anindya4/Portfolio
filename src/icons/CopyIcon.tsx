"use client";

import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";

import { cn } from "./lib/utils";

export interface CopyIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CopyIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  parentHover?: boolean;
}

const DEFAULT_TRANSITION: Transition = {
  type: "spring",
  stiffness: 160,
  damping: 17,
  mass: 1,
};

const CopyIcon = forwardRef<CopyIconHandle, CopyIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 17, parentHover = true, ...props }, ref) => {
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
          <motion.rect
            animate={controls}
            height="14"
            rx="2"
            ry="2"
            transition={DEFAULT_TRANSITION}
            variants={{
              normal: { translateY: 0, translateX: 0 },
              animate: { translateY: -3, translateX: -3 },
            }}
            width="14"
            x="8"
            y="8"
          />
          <motion.path
            animate={controls}
            d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
            transition={DEFAULT_TRANSITION}
            variants={{
              normal: { x: 0, y: 0 },
              animate: { x: 3, y: 3 },
            }}
          />
        </svg>
      </div>
    );
  },
);

CopyIcon.displayName = "CopyIcon";

export { CopyIcon };
