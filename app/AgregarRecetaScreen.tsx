import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, Image, Text, TextInput, View } from "react-native";
import { agregarRecetaStyle } from "../theme/AgregarRecetasStyle";
import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
import * as ImagePicker from "expo-image-picker";

const AgregarRecetaScreen = () => {
  const [hasCameraPermission, sethasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  //const [type, setType] = useState(Camera.Constants.Type.back)
  //const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)

  const camaraRef = useRef(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={agregarRecetaStyle.globalMargin}>
      {/* <MaterialCommunityIcons name="face-man-profile" size={50} color="#FFCE80" style={agregarRecetaStyle.profileStyle} onPress={() => navigation.navigate('ProfileScreen')} /> */}
      {/*         <Image source={require('../assets/favicon.png')}  style={{width: 300, height: 150, alignSelf:'center'}}/>  */}
      <View style={agregarRecetaStyle.addFoto}>
        <Ionicons name="images-outline" size={90} style={{ alignSelf: "center", marginTop: 25 }} onPress={() => {}} />
      </View>
      <TextInput style={agregarRecetaStyle.title} placeholder="Agrega un Título" autoCapitalize="none" autoCorrect={false} />
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
};

export default AgregarRecetaScreen;
