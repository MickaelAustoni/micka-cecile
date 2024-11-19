"use client"

import {  useState } from "react";
import FollowMouseCursorPoint from "@/components/Utils/Utils/FollowMouseCursorPoint";
import Discover from "@/app/components/Discover";
import Story from "@/app/components/Story";
import SaveTheDate from "@/app/components/SaveTheDate";

export default function Home() {
  const [step, setStep] = useState("discover");

  return (
    <main>
      <Discover onClickDiscover={() => setStep("story")} />
      <Story play={step === "story"} onFinish={() => setStep("saveTheDate")} />
      <SaveTheDate play={step === "saveTheDate"} />
      <FollowMouseCursorPoint />
    </main>
  );
}
