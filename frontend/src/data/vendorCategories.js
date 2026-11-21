import { vendorSubcategories } from "./vendorSubcategories";

const allVendorCategories = Object.keys(vendorSubcategories);
const panditsIndex = allVendorCategories.indexOf("Pandits");

export const vendorCategoryNames = allVendorCategories.slice(
  0,
  panditsIndex + 1,
);
