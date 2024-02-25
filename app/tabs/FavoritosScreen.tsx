import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import RecetaItemGuardada from '../RecetaItemGuardada'
import { guardadoStyle } from '../../theme/RecetasGuardadasStyle';
import { Link } from 'expo-router';
import useProfilePaginated from '../../hooks/useProfilePaginated';
import { FadeInImage } from '../../components/FadeImage';
import useFavoritesPaginated from '../../hooks/useFavoritesPaginated';
import { Dimensions, StyleSheet } from "react-native";
import RecetaItem from '../RecetaItem';
import CustomModal from '../../components/CustomModal';

const window_width = Dimensions.get('window').width
const window_height = Dimensions.get('window').height

const FavoritosScreen = () => {
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const { foto, isError: isErrorPaginated, setIsError: setIsErrorPaginated } = useProfilePaginated()
const {  simpleFavoriteList, isLoading, getFavorites, isError, setIsError} = useFavoritesPaginated()
const onRefreshList = async () => {
  if(simpleFavoriteList.length > 10) {
    return getFavorites()
  }
}
const handleAccept = () => {
  setIsError(false)
  setIsErrorPaginated(false)
}
useEffect(() => {
  setTitulo(isError && '¡Ups! Ha ocurrido un error')
  setDescripcion(isError && 'Intentá nuevamente más tared')
}, [isError, isErrorPaginated])
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
      <Link href='/tabs/tabs/ProfileScreen' style={guardadoStyle.profileStyle}>
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
      {simpleFavoriteList.length > 0 && <FlatList
        showsVerticalScrollIndicator={false}
        data={simpleFavoriteList}
        numColumns={2}
        onEndReached={onRefreshList} 
        onEndReachedThreshold={0.4}
        ListFooterComponent={isLoading ? 
        <ActivityIndicator style={{height:100}}
          size={20}
          color="grey"
          />
            : null
          }
        renderItem={({ item }) =>
          <RecetaItem recetaKey={item.id_receta.toString()} recetaImagen={item.imagen} recetaNombre={item.nombre} recetaPuntaje={item.puntaje} recetaTitulo={item.titulo}/>
        }
      />}
    </View>
      <CustomModal descripcion={descripcion} visible={isError || isErrorPaginated} titulo={titulo} onAceptar={handleAccept} />
    </View>
  )
}

export default FavoritosScreen
