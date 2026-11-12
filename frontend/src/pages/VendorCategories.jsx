import CategoryDirectory from "../components/CategoryDirectory";
import {
  allVendorItems,
  vendorSpecialtyGroups,
  vendorTypes,
} from "../data/categoryCatalog";

export default function VendorCategories() {
  return (
    <CategoryDirectory
      mode="vendors"
      items={vendorTypes}
      allItems={allVendorItems}
      specialtyGroups={vendorSpecialtyGroups}
    />
  );
}
