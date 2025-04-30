import React from "react";
import Hero from "../components/Hero";
import HelpFinder from "./HelpFinder";
import Affirmations from "./Affirmations";

export default function Home() {
  return (
<div className="font-sans pt-28">
          <Hero />
          <HelpFinder/>
          <Affirmations/>
    </div>
  );
}
