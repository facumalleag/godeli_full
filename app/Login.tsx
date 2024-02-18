import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Image, Text, StyleSheet  } from 'react-native';
import NetworkController from '../controller/NetworkController';
import { styles } from '../theme/LandingStyle';
import InternetAlert from '../components/InternetAlert';
import { Link } from 'expo-router';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId:
      "441344649242-h0sfbuk4m7al7lr5o0i69s3rvnt9j74m.apps.googleusercontent.com",
    androidClientId:
      "441344649242-vbs53htmmmpd9sqs46nmtrt1qujfp0nq.apps.googleusercontent.com",
    iosClientId:
      "441344649242-ie1h43u7hl6b9676vhetiom8qninilsr.apps.googleusercontent.com",
  });
};


export default function Login() {
    const [error, setError] = useState(null);
    const [userInfo, setUserInfo] = useState();

    useEffect(() => {
      configureGoogleSignIn();
    });

    const signIn = async () => {
      console.log("Pressed sign in");

      const saveSecureValue = async (key, value) => {
        await SecureStore.setItemAsync(key, value);
      };
    
      const retrieveSecureValue = async (key) => {
        let result = await SecureStore.getItemAsync(key);
      };
    
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        setUserInfo(userInfo);

        const response = await axios.post("http://godeli.mooo.com:3000/api/v1/auth/login", {
          id_google: userInfo.user.id,
          nombre: userInfo.user.name,
          correo_electronico: userInfo.user.email,
          url_imagen_perfil: userInfo.user.photo,
        });

        if (response.status === 200) {
          console.log('Login successful');
          // navigation.navigate('TabNavigator')
          console.log(response.data.access_token);

          await SecureStore.setItemAsync('access_token', response.data.access_token);
          await SecureStore.setItemAsync('refresh_token', response.data.refresh_token);
        } else {
          console.error(`Login failed with status code`);
        }

        setError(null);
      } catch (e) {
        setError(e);
      }
    };

    useEffect(() => {
    const checkConnection =  async () => {
      const isConnected = await NetworkController.checkInternetConnection();
      const type = await NetworkController.checkInternetConnection();
      if (!isConnected) {
        console.log('Sin internet'),
        <InternetAlert titulo='Sin conexión a internet' texto='Comprueba tu conexión a Wi-Fi o datos móviles' />
      } else {
        if (type!.includes("CELLULAR")) {
          console.log('redes moviles'),
          <InternetAlert titulo='Conexión a Internet establecida' texto='Conectado a redes móviles' />
        } else {
          console.log('WIFI'),
          <InternetAlert titulo='Conexión a Internet establecida' texto='Conectado Wi-Fi' />
        }

      }
    };

    checkConnection();
  },[]);


  return (
    <View style={stylesLogin.container}>
      <ImageBackground source={require('../assets/background.png')} resizeMode="cover" style={stylesLogin.image} >
        <View style={stylesLogin.containerBody}>
          <View style={styles.logoContainer}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
          </View>
          <View style={{ alignSelf: 'center', marginRight: 40 }}>
            <Text style={styles.greetingText}>Hola,</Text>
            <Text style={styles.welcomeText}>Genial verte de nuevo!</Text>
          </View>
          <View style={stylesLogin.buttonGoogle}>
              <GoogleSigninButton
              size={GoogleSigninButton.Size.Standard}
              color={GoogleSigninButton.Color.Dark}
              onPress={signIn}
              />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const stylesLogin = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerBody: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    paddingBottom: 100
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonGoogle: {
    alignSelf: 'center',
    marginTop: 100,
  },
});