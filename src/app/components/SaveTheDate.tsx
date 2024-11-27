"use client"

import { motion, AnimatePresence } from 'framer-motion';
import Logo from "@/components/DataDisplay/Logo";
import Polaroid from "@/components/DataDisplay/Polaroid";
import { useState } from 'react';
import Modal from "@/components/Feedback/Modal";

interface InvitationFormProps {
  play?: boolean;
  delay?: number;
}

const INTERVAL_POLAROIDS = 1;
const DELAY_POLAROIDS_FADE_OUT = 5;
const DELAY_TITLE = 5.2;
const DELAY_SUBTITLE = 7;
const DELAY_FORM = 9;
const DELAY_LOGO = 11;
const DELAY_MORE_INFO = 10;

const HappyFace = () => (
  <motion.svg width="40" height="40" viewBox="0 0 40 40">
    <motion.circle
      cx="20" cy="20" r="18"
      stroke="white"
      strokeWidth="2"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5 }}
    />
    <motion.circle
      cx="13" cy="15" r="2"
      fill="white"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5 }}
    />
    <motion.circle
      cx="27" cy="15" r="2"
      fill="white"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5 }}
    />
    <motion.path
      d="M 12,25 Q 20,32 28,25"
      stroke="white"
      strokeWidth="2"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ delay: 0.7, duration: 0.5 }}
    />
  </motion.svg>
);

const SadFace = () => (
  <motion.svg width="40" height="40" viewBox="0 0 40 40">
    <motion.circle
      cx="20" cy="20" r="18"
      stroke="white"
      strokeWidth="2"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5 }}
    />
    <motion.circle
      cx="13" cy="15" r="2"
      fill="white"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5 }}
    />
    <motion.circle
      cx="27" cy="15" r="2"
      fill="white"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5 }}
    />
    <motion.path
      d="M 12,28 Q 20,22 28,28"
      stroke="white"
      strokeWidth="2"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ delay: 0.7, duration: 0.5 }}
    />
  </motion.svg>
);

const Arrow = ({ isPresent }: { isPresent: boolean }) => (
  <motion.svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    className={`absolute left-10 ${isPresent ? '-top-10' : '-bottom-10'}`}
  >
    <motion.path
      d={isPresent
        ? "M 0,30 C 10,20 15,10 29,1" // De bas en haut vers la droite
        : "M 0,0 C 10,10 15,20 29,29" // De haut en bas vers la droite
      }
      stroke="white"
      strokeWidth="2"
      fill="none"
      initial={{pathLength: 0}}
      animate={{pathLength: 1}}
      transition={{duration: 0.5}}
    />
    <motion.path
      d={isPresent
        ? "M 25,1 L 29,1 L 29,5" // Flèche pointant vers le haut
        : "M 29,25 L 29,29 L 25,29" // Flèche pointant vers le bas
      }
      stroke="white"
      strokeWidth="2"
      fill="none"
      initial={{pathLength: 0}}
      animate={{pathLength: 1}}
      transition={{delay: 0.5, duration: 0.3}}
    />
  </motion.svg>
);


const formItemVariants = {
  hidden: {opacity: 0, y: 20},
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function SaveTheDate({ delay, play = false }: InvitationFormProps) {
  const [moreInfoIsOpen, setMoreInfoIsOpen] = useState(false);
  const [presence, setPresence] = useState<boolean | null>(null);

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
            className="absolute inset-0 justify-center items-center flex bg-brown z-[60] p-6 overflow-hidden"
            transition={{
              duration: 1,
              delay
            }}
          >
            {/* Logo */}
            <motion.div
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              transition={{
                duration: 1,
                delay: DELAY_LOGO
              }}
            >
              <Logo
                disableHeartEnding
                disableAnimation
                shapeOnly
                className="absolute left-1/2 top-6 -translate-x-1/2 max-w-xs"
              />
            </motion.div>

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
              >
                15.11.2025
              </motion.div>

              {/* Form */}
              <motion.div
                className="absolute left-0 right-0 top-full mt-20 flex flex-col gap-4 items-center text-white"
                variants={{
                  hidden: {opacity: 0},
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.3,
                      delayChildren: delay ? delay + DELAY_FORM : DELAY_FORM,
                    }
                  }
                }}
                initial="hidden"
                animate="show"
              >
                <motion.label
                  className="flex items-center gap-3 cursor-pointer group text-sm md:text-base relative"
                  variants={formItemVariants}
                >
                  <input
                    type="radio"
                    name="presence"
                    checked={presence === true}
                    onChange={() => setPresence(true)}
                    className="appearance-none w-8 h-8 border-2 border-white rounded-md checked:bg-white checked:border-white cursor-pointer"
                  />
                  <span className="group-hover:opacity-80 select-none">Je serai présent(e) au mariage</span>
                  {presence && (
                    <>
                      <Arrow isPresent={true}/>
                      <motion.div
                        initial={{scale: 0}}
                        animate={{scale: 1}}
                        transition={{delay: 0.8}}
                        className="absolute left-20 -top-16"
                      >
                        <HappyFace/>
                      </motion.div>
                    </>
                  )}
                </motion.label>
                <motion.label
                  className="flex items-center gap-3 cursor-pointer group text-sm md:text-base relative"
                  variants={formItemVariants}
                >
                  <input
                    type="radio"
                    name="presence"
                    checked={presence === false}
                    onChange={() => setPresence(false)}
                    className="appearance-none w-8 h-8 border-2 border-white rounded-md checked:bg-white checked:border-white cursor-pointer"
                  />
                  <span className="group-hover:opacity-80 select-none">Je ne pourrai venir au mariage</span>
                  {presence === false && (
                    <>
                      <Arrow isPresent={false}/>
                      <motion.div
                        initial={{scale: 0}}
                        animate={{scale: 1}}
                        transition={{delay: 0.8}}
                        className="absolute left-20 -bottom-16"
                      >
                        <SadFace/>
                      </motion.div>
                    </>
                  )}
                </motion.label>
              </motion.div>
            </div>

            {/* Plus d'info */}
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{
                delay: delay ? delay + DELAY_MORE_INFO : DELAY_MORE_INFO,
                duration: 1
              }}
            >
              <motion.button
                className="absolute bottom-0 text-white text-sm left-1/2 -translate-x-1/2 underline z-50 outline-none select-none p-6"
                whileHover={{
                  opacity: 0.4,
                  transition: {
                    duration: 0.2
                  }
                }}
                onClick={() => setMoreInfoIsOpen(true)}
              >
                Plus d&#39;info
              </motion.button>
            </motion.div>

              {/* Polaroids */}
              <motion.div
                className="absolute flex justify-center items-center w-full h-full z-0"
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
      <Modal open={moreInfoIsOpen} onClose={() => setMoreInfoIsOpen(false)}>
        <div className="container">
          INFO HERE
        </div>
      </Modal>
    </>
  );
}
