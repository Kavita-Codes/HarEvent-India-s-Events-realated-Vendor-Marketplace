import { CalendarDays, MapPin } from "lucide-react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { getVendorListingBySlug } from "../data/vendorListings";

export default function VendorProfile() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const vendor = getVendorListingBySlug(slug);

  if (!vendor) {
    return <Navigate to="/vendor-categories" replace />;
  }

  const eventName = searchParams.get("event");
  const enquiryHref = `/enquiry?vendor=${encodeURIComponent(vendor.businessName)}&category=${encodeURIComponent(vendor.category)}${eventName ? `&event=${encodeURIComponent(eventName)}` : ""}`;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#fffaf6] font-poppins text-[#30232B]">
        <section className="mx-auto max-w-[1180px] px-5 py-10 sm:px-8 sm:py-14">
          <Link
            to={eventName ? `/event-categories/${eventName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}` : "/"}
            className="text-[14px] font-semibold uppercase tracking-[0.1em] text-[#B70D45] hover:text-[#D4145A]"
          >
            {eventName ? `Back to ${eventName}` : "Featured vendors"}
          </Link>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.55fr_1fr]">
            <article className="overflow-hidden rounded-xl border border-[#eadfd4] bg-white shadow-[0_8px_24px_rgba(54,29,39,0.07)]">
              <img
                src={vendor.portfolioImage}
                alt={vendor.imageAlt}
                className="h-[280px] w-full object-cover sm:h-[420px]"
              />
              <div className="p-6 sm:p-8">
                <p className="text-[14px] font-bold uppercase tracking-[0.14em] text-[#D4145A]">
                  {vendor.category}
                </p>
                <h1 className="mt-2 font-poppins text-[30px] font-bold leading-tight text-[#243B5A] sm:text-[40px]">
                  {vendor.businessName}
                </h1>
                <p className="mt-3 text-[14px] leading-6 text-[#756871]">
                  {vendor.description}
                </p>
                <p className="mt-4 flex items-center gap-2 text-[14px] font-medium text-[#756871]">
                  <MapPin size={15} className="text-[#D4145A]" />
                  {vendor.location}
                </p>
                <div className="mt-7 border-t border-[#eee5d9] pt-6">
                  <h2 className="text-[15px] font-bold text-[#243B5A]">
                    Services offered
                  </h2>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {vendor.services.map((service) => (
                      <li
                        key={service}
                        className="rounded-md bg-[#fff8f1] px-4 py-3 text-[14px] font-medium text-[#51434B]"
                      >
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>

            <aside className="h-fit rounded-xl border border-[#eadfd4] bg-white p-6 shadow-[0_8px_24px_rgba(54,29,39,0.07)] sm:p-7">
              <p className="text-[14px] font-bold uppercase tracking-[0.12em] text-[#D4145A]">
                Starting price
              </p>
              <p className="mt-2 text-[24px] font-bold text-[#243B5A]">
                {vendor.priceFrom}
                <span className="ml-1 text-[14px] font-medium text-[#756871]">
                  {vendor.priceNote}
                </span>
              </p>
              <p className="mt-2 text-[14px] leading-6 text-[#756871]">
                Final quote may vary based on your event date, guest count, and
                selected services.
              </p>
              <Link
                to={enquiryHref}
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#D4145A] to-[#FF7628] px-5 text-[14px] font-bold uppercase tracking-[0.06em] text-white transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(212,20,90,0.25)]"
              >
                <CalendarDays size={16} />
                Book now
              </Link>
              <Link
                to={enquiryHref}
                className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-md border border-[#eadfd4] px-5 text-[14px] font-semibold text-[#51434B] transition hover:border-[#D4145A] hover:text-[#D4145A]"
              >
                Request a quote
              </Link>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
