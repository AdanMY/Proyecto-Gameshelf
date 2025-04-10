import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type Game = {
  id: number;
  title: string;
  image: string;
  description: string;
  status: string;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'GameList'>;

const GameListScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('Todos');

  useEffect(() => {
    fetch('http://10.0.2.2/gameshelf_api/get_games.php')
      .then(response => response.json())
      .then(data => {
        const parsedGames = data.map((game: any) => ({
          id: game.id,
          title: game.titulo,
          description: game.descripcion,
          image: game.portada,
          status: game.estado,
          releaseDate: game.fecha_lanzamiento, // por si lo usas en el futuro
        }));
  
        setGames(parsedGames);
        setFilteredGames(parsedGames);
      })
      .catch(error => console.error('Error al cargar los juegos:', error));
  }, []);
  

  const filterGames = (status: string) => {
    setSelectedFilter(status);
    if (status === 'Todos') {
      setFilteredGames(games);
    } else {
      const filtered = games.filter(game => game.status === status);
      setFilteredGames(filtered);
    }
  };

  const renderItem = ({ item }: { item: Game }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('GameDetails', {
          title: item.title,
          description: item.description,
          image: item.image,
          status: item.status,
        })
      }
    >
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tu biblioteca</Text>

      <View style={styles.filterContainer}>
        {['Todos', 'Completado', 'Pendiente', 'Adquirido', 'Anunciado', 'No lanzado'].map(status => (
          <Button
            key={status}
            title={status.charAt(0).toUpperCase() + status.slice(1)}
            onPress={() => filterGames(status)}
            color={selectedFilter === status ? '#1E90FF' : '#444'}
          />
        ))}
      </View>

      <FlatList
        data={filteredGames}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default GameListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 10,
  },
  header: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#222',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  image: {
    height: 180,
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: 8,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});
