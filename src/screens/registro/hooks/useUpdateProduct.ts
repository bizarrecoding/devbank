import { useCallback } from 'react' 
import { Product } from '../../../types'; 
import { getBaseURL } from '../../../config/env';

const baseUrl = getBaseURL();

const useUpdateProduct = () => { 
  const onSubmitUpdate = useCallback(async (product: Product) => {
    try { 
      const {id, ...data} = product
      const response = await fetch(`${baseUrl}/bp/products/${product.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response;
    } catch (error) { 
      return { ok: false, status: 500 };
    }
  },[]) 
  return { onSubmitUpdate };
}

export default useUpdateProduct