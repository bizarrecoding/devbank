import { useCallback } from 'react' 
import { Product } from '../../../types'; 
import { getBaseURL } from '../../../config/env';

const baseUrl = getBaseURL();

export const useUniqueId = () => { 
  const idExist = useCallback(async (id: string) => {
    try { 
      const response = await fetch(`${baseUrl}/bp/products/verification/${id}`);
      if(!response.ok) return true
      const data = await response.json() as boolean;
      return data;
    } catch (error) { 
      return { ok: false, status: 500 };
    }
  },[]) 
  return idExist;
}
