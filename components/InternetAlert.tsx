import React, { FC, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import NetworkController from '../controller/NetworkController';

export interface ModalProps {
    titulo: string,
    texto: string;
}


const InternetAlert: FC<ModalProps> = ({ texto, titulo }) => {


    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.centeredView}>
            <Modal
                transparent={true}
                animationType='slide'
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.description}>{titulo}</Text>
                        <Text style={styles.modalText}>{texto}</Text>
                        <Pressable
                            onPress={() => setModalVisible(!modalVisible)}
                            style={[styles.button, styles.buttonClose]}
                        >
                            <Text style={styles.textStyle}>Aceptar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#13B18B',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        lineHeight: 10,
        textAlign: 'center',
    },
    description: {
        marginBottom: 15,
        lineHeight: 10,
        textAlign: 'center',
    },
});


export default InternetAlert