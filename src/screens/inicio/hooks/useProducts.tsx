import { useState, useEffect } from 'react'

export type Product = number

export const useProducts = () => {
  const [products,setProducts] = useState<any>();

  useEffect(() => {
    setTimeout(() => {
      setProducts([1,2,3,4,5,6,7])
    }, 1000);
  }, [])

  return { products };
}
