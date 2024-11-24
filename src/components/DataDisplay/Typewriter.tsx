import { motion, Variants } from 'motion/react';
import { Children, PropsWithChildren } from "react";

interface TypewriterProps extends PropsWithChildren {
  color?: string;
  className?: string;
  delay?: number;
  delayHidden?: number;
  staggerChildren?: number;
  onAnimationComplete?: () => void;
  variant?: "visible" | "hidden";
}

const sentenceVariants : Variants = {
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

export default function Typewriter({color, className, children, onAnimationComplete, variant = "visible", delay = 0, delayHidden = 0, staggerChildren = 0.04}: TypewriterProps) {
  const arrayOfLetters = Children.toArray(children).join("").split("");

  return (
    <motion.span
      className={className}
      variants={sentenceVariants}
      initial="hidden"
      animate={variant}
      onAnimationComplete={onAnimationComplete}
      style={{
        color
      }}
      transition={{
        delay : variant === "visible" ? delay : delayHidden,
        staggerChildren,
        when: "beforeChildren",
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
