"use client"

import {  useState } from "react";
import Discover from "@/app/components/Discover";
import Story from "@/app/components/Story";
import SaveTheDate from "@/app/components/SaveTheDate";
import { FollowCursorProvider } from "@/Providers/FollowCursorProvider";
import FollowMouseCursorHeart from "@/components/Utils/Utils/FollowMouseCursorHeart";
import InvitationForm from "@/app/components/InvitationForm";

export default function Home() {
  const [step, setStep] = useState("discover");

  return (
    <FollowCursorProvider>
      <main>
        <Discover onClickDiscover={() => setStep("story")}/>
        <Story play={step === "story"} onFinish={() => setStep("saveTheDate")}/>
        <SaveTheDate play={step === "saveTheDate"} onFinish={() => setStep("invitationForm")} onFinishDelay={5}/>
        <InvitationForm play={step === "invitationForm"} delay={2}/>
      </main>
      <FollowMouseCursorHeart/>
    </FollowCursorProvider>
  );
}
