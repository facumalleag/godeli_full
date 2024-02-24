import React, { useState } from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { screenHomeStyles } from '../../theme/screenHomeStyles';
import RecetaItem from '../RecetaItem';
import SearchInput from '../../components/SearchInput';
import useProfilePaginated from '../../hooks/useProfilePaginated';
import { Link } from 'expo-router';
import useRecipesHomePaginated from '../../hooks/useRecipesHomePaginated';
import { FadeInImage } from '../../components/FadeImage';
import usePostMisRecetaPaginated from '../../hooks/usePostMisRecetaPaginated';



const HomeScreen = () => {

  const [filteredRecipes, setFilteredRecipes] = useState([])
  const {simpleRecipesList,getRecipes}=useRecipesHomePaginated()
  const { nombre, foto } = useProfilePaginated()

  const handleFilterRecipes = (value: string) => {
    if (value.length < 2) {
      setFilteredRecipes([]);
      return;
  }
    value = value.toLocaleLowerCase()
    const filterRecipes = simpleRecipesList.filter(recipe =>
      recipe.nombre.toLowerCase().includes(value) ||
      recipe.titulo.toLowerCase().includes(value)
  );

  filterRecipes.length > 0 ? setFilteredRecipes(filterRecipes) : setFilteredRecipes([]);

  }
  
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
      <SearchInput handleFilterRecipes={handleFilterRecipes} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredRecipes.length > 0 ? filteredRecipes : simpleRecipesList}
        numColumns={2}
        onEndReached={getRecipes}
        onEndReachedThreshold={0.4}
        ListFooterComponent={<ActivityIndicator style={{height:100}}
        size={20}
        color="grey"
        />}
        renderItem={({ item }) =>
          <RecetaItem recetaKey={item.id_receta.toString()} recetaImagen={item.imagen} recetaNombre={item.nombre} recetaPuntaje={item.puntaje} recetaTitulo={item.titulo}/>
        }
      />
    </View>
    </View>

  )
}

export default HomeScreen
