import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';

interface RecipesValuesProps {
  recipeCal?: number;
  recipePro?: number;
  recipeGra?: number;
  recipeTime?: number;
  recipePer?: number;
  recipeIngCount?: number;
  modoEdicion?: boolean;
  updateRecipeValues: (newRecipeValues: {
    recipeCal: number;
    recipePro: number;
    recipeGra: number;
    recipeTime: number;
    recipePer: number;
  }) => void;
}

const RecipesValues: React.FC<RecipesValuesProps> = ({
  recipeCal = 0,
  recipePro = 0,
  recipeGra = 0,
  recipeTime = 0,
  recipePer = 0,
  recipeIngCount = 0,
  modoEdicion = true,
  updateRecipeValues,
}) => {
  const [caloriasState, setCaloriasState] = useState(recipeCal);
  const [proteinasState, setProteinasState] = useState(recipePro);
  const [grasasState, setGrasasState] = useState(recipeGra);
  const [tiempoState, setTiempoState] = useState(recipeTime);
  const [porcionesState, setPorcionesState] = useState(recipePer);
  const [cantidadIngredientesState, setCantidadIngredientesState] =
    useState(recipeIngCount);
  const [modalVisible, setModalVisible] = useState(false);
  const [valorEditado, setValorEditado] = useState('');
  const [editValue, setEditValue] = useState('');

  const handleEditValue = (valor: string, valorActual: number) => {
    setValorEditado(valor);
    setEditValue(valorActual.toString());
    setModalVisible(true);
  };

  useEffect(() => {
    setCantidadIngredientesState(recipeIngCount)
  }, [recipeIngCount])

  const handleSave = () => {
    switch (valorEditado) {
      case 'calorias':
        setCaloriasState(Number(editValue));
        if (updateRecipeValues) {
          updateRecipeValues({
            recipeCal: Number(editValue),
            recipePro: proteinasState,
            recipeGra: grasasState,
            recipeTime: tiempoState,
            recipePer: porcionesState,
          });
        }
        break;
      case 'proteinas':
        setProteinasState(Number(editValue));
        if (updateRecipeValues) {
          updateRecipeValues({
            recipeCal: caloriasState,
            recipePro: Number(editValue),
            recipeGra: grasasState,
            recipeTime: tiempoState,
            recipePer: porcionesState,
          });
        }
        break;
      case 'grasas':
        setGrasasState(Number(editValue));
        if (updateRecipeValues) {
          updateRecipeValues({
            recipeCal: caloriasState,
            recipePro: proteinasState,
            recipeGra: Number(editValue),
            recipeTime: tiempoState,
            recipePer: porcionesState,
          });
        }
        break;
      case 'tiempo':
        setTiempoState(Number(editValue));
        if (updateRecipeValues) {
          updateRecipeValues({
            recipeCal: caloriasState,
            recipePro: proteinasState,
            recipeGra: grasasState,
            recipeTime: Number(editValue),
            recipePer: porcionesState,
          });
        }
        break;
      case 'porciones':
        setPorcionesState(Number(editValue));
        if (updateRecipeValues) {
          updateRecipeValues({
            recipeCal: caloriasState,
            recipePro: proteinasState,
            recipeGra: grasasState,
            recipeTime: tiempoState,
            recipePer: Number(editValue),
          });
        }
        break;
      default:
        break;
    }
    setModalVisible(false);
  };

  const handleCancel = () => {
    setEditValue('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.valorContainer}>
          <Text style={styles.valor}>{caloriasState}</Text>
          <Text style={styles.unidad}>Calorias</Text>
          {modoEdicion && (
            <TouchableOpacity style={styles.iconButton}
              onPress={() => handleEditValue('calorias', caloriasState)}>
              <FontAwesome6 name="edit" size={20} color="#ccc" />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.valorContainer}>
          <Text style={styles.valor}>{proteinasState}</Text>
          <Text style={styles.unidad}>proteinas</Text>
          {modoEdicion && (
            <TouchableOpacity style={styles.iconButton}
              onPress={() => handleEditValue('proteinas', proteinasState)}>
              <FontAwesome6 name="edit" size={20} color="#ccc" />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.valorContainer}>
          <Text style={styles.valor}>{grasasState}</Text>
          <Text style={styles.unidad}>grasas</Text>
          {modoEdicion && (
            <TouchableOpacity style={styles.iconButton}
              onPress={() => handleEditValue('grasas', grasasState)}>
              <FontAwesome6 name="edit" size={20} color="#ccc" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.valorContainer}>
          <Text style={styles.valor}>{tiempoState}</Text>
          <Text style={styles.unidad}>Min</Text>
          {modoEdicion && (
            <TouchableOpacity style={styles.iconButton}
              onPress={() => handleEditValue('tiempo', tiempoState)}>
              <FontAwesome6 name="edit" size={20} color="#ccc" />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.valorContainer}>
          <Text style={styles.valor}>{porcionesState}</Text>
          <Text style={styles.unidad}>porciones</Text>
          {modoEdicion && (
            <TouchableOpacity style={styles.iconButton}
              onPress={() => handleEditValue('porciones', porcionesState)}>
              <FontAwesome6 name="edit" size={20} color="#ccc" />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.valorContainer}>
          <Text style={styles.valor}>{cantidadIngredientesState}</Text>
          <Text style={styles.unidad}>Ingredientes</Text>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setEditValue(text)}
              keyboardType="numeric"
              placeholder="Ingrese el nuevo valor"
              value={editValue}
            />
            <View style={styles.modalButtons}>
              <Button onPress={handleSave} title="Guardar" />
              <Button onPress={handleCancel} title="Cancelar" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  valorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valorEditable: {
    fontSize: 18,
    width: 50,
    marginRight: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  valor: {
    fontSize: 16,
    marginRight: 5,
  },
  unidad: {
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: 200,
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  iconButton: {
    marginLeft: 5
  }
});

export default RecipesValues;
