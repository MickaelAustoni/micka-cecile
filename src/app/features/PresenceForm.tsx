import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Typewriter from "@/components/DataDisplay/Typewriter";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { interpolate } from "flubber";
import DisableCursorAnimation from "@/components/Utils/Utils/DisableCursorAnimation";
import { getUser, updatePeople, updatePresence } from "@/app/actions/users";

interface MorphingCheckboxProps {
  checked: boolean;
  onChange: () => void;
  isNegative?: boolean;
}

const Arrow = ({className}: { className?: string }) => (
  <motion.svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    className={className}
  >
    <motion.path
      d="M 0,30 C 10,20 15,10 29,1"
      stroke="white"
      strokeWidth="2"
      fill="none"
      initial={{pathLength: 0}}
      animate={{pathLength: 1}}
      transition={{duration: 0.5}}
    />
    <motion.path
      d="M 25,1 L 29,1 L 29,5"
      stroke="white"
      strokeWidth="2"
      fill="none"
      initial={{pathLength: 0}}
      animate={{pathLength: 1}}
      transition={{delay: 0.5, duration: 0.3}}
    />
  </motion.svg>
);


const MorphingCheckbox = ({checked, onChange, isNegative}: MorphingCheckboxProps) => {
  const progress = useMotionValue(0);
  const morphProgress = useMotionValue(0);
  const paths = {
    square: "M4 4 H20 V20 H4 Z",
    heart: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
  };

  const path = useTransform(morphProgress, [0, 1], [paths.square, paths.heart], {
    mixer: (a, b) => interpolate(a, b, {
      maxSegmentLength: 1,
      single: true
    })
  });

  const initialClip = "polygon(0 0, 50% 0, 50% 30%, 50% 50%, 50% 70%, 50% 90%, 50% 100%, 0 100%, 0 0, 50% 0, 50% 0, 100% 0, 100% 100%, 50% 100%, 50% 90%, 50% 70%, 50% 50%, 50% 30%, 50% 0)";
  const finalClip = "polygon(0 0, 43% 0, 40% 30%, 53% 50%, 40% 70%, 53% 90%, 43% 100%, 0 100%, 0 0, 43% 0, 57% 0, 100% 0, 100% 100%, 57% 100%, 60% 90%, 47% 70%, 60% 50%, 47% 30%, 57% 0)";

  const clipPath = useTransform(progress, [0, 1], [initialClip, finalClip]);

  useEffect(() => {
    const morphAnimation = animate(morphProgress, checked ? 1 : 0, {
      duration: 0.4,
      ease: "easeOut",
      type: "tween"
    });

    const breakAnimation = animate(progress, checked && isNegative ? 1 : 0, {
      duration: 0.4,
      ease: "easeInOut",
      delay: 0.5
    });

    return () => {
      morphAnimation.stop();
      breakAnimation.stop();
    };
  }, [checked, progress, morphProgress, isNegative]);

  return (
    <DisableCursorAnimation>
      <div className="relative w-8 h-8 cursor-pointer block">
        <input
          type="radio"
          name="presence"
          checked={checked}
          onChange={onChange}
          className="absolute opacity-0 w-full h-full cursor-pointer"
        />
        <motion.div
          style={{clipPath}}
          className="absolute top-0 left-0 w-full h-full"
        >
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <motion.path
              d={path}
              fill={checked ? "white" : "transparent"}
              stroke="white"
              strokeWidth="2"
              transition={{
                fill: {duration: 0.2}
              }}
            />
          </svg>
        </motion.div>
      </div>
    </DisableCursorAnimation>
  );
};

interface PresenceFormProps {
  onFinish?: () => void;
}

export default function PresenceForm({onFinish}: PresenceFormProps) {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [presence, setPresence] = useState<boolean | null>(null);
  const [people, setPeople] = useState<string>("");
  const [firstQuestionIsFinished, setFirstQuestionIsFinished] = useState<boolean>(false);

  const handleChangePresence = async (newPresence: boolean) => {
    setPresence(newPresence);
    await updatePresence(newPresence, name);
  };

  const handleChangePeople = async ({target}: ChangeEvent<HTMLInputElement>) => {
    const {value} = target;
    const numericValue = value.replace(/\D/g, '');

    setPeople(numericValue);
    if (numericValue) {
      await updatePeople(Number(numericValue), name);
    }
  };

  useEffect(() => {
    if (!name) {
      return;
    }

    const fetchUser = async () => {
      const response = await getUser(name);

      if (response?.success) {
        setPresence(response.data?.presence || null);
        setPeople(response.data?.people ? String(response.data.people) : "");
      }
    };

    void fetchUser();
  }, [name]);

  return (
    <form className="relative items-center text-white inline-block">
      <div className="space-y-3">
        <label className="flex items-center gap-3 cursor-pointer group text-sm md:text-base relative">
          <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.2}}>
            <MorphingCheckbox
              checked={presence === true}
              onChange={() => handleChangePresence(true)}
            />
          </motion.div>
          <Typewriter
            className="group-hover:opacity-80 select-none"
            onAnimationComplete={() => setFirstQuestionIsFinished(true)}
          >
            Je serais présent(e) au mariage
          </Typewriter>
        </label>

        <label className="flex items-center gap-3 cursor-pointer group text-sm md:text-base relative">
          <motion.div initial={{opacity: 0}} animate={firstQuestionIsFinished && {opacity: 1}}
                      transition={{delay: 0.2}}>
            <MorphingCheckbox
              isNegative
              checked={presence === false}
              onChange={() => handleChangePresence(false)}
            />
          </motion.div>
          {firstQuestionIsFinished && <Typewriter
            className="group-hover:opacity-80 select-none"
            onAnimationComplete={onFinish}
          >
            Je ne pourrais venir au mariage
          </Typewriter>}
        </label>
      </div>

      {presence === true &&
        <>
          <Arrow className="shrink-0 absolute left-6 bottom-full mb-4"/>
          <label className="absolute left-16 ml-2 bottom-full mb-5 flex items-center space-x-2">
            <Typewriter>
              Combien serez-vous au total ?
            </Typewriter>
            <motion.input
              value={people}
              onChange={handleChangePeople}
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{delay: 1.5}}
              maxLength={2}
              inputMode="numeric"
              type="text"
              className="w-20 h-10 border-2 border-white bg-transparent outline-0 text-center text-white"
            />
          </label>
        </>
      }
    </form>
  );
}
