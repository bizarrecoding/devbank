import { KeyboardAvoidingView, ScrollView, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Input } from '../../components/ui/Input'
import Button from '../../components/ui/Buttons'
import { useForm } from './hooks/useForm'
import { useRegisterProduct } from './hooks/useRegisterProduct'
import { Product } from '../../types'
import BottomSheet from '../../components/ui/BottomSheet'
import { useNavigation } from '@react-navigation/native'

const Registro = () => {
  const navigation = useNavigation();
  const { product, error, setValue, reset } = useForm();
  const {onSubmit} = useRegisterProduct()
  const [showModal, setShowModal] = useState(false)
  const idRef = React.createRef<TextInput>();
  const nameRef = React.createRef<TextInput>();
  const descRef = React.createRef<TextInput>();
  const imageRef = React.createRef<TextInput>();
  const releaseDateRef = React.createRef<TextInput>();
  const reviewDateRef = React.createRef<TextInput>();
  

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
      setShowModal(true);
    }
  } 
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled" style={styles.scrollView}>
        <Text style={styles.title}>Formulario de Registro</Text>
        <Input 
          label="ID"  
          ref={idRef}
          setValue={(value) => setValue('ID', value)} 
          error={error?.ID} 
        />
        <Input 
          label="Nombre"   
          ref={null}
          setValue={(value) => setValue('Nombre', value)} 
          error={error?.Nombre} 
        />
        <Input 
          label="Descripción"   
          ref={null}
          setValue={(value) => setValue('Descripción', value)} 
          error={error?.['Descripción']} 
        />
        <Input 
          label="Imagen"  
          ref={null}
          setValue={(value) => setValue('Imagen', value)} 
          error={error?.Imagen} 
        />
        <Input 
          label="Fecha de Liberación"   
          ref={null}
          setValue={(value) => setValue('Fecha de Liberación', value)} 
          error={error?.['Fecha de Liberación']} 
        />
        <Input 
          label="Fecha de Revisión"  
          ref={null}
          setValue={(value) => setValue('Fecha de Revisión', value)} 
          error={error?.['Fecha de Revisión']} 
        />

        <Button title="Enviar" onPress={handleSubmit} style={{ marginTop: 16 }} />
        <Button variant="secondary" title="Reiniciar" onPress={onReset} style={{ marginTop: 16 }} />
        <BottomSheet visible={showModal} toggleVisibility={() => setShowModal(s=>!s)}>
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