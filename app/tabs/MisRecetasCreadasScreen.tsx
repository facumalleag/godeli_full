import React, { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import useMisRecetasPaginated from '../../hooks/useMisRecetasPaginated';
import { guardadoStyle } from '../../theme/RecetasGuardadasStyle';
import RecetaItem from '../RecetaItem';
import { screenMisRecetasStyles } from '../../theme/screenMisRecetasStyles';
import CustomModal from '../../components/CustomModal';




const MisRecetasCreadasScreen = () => {

  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  const { simpleMisRecetasList, getMisRecetas, isError, setIsError } = useMisRecetasPaginated()
  //const { simpleFavoriteList, getFavorites } = useFavoritesPaginated()

  const handleAccept = () => {
    setIsError(false)

  }

  useEffect(() => {
    setTitle(isError && "¡Ups! Ha ocurrido un error.")
    setDesc(isError && "Por favor, intentalo nuevamente más tarde.")
  }, [isError])

  return (
    <View
      style={
        [guardadoStyle.container, {marginTop: 40}]}>
      <View style={{
         marginHorizontal:20,
         marginTop:40,
         marginBottom:25,
         flex: 1
      }
      }>
        <View style={{flexDirection:'row',marginBottom: 10}}>
          <Link href='/tabs/HomeScreen' asChild>
          <Ionicons name="arrow-back-circle-outline" onPress={() => router.navigate('/tabs/HomeScreen')} size={45} color="#A9A9A9" style={{ marginRight: 20}} />
          </Link>
          <Text style={guardadoStyle.title}>Mis Recetas</Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={simpleMisRecetasList}//{}simpleFavoriteList
          keyExtractor={(receta) => receta.id_receta.toString()}
          numColumns={2}
          // contentContainerStyle={{flex: 1}}
          // onEndReached={getMisRecetas}
          onEndReachedThreshold={0.4}
          renderItem={({ item }) =>
            <RecetaItem editable recetaKey={item.id_receta.toString()} recetaImagen={item.imagen} recetaNombre={item.nombre} recetaPuntaje={item.puntaje} recetaTitulo={item.titulo} />
          }
        />
        <View style={{ flexDirection: 'column' }}>
          <Link href='/RecipeScreenEdit' style={screenMisRecetasStyles.addIcon} >
            <Ionicons name='add-circle' size={70} color="#129575"
            />
          </Link>
         
        </View>
      </View>
      <CustomModal descripcion={desc} onAceptar={handleAccept} titulo={title} visible={isError} />
    </View>
  )
}

export default MisRecetasCreadasScreen