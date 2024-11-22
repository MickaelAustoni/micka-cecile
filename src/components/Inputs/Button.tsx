import { motion, Transition, Variants } from "motion/react";
import { PropsWithChildren } from "react";

interface ButtonProps extends PropsWithChildren{
  onClick?: () => void;
  children?: string;
  variant?: "visible" | "hidden";
  color?: string;
  boxShadowColor?: string
}

const LINE_THICKNESS = 2;

const pulseAnimation = (color = "255, 255, 255") => ({
  boxShadow: [
    `0px 0 20px 8px rgba(${color}, 0.0)`,
    `0px 0 20px 8px rgba(${color}, 0.25)`,
    `0px 0 20px 8px rgba(${color}, 0.0)`
  ],
  transition: {
    boxShadow: {
      delay: 1,
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
});

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

export default function Button({ children, onClick, boxShadowColor, color = "white", variant = "visible" } : ButtonProps) {
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
            style={{ color }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>

      {/* Left border */}
      <motion.span
        className="absolute top-0 left-0 bg-white"
        initial={{
          backgroundColor: color,
          width: 0,
        }}
        animate={pulseAnimation(boxShadowColor)}
        variants={{
          visible:{
            height: "100%",
            width: LINE_THICKNESS,
            transition: lineVerticalTransition,
          }
        }}
      />

      {/* Top border */}
      <motion.span
        className="absolute top-0 left-0 right-0 bg-white"
        initial={{
          backgroundColor: color,
          width: "0%",
          height: 0,
        }}
        animate={pulseAnimation(boxShadowColor)}
        variants={{
          visible : {
            width: "100%",
            height: LINE_THICKNESS,
            transition: lineHorizontalTransition,
          }
        }}
      />

      {/* Right border */}
      <motion.span
        className="absolute bottom-0 right-0 bg-white"
        initial={{
          backgroundColor: color,
          width: 0,
        }}
        animate={pulseAnimation(boxShadowColor)}
        variants={{
          visible:{
            height: "100%",
            width: LINE_THICKNESS,
            transition: lineVerticalTransition,
          }
        }}
      />

      {/* Bottom border */}
      <motion.span
        className="absolute bottom-0 right-0 bg-white"
        initial={{
          backgroundColor: color,
          width: "0%",
          height: 0,
        }}
        animate={pulseAnimation(boxShadowColor)}
        variants={{
          visible : {
            width: "100%",
            height: LINE_THICKNESS,
            transition: lineHorizontalTransition,
          }
        }}
      />
    </motion.button>
  );
}
