import React from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';

interface ProcessComponentProps {
  editable?: boolean;
  textoProcedimiento?: string;
}

const ProcessComponent: React.FC<ProcessComponentProps> = ({
  editable,
  textoProcedimiento,
  updateRecipeTabProc,
}) => {


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Procedimiento</Text>
      {editable ? (
        <TextInput
          style={styles.textInput}
          multiline={true}
          value={textoProcedimiento}
          placeholder="Ingrese el procedimiento"
          onChangeText={(text) => {}}
        />
      ) : (
        <ScrollView style={styles.scrollView}>
          <Text style={styles.text}>
            {textoProcedimiento || 'Sin procedimiento'}
          </Text>
        </ScrollView>
      )}
    </View>
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