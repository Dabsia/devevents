"use client";

import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";

interface EventCardProps {
  title: string;
  slug?: string;
  time?: string;
  date?: string;
  location?: string;
  image: string;
}

const EventCard = ({
  title,
  image,
  location,
  time,
  date,
  slug,
}: EventCardProps) => {
  const handleClick = () => {
    posthog.capture("event_card_clicked", {
      event_title: title,
      event_slug: slug,
      event_location: location,
      event_date: date,
    });
  };

  return (
    <Link href={`/events/${slug}`} id="event-card" onClick={handleClick}>
      <div className="event-image-container">
        <Image
          className="poster"
          height={300}
          width={410}
          src={image}
          alt={title}
        />
        <div className="flex mt-2 flex-row gap-2 ">
          <Image src={"/icons/pin.svg"} alt="location" height={14} width={14} />
          <p className="text-sm">{location}</p>
        </div>
        <p className="title">{title}</p>
        <div className="datetime">
          <div className="mt-1">
            <Image
              src={"/icons/calendar.svg"}
              alt="date"
              height={14}
              width={14}
            />
            <span className="ml-2 text-sm">{date}</span>
          </div>
          <div className="mt-1">
            <Image src={"/icons/clock.svg"} alt="time" height={14} width={14} />
            <span className="ml-2 text-sm">{time}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
