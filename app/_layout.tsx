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
    <Stack.Screen name="RecetaItem" />
    <Stack.Screen name="RecipeScreenEdit"  />
    {/* <Stack.Screen name="ProfileScreen" />  */}
  </Stack>
  )
}

export default StackLayout
