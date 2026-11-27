import { useCallback, useEffect, useRef, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  useLocation,
  useParams,
} from "react-router-dom";
import MainAnimation, { PageTransition } from "./components/MainAnimation";
import NiDiChatbot from "./services/NiDiChatbot";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import Enquiry from "./pages/Enquiry";
import EventCategories from "./pages/EventCategories";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";
import VendorCategoryLanding from "./pages/VendorCategoryLanding";
import VendorCategories from "./pages/VendorCategories";
import VendorProfile from "./pages/VendorProfile";
import VerifyOTP from "./pages/VerifyOTP";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const eventPageModules = import.meta.glob("./pages/events/*.jsx", {
  eager: true,
});

function VendorProfileRoute() {
  const { vendorId } = useParams();

  return <VendorProfile key={vendorId} />;
}

function ScrollToTop() {
  const { pathname, search, hash } = useLocation();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    const previousSegments = previousPathname.current.split("/");
    const currentSegments = pathname.split("/");
    previousPathname.current = pathname;

    const changingVendorSelection =
      previousSegments[1] === "vendor-categories" &&
      currentSegments[1] === "vendor-categories" &&
      previousSegments[2] === currentSegments[2] &&
      Boolean(currentSegments[2]);
    const returningToVendorDirectory =
      previousSegments[1] === "enquiry" &&
      currentSegments[1] === "vendor-categories";
    if (changingVendorSelection || returningToVendorDirectory) return;

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    if (document.scrollingElement) {
      document.scrollingElement.scrollTop = 0;
    }

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, search, hash]);

  return null;
}

function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);

  const handleChecklistVisibilityChange = useCallback((isOpen) => {
    setIsChecklistOpen(isOpen);
    if (isOpen) setIsChatbotOpen(false);
  }, []);

  return (
    <BrowserRouter>
      <>
        <ScrollToTop />
        {/* Brand intro: first thing rendered on every load / reload */}
        <MainAnimation />

        <PageTransition>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  onChecklistVisibilityChange={handleChecklistVisibilityChange}
                />
              }
            />
            <Route
              path="/event-categories"
              element={
                <EventCategories
                  onChecklistVisibilityChange={handleChecklistVisibilityChange}
                />
              }
            />
            {Object.entries(eventPageModules).map(([filePath, pageModule]) => {
              const fileName = filePath.slice(filePath.lastIndexOf("/") + 1);
              const slug = fileName.replace(/\.jsx$/, "");
              const EventPage = pageModule.default;

              return (
                <Route
                  key={slug}
                  path={`/event-categories/${slug}`}
                  element={<EventPage />}
                />
              );
            })}
            <Route
              path="/vendor-categories"
              element={
                <VendorCategoryLanding
                  onChecklistVisibilityChange={handleChecklistVisibilityChange}
                />
              }
            />
            <Route
              path="/vendor-categories/:eventSlug/:categorySlug"
              element={
                <VendorCategories
                  onChecklistVisibilityChange={handleChecklistVisibilityChange}
                />
              }
            />
            <Route path="/vendors/:vendorId" element={<VendorProfileRoute />} />
            <Route
              path="/vendor-profile/:vendorId"
              element={<VendorProfileRoute />}
            />
            <Route path="/vendor-profile" element={<VendorProfileRoute />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/enquiry" element={<Enquiry />} />
            <Route
              path="/login"
              element={<Navigate to="/?form=customer" replace />}
            />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/vendor-login"
              element={<Navigate to="/?form=vendor" replace />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route
              path="/join-as-vendor"
              element={<Navigate to="/signup?form=vendor" replace />}
            />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>

        {!isChecklistOpen && (
          <button
            type="button"
            onClick={() => setIsChatbotOpen((isOpen) => !isOpen)}
            aria-label={
              isChatbotOpen ? "Close HarEvent chatbot" : "Open HarEvent chatbot"
            }
            aria-expanded={isChatbotOpen}
            aria-controls="harevent-chatbot"
            title="Chat with NiDi"
            className="fixed bottom-0 right-0 z-60 flex h-40 w-40 items-center justify-center bg-transparent transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#12B886] max-sm:bottom-4 max-sm:right-4 motion-reduce:transition-none"
          >
            <img
              src="/nidiBot.gif"
              alt=""
              aria-hidden="true"
              className="h-30 w-40 object-contain"
            />
          </button>
        )}
        {isChatbotOpen && !isChecklistOpen && (
          <div id="harevent-chatbot">
            <NiDiChatbot onClose={() => setIsChatbotOpen(false)} />
          </div>
        )}
      </>
    </BrowserRouter>
  );
}

export default App;
