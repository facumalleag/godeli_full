import React from 'react';
import { Modal, View, Text, Button, TouchableOpacity, TextInput, StyleSheet, Pressable } from 'react-native';


interface LogOutModalProps {
  modalVisible: boolean;
  onClose: () => void;
  logout: () => void
}

const LogOutModal: React.FC<LogOutModalProps> = ({
  modalVisible,
  onClose,
  logout
}) => {
    return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={styles.title}>Cerrar sesión</Text>
                <Text style={styles.text}>¿Desea cerrar sesión?</Text>
                <View style={styles.buttons}>
                    <Pressable onPress={() => logout()} style={styles.buttonAccept}>
                        <Text style={styles.buttonText}>Cerrar sesión</Text>
                    </Pressable>
                    <Pressable onPress={() => onClose()} style={styles.buttonCancel}> 
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </Pressable>
    
                </View>
            </View>
        </View>
    </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContent: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        width: '70%',
        height: '30%'
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 20,
    },
    buttons: {
        justifyContent: 'space-around',
        marginTop: 30,
        borderRadius: 20,
        height: '40%',
        alignItems: 'center'
    },
    text: {
        color: 'black',
        textAlign: 'center'
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        
    },
    buttonAccept: {
        padding: 10,
        backgroundColor: '#129575',
        width: '50%',
        borderRadius: 10,
    },
    buttonCancel: {
        padding: 10,
        backgroundColor: '#9D9D9D',
        width: '50%',
        borderRadius: 10,
    }
});

export default LogOutModal;