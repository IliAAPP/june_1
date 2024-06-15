import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigation from './app/navigation/Navigation';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Navigation />
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}
