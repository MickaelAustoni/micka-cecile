"use client"

import { use, useEffect, useState } from "react";
import Discover from "@/app/components/Discover";
import Story from "@/app/components/Story";
import LogoAnimation from "@/app/components/LogoAnimation";
import { FollowCursorProvider } from "@/Providers/FollowCursorProvider";
import FollowMouseCursorHeart from "@/components/Utils/Utils/FollowMouseCursorHeart";
import SaveTheDate from "@/app/components/SaveTheDate";
import { setVisited } from "@/app/actions/users";

export default function Home({ searchParams }: { searchParams: Promise<{ name: string }> }) {
  const [step, setStep] = useState("discover");
  const { name } = use(searchParams);

  useEffect(() => {
    void setVisited(name)
  }, [name]);

  return (
    <FollowCursorProvider>
      <main>
        {/*<Discover onClickDiscover={() => setStep("story")} />*/}
        {/*<Story play={step === "story"} onFinish={() => setStep("saveTheDate")} />*/}
        {/*<LogoAnimation play={step === "saveTheDate"} onFinish={() => setStep("invitationForm")} onFinishDelay={5} />*/}
        <SaveTheDate play />
      </main>
      <FollowMouseCursorHeart />
    </FollowCursorProvider>
  );
}
