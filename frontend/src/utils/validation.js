export function digitsOnly(value = "") {
  return String(value).replace(/\D/g, "");
}

export function hasErrors(errors = {}) {
  return Object.values(errors).some(Boolean);
}

export function validateName(value, label = "Name") {
  const name = String(value ?? "").trim();

  if (!name) return `${label} is required`;
  if (name.length < 3) return `${label} must be at least 3 characters`;
  if (/\d/.test(name)) return `${label} cannot contain numbers`;
  if (!/^[a-zA-Z][a-zA-Z .'-]*$/.test(name)) {
    return `${label} can only contain letters`;
  }

  return "";
}

export function validateBusinessName(value) {
  const name = String(value ?? "").trim();

  if (!name) return "Business name is required";
  if (name.length < 3) return "Business name must be at least 3 characters";

  return "";
}

export function validateEmail(value) {
  const email = String(value ?? "").trim();

  if (!email) return "Email address is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return "Enter a valid email address";
  }

  return "";
}

export function validatePhone(value) {
  const raw = String(value ?? "").trim();

  if (!raw) return "Phone number is required";

  return "";
}

export function validateEmailOrPhone(value) {
  const identifier = String(value ?? "").trim();

  if (!identifier) return "Email or phone number is required";
  if (identifier.includes("@")) return validateEmail(identifier);

  return validatePhone(identifier);
}

export function validatePassword(value, { label = "Password" } = {}) {
  const password = String(value ?? "");

  if (!password) return `${label} is required`;
  if (password.length < 8) return `${label} must be at least 8 characters`;

  return "";
}

export function validateConfirmPassword(password, confirmPassword) {
  if (!String(confirmPassword ?? "")) return "Confirm your password";
  if (password !== confirmPassword) return "Passwords do not match";

  return "";
}

export function validateRequired(value, label) {
  if (!String(value ?? "").trim()) return `${label} is required`;
  return "";
}

export function validateOtp(otp) {
  const code = Array.isArray(otp) ? otp.join("") : String(otp ?? "");

  if (!/^\d{6}$/.test(code)) return "Enter the 6-digit OTP";

  return "";
}

export function validateLoginForm({ identifier, password }) {
  return {
    identifier: validateEmailOrPhone(identifier),
    password: validatePassword(password),
  };
}

export function validateSignupForm({
  fullName,
  email,
  phone,
  password,
  vendorMode,
  businessName,
  serviceCategory,
  acceptTerms,
}) {
  const errors = {
    fullName: validateName(fullName, "Full name"),
    email: validateEmail(email),
    phone: validatePhone(phone),
    password: validatePassword(password),
    acceptTerms: acceptTerms ? "" : "Please accept the terms and privacy policy",
  };

  if (vendorMode) {
    errors.businessName = validateBusinessName(businessName);
    errors.serviceCategory = validateRequired(serviceCategory, "Service category");
  }

  return errors;
}

export function validateForgotPasswordForm({ method, value }) {
  return {
    value: method === "email" ? validateEmail(value) : validatePhone(value),
  };
}

export function validateResetPasswordForm({ password, confirmPassword }) {
  return {
    password: validatePassword(password, { label: "New password" }),
    confirmPassword: validateConfirmPassword(password, confirmPassword),
  };
}