import { Dimensions, StyleSheet } from 'react-native';

const window_width = Dimensions.get('window').width
const window_height = Dimensions.get('window').height

export const styles = StyleSheet.create({
    container: {
      flexDirection:'column',
    },

    backgroundImage: {
      width: window_width,
      height: window_height,
    },
    logoContainer: {
      marginTop:30,
      alignItems: 'center',
    },
    logo: {
      width: 250,
      height: 250,
    },
    greetingText: {
      justifyContent: 'center',
      fontWeight:'500',
      color: '#129575',
      fontSize: 30,
    },
    welcomeText: {
      color:'white',
      fontSize: 22,
      marginBottom:70
    },    
    googleButton: {
      alignSelf:'center',
      backgroundColor: 'white',
      width: 300,
      height: 50,
      borderRadius: 20,
      textAlign:'center',
      fontSize: 16,
    },
    buttonText: {
     alignSelf:'center',
     marginHorizontal:50,
      color: 'black',
      fontSize: 16,
    },
  });