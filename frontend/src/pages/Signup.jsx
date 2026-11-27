import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  UserRound,
  Store,
  ChevronDown,
  Check,
} from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  digitsOnly,
  hasErrors,
  validateSignupForm,
} from "../utils/validation";

const serviceOptions = [
  "Photography & Videography",
  "Wedding & Event Decor",
  "Venues & Banquets",
  "Catering Services",
  "Makeup & Styling",
  "DJ & Entertainment",
  "Other",
];

function Signup() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedForm = searchParams.get("form");
  const vendorMode = requestedForm === "vendor";

  useEffect(() => {
    if (requestedForm !== "customer" && requestedForm !== "vendor") {
      setSearchParams({ form: "customer" }, { replace: true });
    }
  }, [requestedForm, setSearchParams]);

  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [city, setCity] = useState("");
  const [serviceCategory, setServiceCategory] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const fieldClass = vendorMode
    ? "flex h-9 w-full min-w-0 items-center gap-2 rounded-lg border bg-[#FFFAFC] px-3 focus-within:border-2"
    : "flex h-10 w-full min-w-0 items-center gap-2 rounded-lg border bg-[#FFFAFC] px-3 focus-within:border-2";
  const inputClass =
    "w-full min-w-0 bg-transparent text-xs outline-none placeholder:text-[#B3A3AA]";

  function fieldBorder(hasError) {
    return hasError
      ? "border-red-500 focus-within:border-red-500"
      : "border-[#EED5DF] focus-within:border-[#D4145A]";
  }

  function switchMode(nextMode) {
    setSearchParams({ form: nextMode }, { replace: true });
    setCategoryOpen(false);
    setErrors({});
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validateSignupForm({
      fullName,
      email,
      phone,
      password,
      vendorMode,
      businessName,
      city,
      serviceCategory,
      acceptTerms,
    });

    if (vendorMode && !city.trim()) {
      nextErrors.city = "City is required.";
    }

    setErrors(nextErrors);
    if (hasErrors(nextErrors)) {
      if (vendorMode && nextErrors.serviceCategory) setCategoryOpen(true);
      return;
    }

    navigate("/verify-otp", {
      state: {
        purpose: "signup",
        role: vendorMode ? "vendor" : "customer",
        phone,
      },
    });
  }

  return (
    <main
      className={`flex min-h-screen w-full items-center justify-center bg-[#FFFAFC] font-poppins ${
        vendorMode ? "p-2.5 sm:p-3" : "p-4 sm:p-6"
      }`}
    >
      <div
        className={`flex w-full overflow-hidden rounded-[24px] bg-white shadow-[0_24px_60px_rgba(55,25,40,0.16)] ${
          vendorMode ? "max-w-[860px]" : "max-w-[900px]"
        }`}
      >
        <div
          className={`relative hidden overflow-hidden transition-colors duration-500 lg:block lg:w-[34%] ${
            vendorMode
              ? "bg-gradient-to-br from-[#A80F46] to-[#FF7628]"
              : "bg-gradient-to-br from-[#D4145A] to-[#FF7628]"
          }`}
        >
          <div className="absolute inset-0 bg-black/5" />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-7 text-center text-white">
            <img
              src="/logoForm.jpeg"
              alt="HarEvent"
              className={`rounded-2xl bg-white/95 object-contain p-2 shadow-lg ${
                vendorMode ? "mb-5 h-20 w-20" : "mb-7 h-24 w-24"
              }`}
            />

            <h2
              className={`font-playfair font-bold leading-tight ${
                vendorMode ? "text-2xl" : "text-3xl"
              }`}
            >
              {vendorMode
                ? "Grow Your Event Business"
                : "Every Celebration Starts Here"}
            </h2>

            <p
              className={`max-w-[240px] text-sm leading-6 text-white/90 ${
                vendorMode ? "mt-3" : "mt-4"
              }`}
            >
              {vendorMode
                ? "Connect with customers and showcase your services with HarEvent."
                : "Discover trusted professionals and bring your special occasions to life."}
            </p>

            <div
              className={`h-1 w-16 rounded-full bg-white/80 ${
                vendorMode ? "mt-6" : "mt-8"
              }`}
            />
          </div>

          <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full border border-white/15" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full border border-white/15" />
        </div>

        <div
          className={`flex w-full flex-col justify-center px-5 sm:px-9 lg:w-[66%] lg:px-10 ${
            vendorMode ? "py-3.5" : "py-7"
          }`}
        >
          <div className="mx-auto w-full max-w-[520px]">
            <div
              className={`relative flex items-center justify-center ${
                vendorMode ? "mb-2 min-h-[44px]" : "mb-4 min-h-[64px]"
              }`}
            >
              <Link
                to="/"
                className="absolute left-0 top-1/2 inline-flex -translate-y-1/2 items-center gap-1.5 text-xs font-medium text-[#78646E] transition hover:text-[#D4145A]"
              >
                <ArrowLeft size={15} />
                Back
              </Link>

              <Link to="/" aria-label="HarEvent Home">
                <img
                  src="/logoForm.jpeg"
                  alt="HarEvent"
                  className={`object-contain ${
                    vendorMode ? "h-11 w-11" : "h-16 w-16"
                  }`}
                />
              </Link>
            </div>

            <div className={vendorMode ? "mb-2" : "mb-3"}>
              <p className="text-[9px] font-bold uppercase tracking-[1.5px] text-[#D4145A]">
                {vendorMode ? "Vendor Portal" : "Customer Portal"}
              </p>

              <h1
                className={`font-playfair font-bold tracking-tight text-[#30232B] ${
                  vendorMode ? "mt-0.5 text-xl" : "mt-1 text-xl sm:text-2xl"
                }`}
              >
                {vendorMode ? "Join as a Vendor" : "Create an account"}
              </h1>
            </div>

            <div
              className={`grid grid-cols-2 rounded-xl bg-[#F3F5F9] p-1 ${
                vendorMode ? "mb-2.5" : "mb-4"
              }`}
            >
              {[
                { value: "customer", label: "Customer", icon: UserRound },
                { value: "vendor", label: "Vendor", icon: Store },
              ].map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={(value === "vendor") === vendorMode}
                  onClick={() => switchMode(value)}
                  className={`flex items-center justify-center gap-2 rounded-lg px-3 text-xs font-semibold transition ${
                    vendorMode ? "py-2" : "py-2.5"
                  } ${
                    ((value === "vendor") === vendorMode)
                      ? "bg-white text-[#D4145A] shadow-sm"
                      : "text-[#718096] hover:text-[#493640]"
                  }`}
                >
                  <Icon size={15} /> {label}
                </button>
              ))}
            </div>

            <p
              className={`text-xs text-[#8A7580] ${
                vendorMode ? "mb-2.5 leading-4" : "mb-4 leading-5"
              }`}
            >
              {vendorMode
                ? "Enter your business details to start receiving client leads."
                : "It only takes a moment to get started with your planning."}
            </p>

            <form
              onSubmit={handleSubmit}
              noValidate
              className={`grid w-full grid-cols-1 gap-x-3 sm:grid-cols-2 ${
                vendorMode ? "gap-y-2" : "gap-y-3"
              }`}
            >
              <div>
                <label className="mb-0.5 block text-[11px] font-semibold text-[#493640]">
                  Full Name
                </label>
                <div className={`${fieldClass} ${fieldBorder(errors.fullName)}`}>
                  <UserRound size={15} className="shrink-0 text-[#D4145A]" />
                  <input
                    name="fullName"
                    autoComplete="name"
                    value={fullName}
                    onChange={(event) => {
                      setFullName(event.target.value);
                      setErrors((current) => ({ ...current, fullName: "" }));
                    }}
                    placeholder="e.g. Priya Sharma"
                    className={inputClass}
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-0.5 text-[10px] text-red-600">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="mb-0.5 block text-[11px] font-semibold text-[#493640]">
                  Email Address
                </label>
                <div className={`${fieldClass} ${fieldBorder(errors.email)}`}>
                  <Mail size={15} className="shrink-0 text-[#D4145A]" />
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setErrors((current) => ({ ...current, email: "" }));
                    }}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>
                {errors.email && (
                  <p className="mt-0.5 text-[10px] text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="mb-0.5 block text-[11px] font-semibold text-[#493640]">
                  Phone Number
                </label>
                <div className={`${fieldClass} ${fieldBorder(errors.phone)}`}>
                  <Phone size={15} className="shrink-0 text-[#D4145A]" />
                  <input
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(event) => {
                      setPhone(digitsOnly(event.target.value).slice(0, 10));
                      setErrors((current) => ({ ...current, phone: "" }));
                    }}
                    placeholder="9876543210"
                    className={inputClass}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-0.5 text-[10px] text-red-600">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="mb-0.5 block text-[11px] font-semibold text-[#493640]">
                  Password
                </label>
                <div className={`${fieldClass} ${fieldBorder(errors.password)}`}>
                  <LockKeyhole size={15} className="shrink-0 text-[#D4145A]" />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setErrors((current) => ({ ...current, password: "" }));
                    }}
                    placeholder="At least 8 characters"
                    className={inputClass}
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((visible) => !visible)}
                    className="shrink-0 text-[#8A7580] transition hover:text-[#D4145A]"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-0.5 text-[10px] text-red-600">{errors.password}</p>
                )}
              </div>

              {vendorMode && (
                <>
                  <div className="grid grid-cols-1 gap-3 sm:col-span-2 sm:grid-cols-2">
                    <div>
                      <label className="mb-0.5 block text-[11px] font-semibold text-[#493640]">
                        Business Name
                      </label>
                      <div
                        className={`${fieldClass} ${fieldBorder(errors.businessName)}`}
                      >
                        <Store size={15} className="shrink-0 text-[#D4145A]" />
                        <input
                          name="businessName"
                          autoComplete="organization"
                          value={businessName}
                          onChange={(event) => {
                            setBusinessName(event.target.value);
                            setErrors((current) => ({
                              ...current,
                              businessName: "",
                            }));
                          }}
                          placeholder="Your business name"
                          className={inputClass}
                        />
                      </div>
                      {errors.businessName && (
                        <p className="mt-0.5 text-[10px] text-red-600">
                          {errors.businessName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-0.5 block text-[11px] font-semibold text-[#493640]">
                        City
                      </label>
                      <div className={`${fieldClass} ${fieldBorder(errors.city)}`}>
                        <MapPin size={15} className="shrink-0 text-[#D4145A]" />
                        <input
                          name="city"
                          autoComplete="address-level2"
                          value={city}
                          onChange={(event) => {
                            setCity(event.target.value);
                            setErrors((current) => ({ ...current, city: "" }));
                          }}
                          placeholder="e.g. Mumbai"
                          className={inputClass}
                        />
                      </div>
                      {errors.city && (
                        <p className="mt-0.5 text-[10px] text-red-600">
                          {errors.city}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="relative sm:col-span-2">
                    <label className="mb-0.5 block text-[11px] font-semibold text-[#493640]">
                      Service Category
                    </label>

                    <button
                      type="button"
                      aria-haspopup="listbox"
                      aria-expanded={categoryOpen}
                      onClick={() => {
                        setCategoryOpen((open) => !open);
                        setErrors((current) => ({
                          ...current,
                          serviceCategory: "",
                        }));
                      }}
                      className={`flex h-9 w-full items-center justify-between rounded-lg border-2 bg-[#FFFAFC] px-3 text-left text-xs outline-none transition ${
                        errors.serviceCategory
                          ? "border-red-500"
                          : "border-[#D4145A] hover:bg-[#FFF1F5] focus:ring-2 focus:ring-[#D4145A]/20"
                      }`}
                    >
                      <span
                        className={
                          serviceCategory ? "text-[#493640]" : "text-[#8A7580]"
                        }
                      >
                        {serviceCategory || "Select category"}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`text-[#D4145A] transition-transform ${
                          categoryOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {errors.serviceCategory && (
                      <p className="mt-0.5 text-[10px] text-red-600">
                        {errors.serviceCategory}
                      </p>
                    )}

                    {categoryOpen && (
                      <>
                        <button
                          type="button"
                          aria-label="Close service category menu"
                          className="fixed inset-0 z-20 cursor-default"
                          onClick={() => setCategoryOpen(false)}
                        />

                        <div
                          role="listbox"
                          aria-label="Service Category"
                          className="absolute left-0 right-0 top-full z-30 mt-1 max-h-44 overflow-y-auto rounded-lg border border-[#F1DDE5] bg-white py-1 shadow-[0_12px_30px_rgba(55,25,40,0.18)]"
                        >
                          {serviceOptions.map((option) => {
                            const selected = serviceCategory === option;

                            return (
                              <button
                                key={option}
                                type="button"
                                role="option"
                                aria-selected={selected}
                                onClick={() => {
                                  setServiceCategory(option);
                                  setCategoryOpen(false);
                                  setErrors((current) => ({
                                    ...current,
                                    serviceCategory: "",
                                  }));
                                }}
                                className={`flex min-h-8 w-full items-center justify-between px-3 py-1.5 text-left text-xs transition-colors ${
                                  selected
                                    ? "bg-gradient-to-r from-[#D4145A] to-[#FF7628] font-semibold text-white"
                                    : "text-[#493640] hover:bg-gradient-to-r hover:from-[#D4145A] hover:to-[#FF7628] hover:text-white"
                                }`}
                              >
                                <span>{option}</span>
                                {selected && <Check size={14} />}
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}

              <label
                className={`flex cursor-pointer items-start gap-2 text-[10px] leading-4 text-[#78646E] sm:col-span-2 ${
                  vendorMode ? "pt-0.5" : "pt-1"
                }`}
              >
                <input
                  name="acceptTerms"
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(event) => {
                    setAcceptTerms(event.target.checked);
                    setErrors((current) => ({ ...current, acceptTerms: "" }));
                  }}
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-[#D4145A]"
                />
                <span>
                  I agree to the{" "}
                  <Link to="/terms" className="underline">
                    Terms
                  </Link>{" "}
                  &amp;{" "}
                  <Link to="/privacy-policy" className="underline">
                    Privacy Policy
                  </Link>
                  .
                  {errors.acceptTerms && (
                    <span className="mt-0.5 block text-[10px] text-red-600">
                      {errors.acceptTerms}
                    </span>
                  )}
                </span>
              </label>

              <button
                type="submit"
                className={`flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#D4145A] to-[#FF7628] text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-105 sm:col-span-2 ${
                  vendorMode ? "h-9" : "h-10"
                }`}
              >
                {vendorMode ? "Create Vendor Account" : "Create Account"}
              </button>
            </form>

            <p
              className={`text-center text-xs text-[#78646E] ${
                vendorMode ? "mt-2.5" : "mt-4"
              }`}
            >
              Already have an account?{" "}
              <Link
                to={vendorMode ? "/?form=vendor" : "/?form=customer"}
                className="font-semibold text-[#D4145A] hover:text-[#A80F46] hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Signup;