'use client';

import { useState } from 'react';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { formatCurrency } from '../lib/utils';

export const FilterBar = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([10000, 80000]);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePriceChange = (index: number, value: number) => {
    const newRange = [...priceRange] as [number, number];
    newRange[index] = value;
    if (newRange[0] > newRange[1]) {
      if (index === 0) newRange[1] = newRange[0];
      else newRange[0] = newRange[1];
    }
    setPriceRange(newRange);
  };

  const applyFilter = () => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('minprice', priceRange[0].toString());
    params.set('maxprice', priceRange[1].toString());
    router.replace(`/?${params.toString()}`);
    setIsFilterOpen(false);
  };

  const clearFilter = () => {
    setPriceRange([10000, 80000]);
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.delete('minprice');
    params.delete('maxprice');
    router.replace(`/?${params.toString()}`);
  };

  return (
    <>
      <div className="border-b bg-white sticky top-0 z-40">
        <div className="px-6 py-4 max-w-screen-2xl mx-auto">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-gray-800">Buscar propiedades</h2>
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
            >
              <span>FILTRAR</span>
              <FunnelIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-lg z-50 overflow-y-auto"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-semibold text-gray-800">Filtrar por precio</h3>
                <button onClick={() => setIsFilterOpen(false)}>
                  <XMarkIcon className="w-6 h-6 text-gray-600 hover:text-black" />
                </button>
              </div>
              <div className="p-6 space-y-8">
                <div className="flex justify-between text-sm font-medium text-gray-700">
                  <span>{formatCurrency(priceRange[0]) }</span>
                  <span>{formatCurrency(priceRange[1])}</span>
                </div>
                <div className="relative flex flex-col gap-6">
                  <input
                    type="range"
                    min="10000"
                    max="80000"
                    step="1000"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                    className="w-full accent-black"
                  />
                  <input
                    type="range"
                    min="10000"
                    max="80000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                    className="w-full accent-black"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center p-4 border-t bg-gray-50">
                <button
                  onClick={clearFilter}
                  className="text-sm text-gray-500 hover:text-red-600 transition"
                >
                  BORRAR TODO
                </button>
                <button
                  onClick={applyFilter}
                  className="px-6 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition"
                >
                  APLICAR
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
