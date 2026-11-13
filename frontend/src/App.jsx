import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainAnimation, { PageTransition } from "./components/MainAnimation";
import NiDiChatbot from "./services/NiDiChatbot";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import Enquiry from "./pages/Enquiry";
import EventCategories from "./pages/EventCategories";
import EventCategoryDetail from "./pages/EventCategoryDetail";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import JoinAsVendor from "./pages/JoinAsVendor";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";
import VendorCategories from "./pages/VendorCategories";


function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <BrowserRouter>
      <>
        {/* Brand intro: first thing rendered on every load / reload */}
        <MainAnimation />

        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event-categories" element={<EventCategories />} />
            <Route
              path="/event-categories/:slug"
              element={<EventCategoryDetail />}
            />
            <Route path="/vendor-categories" element={<VendorCategories />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/enquiry" element={<Enquiry />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/vendor-login"
              element={<Login initialMode="vendor" />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/join-as-vendor" element={<JoinAsVendor />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>

        <button
          type="button"
          onClick={() => setIsChatbotOpen((isOpen) => !isOpen)}
          aria-label={isChatbotOpen ? "Close HarEvent chatbot" : "Open HarEvent chatbot"}
          aria-expanded={isChatbotOpen}
          aria-controls="harevent-chatbot"
          title="Chat with NiDi"
          className="fixed bottom-0 right-0 z-[60] flex h-40 w-40 items-center justify-center bg-transparent transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#12B886] max-sm:bottom-4 max-sm:right-4 motion-reduce:transition-none"
        >
          <img
            src="/nidiBot.gif"
            alt=""
            aria-hidden="true"
            className="h-30 w-40 object-contain"
          />
        </button>
        {isChatbotOpen && (
          <div id="harevent-chatbot">
            <NiDiChatbot onClose={() => setIsChatbotOpen(false)} />
          </div>
        )}
      </>
    </BrowserRouter>
  );
}

export default App;
