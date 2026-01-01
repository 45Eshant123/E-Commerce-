import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Isolated theme variables for this component
const themeVars = {
  light: {
    background: '#FFFFFF',
    cardBackground: '#F9FAFB',
    primaryText: '#111827',
    secondaryText: '#6B7280',
    accent: '#2563EB',
    border: 'rgba(0,0,0,0.08)',
    hover: 'rgba(37,99,235,0.1)',
    active: 'rgba(37,99,235,0.2)'
  },
  dark: {
    background: '#0B1220',
    cardBackground: '#111827',
    primaryText: '#FFFFFF',
    secondaryText: '#BFC9D6',
    accent: '#3B82F6',
    border: 'rgba(255,255,255,0.08)',
    hover: 'rgba(59,130,246,0.1)',
    active: 'rgba(59,130,246,0.2)'
  }
};

const PriceFilter = ({
  minPrice = 0,
  maxPrice = 1000,
  currentRange = [0, 1000],
  onRangeChange,
  products = [],
  className = ""
}) => {
  const [localRange, setLocalRange] = useState(currentRange);
  const [inputMin, setInputMin] = useState(currentRange[0].toString());
  const [inputMax, setInputMax] = useState(currentRange[1].toString());
  const [activePreset, setActivePreset] = useState(null);

  // Calculate preset ranges based on actual product data
  const presetRanges = useMemo(() => {
    return [
      { label: 'Under ₹500', range: [0, 500] },
      { label: '₹500–₹1000', range: [500, 1000] },
      { label: '₹1000–₹3000', range: [1000, 3000] },
      { label: 'Above ₹3000', range: [3000, maxPrice] }
    ];
  }, [maxPrice]);

  // Update local state when props change
  useEffect(() => {
    setLocalRange(currentRange);
    setInputMin(currentRange[0].toString());
    setInputMax(currentRange[1].toString());
    setActivePreset(null);
  }, [currentRange]);

  const handlePresetClick = (preset, index) => {
    setLocalRange(preset.range);
    setInputMin(preset.range[0].toString());
    setInputMax(preset.range[1].toString());
    setActivePreset(index);
  };

  const handleSliderChange = (newRange) => {
    setLocalRange(newRange);
    setInputMin(newRange[0].toString());
    setInputMax(newRange[1].toString());
    setActivePreset(null);
  };

  const handleInputChange = (type, value) => {
    const numValue = parseFloat(value) || 0;
    if (type === 'min') {
      setInputMin(value);
      const newRange = [Math.max(0, Math.min(numValue, localRange[1])), localRange[1]];
      setLocalRange(newRange);
    } else {
      setInputMax(value);
      const newRange = [localRange[0], Math.min(maxPrice, Math.max(numValue, localRange[0]))];
      setLocalRange(newRange);
    }
    setActivePreset(null);
  };

  const handleApply = () => {
    onRangeChange(localRange);
  };

  const handleClear = () => {
    const defaultRange = [minPrice, maxPrice];
    setLocalRange(defaultRange);
    setInputMin(defaultRange[0].toString());
    setInputMax(defaultRange[1].toString());
    setActivePreset(null);
    onRangeChange(defaultRange);
  };

  const isModified = localRange[0] !== currentRange[0] || localRange[1] !== currentRange[1];

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Preset Chips */}
      <div>
        <div className="flex flex-wrap gap-2 mb-3">
          {presetRanges.map((preset, index) => (
            <button
              key={index}
              onClick={() => handlePresetClick(preset, index)}
              className={`px-3 py-1.5 text-sm rounded-full border transition-all duration-200 ${
                activePreset === index
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dual Range Slider */}
      <div className="px-2">
        <div className="relative">
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div
              className="absolute h-2 bg-blue-500 rounded-full"
              style={{
                left: `${((localRange[0] - minPrice) / (maxPrice - minPrice)) * 100}%`,
                right: `${100 - ((localRange[1] - minPrice) / (maxPrice - minPrice)) * 100}%`
              }}
            />
          </div>

          {/* Min Handle */}
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={localRange[0]}
            onChange={(e) => handleSliderChange([parseFloat(e.target.value), localRange[1]])}
            className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
            style={{
              zIndex: localRange[0] > maxPrice - 50 ? 1 : 2
            }}
          />

          {/* Max Handle */}
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={localRange[1]}
            onChange={(e) => handleSliderChange([localRange[0], parseFloat(e.target.value)])}
            className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
            style={{
              zIndex: 1
            }}
          />
        </div>

        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>${minPrice}</span>
          <span>${maxPrice}</span>
        </div>
      </div>

      {/* Numeric Inputs */}
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            type="number"
            placeholder="Min"
            value={inputMin}
            onChange={(e) => handleInputChange('min', e.target.value)}
            className="text-sm"
            min={minPrice}
            max={maxPrice}
          />
        </div>
        <div className="flex-1">
          <Input
            type="number"
            placeholder="Max"
            value={inputMax}
            onChange={(e) => handleInputChange('max', e.target.value)}
            className="text-sm"
            min={minPrice}
            max={maxPrice}
          />
        </div>
      </div>

      {/* Apply/Clear Buttons */}
      {isModified && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="flex gap-2"
        >
          <Button
            onClick={handleApply}
            size="sm"
            className="flex-1"
          >
            Apply
          </Button>
          <Button
            onClick={handleClear}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            Clear
          </Button>
        </motion.div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
          .price-filter-slider-thumb::-webkit-slider-thumb {
            appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: #3b82f6;
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }

          .price-filter-slider-thumb::-moz-range-thumb {
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: #3b82f6;
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }
        `
      }} />
    </div>
  );
};

export default PriceFilter;
