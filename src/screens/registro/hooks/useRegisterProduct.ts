import { useCallback } from 'react' 
import { Product } from '../../../types'; 
import { getBaseURL } from '../../../config/env';

const baseUrl = getBaseURL();

export const useRegisterProduct = () => { 
  const onSubmit = useCallback(async (product: Product) => {
    try { 
      const response = await fetch(`${baseUrl}/bp/products`, {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response;
    } catch (error) { 
      return { ok: false, status: 500 };
    }
  },[]) 
  return { onSubmit };
}
