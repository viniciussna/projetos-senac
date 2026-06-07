import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RATINGS = {
  deixa_escapar: { label: '💨 Deixa Escapar', color: '#6B7280', bg: '#1F2937' },
  pokedex: { label: '📖 Pokédex', color: '#3B82F6', bg: '#1E3A5F' },
  time_favorito: { label: '⭐ Time Favorito', color: '#F59E0B', bg: '#3D2A00' },
};

export default function RatingBadge({ rating, size = 'md' }) {
  const r = RATINGS[rating] ?? RATINGS['pokedex'];
  const isSmall = size === 'sm';

  return (
    <View style={[styles.badge, { backgroundColor: r.bg }, isSmall && styles.badgeSm]}>
      <Text style={[styles.label, { color: r.color }, isSmall && styles.labelSm]}>
        {r.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  badgeSm: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  labelSm: {
    fontSize: 11,
  },
});
