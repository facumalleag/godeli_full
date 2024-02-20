import { Dimensions, StyleSheet } from "react-native";

const window_width = Dimensions.get('window').width
const window_height = Dimensions.get('window').height

export const  screenMisRecetasStyles = StyleSheet.create({
    container:{
        width:window_width,
        height:window_height,
        backgroundColor:'white',
    },
    globalMargin:{
        marginHorizontal:20,
        marginTop:20
    },
    title:{
        color:'#129575',
        fontSize:30,
       // fontWeight: "bold",
        alignSelf:"flex-start",
        marginTop:-40
    },
    subtitle:{
        color:'#A9A9A9',
        fontSize:18,
        paddingBottom:15
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
    addIcon:{
        alignSelf:"center",
        marginBottom:15
    },
    addText:{
        alignSelf:"center",
        color:'#129575',
        fontSize:30,
    }

});