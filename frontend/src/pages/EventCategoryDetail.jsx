import { ArrowLeft, ArrowRight, CalendarHeart } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { eventGroups, eventSlugify } from "./EventCategories";

export default function EventCategoryDetail() {
  const { slug } = useParams();
  const group = eventGroups.find((item) =>
    item.events.some((event) => eventSlugify(event.name) === slug),
  );
  const event = group?.events.find((item) => eventSlugify(item.name) === slug);

  if (!event || !group) {
    return <Navigate to="/event-categories" replace />;
  }

  const enquiryUrl = `/enquiry?category=${encodeURIComponent(event.name)}&vendor=${encodeURIComponent(event.name)}`;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white font-poppins text-[#30232B]">
        <section className="relative isolate flex min-h-[360px] items-center overflow-hidden bg-[#21151f] px-5 py-14 text-white sm:min-h-[420px] sm:px-8 lg:px-14">
          <img
            src={event.image}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-black/55" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#21151d]/65 via-[#21151d]/35 to-transparent" />
          <div className="mx-auto w-full max-w-[1280px]">
            <Link
              to="/event-categories"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-white/85 transition hover:text-white"
            >
              <ArrowLeft size={16} />
              All event categories
            </Link>
            <p className="mt-8 text-[14px] font-semibold uppercase tracking-[0.16em] text-[#ffd4b8]">
              {group.title}
            </p>
            <h1 className="mt-3 max-w-[760px] font-playfair text-[42px] font-bold leading-tight sm:text-[56px]">
              {event.name}
            </h1>
            <p className="mt-4 max-w-[650px] text-[16px] leading-7 text-white/90">
              {event.description}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
          <div className="grid gap-8 rounded-[22px] border border-[#f0e5dc] bg-[#fffaf6] p-6 sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-[#D4145A] to-[#FF7628] text-white">
                <CalendarHeart size={20} />
              </span>
              <h2 className="mt-4 font-playfair text-[26px] font-bold sm:text-[32px]">
                Plan your {event.name}
              </h2>
              <p className="mt-2 max-w-[700px] text-[14px] leading-6 text-[#756871] sm:text-[16px]">
                Share what you have in mind and connect with vendors for your
                {` ${event.name.toLowerCase()}`}.
              </p>
            </div>
            <Link
              to={enquiryUrl}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#D4145A] to-[#FF7628] px-6 text-[14px] font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-105 sm:text-[16px]"
            >
              Start an enquiry
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
