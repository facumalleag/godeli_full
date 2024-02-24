import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Pressable,
  FlatList,
  Image,
  ScrollView,
  Button,
  SafeAreaView,
  Share,
  Alert,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import useRecipesPaginated from '../hooks/useRecipesPaginated';
import * as Linking from 'expo-linking';
import { FontAwesome6 } from '@expo/vector-icons';
import { styles } from '../theme/RecipesScreenStyle';
import WebView from 'react-native-webview';
import YouTubePlayer from '../YoutubePlayer';
import useProfilePaginated from '../hooks/useProfilePaginated';

const RecipeScreen = () => {
  const windowHeight = Dimensions.get('window').height;

  const [isIngredientes, setisIngredientes] = useState(true)
  const [isVideo, setIsVideo] = useState(false)
  const { id, nombre} = useLocalSearchParams()
  const [isOptionsView, setIsOptionsView] = useState(false)
  const {foto} = useProfilePaginated()
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
    if(isVideo) {
     return <YouTubePlayer videoId="mIlJdlMu0Tw" setIsVideo={setIsVideo} />
    }

    const onShare = async () => {
      try {
        const result = await Share.share({
          message:
            'React Native | A framework for building native apps using React',
            url: 'https://reactnative.dev/docs/share'
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error: any) {
        Alert.alert(error.message);
      }
    };



  return (
    <SafeAreaView style={[styles.container, {paddingHorizontal: 30, paddingTop: 40}]}>
      {
        isOptionsView && <View style={{position: 
          'absolute', 
          width: '50%', 
          height: '12%', 
          top: 80, 
          justifyContent: 'space-evenly',
          zIndex: 10,
          right: 20, 
          backgroundColor: 'white',
          borderRadius: 10,
          }}>
          <Pressable onPress={() => onShare()} style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              alignItems: 'center',
              padding: 5
              }}>
            <FontAwesome6 name='share' size={20} />
            <Text style={{marginLeft: 20}}>Compartir</Text>
          </Pressable>
          <Pressable style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              padding: 5
              }}>
            <Ionicons name='star' size={25} />
            <Text style={{marginLeft: 20}}>Calificar</Text>
          </Pressable>
          {
            false && <Pressable style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 20,
              padding: 5
              }}>
            <FontAwesome6 name='pen-to-square' size={20} />
            <Text style={{marginLeft: 20}}>Editar</Text>
          </Pressable>
          }
       
        </View>
      }
      <Pressable onPress={() => setIsOptionsView(!isOptionsView)} style={{alignItems: 'flex-end'}}>
        <Text style={{color: 'black', fontWeight: 'bold', fontSize: 30}}>...</Text>
      </Pressable>
      <View style={[styles.carrousel]}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={imagenes}
          keyExtractor={(imagen) => imagen.id_imagen.toString()}
          horizontal={true}
          ListFooterComponent={youtube ? <Pressable onPress={() => setIsVideo(true)} style={{ 
            width: 350, 
            height: 200, 
            borderRadius: 30, 
            justifyContent: 'center', 
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.2)',
            marginHorizontal: 10
             }}>
            <Text style={{fontSize: 40}}>VER VIDEO</Text>
          </Pressable> : null}
          renderItem={({ item, index }) =>
            <View key={item.id_imagen}>
              <Image style={{ width: 350, height: 200, borderRadius: 30, marginRight: index <( imagenes.length - 1) ? 25 : 0 }} source={{ uri: item.url }} />
            </View>
          }
        />
        <Ionicons name="arrow-back-circle-outline" onPress={() => router.back()} size={40} color="white" style={{ position: 'absolute', left: 10, top: 35 }} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.title}>{titulo}</Text>

      </View>
      <View style={styles.valores}>
        <Text style={{ ...styles.styleValues, marginLeft: 1 }}>{calorias} calorías</Text>
        <Text style={styles.styleValues}>{proteinas} proteínas</Text>
        <Text style={styles.styleValues}>{ tiempo_preparacion} min</Text>
        <Text style={styles.styleValues}>{grasas} grasas</Text>
      </View>
      <View style={styles.containerName}>
        <Text style={{ fontSize: 13 }}>{descripcion}</Text>
      </View>

      <View style={styles.containerName}>
        {foto !== '' && <Image source={{uri: foto}} style={{width: 45, height: 45, borderRadius: 100, marginRight: 10}} />}
        <Text style={{ fontSize: 20 }}>{nombre}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginBottom:5 }}>
        <TouchableOpacity style={isIngredientes ? styles.options: {...styles.options, backgroundColor: 'transparent'}}
          onPress={() => {
            setisIngredientes(true)
          }}
        >
          <Text style={isIngredientes ? styles.buttonText: {...styles.buttonText, color: '#129575'}}>Ingredientes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={!isIngredientes ? styles.options: {...styles.options, backgroundColor: 'transparent'}}
          onPress={() => {
            setisIngredientes(false)
          }}
        >
          <Text style={!isIngredientes ? styles.buttonText: {...styles.buttonText, color: '#129575'}}>Procedimiento</Text>
        </TouchableOpacity>
      </View>



      <View style={styles.valores}>
        {rendimiento == "1" ?
          <FontAwesome6 name="plate-wheat" size={12} color="rgba(0,0,0,0.5)" style={styles.styleValues}> {rendimiento} porción</FontAwesome6>
          // <Text style={styles.txtporciones}>{rendimiento} porción</Text> 
          :
          <FontAwesome6 name="plate-wheat" size={12} color="rgba(0,0,0,0.5)" style={styles.styleValues}> {rendimiento} porciones</FontAwesome6>
          //<Text style={styles.txtporciones}>{rendimiento} porciones</Text>
        }
        <Ionicons name="newspaper-outline" size={14} color="rgba(0,0,0,0.5)" style={styles.styleValues}> {ingredientes.length} INGREDIENTES</Ionicons>

      </View>
      {
        isIngredientes ?
          <View style={{flex: 1}}>
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
            contentContainerStyle={{paddingBottom: 40}}
            showsVerticalScrollIndicator={false}
            style={{...styles.procedimiento, padding: 15,}}>
            <Text style={{color: 'rgba(0,0,0,0.5)'}}>
              {preparacion}</Text>
          </ScrollView>
          </View>

      }

    </SafeAreaView>
  );
};


export default RecipeScreen;