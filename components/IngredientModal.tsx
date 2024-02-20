import React, { useState, useEffect } from 'react';
import { Modal, View, Text, Button, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import AutoCompleteDropdown from './autoCompleteDropdown'; 

interface IngredientModalProps {
  modalVisible: boolean;
  onClose: () => void;
  onAddIngredient: (ingredient: { nombre: string; cantidad: string; unidad: string }) => void;
}

const IngredientModal: React.FC<IngredientModalProps> = ({ modalVisible, onClose, onAddIngredient }) => {
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [count, setCount] = useState('');
  const [unit, setUnit] = useState('gr');
  const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
    if (selectedIngredient && count && unit) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [selectedIngredient, count, unit]);

  const ingredientesData = [
    'Lechuga', 'Tomate', 'Huevo', 'Leche', 'Papa', 'Cebolla', 'Morron', 'Carne', 'Porotos'
  ];
  const ingredientesData2 = [
        {
            "id": 123,
            "descripcion": "Aceitunas"
        },
        {
            "id": 124,
            "descripcion": "Aceitunas negras"
        },
        {
            "id": 125,
            "descripcion": "Aceitunas verdes"
        },
        {
            "id": 249,
            "descripcion": "Macedonia de frutas"
        },
        {
            "id": 443,
            "descripcion": "Trigo sarraceno"
        }
    ]


  const handleAddIngredient = () => {
    const nuevoIngrediente = { name: selectedIngredient, count, unit };
    onAddIngredient(nuevoIngrediente);
    onClose();
  };

  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <AutoCompleteDropdown
            data={ingredientesData}
            onSelect={item => setSelectedIngredient(item)}
          />
          <TextInput
            placeholder="Cantidad"
            value={count}
            onChangeText={text => setCount(text)}
            keyboardType="numeric"
            style={styles.input}
          />
          <View style={styles.units}>
            <Text>Unidad:</Text>
            <TouchableOpacity onPress={() => setUnit('uni')}>
              <Text style={[styles.unitText, unit === 'uni' && styles.selectedUnit]}>Uni</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setUnit('gr')}>
              <Text style={[styles.unitText, unit === 'gr' && styles.selectedUnit]}>gr</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setUnit('cm3')}>
              <Text style={[styles.unitText, unit === 'cm3' && styles.selectedUnit]}>cm3</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttons}>
            <Button title="Guardar" onPress={handleAddIngredient} color="#129575" disabled={!isComplete} />
            <Button title="Cancelar" onPress={onClose} color="#129575" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    borderRadius: 10,
  },
  units: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  unitText: {
    marginLeft: 10,
  },
  selectedUnit: {
    color: 'green', 
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default IngredientModal;