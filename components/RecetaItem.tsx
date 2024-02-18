import React from 'react'
import { Alert, Dimensions, Text, TouchableOpacity, View } from "react-native";
//import Icon from 'react-native-vector-icons/Ionicons'
import { FadeInImage } from './FadeImage';

const window_width = Dimensions.get('window').width

interface Props {
    recetaKey: string,
    recetaDesc: string,
}


const RecetaItem = ({ recetaDesc, recetaKey }: Props) => {

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

                <TouchableOpacity
                    style={{
                        borderRadius: 80,
                        backgroundColor: '#1F4068',
                        height: 30,
                        width: 30,
                        alignItems: 'center',
                        position: 'relative',
                        top: 4,
                        right: -140
                    }}
                    onPress={() => {
                        Alert.alert('button pressed')
                    }}
                >
                    {/*  <Icon name='close-outline' size={23} color='white' /> */}

                </TouchableOpacity>

                <View>
                    <Text style={{
                        color: '#1F4068',
                        fontSize: 10,
                        fontWeight: 'bold',
                        bottom: -120,
                        left: 5
                    }}>
                        {recetaKey} {/* //Direccion */}
                        {'\n#' + recetaDesc} {/* //precio */}
                        DATOS DATOS
                    </Text>
                </View>

                <FadeInImage
                    //source={{uri: item.picture}}
                    uri={'assets/favicon.png'}
                    style={{
                        height: 160,
                        width: 150,
                        position: 'absolute',
                    }}
                />

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
