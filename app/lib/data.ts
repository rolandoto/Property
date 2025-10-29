import { Property, PropertyBYId } from "./definitions";
import { formatCurrency } from "./utils";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5198/api";

async function fetchWithDelay<T>(
  endpoint: string,
  options: RequestInit = {},
  delay = 2000 
): Promise<T> {
  if (delay > 0) await new Promise((r) => setTimeout(r, delay));

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    console.error(`HTTP error! status: ${res.status}`);
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

export async function fetchProperties(search: Record<string, any>) {
  try {
    const params = new URLSearchParams();

    if (search?.search) params.append("search", search.search);
    if (search?.minprice) params.append("minPrice", search.minprice);
    if (search?.maxprice) params.append("maxPrice", search.maxprice);

    const endpoint = `/property/filter?${params.toString()}`;
    const data = await fetchWithDelay<Property[]>(endpoint);
    return data.map((property) => ({
      ...property,
      priceRentFormatted: formatCurrency(property.price),
    }));
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch properties.");
  }
}

export async function fetchPropertiesByID(id: string): Promise<PropertyBYId> {
  try {
    const endpoint = `/property/${id}`;
    const data = await fetchWithDelay<PropertyBYId | PropertyBYId[]>(endpoint);
    return Array.isArray(data) ? data[0] : data;
  } catch (error) {
    console.error("Server API Error:", error);
    throw new Error("Failed to fetch property by ID.");
  }
}
