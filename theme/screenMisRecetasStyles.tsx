import { StyleSheet } from "react-native";

export const  screenMisRecetasStyles = StyleSheet.create({
    globalMargin:{
        marginHorizontal:20,
        marginTop:40,
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
    },
    addText:{
        alignSelf:"center",
        color:'#129575',
        fontSize:30,
    }

});