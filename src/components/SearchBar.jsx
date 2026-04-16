import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { products as localProducts } from '@/data/products';
import Fuse from 'fuse.js';

const SearchBar = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [products, setProducts] = useState(localProducts);
  const navigate = useNavigate();

  useEffect(() => {
    let isActive = true;

    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        const data = await res.json();

        if (isActive && data?.success && Array.isArray(data.products)) {
          const mergedProducts = [...data.products, ...localProducts].reduce(
            (accumulator, product) => {
              if (!product?.id || accumulator.some(item => item.id === product.id)) {
                return accumulator;
              }

              accumulator.push(product);
              return accumulator;
            },
            []
          );

          setProducts(mergedProducts);
          return;
        }
      } catch (error) {
        console.error('Failed to load products for search:', error);
      }

      if (isActive) {
        setProducts(localProducts);
      }
    };

    fetchProducts();

    return () => {
      isActive = false;
    };
  }, []);

  const fuse = useMemo(() => {
    return new Fuse(products, {
      keys: ['name', 'description', 'category', 'features'],
      threshold: 0.35,
      ignoreLocation: true,
      minMatchCharLength: 1,
    });
  }, [products]);

  useEffect(() => {
    const normalizedQuery = query.trim();

    if (normalizedQuery.length > 0) {
      const searchResults = fuse.search(normalizedQuery).map(result => result.item);
      setResults(searchResults.slice(0, 5));
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [query]);

  const handleSearch = (productId) => {
    navigate(`/product/${productId}`);
    setQuery('');
    setShowResults(false);
  };

  const clearSearch = () => {
    setQuery('');
    setShowResults(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder={t('search.placeholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg mt-1 z-50 max-h-80 overflow-y-auto">
          {results.map((product) => (
            <button
              key={product.id}
              onClick={() => handleSearch(product.id)}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600 last:border-b-0"
            >
              <div className="font-medium text-gray-900 dark:text-white">{product.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{product.category}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
