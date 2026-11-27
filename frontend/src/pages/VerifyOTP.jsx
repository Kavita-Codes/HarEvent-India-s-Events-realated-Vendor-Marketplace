
import { useRef, useState } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { validateOtp } from "../utils/validation";

function VerifyOTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const location = useLocation();

  const navigate = useNavigate();
  const phone = location.state?.phone || "+91 XXXXX XXXXX";
  const purpose = location.state?.purpose || "login";
  const role = location.state?.role === "vendor" ? "vendor" : "customer";
  const [otpError, setOtpError] = useState("");
  const loginPath = `/?form=${role}`;

  const fieldClass =
    "h-12 w-11 rounded-lg border border-[#EED5DF] bg-[#FFFAFC] text-center text-lg font-semibold text-[#493640] outline-none transition focus:border-2 focus:border-[#D4145A] focus:ring-2 focus:ring-[#D4145A]/10";

  function handleChange(value, index) {
    if (!/^[0-9]?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    setOtpError("");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(event, index) {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(event) {
    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pasted) return;

    const updatedOtp = Array.from(
      { length: 6 },
      (_, index) => pasted[index] || ""
    );

    setOtp(updatedOtp);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const error = validateOtp(otp);
    setOtpError(error);
    if (error) return;

    if (purpose === "reset") {
      navigate("/reset-password");
      return;
    }

    navigate("/");
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#FFFAFC] p-4 font-poppins sm:p-6">
      <div className="flex w-full max-w-[900px] overflow-hidden rounded-[24px] bg-white shadow-[0_24px_60px_rgba(55,25,40,0.16)]">

        {/* Left Brand Panel */}
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#D4145A] to-[#FF7628] lg:block lg:w-[34%]">
          <div className="absolute inset-0 bg-black/5" />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-7 text-center text-white">
            <img
              src="/logoForm.jpeg"
              alt="HarEvent"
              className="mb-7 h-24 w-24 rounded-2xl bg-white/95 object-contain p-2 shadow-lg"
            />

            <h2 className="font-playfair text-3xl font-bold leading-tight">
              Almost There!
            </h2>

            <p className="mt-4 max-w-[240px] text-sm leading-6 text-white/90">
              One quick verification step to keep your HarEvent account safe
              and secure.
            </p>

            <div className="mt-8 h-1 w-16 rounded-full bg-white/80" />
          </div>
        </div>

        {/* OTP Panel */}
        <div className="flex w-full flex-col justify-center px-5 py-7 sm:px-9 lg:w-[66%] lg:px-10">
          <div className="mx-auto w-full max-w-[520px]">

            <div className="relative mb-5 flex min-h-[64px] items-center justify-center">
              <Link
                to={purpose === "reset" ? "/forgot-password" : loginPath}
                className="absolute left-0 top-1/2 inline-flex -translate-y-1/2 items-center gap-1.5 text-sm font-medium text-[#78646E] transition hover:text-[#D4145A]"
              >
                <ArrowLeft size={16} />
                Back
              </Link>

              <Link to="/" aria-label="HarEvent Home">
                <img
                  src="/logoForm.jpeg"
                  alt="HarEvent"
                  className="h-16 w-16 object-contain"
                />
              </Link>
            </div>

            <div className="mb-2">
              <p className="text-[14px] font-bold uppercase tracking-[1.5px] text-[#D4145A]">
                Account Verification
              </p>

              <h1 className="mt-1 font-playfair text-2xl font-bold tracking-tight text-[#30232B]">
                Verify Your OTP
              </h1>
            </div>

            <p className="mb-6 text-base leading-7 text-[#8A7580]">
              We've sent a 6-digit verification code to{" "}
              <span className="font-semibold text-[#493640]">{phone}</span>.
              Enter the code below to continue.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-5">
                <label className="mb-3 block text-sm font-semibold text-[#493640]">
                  Enter 6-digit OTP
                </label>

                <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start sm:gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(element) => (inputRefs.current[index] = element)}
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={1}
                      value={digit}
                      onChange={(event) =>
                        handleChange(event.target.value, index)
                      }
                      onKeyDown={(event) => handleKeyDown(event, index)}
                      onPaste={handlePaste}
                      className={fieldClass}
                    />
                  ))}
                </div>
                {otpError && (
                  <p className="mt-2 text-center text-xs text-red-600 sm:text-left">
                    {otpError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#D4145A] to-[#FF7628] text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-105"
              >
                <ShieldCheck size={17} />
                Verify & Continue
              </button>
            </form>

            <div className="mt-5 text-center">
              <p className="text-sm text-[#78646E]">
                Didn't receive the code?{" "}
                <button
                  type="button"
                  className="font-semibold text-[#D4145A] hover:underline"
                >
                  Resend OTP
                </button>
              </p>

              <p className="mt-3 text-sm text-[#A8959D]">
                OTP is valid for a limited time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default VerifyOTP
