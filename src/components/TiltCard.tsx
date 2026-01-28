import type { PointerEvent, ReactNode } from "react";
import { useId, useMemo, useState } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  maxRotateDeg?: number;
  scale?: number;
};

type TiltState = {
  rotateX: number;
  rotateY: number;
  shineAngle: number;
  shineOpacity: number;
  offsetX: number;
  offsetY: number;
  isOver: boolean;
};

const INITIAL: TiltState = {
  rotateX: 0,
  rotateY: 0,
  shineAngle: 135,
  shineOpacity: 0,
  offsetX: 0,
  offsetY: 0,
  isOver: false,
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function TiltCard({
  children,
  className,
  maxRotateDeg = 12,
  scale = 1.06,
}: TiltCardProps) {
  const [state, setState] = useState<TiltState>(INITIAL);
  const gradientId = useId();

  const containerStyle = useMemo(() => {
    const s = state.isOver ? scale : 1;
    return {
      transform: `rotateX(${state.rotateX}deg) rotateY(${state.rotateY}deg) scale3d(${s},${s},${s})`,
    } as const;
  }, [state.isOver, state.rotateX, state.rotateY, scale]);

  const shineStyle = useMemo(() => {
    return {
      opacity: state.isOver ? state.shineOpacity : 0,
      background: `linear-gradient(${state.shineAngle}deg, rgba(255,255,255,${state.shineOpacity}) 0%, rgba(255,255,255,0) 70%)`,
      transform: `translate3d(${state.offsetX}px, ${state.offsetY}px, 0)`,
    } as const;
  }, [state.isOver, state.offsetX, state.offsetY, state.shineAngle, state.shineOpacity]);

  function onPointerEnter() {
    setState((prev) => ({ ...prev, isOver: true }));
  }

  function onPointerLeave() {
    setState(INITIAL);
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = clamp(x / rect.width, 0, 1);
    const py = clamp(y / rect.height, 0, 1);

    const dx = px - 0.5;
    const dy = py - 0.5;

    const rotateY = clamp(dx * maxRotateDeg, -maxRotateDeg, maxRotateDeg);
    const rotateX = clamp(-dy * maxRotateDeg, -maxRotateDeg, maxRotateDeg);

    const angle = (Math.atan2(dy, dx) * 180) / Math.PI - 90;
    const shineAngle = angle < 0 ? angle + 360 : angle;
    const shineOpacity = clamp(py * 0.35, 0.05, 0.35);

    setState({
      rotateX,
      rotateY,
      shineAngle,
      shineOpacity,
      offsetX: (0.5 - px) * 12,
      offsetY: (0.5 - py) * 12,
      isOver: true,
    });
  }

  return (
    <div className={className} style={{ perspective: "900px" }}>
      <div
        className="tiltCard"
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerMove={onPointerMove}
        style={containerStyle}
        aria-describedby={gradientId}
      >
        <div className="tiltCard-shadow" />
        <div className="tiltCard-layers">{children}</div>
        <div id={gradientId} className="tiltCard-shine" style={shineStyle} />
      </div>
    </div>
  );
}

