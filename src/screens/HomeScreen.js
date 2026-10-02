import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { CATEGORIES } from '../data/categories';

export default function HomeScreen({ onSelect }) {
  const [input, setInput] = useState('');
  const [custom, setCustom] = useState([]);

  const add = () => {
    const v = input.trim();
    if (!v) return;
    setCustom((c) => [...c, v]);
    setInput('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.heading}>🎡 Karar Çarkı</Text>
        <Text style={styles.sub}>Karar veremiyor musun? Çark senin yerine seçsin.</Text>

        <Text style={styles.section}>Hazır Paketler</Text>
        {CATEGORIES.map((cat) => (
          <Pressable
            key={cat.id}
            style={[styles.card, { backgroundColor: cat.color }]}
            onPress={() => onSelect({ title: cat.title, items: cat.items, color: cat.color })}
          >
            <Text style={styles.cardEmoji}>{cat.emoji}</Text>
            <View style={styles.flex}>
              <Text style={styles.cardTitle}>{cat.title}</Text>
              <Text style={styles.cardSub}>{cat.items.length} seçenek</Text>
            </View>
            <Text style={styles.chev}>›</Text>
          </Pressable>
        ))}

        <Text style={styles.section}>Kendi Çarkını Oluştur</Text>
        <View style={styles.builder}>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="Seçenek ekle…"
              placeholderTextColor="#b2bec3"
              onSubmitEditing={add}
              returnKeyType="done"
            />
            <Pressable style={styles.addBtn} onPress={add}>
              <Text style={styles.addText}>Ekle</Text>
            </Pressable>
          </View>
          <View style={styles.chips}>
            {custom.map((c, i) => (
              <Pressable
                key={`${c}-${i}`}
                style={styles.chip}
                onPress={() => setCustom((arr) => arr.filter((_, j) => j !== i))}
              >
                <Text style={styles.chipText}>{c}  ✕</Text>
              </Pressable>
            ))}
          </View>
          <Pressable
            style={[styles.createBtn, custom.length < 2 && { opacity: 0.4 }]}
            disabled={custom.length < 2}
            onPress={() => onSelect({ title: 'Benim Çarkım', items: custom, color: '#e17055' })}
          >
            <Text style={styles.createText}>
              {custom.length < 2 ? 'En az 2 seçenek ekle' : 'Çarkı Oluştur'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: '#f5f6fa' },
  content: { padding: 20, paddingTop: 70, paddingBottom: 60 },
  heading: { fontSize: 34, fontWeight: '900', color: '#2d3436' },
  sub: { fontSize: 15, color: '#636e72', marginTop: 4 },
  section: { fontSize: 18, fontWeight: '800', color: '#2d3436', marginTop: 28, marginBottom: 12 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 20,
    marginBottom: 12,
    gap: 14,
  },
  cardEmoji: { fontSize: 38 },
  cardTitle: { color: '#fff', fontSize: 20, fontWeight: '800' },
  cardSub: { color: 'rgba(255,255,255,0.85)', marginTop: 2 },
  chev: { color: '#fff', fontSize: 32 },
  builder: { backgroundColor: '#fff', borderRadius: 20, padding: 16 },
  row: { flexDirection: 'row', gap: 10 },
  input: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  addBtn: { backgroundColor: '#2d3436', borderRadius: 12, paddingHorizontal: 18, justifyContent: 'center' },
  addText: { color: '#fff', fontWeight: '700' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginVertical: 14 },
  chip: { backgroundColor: '#dfe6e9', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 6 },
  chipText: { color: '#2d3436' },
  createBtn: { backgroundColor: '#e17055', borderRadius: 14, paddingVertical: 14, alignItems: 'center' },
  createText: { color: '#fff', fontSize: 16, fontWeight: '800' },
});
