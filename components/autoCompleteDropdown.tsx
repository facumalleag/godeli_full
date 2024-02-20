import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet } from 'react-native';

interface AutocompleteDropdownProps {
  data: string[];
  onSelect: (item: string) => void;
}

const AutocompleteDropdown: React.FC<AutocompleteDropdownProps> = ({ data, onSelect }) => {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  const filteredData = data.filter(item => item.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (item: string) => {
    onSelect(item);
    setSelectedItem(item); 
    setQuery(item); 
    setShowResults(false);
  };

  return (
    <View>
      <TextInput
        placeholder="Buscar..."
        value={query}
        onChangeText={text => {
          setQuery(text);
          setShowResults(true);
        }}
      />
      {showResults && (
        <FlatList
          data={filteredData}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelect(item)}>
              <Text style={selectedItem === item ? styles.selectedItem : styles.item}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f0f0f0', 
  },
});

export default AutocompleteDropdown;