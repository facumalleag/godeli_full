import React from 'react'
import { Alert, Dimensions, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { FadeInImage } from '../components/FadeImage';
import { Link, router } from 'expo-router';
const window_width = Dimensions.get('window').width

interface Props {
    recetaKey: string,
    recetaTitulo: string,
    recetaPuntaje:string,
    recetaNombre:string,
    recetaImagen:string,
}

const RecetaItem = (props: Props) => {
    //const { nombre, email, foto}=useProfilePaginated()
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={()=>router.push({
               pathname: "/tabs/RecipeScreen",
                params: {  id: props.recetaKey, nombre:props.recetaNombre  }
            })}
        >
            <View style={{
                marginHorizontal: 5,
                height: 200,
                marginBottom: 25,
                width: window_width * 0.43
            }}>
                <ImageBackground 
                    imageStyle={{ borderRadius: 20, resizeMode: 'cover'}} 
                    style={{
                        width: '100%', 
                        height: '100%', 
                        borderRadius: 20,
                        paddingHorizontal: 3,
                    }} 
                        source={{uri: props.recetaImagen}}>
                    <View style={{justifyContent: 'center', marginTop: 110}}>
                        <Text style={{
                            color: 'white',
                            fontSize: 16,
                            fontWeight: 'bold',
                            left: 5,
                        }}>
                            {props.recetaTitulo.length > 40 ? props.recetaTitulo.slice(0, 40)+ '...' : props.recetaTitulo}
                            {/* //precio */}
                        </Text>
                        <View style={{width: '100%', marginTop: 20}}>
                            <Text style={{
                                color: 'white',
                                fontSize: 12,
                                left: 5,
                            }}>
                                {props.recetaNombre}
                            </Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </TouchableOpacity>

    )
}

export default RecetaItem
