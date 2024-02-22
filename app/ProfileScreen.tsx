import React, { useEffect, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { styles } from '../theme/ProfileStyle';
import useProfilePaginated from '../hooks/useProfilePaginated';
import { FadeInImage } from '../components/FadeImage';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from "@react-native-google-signin/google-signin";
import { Link, router } from 'expo-router';
import * as SecureStore from 'expo-secure-store'
import LogOutModal from '../components/LogOutModal';
import DeleteAccountModal from '../components/DeleteAccountModal';


const ProfileScreen = () => {

    //Necesito esto en LogOutModal
    const logout = async () => {
        console.log("Pressed logout");
        GoogleSignin.revokeAccess();
        GoogleSignin.signOut();
        await SecureStore.deleteItemAsync('access_token');
        await SecureStore.deleteItemAsync('refresh_token');
        router.replace('/Login');

    };
    const { nombre, foto, email } = useProfilePaginated();
    const [modalVisibleLogOut, setModalVisibleLogOut] = useState(false);
    const [modalVisibleDeleteAcc, setModalVisibleDeleteAcc] = useState(false);

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
        <View>
            <View style={styles.globalMargin}>
                <FadeInImage
                    uri={foto}
                    style={{
                        height: 160,
                        width: 150,
                        borderRadius: 50
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

            <TouchableOpacity style={styles.btnGreen} onPress={handleOpenLogOutModal}>
                    <Text style={styles.textBtnGreen}>Cerrar sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnRed} onPress={handleOpenDeleteAccModal}>
                <Text style={styles.textBtnRed}>Dar de baja la cuenta</Text>
            </TouchableOpacity>
            <LogOutModal modalVisible={modalVisibleLogOut} onClose={handleCloseLogOutModal}></LogOutModal>
            <DeleteAccountModal modalVisible={modalVisibleDeleteAcc} onClose={handleCloseDeleteAccModal}></DeleteAccountModal>
        </View>
    )
}

export default ProfileScreen;
