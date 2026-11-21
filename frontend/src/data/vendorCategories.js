import { vendorListings } from "./vendorListings";
import { vendorSubcategories } from "./vendorSubcategories";

export const vendorCategoryNames = [
  ...new Set([
    ...Object.keys(vendorSubcategories),
    ...vendorListings.map((vendor) => vendor.serviceType),
  ]),
];
