import { CSSProperties, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import useFollowPointer from "@/hooks/useFollowPointer";
import useIsTouchDevice from "@/hooks/useIsTouchDevice";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import heartAnimation from "@/animations/heart.json";
import useEventListener from "@/hooks/useEventListener";
import { useFollowCursor } from "@/Providers/FollowCursorProvider";

export interface FollowMouseCursorHeartProps {
  size?: number;
  color?: string;
  opacity?: number;
}

const styles: CSSProperties = {
  left: 0,
  top: 0,
  pointerEvents: "none",
  position: "fixed",
  userSelect: "none",
  zIndex: 10000
};

export default function FollowMouseCursorHeart({size = 150, opacity = 0.5}: FollowMouseCursorHeartProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchPosition, setTouchPosition] = useState<{ x: number; y: number }>({x: 0, y: 0});
  const {isHovered, disableAnimation} = useFollowCursor();
  const {scrollY} = useScroll();
  const {x, y} = useFollowPointer();
  const isTouchDevice = useIsTouchDevice();
  const heartAnimationRef = useRef<LottieRefCurrentProps>(null);
  const animationPosition = isTouchDevice ? touchPosition : {x, y: y - scrollY.get()};
  const wrapperOpacity = (x === 0 && y === 0 && touchPosition.x === 0 && touchPosition.y === 0) || (isTouchDevice && !isAnimating) ? 0 : opacity;

  const handleClick = ({x, y}: MouseEvent) => {
    setTouchPosition({x, y});
    heartAnimationRef?.current?.goToAndPlay(50, true);
    setIsAnimating(true);
  };

  useEventListener("click", handleClick);

  return (
    <motion.div
      animate={{
        x: animationPosition.x - size / 2,
        y: animationPosition.y - size / 2,
        scale: isHovered ? 2 : 1,
      }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 250,
        mass: 0.5,
        x: {
          duration: isTouchDevice ? 0 : 0.15,
          type: "spring",
          bounce: 0
        },
        y: {
          duration: isTouchDevice ? 0 : 0.15,
          type: "spring",
          bounce: 0
        },
        scale: {
          duration: 0.3,
          type: "spring",
          bounce: 0.25,
          damping: 8
        }
      }}
      style={{
        ...styles,
        height: `${size}px`,
        opacity: wrapperOpacity,
        width: `${size}px`,
      }}
    >
      {!disableAnimation && <Lottie
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
      />}
    </motion.div>
  );
}
