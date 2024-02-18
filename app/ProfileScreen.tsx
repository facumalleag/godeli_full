import React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../theme/ProfileStyle';
import useProfilePaginated from '../hooks/useProfilePaginated';
import { FadeInImage } from '../components/FadeImage';

//const icon = this.props.active


const ProfileScreen = () => {

    const {nombre,foto,email}=useProfilePaginated()
    
        return (
            <View>
                <View style={styles.globalMargin}>
                    {/* <Ionicons name="skull-outline" size={180} color="#129575" /> */}
                    <FadeInImage
                    //source={{uri: item.picture}}
                    uri={foto}
                    style={{
                        height: 160,
                        width: 150,
                    }}
                />
                </View>
                <View style={styles.form}>
                    <Text style={styles.titleName}>Nombre y Apellido</Text>
                    <TextInput
                        style={styles.textName
                        }
                        placeholder={nombre}//"blblblbl"
                        autoCapitalize='none'
                        autoCorrect={false}
                    />
                    <Text style={styles.titleName}>Email</Text>
                    <TextInput
                        style={styles.textName
                        }
                        placeholder={email}//'johndoe@mai.com'
                        autoCapitalize='none'
                        autoCorrect={false}
                    />
                </View>
                    <TouchableOpacity style={styles.btnGreen}>
                        <Text style={styles.textBtnGreen}>Cerrar sesión</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnRed}>
                        <Text style={styles.textBtnRed}>Dar de baja la cuenta</Text>
                    </TouchableOpacity>
            </View>
    
        )
    }
    
    export default ProfileScreen
    