"use client";

import Image from "next/image";
import posthog from "posthog-js";

const EventBtn = () => {
  return (
    <button
      type="button"
      className="mt-7 mx-auto"
      id="explore-btn"
      onClick={() => {
        console.log("EventBtn clicked");
        posthog.capture("explore_events_clicked", {
          button_id: "explore-btn",
          destination: "#events",
        });
      }}
    >
      <a className="text-white" href="#events">
        Explore Events
        <Image
          src="/icons/arrow-down.svg"
          alt="arrow down"
          width={24}
          height={24}
        />
      </a>
    </button>
  );
};

export default EventBtn;
