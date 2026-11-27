import { useEffect, useState } from "react";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  digitsOnly,
  hasErrors,
  validateForgotPasswordForm,
} from "../utils/validation";

function getFallbackValidationError(method, rawValue) {
  const trimmed = rawValue.trim();

  if (!trimmed) {
    return method === "email"
      ? "Please enter your registered email address."
      : "Please enter your 10-digit phone number.";
  }

  if (method === "email") {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailPattern.test(trimmed)) {
      return "Please enter a valid email address.";
    }
  } else {
    const phoneDigits = digitsOnly(trimmed);
    if (phoneDigits.length !== 10) {
      return "Please enter a valid 10-digit phone number.";
    }
  }

  return "";
}

function ForgotPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const initialRole = location.state?.role === "vendor" ? "vendor" : "customer";
  const loginTarget =
    typeof location.state?.from === "string" && location.state.from.startsWith("/")
      ? location.state.from
      : `/?form=${initialRole}`;

  const [method, setMethod] = useState(
    location.state?.method === "phone" ? "phone" : "email"
  );
  const [value, setValue] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location.state?.method === "phone" || location.state?.method === "email") {
      setMethod(location.state.method);
    }
  }, [location.state?.method]);

  const fieldClass =
    "flex h-12 w-full items-center gap-2 rounded-lg border bg-[#FFFAFC] px-3 focus-within:border-2";
  const inputClass =
    "w-full bg-transparent text-sm outline-none placeholder:text-[#B3A3AA]";

  function handleSubmit(event) {
    event.preventDefault();

    const cleanedValue =
      method === "phone" ? digitsOnly(value).slice(0, 10) : value.trim();

    const nextErrors =
      typeof validateForgotPasswordForm === "function"
        ? { ...(validateForgotPasswordForm({ method, value: cleanedValue }) || {}) }
        : {};

    const fallbackError = getFallbackValidationError(method, cleanedValue);
    if (!nextErrors.value && fallbackError) {
      nextErrors.value = fallbackError;
    }

    setErrors(nextErrors);
    if (hasErrors(nextErrors) || Boolean(nextErrors.value)) return;

    navigate("/verify-otp", {
      state: {
        purpose: "reset",
        role: initialRole,
        method,
        value: cleanedValue,
        phone: method === "phone" ? cleanedValue : "",
        email: method === "email" ? cleanedValue : "",
        from: loginTarget,
      },
    });
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#FFFAFC] p-4 font-poppins sm:p-6">
      <div className="flex w-full max-w-[900px] overflow-hidden rounded-[24px] bg-white shadow-[0_24px_60px_rgba(55,25,40,0.16)]">
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#A80F46] to-[#FF7628] lg:block lg:w-[34%]">
          <div className="absolute inset-0 bg-black/5" />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-7 text-center text-white">
            <img
              src="/logoForm.jpeg"
              alt="HarEvent"
              className="mb-7 h-24 w-24 rounded-2xl bg-white/95 object-contain p-2 shadow-lg"
            />

            <h2 className="font-playfair text-3xl font-bold leading-tight">
              Forgot Your Password?
            </h2>

            <p className="mt-4 max-w-[240px] text-base leading-7 text-white/90">
              Don&apos;t worry! We&apos;ll help you get back to managing your
              event business.
            </p>

            <div className="mt-8 h-1 w-16 rounded-full bg-white/80" />
          </div>
        </div>

        <div className="flex w-full flex-col justify-center px-5 py-7 sm:px-9 lg:w-[66%] lg:px-10">
          <div className="mx-auto w-full max-w-[520px]">
            <div className="relative mb-5 flex min-h-[64px] items-center justify-center">
              <button
                type="button"
                onClick={()=>navigate("/")}
                className="absolute left-0 top-1/2 inline-flex -translate-y-1/2 items-center gap-1.5 text-sm font-medium text-[#78646E] transition hover:text-[#D4145A]"
              >
                <ArrowLeft size={16} />
                Back
              </button>

              <Link to="/" aria-label="HarEvent Home">
                <img
                  src="/logoForm.jpeg"
                  alt="HarEvent"
                  className="h-16 w-16 object-contain"
                />
              </Link>
            </div>

            <div className="mb-2">
              <p className="text-sm font-bold uppercase tracking-[1.5px] text-[#D4145A]">
                Account Recovery
              </p>

              <h1 className="mt-1 font-playfair text-2xl font-bold tracking-tight text-[#30232B]">
                Forgot Password
              </h1>
            </div>

            <p className="mb-6 text-base leading-7 text-[#8A7580]">
              Enter your registered email address or phone number. We&apos;ll
              help you reset your password.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#493640]">
                  Choose verification method
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setMethod("email");
                      setValue("");
                      setErrors({});
                    }}
                    className={`flex h-12 items-center justify-center gap-2 rounded-lg border text-sm font-medium transition ${
                      method === "email"
                        ? "border-[#D4145A] bg-[#FFF1F5] text-[#D4145A]"
                        : "border-[#EED5DF] bg-white text-[#78646E]"
                    }`}
                  >
                    <Mail size={17} />
                    Email
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMethod("phone");
                      setValue("");
                      setErrors({});
                    }}
                    className={`flex h-12 items-center justify-center gap-2 rounded-lg border text-sm font-medium transition ${
                      method === "phone"
                        ? "border-[#D4145A] bg-[#FFF1F5] text-[#D4145A]"
                        : "border-[#EED5DF] bg-white text-[#78646E]"
                    }`}
                  >
                    <Phone size={17} />
                    Phone
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="forgot-password-input"
                  className="mb-1 block text-sm font-semibold text-[#493640]"
                >
                  {method === "email"
                    ? "Registered Email Address"
                    : "Phone Number"}
                </label>

                <div
                  className={`${fieldClass} ${
                    errors.value
                      ? "border-red-500 focus-within:border-red-500"
                      : "border-[#EED5DF] focus-within:border-[#D4145A]"
                  }`}
                >
                  {method === "email" ? (
                    <Mail size={17} className="shrink-0 text-[#D4145A]" />
                  ) : (
                    <Phone size={17} className="shrink-0 text-[#D4145A]" />
                  )}

                  <input
                    id="forgot-password-input"
                    name={method === "email" ? "email" : "phone"}
                    type={method === "email" ? "email" : "tel"}
                    inputMode={method === "phone" ? "numeric" : "email"}
                    autoComplete={method === "email" ? "email" : "tel"}
                    maxLength={method === "phone" ? 10 : undefined}
                    value={value}
                    onChange={(event) => {
                      const nextValue =
                        method === "phone"
                          ? digitsOnly(event.target.value).slice(0, 10)
                          : event.target.value;
                      setValue(nextValue);
                      setErrors((current) => ({ ...current, value: "" }));
                    }}
                    placeholder={
                      method === "email" ? "you@example.com" : "9876543210"
                    }
                    className={inputClass}
                  />
                </div>
                {errors.value && (
                  <p role="alert" className="mt-1 text-xs text-red-600">
                    {errors.value}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#D4145A] to-[#FF7628] text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-105"
              >
                Continue
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-[#78646E]">
              Remember your password?{" "}
              <Link
                to={loginTarget}
                className="font-semibold text-[#D4145A] hover:underline"
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

export default ForgotPassword;