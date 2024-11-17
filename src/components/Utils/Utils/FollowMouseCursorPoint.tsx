"use client";

import { CSSProperties } from "react";
import { cubicBezier, motion, useScroll } from "framer-motion";
import useFollowPointer from "@/hooks/useFollowPointer";
import useIsTouchDevice from "@/hooks/useIsTouchDevice";

export interface FollowMouseCursorPointProps {
  size?: number;
  color?: string;
  opacity?: number;
}

const styles: CSSProperties = {
  borderRadius: "50%",
  left: -10,
  mixBlendMode: "difference",
  pointerEvents: "none",
  position: "fixed",
  top: -10,
  userSelect: "none",
  zIndex: 10000,
};

const FollowMouseCursorPoint = ({
  size = 25,
  color = "#fff",
  opacity = 0.8,
}: FollowMouseCursorPointProps) => {
  const { scrollY} = useScroll();
  const { x, y} = useFollowPointer();
  const isTouchDevice = useIsTouchDevice()

  if (isTouchDevice){
    return null
  }

  return <motion.div
    animate={{ x, y:  y- scrollY.get() }}
    transition={{
      duration: 0.1,
      ease: cubicBezier(0.18, 0.89, 0.32, 1.28)
    }}
    style={{
      ...styles,
      backgroundColor: color,
      height: `${size}px`,
      opacity,
      width: `${size}px`,
    }} />;
};

export default FollowMouseCursorPoint;
