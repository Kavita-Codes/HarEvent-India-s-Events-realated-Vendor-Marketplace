import { Navigate, useParams } from "react-router-dom";
import CategoryDetailPage from "../components/CategoryDetailPage";
import { events, getEventBySlug, getEventVendors } from "../data/categoryCatalog";

export default function EventCategoryDetail() {
  const { slug } = useParams();
  const event = getEventBySlug(slug);

  if (!event) {
    return <Navigate to="/event-categories" replace />;
  }

  const relatedEvents = events
    .filter((item) => item.group === event.group && item.id !== event.id)
    .slice(0, 4);
  const vendors = getEventVendors(event.sourceName);

  return (
    <CategoryDetailPage
      category={event}
      relatedItems={relatedEvents}
      eventVendors={vendors}
      mode="event"
      directoryHref="/event-categories"
      relatedHeading="More moments to celebrate"
    />
  );
}
