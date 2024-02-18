import React from 'react'
import { Alert, Dimensions, Text, TouchableOpacity, View } from "react-native";
import { FadeInImage } from './FadeImage';

const window_width = Dimensions.get('window').width

interface Props {
    recetaKey: string,
    recetaTitulo: string,
    recetaPuntaje:string,
    recetaNombre:string,
    recetaImagen:string,
}


const RecetaItem = (props: Props) => {

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => { }}
        >
            <View style={{
                marginHorizontal: 5,
                backgroundColor: '#EAEAEA',
                height: 200,
                marginBottom: 25,
                borderRadius: 30,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.29,
                shadowRadius: 4.65,
                elevation: 7,
                width: window_width * 0.43
            }}>
                                
                <FadeInImage
                    //source={{uri: props.recetaImagen}}
                    uri={props.recetaImagen}
                    style={{
                        marginTop:5,
                        height: 190,
                        width: 160,
                        alignSelf:'center',
                        borderRadius:40,
                        position: 'absolute',
                    }}
                />
                <View>
                    <Text style={{
                        color: 'white',
                        fontSize: 12,
                        fontWeight: 'bold',
                        bottom: -120,
                        left: 5
                    }}>
                        {props.recetaTitulo}
                        {'\n#' + props.recetaNombre} {/* //Direccion */}
                         {/* //precio */}
                    </Text>
                </View>
                <TouchableOpacity
                    style={{
                        borderRadius: 80,
                        backgroundColor: '#1F4068',
                        height: 30,
                        width: 30,
                        position: 'relative',
                        top: -20,
                        right: -130
                    }}
                    onPress={() => {
                        Alert.alert('button pressed')
                    }}
                >
                    {/*  <Icon name='close-outline' size={23} color='white' /> */}

                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        borderRadius: 80,
                        backgroundColor: '#B5CC2B',
                        height: 30,
                        width: 30,
                        top: -50,
                        left: 5,
                        alignItems: 'center'
                    }}
                    onPress={() => {
                        Alert.alert('button pressed')
                        console.log('Boton')
                    }}
                >
                    {/*  <Icon name='hammer-outline' size={23} color='white' /> */}
                </TouchableOpacity>

            </View>
        </TouchableOpacity>
    )
}

export default RecetaItem
