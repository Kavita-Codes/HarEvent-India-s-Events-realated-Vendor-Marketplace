import { useState } from "react";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [method, setMethod] = useState("email");

  function handleSubmit(event) {
    event.preventDefault();
  }

  const navigate = useNavigate()

  const fieldClass =
    "flex h-12 w-full items-center gap-2 rounded-lg border border-[#EED5DF] bg-[#FFFAFC] px-3 focus-within:border-2 focus-within:border-[#D4145A]";

  const inputClass =
    "w-full bg-transparent text-sm outline-none placeholder:text-[#B3A3AA]";

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#FFFAFC] p-4 font-poppins sm:p-6">
      <div className="flex w-full max-w-[900px] overflow-hidden rounded-[24px] bg-white shadow-[0_24px_60px_rgba(55,25,40,0.16)]">

        {/* Left Brand Panel */}
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
              Don't worry! We'll help you get back to managing your event
              business.
            </p>

            <div className="mt-8 h-1 w-16 rounded-full bg-white/80" />
          </div>
        </div>

        {/* Form Panel */}
        <div className="flex w-full flex-col justify-center px-5 py-7 sm:px-9 lg:w-[66%] lg:px-10">
          <div className="mx-auto w-full max-w-[520px]">

            <div className="relative mb-5 flex min-h-[64px] items-center justify-center">
              <Link
                to="/vendor-login"
                className="absolute left-0 top-1/2 inline-flex -translate-y-1/2 items-center gap-1.5 text-sm font-medium text-[#78646E] transition hover:text-[#D4145A]"
              >
                <ArrowLeft size={16} />
                Back to Login
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
              <p className="text-sm font-bold uppercase tracking-[1.5px] text-[#D4145A]">
                Vendor Portal
              </p>

              <h1 className="mt-1 font-playfair text-2xl font-bold tracking-tight text-[#30232B]">
                Forgot Password
              </h1>
            </div>

            <p className="mb-6 text-base leading-7 text-[#8A7580]">
              Enter your registered email address or phone number. We'll help
              you reset your password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Select Method */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#493640]">
                  Choose verification method
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setMethod("email")}
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
                    onClick={() => setMethod("phone")}
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

              {/* Email / Phone */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-[#493640]">
                  {method === "email"
                    ? "Registered Email Address"
                    : "Phone Number"}
                </label>

                <div className={fieldClass}>
                  {method === "email" ? (
                    <Mail size={17} className="shrink-0 text-[#D4145A]" />
                  ) : (
                    <Phone size={17} className="shrink-0 text-[#D4145A]" />
                  )}

                  <input
                    required
                    type={method === "email" ? "email" : "tel"}
                    placeholder={
                      method === "email"
                        ? "you@example.com"
                        : "+91 98765 43210"
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              <button onClick={()=> navigate("/verify-otp")}
                type="submit"
                className="flex h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#D4145A] to-[#FF7628] text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-105"
              >
                Continue
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-[#78646E]">
              Remember your password?{" "}
              <Link
                to="/vendor-login"
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

export default ForgotPassword
