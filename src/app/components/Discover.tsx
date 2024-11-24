"use client"

import { useSearchParams } from 'next/navigation'
import Typewriter from "@/components/DataDisplay/Typewriter";
import { motion, Variants, AnimatePresence } from 'motion/react';
import { Suspense, useRef, useState } from "react";
import ScaleCursor from "@/components/Utils/Utils/ScaleCursor";
import Button from "@/components/Inputs/Button";

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

const buttonWrapperVariants: Variants = {
  hidden: {
    opacity: 0,
    transform: "translateY(20px)",
  },
  visible: {
    opacity: 1,
    transform: "translateY(0)",
    transition: {
      transform: {
        duration: 1,
      }
    }
  }
};

const Content = ({ onClickDiscover }: DiscoverProps) => {
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
        {!finished && <motion.section
          className="p-6 inset-0 fixed z-50 flex items-center justify-center flex-col space-y-7 font-[family-name:var(--font-geist-mono)] overflow-hidden"
          initial="base"
          animate={clicked && "next"}
          variants={pageVariants}
          onAnimationComplete={() => setFinished(true)}
        >
          <motion.div className="flex flex-col text-center" variants={wrapperTextVariants} initial={"visible"} animate={clicked ? "hidden" : "visible"}>
            <Typewriter className="text-green-secondary" onAnimationComplete={() => setAnimationTitleIsFinished(true)}>Bonjour{name ? ` ${name}` : ""},</Typewriter>
            <Typewriter className="text-green-secondary" variant={animationTitleIsFinished ? "visible" : "hidden"} onAnimationComplete={() => setAnimationSubtitleIsFinished(true)}>On dirait qu’un secret tout doux se cache ici ...</Typewriter>
          </motion.div>
          {!animationButtonIsFinished && <AnimatePresence>
            <ScaleCursor>
              <motion.div
                initial="hidden"
                variants={buttonWrapperVariants}
                animate={animationSubtitleIsFinished && !clicked ? "visible" : "hidden"}
                onAnimationComplete={handleAnimationButtonIsFinished}
              >
                <Button color="var(--brown)" boxShadowColor="166, 126, 77" onClick={handleClick} variant={animationSubtitleIsFinished ? "visible" : "hidden"}>Découvrir</Button>
              </motion.div>
            </ScaleCursor>
          </AnimatePresence>}
        </motion.section>}
      </AnimatePresence>
      <audio ref={audioRef} src="/assets/audio/music.mp3" controls={false} preload={"auto"}/>
    </>
  );
}

export default function Discover({
  onClickDiscover
}: DiscoverProps) {
  return (
    <Suspense>
      <Content onClickDiscover={onClickDiscover}/>
    </Suspense>
  );
}
