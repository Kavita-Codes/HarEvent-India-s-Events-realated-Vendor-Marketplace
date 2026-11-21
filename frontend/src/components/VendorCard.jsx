import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import {
  buildVendorDirectoryPath,
  getVendorCategoriesForEvent,
} from "../data/eventVendorCategories";

const easeOut = [0.22, 1, 0.36, 1];
const normalizeCategory = (category) =>
  category.toLowerCase().replace(/[^a-z0-9]/g, "");

const VendorCard = ({
  name,
  categoryLabel,
  description,
  image,
  imageAlt,
  index,
}) => {
  const { pathname } = useLocation();
  const pathSegments = pathname.split("/").filter(Boolean);
  const eventSlug = pathSegments[pathSegments.length - 1];
  const categories = getVendorCategoriesForEvent(eventSlug);
  const matchedCategory = categories.find(
    (category) => normalizeCategory(category) === normalizeCategory(name),
  );
  const vendorPath = buildVendorDirectoryPath(
    eventSlug,
    matchedCategory ? [matchedCategory] : [],
    categories,
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 34, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: easeOut }}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: easeOut } }}
      className="group relative flex flex-col overflow-hidden rounded-[15px] border border-[#F1DDE5] bg-white shadow-[0_3px_14px_rgba(71,34,52,0.04)] transition-[border-color,box-shadow] duration-300 hover:border-[#E9A0BA] hover:shadow-[0_18px_38px_rgba(71,34,52,0.16)] sm:min-h-[366px] lg:min-h-[376px]"
    >
      <span className="pointer-events-none absolute left-0 top-0 z-30 h-[3px] w-0 bg-gradient-to-r from-[#D4145A] to-[#FF7628] transition-[width] duration-[700ms] group-hover:w-full" />

      <div className="relative h-[186px] shrink-0 overflow-hidden bg-gradient-to-br from-[#FFF0F5] via-[#FFF8F2] to-[#FCE4EC] sm:h-[196px] lg:h-[206px]">
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
        />
        <span className="absolute left-4 top-4 rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.8px] text-[#D4145A] shadow-sm backdrop-blur-sm">
          {categoryLabel}
        </span>
        <span className="pointer-events-none absolute inset-0 overflow-hidden">
          <span className="absolute -left-full top-[-25%] h-[150%] w-[55%] rotate-[18deg] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-[left,opacity] duration-[1100ms] ease-out group-hover:left-[150%] group-hover:opacity-100" />
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-4 pb-5 pt-4 sm:px-5">
        <h3 className="w-full truncate text-left text-[18px] font-bold leading-[1.3] text-[#2E2230] transition-colors duration-300 group-hover:text-[#B41049]">
          {name}
        </h3>

        <p className="mt-2 min-h-[39px] w-full text-left text-[13px] leading-[1.5] text-[#7C6A74]">
          {description}
        </p>

        <div className="mt-auto flex justify-start pt-4">
          <Link
            to={vendorPath}
            aria-label={`Explore ${name} vendors`}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-[#D4145A] bg-white pl-4 pr-1.5 text-[13px] font-semibold text-[#D4145A] shadow-[0_5px_14px_rgba(212,20,90,0.12)] transition-colors duration-300 group-hover:border-transparent group-hover:bg-gradient-to-r group-hover:from-[#D4145A] group-hover:to-[#FF7628] group-hover:text-white hover:border-transparent hover:bg-gradient-to-r hover:from-[#D4145A] hover:to-[#FF7628] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4145A] active:scale-[0.97]"
          >
            Explore
            <span className="grid size-7 place-items-center rounded-full bg-[#FCE8EF] transition-colors duration-300 group-hover:bg-white/20">
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default VendorCard;
