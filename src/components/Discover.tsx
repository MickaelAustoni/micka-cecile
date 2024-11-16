"use client"

import { useSearchParams } from 'next/navigation'
import Typewriter from "@/components/Typewriter";
import { motion } from 'motion/react';
import { cubicBezier } from "motion";

export default function Discover() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  const handleClick = () => {
    const audio = new Audio("/assets/music.mp3");
    void audio.play();
  };

  return (
    <div
      className="h-screen flex items-center justify-center flex-col space-y-7 font-[family-name:var(--font-geist-mono)]">
      <div className="text-center ">
        <Typewriter>Bonjour {name},</Typewriter>
        <Typewriter delay={1.6}>On dirait qu’un secret tout doux se cache ici...</Typewriter>
      </div>
      <motion.button
        className="border px-6 py-3" onClick={handleClick}
        initial={{
          opacity: 0,
          transform: "translateY(20px)"
        }}
        animate={{
          opacity: 1,
          transform: "translateY(0)",
          transition: {
            opacity: {
              delay: 5.2,
              duration: 1,
            },
            transform: {
              delay: 5.2,
              ease: cubicBezier(.18,1.07,.47,1.06),
              duration: 1.5,
            }
          }
        }}>Découvrir
      </motion.button>
    </div>
  );
}
