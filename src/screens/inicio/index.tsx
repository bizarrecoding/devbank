import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { useProducts } from './hooks/useProducts'
import { RootNav } from '../navigation'
import SearchBar from '../../components/SearchBar'
import { useDebounce } from '../../util/useDebounce'
import Button from '../../components/ui/Buttons'
import ProductList from './ProductList'

const Inicio = () => {
  const [filter, setFilter] = useState("")
  const debouncedFilter = useDebounce(filter, 500); 
  const navigation = useNavigation<RootNav>()
  const { products } = useProducts();

  return (
    <View style={styles.container}>
      <SearchBar setFilter={setFilter} />
      <ProductList products={products} filter={debouncedFilter} />
      <Button title="Agregar" onPress={() => navigation.navigate('Registro')} style={styles.addButton} />
    </View>
  )
}

export default Inicio

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 16
  }, 
  addButton: {
    marginVertical: 32
  }
})