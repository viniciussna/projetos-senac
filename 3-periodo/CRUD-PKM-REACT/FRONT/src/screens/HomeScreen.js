import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getPokemons, deletePokemon } from '../api/backend';
import PokemonCard from '../components/PokemonCard';

const FILTERS = [
  { key: 'all', label: 'Todos' },
  { key: 'time_favorito', label: '⭐ Time' },
  { key: 'pokedex', label: '📖 Pokédex' },
  { key: 'deixa_escapar', label: '💨 Escapar' },
];

export default function HomeScreen({ navigation }) {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all');

  const load = async () => {
    try {
      const { data } = await getPokemons();
      setPokemons(data);
    } catch (err) {
      Alert.alert(
        'Erro de conexão',
        'Não foi possível conectar ao backend.\nVerifique se o servidor está rodando e o IP está correto em src/api/backend.js.'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      load();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    load();
  };

  const handleDelete = async (id) => {
    try {
      await deletePokemon(id);
      setPokemons((prev) => prev.filter((p) => p._id !== id));
    } catch {
      Alert.alert('Erro', 'Não foi possível remover o Pokémon.');
    }
  };

  const handleEdit = (pokemon) => {
    navigation.navigate('EditPokemon', { pokemon });
  };

  const filtered =
    filter === 'all' ? pokemons : pokemons.filter((p) => p.rating === filter);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#F59E0B" />
        <Text style={styles.loadingText}>Carregando coleção...</Text>
      </View>
    );
  }

  const ListHeader = () => (
    <>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🎴 Card Pokémon</Text>
        <Text style={styles.headerSub}>{pokemons.length} na coleção</Text>
      </View>

      {/* Filtros */}
      <View style={styles.filterRow}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f.key}
            style={[styles.filterBtn, filter === f.key && styles.filterBtnActive]}
            onPress={() => setFilter(f.key)}
          >
            <Text style={[styles.filterText, filter === f.key && styles.filterTextActive]}>
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      {filtered.length === 0 ? (
        <>
          <ListHeader />
          <View style={styles.center}>
            <Text style={styles.emptyIcon}>🌑</Text>
            <Text style={styles.emptyText}>Nenhum Pokémon aqui.</Text>
            <Text style={styles.emptyHint}>Toque em + para adicionar!</Text>
          </View>
        </>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item._id}
          ListHeaderComponent={<ListHeader />}
          renderItem={({ item }) => (
            <PokemonCard pokemon={item} onEdit={handleEdit} onDelete={handleDelete} />
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#F59E0B" />
          }
        />
      )}

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddPokemon')}
        activeOpacity={0.8}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0F' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0A0A0F' },
  loadingText: { color: '#6B7280', marginTop: 12, fontSize: 14 },

  header: {
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: '#0A0A0F',
  },
  headerTitle: {
    color: '#F9FAFB',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  headerSub: {
    color: '#6B7280',
    fontSize: 13,
    marginTop: 2,
  },

  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingBottom: 12,
    gap: 6,
    flexWrap: 'wrap',
  },
  filterBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#1C1C26',
    borderWidth: 1,
    borderColor: '#2D2D3D',
  },
  filterBtnActive: {
    backgroundColor: '#F59E0B',
    borderColor: '#F59E0B',
  },
  filterText: { color: '#9CA3AF', fontSize: 12, fontWeight: '600' },
  filterTextActive: { color: '#0A0A0F' },

  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyText: { color: '#4B5563', fontSize: 16, fontWeight: '700' },
  emptyHint: { color: '#374151', fontSize: 13, marginTop: 4 },

  fab: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#F59E0B',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
  },
  fabText: {
    color: '#0A0A0F',
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 34,
  },
});
