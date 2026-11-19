import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getEventCategorySlug } from "../data/eventCategories";
import {
  buildVendorDirectoryPath,
  getVendorCategoriesForEvent,
} from "../data/eventVendorCategories";

export default function EventVendorChecklistModal({
  event,
  initialCategories,
  opener,
  onClose,
  onVisibilityChange,
}) {
  const eventSlug = getEventCategorySlug(event.name);
  const categories = getVendorCategoriesForEvent(eventSlug);
  const [selectedCategories, setSelectedCategories] = useState(
    () =>
      new Set(
        initialCategories
          ? categories.filter((category) => initialCategories.includes(category))
          : categories,
      ),
  );
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    onVisibilityChange?.(true);

    return () => {
      document.body.style.overflow = previousOverflow;
      onVisibilityChange?.(false);
      if (opener?.isConnected) opener.focus();
    };
  }, [onVisibilityChange, opener]);

  function toggleCategory(category) {
    setSelectedCategories((current) => {
      const next = new Set(current);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  }

  function handleDialogKeyDown(event) {
    if (event.key === "Escape") {
      onClose();
      return;
    }

    if (event.key !== "Tab") return;
    const focusableElements = dialogRef.current?.querySelectorAll(
      'button:not([disabled]), input:not([disabled])',
    );
    if (!focusableElements?.length) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  function findVendors() {
    navigate(
      buildVendorDirectoryPath(
        eventSlug,
        [...selectedCategories],
        categories,
      ),
    );
    onClose();
  }

  const EventIcon = event.icon;
  const allSelected = selectedCategories.size === categories.length;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[#21151f]/60 p-3 backdrop-blur-[3px] sm:p-6"
      onMouseDown={(mouseEvent) => {
        if (mouseEvent.target === mouseEvent.currentTarget) onClose();
      }}
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-vendor-dialog-title"
        aria-describedby="event-vendor-dialog-description"
        onKeyDown={handleDialogKeyDown}
        className="flex max-h-[min(88vh,820px)] w-full max-w-[920px] flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_28px_90px_rgba(29,12,22,0.3)]"
      >
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-[#F1E7EB] px-5 py-5 sm:px-8 sm:py-6">
          <div className="flex min-w-0 items-start gap-3">
            <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D4145A] to-[#FF7628] text-white shadow-[0_7px_18px_rgba(212,20,90,0.2)]">
              <EventIcon size={20} />
            </span>
            <div className="min-w-0">
              <p className="mb-1 text-[11px] font-bold uppercase tracking-[1.4px] text-[#D4145A]">
                Build your event checklist
              </p>
              <h2
                id="event-vendor-dialog-title"
                className="font-playfair text-[25px] font-bold leading-tight text-[#30232B] sm:text-[30px]"
              >
                {event.name} vendors
              </h2>
              <p
                id="event-vendor-dialog-description"
                className="mt-1 text-sm leading-6 text-[#81717A] sm:text-[15px]"
              >
                Select the services you need. We’ll show matching vendors next.
              </p>
            </div>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close vendor checklist"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-[#78646E] transition hover:bg-[#FFF0F5] hover:text-[#D4145A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4145A]"
          >
            <X size={20} />
          </button>
        </header>

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex shrink-0 items-center justify-between gap-3 px-5 pb-3 pt-4 sm:px-8 sm:pt-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-[#493640]">
              Choose vendor categories
            </p>
            <span
              aria-live="polite"
              className="shrink-0 rounded-full bg-[#FFF1F5] px-3 py-1 text-xs font-semibold text-[#B41049]"
            >
              {selectedCategories.size} of {categories.length} selected
            </span>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-5 sm:px-8">
            <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => {
                const isSelected = selectedCategories.has(category);
                const inputId = `${eventSlug}-${category
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")}`;

                return (
                  <label
                    key={category}
                    htmlFor={inputId}
                    className={`flex min-h-[58px] cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-3 transition duration-200 ${
                      isSelected
                        ? "border-[#F0A2BC] bg-[#FFF7FA] shadow-[0_3px_12px_rgba(212,20,90,0.06)]"
                        : "border-[#EEE7EA] bg-white hover:border-[#E9B3C5] hover:bg-[#FFFBFC]"
                    }`}
                  >
                    <input
                      id={inputId}
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleCategory(category)}
                      className="peer sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={`grid h-[19px] w-[19px] shrink-0 place-items-center rounded-[5px] border transition ${
                        isSelected
                          ? "border-[#D4145A] bg-[#D4145A] text-white"
                          : "border-[#CDBFC5] bg-white text-transparent"
                      } peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#D4145A]`}
                    >
                      <Check size={13} strokeWidth={3} />
                    </span>
                    <span className="min-w-0 flex-1 text-[13px] font-medium leading-5 text-[#43343D] sm:text-sm">
                      {category}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <footer className="flex shrink-0 flex-col-reverse gap-3 border-t border-[#F1E7EB] bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <button
              type="button"
              onClick={() =>
                setSelectedCategories(
                  allSelected ? new Set() : new Set(categories),
                )
              }
              className="inline-flex h-11 items-center justify-center rounded-xl border border-[#E8DCE1] px-4 text-sm font-semibold text-[#574650] transition hover:border-[#D4145A] hover:text-[#D4145A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4145A]"
            >
              {allSelected ? "Deselect all" : "Select all"}
            </button>
            <button
              type="button"
              onClick={findVendors}
              disabled={selectedCategories.size === 0}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D4145A] to-[#F25B35] px-5 text-sm font-semibold text-white shadow-[0_7px_18px_rgba(212,20,90,0.2)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(212,20,90,0.26)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4145A] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0 sm:min-w-[190px]"
            >
              <Search size={16} />
              Find vendors
              <ArrowRight size={16} />
            </button>
          </footer>
        </div>
      </section>
    </div>
  );
}
