"use client"

import Typewriter from "@/components/DataDisplay/Typewriter";
import { useEffect, useRef, useState } from "react";

interface StoryProps {
  play?: boolean;
}

export default function Story({ play = false }: StoryProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paragraph1IsFinished, setParagraph1IsFinished] = useState(false);
  const [paragraph2IsFinished, setParagraph2IsFinished] = useState(false);

  useEffect(() => {
    if (play) {
      void videoRef.current?.play();
    }
  }, [play]);

  return (
    <>
      <div className="inset-0 overflow-hidden absolute z-10 flex items-center justify-center flex-col font-[family-name:var(--font-geist-mono)]">
        <div className="flex flex-col text-center w-1/4">
          <Typewriter
            variant={play && !paragraph1IsFinished ? "visible" : "hidden"}
            delay={2}
            delayHidden={2}
            onAnimationComplete={() => setParagraph1IsFinished(true)}>
              Il y a 7 ans, nos chemins se sont croisés par hasard...
          </Typewriter>
          <Typewriter
            variant={paragraph1IsFinished && !paragraph2IsFinished ?  "visible" : "hidden"}
            delay={2}
            delayHidden={2}
            onAnimationComplete={() => setParagraph2IsFinished(true)}>
              3 ans plus tard, une petite graine est venue fleurir notre jardin d’amour...
          </Typewriter>
          <Typewriter
            variant={paragraph2IsFinished ? "visible" : "hidden"}
            delay={2}
            delayHidden={2}
          >
            Aujourd’hui, il est temps d’honorer notre promesse d’éternité.
          </Typewriter>
        </div>
      </div>
      <video muted loop ref={videoRef} className="fixed h-screen w-screen inset-0 object-cover z-0" controls={false} preload="auto" src="/assets/movies/tree.mp4"/>
    </>
  );
}
