import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface RecipeTitleProps {
  title?: string;
  description?: string;
  editable?: boolean;
  updateRecipeTitle: (newRecipeValues: {
    title: string;
    description: string;
  }) => void;
}

const RecipeTitle: React.FC<RecipeTitleProps> = ({
  title = 'Ingresa el titulo aqui',
  description = 'Ingresa la descripcion aqui',
  editable = true,
  updateRecipeTitle,
}) => {
  const [showEditIcon, setShowEditIcon] = useState(true);
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const handleEditTitle = () => {
    setShowEditIcon(false);
    setEditingTitle(true);
    setNewTitle(newTitle);
  };

  const handleEditDescription = () => {
    setShowEditIcon(false);
    setEditingDescription(true);
    setNewDescription(newDescription);
  };

  const handleSaveTitle = () => {
    setEditingTitle(false);
    setShowEditIcon(true);
    updateRecipeTitle({
      title: newTitle,
      description: newDescription,
    });
  };

  const handleSaveDescription = () => {
    setEditingDescription(false);
    setShowEditIcon(true);
    updateRecipeTitle({
      title: newTitle,
      description: newDescription,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {editingTitle ? (
          <TextInput
            style={styles.titleInput}
            value={newTitle}
            onChangeText={(text) => setNewTitle(text)}
            onBlur={handleSaveTitle}
            onSubmitEditing={handleSaveTitle}
          />
        ) : (
          <>
            <Text style={styles.title}>{newTitle}</Text>
            {editable && showEditIcon && (
              <TouchableOpacity onPress={handleEditTitle}>
                <Ionicons name="pencil-outline" size={20} color="#ccc" />
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
      <View style={styles.descriptionContainer}>
        {editingDescription ? (
          <TextInput
            style={styles.descriptionInput}
            value={newDescription}
            onChangeText={(text) => setNewDescription(text)}
            onBlur={handleSaveDescription}
            onSubmitEditing={handleSaveTitle}
          />
        ) : (
          <>
            <Text style={styles.description}>{newDescription}</Text>
            {editable && showEditIcon && (
              <TouchableOpacity onPress={handleEditDescription}>
                <Ionicons name="pencil-outline" size={20} color="#ccc" />
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'system-font',
    fontSize: 24,
    fontWeight: 'bold',
  },
  titleInput: {
    fontFamily: 'system-font',
    fontSize: 24,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderColor: 'gray',
    flex: 1,
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  description: {
    fontFamily: 'system-font',
    fontSize: 16,
    fontWeight: '100',
    color: '#666',
  },
  descriptionInput: {
    fontFamily: 'system-font',
    fontSize: 16,
    fontWeight: '100',
    borderBottomWidth: 1,
    borderColor: 'gray',
    flex: 1,
  },
});

export default RecipeTitle;