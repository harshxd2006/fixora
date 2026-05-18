import { createContext, useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();

  const LOCAL_STORAGE_KEY = 'fixora_wishlist_local';

  // Load wishlist on mount or auth change
  useEffect(() => {
    let mounted = true;

    const loadWishlist = async () => {
      setLoading(true);
      try {
        if (isAuthenticated && user) {
          // User is logged in, fetch from Supabase
          const { data, error } = await supabase
            .from('wishlist')
            .select('product_id')
            .eq('user_id', user.id);
            
          if (!error && data && mounted) {
            setWishlistIds(data.map(item => item.product_id));
          }
        } else {
          // User is NOT logged in, fetch from localStorage
          const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
          if (localData && mounted) {
            setWishlistIds(JSON.parse(localData));
          } else if (mounted) {
            setWishlistIds([]);
          }
        }
      } catch (err) {
        console.error('Error loading wishlist:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadWishlist();

    return () => {
      mounted = false;
    };
  }, [user, isAuthenticated]);

  // Sync wishlist when user logs in
  useEffect(() => {
    const syncWishlistOnLogin = async () => {
      if (isAuthenticated && user) {
        const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (localData) {
          const localWishlist = JSON.parse(localData);
          if (localWishlist.length > 0) {
            // Upsert all local items to Supabase
            const upsertData = localWishlist.map(productId => ({
              user_id: user.id,
              product_id: productId
            }));
            
            const { error } = await supabase
              .from('wishlist')
              .upsert(upsertData, { onConflict: 'user_id, product_id' });
              
            if (!error) {
              // Clear local storage after successful sync
              localStorage.removeItem(LOCAL_STORAGE_KEY);
              
              // Reload from Supabase
              const { data } = await supabase
                .from('wishlist')
                .select('product_id')
                .eq('user_id', user.id);
                
              if (data) {
                setWishlistIds(data.map(item => item.product_id));
              }
            }
          }
        }
      }
    };

    syncWishlistOnLogin();
  }, [user, isAuthenticated]);

  const addToWishlist = async (productId) => {
    // Optimistic update
    if (!wishlistIds.includes(productId)) {
      setWishlistIds(prev => [...prev, productId]);
      toast.success('Added to wishlist');
    }

    if (isAuthenticated && user) {
      // Upsert to Supabase
      const { error } = await supabase
        .from('wishlist')
        .upsert({ user_id: user.id, product_id: productId });
      
      if (error) console.error('Error adding to Supabase wishlist:', error);
    } else {
      // Save to localStorage
      const newWishlist = [...new Set([...wishlistIds, productId])];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newWishlist));
    }
  };

  const removeFromWishlist = async (productId) => {
    // Optimistic update
    setWishlistIds(prev => prev.filter(id => id !== productId));
    toast.success('Removed from wishlist');

    if (isAuthenticated && user) {
      // Delete from Supabase
      const { error } = await supabase
        .from('wishlist')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);
        
      if (error) console.error('Error removing from Supabase wishlist:', error);
    } else {
      // Remove from localStorage
      const newWishlist = wishlistIds.filter(id => id !== productId);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newWishlist));
    }
  };

  const isWishlisted = (productId) => wishlistIds.includes(productId);

  // Expose backward compatibility aliases too
  return (
    <WishlistContext.Provider value={{ 
      wishlist: wishlistIds, // backwards compat
      wishlistIds, 
      wishlistCount: wishlistIds.length,
      addToWishlist, 
      add: addToWishlist, // backwards compat
      removeFromWishlist, 
      remove: removeFromWishlist, // backwards compat
      isWishlisted,
      isFavorite: isWishlisted, // backwards compat
      loading 
    }}>
      {children}
    </WishlistContext.Provider>
  );
};
