import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import AutoCompleteDropdown from './autoCompleteDropdown';
import ingredientesData from '../assets/ingredientes.json';
import { Ingredient } from './ingredientsTab';

interface IngredientModalProps {
  modalVisible: boolean;
  onClose: () => void;
  onAddIngredient: (ingredient: Ingredient) => void;
}

const IngredientModal: React.FC<IngredientModalProps> = ({
  modalVisible,
  onClose,
  onAddIngredient,
}) => {
  const [selectedIngredient, setSelectedIngredient] = useState<{ id: number, descripcion: string }>({ id: 0, descripcion: '' });
  const [count, setCount] = useState('');
  const [unit, setUnit] = useState('gr');
  const [isComplete, setIsComplete] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<{ id: number, descripcion: string }>({ id: 0, descripcion: '' });

  useEffect(() => {
    if (selectedIngredient.id && count && unit && selectedUnit.id) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [selectedIngredient, count, unit, selectedUnit]);

  const dataUnit = [
    {
      id: 3,
      descripcion: 'Cm 3',
      abreviatura: 'cm3'
    },
    {
      id: 2,
      descripcion: "Gramos",
      abreviatura: "gr",
    },
    {
      id: 1,
      descripcion: "Unidades",
      abreviatura: "Uni",
    }
  ];
  /*
  const ingredientesData = [
    {
      id: 123,
      descripcion: 'Aceitunas',
    },
    {
      id: 124,
      descripcion: 'Aceitunas negras',
    },
    {
      id: 125,
      descripcion: 'Aceitunas verdes',
    },
    {
      id: 249,
      descripcion: 'Macedonia de frutas',
    },
    {
      id: 443,
      descripcion: 'Trigo sarraceno',
    },
  ];*/

useEffect(() => {
    // Buscar el objeto de tipo unidad correspondiente al valor de 'unit'
    const selected = dataUnit.find(item => item.descripcion === unit);
    if (selected) {
      setSelectedUnit(selected);
    }
  }, [unit]);

  const handleAddIngredient = () => {
    setUnit('gr')
    setCount('')
    const nuevoIngrediente = {
      id_ingrediente: selectedIngredient.id,
      name: selectedIngredient.descripcion,
      count,
      typeUnit: selectedUnit.id,
      unit: selectedUnit.abreviatura,
    };
    onAddIngredient(nuevoIngrediente);
    onClose();
  };

  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <AutoCompleteDropdown
            data={ingredientesData.ingredientes}
            onSelect={(item) => setSelectedIngredient(item)}
          />
          <TextInput
            placeholder="Cantidad"
            value={count}
            onChangeText={(text) => setCount(text)}
            keyboardType="numeric"
            style={styles.input}
          />
          <View style={styles.units}>
            <Text>Unidad:</Text>
            {dataUnit.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => setUnit(item.descripcion)}>
                <Text style={[styles.unitText, unit === item.descripcion && styles.selectedUnit]}>
                  {item.abreviatura}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.buttons}>
            <Button
              title="Guardar"
              onPress={handleAddIngredient}
              color="#129575"
              disabled={!isComplete}
            />
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
