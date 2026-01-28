import { IEvent } from "@/database";
import EventBtn from "../components/EventBtn";
import EventCard from "../components/EventCard";
import { cacheLife } from "next/cache";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const page = async () => {
  "use cache";
  cacheLife("hours");
  const response = await fetch(`${baseUrl}/api/events`);
  const data = await response.json();

  return (
    <section>
      <h1 className="text-center">
        The Hub for Every Dev <br /> Event You Can't Miss
      </h1>
      <p className="text-center text-white mt-5">
        Hackathons, Meetups and Conferences All in One Place
      </p>

      <EventBtn />

      <div className="mt-20 space-y-7">
        <h3 className="text-white">Featured Events</h3>
        <ul className="events">
          {data && data?.events?.length > 0 ? (
            data?.events?.map((event: IEvent) => (
              <li key={event.title} className="list-none">
                <EventCard {...event} />
              </li>
            ))
          ) : (
            <li>No events found</li>
          )}
        </ul>
      </div>
    </section>
  );
};

export default page;
