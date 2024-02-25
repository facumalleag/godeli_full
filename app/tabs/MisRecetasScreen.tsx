import { FontAwesome6, Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import {  Text, View } from 'react-native'
import { screenMisRecetasStyles } from '../../theme/screenMisRecetasStyles'
import { Link, Redirect } from 'expo-router'
import useProfilePaginated from '../../hooks/useProfilePaginated'
import { FadeInImage } from '../../components/FadeImage'
import useMisRecetasPaginated from '../../hooks/useMisRecetasPaginated'
import CustomModal from '../../components/CustomModal'

const MisRecetasScreen = () => {
  
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  const { foto } = useProfilePaginated()
  const { simpleMisRecetasList, getMisRecetas, isError, setIsError } = useMisRecetasPaginated()
  useEffect(() => {
    getMisRecetas()
  }, [])

  const handleAccept = () => {
    setIsError(false)

  }

  useEffect(() => {
    setTitle(isError && "¡Ups! Ha ocurrido un error.")
    setDesc(isError && "Por favor, intentalo nuevamente más tarde.")
  }, [isError])

  return (
    <>
    {simpleMisRecetasList.length === 0 ?
    (
    <View style={
      screenMisRecetasStyles.container
    }>
    <View style={
      screenMisRecetasStyles.globalMargin
    }>
      <Link href='/tabs/ProfileScreen' style={screenMisRecetasStyles.profileStyle}>
        <FadeInImage
          uri={foto}
          style={{
            height: 50,
            width: 50,
            borderRadius:55
          }}
        />
      </Link>
      <Text style={screenMisRecetasStyles.title}>No tenés recetas</Text>
      <View style={screenMisRecetasStyles.iconContainer}>
        <FontAwesome6 name="face-meh" size={100} color="#129575" style={screenMisRecetasStyles.icon}  />
      </View>
      <Text style={screenMisRecetasStyles.addText}>Creá la tuya:</Text>
      <Link href='/RecipeScreenEdit'  style={screenMisRecetasStyles.addIcon} >
        <Ionicons name='add-circle' size={70} color="#129575"
        />
      </Link>
    </View>
    </View>
    )
    :
    (
      <Redirect href='/tabs/MisRecetasCreadasScreen'/>
    )}
    <CustomModal descripcion={desc} onAceptar={handleAccept} titulo={title} visible={isError} />
    </>
  )
}

export default MisRecetasScreen
