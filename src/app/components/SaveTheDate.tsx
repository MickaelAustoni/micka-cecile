"use client"

import { motion, AnimatePresence } from 'framer-motion';
import Logo from "@/components/DataDisplay/Logo";
import Polaroid from "@/components/DataDisplay/Polaroid";
import { Suspense, useState } from 'react';
import Modal from "@/components/Feedback/Modal";
import PresenceForm from "@/app/features/PresenceForm";
import Info from "@/app/features/Info";
import { useSearchParams } from "next/navigation";
import Typewriter from "@/components/DataDisplay/Typewriter";
import ScaleCursor from "@/components/Utils/Utils/ScaleCursor";
import { setInfo } from "@/app/actions/users";

interface InvitationFormProps {
  play?: boolean;
  delay?: number;
}

const INTERVAL_POLAROIDS = 1;
const DELAY_POLAROIDS_FADE_OUT = 4.3;
const DELAY_TITLE = 5;
const DELAY_SUBTITLE = 6.5;
const DELAY_INVITATION = 2;
const DELAY_MORE_INFO = 0;

const Content = ({delay, play = false}: InvitationFormProps) => {
  const [moreInfoIsOpen, setMoreInfoIsOpen] = useState(false);
  const [subtitleTextIsFinished, setSubtitleTextIsFinished] = useState(false);
  const [invitationTextIsFinished, setInvitationTextIsFinished] = useState(false);
  const [formTextIsFinished, setFormTextIsFinished] = useState(false);
  const [infoTextIsFinished, setInfoTextIsFinished] = useState(false);
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const nameContainsAmpersand = name?.includes("&");

  const getName = () => {
    if (nameContainsAmpersand) {
      return `${name}, votre`;
    }

    if (name) {
      return `${name}, ta`
    }

    return "Ta";
  }

  const polaroidVariants = {
    initial: () => ({
      x: -1000,
      y: -1000,
      rotate: -45,
    }),
    animate: (index: number) => ({
      x: `calc(var(--polaroid-spacing) * (${index} - 1))`,
      y: -100 + (index * 100),
      rotate: -20 + (index * 10),
      transition: {
        duration: 2,
        delay: delay ? delay + (index * INTERVAL_POLAROIDS) : index * INTERVAL_POLAROIDS,
        type: "spring",
        bounce: 0.2
      }
    })
  };

  return (
    <>
      <AnimatePresence>
        {play && (
          <motion.section
            className="absolute inset-0 items-center flex flex-col justify-between bg-brown z-[60] p-6 overflow-hidden text-sm sm:text-base [@media(max-height:740px)]:text-xs"
            transition={{
              duration: 1,
              delay
            }}
          >
            {/* Logo */}
            <motion.div
              initial={{opacity: 0}}
              animate={infoTextIsFinished && {opacity: 1}}
              transition={{duration: 1}}
            >
              <Logo
                disableHeartEnding
                disableAnimation
                shapeOnly
                className="h-48 w-auto max-w-full"
              />
            </motion.div>

            {/* Middle */}
            <div>
              {/* Title */}
              <div className="container z-10 relative">
                <motion.h1
                  className="text-center text-white drop-shadow-xl overflow-hidden text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  transition={{
                    duration: 2,
                    delay: delay ? delay + DELAY_TITLE : DELAY_TITLE,
                  }}
                >
                  <motion.span
                    initial={{y: 100}}
                    animate={{y: 0}}
                    transition={{
                      duration: 2.5,
                      delay: delay ? delay + DELAY_TITLE : DELAY_TITLE,
                      ease: [0.6, 0.01, 0.05, 0.95]
                    }}
                    style={{display: 'inline-block'}}
                  >
                    Save the date
                  </motion.span>
                </motion.h1>

                {/* Date */}
                <motion.div
                  className="text-center text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl drop-shadow-xl"
                  initial={{
                    opacity: 0,
                    y: 50
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  transition={{
                    duration: 1,
                    delay: delay ? delay + DELAY_SUBTITLE : DELAY_SUBTITLE,
                  }}
                  onAnimationComplete={() => setSubtitleTextIsFinished(true)}
                >
                  15.11.2025
                </motion.div>

                {/* Invitation */}
                <p className="text-center text-white drop-shadow-md max-w-lg mx-auto mt-2 sm:mt-3 md:mt-4 lg:mt-6 xl:mt-8">
                  <Typewriter
                    delay={delay ? delay + DELAY_INVITATION : DELAY_INVITATION}
                    variant={subtitleTextIsFinished ? "visible" : "hidden"}
                    onAnimationComplete={() => setInvitationTextIsFinished(true)}
                    heightDuration={0.8}
                  >
                    L&#39;amour nous a réunis, et c&#39;est entourés de nos proches que nous souhaitons célébrer cette
                    union. {getName()} présence rendrait ce jour encore plus magique.
                  </Typewriter>
                </p>
              </div>
            </div>

            {/* Bottom */}
            <div className="text-center relative z-20 space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 xl:space-y-8">
              {/* Form */}
              <div className="flex items-center justify-center mt-16">
                <PresenceForm onFinish={() => setFormTextIsFinished(true)} play={invitationTextIsFinished}/>
              </div>

              {/* Plus d'info */}
              <motion.div
                initial={{opacity: 0}}
                animate={formTextIsFinished && {opacity: 1}}
                transition={{
                  delay: delay ? delay + DELAY_MORE_INFO : DELAY_MORE_INFO,
                  duration: 1
                }}
                onAnimationComplete={() => setInfoTextIsFinished(true)}
              >
                <ScaleCursor>
                  <motion.button
                    className="text-white text-sm underline z-50 outline-none select-none [@media(max-height:640px)]:p-2"
                    whileHover={{
                      opacity: 0.4,
                      transition: {
                        duration: 0.2
                      }
                    }}
                    onClick={() => {
                      setMoreInfoIsOpen(true)
                      void setInfo(name);
                    }}
                  >
                    Plus d&#39;infos
                  </motion.button>
                </ScaleCursor>
              </motion.div>
            </div>

            {/* Polaroids */}
            <motion.div
              className="absolute flex justify-center items-center w-full h-full z-0 inset-0"
              animate={{
                opacity: 0.2
              }}
              transition={{
                delay: delay ? delay + DELAY_POLAROIDS_FADE_OUT : DELAY_POLAROIDS_FADE_OUT,
                duration: 1
              }}
            >
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={polaroidVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute"
                  style={{transformOrigin: "center center"}}
                >
                  <Polaroid priority src={`/assets/images/wedding-${index}.avif`} alt="Save the date"/>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Modal */}
      <Modal open={moreInfoIsOpen} onClose={() => setMoreInfoIsOpen(false)}>
        <Info/>
      </Modal>
    </>
  );
};

export default function SaveTheDate({delay, play = false}: InvitationFormProps) {
  return (
    <Suspense>
      <Content delay={delay} play={play}/>
    </Suspense>
  )
}
