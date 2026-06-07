import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Platform,
} from 'react-native';

const GEN1 = [
  'bulbasaur','ivysaur','venusaur','charmander','charmeleon','charizard',
  'squirtle','wartortle','blastoise','caterpie','metapod','butterfree',
  'weedle','kakuna','beedrill','pidgey','pidgeotto','pidgeot','rattata',
  'raticate','spearow','fearow','ekans','arbok','pikachu','raichu',
  'sandshrew','sandslash','nidoran-f','nidorina','nidoqueen','nidoran-m',
  'nidorino','nidoking','clefairy','clefable','vulpix','ninetales',
  'jigglypuff','wigglytuff','zubat','golbat','oddish','gloom','vileplume',
  'paras','parasect','venonat','venomoth','diglett','dugtrio','meowth',
  'persian','psyduck','golduck','mankey','primeape','growlithe','arcanine',
  'poliwag','poliwhirl','poliwrath','abra','kadabra','alakazam','machop',
  'machoke','machamp','bellsprout','weepinbell','victreebel','tentacool',
  'tentacruel','geodude','graveler','golem','ponyta','rapidash','slowpoke',
  'slowbro','magnemite','magneton','farfetchd','doduo','dodrio','seel',
  'dewgong','grimer','muk','shellder','cloyster','gastly','haunter',
  'gengar','onix','drowzee','hypno','krabby','kingler','voltorb',
  'electrode','exeggcute','exeggutor','cubone','marowak','hitmonlee',
  'hitmonchan','lickitung','koffing','weezing','rhyhorn','rhydon',
  'chansey','tangela','kangaskhan','horsea','seadra','goldeen','seaking',
  'staryu','starmie','mr-mime','scyther','jynx','electabuzz','magmar',
  'pinsir','tauros','magikarp','gyarados','lapras','ditto','eevee',
  'vaporeon','jolteon','flareon','porygon','omanyte','omastar','kabuto',
  'kabutops','aerodactyl','snorlax','articuno','zapdos','moltres',
  'dratini','dragonair','dragonite','mewtwo','mew',
];

const ITEMS_PER_PAGE = 30;

export default function PokedexScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const filtered = query.trim()
    ? GEN1.filter((n) => n.includes(query.trim().toLowerCase()))
    : GEN1;

  const paginated = filtered.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = paginated.length < filtered.length;

  const handleSelect = (name) => {
    navigation.navigate('AddPokemon', { prefill: name });
  };

  const renderItem = useCallback(({ item }) => {
    const num = GEN1.indexOf(item) + 1;
    return (
      <TouchableOpacity style={styles.card} onPress={() => handleSelect(item)} activeOpacity={0.7}>
        <Image
          source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${num}.png` }}
          style={styles.sprite}
          resizeMode="contain"
        />
        <Text style={styles.cardNum}>#{String(num).padStart(3, '0')}</Text>
        <Text style={styles.cardName}>{item}</Text>
      </TouchableOpacity>
    );
  }, []);

  return (
    // CORREÇÃO: trocado SafeAreaView por View com paddingTop manual — SafeAreaView
    // no Android não funciona corretamente dentro do Stack Navigator
    <View style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>📖 Pokédex — Geração 1</Text>
        <Text style={styles.sub}>Toque num Pokémon para buscá-lo</Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Filtrar por nome..."
        placeholderTextColor="#4B5563"
        value={query}
        onChangeText={(t) => { setQuery(t); setPage(1); }}
        autoCapitalize="none"
      />

      {/* CORREÇÃO: FlatList dentro de View com flex:1 garante scroll funcionando */}
      <View style={styles.listWrapper}>
        <FlatList
          data={paginated}
          keyExtractor={(item) => item}
          numColumns={3}
          renderItem={renderItem}
          contentContainerStyle={styles.grid}
          onEndReached={() => hasMore && setPage((p) => p + 1)}
          onEndReachedThreshold={0.3}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            hasMore ? <ActivityIndicator color="#F59E0B" style={{ marginVertical: 16 }} /> : null
          }
          ListEmptyComponent={
            <Text style={styles.empty}>Nenhum resultado para "{query}"</Text>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // CORREÇÃO: flex:1 garante que a tela ocupa todo o espaço disponível
  safe: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },

  header: {
    paddingTop: Platform.OS === 'android' ? 48 : 56,
    paddingBottom: 12,
    paddingHorizontal: 20,
  },
  backBtn: { marginBottom: 8 },
  backText: { color: '#F59E0B', fontSize: 15, fontWeight: '600' },
  title: { color: '#F9FAFB', fontSize: 22, fontWeight: '900' },
  sub: { color: '#6B7280', fontSize: 12, marginTop: 2 },

  searchInput: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#13131A',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#F9FAFB',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#2D2D3D',
  },

  // CORREÇÃO: listWrapper com flex:1 é o que permite a FlatList rolar
  listWrapper: {
    flex: 1,
  },

  grid: { paddingHorizontal: 8, paddingBottom: 40 },

  card: {
    flex: 1,
    margin: 5,
    backgroundColor: '#13131A',
    borderRadius: 14,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: '#2D2D3D',
  },
  sprite: { width: 64, height: 64 },
  cardNum: { color: '#4B5563', fontSize: 10, fontWeight: '700', marginTop: 4 },
  cardName: {
    color: '#D1D5DB',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'capitalize',
    textAlign: 'center',
    marginTop: 2,
  },

  empty: { color: '#4B5563', textAlign: 'center', marginTop: 40, fontSize: 14 },
});