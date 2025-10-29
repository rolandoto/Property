import { fetchPropertiesByID } from "@/app/lib/data";
import { PropertyBYId } from "@/app/lib/definitions";
import { formatCurrency, formatDateToLocal } from "@/app/lib/utils";

export default async function PropertybyId({id}:{id:string}) {

  const property:PropertyBYId = await fetchPropertiesByID(id);

  if (!property) {
    return (
      <main className="p-10 text-center text-gray-500">
        Propiedad no encontrada 😢
      </main>
    );
  }
  return (
     <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8 lg:px-16">
      <section className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          {property.name}
        </h1>
        <p className="text-gray-600">{property.address}</p>
        <p className="text-2xl font-semibold text-black mt-3">
          ${property.price.toLocaleString("es-CO")} COP
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Galería de imágenes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {property.images.map((img) => (
            <div
              key={img.idPropertyImage}
              className="relative overflow-hidden rounded-xl shadow-md group"
            >
              <img
                src={img.file}
                alt="Foto del inmueble"
                className="w-full cursor-pointer h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white p-6 rounded-2xl shadow-md mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Propietario
        </h2>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <img
            src={property.owner.photo}
            alt={property.owner.name}
            className="w-20 h-20 rounded-full cursor-pointer object-cover border border-gray-200 shadow-sm"
          />
          <div className="text-center sm:text-left">
            <p className="font-medium text-gray-800 text-lg">
              {property.owner.name}
            </p>
            <p className="text-gray-500 text-sm">{property.owner.address}</p>
            <p className="text-gray-400 text-xs mt-1">
              🎂 Cumpleaños:{" "}
              {formatDateToLocal(property.owner.birthday)}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Historial de Ventas
        </h2>
        <div className="divide-y">
          {property.traces.map((trace) => (
            <div
              key={trace.idPropertyTrace}
              className="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-sm"
            >
              <p className="font-medium text-gray-700">{trace.name}</p>
              <p className="text-gray-600">
                {new Date(trace.dateSale).toLocaleDateString("es-CO")} —{" "}
                <span className="font-semibold">
                  {formatCurrency( trace.value)} 
                </span>
              </p>
              <p className="text-gray-500">
                Impuesto: {formatCurrency(trace.tax)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
