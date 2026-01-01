import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const FloatingCartButton = () => {
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  if (cartCount === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-8 left-8 z-50"
    >
      <Button
        onClick={() => navigate('/cart')}
        size="icon"
        className="rounded-full shadow-lg hover:shadow-xl transition-shadow relative"
      >
        <ShoppingCart className="w-5 h-5" />
        {cartCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold"
          >
            {cartCount}
          </motion.span>
        )}
      </Button>
    </motion.div>
  );
};

export default FloatingCartButton;
