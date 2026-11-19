import Navbar from "./Navbar";
import Footer from "./Footer";
import Banner from "./Banner";
import NotFound from "../pages/NotFound";
import { eventCategories } from "../data/eventCategories";

const EventCategoryPage = ({ eventName }) => {
  const event = eventCategories.find((category) => category.name === eventName);

  if (!event) {
    return <NotFound />;
  }

  const eventDescription = `Plan a memorable ${event.name.toLowerCase()} with trusted event professionals, thoughtful ideas, and services for every detail.`;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#fafafa] font-poppins text-[#30232B]">
        <Banner title={event.name} description={eventDescription} />
      </main>
      <Footer />
    </>
  );
};

export default EventCategoryPage;
