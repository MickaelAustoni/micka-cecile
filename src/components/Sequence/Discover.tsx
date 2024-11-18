"use client"

import { useSearchParams } from 'next/navigation'
import Typewriter from "@/components/DataDisplay/Typewriter";
import { motion, Variants, AnimatePresence } from 'motion/react';
import { useRef, useState } from "react";

interface DiscoverProps {
  onClickDiscover?: () => void;
}

const pageVariants: Variants = {
  base: {
    backgroundColor: "var(--green)",
  },
  next: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    transition: {
      duration: 5,
      ease: 'easeInOut',
    },
  },
};

const wrapperTextVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1
  }
};

const buttonVariants: Variants = {
  hidden: {
    opacity: 0,
    transform: "translateY(20px)",
    borderColor: "var(--green)",
  },
  visible: {
    opacity: 1,
    transform: "translateY(0)",
    borderColor: "var(--white)",
    transition: {
      borderColor: {
        duration: 3,
      },
      opacity: {
        duration: 1,
      }
    }
  }
};

export default function Discover({ onClickDiscover }: DiscoverProps) {
  const [animationTitleIsFinished, setAnimationTitleIsFinished] = useState(false);
  const [animationSubtitleIsFinished, setAnimationSubtitleIsFinished] = useState(false);
  const [animationButtonIsFinished, setAnimationButtonIsFinished] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [finished, setFinished] = useState(false);
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleClick = () => {
    void audioRef?.current?.play();
    setClicked(true);
    onClickDiscover?.();
  };

  const handleAnimationButtonIsFinished = (definition: string) => {
    if(definition === "hidden") {
      setAnimationButtonIsFinished(true);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!finished && <motion.div
          className="inset-0 absolute z-50 flex items-center justify-center flex-col space-y-7 font-[family-name:var(--font-geist-mono)]"
          initial="base"
          animate={clicked && "next"}
          variants={pageVariants}
          onAnimationComplete={() => setFinished(true)}
        >
          <motion.div className="flex flex-col text-center" variants={wrapperTextVariants} initial={"visible"} animate={clicked ? "hidden" : "visible"}>
            <Typewriter onAnimationComplete={() => setAnimationTitleIsFinished(true)}>Bonjour{name ? ` ${name}` : ""},</Typewriter>
            <Typewriter variant={animationTitleIsFinished ? "visible" : "hidden"} onAnimationComplete={() => setAnimationSubtitleIsFinished(true)}>On dirait qu’un secret tout doux se cache ici ...</Typewriter>
          </motion.div>
          {!animationButtonIsFinished && <AnimatePresence>
            <motion.button
              className="tracking-[0.4em] border px-6 py-3 pb-2 font-light uppercase font-[family-name:var(--font-josefin-sans)]"
              onClick={handleClick}
              initial={"hidden"}
              variants={buttonVariants}
              animate={animationSubtitleIsFinished && !clicked ? "visible" : "hidden"}
              onAnimationComplete={handleAnimationButtonIsFinished}
            >
              <span>Découvrir</span>
            </motion.button>
          </AnimatePresence>}
        </motion.div>}
      </AnimatePresence>
      <audio ref={audioRef} src="/assets/audio/music.mp3" controls={false} preload={"auto"}/>
    </>
  );
}
