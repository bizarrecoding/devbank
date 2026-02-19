import { StyleSheet, FlatList, ListRenderItem } from 'react-native'
import React, { useCallback } from 'react'
import ProductListItem from './ProductListItem'
import { Text, View } from 'react-native'
import { useProducts } from './hooks/useProducts'
import { useNavigation } from '@react-navigation/native'
import { RootNav } from '../navigation'
import { Product } from '../../types'

const Inicio = () => {
  const navigation = useNavigation<RootNav>()
  const { products } = useProducts();

  const onItemPress = useCallback((id: string) => navigation.navigate('Producto', { id }), [navigation])

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
      {products.length === 0 ? (
        <Text style={styles.noProductsText}>No hay productos disponibles</Text>
      ) : (
        <FlatList<Product>
          data={products}
          renderItem={renderItem}
          keyExtractor={(index)=>index.toString()}
          contentContainerStyle={styles.list} 
          ItemSeparatorComponent={renderSeparator}
        />
      )}
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
  }
})