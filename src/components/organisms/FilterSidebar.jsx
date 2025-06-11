import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon'; // Alias import
import Input from '@/components/atoms/Input'; // New import
import Checkbox from '@/components/atoms/Checkbox'; // New import
import Button from '@/components/atoms/Button'; // New import
import Select from '@/components/atoms/Select'; // New import

const FilterSidebar = ({ filters, onFilterChange, products, onClearAll }) => {
  const [priceRange, setPriceRange] = useState([filters.priceRange[0], filters.priceRange[1]]);

  useEffect(() => {
    setPriceRange([filters.priceRange[0], filters.priceRange[1]]);
  }, [filters.priceRange]);

  const categories = [...new Set(products.map(p => p.category))];
  const brands = [...new Set(products.map(p => p.brand))];
  const sizes = [...new Set(products.flatMap(p => p.sizes || []))];

  const handlePriceChange = (newRange) => {
    setPriceRange(newRange);
    onFilterChange({ ...filters, priceRange: newRange });
  };

  const handleCategoryChange = (category) => {
    onFilterChange({ ...filters, category: filters.category === category ? '' : category });
  };

  const handleBrandChange = (brand) => {
    onFilterChange({ ...filters, brand: filters.brand === brand ? '' : brand });
  };

  const handleSizeChange = (size) => {
    onFilterChange({ ...filters, size: filters.size === size ? '' : size });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-primary">Filters</h2>
        <Button
          onClick={onClearAll}
          className="text-sm text-secondary hover:text-primary transition-colors duration-200 p-0 bg-transparent hover:bg-transparent" // Adjust Button styling for text-only
        >
          Clear All
        </Button>
      </div>

      <div className="space-y-6">
        {/* Categories */}
        <div>
          <h3 className="text-sm font-semibold text-primary mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map(category => (
              <label key={category} className="flex items-center space-x-2 cursor-pointer">
                <Checkbox
                  checked={filters.category === category}
                  onChange={() => handleCategoryChange(category)}
                />
                <span className="text-sm text-secondary hover:text-primary transition-colors duration-200">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="text-sm font-semibold text-primary mb-3">Price Range</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                value={priceRange[0]}
                onChange={(e) => handlePriceChange([parseInt(e.target.value) || 0, priceRange[1]])}
                className="w-20 px-2 py-1 text-sm"
                min="0"
                max="1000"
              />
              <span className="text-secondary">to</span>
              <Input
                type="number"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange([priceRange[0], parseInt(e.target.value) || 1000])}
                className="w-20 px-2 py-1 text-sm"
                min="0"
                max="1000"
              />
            </div>
            <Input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange([priceRange[0], parseInt(e.target.value)])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
            />
          </div>
        </div>

        {/* Brands */}
        <div>
          <h3 className="text-sm font-semibold text-primary mb-3">Brands</h3>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {brands.map(brand => (
              <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                <Checkbox
                  checked={filters.brand === brand}
                  onChange={() => handleBrandChange(brand)}
                />
                <span className="text-sm text-secondary hover:text-primary transition-colors duration-200">
                  {brand}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Sizes */}
        {sizes.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-primary mb-3">Sizes</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map(size => (
                <Button
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  className={`px-3 py-1 text-sm border rounded-lg transition-all duration-200 ${
                    filters.size === size
                      ? 'border-accent bg-accent text-white'
                      : 'border-gray-300 text-secondary hover:border-accent hover:bg-accent/5'
                  }`}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* In Stock Only */}
        <div>
          <label className="flex items-center space-x-2 cursor-pointer">
            <Checkbox
              checked={filters.inStockOnly || false}
              onChange={(e) => onFilterChange({ ...filters, inStockOnly: e.target.checked })}
            />
            <span className="text-sm text-primary">In Stock Only</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;