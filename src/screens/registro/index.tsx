import React from 'react'
import { KeyboardAvoidingView, ScrollView, Text, StyleSheet, TextInput, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Input } from '../../components/ui/Input'
import Button from '../../components/ui/Buttons'
import { useForm } from './hooks/useForm'
import { useRegisterProduct } from './hooks/useRegisterProduct'
import { Product } from '../../types'
import BottomSheet from '../../components/ui/BottomSheet'
import useModal from '../../components/ui/hooks/useModal'

const Registro = () => {
  const navigation = useNavigation();
  const { product, error, setValue, reset } = useForm();
  const {onSubmit} = useRegisterProduct()
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
    const response = await onSubmit(product as Product);
    if(response.ok) {
      onReset();
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
          label="ID"  
          ref={idRef}
          setValue={(value) => setValue('ID', value)} 
          error={error?.ID} 
        />
        <Input 
          label="Nombre"   
          ref={nameRef}
          setValue={(value) => setValue('Nombre', value)} 
          error={error?.Nombre} 
        />
        <Input 
          label="Descripción"   
          ref={descRef}
          setValue={(value) => setValue('Descripción', value)} 
          error={error?.['Descripción']} 
        />
        <Input 
          label="Imagen"  
          ref={imageRef}
          setValue={(value) => setValue('Imagen', value)} 
          error={error?.Imagen} 
        />
        <Input 
          label="Fecha de Liberación"   
          ref={releaseDateRef }
          setValue={(value) => setValue('Fecha de Liberación', value)} 
          error={error?.['Fecha de Liberación']}
        />
        <Input 
          label="Fecha de Revisión"  
          ref={reviewDateRef}
          setValue={(value) => setValue('Fecha de Revisión', value)} 
          error={error?.['Fecha de Revisión']} 
        />

        <Button title="Enviar" onPress={handleSubmit} style={{ marginTop: 16 }} />
        <Button variant="secondary" title="Reiniciar" onPress={onReset} style={{ marginTop: 16 }} />
        <BottomSheet visible={visible} toggleVisibility={toggle}>
          <Text>Hubo un error al registrar el producto, por favor inténtelo de nuevo.</Text>
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
})