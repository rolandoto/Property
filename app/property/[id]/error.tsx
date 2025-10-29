'use client';

import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <div className="max-w-md w-full rounded-2xl bg-white p-8 shadow-lg border border-gray-100 animate-fadeIn">
        <div className="flex flex-col items-center">
          <ExclamationTriangleIcon className="h-14 w-14 text-yellow-500 mb-4" />

          <h1 className="text-2xl font-semibold text-gray-800">
            ¡Algo salió mal!
          </h1>

          <p className="mt-3 text-gray-600">
            Ocurrió un error inesperado. Puedes intentar recargar la página o volver a intentarlo.
          </p>

          {error?.digest && (
            <p className="mt-2 text-xs text-gray-400">
              Código de error: {error.digest}
            </p>
          )}

          <button
            onClick={reset}
            className="mt-6 flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <ArrowPathIcon className="h-4 w-4 animate-spin-slow" />
            Reintentar
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-spin-slow {
          animation: spin 2s linear infinite;
        }
      `}</style>
    </main>
  );
}
