import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import ImageCarouselFlatList from '../components/ImageCarouselFlatList';
import RecipeTitle from '../components/recipeTitle';
import RecipesValues from '../components/recipesValues';
import { MaterialIcons } from '@expo/vector-icons';
import CustomTabNavigator from '../components/customTabNavigator';
import { router } from 'expo-router';
import useRecipeCreation from '../hooks/useRecipeCreation';
import CustomModal from '../components/CustomModal';
import Tags from '../components/Tags'
import useTags from '../hooks/useTags'


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
  const { createRecipe, loading, isError, isSuccess} = useRecipeCreation();
  const [modalVisible, setModalVisible] = useState(false);
  const [isSetTags, setIsSetTags] = useState(false)
  const [tags, setTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const {getTags, allTags} = useTags()

  const handleAceptar = () => {
    setModalVisible(false);
    router.replace('/HomeScreen')
  };

  useEffect(() => {
    getTags()
}, [])

useEffect(() => {
  if(isError || isSuccess) {
    setModalVisible(true)
  }
}, [isError, isSuccess])

useEffect(() => {
    setTags(allTags)
}, [allTags])

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

  const handleTagsSelected = (value: string) => {
    setIsSetTags(false)
    const index = selectedTags.indexOf(value);
    if (index !== -1) {
        selectedTags.splice(index, 1);
      return
    }
    setSelectedTags([...selectedTags, value.replace(' ', '')])
}

  const updateRecipeTitle = (newRecipeTitle) => {
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
    } else if (isError) {
      // Puedes manejar el error mostrando un mensaje de error al usuario
      console.error('Error:');
    } else {
      // La receta se creó con éxito, puedes realizar acciones adicionales aquí
      console.log('Receta creada con éxito');
    }
  }, [loading]);

  const handleBack = () => {
    router.back()
  }


  const handleSave = () => {
    console.log('Guardando los datos...');
    const fileIma = { newImages };
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
      tags: selectedTags.map(t =>  {
        return {id_tag: t}
      })

    };
    createRecipe(JSON.stringify(jsonData), fileIma);
  };


  return (
      <KeyboardAvoidingView behavior='padding' style={{flex: 1}}>
        <ScrollView>
        <View style={styles.container}>
          <View style={[styles.carrousel, { height: windowHeight * 0.30 }]}>
            <ImageCarouselFlatList
              images={images}
              editable={editable}
              uriVideo={linkVideo}
              updateRecipeImages={updateRecipeImages}
            />
          </View>
          <RecipeTitle
            title={recipeTitle}
            description={recipeDesc}
            updateRecipeTitle={updateRecipeTitle}
          />
          <TouchableOpacity 
            onPress={() => setIsSetTags(true)}
            style={{    
              padding: 10,
              backgroundColor: '#129575',
              borderRadius: 10,
              width: '45%',
              alignItems: 'center',
              marginHorizontal: 5,
              }}
              >
            <Text style={styles.buttonText}>Categoría</Text>
          </TouchableOpacity>
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
            recipeIngCount={newIngredients.length}
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
            titulo={isSuccess ? "Receta Cargada" : '¡Ups! Ocurrió un error'}
            descripcion={isSuccess ? "Ya puedes verla en mis recetas" : "Por favor, intentá nuevamente más tarde."}
            onAceptar={handleAceptar}
          />
          {editable && (
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[styles.floatingButton, styles.saveButton, !isComplete && {backgroundColor: '#9D9D9D'}]}
                onPress={handleSave}
                disabled={!isComplete}>
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.floatingButton, styles.cancelButton]}
                onPress={handleBack}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          )}
          <Modal visible={isSetTags}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: '10%' }}>
                {tags.map((item, index) => <Tags isSelected={selectedTags.indexOf(item.id.toString()) !== -1} handleTagsSelected={handleTagsSelected} key={index} item={item} />)}
            </View>
          </Modal>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    paddingVertical: 8,
    paddingHorizontal: 30
  },
  carrousel: {},
  videoInput: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  videoIcon: {
    marginTop: -5
  },
  videoTextInput: {
    borderWidth: 1,
    width: '90%',
    borderColor: '#ccc',
    borderRadius: 12,
    backgroundColor: '#D9D9D9',
    color: '#3B5059',
    padding: 8,
    marginBottom: 10,
    marginRight: 5
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  floatingButton: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  saveButton: {
    backgroundColor: '#129575',
    width: '45%'
  },
  cancelButton: {
    backgroundColor: '#129575',
    width: '45%'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default RecipeScreenEdit;
