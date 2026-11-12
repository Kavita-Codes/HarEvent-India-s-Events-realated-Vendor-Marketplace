import { Navigate, useParams } from "react-router-dom";
import CategoryDetailPage from "../components/CategoryDetailPage";
import {
  getVendorSpecialtyBySlug,
  getVendorTypeBySlug,
  vendorSpecialties,
} from "../data/categoryCatalog";

export default function VendorCategoryDetail({ specialty = false }) {
  const { slug } = useParams();
  const category = specialty
    ? getVendorSpecialtyBySlug(slug)
    : getVendorTypeBySlug(slug);

  if (!category) {
    return <Navigate to="/vendor-categories" replace />;
  }

  const relatedItems = specialty
    ? vendorSpecialties
        .filter(
          (item) =>
            item.groupName === category.groupName && item.id !== category.id,
        )
    : category.specialties;

  const eventContext = new URLSearchParams(window.location.search).get("event");
  const categoryWithContext = {
    ...category,
    eventContext,
  };

  return (
    <CategoryDetailPage
      category={categoryWithContext}
      relatedItems={relatedItems}
      mode={specialty ? "vendorSpecialty" : "vendorType"}
      directoryHref="/vendor-categories"
      relatedHeading={
        specialty
          ? `More in ${category.groupName}`
          : category.specialties.length > 0
            ? `Explore ${category.name} specialities`
            : "More vendor services"
      }
    />
  );
}
