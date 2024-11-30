import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getPresence, updatePresence } from "@/app/actions/presence";
import { useSearchParams } from "next/navigation";
import ScaleCursor from "@/components/Utils/Utils/ScaleCursor";
import Typewriter from "@/components/DataDisplay/Typewriter";

interface PresenceFormProps {
  onFinish?: () => void;
}

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

export default function PresenceForm({ onFinish }: PresenceFormProps) {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [presence, setPresence] = useState<boolean | null>();
  const [firstQuestionIsFinished, setFirstQuestionIsFinished] = useState(false);

  const handleChange = async (newPresence: boolean) => {
    setPresence(newPresence);
    await updatePresence(newPresence, name);
  };

  // Get initial presence
  useEffect(() => {
    if( !name ) {
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
      <ScaleCursor>
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
          <Typewriter
            className="group-hover:opacity-80 select-none"
            onAnimationComplete={() => setFirstQuestionIsFinished(true)}
          >
            Je serais présent(e) au mariage
          </Typewriter>
        </motion.label>
      </ScaleCursor>
      {firstQuestionIsFinished && <ScaleCursor>
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
          <Typewriter
            className="group-hover:opacity-80 select-none"
            onAnimationComplete={onFinish}
          >
            Je ne pourrais venir au mariage
          </Typewriter>
        </motion.label>
      </ScaleCursor>}
    </form>
  )
}
