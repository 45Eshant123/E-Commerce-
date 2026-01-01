import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Heart,
  ShoppingCart,
  Trash2,
  Bell,
  GitCompare,
  Share2,
  Filter,
  SortAsc,
  CheckSquare,
  Square,
  X
} from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import PriceFilter from '@/components/ui/price-filter';

// Isolated theme variables for this page
const themeVars = {
  light: {
    background: '#FFFFFF',
    cardBackground: '#F9FAFB',
    primaryText: '#111827',
    secondaryText: '#6B7280',
    priceAccent: '#2563EB',
    divider: 'rgba(0,0,0,0.08)'
  },
  dark: {
    background: '#0B1220',
    cardBackground: '#111827',
    primaryText: '#FFFFFF',
    secondaryText: '#BFC9D6',
    priceAccent: '#3B82F6',
    divider: 'rgba(255,255,255,0.08)'
  }
};

// Isolated component for product card
const WishlistProductCard = ({ product, index, onRemove, onAddToCart, onTogglePriceAlert, onCompare, hasPriceAlert }) => {
  const { theme } = useTheme();
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Black');

  const getStockStatus = () => {
    if (!product.inStock) return { text: 'Out of Stock', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' };
    if (product.stock <= 5) return { text: 'Low Stock', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20' };
    return { text: 'In Stock', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' };
  };

  const stockStatus = getStockStatus();
  const currentTheme = themeVars[theme];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
      style={{
        backgroundColor: currentTheme.cardBackground,
        border: `1px solid ${currentTheme.divider}`
      }}
    >
      <div className="aspect-square overflow-hidden relative">
        <img
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          src={product.image || "https://images.unsplash.com/photo-1635865165118-917ed9e20936"}
        />

        {/* Action buttons overlay */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onRemove(product.id, product.name)}
            className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            style={{ backgroundColor: currentTheme.cardBackground }}
          >
            <Heart className="w-4 h-4 fill-red-500 text-red-500" />
          </button>
          <button
            onClick={() => onTogglePriceAlert(product.id)}
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform ${hasPriceAlert(product.id) ? 'bg-yellow-500 text-white' : ''}`}
            style={{ backgroundColor: currentTheme.cardBackground }}
          >
            <Bell className={`w-4 h-4 ${hasPriceAlert(product.id) ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={() => onCompare(product)}
            className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            style={{ backgroundColor: currentTheme.cardBackground }}
          >
            <GitCompare className="w-4 h-4" />
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.rating >= 4.8 && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              Hot
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </span>
          )}
        </div>
      </div>

      <div className="p-5">
        <div className="mb-2">
          <span
            className="text-xs font-medium px-2 py-1 rounded"
            style={{
              color: currentTheme.priceAccent,
              backgroundColor: theme === 'light' ? 'rgba(37,99,235,0.1)' : 'rgba(59,130,246,0.1)'
            }}
          >
            {product.category}
          </span>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3
            className="font-bold text-lg mb-2 line-clamp-2 hover:underline transition-all duration-200"
            style={{ color: currentTheme.primaryText }}
          >
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Heart
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300 dark:text-gray-600'
              }`}
            />
          ))}
          <span className="text-sm ml-1" style={{ color: currentTheme.secondaryText }}>
            ({product.reviews})
          </span>
        </div>

        {/* Stock Status */}
        <div className={`text-xs px-2 py-1 rounded-full mb-3 inline-block ${stockStatus.bg}`}>
          <span className={stockStatus.color}>{stockStatus.text}</span>
        </div>

        {/* Variant Options */}
        <div className="mb-3 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium" style={{ color: currentTheme.secondaryText }}>Size:</span>
            {['S', 'M', 'L', 'XL'].map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`text-xs px-2 py-1 rounded border transition-colors ${
                  selectedSize === size
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium" style={{ color: currentTheme.secondaryText }}>Color:</span>
            {['Black', 'White', 'Blue'].map(color => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`text-xs px-2 py-1 rounded border transition-colors ${
                  selectedColor === color
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span
              className="text-2xl font-bold"
              style={{ color: currentTheme.priceAccent }}
            >
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span
                className="text-sm line-through"
                style={{ color: currentTheme.secondaryText }}
              >
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <Button
          size="sm"
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
          className="w-full gap-2 hover:scale-105 transition-transform duration-200"
          style={{
            backgroundColor: product.inStock ? currentTheme.priceAccent : undefined,
            opacity: product.inStock ? 1 : 0.5
          }}
        >
          <ShoppingCart className="w-4 h-4" />
          {product.inStock ? 'Add to Cart' : 'Sold Out'}
        </Button>
      </div>
    </motion.div>
  );
};

const WishlistPage = () => {
  const { theme } = useTheme();
  const {
    wishlist,
    selectedItems,
    removeFromWishlist,
    togglePriceAlert,
    hasPriceAlert,
    toggleItemSelection,
    selectAllItems,
    deselectAllItems,
    bulkRemoveFromWishlist,
    getBulkSelectedProducts,
    sortWishlist,
    filterWishlist,
    shareWishlist
  } = useWishlist();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const [sortBy, setSortBy] = useState('newest');
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    priceRange: [0, 1000],
    availability: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  const currentTheme = themeVars[theme];

  // Filtered and sorted wishlist
  const processedWishlist = useMemo(() => {
    let filtered = filterWishlist(filters);
    // Apply sorting
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.addedAt || 0) - new Date(a.addedAt || 0);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'discounts':
          const aDiscount = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) * 100 : 0;
          const bDiscount = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) * 100 : 0;
          return bDiscount - aDiscount;
        default:
          return 0;
      }
    });
  }, [wishlist, filters, sortBy, filterWishlist]);

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

  const handleRemoveFromWishlist = (productId, productName) => {
    removeFromWishlist(productId);
    toast({
      title: "Removed from wishlist",
      description: productName,
    });
  };

  const handleBulkAddToCart = () => {
    const selectedProducts = getBulkSelectedProducts();
    selectedProducts.forEach(product => {
      if (product.inStock) {
        addToCart(product);
      }
    });
    toast({
      title: `Added ${selectedProducts.filter(p => p.inStock).length} items to cart`,
      description: "Selected products have been added to your cart.",
    });
    deselectAllItems();
  };

  const handleBulkRemove = () => {
    const selectedProducts = getBulkSelectedProducts();
    bulkRemoveFromWishlist(selectedItems);
    toast({
      title: `Removed ${selectedProducts.length} items`,
      description: "Selected products have been removed from your wishlist.",
    });
  };

  const handleShareWishlist = () => {
    const shareUrl = shareWishlist();
    if (shareUrl) {
      toast({
        title: "Wishlist shared!",
        description: "Share link copied to clipboard.",
      });
    }
  };

  const handleCompare = (product) => {
    // This would typically navigate to a compare page or open a modal
    toast({
      title: "Compare feature",
      description: `${product.name} added to comparison.`,
    });
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: currentTheme.background }}
    >
      <Helmet>
        <title>My Wishlist - ShopHub</title>
        <meta name="description" content="View and manage your saved products" />
      </Helmet>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-red-500 fill-current" />
              <h1
                className="text-4xl font-bold"
                style={{ color: currentTheme.primaryText }}
              >
                My Wishlist
              </h1>
            </div>

            {wishlist.length > 0 && (
              <Button
                onClick={handleShareWishlist}
                variant="outline"
                className="gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share Wishlist
              </Button>
            )}
          </div>

          {wishlist.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Heart className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: currentTheme.primaryText }}
              >
                Your wishlist is empty
              </h2>
              <p
                className="mb-8 max-w-md mx-auto"
                style={{ color: currentTheme.secondaryText }}
              >
                Start adding products you love to your wishlist. They'll be saved here for easy access.
              </p>
              <Link to="/">
                <Button size="lg" className="gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Continue Shopping
                </Button>
              </Link>
            </motion.div>
          ) : (
            <>
              {/* Controls */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8 p-4 rounded-lg" style={{ backgroundColor: currentTheme.cardBackground, border: `1px solid ${currentTheme.divider}` }}>
                <div className="flex items-center gap-4">
                  <span style={{ color: currentTheme.secondaryText }}>
                    {processedWishlist.length} {processedWishlist.length === 1 ? 'item' : 'items'}
                  </span>

                  {selectedItems.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span style={{ color: currentTheme.secondaryText }}>
                        {selectedItems.length} selected
                      </span>
                      <Button size="sm" onClick={handleBulkAddToCart} className="gap-1">
                        <ShoppingCart className="w-3 h-3" />
                        Add to Cart
                      </Button>
                      <Button size="sm" variant="destructive" onClick={handleBulkRemove} className="gap-1">
                        <Trash2 className="w-3 h-3" />
                        Remove
                      </Button>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 ml-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="gap-2"
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                  </Button>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 rounded border text-sm"
                    style={{
                      backgroundColor: currentTheme.cardBackground,
                      borderColor: currentTheme.divider,
                      color: currentTheme.primaryText
                    }}
                  >
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="discounts">Discounts</option>
                  </select>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={selectedItems.length === processedWishlist.length ? deselectAllItems : selectAllItems}
                    className="gap-2"
                  >
                    {selectedItems.length === processedWishlist.length ? (
                      <CheckSquare className="w-4 h-4" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                    {selectedItems.length === processedWishlist.length ? 'Deselect All' : 'Select All'}
                  </Button>
                </div>
              </div>

              {/* Filters Panel */}
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 rounded-lg"
                  style={{ backgroundColor: currentTheme.cardBackground, border: `1px solid ${currentTheme.divider}` }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.primaryText }}>
                        Category
                      </label>
                      <select
                        value={filters.category}
                        onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 rounded border text-sm"
                        style={{
                          backgroundColor: currentTheme.background,
                          borderColor: currentTheme.divider,
                          color: currentTheme.primaryText
                        }}
                      >
                        <option value="">All Categories</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Home">Home</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.primaryText }}>
                        Price Range
                      </label>
                      <PriceFilter
                        minPrice={0}
                        maxPrice={1000}
                        currentRange={filters.priceRange}
                        onRangeChange={(newRange) => setFilters(prev => ({ ...prev, priceRange: newRange }))}
                        products={[]} // Empty array since we don't have access to products here
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.primaryText }}>
                        Availability
                      </label>
                      <select
                        value={filters.availability}
                        onChange={(e) => setFilters(prev => ({ ...prev, availability: e.target.value }))}
                        className="w-full px-3 py-2 rounded border text-sm"
                        style={{
                          backgroundColor: currentTheme.background,
                          borderColor: currentTheme.divider,
                          color: currentTheme.primaryText
                        }}
                      >
                        <option value="">All</option>
                        <option value="in-stock">In Stock</option>
                        <option value="out-of-stock">Out of Stock</option>
                      </select>
                    </div>

                    <div className="flex items-end">
                      <Button
                        onClick={() => setFilters({ category: '', brand: '', priceRange: [0, 1000], availability: '' })}
                        variant="outline"
                        className="w-full"
                      >
                        Clear Filters
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {processedWishlist.map((product, index) => (
                  <div key={product.id} className="relative">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(product.id)}
                      onChange={() => toggleItemSelection(product.id)}
                      className="absolute top-3 left-3 z-10 w-5 h-5 rounded border-2 border-white shadow-md"
                      style={{ backgroundColor: currentTheme.cardBackground }}
                    />
                    <WishlistProductCard
                      product={product}
                      index={index}
                      onRemove={handleRemoveFromWishlist}
                      onAddToCart={handleAddToCart}
                      onTogglePriceAlert={togglePriceAlert}
                      onCompare={handleCompare}
                      hasPriceAlert={hasPriceAlert}
                    />
                  </div>
                ))}
              </div>

              {/* Recommendations Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-xl p-8 text-center"
                style={{ backgroundColor: currentTheme.cardBackground, border: `1px solid ${currentTheme.divider}` }}
              >
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ color: currentTheme.primaryText }}
                >
                  You May Also Like
                </h2>
                <p
                  className="mb-6 max-w-2xl mx-auto"
                  style={{ color: currentTheme.secondaryText }}
                >
                  Discover more products based on your wishlist preferences. We'll show you personalized recommendations to help you find your next favorite item.
                </p>
                <Button size="lg">
                  Explore Recommendations
                </Button>
              </motion.div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default WishlistPage;
