
import { Image as ImageIcon, MapPin, BriefcaseBusiness } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";

export const EASE_OUT = [0.22, 1, 0.36, 1];

export function VendorCard({
  vendor,
  index,
  locationLabel,
  showPricing = true,
  disableActionNavigation = false,
}) {
  const location = useLocation();
  const returnTo = `${location.pathname}${location.search}${location.hash}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 34, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: EASE_OUT }}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: EASE_OUT } }}
      className="group relative flex flex-col overflow-hidden rounded-[15px] border border-[#F1DDE5] bg-white shadow-[0_3px_14px_rgba(71,34,52,0.04)] transition-[border-color,box-shadow] duration-300 hover:border-[#E9A0BA] hover:shadow-[0_18px_38px_rgba(71,34,52,0.16)] sm:min-h-[408px]"
    >
      <span className="pointer-events-none absolute left-0 top-0 z-30 h-[3px] w-0 bg-gradient-to-r from-[#D4145A] to-[#FF7628] transition-[width] duration-[700ms] group-hover:w-full" />

      <div className="relative h-[186px] shrink-0 overflow-hidden bg-gradient-to-br from-[#FFF0F5] via-[#FFF8F2] to-[#FCE4EC] sm:h-[196px] lg:h-[206px]">
        <img
          src={vendor.portfolioImage}
          alt={vendor.imageAlt}
          loading="lazy"
          className="vendor-kb h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
        />

        <span className="pointer-events-none absolute inset-0 overflow-hidden">
          <span className="absolute -left-full top-[-25%] h-[150%] w-[55%] rotate-[18deg] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-[left,opacity] duration-[1100ms] ease-out group-hover:left-[150%] group-hover:opacity-100" />
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-4 pb-4 sm:px-5">
        {showPricing && (
          <div className="mt-3.5 flex items-center justify-between gap-3">
            <p className="flex items-baseline gap-1 text-[15px] font-bold leading-none text-[#382832]">
              {vendor.priceFrom}
              <span className="text-[11px] font-medium text-[#8A7580]">
                {vendor.priceNote}
              </span>
            </p>

            <p className="flex shrink-0 items-center gap-1 text-[12px] font-medium text-[#8A7580]">
              <MapPin size={13} className="shrink-0 text-[#D4145A]" />
              {locationLabel || vendor.location}
            </p>
          </div>
        )}

        <p className={`${showPricing ? "mt-2.5" : "mt-3.5"} truncate text-[11px] font-bold uppercase tracking-[0.8px] text-[#D4145A]`}>
          {vendor.category}
        </p>

        <h3 className="mt-1 truncate text-[17px] font-bold leading-[1.3] text-[#2E2230] transition-colors duration-300 group-hover:text-[#B41049]">
          {vendor.businessName}
        </h3>

        <p className="mt-1.5 line-clamp-2 min-h-[39px] text-[13px] leading-[1.5] text-[#7C6A74]">
          {vendor.description}
        </p>

        <div
          className={`${showPricing ? "mt-auto pt-2.5" : "mt-2 pt-1"} flex gap-2`}
        >
          {disableActionNavigation ? (
            <button
              type="button"
              className="inline-flex h-10 min-w-0 flex-1 items-center justify-center rounded-full bg-gradient-to-r from-[#D4145A] to-[#FF7628] px-3 text-[13px] font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-105 active:scale-[0.97]"
            >
              Send Inquiry
            </button>
          ) : (
            <Link
              to={vendor.inquiryUrl}
              state={{ returnTo }}
              className="inline-flex h-10 min-w-0 flex-1 items-center justify-center rounded-full bg-gradient-to-r from-[#D4145A] to-[#FF7628] px-3 text-[13px] font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-105 active:scale-[0.97]"
            >
              Send Inquiry
            </Link>
          )}

          {disableActionNavigation ? (
            <button
              type="button"
              className="inline-flex h-10 min-w-0 flex-1 items-center justify-center rounded-full border border-[#F3DFC8] bg-[#FFF4E4] px-3 text-[13px] font-semibold text-[#3A2B33] transition hover:border-[#E6C48F] hover:bg-[#FFEEDA] active:scale-[0.97]"
            >
              View Profile
            </button>
          ) : (
            <Link
              to={vendor.profileUrl}
              className="inline-flex h-10 min-w-0 flex-1 items-center justify-center rounded-full border border-[#F3DFC8] bg-[#FFF4E4] px-3 text-[13px] font-semibold text-[#3A2B33] transition hover:border-[#E6C48F] hover:bg-[#FFEEDA] active:scale-[0.97]"
            >
              View Profile
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function EmptyVendorCard({ category }) {
  const location = useLocation();
  const returnTo = `${location.pathname}${location.search}${location.hash}`;
  const isAll = category === "All";

  return (
    <article className="flex flex-col overflow-hidden rounded-[15px] border border-[#F1DDE5] bg-white shadow-[0_3px_14px_rgba(71,34,52,0.04)] sm:min-h-[408px]">
      <div className="flex h-[186px] shrink-0 items-center justify-center bg-gradient-to-br from-[#FFF0F5] via-[#FFF8F2] to-[#FCE4EC] text-[#D4145A]/50 sm:h-[196px] lg:h-[206px]">
        {isAll ? (
          <BriefcaseBusiness size={28} strokeWidth={1.5} />
        ) : (
          <ImageIcon size={28} strokeWidth={1.5} />
        )}
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-4 pb-4">
        <p className="mb-2.5 mt-3.5 truncate text-[11px] font-bold uppercase tracking-[0.8px] text-[#D4145A]">
          {isAll ? "Vendor Portfolio" : category}
        </p>

        <h3 className="mt-1 truncate text-[15px] font-bold leading-[1.3] text-[#382832]">
          Vendor listing coming soon
        </h3>

        <p className="mt-1.5 line-clamp-2 min-h-[39px] text-[13px] leading-[1.5] text-[#8A7580]">
          Business details and portfolio will appear when available.
        </p>

        <div className="mt-auto flex gap-2">
          <Link
            to="/enquiry"
            state={{ returnTo }}
            className="inline-flex h-10 min-w-0 flex-1 items-center justify-center rounded-full bg-gradient-to-r from-[#D4145A] to-[#FF7628] px-3 text-[13px] font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4145A] active:scale-[0.97]"
          >
            Send Inquiry
          </Link>

          <Link
            to="/vendor-categories"
            className="inline-flex h-10 min-w-0 flex-1 items-center justify-center rounded-full border border-[#F3DFC8] bg-[#FFF4E4] px-3 text-[13px] font-semibold text-[#3A2B33] transition hover:border-[#E6C48F] hover:bg-[#FFEEDA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4145A] active:scale-[0.97]"
          >
            View Profile
          </Link>
        </div>
      </div>
    </article>
  );
}
