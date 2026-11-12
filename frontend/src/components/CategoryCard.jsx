import { Heart } from "lucide-react";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";

export default function CategoryCard({
  category,
  index = 0,
  bookingHref,
  detailLabel = "Explore details",
  priceLabel,
  priceNote,
}) {
  const reducedMotion = useReducedMotion();
  const [saved, setSaved] = useState(false);

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.48,
        delay: reducedMotion ? 0 : (index % 6) * 0.045,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative flex min-w-0 flex-col overflow-hidden rounded-xl border border-[#e9dfd4] bg-white shadow-[0_8px_24px_rgba(54,29,39,0.07)] transition duration-300 hover:-translate-y-1 hover:border-[#d7bd9a] hover:shadow-[0_18px_38px_rgba(54,29,39,0.14)]"
    >
      <Link
        to={category.href}
        aria-label={`View ${category.name} details`}
        className="group flex flex-1 flex-col outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D4145A]"
      >
        <div className="relative h-[205px] shrink-0 overflow-hidden bg-[#efe5d6]">
          <img
            src={category.image}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#172b3b]/70 via-transparent to-transparent" />
          {category.metaLabel && (
            <span className="absolute bottom-3 left-4 text-[14px] font-semibold uppercase tracking-[0.12em] text-white">
              {category.metaLabel}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5 font-poppins">
          <h3 className="font-poppins text-[18px] font-bold leading-tight text-[#243B5A] transition-colors group-hover:text-[#D4145A]">
            {category.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-[14px] leading-6 text-[#756871]">
            {category.description}
          </p>
          {category.specialties?.length > 0 && (
            <p className="mt-3 line-clamp-1 border-t border-[#eee5d9] pt-3 text-[14px] leading-5 text-[#756871]">
              {category.specialties
                .slice(0, 3)
                .map((specialty) => specialty.name)
                .join("  ·  ")}
              {category.specialties.length > 3 &&
                `  +${category.specialties.length - 3} more`}
            </p>
          )}
          <span className="mt-auto pt-5 text-[14px] font-semibold text-[#D4145A]">
            {detailLabel}
          </span>
        </div>
      </Link>

      {bookingHref && (
        <div className="flex items-center justify-between gap-3 border-t border-[#eee5d9] bg-[#fff9f3] px-5 py-4">
          <div>
            <p className="text-[14px] font-semibold uppercase tracking-[0.08em] text-[#756871]">
              Starting price
            </p>
            <p className="mt-1 text-[18px] font-bold leading-tight text-[#30232B]">
              {priceLabel ?? "Price on request"}
            </p>
            {priceNote && (
              <p className="mt-0.5 text-[14px] text-[#756871]">{priceNote}</p>
            )}
          </div>
          <Link
            to={bookingHref}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-gradient-to-r from-[#D4145A] to-[#FF7628] px-4 text-[14px] font-bold text-white transition hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(212,20,90,0.22)]"
          >
            Book now
          </Link>
        </div>
      )}

      <button
        type="button"
        aria-label={`${saved ? "Remove" : "Add"} ${category.name} ${saved ? "from" : "to"} wishlist`}
        aria-pressed={saved}
        onClick={() => setSaved((value) => !value)}
        className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-md border shadow-sm backdrop-blur-sm transition ${
          saved
            ? "border-[#D4145A] bg-[#D4145A] text-white"
            : "border-white/75 bg-white/90 text-[#243B5A] hover:border-[#D4145A] hover:text-[#D4145A]"
        }`}
      >
        <Heart size={17} fill={saved ? "currentColor" : "none"} />
      </button>
    </motion.article>
  );
}
