import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PriceFilter from '@/components/ui/price-filter';

const ProductFilters = ({ onFilterChange, categories, priceRange, sortOptions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 500]);
  const [selectedSort, setSelectedSort] = useState('featured');

  const handleCategoryToggle = (category) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newCategories);
    onFilterChange({
      categories: newCategories,
      priceRange: selectedPriceRange,
      sort: selectedSort
    });
  };

  const handlePriceChange = (min, max) => {
    const newPriceRange = [min, max];
    setSelectedPriceRange(newPriceRange);
    onFilterChange({
      categories: selectedCategories,
      priceRange: newPriceRange,
      sort: selectedSort
    });
  };

  const handleSortChange = (sort) => {
    setSelectedSort(sort);
    onFilterChange({
      categories: selectedCategories,
      priceRange: selectedPriceRange,
      sort
    });
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRange([0, 500]);
    setSelectedSort('featured');
    onFilterChange({
      categories: [],
      priceRange: [0, 500],
      sort: 'featured'
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          <span className="font-medium">Filters</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
        >
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="md:h-auto md:opacity-100 overflow-hidden"
      >
        <div className="space-y-6">
          {/* Categories */}
          <div>
            <h3 className="font-medium mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategories.includes(category) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryToggle(category)}
                  className="text-xs"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Product Names */}
          <div>
            <h3 className="font-medium mb-3">Product Names</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {[
                'Premium Wireless Headphones',
                'Smart Fitness Watch',
                'Designer Leather Backpack',
                'Portable Bluetooth Speaker',
                'Minimalist Desk Lamp',
                'Organic Cotton T-Shirt',
                'Stainless Steel Water Bottle',
                'Wireless Charging Pad'
              ].map((productName) => (
                <label key={productName} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(productName)}
                    onChange={() => handleCategoryToggle(productName)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{productName}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-medium mb-3">Price Range</h3>
            <PriceFilter
              minPrice={0}
              maxPrice={5000}
              currentRange={selectedPriceRange}
              onRangeChange={(newRange) => handlePriceChange(newRange[0], newRange[1])}
              products={[]} // Empty array since we don't have access to products here
            />
          </div>

          {/* Sort */}
          <div>
            <h3 className="font-medium mb-3">Sort By</h3>
            <select
              value={selectedSort}
              onChange={(e) => handleSortChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {(selectedCategories.length > 0 || selectedPriceRange[0] > 0 || selectedPriceRange[1] < 500 || selectedSort !== 'featured') && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="w-full"
            >
              <X className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProductFilters;
