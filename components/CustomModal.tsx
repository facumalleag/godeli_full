import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ModalProps {
  visible: boolean;
  titulo: string;
  descripcion: string;
  onAceptar: () => void;
}

const CustomModal: React.FC<ModalProps> = ({ visible, titulo, descripcion, onAceptar }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.titulo}>{titulo}</Text>
          <View style={styles.linea} />
          <Text style={styles.descripcion}>{descripcion}</Text>
          <TouchableOpacity style={styles.botonAceptar} onPress={onAceptar}>
            <Text style={styles.textoBoton}>Aceptar</Text>
          </TouchableOpacity>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#129575',
    width: 300,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  linea: {
    width: '100%',
    height: 2,
    backgroundColor: '#13B18B',
    marginBottom: 10,
  },
  descripcion: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  botonAceptar: {
    backgroundColor: '#085B47',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  textoBoton: {
    fontSize: 16,
    color: '#fff',
  },
});

export default CustomModal;