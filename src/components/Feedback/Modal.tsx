"use client"

import { motion, AnimatePresence } from 'framer-motion';
import { PropsWithChildren } from "react";

interface InvitationFormProps extends PropsWithChildren {
  open?: boolean;
  onClose?: () => void;
}

export default function Modal({ children, open, onClose }: InvitationFormProps) {
  return (
    <AnimatePresence>
      {open && (
        <div className="absolute inset-0 z-[60] overflow-hidden"
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
            {/* Close button */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-black z-50"
              whileHover={{scale: 1.1}}
              whileTap={{scale: 0.9}}
            >
              <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <motion.path
                  d="M 5 5 C 5.5 5.5, 6 6, 8 8 C 11 11, 13 14, 18.5 19 C 19 19.5, 19.5 19, 19 18.5"
                  initial={{pathLength: 0, opacity: 0}}
                  animate={{pathLength: 1, opacity: 1}}
                  transition={{
                    duration: 0.6,
                    delay: 0.6,
                    ease: [0.16, 0.8, 0.3, 1]
                  }}
                />
                <motion.path
                  d="M 5 19 C 6 18, 8 16, 10 14 C 13 11, 15 8, 19 4.5 C 19.5 4, 19 4.5, 18.5 5"
                  initial={{pathLength: 0, opacity: 0}}
                  animate={{pathLength: 1, opacity: 1}}
                  transition={{
                    duration: 0.6,
                    delay: 0.9,
                    ease: [0.16, 0.8, 0.3, 1]
                  }}
                />
              </motion.svg>
            </motion.button>
            <motion.div
              className="w-full h-full relative"
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
