import { useState, useEffect } from 'react' 
import { Product } from '../../../types'; 
import { getBaseURL } from '../../../config/env';
 
const baseUrl = getBaseURL();

export const useProducts = () => {
  const [products,setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try { 
        const response = await fetch(`${baseUrl}/bp/products`);
        const data = await response.json() as { data: Product[] };
        setProducts(data.data); 
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [])

  return { products };
}
