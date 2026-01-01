import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, GitCompare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/components/ui/use-toast';

const ProductCard = ({ product, showCompare = true }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!product.inStock) {
      toast({
        title: t('product.outOfStock'),
        description: t('product.outOfStockMessage'),
        variant: "destructive",
      });
      return;
    }
    addToCart(product);
    toast({
      title: t('product.addedToCart'),
      description: product.name,
    });
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    addToWishlist(product);
    toast({
      title: isInWishlist(product.id)
        ? t('product.removedFromWishlist')
        : t('product.addedToWishlist'),
      description: product.name,
    });
  };

  const handleCompare = (e) => {
    e.stopPropagation();
    navigate('/compare', { state: { productId: product.id } });
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-[#0B1220] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer relative group"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {product.rating >= 4.8 && (
          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            {t('product.hot')}
          </span>
        )}
        {!product.inStock && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            {t('product.outOfStock')}
          </span>
        )}
      </div>

      <div className="absolute top-3 right-3 z-10">
        <div className="flex flex-col gap-2">
          <Button
            size="icon"
            variant="secondary"
            onClick={handleWishlist}
            className={`w-8 h-8 rounded-full ${
              isInWishlist(product.id)
                ? 'bg-red-500 text-white'
                : 'bg-white/70 dark:bg-gray-800/70'
            }`}
          >
            <Heart
              className={`w-4 h-4 ${
                isInWishlist(product.id)
                  ? 'fill-current'
                  : 'text-gray-400 group-hover:text-red-500 group-hover:fill-red-500'
              }`}
            />
          </Button>

          {showCompare && (
            <Button
              size="icon"
              variant="secondary"
              onClick={handleCompare}
              className="w-8 h-8 rounded-full bg-white/70 dark:bg-[#0B1220]/70"
            >
              <GitCompare className="w-4 h-4 text-gray-600 dark:text-white/70" />
            </Button>
          )}
        </div>
      </div>

      <div className="aspect-square bg-gray-100 dark:bg-gray-700 overflow-hidden relative">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-600 animate-pulse" />
        )}

        <img
          alt={product.name}
          src={imageError ? "/img/image.png" : product.image}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={`w-full h-full object-cover transition-transform duration-300 hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      <div className="p-5">
        <div className="mb-2">
          <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>

        <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-900 dark:text-white">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300 dark:text-gray-600'
              }`}
            />
          ))}
          <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
            ({product.reviews})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            ${product.price.toFixed(2)}
          </p>

          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            {product.inStock ? 'Add' : 'Sold Out'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
