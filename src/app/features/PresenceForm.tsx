import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getPresence, updatePresence } from "@/app/actions/presence";
import { useSearchParams } from "next/navigation";
import ScaleCursor from "@/components/Utils/Utils/ScaleCursor";

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

export default function PresenceForm({delay}: {delay?: number}) {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [presence, setPresence] = useState<boolean | null>();

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
    <form className="relative">
      <motion.div
        className="flex flex-col space-y-3 items-center text-white"
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
            <span className="group-hover:opacity-80 select-none">Je serais présent(e) au mariage</span>
          </motion.label>
        </ScaleCursor>
        <ScaleCursor>
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
            <span className="group-hover:opacity-80 select-none">Je ne pourrais venir au mariage</span>
          </motion.label>
        </ScaleCursor>
      </motion.div>
    </form>
  )
}
