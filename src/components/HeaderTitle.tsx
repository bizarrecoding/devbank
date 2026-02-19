import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FontAwesome6 from '@react-native-vector-icons/fontawesome6'

const HeaderColor = '#003bAf'
const HeaderSize = 16

const HeaderTitle = () => {
  return (
    <View style={styles.container}>
      <FontAwesome6 name='money-bills' iconStyle='solid' size={HeaderSize} color={HeaderColor}/>
      <Text style={styles.title}>BANCO</Text>
    </View> 
  )
}

export default HeaderTitle

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    fontSize: HeaderSize,
    fontWeight: 'bold',
    marginLeft: 10,
    color: HeaderColor,
  },
})
