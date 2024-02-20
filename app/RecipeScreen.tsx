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
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import useRecipesPaginated from '../hooks/useRecipesPaginated';
import * as Linking from 'expo-linking';
import { FontAwesome6 } from '@expo/vector-icons';
import { styles } from '../theme/RecipesScreenStyle';

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
        <Ionicons name="arrow-back-circle-outline" onPress={() => router.back()} size={30} color="white" style={{ position: 'absolute' }} />
        <View style={styles.containertime}>
          <Ionicons name="time-outline" size={14} color="#ffffff"> {tiempo_preparacion} min</Ionicons>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.title}>{titulo}</Text>
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
      <View style={{ flexDirection: 'row', alignSelf: 'center', marginHorizontal: 30, marginTop: 20, marginBottom:5 }}>
        <TouchableOpacity style={styles.options}
          onPress={() => {
            setisIngredientes(true)
          }}
        >
          <Text style={styles.buttonText}>Ingredientes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.optionsProceed]}
          onPress={() => {
            setisIngredientes(false)
          }}
        >
          <Text style={styles.buttonTextProced}>Procedimiento</Text>
        </TouchableOpacity>
      </View>



      <View style={styles.valores}>
        {rendimiento == "1" ?
          <FontAwesome6 name="plate-wheat" size={12} color="#A9A9A9" style={styles.styleValues}> {rendimiento} porción</FontAwesome6>
          // <Text style={styles.txtporciones}>{rendimiento} porción</Text> 
          :
          <FontAwesome6 name="plate-wheat" size={12} color="#A9A9A9" style={styles.styleValues}> {rendimiento} porciones</FontAwesome6>
          //<Text style={styles.txtporciones}>{rendimiento} porciones</Text>
        }
        <Ionicons name="newspaper-outline" size={14} color="#A9A9A9" style={styles.styleValues}> {ingredientes.length} INGREDIENTES</Ionicons>

      </View>
      {
        isIngredientes ?
          <View style={styles.container}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={ingredientes}
              keyExtractor={(ingrediente) => ingrediente.id_ingrediente.toString()}
              renderItem={({ item }) =>
                <View style={styles.ingred}>
                  <Text style={styles.ingre_tit}>
                    {item.descripcion}
                  </Text>
                  <Text style={styles.ingre_unid}>
                    {item.cantidad}
                  </Text>
                </View>
              } />
          </View>
          :
          <View style={{flex:1}}>
          <ScrollView
            keyboardDismissMode='on-drag'
            showsVerticalScrollIndicator={false}
            style={styles.procedimiento}>
            <Text style={styles.ingre_tit}>
              {preparacion}</Text>
          </ScrollView>
          </View>

      }

    </View>
  );
};


export default RecipeScreen;