// screens/GameDetailsScreen.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../App';

// Añadimos tipo para los parámetros de navegación
type GameDetailsRouteProp = RouteProp<RootStackParamList, 'GameDetails'>;

const GameDetailsScreen = () => {
  const route = useRoute<GameDetailsRouteProp>();
  const { title, description, image, status } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.status}>Estado: {status}</Text>
      <Text style={styles.description}>{description}</Text>
    </ScrollView>
  );
};

export default GameDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#121212',
    flexGrow: 1,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  status: {
    fontSize: 16,
    color: '#bbb',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#ddd',
    textAlign: 'justify',
  },
});
