import React, { useEffect, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { styles } from '../../theme/ProfileStyle';
import useProfilePaginated from '../../hooks/useProfilePaginated';
import { FadeInImage } from '../../components/FadeImage';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from "@react-native-google-signin/google-signin";
import { Link, router } from 'expo-router';
import * as SecureStore from 'expo-secure-store'
import LogOutModal from '../../components/LogOutModal';
import DeleteAccountModal from '../../components/DeleteAccountModal';
import CustomModal from '../../components/CustomModal';


const ProfileScreen = () => {

    //Necesito esto en LogOutModal
    const logout = async () => {
        console.log("Pressed logout");
        GoogleSignin.revokeAccess();
        GoogleSignin.signOut();
        // await SecureStore.deleteItemAsync('access_token');
        // await SecureStore.deleteItemAsync('refresh_token');
        router.replace('/Login');

    };
    const { nombre, foto, email, isError, setIsError } = useProfilePaginated();
    const [modalVisibleLogOut, setModalVisibleLogOut] = useState(false);
    const [modalVisibleDeleteAcc, setModalVisibleDeleteAcc] = useState(false);
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')

    const handleAccept = () => {
        setIsError(false)
    
      }
    
      useEffect(() => {
        setTitle(isError && "¡Ups! Ha ocurrido un error.")
        setDesc(isError && "Por favor, intentalo nuevamente más tarde.")
      }, [isError])

    const handleOpenLogOutModal = () => {
        setModalVisibleLogOut(true);
    };

    const handleCloseLogOutModal = () => {
        setModalVisibleLogOut(false);
    };

    const handleOpenDeleteAccModal = () => {
        setModalVisibleDeleteAcc(true);
    };

    const handleCloseDeleteAccModal = () => {
        setModalVisibleDeleteAcc(false);
    };

    return (
        <View style={{marginTop: 70, justifyContent: 'space-evenly', flex: 1}}>
            <View style={styles.globalMargin}>
                <FadeInImage
                    uri={foto}
                    style={{
                        height: 160,
                        width: 150,
                        borderRadius: 50,
                        marginBottom: 40,
                    }}
                />
            </View>
            <View style={styles.form}>
                <Text style={styles.titleName}>Nombre y Apellido</Text>
                <TextInput
                    style={styles.textName
                    }
                    placeholder={nombre}
                    autoCapitalize='none'
                    autoCorrect={false}
                />
                <Text style={styles.titleName}>Email</Text>
                <TextInput
                    style={styles.textName
                    }
                    placeholder={email}
                    autoCapitalize='none'
                    autoCorrect={false}
                />
            </View>

            <View>
                <TouchableOpacity style={styles.btnGreen} onPress={handleOpenLogOutModal}>
                        <Text style={styles.textBtnGreen}>Cerrar sesión</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnRed} onPress={handleOpenDeleteAccModal}>
                    <Text style={styles.textBtnRed}>Dar de baja la cuenta</Text>
                </TouchableOpacity>
            </View>
            <LogOutModal logout={logout} modalVisible={modalVisibleLogOut} onClose={handleCloseLogOutModal}></LogOutModal>
            <DeleteAccountModal modalVisible={modalVisibleDeleteAcc} onClose={handleCloseDeleteAccModal}></DeleteAccountModal>
            <CustomModal descripcion={desc} onAceptar={handleAccept} titulo={title} visible={isError} />
        </View>
    )
}

export default ProfileScreen;
