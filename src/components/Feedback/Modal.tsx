"use client"

import { motion, AnimatePresence } from 'framer-motion';
import { PropsWithChildren } from "react";
import useEventListener from "@/hooks/useEventListener";

interface InvitationFormProps extends PropsWithChildren {
  open?: boolean;
  onClose?: () => void;
}

const CloseButton = ({ onClose }: InvitationFormProps) => (
  <motion.button
    onClick={onClose}
    className="absolute top-0 right-0 w-10 h-10 flex items-center justify-center text-black z-50 p-6 box-content"
    whileHover={{scale: 1.1}}
    whileTap={{scale: 0.9}}
  >
    <motion.svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      style={{ strokeLinecap: "round", strokeLinejoin: "round" }}
    >
      <motion.path
        d="M 5 5 C 5.5 5.5, 7 7, 9 9 C 11 11, 13 13, 19 19"
        initial={{pathLength: 0, opacity: 0}}
        animate={{pathLength: 1, opacity: 1}}
        transition={{
          duration: 1,
          delay: 0.6,
          ease: "easeInOut"
        }}
      />
      <motion.path
        d="M 5 19 C 7 17, 9 15, 12 12 C 15 9, 17 7, 19 5"
        initial={{pathLength: 0, opacity: 0}}
        animate={{pathLength: 1, opacity: 1}}
        transition={{
          duration: 1,
          delay: 0.9,
          ease: "easeInOut"
        }}
      />
    </motion.svg>
  </motion.button>
)

export default function Modal({ children, open, onClose }: InvitationFormProps) {

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose?.();
    }
  };

  useEventListener("keydown", handleKeyDown);

  return (
    <AnimatePresence>
      {open && (
        <div className="absolute inset-0 z-[100] overflow-hidden"
             style={{
               perspective: "1000px",
               transformStyle: "preserve-3d"
             }}>
          <motion.div
            className="absolute bg-white"
            style={{
              top: '20px',
              left: '20px',
              right: '20px',
              bottom: '0',
              transformStyle: "preserve-3d",
              transformOrigin: "center bottom",
            }}
            initial={{
              y: "120%",
              rotateX: 65,
              z: -1000,
              scale: 0.6,
              opacity: 0
            }}
            animate={{
              y: 0,
              rotateX: 0,
              z: 0,
              scale: 1,
              opacity: 1
            }}
            exit={{
              y: "120%",
              rotateX: 65,
              z: -1000,
              scale: 0.6,
              opacity: 0
            }}
            transition={{
              type: "spring",
              damping: 17,
              stiffness: 110,
              mass: 0.7,
              duration: 0.65,
              exit: {
                type: "spring",
                damping: 20,
                stiffness: 80,
                mass: 1,
                duration: 0.85
              }
            }}
          >
            <CloseButton onClose={onClose}/>
            <motion.div
              className="w-full h-full relative p-6 overflow-auto"
              initial={{opacity: 0, scale: 0.95}}
              animate={{opacity: 1, scale: 1}}
              exit={{opacity: 0, scale: 0.95}}
              transition={{delay: 0.05, duration: 0.3}}
            >
              {children}
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
