"use client"

import { useState } from "react";
import Discover from "@/app/components/Discover";
import Story from "@/app/components/Story";
import LogoAnimation from "@/app/components/LogoAnimation";
import { FollowCursorProvider } from "@/Providers/FollowCursorProvider";
import FollowMouseCursorHeart from "@/components/Utils/Utils/FollowMouseCursorHeart";
import SaveTheDate from "@/app/components/SaveTheDate";

export default function Home() {
  const [step, setStep] = useState("discover");

  return (
    <FollowCursorProvider>
      <main>
        <Discover onClickDiscover={() => setStep("story")} />
        <Story play={step === "story"} onFinish={() => setStep("saveTheDate")} />
        <LogoAnimation play={step === "saveTheDate"} onFinish={() => setStep("invitationForm")} onFinishDelay={5} />
        <SaveTheDate play={step === "invitationForm"} />
      </main>
      <FollowMouseCursorHeart />
    </FollowCursorProvider>
  );
}
