import { Text, StyleSheet, FlatList, ListRenderItem } from 'react-native'
import React, { useCallback } from 'react'
import ProductListItem from './ProductListItem'
import { View } from 'react-native'
import { useProducts, Product } from './hooks/useProducts'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootNav } from '../navigation'

const Inicio = () => {
  const navigation = useNavigation<RootNav>()
  const { products } = useProducts();

  const onItemPress = useCallback((id: number) => navigation.navigate('Producto', { id }), [navigation])

  const renderItem: ListRenderItem<Product> = useCallback(({ item }) => {
    return <ProductListItem id={item} onPress={onItemPress} />
  }, [])

  const renderSeparator = useCallback(() => {
    // seems react native FlatList has a bug in item separator.
    // it also renders after the last item
    return <View style={styles.divider} />
  }, [])

  return (
    <View style={styles.container}>
      <FlatList<Product>
        data={products}
        renderItem={renderItem}
        keyExtractor={(index)=>index.toString()}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={renderSeparator}
      />
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
  }
})