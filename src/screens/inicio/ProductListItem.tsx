import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FontAwesome6 from '@react-native-vector-icons/fontawesome6' 

type ProductListItemProps = {
  id: number
  onPress?: (id: number) => void
}

const ProductListItem: React.FC<ProductListItemProps> = ({id, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress?.(id)}>
      <View style={{flex: 1}}>
        <Text style={styles.label}>Nombre</Text>
        <Text style={styles.productId}>ID: {id}</Text>
      </View>
      <FontAwesome6 name='chevron-right' iconStyle='solid' size={14} color='#888' />
    </TouchableOpacity>
  )
}

export default ProductListItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productId: {
    fontSize: 14,
    color: '#666',
  }
})