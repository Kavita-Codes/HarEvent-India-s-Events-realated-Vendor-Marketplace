import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Briefcase,
  Phone,
  Mail,
  MapPin,
  Calendar,
  MessageSquare,
  LogOut,
  CheckCircle2,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function VendorDashboard() {
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("harevent_user");
      if (stored) {
        setVendor(JSON.parse(stored));
      } else {
        navigate("/?form=vendor");
      }
    } catch {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    try {
      localStorage.removeItem("harevent_user");
      window.dispatchEvent(new Event("harevent_auth_change"));
    } catch (e) {
      console.error(e);
    }
    navigate("/");
  };

  if (!vendor) return null;

  const vendorName =
    vendor.businessName || vendor.fullName || "Vendor Partner";
  const vendorCategory = vendor.serviceCategory || "Event Services";
  const vendorCity = vendor.city || "Amravati, Maharashtra";
  const vendorPhone = vendor.phone || "+91 XXXXX XXXXX";
  const vendorEmail = vendor.email || "Not provided";

  return (
    <div className="min-h-screen bg-[#FFF9FA] font-poppins text-[#30232B]">
      <Navbar />

      <main className="mx-auto w-full max-w-[1000px] px-4 py-8 sm:px-6">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs font-medium text-[#8A7580]">
          <Link to="/" className="text-[#D4145A] hover:underline">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#51434B]">Vendor Dashboard</span>
        </nav>

        {/* Simple Welcome Header */}
        <div className="mb-6 rounded-2xl border border-[#F1DDE5] bg-white p-6 shadow-sm sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#D4145A] to-[#FF7628] text-xl font-bold text-white shadow-sm">
                <Briefcase size={26} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-playfair text-xl font-bold text-[#30232B] sm:text-2xl">
                    {vendorName}
                  </h1>
                  <span className="rounded-full bg-[#FFF0F5] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#D4145A]">
                    Vendor
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-[#7F6B76]">
                  Welcome to your HarEvent Vendor Dashboard.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-1.5 self-start rounded-full border border-red-200 bg-white px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 sm:self-center"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>

        {/* 3 Simple Overview Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#F1DDE5] bg-white p-5 shadow-sm">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF2F6] text-[#D4145A]">
              <MessageSquare size={18} />
            </span>
            <p className="mt-3 text-2xl font-bold text-[#30232B]">12</p>
            <p className="text-xs font-semibold text-[#8A7580]">Client Inquiries</p>
          </div>

          <div className="rounded-2xl border border-[#F1DDE5] bg-white p-5 shadow-sm">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF5EE] text-[#FF7628]">
              <Calendar size={18} />
            </span>
            <p className="mt-3 text-2xl font-bold text-[#30232B]">8</p>
            <p className="text-xs font-semibold text-[#8A7580]">Upcoming Bookings</p>
          </div>

          <div className="rounded-2xl border border-[#F1DDE5] bg-white p-5 shadow-sm">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF7EE] text-[#188B4B]">
              <CheckCircle2 size={18} />
            </span>
            <p className="mt-3 text-2xl font-bold text-[#30232B]">Active</p>
            <p className="text-xs font-semibold text-[#8A7580]">Account Status</p>
          </div>
        </div>

        {/* Business Details Simple Card */}
        <div className="mb-6 rounded-2xl border border-[#F1DDE5] bg-white p-6 shadow-sm">
          <h2 className="mb-4 border-b border-[#F5E6EC] pb-3 text-sm font-bold uppercase tracking-wider text-[#D4145A]">
            Business Information
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-[#FFFDFC] border border-[#F4E6EC] p-3.5">
              <span className="flex items-center gap-1.5 text-xs font-medium text-[#8A7580]">
                <Briefcase size={14} className="text-[#D4145A]" />
                Service Category
              </span>
              <p className="mt-1 text-sm font-semibold text-[#30232B]">
                {vendorCategory}
              </p>
            </div>

            <div className="rounded-xl bg-[#FFFDFC] border border-[#F4E6EC] p-3.5">
              <span className="flex items-center gap-1.5 text-xs font-medium text-[#8A7580]">
                <Phone size={14} className="text-[#D4145A]" />
                Contact Phone
              </span>
              <p className="mt-1 text-sm font-semibold text-[#30232B]">
                {vendorPhone}
              </p>
            </div>

            <div className="rounded-xl bg-[#FFFDFC] border border-[#F4E6EC] p-3.5">
              <span className="flex items-center gap-1.5 text-xs font-medium text-[#8A7580]">
                <Mail size={14} className="text-[#D4145A]" />
                Email
              </span>
              <p className="mt-1 text-sm font-semibold text-[#30232B]">
                {vendorEmail}
              </p>
            </div>

            <div className="rounded-xl bg-[#FFFDFC] border border-[#F4E6EC] p-3.5">
              <span className="flex items-center gap-1.5 text-xs font-medium text-[#8A7580]">
                <MapPin size={14} className="text-[#D4145A]" />
                Operating City
              </span>
              <p className="mt-1 text-sm font-semibold text-[#30232B]">
                {vendorCity}
              </p>
            </div>
          </div>
        </div>

        {/* Recent Inquiries List */}
        <div className="rounded-2xl border border-[#F1DDE5] bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between border-b border-[#F5E6EC] pb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#D4145A]">
              Recent Inquiries
            </h2>
            <span className="text-xs font-medium text-[#8A7580]">
              Latest 2 requests
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex flex-col justify-between gap-3 rounded-xl border border-[#F4E6EC] bg-[#FFFDFC] p-4 sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#30232B]">
                    Rohan Sharma
                  </span>
                  <span className="rounded-full bg-[#FFF0F5] px-2 py-0.5 text-[10px] font-bold text-[#D4145A]">
                    New
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-[#7F6B76]">
                  Wedding Ceremony · 250 Guests · Dec 20, 2026
                </p>
              </div>
              <span className="text-xs font-bold text-[#D4145A]">
                Budget: ₹1.5 Lakh
              </span>
            </div>

            <div className="flex flex-col justify-between gap-3 rounded-xl border border-[#F4E6EC] bg-[#FFFDFC] p-4 sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#30232B]">
                    Sneha Deshmukh
                  </span>
                  <span className="rounded-full bg-[#EAF7EE] px-2 py-0.5 text-[10px] font-bold text-[#188B4B]">
                    Confirmed
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-[#7F6B76]">
                  Birthday Celebration · 100 Guests · Jan 08, 2027
                </p>
              </div>
              <span className="text-xs font-bold text-[#D4145A]">
                Budget: ₹45,000
              </span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
