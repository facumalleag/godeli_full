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
     <Stack.Screen name="tabs"  />{/* 
    <Stack name="HomeScreen"  />
    <Stack name="Login" />
    <Stack name="TabNavigator"/>
    <Stack name="AgregarRecetaScreen"  />
    <Stack name="ProfileScreen" />  */}
  </Stack>
  )
}

export default StackLayout
