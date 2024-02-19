import React from 'react'
import { Stack } from 'expo-router';

const StackLayout = () => {
  return (
    <Stack
    initialRouteName='Login'
     screenOptions={{
      headerShown:false,
    }}
  >
     <Stack.Screen name="tabs"  /> 
    <Stack.Screen name="RecipeScreen" /> 
    <Stack.Screen name="RecetaItem" />{/*
    <Stack name="TabNavigator"/>
    <Stack name="AgregarRecetaScreen"  />
    <Stack name="ProfileScreen" />  */}
  </Stack>
  )
}

export default StackLayout
