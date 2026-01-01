import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Recommendations from '@/components/Recommendations';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Star, ShoppingCart, Check, Minus, Plus } from 'lucide-react';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await res.json();
        if (data.success) {
          setProduct(data.product);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return null;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name}`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{product.name} - ShopHub</title>
      </Helmet>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto"
          >
            <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full mb-4">
                {product.category}
              </span>

              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span>({product.reviews})</span>
              </div>

              <p className="text-3xl font-bold text-blue-600 mb-6">
                ₹{product.price}
              </p>

              <p className="mb-6">{product.description}</p>

              <div className="flex items-center gap-4 mb-6">
                <Button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus />
                </Button>
                <span>{quantity}</span>
                <Button onClick={() => setQuantity(quantity + 1)}>
                  <Plus />
                </Button>
              </div>

              <Button size="lg" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2" />
                Add to Cart
              </Button>

              {product.inStock && (
                <p className="text-green-600 mt-4 flex items-center gap-2">
                  <Check /> In Stock
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </main>

      <Recommendations productId={id} />
    </div>
  );
};

export default ProductPage;
