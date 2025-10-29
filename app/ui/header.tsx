'use client';
import {
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Header() {
  const [activeCategory, setActiveCategory] = useState('HOMBRE');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([
    'Casa Campestre',
    'Casa Campestre',
    'Casa Campestre',
  ]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const frequentSearches = ['Casa Campestre', 'Apartamento Centro', 'Cabaña en el Bosque', 'Apartamento Moderno'];


  const handleSearch = useDebouncedCallback((term: string) => {
  const params = new URLSearchParams(searchParams?.toString() || '');

  if (term && term !== 'Todos') {
    params.set('query', term);
  } else {
    params.delete('query');
    params.delete('minprice');
    params.delete('maxprice');
  }
  router.replace(`/?${params.toString()}`);
}, 800);
  const handleSelectSearch = (term: string) => {
    if (!searchHistory.includes(term)) {
      setSearchHistory((prev) => [term, ...prev]);
    }
    const params = new URLSearchParams();
    params.set('query', term);
    router.push(`/?${params.toString()}`);
    setIsSearchOpen(false);
  };

  const clearHistory = () => setSearchHistory([]);

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="px-6 py-4 flex items-center justify-between max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-6">
          <div
            onClick={() => router.push('/')}
            className="text-3xl font-bold cursor-pointer select-none"
          >
            <span className="text-black">Rolando</span>
            <span className="text-red-600">*</span>
            <span className="text-black">a</span>
          </div>
        </div>
            <nav className="hidden lg:flex items-center gap-8">
                {['Todos', 'Apartamentos', 'Cabañas', 'Lotes', 'Comerciales'].map((cat) => (
                    <button
                    key={cat}
                    onClick={() => {
                        setActiveCategory(cat);
                        handleSearch(cat); // 🔥 ejecuta búsqueda al hacer clic
                    }}
                    className={`text-sm font-medium hover:text-gray-600 transition-colors ${
                        activeCategory === cat ? 'underline underline-offset-8 text-black' : 'text-gray-700'
                    }`}
                    >
                    {cat}
                    </button>
                ))}
        </nav>

        <div className="flex items-center gap-4">
          <button onClick={() => setIsSearchOpen(true)}>
            <MagnifyingGlassIcon className="w-5 h-5 cursor-pointer hover:opacity-70" />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isSearchOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-full sm:w-[480px] bg-white shadow-lg z-50 overflow-y-auto">
              <div className="flex items-center gap-3 p-4 border-b">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
               <input
                    type="text"
                    placeholder="Buscar..."
                    defaultValue={searchParams?.get('query')?.toString()}
                    onChange={(e) => handleSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                        const term = (e.target as HTMLInputElement).value.trim();
                        if (term) {
                            handleSelectSearch(term); // ejecuta la búsqueda con el término
                        }
                        setIsSearchOpen(false); // cierra el panel
                        }
                    }}
                    className="flex-1 border-b border-gray-300 focus:border-black outline-none py-1 text-sm"
                    autoFocus
                    />
                <button onClick={() => setIsSearchOpen(false)}>
                  <XMarkIcon className="w-6 h-6 text-gray-600 hover:text-black" />
                </button>
              </div>
              <div className="p-6 text-sm space-y-6">
                {searchHistory.length > 0 && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-gray-700">
                        HISTORIAL DE BÚSQUEDA
                      </h4>
                      <button
                        onClick={clearHistory}
                        className="text-xs text-gray-500 hover:text-red-600"
                      >
                        BORRAR
                      </button>
                    </div>
                    <ul className="space-y-1">
                      {searchHistory.map((item, idx) => (
                        <li
                          key={idx}
                          className="cursor-pointer hover:underline text-gray-800"
                          onClick={() => handleSelectSearch(item)}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">
                    BÚSQUEDAS MÁS FRECUENTES
                  </h4>
                  <ul className="space-y-1">
                    {frequentSearches.map((item, idx) => (
                      <li
                        key={idx}
                        className="cursor-pointer hover:underline text-gray-800"
                        onClick={() => handleSelectSearch(item)}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}