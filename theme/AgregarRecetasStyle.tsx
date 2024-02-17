import { StyleSheet } from "react-native";

export const  agregarRecetaStyle = StyleSheet.create({
    globalMargin:{
        marginHorizontal:20,
        marginTop:40,
    },
    title:{
        color:'black',
        fontSize:30,
        marginTop:10,
        fontWeight: "bold",
    },
    icon:{
        alignSelf:"center",
    },
    addFoto:{
        backgroundColor:'#d3d3d3',
        marginTop:10,
        width: 380, 
        height: 150,
        alignSelf:"center"
    },
    iconContainer:{
        flexDirection:"column",
        marginVertical:160
    },

});