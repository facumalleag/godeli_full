import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const FilterRecipeModal = () => {

    const [focused1, setfocused1] = useState(false)
    const [focused2, setfocused2] = useState(false)
    const [focused3, setfocused3] = useState(false)
    const [focused4, setfocused4] = useState(false)
    const [focused5, setfocused5] = useState(false)

    const [color,setColor]=useState('white');
    const [textColor,setTextColor]=useState('#129575');

    const selected=false
    const seleccionar =(selected)=>{
        if (selected){
            setColor("#129575");setTextColor('white')
            selected=false
        }else{
            setColor("white");setTextColor('#129575')
            selected=true
        }
        
    }


   /*  useEffect((pressed) => {
        if (pressed){
            setColor("#129575");setTextColor('white')
        }else{
            setColor("white");setTextColor('#129575')
        }
    }, []) */
    

    return ( /* /recipes?limit=10&puntaje=5 */
        <View style={styles.container}>
            <Text style={styles.title}>Filtros de búsqueda</Text>
            <Text style={styles.puntuacion}>Puntuación</Text>
            <View style={{ flexDirection: 'row' }}>
                <Ionicons name={focused1 ? "star" : "star-outline"} size={20} color="#129575" style={styles.star} onPress={() => {
                    setfocused1(!focused1),
                    router.navigate("tabs/HomeScreen")
                }}> 1</Ionicons>
                <Ionicons name={focused2 ? "star" : "star-outline"} size={20} color="#129575" style={styles.star} onPress={() => {
                    setfocused2(!focused2)
                }}
                > 2</Ionicons>
                <Ionicons name={focused3 ? "star" : "star-outline"} size={20} color="#129575" style={styles.star} onPress={() => {
                    setfocused3(!focused3)
                }}> 3</Ionicons>
                <Ionicons name={focused4 ? "star" : "star-outline"} size={20} color="#129575" style={styles.star} onPress={() => {
                    setfocused4(!focused4)
                }}> 4</Ionicons>
                <Ionicons name={focused5 ? "star" : "star-outline"} size={20} color="#129575" style={styles.star} onPress={() => {
                    setfocused5(!focused5)
                }}> 5</Ionicons>
            </View>
            <Text style={styles.tags}>Tags</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <Text style={{...styles.tagValues,backgroundColor:color,color:textColor}} 
                    onPress={()=>{
                        seleccionar(!selected)
                    }}
                >Rápida preparación</Text>
                <Text style={styles.tagValues}>Vegetariana</Text>
                <Text style={styles.tagValues}>Vegana</Text>
                <Text style={styles.tagValues}>Sistema inmune</Text>
                <Text style={styles.tagValues}>Apto celíaco</Text>
                <Text style={styles.tagValues}>Antiinflamatoria</Text>
                <Text style={styles.tagValues}>Flora intestinal</Text>
                <Text style={styles.tagValues}>Baja en sodio</Text>
                <Text style={styles.tagValues}>Baja carbohidratos</Text>

            </View>
            <TouchableOpacity style={[styles.floatingButton, styles.saveButton]}
                onPress={() => router.navigate("tabs/HomeScreen")}
            >
                <Text style={styles.buttonText}>Filtrar</Text>
            </TouchableOpacity>
        </View>
    )
}

export default FilterRecipeModal

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        marginTop: 30,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: "bold",
        marginBottom: 20
    },
    puntuacion: {
        fontSize: 20,
        marginLeft: 20,
        alignSelf: 'flex-start',
        fontWeight: "bold",
        marginBottom: 20
    },
    tags: {
        fontSize: 20,
        marginLeft: 20,
        alignSelf: 'flex-start',
        fontWeight: "bold",
        marginBottom: 20
    },
    floatingButton: {
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,

    },
    saveButton: {
        backgroundColor: '#129575',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    star: {
        borderWidth: 2,
        borderColor: '#129575',
        borderRadius: 15,
        paddingVertical: 6,
        paddingHorizontal: 12,
        marginHorizontal: 5,
        marginBottom: 15,
    },
    tagValues: {
        color: '#129575',
        borderColor: '#129575',
        fontSize: 15,
        borderWidth: 2,
        borderRadius: 20,
        paddingVertical: 7,
        paddingHorizontal: 7,
        marginBottom: 5,
        marginLeft: 5,
    }

})
