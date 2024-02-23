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
import usePostMisRecetaPaginated from '../hooks/usePostMisRecetaPaginated';
import { router } from 'expo-router';

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

  const handleSave = () => {
    console.log('Guardando los datos...');
    const fileIma = { newImages };
    const formattedIngredients = newIngredients.map((ingredient) => {
      let res="" //`Bearer ${clave}`
      newIngredients.forEach(ingredient => {
      res+=`{"id_ingrediente": ${ingredient.name},
      "cantidad": ${ingredient.count},
      "id_unidad" : ${ingredient.unit}},`
      }) 
      //console.log(newIngredients)
      /* return {
        id_ingrediente: ingredient.name,
        cantidad: ingredient.count,
        id_unidad: ingredient.unit,
      }; */
    });
     /* const data= JSON.stringify({
      "titulo": newTitle,
      "descripcion": newDesc,
      "preparacion": newProc,
      "youtube": videoLink,
      tiempo_preparacion: tiempoState,
      rendimiento: porcionesState,
      calorias: caloriasState,
      proteinas: proteinasState,
      grasas: grasasState,
      ingredientes: formattedIngredients,
      //tags: [{"id_tag": 1}]
    })  */
    const data={
      "titulo": "titulo prueba",
      "descripcion": "Si viajamos a Italia, hay 3 cosas que probar lógicamente, una buena pizza, una deliciosa pasta y un cremoso risotto. Hoy vamos a preparar un risotto de setas, una de las recetas top de la gastronomía italiana.",
      "preparacion": "1.- Comenzamos pochando a fuego suave la cebolla y el ajo. Picados finamente hasta que se hagan.\r\n\r\n2.- Pasados unos 15 minutos agregamos las setas cortadas. Yo lo que hago es cortar una parte en trozos pequeños y otra en tiras, simplemente para que quede más vistoso.\r\n\r\n3.- Cuando tengamos hechas las setas, agregamos el arroz para anacararlos y que absorba todos los sabores.\r\n\r\n4.- Incorporamos la copa de vino blanco y dejamos que se evapore el alcohol.\r\n\r\n5.- Ahora llega el momento clave, ponemos el caldo de pollo o verduras en un cazo a calentar, también podemos usar agua caliente pero prefiero mil veces caldo.",
      "youtube": null,
      "tiempo_preparacion": 50,
      "rendimiento": 3,
      "calorias": 1500,
      "proteinas": 45,
      "grasas": 50,
      "ingredientes": [
          {
              "id_ingrediente": 7,
              "cantidad": 2,
              "id_unidad" : 1
          },
          {
              "id_ingrediente": 8,
              "cantidad": 4,
              "id_unidad" : 2
          },
          {
              "id_ingrediente": 9,
              "cantidad": 5,
              "id_unidad" : 1
          },
          {
              "id_ingrediente": 10,
              "cantidad": 7,
              "id_unidad" : 3
          },
          {
              "id_ingrediente": 11,
              "cantidad": 8,
              "id_unidad" : 1
          }
      ],
      "tags": [
          {
              "id_tag": 1
          },
          {
              "id_tag": 2
          },
          {
              "id_tag": 3
          }
      ]
  }
    return data
    //return JSON.stringify(data)
     
    /* 
    console.log('Archivos guardados:', fileIma);
    console.log('Datos guardados:'); */
  };
console.log(handleSave())
//usePostMisRecetaPaginated(handleSave())


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
      {editable && (
        <>
          <TouchableOpacity
            style={[styles.floatingButton, styles.saveButton]}
            onPress={handleSave}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.floatingButton, styles.cancelButton]}
            onPress={() => router.navigate('tabs/HomeScreen')}>
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
