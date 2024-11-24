"use client"

import { motion, AnimatePresence } from 'framer-motion';
import Logo from "@/components/DataDisplay/Logo";
import Polaroid from "@/components/DataDisplay/Polaroid";

interface InvitationFormProps {
  play?: boolean;
  delay?: number;
}

const INTERVAL_POLAROIDS = 1;
const DELAY_POLAROIDS_FADE_OUT = 5;
const DELAY_TITLE = 5.2;
const DELAY_SUBTITLE = 7;

export default function SaveTheDate({ delay, play = false }: InvitationFormProps) {
  const polaroidVariants = {
    initial: () => ({
      x: -1000,
      y: -1000,
      rotate: -45,
    }),
    animate: (index: number) => ({
      x: -200 + (index * 250), // Horizontal spacing
      y: -100 + (index * 100), // Vertical spacing
      rotate: -20 + (index * 10), // Rotation variation
      transition: {
        duration: 2,
        delay: delay ? delay + (index * INTERVAL_POLAROIDS) : index * INTERVAL_POLAROIDS,
        type: "spring",
        bounce: 0.2
      }
    })
  };

  return (
    <AnimatePresence>
      {play && (
        <section className="absolute inset-0 z-[60] overflow-hidden">
          <motion.div
            className="absolute inset-0 justify-center items-center flex bg-brown"
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
                delay: 7.5
              }}
            >
              <Logo
                disableHeartEnding
                disableAnimation
                shapeOnly
                width={250}
                className="absolute left-1/2 top-6 -translate-x-1/2"
              />
            </motion.div>

            {/* Title */}
            <div className="container z-10">
              <motion.h1
                className="text-center text-white text-9xl drop-shadow-xl overflow-hidden"
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
                className="text-center text-white text-4xl drop-shadow-xl"
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
            </div>

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
                  <Polaroid src={`/assets/images/wedding-${index}.avif`} alt="Save the date" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>
      )}
    </AnimatePresence>
  );
}
