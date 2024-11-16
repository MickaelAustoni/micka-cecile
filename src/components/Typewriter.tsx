import { motion, Variants } from 'motion/react';
import { Children, PropsWithChildren } from "react";

interface TypewriterProps extends PropsWithChildren {
  delay?: number;
  staggerChildren?: number;
  onAnimationComplete?: () => void;
  start?: boolean;
}

const sentenceVariants : Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
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


export default function Typewriter({children, onAnimationComplete, start, delay = 0, staggerChildren = 0.05}: TypewriterProps) {
  const arrayOfLetters = Children.toArray(children).join("").split("");

  return (
    <motion.span
      key={String(start)}
      variants={sentenceVariants}
      initial="hidden"
      animate={start === undefined ? "visible" : start ? "visible" : "hidden"}
      onAnimationComplete={onAnimationComplete}
      transition={{
        delay,
        staggerChildren,
        when: "beforeChildren",
      }}
    >
      {arrayOfLetters.map((char: string, i: number) => (
        <motion.span key={`${char}-${i}`} variants={letterVariants}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}
