import React, { useEffect, useState } from "react";

/**
 * AnalogClock
 * A minimal analog clock (no numerals, thin tick marks, three hands)
 * with a date label underneath. Updates every second using the
 * browser's local time — no external dependencies required.
 */

const CENTER = 180;
const RADIUS = 150;

type ClockColors = {
  face: string;
  ring: string;
  tick: string;
  hourHand: string;
  minuteHand: string;
  secondHand: string;
  centerDot: string;
  dateText: string;
};

const DEFAULT_COLORS: ClockColors = {
  face: "#FFFFFF",
  ring: "#E3E8F0",
  tick: "#94A3B8",
  hourHand: "#1E2A3A",
  minuteHand: "#1E2A3A",
  secondHand: "#64748B",
  centerDot: "#1E2A3A",
  dateText: "#d4d4d8",
};

export interface AnalogClockProps {
  /** Diameter of the clock face in pixels. Defaults to 320. */
  size?: number;
  /** Override any subset of the clock's colors. Unset keys fall back to the defaults. */
  colors?: Partial<ClockColors>;
  /** Show the date label under the clock. Defaults to true. */
  showDate?: boolean;
}

const AnalogClock: React.FC<AnalogClockProps> = ({
  size = 320,
  colors,
  showDate = true,
}) => {
  const COLORS: ClockColors = { ...DEFAULT_COLORS, ...colors };
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = now.getHours() % 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const hourAngle = hours * 30 + minutes * 0.5; // 360/12, plus drift within the hour
  const minuteAngle = minutes * 6 + seconds * 0.1; // 360/60, plus drift within the minute
  const secondAngle = seconds * 6; // 360/60

  const dateLabel = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const ticks = Array.from({ length: 12 }, (_, i) => i * 30);

  const svgStyle: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    filter: "drop-shadow(0 1px 2px rgba(15, 23, 42, 0.06))",
  };

  const dateStyle: React.CSSProperties = {
    fontSize: `${Math.round(size * 0.069)}px`, // scales with size; ~22px at 320px
    fontWeight: 600,
    color: COLORS.dateText,
    letterSpacing: "0.1px",
  };

  return (
    <div style={styles.wrapper}>
      <svg viewBox="0 0 360 360" style={svgStyle}>
        {/* Face */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill={COLORS.face}
          stroke={COLORS.ring}
          strokeWidth={2}
        />

        {/* Tick marks */}
        {ticks.map((angle) => (
          <line
            key={angle}
            x1={CENTER}
            y1={CENTER - RADIUS + 18}
            x2={CENTER}
            y2={CENTER - RADIUS + 30}
            stroke={COLORS.tick}
            strokeWidth={2.2}
            strokeLinecap="round"
            transform={`rotate(${angle} ${CENTER} ${CENTER})`}
          />
        ))}

        {/* Hour hand */}
        <line
          x1={CENTER}
          y1={CENTER}
          x2={CENTER}
          y2={CENTER - 68}
          stroke={COLORS.hourHand}
          strokeWidth={7}
          strokeLinecap="round"
          transform={`rotate(${hourAngle} ${CENTER} ${CENTER})`}
        />

        {/* Minute hand */}
        <line
          x1={CENTER}
          y1={CENTER}
          x2={CENTER}
          y2={CENTER - 112}
          stroke={COLORS.minuteHand}
          strokeWidth={3}
          strokeLinecap="round"
          transform={`rotate(${minuteAngle} ${CENTER} ${CENTER})`}
        />

        {/* Second hand */}
        <line
          x1={CENTER}
          y1={CENTER}
          x2={CENTER}
          y2={CENTER - 132}
          stroke={COLORS.secondHand}
          strokeWidth={1.5}
          strokeLinecap="round"
          transform={`rotate(${secondAngle} ${CENTER} ${CENTER})`}
        />

        {/* Center pivot */}
        <circle cx={CENTER} cy={CENTER} r={4.5} fill={COLORS.centerDot} />
      </svg>

      {showDate && <div style={dateStyle}>{dateLabel}</div>}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "18px",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
};

export  {AnalogClock};
