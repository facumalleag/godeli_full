import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import IngredientModal from './IngredientModal';

interface Ingredient {
  name: string;
  count: string;
  unit: string;
}

interface IngredientsTabProps {
  editable?: boolean;
  ingredients?: Ingredient[];
}

const IngredientsTab: React.FC<IngredientsTabProps> = ({
  editable,
  ingredients,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [ingredientes, setIngredientes] = useState<Ingredient[]>(ingredients);
  const [cantidadIngredientesState, setCantidadIngredientesState] = useState(
    ingredients.length
  );

  useEffect(() => {
    setIngredientes(ingredients);
    setCantidadIngredientesState(ingredients.length);
  }, [ingredients]);

  console.log(ingredientes);
  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleAddIngredient = (nuevoIngrediente: Ingredient) => {
    setIngredientes([...ingredientes, nuevoIngrediente]);
  };

  const renderItem = ({ item }: { item: Ingredient }) => {
    return (
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <Text>
            {item.name} - {item.count} {item.unit}
          </Text>
          {editable && (
            <TouchableOpacity onPress={() => handleDeleteIngredient(item.name)}>
              <Text style={{ color: 'red' }}>❌</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const handleDeleteIngredient = (name: string) => {
    const newIngredients = ingredientes.filter(
      (ingrediente) => ingrediente.name !== name
    );
    setIngredientes(newIngredients);
  };

  return (
    <View style={styles.contenedorGeneral}>
      {editable && (
        <View>
          <TouchableOpacity style={styles.addButton} onPress={handleOpenModal}>
            <Text style={styles.addButtonLabel}>Agregar Ingrediente</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={ingredientes}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContentContainer}
      />
      <IngredientModal
        modalVisible={modalVisible}
        onClose={handleCloseModal}
        onAddIngredient={handleAddIngredient}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contenedorGeneral: {

    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    borderRadius: 12,
    backgroundColor: '#A9A9A9',
    height: 30,
    width: 300,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonLabel: {
    fontWeight: 'bold',
  },
  listContentContainer: {
    paddingVertical: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#A9A9A9',
    borderRadius: 12,
    height: 30,
    width: 300,
    marginBottom: 5,
  },
});

export default IngredientsTab;
