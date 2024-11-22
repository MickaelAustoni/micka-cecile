"use client"

import { motion, AnimatePresence } from 'framer-motion';

interface InvitationFormProps {
  play?: boolean;
}

export default function InvitationForm({ play = false }: InvitationFormProps) {
  return (
    <AnimatePresence>
      {play && (
        <motion.div
          className="inset-0 overflow-hidden absolute justify-center items-center flex bg-white"
          initial={{
            y: "100%",
            rotateX: 30,
            opacity: 0
          }}
          animate={{
            y: 0,
            rotateX: 0,
            opacity: 1
          }}
          exit={{
            y: "100%",
            rotateX: 30,
            opacity: 0
          }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 100,
            duration: 0.8
          }}
          style={{
            perspective: "1000px"
          }}
        >
          aaa
        </motion.div>
      )}
    </AnimatePresence>
  );
}
