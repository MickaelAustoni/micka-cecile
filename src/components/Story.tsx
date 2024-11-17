"use client"

import Typewriter from "@/components/Typewriter";
import { useEffect, useRef } from "react";

interface StoryProps {
  play?: boolean;
}

export default function Story({ play = false }: StoryProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (play) {
      void videoRef.current?.play();
    }
  }, [play]);

  return (
    <>
      <div
        className="inset-0 overflow-hidden absolute z-10 flex items-center justify-center flex-col font-[family-name:var(--font-geist-mono)]">
        <div className="flex flex-col text-center">
          <Typewriter start={play}>Lorem 1</Typewriter>
          <Typewriter start={false}>Lorem 2</Typewriter>
          <Typewriter start={false}>Lorem 3</Typewriter>
        </div>
      </div>
      <video muted loop ref={videoRef} className="fixed h-screen w-screen inset-0 object-cover z-0" controls={false}
             preload="auto" src="/assets/movies/tree.mp4"/>
    </>
  );
}
