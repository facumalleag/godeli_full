import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import RNRestart from 'react-native-restart';

export default function App() {
  const unsubscribe = NetInfo.addEventListener(state => {
    if (state.isConnected === false) {
      Alert.alert('Sin internet!', 'Por favor reconectate!', [
        {
          text: 'Recargar',
          onPress: () => RNRestart.restart(),
        },
      ]);
    } else if (state.isConnected === true) {
      console.log('Connected');
    }
  });

  useEffect(() => {
    unsubscribe();
  });
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
