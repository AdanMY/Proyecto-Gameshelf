import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { RouteProp } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

type GameDetailsRouteProp = RouteProp<RootStackParamList, 'GameDetails'>;

const GameDetailsScreen = () => {
  const route = useRoute<GameDetailsRouteProp>();
  const navigation = useNavigation();
  const { title, description, image, status } = route.params;

  const [currentStatus, setCurrentStatus] = useState(status);

  const statuses = ["Pendiente", "Completado", "Adquirido"];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: image }} style={styles.image} />
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.status}>Estado actual:</Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={currentStatus}
            onValueChange={(itemValue) => {
              setCurrentStatus(itemValue);
              console.log(`Nuevo estado guardado: ${itemValue}`);
            }}
            style={styles.picker}
          >
            {statuses.map((statusOption) => (
              <Picker.Item key={statusOption} label={statusOption} value={statusOption} />
            ))}
          </Picker>
        </View>

        <Text style={styles.description}>{description}</Text>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GameDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 50,
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  status: {
    fontSize: 18,
    color: '#bbb',
    marginBottom: 10,
  },
  pickerContainer: {
    marginVertical: 10,
    backgroundColor: '#333',
    borderRadius: 5,
    overflow: 'hidden',
    width: '80%',
  },
  picker: {
    color: '#fff',
  },
  buttonContainer: {
    padding: 10,
    backgroundColor: '#121212',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  backButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 20,
    color: '#ddd',
    textAlign: 'justify',
  },
});
