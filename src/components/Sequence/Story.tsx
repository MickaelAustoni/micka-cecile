"use client"

import Typewriter from "@/components/DataDisplay/Typewriter";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from 'motion/react';

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

  useEffect(() => {
    if (play) {
      void videoRef.current?.play();
    }
  }, [play]);

  return (
    <AnimatePresence>
      {!isFinished && <>
        <div className="inset-0 overflow-hidden absolute flex items-center justify-center flex-col bg-green p-6">
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
        </div>
        {/* Background video */}
        <motion.video
          muted
          loop
          playsInline
          ref={videoRef}
          className="fixed h-screen w-screen inset-0 object-cover z-10"
          controls={false}
          preload="auto"
          src="/assets/movies/tree.mp4"
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
        />
      </>}
    </AnimatePresence>
  );
}
