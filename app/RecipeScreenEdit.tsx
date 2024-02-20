import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import ImageCarouselFlatList from '../components/ImageCarouselFlatList';
import RecipeTitle from '../components/recipeTitle';
import RecipesValues from '../components/recipesValues';
import { MaterialIcons } from '@expo/vector-icons';
import CustomTabNavigator from '../components/customTabNavigator';

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

  const updateRecipeValues = (newRecipeValues) => {
    setCaloriasState(newRecipeValues.recipeCal);
    setProteinasState(newRecipeValues.recipePro);
    setGrasasState(newRecipeValues.recipeGra);
    setTiempoState(newRecipeValues.recipeTime);
  };

  const handleVideoLinkChange = (text: string) => {
    setVideoLink(text);
  };

  const updateRecipeTitle = (newRecipeTitle) => {
    console.log('Nuevos titulos' + JSON.stringify(newRecipeTitle));
  };

  const updateRecipeImages = (newImages) => {
    console.log('Nuevas fotos' + JSON.stringify(newImages));
  };

  const updateRecipeTab = (newRecipeTab) => {
    console.log('Nuevos tabs' + JSON.stringify(newRecipeTab));
  };

  const handleSave = () => {
    console.log('Guardando los datos...');
    const data = {
      images,
      linkVideo: videoLink,
      recipeTitle,
      recipeDesc,
      caloriasState,
      proteinasState,
      grasasState,
      tiempoState,
      porcionesState,
      ingredients,
      arrayIngredientes,
      textoProcedimiento,
      editable,
    };
    console.log('Datos guardados:', data);
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
      />
      {editable && (
        <>
          <TouchableOpacity
            style={[styles.floatingButton, styles.saveButton]}
            onPress={handleSave}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.floatingButton, styles.cancelButton]}
            onPress={() => {}}>
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
