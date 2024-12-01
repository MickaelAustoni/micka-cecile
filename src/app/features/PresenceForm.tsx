import { useEffect, useState } from "react";
import { getPresence, updatePresence } from "@/app/actions/presence";
import { useSearchParams } from "next/navigation";
import Typewriter from "@/components/DataDisplay/Typewriter";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { interpolate } from "flubber";
import DisableCursorAnimation from "@/components/Utils/Utils/DisableCursorAnimation";

interface MorphingCheckboxProps {
  checked: boolean;
  onChange: () => void;
  isNegative?: boolean;
}

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
  const [firstQuestionIsFinished, setFirstQuestionIsFinished] = useState(false);

  const handleChange = async (newPresence: boolean) => {
    setPresence(newPresence);
    await updatePresence(newPresence, name);
  };

  useEffect(() => {
    if (!name) {
      return;
    }

    const fetchInitialPresence = async () => {
      const response = await getPresence(name);
      if (response?.success) {
        setPresence(response.presence);
      }
    };

    void fetchInitialPresence();
  }, [name]);

  return (
    <form className="relative flex flex-col space-y-3 items-center text-white">
      <label className="flex items-center gap-3 cursor-pointer group text-sm md:text-base relative">
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.2}}>
          <MorphingCheckbox
            checked={presence === true}
            onChange={() => handleChange(true)}
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
        <motion.div initial={{opacity: 0}} animate={firstQuestionIsFinished && {opacity: 1}} transition={{delay: 0.2}}>
          <MorphingCheckbox
            isNegative
            checked={presence === false}
            onChange={() => handleChange(false)}
          />
        </motion.div>
        {firstQuestionIsFinished && <Typewriter
          className="group-hover:opacity-80 select-none"
          onAnimationComplete={onFinish}
        >
          Je ne pourrais venir au mariage
        </Typewriter>}
      </label>
    </form>
  );
}
