import { useCallback } from 'react'  
import { getBaseURL } from '../../../config/env';

const baseUrl = getBaseURL();

const useUniqueId = () => { 
  const idExist = useCallback(async (id: string) => {
    try { 
      const response = await fetch(`${baseUrl}/bp/products/verification/${id}`);
      if(!response.ok) return true
      const data = await response.json() as boolean;
      return data;
    } catch (error) { 
      return true;
    }
  },[]) 
  return idExist;
}

export default useUniqueId