const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200 before:to-transparent";

export function ProductCardSkeleton() {
  return (
    <div
      className={`${shimmer} relative w-full overflow-hidden rounded-2xl bg-white shadow-sm`}>
      <div className="relative aspect-[4/5] sm:aspect-[3/4] md:aspect-[2/3] w-full bg-gray-200 overflow-hidden rounded-t-2xl">
        <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-gray-300" />
      </div>
      <div className="p-3 sm:p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-gray-300" />
          <div className="h-4 w-20 sm:w-24 rounded-md bg-gray-200" />
        </div>
        <div className="h-4 w-2/3 sm:w-3/4 rounded-md bg-gray-200" />
        <div className="h-5 w-16 sm:w-20 rounded-md bg-gray-300" />
        <div className="flex flex-wrap gap-2">
          <div className="h-4 w-14 sm:w-16 rounded-md bg-gray-200" />
          <div className="h-4 w-10 sm:w-12 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export function ProductCardsSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 w-full">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}


export default function PropertyDetailSkeleton() {
  return (
    <main
      className={`${shimmer} relative min-h-screen bg-gray-50 py-10 px-4 sm:px-8 lg:px-16 overflow-hidden`}
    >
      {/* Título */}
      <div className="h-8 w-64 bg-gray-200 rounded-md mb-3" />
      <div className="h-4 w-40 bg-gray-200 rounded-md mb-2" />
      <div className="h-6 w-32 bg-gray-300 rounded-md mb-6" />

      {/* Galería */}
      <div className="h-5 w-40 bg-gray-200 rounded-md mb-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="w-full h-56 bg-gray-200 rounded-xl overflow-hidden"
          />
        ))}
      </div>

      {/* Propietario */}
      <section className="bg-white p-6 rounded-2xl shadow-md mb-10">
        <div className="h-5 w-32 bg-gray-200 rounded-md mb-4" />
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="w-20 h-20 rounded-full bg-gray-200" />
          <div className="flex-1 space-y-3">
            <div className="h-4 w-32 bg-gray-200 rounded-md" />
            <div className="h-4 w-48 bg-gray-100 rounded-md" />
            <div className="h-3 w-40 bg-gray-100 rounded-md" />
          </div>
        </div>
      </section>

      {/* Historial */}
      <section className="bg-white p-6 rounded-2xl shadow-md">
        <div className="h-5 w-44 bg-gray-200 rounded-md mb-4" />
        <div className="divide-y">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="py-3 flex flex-col sm:flex-row gap-3">
              <div className="h-4 w-24 bg-gray-200 rounded-md" />
              <div className="h-4 w-36 bg-gray-100 rounded-md" />
              <div className="h-4 w-28 bg-gray-100 rounded-md" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}



