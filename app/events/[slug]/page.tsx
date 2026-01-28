import EventCard from "@/components/EventCard";
import BookEvent from "@/components/form/BookEvent";
import { IEvent } from "@/database";
import { getSimilarEventsBySlug } from "@/lib/actions/events.actions";
import { Agent } from "http";
import Image from "next/image";
import { notFound } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailItem = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => {
  return (
    <div className="flex-row-gap-2 items-center">
      <Image src={icon} alt={alt} width={17} height={17} />
      <p>{label}</p>
    </div>
  );
};

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => {
  return (
    <div className="agenda">
      <h2 className="text-white">Agenda</h2>
      <ul>
        {agendaItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const EventTags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex flex-row-gap-2 flex-wrap">
      {tags.map((tag, index) => (
        <span key={index} className="pill">
          {tag}
        </span>
      ))}
    </div>
  );
};

const EventDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const request = await fetch(`${baseUrl}/api/events/${slug}`);
  const { event } = await request.json();

  if (!event) return notFound();

  const bookings = 10;

  const similarEventsBySlug: IEvent[] = await getSimilarEventsBySlug(slug);
  console.log(similarEventsBySlug, "similarEventsBySlug");

  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p>{event?.description}</p>
      </div>
      <div className="details">
        {/* Event Side */}
        <div className="content">
          <Image
            src={event?.image}
            alt={event?.title}
            width={800}
            height={800}
            className="banner"
          />
          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{event?.overview}</p>
          </section>
          <section className="flex-col-gap-2">
            <h2>Event Details</h2>
            <EventDetailItem
              icon="/icons/calendar.svg"
              alt="calendar"
              label={event?.date}
            />
            <EventDetailItem
              icon="/icons/clock.svg"
              alt="clock"
              label={event?.time}
            />
            <EventDetailItem
              icon="/icons/pin.svg"
              alt="location"
              label={event?.location}
            />
            <EventDetailItem
              icon="/icons/mode.svg"
              alt="mode"
              label={event?.mode}
            />
            <EventDetailItem
              icon="/icons/audience.svg"
              alt="audience"
              label={event?.audience}
            />
          </section>
          <EventAgenda agendaItems={event?.agenda} />
          <section className="flex-col-gap-2">
            <h2>About the Organizer</h2>
            <p>{event?.organizer}</p>
          </section>
          <EventTags tags={event?.tags} />
        </div>
        {/* Booking Side */}
        <aside className="booking">
          <div className="signup-card">
            <h2 className="text-white">Book Your Spot</h2>
            {bookings > 0 ? (
              <p className="text-sm">
                Join {bookings} people who have already booked their spot
              </p>
            ) : (
              <p>Be the first to book your spot!</p>
            )}

            <BookEvent />
          </div>
        </aside>
      </div>
      <div className="w-full flex pt-20 flex-col gap-4 ">
        <h2 className="text-white text-2xl font-bold">Similar Events</h2>
        <div className="events">
          {similarEventsBySlug &&
            similarEventsBySlug.length > 0 &&
            similarEventsBySlug.map((event: IEvent) => (
              <EventCard key={event.title} {...event} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default EventDetailPage;
