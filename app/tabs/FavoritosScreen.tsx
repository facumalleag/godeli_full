import React from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import RecetaItemGuardada from '../RecetaItemGuardada'
import { guardadoStyle } from '../../theme/RecetasGuardadasStyle';
import { Link } from 'expo-router';
import useProfilePaginated from '../../hooks/useProfilePaginated';
import { FadeInImage } from '../../components/FadeImage';
import useFavoritesPaginated from '../../hooks/useFavoritesPaginated';
import { Dimensions, StyleSheet } from "react-native";

const window_width = Dimensions.get('window').width
const window_height = Dimensions.get('window').height

const FavoritosScreen = () => {
  const { foto } = useProfilePaginated()
const {  simpleFavoriteList,isLoading,getFavorites} = useFavoritesPaginated()
  return (
    
    <View
    style={{
      backgroundColor:'white',
      width:window_width,
      height:window_height
    }}>
    <View style={{
        marginHorizontal:20,
        marginTop:40,
    }
    }>
      <View style={{}}>
      <Link href='/ProfileScreen' style={guardadoStyle.profileStyle}>
            <FadeInImage
              uri={foto}
              style={{
                height: 50,
                width: 50,
                borderRadius:55
              }}
            />
          </Link>
        <Text style={{...guardadoStyle.title, marginTop:-30,marginBottom:20}}>Recetas Guardadas</Text>
      </View>
      <FlatList
          showsVerticalScrollIndicator={false}
        data={simpleFavoriteList}
        keyExtractor={(receta)=>receta.id_receta.toString()}
        numColumns={2}
        onEndReached={getFavorites} 
        onEndReachedThreshold={0.4}
        ListFooterComponent={isLoading? <ActivityIndicator style={{height:100}}
        size={20}
        color="grey"
        />
      :
    null}
        renderItem={({ item }) =>
          <RecetaItemGuardada recetaKey={item.id_receta.toString()} recetaImagen={item.imagen} recetaNombre={item.nombre} recetaPuntaje={item.puntaje} recetaTitulo={item.titulo}/>
        }
      />
    </View>
    </View>
  )
}

export default FavoritosScreen
