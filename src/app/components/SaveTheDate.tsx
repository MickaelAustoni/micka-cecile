"use client"

import { motion, AnimatePresence } from 'framer-motion';

interface InvitationFormProps {
  play?: boolean;
  delay?: number;
}

export default function SaveTheDate({ delay, play = false }: InvitationFormProps) {
  return (
    <AnimatePresence>
      {play && (
        <section className="absolute inset-0 z-[60] overflow-hidden">
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
        </section>
      )}
    </AnimatePresence>
  );
}
