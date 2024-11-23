"use client"

import { motion, AnimatePresence } from 'framer-motion';

interface InvitationFormProps {
  play?: boolean;
  delay?: number;
}

export default function InvitationForm({ delay, play = false }: InvitationFormProps) {
  return (
    <AnimatePresence>
      {play && (
        <div className="absolute inset-0 z-[60] overflow-hidden">
          <motion.div
            className="absolute inset-0 justify-center items-center flex bg-white"
            initial={{
              y: "100%",
              rotateX: 45,
              scale: 0.9,
              opacity: 0,
              transformPerspective: 2000,
              transformOrigin: "center bottom"
            }}
            animate={{
              y: 0,
              rotateX: 0,
              scale: 1,
              opacity: 1
            }}
            exit={{
              y: "100%",
              rotateX: 45,
              scale: 0.9,
              opacity: 0
            }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 80,
              duration: 1,
              delay
            }}
          >
            <div className="container">
              FORM HERE
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
