import { MaterialCommunityIcons, FontAwesome6, Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import { screenMisRecetasStyles } from '../../theme/screenMisRecetasStyles'
import { Link } from 'expo-router'


const onButtonPress = () => {
  Alert.alert('button pressed')
}

const MisRecetasScreen = (props: any) => {
  return (
    <View style={
      screenMisRecetasStyles.globalMargin
    }>
      <Link href='/ProfileScreen' style={screenMisRecetasStyles.profileStyle}>
      <MaterialCommunityIcons name="face-man-profile" size={50} color="#FFCE80"  />
      </Link>
      <Text style={screenMisRecetasStyles.title}>No tenés recetas</Text>
      <View style={screenMisRecetasStyles.iconContainer}>
        <FontAwesome6 name="face-meh" size={100} color="#129575" style={screenMisRecetasStyles.icon}  />
      </View>
      <Text style={screenMisRecetasStyles.addText}>Creá la tuya:</Text>
      <Link href='/AgregarRecetaScreen'  style={screenMisRecetasStyles.addIcon} >
        <Ionicons name='add-circle' size={70} color="#129575"
        />
      </Link>
    </View>
  )
}

export default MisRecetasScreen
