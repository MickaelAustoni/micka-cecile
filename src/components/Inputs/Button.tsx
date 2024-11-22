import { motion, Transition, Variants } from "motion/react";
import { PropsWithChildren } from "react";

interface ButtonProps extends PropsWithChildren{
  onClick?: () => void;
  children?: string;
  variant?: "visible" | "hidden";
}

const HALF_LINE_THICKNESS = 0.5;
const LINE_THICKNESS = 0.5;

const pulseAnimation = {
  boxShadow: [
    "0px 0 20px 8px rgba(255, 255, 255, 0.1)",
    "0px 0 20px 8px rgba(255, 255, 255, 0.4)",
    "0px 0 20px 8px rgba(255, 255, 255, 0.1)"
  ],
  transition: {
    boxShadow: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const lineHorizontalTransition: Transition = {
  width: {
    duration: 1,
    ease: "easeInOut",
  },
};

const lineVerticalTransition: Transition = {
  height: {
    duration: 1,
    ease: "easeInOut",
  },
};

const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
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
        hover: {
          scale: 1.05,
          transition: {
            ease: "easeInOut",
            duration: 0.3,
          }
        }
      }}
      animate={variant}
      onClick={onClick}
      whileHover="hover"
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
        className="absolute top-0 left-0 bg-white"
        initial={{
          width: HALF_LINE_THICKNESS,
        }}
        animate={pulseAnimation}
        variants={{
          hover: {
            width: LINE_THICKNESS,
          },
          visible:{
            height: "100%",
            transition: lineVerticalTransition,
          }
        }}
      />

      {/* Top border */}
      <motion.span
        className="absolute top-0 left-0 right-0 bg-white"
        initial={{
          width: "0%",
          height: HALF_LINE_THICKNESS,
        }}
        animate={pulseAnimation}
        variants={{
          hover: {
            height: LINE_THICKNESS,
          },
          visible : {
            width: "100%",
            transition: lineHorizontalTransition,
          }
        }}
      />

      {/* Right border */}
      <motion.span
        className="absolute bottom-0 right-0 bg-white"
        initial={{
          width: HALF_LINE_THICKNESS,
        }}
        animate={pulseAnimation}
        variants={{
          hover: {
            width: LINE_THICKNESS,
          },
          visible:{
            height: "100%",
            transition: lineVerticalTransition,
          }
        }}
      />

      {/* Bottom border */}
      <motion.span
        className="absolute bottom-0 right-0 bg-white"
        initial={{
          width: "0%",
          height: HALF_LINE_THICKNESS,
        }}
        animate={pulseAnimation}
        variants={{
          hover: {
            height: LINE_THICKNESS,
          },
          visible : {
            width: "100%",
            transition: lineHorizontalTransition,
          }
        }}
      />
    </motion.button>
  );
}
