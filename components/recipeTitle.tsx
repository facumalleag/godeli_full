import React, { useEffect, useState } from 'react';
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
  updateRecipeTitle,
}) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  useEffect(() => {
    updateRecipeTitle({
      title: newTitle,
      description: newDescription,
    });
  }, [newTitle, newDescription])


  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
          <TextInput
            style={styles.titleInput}
            placeholder='Agregá un título'
            value={newTitle}
            onChangeText={(text) => setNewTitle(text)}
          />

      </View>
      <View style={styles.descriptionContainer}>
          <TextInput
            style={styles.descriptionInput}
            value={newDescription}
            onChangeText={(text) => setNewDescription(text)}
            placeholder="Ingrese la descipcion de la Receta"
            placeholderTextColor="black"
            multiline
          />
     
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
    color: 'black',
    width: '100%',
    marginVertical: 10
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
    width: '100%',
    marginVertical: 10
  },
});

export default RecipeTitle;
