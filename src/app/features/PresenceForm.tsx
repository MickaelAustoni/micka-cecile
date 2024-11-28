import { motion } from "framer-motion";
import { useState } from "react";
import { updatePresence } from "@/app/actions/presence";
import { useSearchParams } from "next/navigation";

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

export default function PresenceForm({delay}: {delay?: number}) {
  const [presence, setPresence] = useState<boolean | null>(null);
  const searchParams = useSearchParams();

  const handleChange = async (newPresence: boolean) => {
    const name = searchParams.get("name") || "Anonymous";
    setPresence(newPresence);
    await updatePresence(newPresence, name);
  };

  return (
    <form className="relative">
      <motion.div
        className="absolute left-0 right-0 top-full mt-20 flex flex-col gap-4 items-center text-white"
        variants={{
          hidden: {opacity: 0},
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.3,
              delayChildren: delay,
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
            onChange={() => handleChange(true)}
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
            onChange={() => handleChange(false)}
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
    </form>
  )
}
