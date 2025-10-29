// app/components/PropertyCard.tsx
'use client';
import Link from "next/link";
import { Property } from "../lib/definitions";

export default function PropertyCard({ product }: { product: Property }) {
  const mainImage = product.images?.[0]?.file || "/placeholder.jpg";

  return (
    <Link
      href={`/property/${product.idProperty}`}
      className="group cursor-pointer border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-[2/3] overflow-hidden mb-3 bg-gray-100 rounded-lg">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-800">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500">{product.address}</p>
        <p className="text-sm font-semibold text-gray-900">
          {product.priceRentFormatted}
        </p>
      </div>

      {product.owner && (
        <div className="flex items-center gap-2 mt-3">
          {product.owner.photo && (
            <img
              src={product.owner.photo}
              alt={product.owner.name}
              className="w-6 h-6 rounded-full object-cover"
            />
          )}
          <span className="text-xs text-gray-700">{product.owner.name}</span>
        </div>
      )}
    </Link>
  );
}
