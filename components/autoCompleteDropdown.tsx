import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet } from 'react-native';


interface AutocompleteDropdownProps {
  data: { id: number; descripcion: string }[];
  onSelect: (item: { id: number; descripcion: string }) => void;
}


const AutocompleteDropdown: React.FC<AutocompleteDropdownProps> = ({ data, onSelect }) => {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  console.log("En prop")
  console.log(data)
  const filteredData = data.filter(item => item.descripcion.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (item: { id: number; descripcion: string }) => {
    onSelect(item);
    setSelectedItem(item);
    setQuery(item.descripcion);
    setShowResults(false);
  };

  return (
    <View style={{ 
      backgroundColor: '#FFF',
      marginBottom: 10,
      borderRadius: 10,
      width: '100%'
      }}>
      <TextInput
        placeholder="Buscar..."
        value={query}
        onChangeText={text => {
          setQuery(text);
          setShowResults(true);
        }}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          padding: 10,
          }}
      />
      {showResults && (
        <FlatList
          data={filteredData}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelect(item)}>
              <Text style={selectedItem?.id === item.id ? styles.selectedItem : styles.item}>{item.descripcion}</Text>
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