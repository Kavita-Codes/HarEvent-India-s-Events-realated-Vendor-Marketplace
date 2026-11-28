import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Building2,
  ShieldCheck,
  Heart,
  LogOut,
  Edit3,
  CheckCircle2,
  Save,
  ArrowRight,
  Briefcase,
  Layers,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MyProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saveNotice, setSaveNotice] = useState("");
  const [activeTab, setActiveTab] = useState("profile");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    role: "customer",
    businessName: "",
    serviceCategory: "",
    bio: "",
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("harevent_user");
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed);
        setFormData({
          fullName: parsed.fullName || (parsed.role === "vendor" ? "Vendor Partner" : "HarEvent User"),
          phone: parsed.phone || "",
          email: parsed.email || "",
          city: parsed.city || "Amravati, Maharashtra",
          role: parsed.role || "customer",
          businessName: parsed.businessName || "",
          serviceCategory: parsed.serviceCategory || "Event Services",
          bio: parsed.bio || (parsed.role === "vendor" ? "Professional event services provider on HarEvent." : "Looking forward to planning memorable celebrations on HarEvent!"),
        });
      } else {
        // If not logged in, prompt or redirect
        navigate("/?form=customer");
      }
    } catch {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updated = {
      ...user,
      ...formData,
    };
    try {
      localStorage.setItem("harevent_user", JSON.stringify(updated));
      window.dispatchEvent(new Event("harevent_auth_change"));
      setUser(updated);
      setIsEditing(false);
      setSaveNotice("Profile updated successfully!");
      setTimeout(() => setSaveNotice(""), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("harevent_user");
      window.dispatchEvent(new Event("harevent_auth_change"));
    } catch (e) {
      console.error(e);
    }
    navigate("/");
  };

  if (!user) return null;

  const isVendor = formData.role === "vendor";

  return (
    <div className="min-h-screen bg-[#FFF9FA] font-poppins text-[#30232B]">
      <Navbar />

      <main className="mx-auto w-full max-w-[1240px] px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs font-medium text-[#8A7580]">
          <Link to="/" className="text-[#D4145A] hover:underline">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#51434B]">My Profile</span>
        </nav>

        {/* Profile Banner Card */}
        <div className="relative mb-8 overflow-hidden rounded-3xl border border-[#F2DEE6] bg-white shadow-[0_12px_36px_rgba(55,25,40,0.06)]">
          {/* Decorative Cover */}
          <div className="h-36 w-full bg-gradient-to-r from-[#D4145A] via-[#E84342] to-[#FF7628] sm:h-44">
            <div className="h-full w-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-black/10" />
          </div>

          <div className="relative px-5 pb-6 sm:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              {/* Avatar & Main Info */}
              <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-end sm:text-left">
                <div className="-mt-16 flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl bg-white p-1.5 shadow-[0_8px_24px_rgba(212,20,90,0.2)] ring-4 ring-white sm:-mt-14 sm:h-32 sm:w-32">
                  <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-tr from-[#D4145A] to-[#FF7628] text-4xl font-extrabold text-white">
                    {formData.fullName ? formData.fullName.charAt(0).toUpperCase() : "U"}
                  </div>
                </div>

                <div className="pt-2 sm:pt-0">
                  <div className="flex flex-wrap items-center justify-center gap-2.5 sm:justify-start">
                    <h1 className="font-playfair text-2xl font-bold tracking-tight text-[#30232B] sm:text-3xl">
                      {formData.fullName}
                    </h1>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF0F5] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#D4145A] ring-1 ring-[#F8D2DF]">
                      <span className="h-2 w-2 rounded-full bg-[#D4145A]" />
                      {isVendor ? "Vendor Partner" : "Customer"}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-[#7F6B76]">
                    {isVendor && formData.businessName
                      ? `${formData.businessName} · `
                      : ""}
                    {formData.city || "Amravati, Maharashtra"}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:justify-end">
                {!isEditing ? (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4145A] to-[#FF7628] px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
                  >
                    <Edit3 size={15} />
                    Edit Profile
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#D5C4CB] bg-white px-4 py-2 text-xs font-semibold text-[#66545F] transition hover:bg-[#F9EFF3]"
                  >
                    Cancel
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-white px-4 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 hover:border-red-300"
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </div>
            </div>

            {saveNotice && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#EAF7EE] px-4 py-2.5 text-xs font-semibold text-[#18783D] shadow-sm animate-in fade-in">
                <CheckCircle2 size={16} />
                <span>{saveNotice}</span>
              </div>
            )}
          </div>
        </div>

        {/* Content Tabs Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column: Quick Stats & Navigation */}
          <div className="space-y-6 lg:col-span-1">
            {/* Verification Status Card */}
            <div className="rounded-2xl border border-[#F1DDE5] bg-white p-5 shadow-[0_6px_20px_rgba(50,20,35,0.04)]">
              <h3 className="mb-3.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4145A]">
                <ShieldCheck size={16} />
                Account Security
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-[#FFF5F8] p-3 text-xs">
                  <div className="flex items-center gap-2 font-medium text-[#4D3D46]">
                    <Phone size={15} className="text-[#D4145A]" />
                    <span>Phone OTP Verified</span>
                  </div>
                  <span className="font-bold text-[#188B4B]">Active</span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-[#FFF9F6] p-3 text-xs">
                  <div className="flex items-center gap-2 font-medium text-[#4D3D46]">
                    <ShieldCheck size={15} className="text-[#FF7628]" />
                    <span>Role Permissions</span>
                  </div>
                  <span className="font-bold capitalize text-[#FF7628]">
                    {formData.role}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="rounded-2xl border border-[#F1DDE5] bg-white p-5 shadow-[0_6px_20px_rgba(50,20,35,0.04)]">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-[#8A7580]">
                Activity & Preferences
              </h3>

              <div className="space-y-2">
                <Link
                  to="/favorites"
                  className="group flex items-center justify-between rounded-xl border border-transparent p-3 text-xs font-semibold text-[#4D3D46] transition hover:border-[#F2DEE6] hover:bg-[#FFF7FA] hover:text-[#D4145A]"
                >
                  <span className="flex items-center gap-2.5">
                    <Heart size={16} className="text-[#D4145A]" />
                    Saved Favorites
                  </span>
                  <ArrowRight
                    size={14}
                    className="text-[#B39DA8] transition group-hover:translate-x-1 group-hover:text-[#D4145A]"
                  />
                </Link>

                {isVendor ? (
                  <Link
                    to="/vendor-profile"
                    className="group flex items-center justify-between rounded-xl border border-transparent p-3 text-xs font-semibold text-[#4D3D46] transition hover:border-[#F2DEE6] hover:bg-[#FFF7FA] hover:text-[#D4145A]"
                  >
                    <span className="flex items-center gap-2.5">
                      <Briefcase size={16} className="text-[#D4145A]" />
                      Public Vendor Listing
                    </span>
                    <ArrowRight
                      size={14}
                      className="text-[#B39DA8] transition group-hover:translate-x-1 group-hover:text-[#D4145A]"
                    />
                  </Link>
                ) : (
                  <Link
                    to="/vendor-categories"
                    className="group flex items-center justify-between rounded-xl border border-transparent p-3 text-xs font-semibold text-[#4D3D46] transition hover:border-[#F2DEE6] hover:bg-[#FFF7FA] hover:text-[#D4145A]"
                  >
                    <span className="flex items-center gap-2.5">
                      <Layers size={16} className="text-[#D4145A]" />
                      Explore Vendors
                    </span>
                    <ArrowRight
                      size={14}
                      className="text-[#B39DA8] transition group-hover:translate-x-1 group-hover:text-[#D4145A]"
                    />
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Profile Details & Edit Form */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-[#F1DDE5] bg-white p-6 shadow-[0_6px_20px_rgba(50,20,35,0.04)] sm:p-8">
              <div className="mb-6 flex items-center justify-between border-b border-[#F5E6EC] pb-4">
                <div>
                  <h2 className="font-playfair text-xl font-bold text-[#30232B]">
                    Personal Information
                  </h2>
                  <p className="mt-0.5 text-xs text-[#8A7580]">
                    Manage your identity, contact information and profile details.
                  </p>
                </div>

                {!isEditing && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D4145A] hover:underline"
                  >
                    <Edit3 size={14} />
                    Edit
                  </button>
                )}
              </div>

              {!isEditing ? (
                /* View Mode */
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#F4E6EC] bg-[#FFFDFC] p-4">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-[#8A7580]">
                      <User size={14} className="text-[#D4145A]" />
                      Full Name
                    </span>
                    <p className="mt-1.5 text-sm font-bold text-[#30232B]">
                      {formData.fullName}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#F4E6EC] bg-[#FFFDFC] p-4">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-[#8A7580]">
                      <Phone size={14} className="text-[#D4145A]" />
                      Phone Number
                    </span>
                    <p className="mt-1.5 text-sm font-bold text-[#30232B]">
                      {formData.phone || "Not specified"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#F4E6EC] bg-[#FFFDFC] p-4">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-[#8A7580]">
                      <Mail size={14} className="text-[#D4145A]" />
                      Email Address
                    </span>
                    <p className="mt-1.5 text-sm font-bold text-[#30232B]">
                      {formData.email || "Not specified"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#F4E6EC] bg-[#FFFDFC] p-4">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-[#8A7580]">
                      <MapPin size={14} className="text-[#D4145A]" />
                      City / Location
                    </span>
                    <p className="mt-1.5 text-sm font-bold text-[#30232B]">
                      {formData.city || "Not specified"}
                    </p>
                  </div>

                  {isVendor && (
                    <>
                      <div className="rounded-xl border border-[#F4E6EC] bg-[#FFFDFC] p-4">
                        <span className="flex items-center gap-1.5 text-xs font-medium text-[#8A7580]">
                          <Building2 size={14} className="text-[#D4145A]" />
                          Business Name
                        </span>
                        <p className="mt-1.5 text-sm font-bold text-[#30232B]">
                          {formData.businessName || "Not specified"}
                        </p>
                      </div>

                      <div className="rounded-xl border border-[#F4E6EC] bg-[#FFFDFC] p-4">
                        <span className="flex items-center gap-1.5 text-xs font-medium text-[#8A7580]">
                          <Briefcase size={14} className="text-[#D4145A]" />
                          Service Category
                        </span>
                        <p className="mt-1.5 text-sm font-bold text-[#30232B]">
                          {formData.serviceCategory || "Event Services"}
                        </p>
                      </div>
                    </>
                  )}

                  <div className="sm:col-span-2 rounded-xl border border-[#F4E6EC] bg-[#FFFDFC] p-4">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-[#8A7580]">
                      About / Bio
                    </span>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#493943]">
                      {formData.bio}
                    </p>
                  </div>
                </div>
              ) : (
                /* Edit Form Mode */
                <form onSubmit={handleSave} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-[#4A3B44]">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-[#E8D4DD] bg-[#FFFAFC] px-3.5 py-2.5 text-sm outline-none transition focus:border-[#D4145A] focus:ring-2 focus:ring-[#D4145A]/10"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-semibold text-[#4A3B44]">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full rounded-xl border border-[#E8D4DD] bg-[#FFFAFC] px-3.5 py-2.5 text-sm outline-none transition focus:border-[#D4145A] focus:ring-2 focus:ring-[#D4145A]/10"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-semibold text-[#4A3B44]">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-[#E8D4DD] bg-[#FFFAFC] px-3.5 py-2.5 text-sm outline-none transition focus:border-[#D4145A] focus:ring-2 focus:ring-[#D4145A]/10"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-semibold text-[#4A3B44]">
                        City / Location
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="e.g. Amravati, Maharashtra"
                        className="w-full rounded-xl border border-[#E8D4DD] bg-[#FFFAFC] px-3.5 py-2.5 text-sm outline-none transition focus:border-[#D4145A] focus:ring-2 focus:ring-[#D4145A]/10"
                      />
                    </div>

                    {isVendor && (
                      <>
                        <div>
                          <label className="mb-1 block text-xs font-semibold text-[#4A3B44]">
                            Business Name
                          </label>
                          <input
                            type="text"
                            name="businessName"
                            value={formData.businessName}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-[#E8D4DD] bg-[#FFFAFC] px-3.5 py-2.5 text-sm outline-none transition focus:border-[#D4145A] focus:ring-2 focus:ring-[#D4145A]/10"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block text-xs font-semibold text-[#4A3B44]">
                            Service Category
                          </label>
                          <input
                            type="text"
                            name="serviceCategory"
                            value={formData.serviceCategory}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-[#E8D4DD] bg-[#FFFAFC] px-3.5 py-2.5 text-sm outline-none transition focus:border-[#D4145A] focus:ring-2 focus:ring-[#D4145A]/10"
                          />
                        </div>
                      </>
                    )}

                    <div className="sm:col-span-2">
                      <label className="mb-1 block text-xs font-semibold text-[#4A3B44]">
                        About / Bio
                      </label>
                      <textarea
                        rows={3}
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-[#E8D4DD] bg-[#FFFAFC] px-3.5 py-2.5 text-sm outline-none transition focus:border-[#D4145A] focus:ring-2 focus:ring-[#D4145A]/10"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-3">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4145A] to-[#FF7628] px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
                    >
                      <Save size={15} />
                      Save Changes
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="rounded-full border border-[#D5C4CB] bg-white px-5 py-2.5 text-xs font-semibold text-[#66545F] transition hover:bg-[#F9EFF3]"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
