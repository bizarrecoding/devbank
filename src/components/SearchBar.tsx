import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'

type SearchBarProps = {
  setFilter: (filter: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setFilter }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar productos..."
        onChangeText={(text) => setFilter(text)} />
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
  }
})