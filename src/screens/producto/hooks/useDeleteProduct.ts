import { useCallback } from 'react' 
import { Product } from '../../../types'; 
import { getBaseURL } from '../../../config/env';

const baseUrl = getBaseURL();

export const useDeleteProduct = () => { 
  const onDelete = useCallback(async (product: Product) => {
    try { 
      const response = await fetch(`${baseUrl}/bp/products/${product.id}`, {
        method: 'DELETE',
      });
      return response;
    } catch (error) { 
      return { ok: false, status: 500 };
    }
  },[]) 
  return { onDelete };
}
