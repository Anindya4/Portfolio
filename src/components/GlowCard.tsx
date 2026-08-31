import React, { useRef, useState } from 'react';

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const GlowCard: React.FC<GlowCardProps> = ({ children, className = '', ...props }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`bento-card group relative ${className}`}
      {...props}
    >
      {/* Interactive mouse-following white spotlight aura */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.08), transparent 70%)`,
        }}
      />

      {/* Subtle border highlight matching cursor position */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300 z-0 border border-white/30"
        style={{
          opacity: isHovered ? 1 : 0,
          maskImage: `radial-gradient(220px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent 80%)`,
          WebkitMaskImage: `radial-gradient(220px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent 80%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};
