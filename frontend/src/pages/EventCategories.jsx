import CategoryDirectory from "../components/CategoryDirectory";
import { eventFilters, events } from "../data/categoryCatalog";

export default function EventCategories() {
  return (
    <CategoryDirectory
      mode="events"
      items={events}
      allItems={events}
      filters={eventFilters}
    />
  );
}
