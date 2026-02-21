import { ActivityIndicator, FlatList, ListRenderItem, StyleSheet } from 'react-native'
import React, { useCallback, useMemo } from 'react'
import { Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import ProductListItem from './ProductListItem'
import { RootNav } from '../navigation'
import { Product } from '../../types'


type ProductListProps = {
  products: Product[]
  filter?: string
  loading?: boolean
}

const ProductList: React.FC<ProductListProps> = ({products, loading=false, filter}) => {
  const navigation = useNavigation<RootNav>()

  const filteredProducts = useMemo(() => {
    if(!products || products.length === 0) return [];
    if(!filter || filter.trim().length < 1) return products;
    return products.filter(product => product.name.toLowerCase().includes(filter.toLowerCase()))
  }, [filter, products]) 

  const onItemPress = useCallback((product: Product) => navigation.navigate('Producto', product), [navigation])

  const renderItem: ListRenderItem<Product> = useCallback(({ item }) => {
    return <ProductListItem item={item} onPress={onItemPress} />
  }, [])

  const renderSeparator = useCallback(() => {
    // seems react native FlatList has a bug in item separator.
    // it also renders after the last item
    return <View style={styles.divider} />
  }, [])

  if(loading && !products.length){
    return <ActivityIndicator size="large" style={styles.loadingIndicator}/>
  }

  if(products.length === 0) {
    return <Text style={styles.noProductsText}>No hay productos disponibles</Text>
  }
  if(filteredProducts.length === 0) {
    return <Text style={styles.noProductsText}>No se encontraron productos</Text>
  }

  return (
    <FlatList<Product>
      data={filteredProducts}
      renderItem={renderItem}
      keyExtractor={(item)=>item.id}
      contentContainerStyle={styles.list} 
      ItemSeparatorComponent={renderSeparator}
    />
  )
}

export default ProductList

const styles = StyleSheet.create({
  list:{
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ccc',
  },
  loadingIndicator:{
    alignSelf: "center",
    margin: 20,
  },
  noProductsText: {
    fontSize: 16,
    marginTop: 20,
    color: '#666',
    textAlign: 'center',
  },
})