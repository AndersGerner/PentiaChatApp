import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

/**
 * SplashScreen is a component that displays a loading state for the Pentia Chat App.
 * It shows the app's name and an activity indicator.
 */
function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pentia Chat App</Text>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default SplashScreen;
