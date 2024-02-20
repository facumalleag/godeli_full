import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import IngredientsTab from './ingredientsTab';
import ProcessComponent from './processTab';

const CustomTabNavigator = ({
  editable = true,
  ingredients = [],
  textoProcedimiento = '',
  updateRecipeTab,
}) => {
  const [activeTab, setActiveTab] = useState('ingredients');
  console.log('ingredientes');
  console.log(ingredients);
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            {
              backgroundColor:
                activeTab === 'ingredients' ? '#129575' : '#71B1A1',
            },
          ]}
          onPress={() => handleTabChange('ingredients')}>
          <Text style={styles.tabButtonText}>Ingredientes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            {
              backgroundColor: activeTab === 'process' ? '#129575' : '#71B1A1',
            },
          ]}
          onPress={() => handleTabChange('process')}>
          <Text style={styles.tabButtonText}>Procedimiento</Text>
        </TouchableOpacity>
      </View>
      {activeTab === 'ingredients' ? (
        <IngredientsTab editable={editable} ingredients={ingredients} />
      ) : (
        <ProcessComponent
          editable={editable}
          textoProcedimiento={textoProcedimiento}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  tabButton: {
    padding: 10,
    backgroundColor: '#129575',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  tabButtonText: {
    color: '#FFFFFF',
  },
});

export default CustomTabNavigator;
