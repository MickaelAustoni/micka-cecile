"use client";

import { CSSProperties, useEffect, useRef } from "react";
import { cubicBezier, motion, useScroll } from "framer-motion";
import useFollowPointer from "@/hooks/useFollowPointer";
import useIsTouchDevice from "@/hooks/useIsTouchDevice";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import heartAnimation from "@/assets/animations/heart.json";

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

const FollowMouseCursorPoint = ({
  size = 150,
  opacity = 0.8,
}: FollowMouseCursorPointProps) => {
  const { scrollY} = useScroll();
  const { x, y} = useFollowPointer();
  const isTouchDevice = useIsTouchDevice();
  const heartAnimationRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    const handleClick = () => {
      heartAnimationRef?.current?.goToAndPlay(50, true);
    };

    // listen for clicks on the heart animation
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  if (isTouchDevice) {
    return null
  }

  return (
    <motion.div
      animate={{x, y: y - scrollY.get()}}
      transition={{
        duration: 0.1,
        ease: cubicBezier(0.18, 0.89, 0.32, 1.28)
      }}
      style={{
        ...styles,
        height: `${size}px`,
        opacity,
        width: `${size}px`,
        pointerEvents: "none",
        left:  -(size / 2),
        top: -(size / 2),
      }}>
      <Lottie
        lottieRef={heartAnimationRef}
        key="heartAnimation"
        animationData={heartAnimation}
        loop={false}
        autoplay={false}
        style={{ pointerEvents: "none" }}
        onComplete={() => {
          heartAnimationRef?.current?.goToAndStop(0, true);
        }}
      />
    </motion.div>
  );
};

export default FollowMouseCursorPoint;
