import React, { useState, useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  View,
  TouchableOpacity,
  Modal,
  Button,
  Text,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import ImagePickerModal from './imagePickerModal';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const ImageCarouselFlatList = ({
  images = [],
  editable = true,
  uriVideo = '',
  updateRecipeImages,
}) => {
  useEffect(() => {
    console.log('Editable en efecto:', editable);
  }, [editable]);

  const [modalVisible, setModalVisible] = useState(false); // Estado para el modal de imagen fullscreen
  const [selectedImage, setSelectedImage] = useState(null);
  const [updatedImages, setUpdatedImages] = useState(images);

  const [addModalVisible, setAddModalVisible] = useState(false); // Estado para el modal de agregar imágenes

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleImagePress(item)}>
      <View style={styles.imageContainer}>
        {editable && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteImage(item)}>
            <Ionicons name="trash-outline" size={20} color="#fff" />
          </TouchableOpacity>
        )}
        <Image key={item.id} source={{ uri: item.uri }} style={styles.image} />
      </View>
    </TouchableOpacity>
  );

  const handleImagePress = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const onClose = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  const handleDeleteImage = (image) => {
    const filteredImages = updatedImages.filter((img) => img.id !== image.id);
    setUpdatedImages(filteredImages);
    updateRecipeImages(filteredImages);
  };

  const handleSelectImage = (uri) => {
    const newImage = { id: Date.now().toString(), uri };
    setUpdatedImages([...updatedImages, newImage]);
    updateRecipeImages([...updatedImages, newImage]);
  };

  const handleVideoButtonPress = () => {};
  return (
    <View style={styles.container}>
      {updatedImages.length > 0 ? (
        <FlatList
          data={updatedImages}
          renderItem={renderItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          bounces={false}
          keyExtractor={(item) => item.id.toString()}
          style={{ width }}
        />
      ) : (
        <LinearGradient  colors={['transparent', 'rgba(0,0,0,0.1)' , 'rgba(0,0,0,0.8)']} style={styles.emptyContainer}>
          {editable ? <TouchableOpacity
          style={styles.addButton}
          onPress={() => setAddModalVisible(true)}>
          <Feather name="edit" size={60} color="#fff" />
        </TouchableOpacity>: <Text style={styles.emptyText}>Sin fotos</Text>}
        </LinearGradient>
      )}
      {!editable && (
        <TouchableOpacity
          style={[
            styles.videoButton,
            uriVideo ? styles.videoButtonActive : styles.videoButtonInactive,
          ]}
          onPress={handleVideoButtonPress}>
          <Ionicons
            name="play"
            size={20}
            color={uriVideo ? '#fff' : '#e3dede'}
          />
        </TouchableOpacity>
      )}
      <Modal visible={addModalVisible} transparent={true} animationType="fade">
        <ImagePickerModal
          onClose={() => setAddModalVisible(false)}
          onImageSelect={handleSelectImage}
        />
      </Modal>

      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close-circle" size={40} color="#fff" />
          </TouchableOpacity>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: selectedImage ? selectedImage.uri : null }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    width: 60,
    height: 60,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width,
    height: '100%',
    resizeMode: 'cover',
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderRadius: 20,
  },
  videoButton: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#129575',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  videoButtonActive: {
    backgroundColor: '#129575',
  },
  videoButtonInactive: {
    backgroundColor: '#A9A9A9',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginTop: 50,
    borderRadius: 30,
    height: '30%'
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ImageCarouselFlatList;
