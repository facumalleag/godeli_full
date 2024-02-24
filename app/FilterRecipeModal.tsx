import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Tags from './Tags'
import useRecipesHomePaginated from '../hooks/useRecipesHomePaginated'
import { Tag } from '../interfaces/FavoritesInterface'
import useTags from '../hooks/useTags'


const FilterRecipeModal = () => {
    const {getFilterRecipes}=useRecipesHomePaginated()

    const [focused1, setfocused1] = useState(false)
    const [focused2, setfocused2] = useState(false)
    const [focused3, setfocused3] = useState(false)
    const [focused4, setfocused4] = useState(false)
    const [focused5, setfocused5] = useState(false)
    const [tagsSelected, setTagsSelected] = useState<Array<string>>([])
    const [tags, setTags] = useState<Tag[]>([])

    const {getTags, allTags} = useTags()
 
   /*  useEffect((pressed) => {
        if (pressed){
            setColor("#129575");setTextColor('white')
        }else{
            setColor("white");setTextColor('#129575')
        }
    }, []) */

    const handleTagsSelected = (value: string) => {
        const index = tagsSelected.indexOf(value);
        if (index !== -1) {
            tagsSelected.splice(index, 1);
          return
        }
        setTagsSelected([...tagsSelected, value.replace(' ', '')])
    }

    useEffect(() => {
        getTags()
    }, [])

    useEffect(() => {
        setTags(allTags)
    }, [allTags])
    
    const handleFilterRecipes =  async () => {
        const stars = []
        await getFilterRecipes(tagsSelected)
        router.navigate("tabs/HomeScreen")
    }
    

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
                {tags.map((item, index) => <Tags handleTagsSelected={handleTagsSelected} key={index} item={item} />)}

            </View>
            <TouchableOpacity style={[styles.floatingButton, styles.saveButton]}
                onPress={() => handleFilterRecipes()}
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
        paddingTop: 60,
        backgroundColor: 'white',
        paddingHorizontal: 10
    },
    title: {
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: "bold",
        marginTop: 20
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
