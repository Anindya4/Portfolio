"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";

import { cn } from "./lib/utils";

export interface ClipboardCheckIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ClipboardCheckIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  parentHover?: boolean;
  autoAnimate?: boolean;
  delayBeforeReset?: number;
  onComplete?: () => void;
}

const CHECK_VARIANTS: Variants = {
  normal: {
    pathLength: 0,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.5, ease: "easeInOut" },
      opacity: { duration: 0.25, ease: "easeInOut" },
    },
  },
};

const ClipboardCheckIcon = forwardRef<
  ClipboardCheckIconHandle,
  ClipboardCheckIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 17, parentHover = true, autoAnimate = true, delayBeforeReset = 1500, onComplete, ...props }, ref) => {
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

  // Auto-animate on mount regardless of hover
  useEffect(() => {
    if (!autoAnimate) return;

    let isMounted = true;
    let timer: ReturnType<typeof setTimeout>;

    const runAutoAnimation = async () => {
      await controls.start("animate");
      if (!isMounted) return;

      timer = setTimeout(() => {
        if (isMounted) {
          onComplete?.();
        }
      }, delayBeforeReset);
    };

    runAutoAnimation();

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [autoAnimate, controls, delayBeforeReset, onComplete]);

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
      if (!isControlledRef.current && !autoAnimate) {
        const target =
          containerRef.current?.closest('button, a, [role="button"], .group') ||
          containerRef.current?.parentElement;
        if (target && e.relatedTarget && target.contains(e.relatedTarget as Node)) {
          return;
        }
        stopAnimation();
      }
    },
    [autoAnimate, isControlledRef, onMouseLeave, stopAnimation],
  );

  useEffect(() => {
    if (!parentHover || autoAnimate) return;

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
  }, [autoAnimate, parentHover, startAnimation, stopAnimation]);

  return (
    <div
      ref={containerRef}
      className={cn("inline-flex items-center justify-center", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <motion.svg
        initial={autoAnimate ? { scale: 0.6, opacity: 0 } : false}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 450, damping: 22 }}
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
        <rect height="4" rx="1" ry="1" width="8" x="8" y="2" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <motion.path
          animate={controls}
          d="m9 14 2 2 4-4"
          initial="normal"
          style={{ transformOrigin: "center" }}
          variants={CHECK_VARIANTS}
        />
      </motion.svg>
    </div>
  );
});

ClipboardCheckIcon.displayName = "ClipboardCheckIcon";

export { ClipboardCheckIcon };
