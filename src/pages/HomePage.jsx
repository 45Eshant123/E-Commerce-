import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import HeroSection from '@/components/HeroSection';
import CategoryProductGrid from '@/components/CategoryProductGrid';
import FilterPanel from '@/components/FilterPanel';
import Testimonials from '@/components/Testimonials';
import { ProductGridSkeleton } from '@/components/SkeletonLoader';

const HomePage = () => {
  const { t } = useTranslation();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const [advancedFilters, setAdvancedFilters] = useState({
    category: 'All',
    brand: 'All',
    priceRange: [0, 5000],
    rating: 'All Ratings',
    size: [],
    color: [],
    availability: 'all'
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/products');
        const data = await res.json();
        if (data.success) setProducts(data.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const productCategory =
        product.category?.trim().toLowerCase();

      const filterCategory =
        advancedFilters.category.toLowerCase();

      const matchCategory =
        filterCategory === 'all' ||
        productCategory === filterCategory;

      const matchBrand =
        advancedFilters.brand === 'All' ||
        product.brand?.toLowerCase() === advancedFilters.brand.toLowerCase();

      const matchPrice =
        product.price >= advancedFilters.priceRange[0] &&
        product.price <= advancedFilters.priceRange[1];

      const matchRating =
        advancedFilters.rating === 'All Ratings' ||
        (product.rating >= 4);

      const matchSize =
        advancedFilters.size.length === 0 ||
        advancedFilters.size.some(size => product.sizes?.includes(size));

      const matchColor =
        advancedFilters.color.length === 0 ||
        advancedFilters.color.some(color =>
          product.colors?.map(c => c.toLowerCase()).includes(color.toLowerCase())
        );

      const matchAvailability =
        advancedFilters.availability === 'all' ||
        (advancedFilters.availability === 'inStock' && product.inStock) ||
        (advancedFilters.availability === 'outOfStock' && !product.inStock);

      return (
        matchCategory &&
        matchBrand &&
        matchPrice &&
        matchRating &&
        matchSize &&
        matchColor &&
        matchAvailability
      );
    });
  }, [products, advancedFilters]);

  return (
    <>
      <Helmet>
        <title>{t('home.title')}</title>
        <meta name="description" content={t('home.description')} />
      </Helmet>

      <HeroSection />

      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-end mb-6">
            <FilterPanel
              onFilterChange={setAdvancedFilters}
              isOpen={showFilterPanel}
              onToggle={() => setShowFilterPanel(!showFilterPanel)}
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {t('home.ourProducts')}
          </h2>

          {loading ? (
            <ProductGridSkeleton />
          ) : (
            <CategoryProductGrid products={filteredProducts} />
          )}
        </div>
      </section>

      <Testimonials />
    </>
  );
};

export default HomePage;
