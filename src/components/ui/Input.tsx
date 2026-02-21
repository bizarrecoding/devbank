import React from 'react' 
import { StyleSheet, Text, TextInput, View } from 'react-native'

type InputProps = {
  label: string; 
  defaultValue?: string;
  disabled?: boolean;
  setValue: (value: string) => void;
  error?: string|null;
  testID?: string;
  placeholder?: string
}

export const Input = React.forwardRef<TextInput, InputProps>(({ label, defaultValue, disabled, setValue, error, testID, placeholder }, ref) => {   
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        testID={testID}
        ref={ref}
        placeholder={placeholder}
        defaultValue={defaultValue}
        style={[styles.input, error && styles.inputError, disabled && styles.inputDisabled]} 
        onChangeText={setValue}  
        editable={!disabled}
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
  inputDisabled: {
    backgroundColor: '#f0f0f0',
    borderColor: '#ddd',
  },
  inputError: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    fontSize: 12,
  }
})