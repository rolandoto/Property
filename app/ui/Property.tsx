
import { fetchProperties } from "../lib/data";
import { Property } from "../lib/definitions";
import PropertyCard from "./PropertyCard";

export default async function PropertyList({
  query,
  minprice,
  maxprice,
}: {
  query?: string;
  minprice?: string;
  maxprice?: string;
}) {
  const filters: Record<string, string> = {};

  if (query) filters.search = query;
  if (minprice) filters.minprice = minprice;
  if (maxprice) filters.maxprice = maxprice;

  const properties: Property[] = await fetchProperties(filters);

  return (
    <>
       {properties.map((product) => (
        <PropertyCard key={product.idProperty} product={product} />
      ))}
    </>
  );
}