import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import GameListScreen from './screens/GameListScreen';
import SettingsScreen from './screens/SettingsScreen';
import MainScreen from './screens/MainScreen';
import GameDetailsScreen from './screens/GameDetailsScreen';

// 🔹 Definir los tipos de rutas
export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  GameList: undefined;
  Settings: undefined;
  Main: undefined;
  GameDetails: {
    title: string;
    description: string;
    image: string;
    status: string;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="GameList" component={GameListScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="GameDetails" component={GameDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;




