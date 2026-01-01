import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';

const FilterPanel = ({
  onFilterChange,
  isOpen,
  onToggle,
  categories = ['All', 'Electronics', 'Fashion', 'Home', 'Sports', 'Books']
}) => {
  const { theme } = useTheme();

  const [filters, setFilters] = useState({
    category: 'All',
    brand: 'All',
    priceRange: [0, 5000],
    rating: 'All Ratings',
    size: [],
    color: [],
    availability: 'all'
  });

  const brands = ['All', 'Apple', 'Samsung', 'Nike', 'Sony', 'Dell'];
  const priceRanges = [
    { label: 'Under ₹500', value: [0, 500] },
    { label: '₹500-₹1000', value: [500, 1000] },
    { label: '₹1000-₹5000', value: [1000, 5000] },
    { label: 'Above ₹5000', value: [5000, 999999] }
  ];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = [
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Green', value: '#10B981' },
    { name: 'Yellow', value: '#EAB308' },
    { name: 'Purple', value: '#A855F7' },
    { name: 'Pink', value: '#EC4899' }
  ];
  const ratingOptions = ['All Ratings', 'All', 'Custom', 'Polyester', 'Leather', 'Metal', 'Plastic', 'Wood'];

  useEffect(() => {
    onFilterChange(filters);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayValue = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(v => v !== value)
        : [...prev[key], value]
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      category: 'All',
      brand: 'All',
      priceRange: [0, 5000],
      rating: 'All Ratings',
      size: [],
      color: [],
      availability: 'all'
    });
  };

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    handleFilterChange('priceRange', [0, value]);
  };

  return (
    <div className="relative">
      {/* Filter Toggle Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
        className="flex items-center gap-2 px-4 py-2 rounded-lg shadow-md bg-blue-600 hover:bg-blue-700 text-white transition-colors"
      >
        <Filter className="w-5 h-5" />
        Filters
      </motion.button>

      {/* Filter Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="fixed left-0 top-0 z-40 h-screen w-72 overflow-y-auto bg-[#0B1220] text-white shadow-2xl"
          >
            <div className="p-4 space-y-6">
              {/* Header */}
              <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filter Products
                </h2>
                <button onClick={onToggle} className="hover:bg-gray-800 rounded p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="font-medium mb-3 text-sm">Category</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => handleFilterChange('category', cat)}
                      className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                        filters.category === cat
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-600 hover:border-blue-500'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div>
                <h3 className="font-medium mb-3 text-sm">Brand</h3>
                <div className="flex flex-wrap gap-2">
                  {brands.map(brand => (
                    <button
                      key={brand}
                      onClick={() => handleFilterChange('brand', brand)}
                      className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                        filters.brand === brand
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-600 hover:border-blue-500'
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="font-medium mb-3 text-sm">₹</h3>
                <div className="space-y-2 mb-3">
                  {priceRanges.map((range, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleFilterChange('priceRange', range.value)}
                      className={`w-full px-3 py-1.5 text-xs rounded-full border text-left transition-colors ${
                        filters.priceRange[0] === range.value[0] && filters.priceRange[1] === range.value[1]
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-600 hover:border-blue-500'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={filters.priceRange[1]}
                    onChange={handlePriceChange}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>0</span>
                    <span>5000</span>
                  </div>
                </div>
              </div>

              {/* Size Filter */}
              <div>
                <h3 className="font-medium mb-3 text-sm">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => toggleArrayValue('size', size)}
                      className={`w-10 h-10 text-xs rounded-full border transition-colors ${
                        filters.size.includes(size)
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-600 hover:border-blue-500'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div>
                <h3 className="font-medium mb-3 text-sm">Color</h3>
                <div className="grid grid-cols-4 gap-2">
                  {colors.map(color => (
                    <button
                      key={color.name}
                      onClick={() => toggleArrayValue('color', color.name)}
                      className={`flex flex-col items-center gap-1 p-2 rounded border transition-colors ${
                        filters.color.includes(color.name)
                          ? 'border-blue-600 bg-gray-800'
                          : 'border-gray-600 hover:border-blue-500'
                      }`}
                    >
                      <div
                        className="w-6 h-6 rounded-full border-2 border-gray-500"
                        style={{ backgroundColor: color.value }}
                      />
                      <span className="text-xs">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h3 className="font-medium mb-3 text-sm">Rating</h3>
                <div className="relative">
                  <select
                    value={filters.rating}
                    onChange={e => handleFilterChange('rating', e.target.value)}
                    className="w-full bg-[#0B1220] border border-gray-600 rounded p-2 text-sm appearance-none pr-8 cursor-pointer hover:border-blue-500 focus:outline-none focus:border-blue-500"
                  >
                    {ratingOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-400" />
                </div>
              </div>

              {/* Availability Filter */}
              <div>
                <h3 className="font-medium mb-3 text-sm">Availability</h3>
                <div className="space-y-2">
                  {['all', 'inStock', 'outOfStock'].map(option => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="availability"
                        value={option}
                        checked={filters.availability === option}
                        onChange={e => handleFilterChange('availability', e.target.value)}
                        className="w-4 h-4 accent-blue-600 cursor-pointer"
                      />
                      <span className="text-sm">
                        {option === 'all' ? 'All Products' : option === 'inStock' ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t border-gray-700">
                <button
                  onClick={clearAllFilters}
                  className="flex-1 px-4 py-2 text-sm border border-gray-600 rounded hover:bg-gray-800 transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={onToggle}
                  className="flex-1 px-4 py-2 text-sm bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterPanel;
