"use client";

import { CSSProperties, useRef, useState } from "react";
import { cubicBezier, motion, useScroll } from "framer-motion";
import useFollowPointer from "@/hooks/useFollowPointer";
import useIsTouchDevice from "@/hooks/useIsTouchDevice";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import heartAnimation from "@/assets/animations/heart.json";
import useEventListener from "@/hooks/useEventListener";

export interface FollowMouseCursorPointProps {
  size?: number;
  color?: string;
  opacity?: number;
}

const styles: CSSProperties = {
  borderRadius: "50%",
  mixBlendMode: "difference",
  pointerEvents: "none",
  position: "fixed",
  userSelect: "none",
  zIndex: 10000,
};

const FollowMouseCursorPoint = ({ size = 150, opacity = 1 }: FollowMouseCursorPointProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchPosition, setTouchPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const {scrollY} = useScroll();
  const {x, y} = useFollowPointer();
  const isTouchDevice = useIsTouchDevice();
  const heartAnimationRef = useRef<LottieRefCurrentProps>(null);
  const animationPosition = isTouchDevice ? touchPosition : {x, y: y - scrollY.get()};

  const handleTouchStart = (event: TouchEvent) => {
    const touch = event.touches[0];
    setTouchPosition({x: touch.clientX, y: touch.clientY});
    heartAnimationRef?.current?.goToAndPlay(50, true);
    setIsAnimating(true);
  };

  const handleClick = () => {
    setIsAnimating(true);
    heartAnimationRef?.current?.goToAndPlay(50, true);
  };

  useEventListener("touchstart", handleTouchStart);
  useEventListener("click", handleClick);

  return (
    <motion.div
      animate={{
        x: animationPosition.x - size / 2,
        y: animationPosition.y - size / 2,
      }}
      transition={{
        duration: 0.1,
        ease: cubicBezier(0.18, 0.89, 0.32, 1.28),
      }}
      style={{
        ...styles,
        height: `${size}px`,
        opacity: isTouchDevice &&!isAnimating ? 0 : opacity,
        width: `${size}px`,
        pointerEvents: "none",
        left: 0,
        top: 0,
      }}
    >
      <Lottie
        lottieRef={heartAnimationRef}
        key="heartAnimation"
        animationData={heartAnimation}
        loop={false}
        autoplay={false}
        style={{pointerEvents: "none"}}
        onComplete={() => {
          heartAnimationRef?.current?.goToAndStop(0, true);
          setIsAnimating(false);
        }}
      />
    </motion.div>
  );
};

export default FollowMouseCursorPoint;
