"use client"

import Discover from "@/components/Sequence/Discover";
import Story from "@/components/Sequence/Story";
import { useState } from "react";
import FollowMouseCursorPoint from "@/components/Utils/Utils/FollowMouseCursorPoint";
import Logo from "@/components/DataDisplay/Logo";

export default function Home() {
  const [step, setStep] = useState("discover");

  return (
    <main>
      <Logo />
      {/*<Discover onClickDiscover={() => setStep("story")} />*/}
      {/*<Story play={step === "story"} />*/}
      {/*<FollowMouseCursorPoint />*/}
    </main>
  );
}
