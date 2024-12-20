import { motion, Variants } from 'motion/react';
import { Children, PropsWithChildren } from "react";

interface TypewriterProps extends PropsWithChildren {
  color?: string;
  className?: string;
  delay?: number;
  delayHidden?: number;
  staggerChildren?: number;
  onAnimationComplete?: () => void;
  variant?: "visible" | "hidden" | "invisible";
  initial?: "visible" | "hidden" | "invisible";
  heightDuration?: number;
}

const sentenceVariants : Variants = {
  invisible: {
    opacity: 0,
    height: "auto"
  },
  hidden: {
    opacity: 0,
    height: 0,
  },
  visible: {
    opacity: 1,
    height: "auto"
  }
};

const letterVariants: Variants = {
  invisible: {
    opacity: 0
  },
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      opacity: {
        duration: 0
      }
    }
  }
};

export default function Typewriter({color, className, children, onAnimationComplete, heightDuration, initial = "hidden", variant = "visible", delay = 0, delayHidden = 0, staggerChildren = 0.04}: TypewriterProps) {
  const arrayOfLetters = Children.toArray(children).join("").split("");

  return (
    <motion.span
      className={className}
      variants={sentenceVariants}
      initial={initial}
      animate={variant}
      onAnimationComplete={onAnimationComplete}
      style={{
        display: "block",
        color
      }}
      transition={{
        delay : variant === "visible" ? delay : delayHidden,
        staggerChildren,
        when: "beforeChildren",
        ...heightDuration && { duration: heightDuration},
      }}

    >
      {arrayOfLetters.map((letter: string, index: number) => (
        <motion.span key={`${letter}-${index}`} variants={letterVariants} className="drop-shadow-md">
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );
}
