import { useCallback, useEffect, useState } from 'react'

/**
 * @param value 
 * @param delay delay in milliseconds
 * @returns any
 * 
 * Este hook se usa para evitar ejecutar el api call cada vez que se oprime una letra.
 * el input actualizara el estado pero el debounded value evitará que el useEffect lo haga continuamente
 */
export const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
