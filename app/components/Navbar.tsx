"use client";

import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";

const Navbar = () => {
  const handleNavClick = (linkName: string, destination: string) => {
    posthog.capture("navbar_link_clicked", {
      link_name: linkName,
      destination: destination,
    });
  };

  return (
    <header>
      <nav>
        <Link
          href="/"
          className="logo"
          onClick={() => handleNavClick("Logo", "/")}
        >
          <Image src="/icons/logo.png" alt="Logo" width={24} height={24} />
          <p>DevEvents</p>
        </Link>
        <ul>
          <Link href="/events" onClick={() => handleNavClick("Home", "/events")}>
            Home
          </Link>
          <Link
            href="/events"
            onClick={() => handleNavClick("Events", "/events")}
          >
            Events
          </Link>
          <Link
            href="/create"
            onClick={() => handleNavClick("Create Event", "/create")}
          >
            Create Event
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
