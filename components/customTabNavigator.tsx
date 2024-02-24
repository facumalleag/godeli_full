import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import IngredientsTab from './ingredientsTab';
import ProcessComponent from './processTab';

const CustomTabNavigator = ({
  editable = true,
  ingredients = [],
  textoProcedimiento = '',
  handleTabIng,
  handleTabProc,
}) => {
  const [activeTab, setActiveTab] = useState('ingredients');
  const [newIngredients, setNewIngredients] = useState(ingredients);
  const [newProc, setNewProc] = useState(textoProcedimiento);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const updateRecipeTabIng = (newIngredients) => {
    setNewIngredients(newIngredients);
    handleTabIng(newIngredients)
  };

  const updateRecipeTabProc = (newProc) => {
    setNewProc(newProc);
    handleTabProc(newProc)
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            {
              backgroundColor:
                activeTab === 'ingredients' ? '#129575' : 'transparent',
            },
          ]}
          onPress={() => handleTabChange('ingredients')}>
          <Text style={[styles.tabButtonText, activeTab !== 'ingredients' && styles.tabButtonTextNotActive]}>Ingredientes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            {
              backgroundColor: activeTab === 'process' ? '#129575' : 'transparent',
            },
          ]}
          onPress={() => handleTabChange('process')}>
          <Text style={[styles.tabButtonText, activeTab !== 'process' && styles.tabButtonTextNotActive]}>Procedimiento</Text>
        </TouchableOpacity>
      </View>
      {activeTab === 'ingredients' ? (
        <IngredientsTab
          editable={editable}
          ingredients={newIngredients}
          updateRecipeTabIng={updateRecipeTabIng}
        />
      ) : (
        <ProcessComponent
          editable={editable}
          textoProcedimiento={newProc}
          updateRecipeTabProc={updateRecipeTabProc}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tabButton: {
    padding: 10,
    backgroundColor: '#129575',
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  tabButtonText: {
    color: '#FFFFFF',
  },
  tabButtonTextNotActive: {
    color: '#129575'
  }
});

export default CustomTabNavigator;
