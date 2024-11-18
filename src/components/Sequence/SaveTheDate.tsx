"use client"

import { AnimatePresence } from 'motion/react';
import Logo from "@/components/DataDisplay/Logo";

interface SaveTheDateProps {
  play?: boolean;
}

export default function SaveTheDate({ play = false }: SaveTheDateProps) {
  return (
    <AnimatePresence>
      {play && <div className="inset-0 overflow-hidden absolute justify-center items-center flex bg-green">
        <Logo />
      </div>}
    </AnimatePresence>
  );
}
