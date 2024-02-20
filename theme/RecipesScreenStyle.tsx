import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    ingre_tit:{
      fontWeight: "bold",
      color:'#121212',
      marginHorizontal:15,
    },
    ingre_unid:{
      color:'#A9A9A9'
    },
    ingred:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
      backgroundColor: '#D9D9D9',
      borderRadius: 12,
      height: 40,
      width: 345,
      marginBottom: 5,
   },
  
    txtporciones:{
      color:'#A9A9A9',
  
  
    },
    porciones:{
      marginHorizontal:20,
    },
    containerName: {
      marginTop: 10
    },
    valores: {
      flexDirection: 'row',
      marginBottom:5,
      alignItems:"center",
    },
    styleValues: {
      color: "#3B5059",
      marginHorizontal: 30,
      marginBottom:5
    },
    containertime: {
      position: 'absolute',
      alignSelf: 'flex-end',
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
    },
    procedimiento:{
      backgroundColor: '#D9D9D9',
      //marginTop:15,
      //padding: 8,
      borderRadius:20,
    },
    container: {
        flex:4,
      backgroundColor: '#ecf0f1',
      padding: 10,
    },
    carrousel: {
      marginTop: 20,
      marginBottom: 5,
    },
    videoInput: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'relative',
    },
    videoIcon: {
        marginEnd:10,
    },
    options: {
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 30,
      alignItems: 'center',
      backgroundColor: '#129575',
    },
    floatingButton: {
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginHorizontal: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#129575',
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
    },
    buttonTextProced: {
      color: '#129575',
      fontSize: 16,
    },
    optionsProceed:{
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginHorizontal: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#71B1A1',//71B1A1  129575
      borderColor:'#129575'
    }
  });