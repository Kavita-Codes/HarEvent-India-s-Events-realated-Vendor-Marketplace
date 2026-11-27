import { useEffect, useState } from "react";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Store,
  UserRound,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { hasErrors, validateLoginForm } from "../utils/validation";

function LoginModal({
  onClose,
  onRegister,
  onModeChange,
  mode = "customer",
}) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validateLoginForm({ identifier, password });
    setErrors(nextErrors);

    if (hasErrors(nextErrors)) return;

    navigate("/verify-otp", {
      state: {
        purpose: "login",
        role: mode,
        phone: identifier.trim(),
      },
    });
  }

  const fieldErrorClass = "border-red-500 focus-within:border-red-500";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/45 px-4 py-5 backdrop-blur-sm">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
        className="relative my-auto w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
      >
        <header className="relative bg-gradient-to-r from-[#D4145A] to-[#FF7628] px-6 pb-6 pt-7 text-center text-white sm:px-8">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close login"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25"
          >
            <X size={19} />
          </button>
          <img
            src="/logoForm.jpeg"
            alt="HarEvent"
            className="mx-auto h-12 w-12 rounded-full bg-white object-contain"
          />
          <h2 id="login-modal-title" className="mt-3 text-2xl font-bold">
            Login as {mode === "vendor" ? "Vendor" : "Customer"}
          </h2>
          <p className="mt-1 text-xs text-white/90">
            {mode === "vendor"
              ? "Manage listings, leads, and customer bookings"
              : "Discover event professionals and manage your plans"}
          </p>
        </header>

        <div className="p-5 sm:p-7">
          <div className="mb-5 grid grid-cols-2 rounded-xl bg-[#F3F5F9] p-1">
            {[
              { value: "customer", label: "Customer", icon: UserRound },
              { value: "vendor", label: "Vendor", icon: Store },
            ].map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                aria-pressed={mode === value}
                onClick={() => {
                  onModeChange(value);
                  setErrors({});
                }}
                className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-semibold transition ${
                  mode === value
                    ? "bg-white text-[#D4145A] shadow-sm"
                    : "text-[#718096] hover:text-[#493640]"
                }`}
              >
                <Icon size={15} /> {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <label className="block text-xs font-semibold text-[#493640]">
              Email / Phone Number
              <span
                className={`mt-1.5 flex h-11 items-center gap-3 rounded-xl border px-3.5 ${
                  errors.identifier
                    ? fieldErrorClass
                    : "border-[#E5E9EF] focus-within:border-[#D4145A]"
                }`}
              >
                <Mail size={16} className="shrink-0 text-[#91A0B3]" />
                <input
                  type="text"
                  autoComplete="username"
                  value={identifier}
                  onChange={(event) => {
                    setIdentifier(event.target.value);
                    setErrors((current) => ({ ...current, identifier: "" }));
                  }}
                  placeholder="Enter mobile or email"
                  className="min-w-0 flex-1 bg-transparent text-sm font-normal outline-none placeholder:text-[#A0AAB7]"
                />
              </span>
              {errors.identifier && (
                <p className="mt-1 text-[11px] font-normal text-red-600">
                  {errors.identifier}
                </p>
              )}
            </label>

            <label className="block text-xs font-semibold text-[#493640]">
              Password
              <span
                className={`mt-1.5 flex h-11 items-center gap-3 rounded-xl border px-3.5 ${
                  errors.password
                    ? fieldErrorClass
                    : "border-[#E5E9EF] focus-within:border-[#D4145A]"
                }`}
              >
                <LockKeyhole size={16} className="shrink-0 text-[#91A0B3]" />
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setErrors((current) => ({ ...current, password: "" }));
                  }}
                  placeholder="Enter your password"
                  className="min-w-0 flex-1 bg-transparent text-sm font-normal outline-none placeholder:text-[#A0AAB7]"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="text-[#8995A5] hover:text-[#D4145A]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </span>
              {errors.password && (
                <p className="mt-1 text-[11px] font-normal text-red-600">
                  {errors.password}
                </p>
              )}
            </label>

            <div className="flex items-center justify-between gap-3 text-xs">
              <label className="flex items-center gap-2 font-normal text-[#667085]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  className="accent-[#D4145A]"
                />
                Remember me
              </label>
              <button
                onClick={() => navigate("/forgot-password")}
                type="button"
                className="font-semibold text-[#D4145A] hover:text-[#A80F46]"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="flex h-11 w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#D4145A] to-[#FF7628] text-sm font-semibold text-white transition hover:brightness-105"
            >
              Sign In & Verify OTP
            </button>
          </form>

          <p className="mt-5 border-t border-[#F1F1F1] pt-4 text-center text-xs text-[#7B8794]">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => onRegister(mode)}
              className="font-semibold text-[#D4145A] hover:text-[#A80F46]"
            >
              Register Now
            </button>
          </p>
        </div>
      </section>
    </div>
  );
}

export default LoginModal;
