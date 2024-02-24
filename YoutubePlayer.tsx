import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

const YouTubePlayer = ({ videoId , setIsVideo}: {videoId: string, setIsVideo: (val: boolean) => void}) => {
  return (
        <>
          <TouchableOpacity onPress={() => setIsVideo(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
          <WebView
            style={styles.webView}
            javaScriptEnabled={true}
            source={{ uri: `https://www.youtube.com/embed/${videoId}`}}
            allowsFullscreenVideo={true}
          />
        </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 9999,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  webView: {
    width: '100%',
    height: 300, 
    flex: 1.
  },
});

export default YouTubePlayer;