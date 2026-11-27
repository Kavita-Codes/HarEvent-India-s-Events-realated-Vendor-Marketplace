
import { useState } from "react";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  hasErrors,
  validateResetPasswordForm,
} from "../utils/validation";

function ResetPassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const inputClass =
    "w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-[#B3A3AA]";

  function fieldClass(hasError) {
    return `flex h-12 w-full items-center gap-2 rounded-lg border bg-[#FFFAFC] px-3 focus-within:border-2 ${
      hasError
        ? "border-red-500 focus-within:border-red-500"
        : "border-[#EED5DF] focus-within:border-[#D4145A]"
    }`;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validateResetPasswordForm({ password, confirmPassword });
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) return;

    navigate("/?form=customer");
  }

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
              Create a New Password
            </h2>

            <p className="mt-4 max-w-[240px] text-base leading-7 text-white/90">
              Choose a strong password to keep your HarEvent account protected.
            </p>

            <div className="mt-8 h-1 w-16 rounded-full bg-white/80" />
          </div>
        </div>

        {/* Reset Password Panel */}
        <div className="flex w-full flex-col justify-center px-5 py-7 sm:px-9 lg:w-[66%] lg:px-10">
          <div className="mx-auto w-full max-w-[520px]">

            <div className="relative mb-5 flex min-h-[64px] items-center justify-center">
              <Link
                to="/verify-otp"
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
              <p className="text-sm font-bold uppercase tracking-[1.5px] text-[#D4145A]">
                Vendor Portal
              </p>

              <h1 className="mt-1 font-playfair text-2xl font-bold tracking-tight text-[#30232B]">
                Reset Password
              </h1>
            </div>

            <p className="mb-6 text-base leading-7 text-[#8A7580]">
              Your OTP has been verified. Set a new password for your account.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">

              {/* New Password */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-[#493640]">
                  New Password
                </label>

                <div className={fieldClass(errors.password)}>
                  <LockKeyhole
                    size={17}
                    className="shrink-0 text-[#D4145A]"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setErrors((current) => ({ ...current, password: "" }));
                    }}
                    placeholder="Enter new password"
                    className={inputClass}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="shrink-0 text-[#8A7580] transition hover:text-[#D4145A]"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-[#493640]">
                  Confirm New Password
                </label>

                <div className={fieldClass(errors.confirmPassword)}>
                  <LockKeyhole
                    size={17}
                    className="shrink-0 text-[#D4145A]"
                  />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
                      setErrors((current) => ({
                        ...current,
                        confirmPassword: "",
                      }));
                    }}
                    placeholder="Re-enter new password"
                    className={inputClass}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((value) => !value)
                    }
                    className="shrink-0 text-[#8A7580] transition hover:text-[#D4145A]"
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <p className="text-sm leading-5 text-[#A8959D]">
                Password must contain at least 8 characters.
              </p>

              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#D4145A] to-[#FF7628] text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-105"
              >
                <ShieldCheck size={17} />
                Reset Password
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-[#78646E]">
              Remember your password?{" "}
              <Link
                to="/?form=customer"
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

export default ResetPassword;
