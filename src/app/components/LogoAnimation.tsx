"use client"

import { AnimatePresence, motion } from 'framer-motion';
import Logo from "@/components/DataDisplay/Logo";
import Image from "next/image";

interface SaveTheDateProps {
  play?: boolean;
  onFinish?: () => void;
  onFinishDelay?: number;
}

export default function LogoAnimation({ onFinish, onFinishDelay = 2, play = false }: SaveTheDateProps) {
  return (
    <>
      {/* Preload image of the next section */}
      {play && (
        <div className="hidden">
          {[0, 1, 2].map((index) => (
            <Image
              key={index}
              src={`/assets/images/wedding-${index}.avif`}
              sizes="(max-width: 767px) 100vw, 50vw"
              alt=""
              width={300}
              height={450}
              priority
            />
          ))}
        </div>
      )}
      <AnimatePresence mode="wait">
        {play && (
          <motion.section
            className="inset-0 overflow-hidden absolute justify-center items-center flex bg-green"
            initial={{opacity: 1}}
            exit={{
              opacity: 0,
              transition: {
                delay: onFinishDelay,
                duration: 2
              }
            }}
          >
            <Logo onAnimationComplete={onFinish} color="var(--brown)" className="w-5/12" />
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
