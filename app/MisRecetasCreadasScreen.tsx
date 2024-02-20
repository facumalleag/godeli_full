import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import useMisRecetasPaginated from '../hooks/useMisRecetasPaginated';
import useProfilePaginated from '../hooks/useProfilePaginated';
import { guardadoStyle } from '../theme/RecetasGuardadasStyle';
import { FadeInImage } from '../components/FadeImage';
import RecetaItem from './RecetaItem';
import { screenMisRecetasStyles } from '../theme/screenMisRecetasStyles';
import useFavoritesPaginated from '../hooks/useFavoritesPaginated';




const MisRecetasCreadasScreen = () => {
  const { foto } = useProfilePaginated()
  const { simpleMisRecetasList, getMisRecetas,isLoading } = useMisRecetasPaginated()
  //const { simpleFavoriteList, getFavorites } = useFavoritesPaginated()

  return (

    <View
      style={
        guardadoStyle.container}>
      <View style={{
         marginHorizontal:20,
         marginTop:40,
         marginBottom:25
      }
      }>
        <View style={{flexDirection:'row',marginBottom:-45}}>
          <Link href='tabs/HomeScreen' asChild>
          <Ionicons name="arrow-back-circle-outline" onPress={() => router.navigate('/HomeScreen')} size={45} color="#A9A9A9" style={{  }} />
          </Link>
          <Text style={guardadoStyle.title}>Tus Recetas</Text>
        </View>
        <Link href='/ProfileScreen' style={{alignSelf:"flex-end", marginBottom:5}}>
            <FadeInImage
              uri={foto}
              style={{
                height: 50,
                width: 50,
                borderRadius: 55
              }}
            />
          </Link>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={simpleMisRecetasList}//{}simpleFavoriteList
          keyExtractor={(receta) => receta.id_receta.toString()}
          numColumns={2}
          onEndReached={getMisRecetas}
          onEndReachedThreshold={0.4}
          renderItem={({ item }) =>
            <RecetaItem recetaKey={item.id_receta.toString()} recetaImagen={item.imagen} recetaNombre={item.nombre} recetaPuntaje={item.puntaje} recetaTitulo={item.titulo} />
          }
        />
        <View style={{ flexDirection: 'column' }}>
          <Link href='/AgregarRecetaScreen' style={screenMisRecetasStyles.addIcon} >
            <Ionicons name='add-circle' size={70} color="#129575"
            />
          </Link>
         
        </View>
        
      </View>
    </View>
  )
}

export default MisRecetasCreadasScreen