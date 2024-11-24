"use client"

import {  useState } from "react";
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
        <SaveTheDate play />
      </main>
      <FollowMouseCursorHeart/>
    </FollowCursorProvider>
  );
}
