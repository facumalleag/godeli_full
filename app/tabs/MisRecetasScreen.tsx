import { FontAwesome6, Ionicons } from '@expo/vector-icons'
import React from 'react'
import {  Text, View } from 'react-native'
import { screenMisRecetasStyles } from '../../theme/screenMisRecetasStyles'
import { Link, Redirect } from 'expo-router'
import useProfilePaginated from '../../hooks/useProfilePaginated'
import { FadeInImage } from '../../components/FadeImage'
import useMisRecetasPaginated from '../../hooks/useMisRecetasPaginated'

const MisRecetasScreen = () => {
  const { foto } = useProfilePaginated()
  const { simpleMisRecetasList } = useMisRecetasPaginated()
console.log(simpleMisRecetasList)

  return (
    simpleMisRecetasList.length==0?
    (
    <View style={
      screenMisRecetasStyles.container
    }>
    <View style={
      screenMisRecetasStyles.globalMargin
    }>
      <Link href='/ProfileScreen' style={screenMisRecetasStyles.profileStyle}>
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
      <Redirect href='/MisRecetasCreadasScreen'/>
    )
  )
}

export default MisRecetasScreen
