"use client"

import {  useSearchParams } from 'next/navigation'

export default function Discover() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  const handleClick = () => {
    const audio = new Audio("/assets/music.mp3");
    void audio.play();
  };

  return (
    <div className="h-screen flex items-center justify-center flex-col space-y-7 font-[family-name:var(--font-geist-mono)]">
      <p className="text-center ">
        <span>Bonjour {name},</span>
        <br />
        <span>On dirait qu’un secret tout doux se cache ici...</span>
      </p>
      <button className="border px-6 py-3" onClick={handleClick}>Découvrir</button>
    </div>
  );
}
