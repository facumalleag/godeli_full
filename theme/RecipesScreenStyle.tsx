import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    ingre_tit:{
      fontWeight: "bold",
      color:'#121212',
      marginLeft:15,
    },
    ingre_unid:{
      color:'rgba(0,0,0, 0.5)',
      marginRight:15,
    },
    ingred:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 5,
      backgroundColor: '#D9D9D9',
      borderRadius: 12,
      height: 40,
      width: '100%',
      marginBottom: 5,
   },
  
    txtporciones:{
      color:'#A9A9A9',
  
  
    },
    porciones:{
      marginHorizontal:20,
    },
    containerName: {
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center'
    },
    valores: {
      flexDirection: 'row',
      marginVertical: 6,
      alignItems:"center",
      justifyContent: 'space-between',
    },
    styleValues: {
      color: "rgba(0,0,0,0.5)",
      marginBottom:5
    },
    containertime: {
      position: 'absolute',
      alignSelf: 'flex-end',
    },
    title: {
      fontSize: 28,
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