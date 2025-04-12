import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
  const [filterVisible, setFilterVisible] = useState(false);

  const filterHeight = useRef(new Animated.Value(0)).current;
  const filterOpacity = useRef(new Animated.Value(0)).current;

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
        }));

        setGames(parsedGames);
        setFilteredGames(parsedGames);
      })
      .catch(error => console.error('Error al cargar los juegos:', error));
  }, []);

  const toggleFilterMenu = () => {
    if (filterVisible) {
      Animated.timing(filterOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setFilterVisible(false));
    } else {
      setFilterVisible(true);
      Animated.timing(filterOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const filterGames = (status: string) => {
    setSelectedFilter(status);
    if (status === 'Todos') {
      setFilteredGames(games);
    } else {
      setFilteredGames(games.filter(game => game.status === status));
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
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.topBar, { marginTop: 30 }]}>
        <TouchableOpacity onPress={toggleFilterMenu}>
          <Ionicons name="filter" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.header}>Tu biblioteca</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {filterVisible && (
        <Animated.View style={[styles.filterContainer, {
          opacity: filterOpacity,
          position: 'absolute',
          top: 60,
          left: 10,
          right: 10,
          zIndex: 10,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          borderRadius: 12,
          padding: 10,
        }]}>
          {['Todos', 'Completado', 'Pendiente', 'Adquirido', 'Anunciado', 'No lanzado'].map(status => (
            <TouchableOpacity
              key={status}
              style={[
                styles.filterButton,
                selectedFilter === status && styles.activeFilter,
              ]}
              onPress={() => filterGames(status)}
            >
              <Text style={styles.filterText}>{status}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      )}

      <FlatList
        data={filteredGames}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20, }}
      />
    </View>
  );
};

export default GameListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 10,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  header: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#222',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  image: {
    height: 180,
    width: '100%',
    marginBottom: 8,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  filterContainer: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    padding: 10,
  },
  filterButton: {
    padding: 8,
    marginVertical: 2,
    borderRadius: 5,
    backgroundColor: '#333',
    width: '40%'
  },
  activeFilter: {
    backgroundColor: '#1E90FF',
  },
  filterText: {
    color: '#fff',
    textAlign: 'center',
  },
});
