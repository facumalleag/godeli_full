import React from 'react';
import {View, Button, StyleSheet, Pressable, Text } from 'react-native';
import { launchImageLibraryAsync, launchCameraAsync } from 'expo-image-picker';

const ImagePickerModal = ({onClose, onImageSelect }) => {
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
    <View>
      <View style={styles.modalContainer}>
        <Pressable
          onPress={handleSelectFromGallery}
          style={styles.button}
        >
          <Text style={{color: 'white'}}>Galería</Text>
        </Pressable>
        <Pressable
          onPress={handleTakePhoto}
          style={styles.button}
        >
          <Text style={{color: 'white'}}>Cámara</Text>
        </Pressable>
        <Pressable
          onPress={onClose}
          style={styles.button}
        >
          <Text style={{color: 'white'}}>Cancelar</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 50, 
    top: 140,
    width: '40%',
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white'
  },
  button: {
    marginVertical: 10,
    height: 40,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#129575',
    width: '90%',
    alignItems: 'center'
  },
});

export default ImagePickerModal;

