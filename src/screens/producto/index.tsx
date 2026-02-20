import React, { useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { useRoute } from '@react-navigation/native'

import { Product } from '../../types'
import Button from '../../components/ui/Buttons'
import BottomSheet from '../../components/ui/BottomSheet'
import useModal from '../../components/ui/hooks/useModal'

const Producto = () => {
  const route = useRoute();
  const { visible, toggle } = useModal();
  const item = route?.params as Product; 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ID: {item.id}</Text>
      <Text style={styles.extra}>Información extra</Text>
      <View style={styles.group}>
        <ProductRow label='Nombre' value={item.name} />
        <ProductRow label='Descripción' value={item.description} />
        <ProductRow asColumn label='Logo' image={item.logo} />
        <ProductRow label='Fecha de liberación' value={item.date_release} />
        <ProductRow label='Fecha de revisión' value={item.date_revision} />
      </View>
      <Button variant='secondary' title='Editar' onPress={() => {}} />
      <Button variant='alert' title='Eliminar' onPress={toggle} />
      <BottomSheet visible={visible} toggleVisibility={toggle}>
        <>
          <Text style={styles.message}>¿Estás seguro de eliminar el producto {item.name}?</Text>
          <View style={{ width: '100%' }}>
            <Button title='confirmar' onPress={toggle} />
            <Button variant='secondary' title='Cancelar' onPress={toggle} />
          </View>
        </>
      </BottomSheet>
    </View>
  )
}


type ProductRowProps = {
  label: string;
  value?: string;
  image?: string;
  asColumn?: boolean;
}

const ProductRow: React.FC<ProductRowProps> = ({label, value, image, asColumn}) => {
  return (
    <View style={[styles.row, asColumn ? styles.column : null]}>
      <Text style={styles.label}>{label}</Text>
      {image ? <Image style={styles.image} source={{ uri: image }} /> : <Text style={styles.value}>{value}</Text>}
    </View>
  )
}

export default Producto

const styles = StyleSheet.create({
  container:{ flex: 1, padding: 16, marginBottom: 16 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  extra: {
    fontSize: 16,
    marginBottom: 16,
  },
  group: {
    flex: 1,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
    gap: 16,
  },
  column: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  message:{ 
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 16
  }
})