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
            className="absolute inset-0 justify-center items-center flex bg-brown"
            transition={{
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
