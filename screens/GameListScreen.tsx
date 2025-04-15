import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Alert,
  TextInput,
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
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

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

  const handleSearch = (text: string) => {
    setSearchText(text);
    const filtered = games.filter(game =>
      game.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredGames(filtered);
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

        <View style={styles.iconGroup}>
          <TouchableOpacity onPress={() => Alert.alert(
            "Función en desarrollo",
            "Pronto podrás disfrutar de esta función. Estamos trabajando para habilitarla en futuras actualizaciones. ¡Gracias por tu comprensión!"
          )}>
            <Ionicons name="add-circle-outline" size={28} color="#fff" style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setSearchVisible(!searchVisible)}>
            <Ionicons name="search" size={28} color="#fff" style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="settings" size={28} color="#fff" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {searchVisible && (
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar juego..."
          placeholderTextColor="#aaa"
          value={searchText}
          onChangeText={handleSearch}
        />
      )}

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
        contentContainerStyle={{ paddingBottom: 20 }}
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
    marginBottom: 15,
  },
  header: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 70,
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 12,
  },
  searchInput: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 8,
    marginBottom: 10,
    borderRadius: 8,
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
    width: '40%',
  },
  activeFilter: {
    backgroundColor: '#1E90FF',
  },
  filterText: {
    color: '#fff',
    textAlign: 'center',
  },
});

