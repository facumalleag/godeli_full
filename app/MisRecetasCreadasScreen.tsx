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
      <View style={
        guardadoStyle.globalMargin
      }>
        <View style={{}}>
          <Link href='/ProfileScreen' style={guardadoStyle.profileStyle}>
            <FadeInImage
              uri={foto}
              style={{
                height: 50,
                width: 50,
                borderRadius: 55
              }}
            />
          </Link>
          <Text style={guardadoStyle.title}>Tus Recetas</Text>
        </View>
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
          <Link href='tabs/HomeScreen' asChild>
            <TouchableOpacity style={{
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 30,
              backgroundColor: 'white',
              borderColor:'#129575',
              borderWidth:3,
              alignSelf: "center",//#129575
            }}>
              <Text style={{ color: '#71B1A1', fontSize: 16, }}>Atrás</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  )
}

export default MisRecetasCreadasScreen