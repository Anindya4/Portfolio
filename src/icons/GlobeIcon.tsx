"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation, useReducedMotion } from "motion/react";
import type { HTMLAttributes } from "react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

import { cn } from "./lib/utils";

export interface GlobeIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface GlobeIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  duration?: number;
  isAnimated?: boolean;
  color?: string;
  parentHover?: boolean;
}

const GlobeIcon = forwardRef<GlobeIconHandle, GlobeIconProps>(
  (
    {
      onMouseEnter,
      onMouseLeave,
      className,
      size = 18,
      duration = 1,
      isAnimated = true,
      parentHover = true,
      color,
      ...props
    },
    ref,
  ) => {
    const controls = useAnimation();
    const pathControls = useAnimation();
    const reduced = useReducedMotion();
    const isControlledRef = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const startAnimation = useCallback(() => {
      if (reduced) {
        controls.start("normal");
        pathControls.start("normal");
      } else {
        controls.start("animate");
        pathControls.start("animate");
      }
    }, [controls, pathControls, reduced]);

    const stopAnimation = useCallback(() => {
      controls.start("normal");
      pathControls.start("normal");
    }, [controls, pathControls]);

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
        if (!isControlledRef.current && isAnimated && !reduced) {
          startAnimation();
        }
      },
      [isAnimated, isControlledRef, onMouseEnter, reduced, startAnimation],
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
      if (!parentHover || !isAnimated || reduced) return;

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
    }, [isAnimated, parentHover, reduced, startAnimation, stopAnimation]);

    const svgVariants: Variants = {
      normal: {
        scale: 1,
        rotate: 0,
      },
      animate: {
        scale: [1, 1.03, 1],
        rotate: 360,
        transition: {
          rotate: {
            duration: 1.4 * duration,
            ease: "linear",
          },
          scale: {
            duration: 0.25 * duration,
            ease: "easeOut",
          },
        },
      },
    };

    const outlineVariants: Variants = {
      normal: {
        pathLength: 1,
        opacity: 1,
      },
      animate: {
        pathLength: [0.9, 1],
        opacity: [0.8, 1],
        transition: {
          duration: 0.35 * duration,
          ease: "easeOut",
        },
      },
    };

    const orbitVariants: Variants = {
      normal: {
        pathLength: 1,
        opacity: 1,
      },
      animate: {
        pathLength: [0, 1],
        opacity: [0.5, 1],
        transition: {
          duration: 0.4 * duration,
          delay: 0.08 * duration,
          ease: "easeOut",
        },
      },
    };

    return (
      <div
        ref={containerRef}
        className={cn("inline-flex items-center justify-center", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ color, ...props.style }}
        {...props}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={controls}
          initial="normal"
          variants={svgVariants}
        >
          <motion.circle
            cx="12"
            cy="12"
            r="10"
            variants={outlineVariants}
            initial="normal"
            animate={pathControls}
          />
          <motion.path
            d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"
            variants={orbitVariants}
            initial="normal"
            animate={pathControls}
          />
          <motion.path
            d="M2 12h20"
            variants={orbitVariants}
            initial="normal"
            animate={pathControls}
          />
        </motion.svg>
      </div>
    );
  },
);

GlobeIcon.displayName = "GlobeIcon";
export { GlobeIcon };
