import React from 'react'
import { KeyboardAvoidingView, ScrollView, Text, StyleSheet, TextInput, Platform } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { Input } from '../../components/ui/Input'
import Button from '../../components/ui/Buttons' 
import { Product } from '../../types'
import BottomSheet from '../../components/ui/BottomSheet'
import useModal from '../../components/ui/hooks/useModal'
import { useForm } from '../registro/hooks/useForm'
import { useUpdateProduct } from './hooks/useUpdateProduct'
import { RootNav } from '../navigation'

const Edicion = () => {
  const route = useRoute();
  const navigation = useNavigation<RootNav>();
  const item = route?.params as Product; 
  const { product, error, setValue } = useForm(item);
  const {onSubmitUpdate} =  useUpdateProduct()
  const { visible, toggle } = useModal();
  const nameRef = React.createRef<TextInput>();
  const descRef = React.createRef<TextInput>();
  const imageRef = React.createRef<TextInput>();
  const releaseDateRef = React.createRef<TextInput>();
  const reviewDateRef = React.createRef<TextInput>();
  const scrollRef = React.createRef<ScrollView>();
 
  const handleSubmit = async () => {
    const response = await onSubmitUpdate(product as Product);
    if(response.ok) {
      navigation.goBack();
    } else {
      toggle();
    }
  } 
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled" style={styles.scrollView} ref={scrollRef}>
        <Text style={styles.title}>Actualización de producto</Text>
        <Text style={styles.subtitle}>ID: {product.id}</Text>
        <Input 
          label="Nombre"   
          ref={nameRef}
          defaultValue={item.name}
          setValue={(value) => setValue('Nombre', value)} 
          error={error?.Nombre} 
        />
        <Input 
          label="Descripción"   
          ref={descRef}
          defaultValue={item.description}
          setValue={(value) => setValue('Descripción', value)} 
          error={error?.['Descripción']} 
        />
        <Input 
          label="Imagen"  
          ref={imageRef}
          defaultValue={item.logo}
          setValue={(value) => setValue('Imagen', value)} 
          error={error?.Imagen} 
        />
        <Input 
          label="Fecha de Liberación"   
          ref={releaseDateRef }
          defaultValue={item.date_release}
          setValue={(value) => setValue('Fecha de Liberación', value)} 
          error={error?.['Fecha de Liberación']}
        />
        <Input 
          label="Fecha de Revisión"  
          ref={reviewDateRef}
          defaultValue={item.date_revision}
          setValue={(value) => setValue('Fecha de Revisión', value)} 
          error={error?.['Fecha de Revisión']} 
        />

        <Button title="Actualizar" onPress={handleSubmit} style={{ marginTop: 16 }} /> 
        <BottomSheet visible={visible} toggleVisibility={toggle}>
          <Text>Hubo un error al actualizar el producto, por favor inténtelo de nuevo.</Text>
        </BottomSheet>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Edicion 

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
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 16,
  },
})