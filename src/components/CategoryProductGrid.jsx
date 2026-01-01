import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';

const CategoryProductGrid = ({ products }) => {
  const productsByCategory = useMemo(() => {
    const grouped = {};

    products.forEach(product => {
      const rawCategory = product.category?.trim() || 'Other';
      const category =
        rawCategory.charAt(0).toUpperCase() +
        rawCategory.slice(1).toLowerCase();

      if (!grouped[category]) {
        grouped[category] = [];
      }

      grouped[category].push(product);
    });

    return grouped;
  }, [products]);

  const categoryOrder = ['Electronics', 'Fashion', 'Home', 'Sports', 'Books'];

  const categories = useMemo(() => {
    return Object.keys(productsByCategory).sort(
      (a, b) =>
        categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
    );
  }, [productsByCategory]);

  if (categories.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No products available.
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {categories.map((category, categoryIndex) => (
        <motion.section
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
        >
          <h2 className="text-3xl font-bold mb-6 border-b pb-4">
            {category}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productsByCategory[category].map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </motion.section>
      ))}
    </div>
  );
};

export default CategoryProductGrid;
