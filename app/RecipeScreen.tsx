import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Tabs, router, useLocalSearchParams } from 'expo-router';
import useRecipesPaginated from '../hooks/useRecipesPaginated';
import * as Linking from 'expo-linking';
import { FontAwesome6 } from '@expo/vector-icons';

interface RecipeScreenProps {
  images?: { id: number; uri: string }[];
  linkVideo?: string;
  recipeTitle?: string;
  recipeDesc?: string;
  recipeCal?: number;
  recipePro?: number;
  recipeGra?: number;
  recipeTime?: number;
  ingredients?: { name: string; count: string; unit: string }[];
  arrayIngredientes?: string[];
  textoProcedimiento?: string;
  editable?: boolean;
}
/* 
images = [],
linkVideo = '',
recipeTitle = '',
recipeDesc = '',
recipeCal = 0,
recipePro = 0,
recipeGra = 0,
recipeTime = 0,
ingredients = [],
arrayIngredientes = [],
textoProcedimiento = '', */

const RecipeScreen = () => {
  const windowHeight = Dimensions.get('window').height;

  const [isIngredientes, setisIngredientes] = useState(true)
  const { id, nombre } = useLocalSearchParams()
  const { calorias,
    youtube,
    tiempo_preparacion,
    descripcion,
    rendimiento,
    grasas,
    proteinas,
    preparacion,
    ingredientes,
    titulo,
    imagenes } = useRecipesPaginated(id)

  return (
    <View style={styles.container}>
      <View style={[styles.carrousel, { height: windowHeight * 0.25 }]}>
     
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={imagenes}
          keyExtractor={(imagen) => imagen.id_imagen.toString()}
          horizontal={true}
          renderItem={({ item }) =>
            <View key={item.id_imagen}>
              <Image style={{ width: 350, height: 300 }} source={{ uri: item.url }} />
            </View>
          }
        />
        <Ionicons name="arrow-back-circle-outline" onPress={() => router.back()} size={30} color="white" style={{alignSelf:'flex-start',position:'absolute'}} />
        <View style={styles.containertime}>
          <Ionicons name="time-outline" style={styles.timeIcon} size={15} color="#ffffff" />
          <Text style={styles.time}>{tiempo_preparacion} min</Text>
        </View>
      </View>
      <View>
        <Text style={styles.title}>{titulo}</Text>
      </View>

      <View style={styles.videoInput}>
        <MaterialIcons
          onPress={() => { Linking.openURL(youtube) }}
          name="video-library"
          size={24}
          color="#ff0000"
          style={styles.videoIcon}
        />
      </View>
      <View style={styles.valores}>
        <Text style={{ ...styles.styleValues, marginLeft: 1 }}>{calorias} calorías</Text>
        <Text style={styles.styleValues}>{proteinas} proteínas</Text>
        <Text style={styles.styleValues}>{grasas} grasas</Text>
      </View>
      <View style={styles.containerName}>
        <Text style={{ fontSize: 13 }}>{descripcion}</Text>
      </View>

      <View style={styles.containerName}>
        <Text style={{ fontSize: 20, textDecorationLine: 'underline' }}>Autor: {nombre}</Text>
      </View>
      <View style={{alignItems:'stretch', flexDirection:'row', marginHorizontal:30, marginTop:20}}>
        <TouchableOpacity style={styles.options} 
        onPress={()=>{setisIngredientes(true)
        }}

        >
          <Text style={styles.buttonText}>Ingredientes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.optionsProceed]}
        onPress={()=>{setisIngredientes(false)
        }}
        >
          <Text style={styles.buttonTextProced}>Procedimiento</Text>
        </TouchableOpacity>
      </View>
      
     <View  style={{justifyContent: 'space-between', flexDirection:'row', }}>
      { rendimiento=="1"? 
      <FontAwesome6 name="plate-wheat" size={10} color="#A9A9A9" style={styles.porciones}> {rendimiento} porción</FontAwesome6>
      /* <Text style={styles.txtporciones}>{rendimiento} porción</Text> */
      :
      <FontAwesome6 name="plate-wheat" size={10} color="#A9A9A9" style={styles.porciones}> {rendimiento} porciones</FontAwesome6>
      //<Text style={styles.txtporciones}>{rendimiento} porciones</Text>
}
    <Ionicons name="newspaper-outline"size={15} color="#A9A9A9" style={styles.porciones}> ingredientes</Ionicons>
      
      </View>
      {
      isIngredientes?
       <View style={styles.container}>
        <FlatList
        showsVerticalScrollIndicator={false}
        data={ingredientes}
        keyExtractor={(ingrediente)=>ingrediente.id_ingrediente.toString()}
        renderItem={({ item }) =>
          <View style={styles.ingred}>
            <Text style={styles.ingre_tit}>
              {item.descripcion}
            </Text>
            <Text style={styles.ingre_unid}>
              {item.cantidad}
            </Text>
          </View>
        }/>
        </View>
        :
        <ScrollView 
        keyboardDismissMode='on-drag'
      showsHorizontalScrollIndicator={false}
        style={styles.procedimiento}>
              <Text style={styles.ingre_tit}>
              {preparacion}
            </Text>
      </ScrollView>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  ingre_tit:{
    fontWeight: "bold",
    color:'#121212'
  },
  ingre_unid:{
    color:'#A9A9A9'
  },
  ingred:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#D9D9D9',
    borderRadius: 12,
    height: 40,
    width: 345,
    marginBottom: 5,
 },

  txtporciones:{
    color:'#A9A9A9',


  },
  porciones:{
    marginHorizontal:20,
  },
  containerName: {
    marginTop: 10
  },
  valores: {
    flexDirection: 'row',
  },
  styleValues: {
    color: "#3B5059",
    marginHorizontal: 10
  },
  containertime: {
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  timeIcon: {
    bottom: -148,
    right: 38,
  },
  time: {
    fontSize: 15,
    bottom: -130,
    right: 20,
    color: 'white',
    fontWeight: "bold",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  procedimiento:{
    backgroundColor: '#D9D9D9',
    marginTop:15,
    padding: 8,
    borderRadius:30,
  },
  container: {
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  carrousel: {
    marginTop: 20,
    marginBottom: 5,
  },
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
    top: -30,
  },
  options: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    alignItems: 'center',
    backgroundColor: '#129575',
  },
  floatingButton: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#129575',
  },
  cancelButton: {
    backgroundColor: '#9D9D9D',
    right: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  buttonTextProced: {
    color: '#129575',
    fontSize: 16,
  },
  optionsProceed:{
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#71B1A1',//71B1A1  129575
    borderColor:'#129575'
  }
});

export default RecipeScreen;
