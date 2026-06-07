import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import HomeScreen from './src/screens/HomeScreen';
import AddPokemonScreen from './src/screens/AddPokemonScreen';
import EditPokemonScreen from './src/screens/EditPokemonScreen';
import PokedexScreen from './src/screens/PokedexScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor="#0A0A0F" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#0A0A0F', flex: 1 },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddPokemon" component={AddPokemonScreen} />
          <Stack.Screen name="EditPokemon" component={EditPokemonScreen} />
          <Stack.Screen name="Pokedex" component={PokedexScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}