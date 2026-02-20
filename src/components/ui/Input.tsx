import React from 'react' 
import { StyleSheet, Text, TextInput, View } from 'react-native'

type InputProps = {
  label: string; 
  setValue: (value: string) => void;
  error?: string;
}

export const Input = React.forwardRef<TextInput, InputProps>(({ label, setValue, error }, ref) => {   
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        ref={ref}
        style={[styles.input, error && styles.inputError]} 
        onChangeText={setValue}  
      />
      {error && <Text style={styles.error}>{error}</Text>} 
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
  },
  inputError: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    fontSize: 12,
  }
})