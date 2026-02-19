import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native'
import React from 'react' 

type BaseButtonProps = React.PropsWithChildren<{
  variant?: 'primary' | 'secondary' | 'alert' | 'clear'
  title?: string
  style?: StyleProp<ViewStyle>
}>

const Button: React.FC<BaseButtonProps> = ({ variant='primary', title, children, style }) => {
  return (
    <TouchableOpacity style={[styles.button, styles[variant], style]}>
      { title ? <Text style={styles.text}>{title}</Text> : children }
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  button:{
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#007bff',
  },
  secondary:{
    backgroundColor: '#cEcEcE',
  },
  alert: {
    backgroundColor: '#d50708',
  },
  clear: {
    backgroundColor: 'transparent',
  },
  text:{
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }

})