import { useState, useEffect, useCallback } from 'react'

const useModal = (initialValue: boolean = false) => {
  const [visibility, setVisibility] = useState(initialValue);
  const toggle = useCallback(() => setVisibility(v => !v), []);

  return {
    visible: visibility,
    toggle
  };
}
 
export default useModal;