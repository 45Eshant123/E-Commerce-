import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const [priceAlerts, setPriceAlerts] = useState(() => {
    const savedAlerts = localStorage.getItem('priceAlerts');
    return savedAlerts ? JSON.parse(savedAlerts) : [];
  });

  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('priceAlerts', JSON.stringify(priceAlerts));
  }, [priceAlerts]);

  const addToWishlist = (product) => {
    setWishlist(prevWishlist => {
      if (prevWishlist.find(item => item.id === product.id)) {
        return prevWishlist.filter(item => item.id !== product.id);
      }
      return [...prevWishlist, { ...product, addedAt: new Date().toISOString() }];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== productId));
    setSelectedItems(prevSelected => prevSelected.filter(id => id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const togglePriceAlert = (productId) => {
    setPriceAlerts(prevAlerts => {
      if (prevAlerts.includes(productId)) {
        return prevAlerts.filter(id => id !== productId);
      }
      return [...prevAlerts, productId];
    });
  };

  const hasPriceAlert = (productId) => {
    return priceAlerts.includes(productId);
  };

  const toggleItemSelection = (productId) => {
    setSelectedItems(prevSelected => {
      if (prevSelected.includes(productId)) {
        return prevSelected.filter(id => id !== productId);
      }
      return [...prevSelected, productId];
    });
  };

  const selectAllItems = () => {
    setSelectedItems(wishlist.map(item => item.id));
  };

  const deselectAllItems = () => {
    setSelectedItems([]);
  };

  const bulkRemoveFromWishlist = (productIds) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => !productIds.includes(item.id)));
    setSelectedItems([]);
  };

  const getBulkSelectedProducts = () => {
    return wishlist.filter(item => selectedItems.includes(item.id));
  };

  const sortWishlist = (sortBy) => {
    const sorted = [...wishlist].sort((a, b) => {
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
    setWishlist(sorted);
  };

  const filterWishlist = (filters) => {
    return wishlist.filter(item => {
      if (filters.category && item.category !== filters.category) return false;
      if (filters.brand && item.brand !== filters.brand) return false;
      if (filters.priceRange) {
        const [min, max] = filters.priceRange;
        if (item.price < min || item.price > max) return false;
      }
      if (filters.availability) {
        if (filters.availability === 'in-stock' && !item.inStock) return false;
        if (filters.availability === 'out-of-stock' && item.inStock) return false;
      }
      return true;
    });
  };

  const shareWishlist = () => {
    const wishlistData = {
      items: wishlist.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category
      })),
      sharedAt: new Date().toISOString()
    };

    const shareUrl = `${window.location.origin}/shared-wishlist?data=${encodeURIComponent(JSON.stringify(wishlistData))}`;

    if (navigator.share) {
      navigator.share({
        title: 'My Wishlist',
        text: `Check out my wishlist with ${wishlist.length} items`,
        url: shareUrl
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      return shareUrl;
    }
  };

  return (
    <WishlistContext.Provider value={{
      wishlist,
      priceAlerts,
      selectedItems,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
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
    }}>
      {children}
    </WishlistContext.Provider>
  );
};
