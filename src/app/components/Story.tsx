"use client"

import Typewriter from "@/components/DataDisplay/Typewriter";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from 'motion/react';
import { useIsomorphicLayoutEffect } from "framer-motion";

interface StoryProps {
  play?: boolean;
  onFinish?: () => void;
}

export default function Story({ onFinish, play = false }: StoryProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paragraph1IsFinished, setParagraph1IsFinished] = useState(false);
  const [paragraph2IsFinished, setParagraph2IsFinished] = useState(false);
  const [paragraph3IsFinished, setParagraph3IsFinished] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const handleFinish = () => {
    setIsFinished(true);
    onFinish?.();
  }

  useIsomorphicLayoutEffect(() => {
    if (play) {
      void videoRef.current?.play();
    }
  }, [play]);

  return (
    <AnimatePresence>
      {!isFinished && <>
        <section className="inset-0 overflow-hidden fixed flex items-center justify-center flex-col p-6 z-30">
          {/* Text */}
          <div className="flex flex-col text-center max-w-96 font-[family-name:var(--font-geist-mono)] z-20">
            <Typewriter
              variant={play && !paragraph1IsFinished ? "visible" : "hidden"}
              delay={2}
              delayHidden={2}
              onAnimationComplete={() => setParagraph1IsFinished(true)}
            >
              Il y a 7 ans, nos chemins se sont croisés par hasard ...
            </Typewriter>
            <Typewriter
              variant={paragraph1IsFinished && !paragraph2IsFinished ? "visible" : "hidden"}
              delay={2}
              delayHidden={2}
              onAnimationComplete={() => setParagraph2IsFinished(true)}
            >
              3 ans plus tard, une petite graine est venue fleurir notre jardin d’amour...
            </Typewriter>
            <Typewriter
              variant={paragraph2IsFinished && !paragraph3IsFinished ? "visible" : "hidden"}
              delay={2}
              delayHidden={2}
              onAnimationComplete={() => setParagraph3IsFinished(true)}
            >
              Aujourd’hui, il est temps de sceller notre promesse d’éternité.
            </Typewriter>
          </div>
        </section>
        {/* Background video */}
        <motion.video
          muted
          loop
          playsInline
          ref={videoRef}
          className="fixed h-screen w-screen inset-0 object-cover z-10"
          controls={false}
          preload="auto"
          initial="visible"
          variants={{
            visible: {
              opacity: 1,
            },
            hidden: {
              opacity: 0,
              transition: {
                delay: 2,
                duration: 1,
              },
            },
          }}
          animate={paragraph3IsFinished ? "hidden" : "visible"}
          onAnimationComplete={handleFinish}
        >
          <source src="/assets/movies/tree-4k.mp4" media="(min-width: 1921px)"/>
          <source src="/assets/movies/tree-mobile.mp4" media="(max-width: 767px)"/>
          <source src="/assets/movies/tree.mp4"/>
        </motion.video>
      </>}
    </AnimatePresence>
  );
}
