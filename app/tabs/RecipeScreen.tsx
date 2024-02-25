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
  Modal,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import useRecipesPaginated from '../../hooks/useRecipesPaginated';
import { FontAwesome6 } from '@expo/vector-icons';
import { styles } from '../../theme/RecipesScreenStyle';
import YouTubePlayer from '../../YoutubePlayer';
import useProfilePaginated from '../../hooks/useProfilePaginated';
import useFavoritesPaginated from '../../hooks/useFavoritesPaginated';
import StarRating from 'react-native-star-rating-widget';
import useRating from '../../hooks/useRating';
import CustomModal from '../../components/CustomModal';

const RecipeScreen = () => {
  const windowHeight = Dimensions.get('window').height;

  const [rating, setRating] = useState(0);
  const [isRating, setIsRating] = useState(false)
  const [isIngredientes, setisIngredientes] = useState(true)
  const [isVideo, setIsVideo] = useState(false)
  const { id, nombre} = useLocalSearchParams()
  const [isOptionsView, setIsOptionsView] = useState(false)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  console.log('urii ', selectedImage)

  const {isError: isErrorProfilePaginated, setIsError: setIsErrorProfilePaginated} = useProfilePaginated()
  const {addRating, isError: isErrorRating, isSuccess: isSuccessRating, setIsError: setIsErrorRating, setIsSuccess: setIsSuccesRating} = useRating()
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
    puntaje,
    imagenes
  } = useRecipesPaginated(id)
    const {addFavorite, isError, isSuccess, setIsSuccess, setIsError} = useFavoritesPaginated()

    const handleAccept = () => {
      setIsError(false)
      setIsSuccess(false)
      setIsErrorProfilePaginated(false)
      setIsErrorRating(false)
      setIsSuccesRating(false)
    }

    const handleImagePress = (image) => {
      setSelectedImage(image);
      setModalVisible(true);
    };
  
    const onClose = () => {
      setModalVisible(false);
      setSelectedImage(null);
    };
  

    useEffect(() => {
      setTitle(isError || isErrorProfilePaginated || isErrorRating ? "¡Ups! Ha ocurrido un error." : isSuccess || isSuccessRating ? "¡Felicidades!" : "")
      setDesc(isError || isErrorProfilePaginated || isErrorRating ? "Por favor, intentalo nuevamente más tarde." : isSuccess ? "Agregaste esta receta a tus favoritas" : isSuccessRating && "Calificación agregaga con éxito")
    },[isError, isSuccess, isSuccessRating, isErrorRating, isErrorProfilePaginated])

    const onShare = async () => {
      try {
        const result = await Share.share({
          title: '¡Hey! Mirá esta receta.',
          message: titulo + '\n' + descripcion,
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

    const handleAddFavorite = async () => {
        await addFavorite(id)
    }

    const handleAddRating = async () => {
        setRating(0)
        setIsRating(false)
        await addRating(id, rating)
    }

  return (
  <>
  { isVideo ? 
  <YouTubePlayer videoId={youtube.split('?v=')[1]} setIsVideo={setIsVideo} /> :
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
          <Pressable onPress={() => {onShare(); setIsOptionsView(false)}} style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              alignItems: 'center',
              padding: 5
              }}>
            <FontAwesome6 name='share' size={20} />
            <Text style={{marginLeft: 20}}>Compartir</Text>
          </Pressable>
          <Pressable
            onPress={() => {setIsRating(true); setIsOptionsView(false)}}
            style={{
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
            <Text style={{fontSize: 30}}>VER VIDEO</Text>
          </Pressable> : null}
          renderItem={({ item, index }) =>
            <TouchableOpacity onPress={() => handleImagePress(item)} key={item.id_imagen}>
              <Image style={{ width: 350, height: 200, borderRadius: 30, marginRight: index <( imagenes.length - 1) ? 25 : 0 }} source={{ uri: item.url }} />
            </TouchableOpacity>
          }
        />
        <Ionicons name="arrow-back-circle-outline" onPress={() => router.replace('/tabs/HomeScreen')} size={40} color="white" style={{ position: 'absolute', left: 10, top: 35 }} />
        <TouchableOpacity
            onPress={() => handleAddFavorite()} 
            style={{
                position: 'absolute', 
                right: 40, 
                bottom: 15, 
                backgroundColor: 'white',
                padding: 10, 
                borderRadius: 100
              }}
              >
          <FontAwesome6 name='bookmark' color={'#129575'} size={25} />
        </TouchableOpacity>
        <View style={{
            position: 'absolute', 
            right: 40, 
            top: 15, 
            backgroundColor: '#FFE1B3',
            padding: 8, 
            borderRadius: 100,
            flexDirection: 'row',
            alignItems: 'center',
            width: '18%',
            justifyContent: 'space-around'
          }}>
          <Ionicons name='star' color={'#FFAD30'} size={15} />
          <Text style={{fontSize: 18}}>{puntaje ? puntaje : '0'}</Text>
        </View>
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
        <View style={{backgroundColor: '#129575', width: 50, height: 50, borderRadius: 100, justifyContent: 'center', alignItems: 'center' ,marginRight: 10}}>
          <Text style={{color: 'white', fontSize: 20}}>{nombre.toString().charAt(0)}</Text>
        </View>
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
      <Modal visible={isRating} transparent>
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'rgba(0,0,0,0.2)'}}>
          <View style={{backgroundColor: 'white', width: '55%', height: '18%', borderRadius: 10, justifyContent: 'space-around', alignItems: 'center'}}>
            <Text style={{fontSize: 16}}>Calificar</Text>
            <StarRating
              rating={rating}
              onChange={setRating}
            />
            <Pressable 
              disabled={rating === 0}
              onPress={() => handleAddRating()}
              style={{
                backgroundColor: rating > 0 ? '#129575' : 'rgba(0,0,0,0.2)', 
                padding: 10, 
                width: '50%', 
                justifyContent: 'center', 
                borderRadius: 10
              }}>
              <Text style={{color: 'white', textAlign: 'center'}}>Enviar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <CustomModal descripcion={desc} onAceptar={handleAccept} visible={isError || isSuccess || isSuccessRating || isErrorProfilePaginated || isErrorRating} titulo={title} />

      
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={{    
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          justifyContent: 'center',
          alignItems: 'center'
          }}>
          <TouchableOpacity style={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 1,
            }} onPress={onClose}>
            <Ionicons name="close-circle" size={40} color="#fff" />
          </TouchableOpacity>
          <View style={{position: 'relative',}}>
            <Image
              source={{ uri: selectedImage ? selectedImage.url : null }}
              style={{
                width: 350,
                height: '100%',
                resizeMode: 'cover',
                borderRadius: 30
              }}
              resizeMode="contain"
            />
          </View>
        </View>
      </Modal>

    </SafeAreaView>}
    </>
  );
};


export default RecipeScreen;