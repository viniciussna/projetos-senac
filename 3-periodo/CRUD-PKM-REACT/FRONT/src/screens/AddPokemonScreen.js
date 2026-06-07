import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { fetchPokemonByName } from '../api/pokeapi';
import { createPokemon } from '../api/backend';

const RATINGS = [
  { key: 'time_favorito', label: '⭐ Time Favorito' },
  { key: 'pokedex', label: '📖 Pokédex' },
  { key: 'deixa_escapar', label: '💨 Deixa Escapar' },
];

export default function AddPokemonScreen({ navigation, route }) {
  const prefill = route?.params?.prefill ?? '';
  const [search, setSearch] = useState(prefill);
  const [pokemon, setPokemon] = useState(null);
  const [rating, setRating] = useState('pokedex');
  const [searching, setSearching] = useState(false);
  const [saving, setSaving] = useState(false);

  React.useEffect(() => {
    if (prefill) doSearch(prefill);
  }, []);

  const handleSearch = async () => {
    doSearch(search);
  };

  const doSearch = async (name) => {
    if (!name.trim()) return;
    setSearch(name);
    setSearching(true);
    setPokemon(null);
    try {
      const data = await fetchPokemonByName(name.trim());
      setPokemon(data);
    } catch (err) {
      const isNotFound = err?.response?.status === 404;
      Alert.alert(
        isNotFound ? 'Pokémon não encontrado' : 'Erro de conexão',
        isNotFound
          ? `"${name}" não foi encontrado.\n\nOs nomes precisam ser em inglês e corretos.\nEx: bulbasaur, charizard, mewtwo`
          : 'Não foi possível buscar. Verifique sua conexão com a internet.'
      );
    } finally {
      setSearching(false);
    }
  };

  const handleSave = async () => {
    if (!pokemon) return;
    setSaving(true);
    try {
      await createPokemon({ ...pokemon, rating });
      Alert.alert('Salvo! ✅', `${pokemon.name} foi adicionado à sua coleção.`, [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || '';
      Alert.alert(
        'Erro ao salvar',
        `Não foi possível salvar no backend.\n\nVerifique:\n• O servidor está rodando?\n• O IP em backend.js está correto?\n\n` +
        (msg ? `Detalhe: ${msg}` : '')
      );
    } finally {
      setSaving(false);
    }
  };

  const isWeb = Platform.OS === 'web';

  const webScrollStyle = isWeb ? {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflowY: 'auto',
  } : {};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Adicionar Pokémon</Text>
      </View>

      <View style={styles.scrollWrapper}>
        <ScrollView
          style={[styles.scroll, isWeb && { overflow: 'scroll' }]}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.searchRow}>
            <TextInput
              style={styles.input}
              placeholder="Nome em inglês (ex: pikachu)"
              placeholderTextColor="#4B5563"
              value={search}
              onChangeText={setSearch}
              onSubmitEditing={handleSearch}
              autoCapitalize="none"
              returnKeyType="search"
            />
            <TouchableOpacity
              style={[styles.searchBtn, searching && styles.searchBtnDisabled]}
              onPress={handleSearch}
              disabled={searching}
            >
              {searching ? (
                <ActivityIndicator size="small" color="#0A0A0F" />
              ) : (
                <Text style={styles.searchBtnText}>Buscar</Text>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.dexHint}
            onPress={() => navigation.navigate('Pokedex')}
          >
            <Text style={styles.dexHintText}>📖 Ver lista de Pokémons disponíveis →</Text>
          </TouchableOpacity>

          {pokemon && (
            <View style={styles.preview}>
              <View style={styles.previewImgWrap}>
                {pokemon.imgOfficial ? (
                  <Image
                    source={{ uri: pokemon.imgOfficial }}
                    style={styles.previewImg}
                    resizeMode="contain"
                  />
                ) : null}
              </View>

              <Text style={styles.previewNumber}>#{String(pokemon.pokeId).padStart(3, '0')}</Text>
              <Text style={styles.previewName}>{pokemon.name}</Text>

              <View style={styles.typesRow}>
                {pokemon.types.map((t) => (
                  <View key={t} style={styles.typeChip}>
                    <Text style={styles.typeChipText}>{t}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.statsGrid}>
                <StatRow label="HP" value={pokemon.hp} />
                <StatRow label="Ataque" value={pokemon.attack} />
                <StatRow label="Defesa" value={pokemon.defense} />
                <StatRow label="Velocidade" value={pokemon.speed} />
                <StatRow label="Peso" value={`${pokemon.weight / 10} kg`} />
                <StatRow label="Altura" value={`${pokemon.height / 10} m`} />
              </View>

              <Text style={styles.ratingTitle}>Classificação</Text>
              <View style={styles.ratingRow}>
                {RATINGS.map((r) => (
                  <TouchableOpacity
                    key={r.key}
                    style={[styles.ratingBtn, rating === r.key && styles.ratingBtnActive]}
                    onPress={() => setRating(r.key)}
                  >
                    <Text style={[styles.ratingBtnText, rating === r.key && styles.ratingBtnTextActive]}>
                      {r.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={[styles.saveBtn, saving && styles.saveBtnDisabled]}
                onPress={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <ActivityIndicator color="#0A0A0F" />
                ) : (
                  <Text style={styles.saveBtnText}>Salvar na Coleção</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

function StatRow({ label, value }) {
  return (
    <View style={styles.statRow}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  header: {
    paddingTop: Platform.OS === 'android' ? 48 : 56,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: '#0A0A0F',
  },
  backBtn: { marginBottom: 8 },
  backText: { color: '#F59E0B', fontSize: 15, fontWeight: '600' },
  title: { color: '#F9FAFB', fontSize: 24, fontWeight: '900' },

  scrollWrapper: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 8,
    paddingBottom: 160,
  },

  searchRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  input: {
    flex: 1,
    backgroundColor: '#13131A',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#F9FAFB',
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#2D2D3D',
  },
  searchBtn: {
    backgroundColor: '#F59E0B',
    borderRadius: 12,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  searchBtnDisabled: { opacity: 0.6 },
  searchBtnText: { color: '#0A0A0F', fontWeight: '800', fontSize: 14 },

  dexHint: {
    backgroundColor: '#13131A',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2D2D3D',
    alignItems: 'center',
  },
  dexHintText: { color: '#6B7280', fontSize: 13, fontWeight: '600' },

  preview: {
    backgroundColor: '#13131A',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2D2D3D',
    marginBottom: 20,
  },
  previewImgWrap: { alignItems: 'center', marginBottom: 8 },
  previewImg: { width: 160, height: 160 },
  previewNumber: { color: '#4B5563', fontSize: 13, fontWeight: '700', textAlign: 'center' },
  previewName: {
    color: '#F9FAFB',
    fontSize: 26,
    fontWeight: '900',
    textTransform: 'capitalize',
    textAlign: 'center',
    marginBottom: 10,
  },

  typesRow: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 16 },
  typeChip: {
    backgroundColor: '#2D2D3D',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
  },
  typeChipText: { color: '#D1D5DB', fontSize: 12, fontWeight: '700', textTransform: 'capitalize' },

  statsGrid: {
    backgroundColor: '#0A0A0F',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    gap: 8,
  },
  statRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statLabel: { color: '#6B7280', fontSize: 13, fontWeight: '600' },
  statValue: { color: '#F9FAFB', fontSize: 13, fontWeight: '700' },

  ratingTitle: {
    color: '#9CA3AF',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  ratingRow: { gap: 8, marginBottom: 24 },
  ratingBtn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2D2D3D',
    backgroundColor: '#0A0A0F',
  },
  ratingBtnActive: { borderColor: '#F59E0B', backgroundColor: '#3D2A00' },
  ratingBtnText: { color: '#6B7280', fontSize: 14, fontWeight: '600' },
  ratingBtnTextActive: { color: '#F59E0B' },

  saveBtn: {
    backgroundColor: '#F59E0B',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveBtnDisabled: { opacity: 0.6 },
  saveBtnText: { color: '#0A0A0F', fontSize: 16, fontWeight: '900' },
});