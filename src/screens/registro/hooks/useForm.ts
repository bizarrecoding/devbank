import { useState, useEffect, useCallback, useMemo } from 'react'
import { Product } from '../../../types';
import { isAfterAYear, isDate, isFuture } from '../../../util/date';
import { betweenLength } from '../../../util/strings';
import useUniqueId from './useUniqueId';

export type FormLabels = 'ID' | 'Nombre' | 'Descripción' | 'Imagen' | 'Fecha de Liberación' | 'Fecha de Revisión';

type FormError = {
  [key in FormLabels]?: string|null
}

export const FormError = {
  INVALID_ID: "El ID debe tener entre 3 y 10 caracteres",
  DUPLICATE_ID: "El ID ya existe",
  INVALID_NAME: "El nombre debe tener entre 6 y 100 caracteres",
  INVALID_DESC:"La descripción debe tener entre 10 y 200 caracteres",
  INVALID_LOGO: "La imagen es requerida",
  RELEASE_PAST: "La fecha de liberación debe ser una fecha futura",
  RELEASE_INVALID:"La fecha de liberación no es válida",
  REVISION_INVALID: "La fecha de revisión no es válida",
  REVISION_YEAR: "La fecha de revisión debe ser al menos un año después de la fecha de liberación"
}

export const useForm = (baseProduct?: Product) => { 
  const idExist = useUniqueId();
  const [id, setId] = useState<string|undefined>(baseProduct?.id);
  const [name, setName] = useState<string|undefined>(baseProduct?.name);
  const [description, setDescription] = useState<string|undefined>(baseProduct?.description);
  const [logo, setLogo] = useState<string|undefined>(baseProduct?.logo);
  const [releaseDate, setReleaseDate] = useState<string|undefined>(baseProduct?.date_release);
  const [reviewDate, setReviewDate] = useState<string|undefined>(baseProduct?.date_revision); 
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

  const validate = useCallback(async (label: FormLabels, value: string = "") => {
    switch(label) {
      case 'ID':{
        const valid = betweenLength(value ?? "", 3, 10)
        if(!valid) return FormError.INVALID_ID
        const exists = await idExist(value);
        if(exists) return FormError.DUPLICATE_ID
        return null;
      }
      case 'Nombre':{
        const valid = betweenLength(value, 6, 100)
        return valid ? null : FormError.INVALID_NAME
      }
      case 'Descripción':{
        const valid = betweenLength(value, 10, 200)
        return valid ? null : FormError.INVALID_DESC
      }
      case 'Imagen':
        return !!value?.trim()?.length ? null : FormError.INVALID_LOGO
      case 'Fecha de Liberación':{
        if(!isDate(value)) {
          return FormError.RELEASE_INVALID
        }
        const res = isFuture(value)
        return !!value && res ? null : FormError.RELEASE_PAST
      }
      case 'Fecha de Revisión':{
        if(!isDate(value)) {
          return FormError.REVISION_INVALID
        }
        return (!!value && product?.date_release && isAfterAYear(product.date_release as string, value)) ? null : FormError.REVISION_YEAR
      }
    }
  },[product?.date_release])

  const validateProduct = useCallback(async (product: Partial<Product>)=>{
    const error: FormError = {}
    if(!baseProduct?.id) error["ID"] = await validate("ID",product?.id)
    error["Nombre"] = await validate("Nombre",product?.name)
    error["Descripción"] = await validate("Descripción",product?.description)
    error["Imagen"] = await validate("Imagen",product?.logo)
    error["Fecha de Liberación"] = await validate("Fecha de Liberación",product?.date_release)
    error["Fecha de Revisión"] = await validate("Fecha de Revisión",product?.date_revision)
    setError(error)
    return Object.keys(error).some((key)=>!!error[key as FormLabels])===false
  },[validate])

  const setValue = useCallback(async (label: FormLabels, value: string) => {
    const error = await validate(label, value);
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
    error,
    setValue,
    validate,
    validateProduct,
    reset
  };
}
