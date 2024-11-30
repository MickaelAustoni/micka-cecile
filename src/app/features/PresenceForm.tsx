import { useEffect, useState } from "react";
import { getPresence, updatePresence } from "@/app/actions/presence";
import { useSearchParams } from "next/navigation";
import Typewriter from "@/components/DataDisplay/Typewriter";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { interpolate } from "flubber";

interface MorphingCheckboxProps {
  checked: boolean;
  onChange: () => void;
}

const MorphingCheckbox = ({checked, onChange}: MorphingCheckboxProps) => {
  const progress = useMotionValue(0);
  const paths = {
    square: "M4 4 H20 V20 H4 Z",
    heart: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
  };

  const path = useTransform(progress, [0, 1], [paths.square, paths.heart], {
    mixer: (a, b) => interpolate(a, b, {
      maxSegmentLength: 1,  // Augmenté pour réduire la complexité
      single: true         // Force une seule forme pour de meilleures performances
    })
  });

  useEffect(() => {
    const animation = animate(progress, checked ? 1 : 0, {
      duration: 0.4,      // Réduit pour plus de réactivité
      ease: "easeOut",    // Changé pour une transition plus rapide
      type: "tween"       // Force une animation simple
    });

    return animation.stop;
  }, [checked, progress]);

  return (
    <label className="relative w-8 h-8">
      <input
        type="radio"
        name="presence"
        checked={checked}
        onChange={onChange}
        className="absolute opacity-0 w-full h-full cursor-pointer"
      />
      <svg
        viewBox="0 0 24 24"
        className="absolute top-0 left-0 w-full h-full"
      >
        <motion.path
          d={path}
          fill={checked ? "white" : "transparent"}
          stroke="white"
          strokeWidth="2"
          transition={{
            fill: {duration: 0.2}  // Réduit pour plus de réactivité
          }}
        />
      </svg>
    </label>
  );
};

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
      <motion.label
        className="flex items-center gap-3 cursor-pointer group text-sm md:text-base relative"
        variants={formItemVariants}
      >
        <MorphingCheckbox
          checked={presence === true}
          onChange={() => handleChange(true)}
        />
        <Typewriter
          className="group-hover:opacity-80 select-none"
          onAnimationComplete={() => setFirstQuestionIsFinished(true)}
        >
          Je serais présent(e) au mariage
        </Typewriter>
      </motion.label>

      {firstQuestionIsFinished && (
        <motion.label
          className="flex items-center gap-3 cursor-pointer group text-sm md:text-base relative"
          variants={formItemVariants}
        >
          <MorphingCheckbox
            checked={presence === false}
            onChange={() => handleChange(false)}
          />
          <Typewriter
            className="group-hover:opacity-80 select-none"
            onAnimationComplete={onFinish}
          >
            Je ne pourrais venir au mariage
          </Typewriter>
        </motion.label>
      )}
    </form>
  );
}
