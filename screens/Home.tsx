import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Home() {
  const route = useRoute();
  const { name } = route.params as { name: string };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem vinda, {name}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});
