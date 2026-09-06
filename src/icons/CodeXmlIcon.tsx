"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";

import { cn } from "./lib/utils";

export interface CodeXmlIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CodeXmlIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  parentHover?: boolean;
}

const LEFT_BRACKET_VARIANTS: Variants = {
  normal: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  animate: {
    x: -3,
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 14,
    },
  },
};

const RIGHT_BRACKET_VARIANTS: Variants = {
  normal: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  animate: {
    x: 3,
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 14,
    },
  },
};

const SLASH_VARIANTS: Variants = {
  normal: {
    rotate: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  animate: {
    rotate: [0, -18, 18, 0],
    scale: [1, 1.15, 0.95, 1],
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

const CodeXmlIcon = forwardRef<CodeXmlIconHandle, CodeXmlIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 19, parentHover = true, ...props }, ref) => {
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
        className={cn("inline-flex items-center justify-center", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ overflow: "visible" }}
        {...props}
      >
        <svg
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          style={{ overflow: "visible" }}
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            animate={controls}
            d="m6 8-4 4 4 4"
            initial="normal"
            variants={LEFT_BRACKET_VARIANTS}
          />
          <motion.path
            animate={controls}
            d="m14.5 4-5 16"
            initial="normal"
            style={{ transformOrigin: "12px 12px" }}
            variants={SLASH_VARIANTS}
          />
          <motion.path
            animate={controls}
            d="m18 16 4-4-4-4"
            initial="normal"
            variants={RIGHT_BRACKET_VARIANTS}
          />
        </svg>
      </div>
    );
  },
);

CodeXmlIcon.displayName = "CodeXmlIcon";

export { CodeXmlIcon, CodeXmlIcon as CodeIcon };
