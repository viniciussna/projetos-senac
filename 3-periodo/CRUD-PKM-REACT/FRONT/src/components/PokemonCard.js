import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import RatingBadge from './RatingBadge';

const TYPE_COLORS = {
  fire: '#F97316',
  water: '#3B82F6',
  grass: '#22C55E',
  electric: '#EAB308',
  psychic: '#EC4899',
  ice: '#67E8F9',
  dragon: '#7C3AED',
  dark: '#374151',
  fairy: '#F9A8D4',
  normal: '#9CA3AF',
  fighting: '#DC2626',
  flying: '#818CF8',
  poison: '#A855F7',
  ground: '#D97706',
  rock: '#78716C',
  bug: '#84CC16',
  ghost: '#6D28D9',
  steel: '#94A3B8',
};

export default function PokemonCard({ pokemon, onEdit, onDelete }) {
  const mainType = pokemon.types?.[0] ?? 'normal';
  const typeColor = TYPE_COLORS[mainType] ?? '#9CA3AF';

  const confirmDelete = () => {
    Alert.alert(
      'Remover Pokémon',
      `Deseja remover ${pokemon.name} da sua coleção?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Remover', style: 'destructive', onPress: () => onDelete(pokemon._id) },
      ]
    );
  };

  return (
    <View style={[styles.card, { borderLeftColor: typeColor }]}>
      {/* Imagem */}
      <View style={[styles.imgWrap, { backgroundColor: typeColor + '22' }]}>
        {pokemon.imgOfficial || pokemon.sprite ? (
          <Image
            source={{ uri: pokemon.imgOfficial || pokemon.sprite }}
            style={styles.img}
            resizeMode="contain"
          />
        ) : (
          <Text style={styles.imgPlaceholder}>?</Text>
        )}
      </View>

      {/* Info */}
      <View style={styles.info}>
        <View style={styles.topRow}>
          <Text style={styles.number}>#{String(pokemon.pokeId).padStart(3, '0')}</Text>
          <View style={styles.typePills}>
            {pokemon.types?.map((t) => (
              <View
                key={t}
                style={[styles.typePill, { backgroundColor: (TYPE_COLORS[t] ?? '#9CA3AF') + '33' }]}
              >
                <Text style={[styles.typeText, { color: TYPE_COLORS[t] ?? '#9CA3AF' }]}>
                  {t}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.name}>{pokemon.name}</Text>

        <RatingBadge rating={pokemon.rating} size="sm" />

        {/* Stats */}
        <View style={styles.stats}>
          <StatItem label="HP" value={pokemon.hp} color="#22C55E" />
          <StatItem label="ATK" value={pokemon.attack} color="#F97316" />
          <StatItem label="DEF" value={pokemon.defense} color="#3B82F6" />
          <StatItem label="SPD" value={pokemon.speed} color="#EAB308" />
        </View>
      </View>

      {/* Ações */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.btnEdit} onPress={() => onEdit(pokemon)}>
          <Text style={styles.btnText}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnDelete} onPress={confirmDelete}>
          <Text style={styles.btnText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function StatItem({ label, value, color }) {
  return (
    <View style={styles.statItem}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#13131A',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderLeftWidth: 4,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  imgWrap: {
    width: 90,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 80,
    height: 80,
  },
  imgPlaceholder: {
    fontSize: 36,
    color: '#4B5563',
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  number: {
    color: '#4B5563',
    fontSize: 12,
    fontWeight: '700',
  },
  typePills: {
    flexDirection: 'row',
    gap: 4,
    flexWrap: 'wrap',
  },
  typePill: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 10,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  name: {
    color: '#F9FAFB',
    fontSize: 17,
    fontWeight: '800',
    textTransform: 'capitalize',
    marginBottom: 4,
  },
  stats: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 13,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 9,
    color: '#6B7280',
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 8,
    paddingRight: 12,
    paddingLeft: 4,
  },
  btnEdit: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#1E3A5F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDelete: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#3B0E0E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 16,
  },
});
