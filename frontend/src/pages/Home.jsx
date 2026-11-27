import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BrandsAndPartners from "../components/BrandsAndPartners";
import Events from "../components/Events";
import FindRightVendor from "../components/FindRightVendor";
import HowItWorks from "../components/HowItWorks";
import PopularVendors from "../components/PopularVendors";
import WhyChooseHarEvent from "../components/WhyChooseHarEvent";
import VendorRegistrationBanner from "../components/VendorRegistrationBanner";
import CustomerAssistance from "../components/CustomerAssistance";
import LatestBlogs from "../components/LatestBlogs";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";

function resolveLoginForm(requestedForm) {
  if (requestedForm === "vendor") return "vendor";
  if (requestedForm === "customer" || requestedForm === "login") return "customer";
  return null;
}

function Home({ onChecklistVisibilityChange }) {
  const location = useLocation();
  const navigate = useNavigate();
  const requestedForm = new URLSearchParams(location.search).get("form");
  const loginMode = resolveLoginForm(requestedForm);

  const openLogin = (mode = "customer") => {
    navigate(`/?form=${mode}`);
  };

  const closeLogin = () => navigate("/");

  if (requestedForm === "login") {
    return <Navigate to="/?form=customer" replace />;
  }

  if (requestedForm === "signup" || requestedForm === "vendor-signup") {
    return (
      <Navigate
        to={
          requestedForm === "vendor-signup"
            ? "/signup?form=vendor"
            : "/signup?form=customer"
        }
        replace
      />
    );
  }

  return (
    <>
      <Navbar onLoginClick={() => openLogin("customer")} />
      <Hero />
      <BrandsAndPartners />
      <HowItWorks />
      <Events onChecklistVisibilityChange={onChecklistVisibilityChange} />
      <FindRightVendor />
      <PopularVendors />
      <WhyChooseHarEvent />
      <VendorRegistrationBanner
        onVendorLoginClick={() => openLogin("vendor")}
        onVendorRegisterClick={() => navigate("/signup?form=vendor")}
      />
      <CustomerAssistance />
      <LatestBlogs />
      <Footer />
      {loginMode && (
        <LoginModal
          mode={loginMode}
          onClose={closeLogin}
          onModeChange={(nextMode) =>
            navigate(`/?form=${nextMode}`, { replace: true })
          }
          onRegister={(role) => navigate(`/signup?form=${role}`)}
        />
      )}
    </>
  );
}

export default Home;
