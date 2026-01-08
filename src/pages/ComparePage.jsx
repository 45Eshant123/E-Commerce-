import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, ShoppingCart, Star, Check, X as Close } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { products } from '@/data/products';

const ComparePage = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCompare = (product) => {
    if (selectedProducts.length >= 3) {
      toast({
        title: "Maximum limit reached",
        description: "You can compare up to 3 products at a time.",
        variant: "destructive",
      });
      return;
    }
    if (selectedProducts.find(p => p.id === product.id)) {
      toast({
        title: "Already added",
        description: "This product is already in comparison.",
        variant: "destructive",
      });
      return;
    }
    setSelectedProducts([...selectedProducts, product]);
    toast({
      title: "Added to comparison",
      description: product.name,
    });
  };

  const handleRemoveFromCompare = (productId) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
  };

  const handleAddToCart = (product) => {
    if (!product.inStock) {
      toast({
        title: "Out of stock",
        description: "This product is currently unavailable.",
        variant: "destructive",
      });
      return;
    }
    addToCart(product);
    toast({
      title: "Added to cart! 🛒",
      description: product.name,
    });
  };

  const renderFeatureComparison = (feature, products) => {
    return products.map(product => {
      const value = product[feature];
      if (typeof value === 'boolean') {
        return (
          <td key={product.id} className="px-4 py-3 text-center">
            {value ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <Close className="w-5 h-5 text-red-500 mx-auto" />}
          </td>
        );
      }
      if (feature === 'rating') {
        return (
          <td key={product.id} className="px-4 py-3 text-center">
            <div className="flex items-center justify-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{value}</span>
              <span className="text-sm text-gray-500">({product.reviews})</span>
            </div>
          </td>
        );
      }
      return (
        <td key={product.id} className="px-4 py-3 text-center font-medium">
          {value}
        </td>
      );
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Compare Products - ShopHub</title>
        <meta name="description" content="Compare products side by side to make the best choice" />
      </Helmet>

      <main className="flex-1 py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Compare Products</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Select up to 3 products to compare their features side by side.
            </p>
          </div>

          {/* Product Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Add Products to Compare</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.slice(0, 8).map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ scale: 1.02 }}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedProducts.find(p => p.id === product.id)
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                  onClick={() => handleAddToCompare(product)}
                >
                  <img
                    src="https://images.unsplash.com/photo-1635865165118-917ed9e20936"
                    alt={product.name}
                    className="w-full h-32 object-cover rounded mb-3"
                  />
                  <h3 className="font-medium text-sm mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">${product.price}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Comparison Table */}
          {selectedProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="px-4 py-4 text-left font-semibold text-gray-900 dark:text-white">Feature</th>
                      {selectedProducts.map(product => (
                        <th key={product.id} className="px-4 py-4 text-center min-w-[200px]">
                          <div className="relative">
                            <button
                              onClick={() => handleRemoveFromCompare(product.id)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                            <img
                              src="https://images.unsplash.com/photo-1635865165118-917ed9e20936"
                              alt={product.name}
                              className="w-full h-32 object-cover rounded mb-3"
                            />
                            <Link to={`/product/${product.id}`}>
                              <h3 className="font-semibold text-sm mb-2 hover:text-blue-600 dark:hover:text-blue-400 line-clamp-2">
                                {product.name}
                              </h3>
                            </Link>
                            <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">${product.price}</p>
                            <Button
                              size="sm"
                              onClick={() => handleAddToCart(product)}
                              disabled={!product.inStock}
                              className="w-full gap-2"
                            >
                              <ShoppingCart className="w-4 h-4" />
                              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                            </Button>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">Category</td>
                      {renderFeatureComparison('category', selectedProducts)}
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">Rating</td>
                      {renderFeatureComparison('rating', selectedProducts)}
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">In Stock</td>
                      {renderFeatureComparison('inStock', selectedProducts)}
                    </tr>
                    {selectedProducts[0]?.features && (
                      <>
                        {selectedProducts[0].features.map((feature, index) => (
                          <tr key={index} className="border-b border-gray-100 dark:border-gray-700">
                            <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{feature}</td>
                            {selectedProducts.map(product => (
                              <td key={product.id} className="px-4 py-3 text-center">
                                {product.features && product.features.includes(feature) ? (
                                  <Check className="w-5 h-5 text-green-500 mx-auto" />
                                ) : (
                                  <Close className="w-5 h-5 text-red-500 mx-auto" />
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {selectedProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                No products selected
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                Choose products from above to start comparing their features and specifications.
              </p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ComparePage;
