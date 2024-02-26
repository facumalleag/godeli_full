import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Tags from '../components/Tags'

const FilterRecipeModal = ({handlePress, tags, tagsSelected, handleTagsSelected, setTagsSelected}) => {

    const listTab = [
        {
            puntuacion: '1'
        },
        {
            puntuacion:'2'
        },
        {
            puntuacion:'3'
        },
        {
            puntuacion:'4'
        },
        {
            puntuacion:'5'
        }
    ]

  /*    const [datafiltered, setdatafiltered] = useState([])

   const  setPuntuacionFilter=(e) =>{
    console.log("entreee")
    const data=simpleRecipesList
    setrankingSeleccionado({
        ...rankingSeleccionado,
        [e.puntuacion]:true
   } );
   console.log(e.puntuacion)
   if(e.puntuacion){
        const resultadoRanking=data.filter((item)=>{
            item.puntaje===e.id
            setdatafiltered([
                ...datafiltered,resultadoRanking
            ])
            console.log(datafiltered)
        })
   }
   }  */


    ////recipes?limit=10&puntaje=5&tags=1,2,3&title=pollo

    return ( /* /recipes?limit=10&puntaje=5 */
        <View style={styles.container}>
            <Text style={styles.title}>Filtros de búsqueda</Text>
            <Text style={styles.puntuacion}>Puntuación</Text>
            <View style={{ flexDirection: 'row' }}>
                {/* {
                    listTab.map(e=>(
                       <Stars handleStarsSelected={handleStarsSelected} puntuacion={e.puntuacion} />
                    ))
                } */}

              {/* 
                <Ionicons name={focused1 ? "star" : "star-outline"} size={20} color="#129575" style={styles.star}
                onPress={() => {
                    setfocused1(!focused1),
                    <input onChange={handleCheck}
                    type='checkbox'
                    name='puntaje'
                    value='1'
                    id='1'
                    
                    />
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
                }}> 5</Ionicons> */}
            </View>
            <Text style={styles.tags}>Tags</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {tags.map((item, index) => <Tags isSelected={tagsSelected.includes(item.id.toString())} handleTagsSelected={handleTagsSelected} key={index} item={item} />)}

            </View>
            <TouchableOpacity style={[styles.floatingButton, styles.saveButton]}
                onPress={() => handlePress()}
            >
                <Text style={styles.buttonText}>Filtrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.floatingButton, styles.saveButton]}
                onPress={() => setTagsSelected([])}
            >
                <Text style={styles.buttonText}>Limpiar Filtros</Text>
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
