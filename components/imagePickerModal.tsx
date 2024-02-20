import React from 'react';
import { Modal, View, Button, StyleSheet } from 'react-native';
import { launchImageLibraryAsync, launchCameraAsync } from 'expo-image-picker';

const ImagePickerModal = ({ visible, onClose, onImageSelect }) => {
  const handleSelectFromGallery = async () => {
    const result = await launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      onImageSelect(result.assets[0].uri);
      onClose();
    }
  };

  const handleTakePhoto = async () => {
    const result = await launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      onImageSelect(result.assets[0].uri);
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <Button
          title="Galería"
          onPress={handleSelectFromGallery}
          style={styles.button}
          color="#129575"
        />
        <Button
          title="Camara"
          onPress={handleTakePhoto}
          style={styles.button}
          color="#129575"
        />
        <Button
          title="Cancelar"
          onPress={onClose}
          style={styles.button}
          color="#D9D9D9"
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginVertical: 10,
    width: 200,
    height: 40,
    borderRadius: 10,
    padding: 10,
  },
});

export default ImagePickerModal;

