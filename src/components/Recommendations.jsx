import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { ShoppingCart, Eye, Star } from 'lucide-react';
import { products as localProducts } from '@/data/products';

const Recommendations = ({ productId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const loadRecommendations = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `http://localhost:5000/api/recommendations/${productId}`
        );
        const data = await res.json();

        if (data?.success && Array.isArray(data.recommendations)) {
          const mapped = data.recommendations
            .map(r => localProducts.find(p => p.id === r.id))
            .filter(Boolean);

          if (mapped.length > 0) {
            setRecommendations(mapped);
            setLoading(false);
            return;
          }
        }
      } catch {}

      const current = localProducts.find(p => p.id === Number(productId));
      if (current) {
        setRecommendations(
          localProducts
            .filter(p => p.id !== current.id && p.category === current.category)
            .slice(0, 6)
        );
      }

      setLoading(false);
    };

    if (productId) loadRecommendations();
  }, [productId]);

  if (!productId) return null;

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">You May Also Like</h2>
          <p className="text-gray-600 dark:text-gray-400">
            AI-recommended products just for you
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">
            Loading recommendations...
          </p>
        ) : recommendations.length === 0 ? (
          <p className="text-center text-gray-500">
            No recommendations available.
          </p>
        ) : (
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {recommendations.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex-shrink-0 w-64 cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">
                  <div className="aspect-square bg-gray-200">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {product.category}
                    </span>

                    <h3 className="font-semibold text-lg mt-2 line-clamp-2">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-1 my-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-xs text-gray-500">
                        ({product.reviews})
                      </span>
                    </div>

                    <p className="text-xl font-bold text-blue-600">
                      ${product.price.toFixed(2)}
                    </p>

                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                          toast({
                            title: 'Added to cart',
                            description: product.name
                          });
                        }}
                      >
                        <ShoppingCart className="w-3 h-3 mr-1" />
                        Add
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/product/${product.id}`);
                        }}
                      >
                        <Eye className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Recommendations;
