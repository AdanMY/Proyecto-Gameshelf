import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

type Game = {
  id: number;
  title: string;
  image: string;
  description: string;
  status: string;
};

const MainScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://10.0.2.2/gameshelf_api/get_games.php') // 🔁 Usa tu IP si usas dispositivo real
      .then((res) => res.json())
      .then((data) => {
        const parsedGames = data.map((game: any) => ({
          id: game.id,
          title: game.titulo,
          image: game.portada,
          description: game.descripcion,
          status: game.estado,
        }));
        setGames(parsedGames);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al obtener los juegos:', err);
        setLoading(false);
      });
  }, []);
  

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tus Juegos</Text>
      <FlatList
        data={games}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.gameItem}
            onPress={() =>
              navigation.navigate('GameDetails', {
                title: item.title,
                description: item.description,
                image: item.image,
                status: item.status,
              })
            }
          >
            <Text style={styles.gameText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.buttonContainer}>
        <Button title="Ajustes" onPress={() => navigation.navigate('Settings')} color="#444" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  gameItem: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#222',
    borderRadius: 8,
  },
  gameText: {
    color: '#fff',
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});

export default MainScreen;

