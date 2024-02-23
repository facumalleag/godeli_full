import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import ImageCarouselFlatList from '../components/ImageCarouselFlatList';
import RecipeTitle from '../components/recipeTitle';
import RecipesValues from '../components/recipesValues';
import { MaterialIcons } from '@expo/vector-icons';
import CustomTabNavigator from '../components/customTabNavigator';
import { router } from 'expo-router';
import axios from "axios";
import useRecipeCreation from '../hooks/useRecipeCreation';
import CustomModal from '../components/CustomModal';

interface RecipeScreenProps {
  images?: { id: number; uri: string }[];
  linkVideo?: string;
  recipeTitle?: string;
  recipeDesc?: string;
  recipeCal?: number;
  recipePro?: number;
  recipeGra?: number;
  recipeTime?: number;
  recipePorc?: number;
  ingredients?: { name: string; count: string; unit: string }[];
  arrayIngredientes?: string[];
  textoProcedimiento?: string;
  editable?: boolean;
}

const RecipeScreenEdit: React.FC<RecipeScreenProps> = ({
  images = [],
  linkVideo = '',
  recipeTitle = '',
  recipeDesc = '',
  recipeCal = 0,
  recipePro = 0,
  recipeGra = 0,
  recipeTime = 0,
  recipePorc = 0,
  ingredients = [],
  arrayIngredientes = [],
  textoProcedimiento = '',
  editable = true,
}) => {
  const windowHeight = Dimensions.get('window').height;
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [videoLink, setVideoLink] = useState(linkVideo);
  const [caloriasState, setCaloriasState] = useState(recipeCal);
  const [proteinasState, setProteinasState] = useState(recipePro);
  const [grasasState, setGrasasState] = useState(recipeGra);
  const [tiempoState, setTiempoState] = useState(recipeTime);
  const [porcionesState, setPorcionesState] = useState(recipePorc);
  const [newTitle, setNewTitle] = useState(recipeTitle);
  const [newDesc, setNewDesc] = useState(recipeDesc);
  const [newImages, setNewImages] = useState(images);
  const [newIngredients, setNewIngredients] = useState(ingredients);
  const [newProc, setNewProc] = useState(textoProcedimiento);
  const [isComplete, setIsComplete] = useState(false);
  const { createRecipe, loading, error } = useRecipeCreation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleAceptar = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    if (newTitle && newDesc && newIngredients && caloriasState && proteinasState && grasasState && tiempoState && porcionesState) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [newTitle, newDesc, newIngredients, caloriasState, proteinasState, grasasState, tiempoState, porcionesState]);

  const updateRecipeValues = (newRecipeValues) => {
    console.log(newRecipeValues)
    setCaloriasState(newRecipeValues.recipeCal);
    setProteinasState(newRecipeValues.recipePro);
    setGrasasState(newRecipeValues.recipeGra);
    setTiempoState(newRecipeValues.recipeTime);
    setPorcionesState(newRecipeValues.recipePer);
  };

  const handleVideoLinkChange = (text: string) => {
    setVideoLink(text);
  };

  const updateRecipeTitle = (newRecipeTitle) => {
    console.log('Nuevos titulos' + JSON.stringify(newRecipeTitle));
    setNewTitle(newRecipeTitle.title);
    setNewDesc(newRecipeTitle.description);
  };

  const updateRecipeImages = (newImages) => {
    setNewImages(newImages);
  };

  const handleTabIng = (newIngredients) => {
    setNewIngredients(newIngredients);
  };

  const handleTabProc = (newProc) => {
    setNewProc(newProc);
  };

  useEffect(() => {
    // Aquí puedes realizar acciones basadas en el estado de loading y error
    if (loading) {
      // Puedes mostrar una animación de carga o un mensaje de carga
      console.log('Cargando...');
    } else if (error) {
      // Puedes manejar el error mostrando un mensaje de error al usuario
      console.error('Error:', error);
    } else {
      // La receta se creó con éxito, puedes realizar acciones adicionales aquí
      console.log('Receta creada con éxito');
    }
  }, [loading, error]);


  const handleSave = () => {
    console.log('Guardando los datos...');
    const fileIma = { newImages };
    console.log('imagen', newImages);
    const formattedIngredients = newIngredients.map((ingredient) => {
      const cant = parseInt(ingredient.count, 10);
      return {
        id_ingrediente: ingredient.id_ingrediente,
        cantidad: cant,
        id_unidad: ingredient.typeUnit,
      };
    });
    const jsonData = {
      titulo: newTitle,
      descripcion: newDesc,
      preparacion: newProc,
      youtube: videoLink,
      tiempo_preparacion: tiempoState,
      rendimiento: porcionesState,
      calorias: caloriasState,
      proteinas: proteinasState,
      grasas: grasasState,
      ingredientes: formattedIngredients,
      //tags: [{"id_tag": 1}]
    };

    console.log('===============================');
    console.log(JSON.stringify(jsonData));
    //createRecipe(JSON.stringify(jsonData), fileIma);
    console.log('===============================');
    console.log('Archivos guardados:', fileIma);
    setModalVisible(true);
    console.log('Datos guardados:', jsonData);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.carrousel, { height: windowHeight * 0.25 }]}>
        <ImageCarouselFlatList
          images={images}
          editable={editable}
          uriVideo={linkVideo}
          updateRecipeImages={updateRecipeImages}
        />
      </View>
      <RecipeTitle
        editable={editable}
        title={recipeTitle}
        description={recipeDesc}
        updateRecipeTitle={updateRecipeTitle}
      />
      {editable && (
        <View style={styles.videoInput}>
          <TextInput
            style={styles.videoTextInput}
            placeholder="Link de tu video"
            placeholderTextColor="#3B5059"
            value={videoLink}
            onChangeText={handleVideoLinkChange}
          />
          <MaterialIcons
            name="video-library"
            size={24}
            color="#3B5059"
            style={styles.videoIcon}
          />
        </View>
      )}
      <RecipesValues
        modoEdicion={editable}
        recipeCal={recipeCal}
        recipePro={recipePro}
        recipeGra={recipeGra}
        recipeTime={recipeTime}
        updateRecipeValues={updateRecipeValues}
      />
      <CustomTabNavigator
        editable={editable}
        ingredients={ingredients}
        textoProcedimiento={textoProcedimiento}
        handleTabIng={handleTabIng}
        handleTabProc={handleTabProc}
      />
      <CustomModal
        visible={modalVisible}
        titulo="Receta Cargada"
        descripcion="Ya puedes verla en mis recetas"
        onAceptar={handleAceptar}
      />
      {editable && (
        <>
          <TouchableOpacity
            style={[styles.floatingButton, styles.saveButton]}
            onPress={handleSave}
            disabled={!isComplete}>

            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.floatingButton, styles.cancelButton]}
            onPress={() => { }}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  carrousel: {},
  videoInput: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  videoTextInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    backgroundColor: '#D9D9D9',
    color: '#3B5059',
    padding: 10,
    marginBottom: 10,
  },
  videoIcon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  saveButton: {
    backgroundColor: '#129575',
    left: 20,
  },
  cancelButton: {
    backgroundColor: '#9D9D9D',
    right: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default RecipeScreenEdit;
