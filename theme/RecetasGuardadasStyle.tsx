import { Dimensions, StyleSheet } from "react-native";

const window_width = Dimensions.get('window').width
const window_height = Dimensions.get('window').height

export const  guardadoStyle = StyleSheet.create({
    container:{
        backgroundColor:'white',
        width:window_width,
        height:window_height
        },
    globalMargin:{
        marginHorizontal:20,
        marginTop:40,
        marginBottom:65,
    },
    title:{
        color:'#129575',
        fontSize:30,
       fontWeight: "bold",
        alignSelf:"flex-start",
        marginTop:-40,
        marginBottom:20,
    },
    profileStyle:{
        alignSelf:"flex-end"
    },
    icon:{
        alignSelf:"center",

    },
    iconContainer:{
        flexDirection:"column",
        marginVertical:160
    },

});