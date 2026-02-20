import { StyleProp, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native'
import React from 'react' 

type BaseButtonProps = React.PropsWithChildren<{
  variant?: 'primary' | 'secondary' | 'alert' | 'clear'
  title?: string
  style?: StyleProp<ViewStyle>
  onPress: () => void
}> & TouchableOpacityProps

const Button: React.FC<BaseButtonProps> = ({ variant='primary', title, children, style, onPress, ...rest }) => {
  return (
    <TouchableOpacity style={[styles.button, styles[variant], style]} onPress={onPress} {...rest}>
      { title ? <Text style={[styles.text, styles[variant]]}>{title}</Text> : children }
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  button:{
    padding: 12,
    marginVertical: 6,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#ffdd04',
    color: '#000',
  },
  secondary:{
    backgroundColor: '#dEdEdE',
    color: '#000',
  },
  alert: {
    backgroundColor: '#d50708',
    color: '#fff',
  },
  clear: {
    backgroundColor: 'transparent',
  },
  text:{
    fontSize: 14,
    fontWeight: 'bold',
  }
})