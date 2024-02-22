import React from 'react';
import { Modal, View, Text, Button, TouchableOpacity, TextInput, StyleSheet } from 'react-native';


interface DeleteAccountModalProps {
  modalVisible: boolean;
  onClose: () => void;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  modalVisible,
  onClose
}) => {
    const handleDeleteAccount = () => {
        
    }
    return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text>Eliminar cuenta</Text>
                <Text>Al eliminar la cuenta perderás toda la información</Text>
                <View style={styles.buttons}>
                    <Button title="Eliminar" onPress={handleDeleteAccount} color="#951A12"></Button>
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
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        borderRadius: 20
    },
});

export default DeleteAccountModal;