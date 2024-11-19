"use client"

import {  useState } from "react";
import Discover from "@/app/components/Discover";
import Story from "@/app/components/Story";
import SaveTheDate from "@/app/components/SaveTheDate";
import { FollowCursorProvider } from "@/Providers/FollowCursorProvider";
import FollowMouseCursorHeart from "@/components/Utils/Utils/FollowMouseCursorHeart";

export default function Home() {
  const [step, setStep] = useState("discover");

  return (
    <main>
      <FollowCursorProvider>
        <Discover onClickDiscover={() => setStep("story")} />
        <Story play={step === "story"} onFinish={() => setStep("saveTheDate")} />
        <SaveTheDate play={step === "saveTheDate"} />
        <FollowMouseCursorHeart />
      </FollowCursorProvider>
    </main>
  );
}
