import { useState, useEffect, useCallback, useMemo } from 'react'
import { Product } from '../../../types';
import { isAfterAYear, isDate, isFuture } from '../../../util/date';
import { betweenLength } from '../../../util/strings';

type FormLabels = 'ID' | 'Nombre' | 'Descripción' | 'Imagen' | 'Fecha de Liberación' | 'Fecha de Revisión';

type FormError = {
  [key in FormLabels]?: string
}

export const useForm = (baseProduct?: Product) => {
  const [id, setId] = useState<string|undefined>(baseProduct?.id);
  const [name, setName] = useState<string|undefined>(baseProduct?.name);
  const [description, setDescription] = useState<string|undefined>(baseProduct?.description);
  const [logo, setLogo] = useState<string|undefined>(baseProduct?.logo);
  const [releaseDate, setReleaseDate] = useState<string|undefined>(baseProduct?.date_release);
  const [reviewDate, setReviewDate] = useState<string|undefined>(baseProduct?.date_revision);
  const [validated, setValidated] = useState(true)
  const [error, setError] = useState<FormError>({})

  const product: Partial<Product> = useMemo(() => {
    return {
      id,
      name,
      description,
      logo,
      date_release: releaseDate,
      date_revision: reviewDate
    }
  }, [id, name, description, logo, releaseDate, reviewDate])

  const validate = useCallback((label: FormLabels, value: string) => {
    switch(label) {
      case 'ID':{
        const valid = betweenLength(value, 3, 10)
        return valid ? null : "El ID debe tener entre 3 y 10 caracteres"
      }
      case 'Nombre':{
        const valid = betweenLength(value, 6, 100)
        return valid ? null : "El nombre debe tener entre 6 y 100 caracteres"
      }
      case 'Descripción':{
        const valid = betweenLength(value, 10, 200)
        return valid ? null : "La descripción debe tener entre 10 y 200 caracteres"
      }
      case 'Imagen':
        return !!value?.trim()?.length ? null : "La imagen es requerida"
      case 'Fecha de Liberación':
        if(!isDate(value)) {
          return "La fecha de liberación no es válida"
        }
        return !!value && isFuture(value) ? null : "La fecha de liberación debe ser una fecha futura"
      case 'Fecha de Revisión':
        if(!isDate(value)) {
          return "La fecha de revisión no es válida"
        }
        return (!!value && product?.date_release && isAfterAYear(product.date_release as string, value)) ? null : "La fecha de revisión debe ser al menos un año después de la fecha de liberación"
    }
  },[product?.date_release])

  const setValue = useCallback((label: FormLabels, value: string) => {
    const error = validate(label, value);
    if (!error) {
      switch (label) {
        case 'ID':
          setId(value)
          break;
        case 'Nombre':
          setName(value)
          break;
        case 'Descripción':
          setDescription(value)
          break;
        case 'Imagen':
          setLogo(value)
          break;
        case 'Fecha de Liberación':
          setReleaseDate(value)
          break;
        case 'Fecha de Revisión':
          setReviewDate(value)
          break;
      }
    }      
    setError(prev => {
      const newError = { ...prev };
      if (error) {
        newError[label as FormLabels] = error;
      } else {
        delete newError[label as FormLabels];
      }
      return newError;
    });
  }, [validate])

  const reset = useCallback(() => {
    setId(undefined);
    setName(undefined);
    setDescription(undefined);
    setLogo(undefined);
    setReleaseDate(undefined);
    setReviewDate(undefined);
    setError({});
  }, [])

  return {
    product,
    validated,
    error,
    setValue,
    validate,
    reset
  };
}
