import { useState, useEffect } from 'react';
import { api, type CartItem } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState('0');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchCart = async () => {
    try {
      setIsLoading(true);
      const cartData = await api.getCart();
      setItems(cartData.items);
      setTotal(cartData.total);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (productId: number, quantity: number = 1) => {
    try {
      await api.addToCart(productId, quantity);
      await fetchCart();
      toast({
        title: "Added to cart",
        description: "Item has been added to your cart.",
      });
    } catch (error) {
      toast({
        title: "Failed to add to cart",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    }
  };

  const updateCartItem = async (productId: number, quantity: number) => {
    try {
      await api.updateCartItem(productId, quantity);
      await fetchCart();
      if (quantity === 0) {
        toast({
          title: "Item removed",
          description: "Item has been removed from your cart.",
        });
      } else {
        toast({
          title: "Cart updated",
          description: "Item quantity has been updated.",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to update cart",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      await api.removeFromCart(productId);
      await fetchCart();
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart.",
      });
    } catch (error) {
      toast({
        title: "Failed to remove item",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    }
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  useEffect(() => {
    // Only fetch cart if user is authenticated
    const token = localStorage.getItem('token');
    if (token) {
      fetchCart();
    }
  }, []);

  return {
    items,
    total,
    isLoading,
    itemCount: getItemCount(),
    addToCart,
    updateCartItem,
    removeFromCart,
    fetchCart,
  };
};