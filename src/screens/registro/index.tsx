import React, { useMemo } from 'react'
import { KeyboardAvoidingView, ScrollView, Text, StyleSheet, View, TextInput, Platform } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { Input } from '../../components/ui/Input'
import Button from '../../components/ui/Buttons'
import { FormLabels, useForm } from './hooks/useForm'
import { Product } from '../../types'
import BottomSheet from '../../components/ui/BottomSheet'
import useModal from '../../components/ui/hooks/useModal' 
import { RootNav } from '../navigation'
import useRegisterProduct from './hooks/useRegisterProduct'
import useUpdateProduct from './hooks/useUpdateProduct'

const Registro = () => { 
  const route = useRoute();
  const navigation = useNavigation<RootNav>();
  const item = route?.params as Product;  
  const isEdit = !!item?.id;
  const { product, validateProduct, error, setValue, reset } = useForm(item);
  const {onSubmit} = useRegisterProduct()
  const {onSubmitUpdate} = useUpdateProduct()
  const { visible, toggle } = useModal();
  const idRef = React.createRef<TextInput>();
  const nameRef = React.createRef<TextInput>();
  const descRef = React.createRef<TextInput>();
  const imageRef = React.createRef<TextInput>();
  const releaseDateRef = React.createRef<TextInput>();
  const reviewDateRef = React.createRef<TextInput>();
  const scrollRef = React.createRef<ScrollView>();

  const onReset = () => {
    reset();
    idRef?.current?.clear();
    nameRef?.current?.clear();
    descRef?.current?.clear();
    imageRef?.current?.clear();
    releaseDateRef?.current?.clear();
    reviewDateRef?.current?.clear();
  }
  const handleSubmit = async () => {
    const valid = await validateProduct(product)
    console.log("🚀 ~ handleSubmit ~ valid:", product,valid);
    if(!valid) return toggle()
    let response = null
    if(isEdit) { 
      response = await onSubmitUpdate(product as Product);
    }else{
      response = await onSubmit(product as Product);
    }
    if(response?.ok) {
      onReset();
      if(isEdit) navigation.goBack();
      navigation.goBack();
    } else {
      toggle();
    }
  } 
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled" style={styles.scrollView} ref={scrollRef}>
        <Text style={styles.title}>Formulario de Registro</Text>
        <Input 
          testID="FORM_ID"
          label="ID"  
          ref={idRef}
          defaultValue={item?.id}
          disabled={isEdit}
          setValue={(value) => setValue('ID', value)} 
          error={error?.ID} 
        />
        <Input 
          label="Nombre"
          ref={nameRef}
          defaultValue={item?.name}
          setValue={(value) => setValue('Nombre', value)} 
          error={error?.Nombre} 
        />
        <Input 
          label="Descripción"   
          ref={descRef}
          defaultValue={item?.description}
          setValue={(value) => setValue('Descripción', value)} 
          error={error?.['Descripción']} 
        />
        <Input 
          label="Imagen"  
          ref={imageRef}
          defaultValue={item?.logo}
          setValue={(value) => setValue('Imagen', value)} 
          error={error?.Imagen} 
        />
        <Input 
          label="Fecha de Liberación"   
          ref={releaseDateRef}
          defaultValue={item?.date_release}
          setValue={(value) => setValue('Fecha de Liberación', value)} 
          error={error?.['Fecha de Liberación']}
        />
        <Input 
          label="Fecha de Revisión"  
          ref={reviewDateRef}
          defaultValue={item?.date_revision}
          setValue={(value) => setValue('Fecha de Revisión', value)} 
          error={error?.['Fecha de Revisión']} 
        />

        <Button title="Enviar" onPress={handleSubmit} style={{ marginTop: 16 }} />
        {!isEdit && <Button variant="secondary" title="Reiniciar" onPress={onReset} style={{ marginTop: 16 }} />}
        <BottomSheet visible={visible} toggleVisibility={toggle}>
          <View style={{ marginBottom: 16, justifyContent: 'center' }}>
            <Text style={styles.errorText}>Hubo un error al registrar el producto, por favor inténtelo de nuevo.</Text>
            <Button title='Cerrar' onPress={toggle} style={{ marginTop: 16 }} />
          </View>
        </BottomSheet>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Registro

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
  },
  scrollView: { paddingHorizontal: 16 },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  errorText: { 
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 16,
  }
})