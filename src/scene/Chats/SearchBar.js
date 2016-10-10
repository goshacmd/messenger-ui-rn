// @flow

import React from 'react';
import { View, TextInput } from 'react-native';

const SearchBar = ({ query, onChange } : { query: string, onChange: (text: string) => void }) => (
  <View style={styles.bar}>
    <TextInput
      style={styles.input}
      placeholder="Type to search..."
      placeholderTextColor="#999"
      clearButtonMode="always"
      value={query}
      onChangeText={onChange}
    />
  </View>
);

const styles = {
  bar: {
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    padding: 10,
  },
  input: {
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    height: 30,
    fontSize: 14,
    paddingVertical: 5,
    paddingHorizontal: 10,
    textAlign: 'center',
  }
};

export default SearchBar;
