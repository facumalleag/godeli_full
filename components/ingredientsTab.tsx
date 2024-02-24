import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import IngredientModal from './IngredientModal';

export interface Ingredient {
  id: number; 
  name: string;
  count: string;
  unit: string;
  typeUnit: number;
}

interface IngredientsTabProps {
  editable?: boolean;
  ingredients?: Ingredient[];
  updateRecipeTabIng: (ingredients: Ingredient[]) => void;
}


const IngredientsTab: React.FC<IngredientsTabProps> = ({
  editable,
  ingredients,
  updateRecipeTabIng
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
    updateRecipeTabIng([...ingredientes, nuevoIngrediente])
  };

  const renderItem = ({ item }: { item: Ingredient }) => {
    return (
      <View style={{}}>
        <View style={styles.itemContainer}>
          <Text>
            {item.name} - <Text style={{color: 'rgba(0,0,0,0.5)'}}>{item.count} {item.unit}</Text>
          </Text>
          {editable && (
            <TouchableOpacity onPress={() => handleDeleteIngredient(item.id)}>
              <Text style={{ color: 'red' }}>❌</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const handleDeleteIngredient = (id: number) => {
    const newIngredients = ingredientes.filter(
      (ingrediente) => ingrediente.id !== id
    );
    console.log('newIngredients: ', newIngredients)
    setIngredientes(newIngredients);
    updateRecipeTabIng(newIngredients)
  };

  return (
    <View style={styles.contenedorGeneral}>
      {editable && (
        <View style={[styles.addButton, {width: '100%'}]}>
          <TouchableOpacity onPress={handleOpenModal}>
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
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  addButtonLabel: {
    color: 'rgba(0,0,0,0.7)'
  },
  listContentContainer: {
    paddingVertical: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 12,
    width: '100%',
    marginBottom: 8,
    paddingVertical: 10,
  },
});

export default IngredientsTab;
