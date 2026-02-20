import { StyleSheet, FlatList, ListRenderItem } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import ProductListItem from './ProductListItem'
import { Text, View } from 'react-native'
import { useProducts } from './hooks/useProducts'
import { useNavigation } from '@react-navigation/native'
import { RootNav } from '../navigation'
import { Product } from '../../types'
import SearchBar from '../../components/SearchBar'
import { useDebounce } from '../../util/useDebounce'
import Button from '../../components/ui/Buttons'

const Inicio = () => {
  const [filter, setFilter] = useState("")
  const debouncedFilter = useDebounce(filter, 500); 
  const navigation = useNavigation<RootNav>()
  const { products } = useProducts();

  const filteredProducts = useMemo(() => {
    if(debouncedFilter?.trim()?.length<1) return products;
    return products.filter(product => product.name.toLowerCase().includes(debouncedFilter.toLowerCase()))
  }, [debouncedFilter, products]) 
  
  const onItemPress = useCallback((product: Product) => navigation.navigate('Producto', product), [navigation])

  const renderItem: ListRenderItem<Product> = useCallback(({ item }) => {
    return <ProductListItem item={item} onPress={onItemPress} />
  }, [])

  const renderSeparator = useCallback(() => {
    // seems react native FlatList has a bug in item separator.
    // it also renders after the last item
    return <View style={styles.divider} />
  }, [])

  return (
    <View style={styles.container}>
      <SearchBar setFilter={setFilter} />
      {products.length === 0 ? (
        <Text style={styles.noProductsText}>No hay productos disponibles</Text>
      ) : (
        <FlatList<Product>
          data={filteredProducts}
          renderItem={renderItem}
          keyExtractor={(item)=>item.id}
          contentContainerStyle={styles.list} 
          ItemSeparatorComponent={renderSeparator}
        />
      )}
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
  list:{
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 16,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ccc',
  },
  noProductsText: {
    fontSize: 16,
    marginTop: 20,
    color: '#666',
    textAlign: 'center',
  },
  addButton: {
    marginVertical: 32
  }
})