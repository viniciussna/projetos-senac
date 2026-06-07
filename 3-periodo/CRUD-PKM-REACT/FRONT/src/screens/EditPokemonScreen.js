import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { updatePokemon } from '../api/backend';

const RATINGS = [
  { key: 'time_favorito', label: '⭐ Time Favorito', desc: 'Esse vai pro time!' },
  { key: 'pokedex', label: '📖 Pokédex', desc: 'Registrado na Pokédex.' },
  { key: 'deixa_escapar', label: '💨 Deixa Escapar', desc: 'Não vale a Pokébola.' },
];

export default function EditPokemonScreen({ route, navigation }) {
  const { pokemon } = route.params;
  const [rating, setRating] = useState(pokemon.rating);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (rating === pokemon.rating) {
      navigation.goBack();
      return;
    }
    setSaving(true);
    try {
      await updatePokemon(pokemon._id, { rating });
      Alert.alert('Atualizado!', `Classificação de ${pokemon.name} alterada com sucesso.`, [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch {
      Alert.alert('Erro', 'Não foi possível atualizar. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Editar Classificação</Text>
      </View>

      {/* Card do Pokémon */}
      <View style={styles.card}>
        {pokemon.imgOfficial || pokemon.sprite ? (
          <Image
            source={{ uri: pokemon.imgOfficial || pokemon.sprite }}
            style={styles.img}
            resizeMode="contain"
          />
        ) : null}
        <Text style={styles.number}>#{String(pokemon.pokeId).padStart(3, '0')}</Text>
        <Text style={styles.name}>{pokemon.name}</Text>
        <View style={styles.typesRow}>
          {pokemon.types?.map((t) => (
            <View key={t} style={styles.typeChip}>
              <Text style={styles.typeChipText}>{t}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Seleção de Rating */}
      <Text style={styles.sectionLabel}>Nova Classificação</Text>
      {RATINGS.map((r) => (
        <TouchableOpacity
          key={r.key}
          style={[styles.ratingOption, rating === r.key && styles.ratingOptionActive]}
          onPress={() => setRating(r.key)}
          activeOpacity={0.7}
        >
          <View style={styles.ratingLeft}>
            <Text style={[styles.ratingLabel, rating === r.key && styles.ratingLabelActive]}>
              {r.label}
            </Text>
            <Text style={styles.ratingDesc}>{r.desc}</Text>
          </View>
          <View style={[styles.radio, rating === r.key && styles.radioActive]}>
            {rating === r.key && <View style={styles.radioDot} />}
          </View>
        </TouchableOpacity>
      ))}

      {/* Salvar */}
      <TouchableOpacity
        style={[styles.saveBtn, saving && styles.saveBtnDisabled]}
        onPress={handleSave}
        disabled={saving}
      >
        {saving ? (
          <ActivityIndicator color="#0A0A0F" />
        ) : (
          <Text style={styles.saveBtnText}>Salvar Alteração</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0F' },
  content: { padding: 20, paddingBottom: 80, flexGrow: 1 },

  header: { marginTop: 40, marginBottom: 24 },
  backBtn: { marginBottom: 12 },
  backText: { color: '#F59E0B', fontSize: 15, fontWeight: '600' },
  title: { color: '#F9FAFB', fontSize: 24, fontWeight: '900' },

  card: {
    backgroundColor: '#13131A',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#2D2D3D',
  },
  img: { width: 140, height: 140 },
  number: { color: '#4B5563', fontSize: 13, fontWeight: '700' },
  name: {
    color: '#F9FAFB',
    fontSize: 22,
    fontWeight: '900',
    textTransform: 'capitalize',
    marginBottom: 8,
  },
  typesRow: { flexDirection: 'row', gap: 8 },
  typeChip: {
    backgroundColor: '#2D2D3D',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
  },
  typeChipText: {
    color: '#D1D5DB',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'capitalize',
  },

  sectionLabel: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },

  ratingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#13131A',
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2D2D3D',
  },
  ratingOptionActive: {
    borderColor: '#F59E0B',
    backgroundColor: '#1E1500',
  },
  ratingLeft: { flex: 1 },
  ratingLabel: { color: '#9CA3AF', fontSize: 15, fontWeight: '700', marginBottom: 2 },
  ratingLabelActive: { color: '#F59E0B' },
  ratingDesc: { color: '#4B5563', fontSize: 12 },

  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#2D2D3D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: { borderColor: '#F59E0B' },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#F59E0B',
  },

  saveBtn: {
    backgroundColor: '#F59E0B',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  saveBtnDisabled: { opacity: 0.6 },
  saveBtnText: { color: '#0A0A0F', fontSize: 16, fontWeight: '900' },
});
