import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { screenHomeStyles } from '../../theme/screenHomeStyles';
import RecetaItem from '../RecetaItem';
import SearchInput from '../../components/SearchInput';
import useProfilePaginated from '../../hooks/useProfilePaginated';
import { Link } from 'expo-router';
import useRecipesHomePaginated from '../../hooks/useRecipesHomePaginated';
import { FadeInImage } from '../../components/FadeImage';
import CustomModal from '../../components/CustomModal';
import { Tag } from '../../interfaces/FavoritesInterface';
import useTags from '../../hooks/useTags';



const HomeScreen = () => {

  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [recipes, setRecipes] = useState([])
  const {isLoading, filterRecipesByParams, isFilterEmpty, getFirstRecipes, getRecipes}=useRecipesHomePaginated()
  const { nombre, foto, isError, setIsError } = useProfilePaginated()

  const [tagsSelected, setTagsSelected] = useState<Array<string>>([])
  const [tags, setTags] = useState<Tag[]>([])

  const {getFilterRecipes}=useRecipesHomePaginated()
   
  const {getTags, allTags} = useTags()
  const handleTagsSelected = (value: string) => {
      const index = tagsSelected.indexOf(value);
      if (index !== -1) {
          tagsSelected.splice(index, 1);
        return
      }
      setTagsSelected([...tagsSelected, value.replace(' ', '')])
  }
  useEffect(() => {
      getTags()
  }, [])

  useEffect(() => {
      setTags(allTags)
  }, [allTags])

  
  const handleFilterRecipesTags =  async () => {
      const filterRecipes = await getFilterRecipes(tagsSelected)
      console.log('recipeees: ', filterRecipes)
      setModalVisible(false)
      return setRecipes(filterRecipes)
  }
  const handleAccept = () => {
    setIsError(false)
  }

  const getMoreRecipes = async () => {
    const moreRecipes = await getRecipes()
    setRecipes(moreRecipes)
  }
  useEffect(() => {
    setTitulo(isError && '¡Ups! Ha ocurrido un error')
    setDescripcion(isError && 'Intentá nuevamente más tared')
  }, [isError])



  const handleFilterRecipes = async (value: string) => {
    if(value) {
      if(value.length < 2) {
        const firsRecipes = await getFirstRecipes()
        return setRecipes(firsRecipes)
      }
      if(value.length > 2) {
        const recipes = await filterRecipesByParams(value, value, value)
        
        setRecipes(recipes)
      }
    }
  }

  useEffect(() => {
    const firstRecipes = async () => {
      const firsRecipes = await getFirstRecipes()
      return setRecipes(firsRecipes)
    }
    firstRecipes()
  }, [])
  useEffect(() => {
      const firstRecipes = async () => {
      if(tagsSelected.length === 0) {
        const firsRecipes = await getFirstRecipes()
        return setRecipes(firsRecipes)
      }
      }
      firstRecipes()
  }, [tagsSelected])
  
  return (
    <View style={
      screenHomeStyles.container
    }>
    <View style={
      screenHomeStyles.globalMargin
    }>
       <Link href='/tabs/ProfileScreen' style={screenHomeStyles.profileStyle}>
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
      <SearchInput setTagsSelected={setTagsSelected} tags={tags} tagsSelected={tagsSelected} handleFilterRecipesTags={handleFilterRecipesTags} handleTagsSelected={handleTagsSelected} modalVisible={modalVisible} setModalVisible={setModalVisible} handleFilterRecipes={handleFilterRecipes} />
     <FlatList
        showsVerticalScrollIndicator={false}
        data={recipes}
        numColumns={2}
        onEndReached={recipes && recipes.length > 14 && getMoreRecipes}
        onEndReachedThreshold={0.4}
        ListEmptyComponent={isFilterEmpty && <Text>No se encontraron elementos</Text>}
        ListFooterComponent={(isLoading && !isFilterEmpty) && <ActivityIndicator style={{height:100}}
        size={20}
        color="grey"
        />}
        renderItem={({ item }) =>
          <RecetaItem recetaKey={item.id_receta.toString()} recetaImagen={item.imagen} recetaNombre={item.nombre} recetaPuntaje={item.puntaje} recetaTitulo={item.titulo}/>
        }
      />
    </View>
    <CustomModal descripcion={descripcion} visible={isError} titulo={titulo} onAceptar={handleAccept} />
    </View>

  )
}

export default HomeScreen
