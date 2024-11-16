import { motion, Variants } from "framer-motion";
import { Children, PropsWithChildren } from "react";

interface TypewriterProps extends PropsWithChildren {
  delay?: number;
  staggerChildren?: number;
}

const sentenceVariants : Variants= {
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


export default function Typewriter({children, delay = 0, staggerChildren = 0.05}: TypewriterProps) {
  const arrayOfLetters = Children.toArray(children).join("").split("");

  return (
    <motion.p
      variants={sentenceVariants}
      initial="hidden"
      animate="visible"
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
    </motion.p>
  );
}
