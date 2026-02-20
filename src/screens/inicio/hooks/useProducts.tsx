import { useState, useEffect } from 'react' 
import { useIsFocused } from '@react-navigation/native';

import { Product } from '../../../types'; 
import { getBaseURL } from '../../../config/env';

const baseUrl = getBaseURL();

export const useProducts = () => {
  const [products,setProducts] = useState<Product[]>([]);
  const focused = useIsFocused();

  useEffect(() => {
    const fetchProducts = async () => {
      try { 
        const response = await fetch(`${baseUrl}/bp/products`); 
        const data = await response.json() as { data: Product[] };
        setProducts(data?.data ?? []); 
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [focused])

  return { products };
}
