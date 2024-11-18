"use client"

import Discover from "@/components/Sequence/Discover";
import Story from "@/components/Sequence/Story";
import { Suspense, useState } from "react";
import FollowMouseCursorPoint from "@/components/Utils/Utils/FollowMouseCursorPoint";
import SaveTheDate from "@/components/Sequence/SaveTheDate";

export default function Home() {
  const [step, setStep] = useState("discover");

  return (
    <main>
      <Suspense>
        <Discover onClickDiscover={() => setStep("story")} />
      </Suspense>
      <Story play={step === "story"} onFinish={() => setStep("saveTheDate")} />
      <SaveTheDate play={step === "saveTheDate"} />
      <FollowMouseCursorPoint />
    </main>
  );
}
