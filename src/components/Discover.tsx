"use client"

import { useSearchParams } from 'next/navigation'
import Typewriter from "@/components/Typewriter";
import { motion, Variants } from 'motion/react';
import { cubicBezier } from "motion";
import { useRef, useState } from "react";

const buttonVariants: Variants = {
  hidden: {
    opacity: 0,
    transform: "translateY(20px)"
  },
  visible: {
    opacity: 1,
    transform: "translateY(0)",
    transition: {
      opacity: {
        duration: 1,
      },
      transform: {
        ease: cubicBezier(.18,1.07,.47,1.06),
        duration: 1.5,
      }
    }
  }
};



export default function Discover() {
  const [animationTitleIsFinished, setAnimationTitleIsFinished] = useState(false);
  const [animationSubtitleIsFinished, setAnimationSubtitleIsFinished] = useState(false);
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleClick = () => {
    void audioRef?.current?.play();
  };

  return (
    <>
      <div
        className="h-screen flex items-center justify-center flex-col space-y-7 font-[family-name:var(--font-geist-mono)]">
        <div className="flex flex-col text-center">
          <Typewriter onAnimationComplete={() => setAnimationTitleIsFinished(true)}>Bonjour {name},</Typewriter>
          <Typewriter start={animationTitleIsFinished} onAnimationComplete={() => setAnimationSubtitleIsFinished(true)}>On
            dirait qu’un secret tout doux se cache ici...</Typewriter>
        </div>
        <motion.button
          className="tracking-[0.4em] border px-6 py-3 pb-2 font-light uppercase font-[family-name:var(--font-josefin-sans)]"
          onClick={handleClick}
          initial={"hidden"}
          variants={buttonVariants}
          animate={animationSubtitleIsFinished ? "visible" : "hidden"}>
          <span>Découvrir</span>
        </motion.button>
      </div>
      <audio ref={audioRef} src="/assets/music.mp3" controls={false} preload={"auto"} />
    </>
  );
}
