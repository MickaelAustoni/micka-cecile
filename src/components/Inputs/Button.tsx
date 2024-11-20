import { motion, Transition, Variants } from "motion/react";
import { PropsWithChildren } from "react";

interface ButtonProps extends PropsWithChildren{
  onClick?: () => void;
  children?: string;
  variant?: "visible" | "hidden";
}

const boxShadow = "0px 0 20px 8px rgba(255, 255, 255, 0.1)";

const lineHorizontalTransition: Transition = {
  width: {
    duration: 1,
    ease: "easeInOut",
  },
  boxShadow: {
    duration: 1.5,
  },
};

const lineVerticalTransition: Transition = {
  height: {
    duration: 1,
    ease: "easeInOut",
  },
  boxShadow: {
    duration: 1.5,
  },
};

const letterVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition:{
      opacity:{
        duration: 1
      }
    }
  }
};

export default function Button({ children, variant = "visible", onClick } : ButtonProps) {
  const childrenArray = children?.split("");

  return (
    <motion.button
      key={variant}
      variants={{
        hidden: {
          opacity: 0,
        },
        visible: {
          opacity: 1,
        },
      }}
      animate={variant}
      onClick={onClick}
      className="relative tracking-[0.5em] px-7 py-4 pb-3 font-light uppercase font-[family-name:var(--font-josefin-sans)]">
      {/* Text */}
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{
          staggerChildren: 0.07,
          delayChildren: 0.4
        }}
      >
        {childrenArray?.map((letter, index)=> (
          <motion.span
            key={`${letter}-${index}`}
            className="inline-block"
            variants={letterVariants}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>

      {/* Left border */}
      <motion.span
        className="absolute top-0 left-0 w-px bg-white"
        initial={{
          height: "0%"
        }}
        animate={{
          height: "100%",
          boxShadow,
          transition: lineVerticalTransition,
        }}
      />

      {/* Top border */}
      <motion.span
        className="absolute top-0 left-0 right-0 h-px bg-white"
        initial={{
          width: "0%"
        }}
        animate={{
          width: "100%",
          boxShadow,
          transition: lineHorizontalTransition,
        }}
      />

      {/* Right border */}
      <motion.span
        className="absolute bottom-0 right-0 w-px bg-white"
        animate={{
          height: "100%",
          boxShadow,
          transition: lineVerticalTransition,
        }}
      />
      {/* Bottom border */}
      <motion.span
        className="absolute bottom-0 right-0 h-px bg-white"
        initial={{
          width: "0%"
        }}
        animate={{
          width: "100%",
          boxShadow,
          transition: lineHorizontalTransition,
        }}
      />
    </motion.button>
  );
}
