import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, KeyboardAvoidingView } from 'react-native';

interface ProcessComponentProps {
  editable?: boolean;
  textoProcedimiento?: string;
  updateRecipeTabProc?: (newProc: string) => void;
}

const ProcessComponent: React.FC<ProcessComponentProps> = ({
  editable,
  textoProcedimiento,
  updateRecipeTabProc
}) => {
  const [newText, setNewText] = useState(textoProcedimiento);
  const handleChange = (text) => {
    setNewText(text);
    updateRecipeTabProc(text);
  };

  useEffect(() => {
    setNewText(textoProcedimiento);
  }, [textoProcedimiento]);

  return (
      <ScrollView>
          <View style={styles.container}>
            <Text style={styles.title}>Procedimiento</Text>
            {editable ? (
              <TextInput
                style={styles.textInput}
                multiline={true}
                value={newText}
                placeholder="Ingrese el procedimiento"
                onChangeText={handleChange}
              />
            ) : (
              <ScrollView style={styles.scrollView}>
                <Text style={styles.text}>
                  {textoProcedimiento || 'Sin procedimiento'}
                </Text>
              </ScrollView>
            )}
          </View>
      </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    minHeight: 150,
  },
  scrollView: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    minHeight: 150,
  },
  text: {
    fontSize: 16,
  },
});

export default ProcessComponent;
