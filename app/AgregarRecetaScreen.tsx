import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, Text, TextInput, View } from 'react-native';
import { agregarRecetaStyle } from '../theme/AgregarRecetasStyle';
import { Ionicons } from '@expo/vector-icons';
import {Camera, CameraType} from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import { useRef } from 'react';


const AgregarRecetaScreen = () => {
    const [hasCameraPermission, sethasCameraPermission] = useState(null)
    const [image, setImage] = useState(null)
    //const [type, setType] = useState(Camera.Constants.Type.back)
    //const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)

    const camaraRef=useRef(null)






  return (
    <View style={agregarRecetaStyle.globalMargin}>
      {/* <MaterialCommunityIcons name="face-man-profile" size={50} color="#FFCE80" style={agregarRecetaStyle.profileStyle} onPress={() => navigation.navigate('ProfileScreen')} /> */}
{/*         <Image source={require('../assets/favicon.png')}  style={{width: 300, height: 150, alignSelf:'center'}}/>  */} 
       <View style={agregarRecetaStyle.addFoto}>
       <Ionicons name="images-outline" size={90} style={{ alignSelf:'center', marginTop:25}} onPress={()=>{}}/>
       </View>
        <TextInput style={agregarRecetaStyle.title}
        placeholder='Agrega un Título'
        autoCapitalize='none'
        autoCorrect={false}
        />


      </View>
  )
}

export default AgregarRecetaScreen
