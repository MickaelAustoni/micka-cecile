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
    `0px 0 20px 8px rgba(${color}, 0.40)`,
    `0px 0 20px 8px rgba(${color}, 0.0)`
  ],
  transition: {
    boxShadow: {
      delay: 1.5, // Démarre après l'animation du tracé
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
});

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

const borderVariants: Variants = {
  hidden: {
    pathLength: 0,
  },
  visible: {
    pathLength: 1,
    transition: {
      duration: 1.5,
      ease: "easeInOut",
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
      className="relative tracking-[0.5em] px-7 py-4 pb-3 font-light uppercase font-[family-name:var(--font-josefin-sans)]"
    >
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

      {/* Animated Border */}
      <motion.div
        className="absolute inset-0"
        animate={pulseAnimation(boxShadowColor)}
      >
        <motion.svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          initial="hidden"
          animate="visible"
        >
          <motion.rect
            x={LINE_THICKNESS/2}
            y={LINE_THICKNESS/2}
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            stroke={color}
            strokeWidth={LINE_THICKNESS}
            fill="none"
            variants={borderVariants}
            style={{
              strokeLinecap: "round",
              strokeLinejoin: "round",
            }}
          />
        </motion.svg>
      </motion.div>
    </motion.button>
  );
}
