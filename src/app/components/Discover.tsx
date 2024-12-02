"use client"

import { useSearchParams } from 'next/navigation'
import Typewriter from "@/components/DataDisplay/Typewriter";
import { motion, Variants, AnimatePresence } from 'motion/react';
import { Suspense, useRef, useState } from "react";
import ScaleCursor from "@/components/Utils/Utils/ScaleCursor";
import Button from "@/components/Inputs/Button";
import { setDiscovered } from "@/app/actions/discover";
import Lottie from "lottie-react";
import soundAnimation from "@/animations/sound.json";

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
    transition: {
      transform: {
        duration: 1,
      }
    }
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

const Content = ({onClickDiscover}: DiscoverProps) => {
  const [animationTitleIsFinished, setAnimationTitleIsFinished] = useState(false);
  const [animationSubtitleIsFinished, setAnimationSubtitleIsFinished] = useState(false);
  const [animationButtonIsFinished, setAnimationButtonIsFinished] = useState(false);
  const [animationButtonClickedIsFinished, setAnimationButtonClickedIsFinished] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [finished, setFinished] = useState(false);
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleClick = async () => {
    void audioRef?.current?.play();
    setClicked(true);
    onClickDiscover?.();
    await setDiscovered(name);
  };

  const handleAnimationButtonIsFinished = (definition: string) => {
    if (definition === "hidden") {
      setAnimationButtonClickedIsFinished(true);
      return
    }

    setAnimationButtonIsFinished(true);
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
          {/* Text */}
          <motion.div className="flex flex-col text-center" variants={wrapperTextVariants} initial={"visible"}
                      animate={clicked ? "hidden" : "visible"}>
            <Typewriter className="text-green-secondary"
                        onAnimationComplete={() => setAnimationTitleIsFinished(true)}>Bonjour{name ? ` ${name}` : ""},</Typewriter>
            <Typewriter className="text-green-secondary" variant={animationTitleIsFinished ? "visible" : "hidden"}
                        onAnimationComplete={() => setAnimationSubtitleIsFinished(true)}>On dirait qu’un secret tout
              doux se cache ici ...</Typewriter>
          </motion.div>
          {/* Button */}
          {!animationButtonClickedIsFinished && <AnimatePresence>
            <ScaleCursor cleanupOnUnmount>
              <motion.div
                initial="hidden"
                variants={buttonWrapperVariants}
                animate={animationSubtitleIsFinished && !clicked ? "visible" : "hidden"}
                onAnimationComplete={handleAnimationButtonIsFinished}
              >
                <Button color="var(--brown)" boxShadowColor="166, 126, 77" onClick={handleClick}
                        variant={animationSubtitleIsFinished ? "visible" : "hidden"}>Découvrir</Button>
              </motion.div>
            </ScaleCursor>
          </AnimatePresence>}
          {/* Sound */}
          <AnimatePresence>
            {!clicked && <motion.div
              initial={{opacity: 0}}
              animate={animationButtonIsFinished && {opacity: 1}}
              exit={{opacity: 0, transition: {duration: 0.5}}}
              transition={{duration: 2, delay: 0.5}}
              key="soundAnimation"
              className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 z-50">
              {animationButtonIsFinished && <Lottie
                loop
                autoplay
                className="-mb-8"
                animationData={soundAnimation}
              />}
              <p className="text-xs text-center">
                Activez votre son pour une meilleure expérience
              </p>
            </motion.div>}
          </AnimatePresence>
        </motion.section>}
      </AnimatePresence>
      <audio ref={audioRef} src="/assets/audio/music.mp3" controls={false} preload={"auto"}/>
    </>
  );
}

export default function Discover({onClickDiscover}: DiscoverProps) {
  return (
    <Suspense>
      <Content onClickDiscover={onClickDiscover}/>
    </Suspense>
  );
}
