import React from 'react';
import { Modal, View, Text, Button, TouchableOpacity, TextInput, StyleSheet } from 'react-native';


interface LogOutModalProps {
  modalVisible: boolean;
  onClose: () => void;
}

const LogOutModal: React.FC<LogOutModalProps> = ({
  modalVisible,
  onClose
}) => {
    const handleLogOut = () => {

    }
    return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={styles.title}>¿Desea cerrar sesión?</Text>
                <View style={styles.buttons}>
                    <Button title="Cerrar sesión" onPress={handleLogOut} color="#129575"></Button>
                    <Button title="Cancelar" onPress={onClose} color="#9D9D9D"></Button>
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
        backgroundColor: 'rgba(0, 0, 0.5)'
    },
    modalContent: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        width: '80%'
    },
    title: {
        textAlign: 'center',
        fontSize: 20
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        borderRadius: 20
    },
});

export default LogOutModal;