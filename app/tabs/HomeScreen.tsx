import React from 'react'
import { FlatList, Text, View } from 'react-native';
import { screenHomeStyles } from '../../theme/screenHomeStyles';
import RecetaItem from '../../components/RecetaItem';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SearchInput from '../../components/SearchInput';
import useProfilePaginated from '../../hooks/useProfilePaginated';
import { Link } from 'expo-router';
import useRecipesHomePaginated from '../../hooks/useRecipesHomePaginated';
import { FadeInImage } from '../../components/FadeImage';



const HomeScreen = () => {
  const {simpleRecipesList}=useRecipesHomePaginated()
  //console.log(simpleRecipesList)
  const { nombre, foto } = useProfilePaginated()


  return (
    <View style={
      screenHomeStyles.container
    }>
    <View style={
      screenHomeStyles.globalMargin
    }>
       <Link href='/ProfileScreen' style={screenHomeStyles.profileStyle}>
       <FadeInImage
          uri={foto}
          style={{
            height: 50,
            width: 50,
            borderRadius:55
          }}
        /> 
      </Link>
      <Text style={screenHomeStyles.title}>Hola {nombre}</Text>
      <Text style={screenHomeStyles.subtitle}>¿Que vas a cocinar hoy?</Text>
      <SearchInput />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={simpleRecipesList}
        keyExtractor={(receta)=>receta.id_receta.toString()}
        numColumns={2}
        renderItem={({ item }) =>
          <RecetaItem recetaKey={item.id_receta.toString()} recetaImagen={item.imagen} recetaNombre={item.nombre} recetaPuntaje={item.puntaje} recetaTitulo={item.titulo}/>
        }
      />

    </View>
    </View>

  )
}

export default HomeScreen
