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
    <Stack.Screen name="RecetaItem" />
    <Stack.Screen name="MisRecetasCreadasScreen"/>{
    <Stack.Screen name="RecipeScreenEdit"  />/*
    <Stack name="ProfileScreen" />  */}
  </Stack>
  )
}

export default StackLayout
