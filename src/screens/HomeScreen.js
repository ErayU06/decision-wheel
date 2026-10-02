import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { CATEGORIES } from '../data/categories';
import { useTheme } from '../theme/ThemeContext';
import { PALETTES } from '../data/palettes';
import ProBadge from '../components/ProBadge';
import { limitReasons } from '../components/UpgradeModal';
import { FREE_WHEEL_LIMIT, usePro } from '../premium/ProContext';

export default function HomeScreen({
  onSelect,
  onOpenHistory,
  savedWheels,
  onSaveWheel,
  onDeleteWheel,
}) {
  const { theme, toggle } = useTheme();
  const { isPro, setPro, palette, setPaletteId, showUpgrade } = usePro();
  const [title, setTitle] = useState('');
  const [input, setInput] = useState('');
  const [custom, setCustom] = useState([]);

  const add = () => {
    const v = input.trim();
    if (!v) return;
    setCustom((c) => [...c, v]);
    setInput('');
  };

  const ready = custom.length >= 2;
  const wheelTitle = title.trim() || 'Benim Çarkım';

  const save = () => {
    if (!isPro && savedWheels.length >= FREE_WHEEL_LIMIT) {
      showUpgrade(limitReasons.wheels);
      return;
    }
    onSaveWheel({ id: String(Date.now()), title: wheelTitle, items: custom });
    setTitle('');
    setCustom([]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: theme.bg }}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.topBar}>
          <Pressable
            style={[styles.iconBtn, { backgroundColor: theme.surface }]}
            onPress={onOpenHistory}
            accessibilityLabel="Geçmiş"
          >
            <Text style={styles.iconText}>🕘</Text>
          </Pressable>
          <Pressable
            style={[styles.iconBtn, { backgroundColor: theme.surface }]}
            onPress={toggle}
            accessibilityLabel="Temayı değiştir"
          >
            <Text style={styles.iconText}>{theme.mode === 'dark' ? '☀️' : '🌙'}</Text>
          </Pressable>
        </View>

        <Text style={[styles.heading, { color: theme.text }]}>🎡 Karar Çarkı</Text>
        <Text style={[styles.sub, { color: theme.muted }]}>
          Karar veremiyor musun? Çark senin yerine seçsin.
        </Text>

        <View style={[styles.proCard, { backgroundColor: theme.surface }, isPro && styles.proCardOn]}>
          <View style={styles.flex}>
            <View style={styles.proTitleRow}>
              <Text style={[styles.proTitle, { color: theme.text }]}>
                {isPro ? 'Pro aktif' : 'Ücretsiz plan'}
              </Text>
              <ProBadge />
            </View>
            <Text style={[styles.proSub, { color: theme.muted }]}>
              Pro'yu Simüle Et (test anahtarı)
            </Text>
          </View>
          <Switch
            value={isPro}
            onValueChange={setPro}
            trackColor={{ true: '#F5A623' }}
            accessibilityLabel="Pro'yu simüle et"
          />
        </View>

        <Text style={[styles.section, { color: theme.text }]}>Hazır Paketler</Text>
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

        {savedWheels.length > 0 && (
          <>
            <Text style={[styles.section, { color: theme.text }]}>Kayıtlı Çarklarım</Text>
            {savedWheels.map((w) => (
              <Pressable
                key={w.id}
                style={[styles.savedCard, { backgroundColor: theme.surface }]}
                onPress={() => onSelect({ title: w.title, items: w.items, color: '#e17055' })}
              >
                <View style={styles.flex}>
                  <Text style={[styles.savedTitle, { color: theme.text }]}>{w.title}</Text>
                  <Text style={[styles.savedSub, { color: theme.muted }]} numberOfLines={1}>
                    {w.items.length} seçenek · {w.items.join(', ')}
                  </Text>
                </View>
                <Pressable
                  hitSlop={12}
                  onPress={() => onDeleteWheel(w.id)}
                  accessibilityLabel="Çarkı sil"
                >
                  <Text style={[styles.delete, { color: theme.muted }]}>✕</Text>
                </Pressable>
              </Pressable>
            ))}
          </>
        )}

        <Text style={[styles.section, { color: theme.text }]}>Çark Renkleri</Text>
        <View style={styles.palettes}>
          {PALETTES.map((p) => {
            const locked = p.pro && !isPro;
            const active = palette.id === p.id;
            return (
              <Pressable
                key={p.id}
                style={[
                  styles.paletteCard,
                  { backgroundColor: theme.surface, borderColor: active ? '#F5A623' : 'transparent' },
                ]}
                onPress={() => (locked ? showUpgrade(limitReasons.palette) : setPaletteId(p.id))}
              >
                <View style={styles.swatches}>
                  {p.colors.slice(0, 5).map((c, i) => (
                    <View key={i} style={[styles.swatch, { backgroundColor: c }]} />
                  ))}
                </View>
                <View style={styles.paletteLabel}>
                  <Text style={[styles.paletteName, { color: theme.text }]}>{p.name}</Text>
                  {p.pro && <ProBadge />}
                </View>
                {locked && <Text style={styles.lockIcon}>🔒</Text>}
              </Pressable>
            );
          })}
        </View>

        <Text style={[styles.section, { color: theme.text }]}>Kendi Çarkını Oluştur</Text>
        <View style={[styles.builder, { backgroundColor: theme.surface }]}>
          <TextInput
            style={[styles.input, styles.titleInput, { backgroundColor: theme.inputBg, color: theme.text }]}
            value={title}
            onChangeText={setTitle}
            placeholder="Çark başlığı (ör. Hafta sonu planı)"
            placeholderTextColor={theme.placeholder}
          />
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.flex, { backgroundColor: theme.inputBg, color: theme.text }]}
              value={input}
              onChangeText={setInput}
              placeholder="Seçenek ekle…"
              placeholderTextColor={theme.placeholder}
              onSubmitEditing={add}
              returnKeyType="done"
            />
            <Pressable style={[styles.addBtn, { backgroundColor: theme.accent }]} onPress={add}>
              <Text style={[styles.addText, { color: theme.accentText }]}>Ekle</Text>
            </Pressable>
          </View>
          <View style={styles.chips}>
            {custom.map((c, i) => (
              <Pressable
                key={`${c}-${i}`}
                style={[styles.chip, { backgroundColor: theme.chip }]}
                onPress={() => setCustom((arr) => arr.filter((_, j) => j !== i))}
              >
                <Text style={{ color: theme.text }}>{c}  ✕</Text>
              </Pressable>
            ))}
          </View>
          {!isPro && (
            <View style={styles.quota}>
              <Text style={[styles.quotaText, { color: theme.muted }]}>
                Kayıtlı çark: {Math.min(savedWheels.length, FREE_WHEEL_LIMIT)}/{FREE_WHEEL_LIMIT}
              </Text>
              {savedWheels.length >= FREE_WHEEL_LIMIT && <ProBadge />}
            </View>
          )}
          <View style={styles.row}>
            <Pressable
              style={[styles.saveBtn, { borderColor: theme.muted }, !ready && styles.disabled]}
              disabled={!ready}
              onPress={save}
            >
              <Text style={[styles.saveText, { color: theme.text }]}>Kaydet</Text>
            </Pressable>
            <Pressable
              style={[styles.createBtn, !ready && styles.disabled]}
              disabled={!ready}
              onPress={() => onSelect({ title: wheelTitle, items: custom, color: '#e17055' })}
            >
              <Text style={styles.createText}>
                {ready ? 'Çarkı Çevir' : 'En az 2 seçenek ekle'}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { padding: 20, paddingTop: 60, paddingBottom: 60 },
  topBar: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10, marginBottom: 8 },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: { fontSize: 20 },
  heading: { fontSize: 34, fontWeight: '900' },
  sub: { fontSize: 15, marginTop: 4 },
  section: { fontSize: 18, fontWeight: '800', marginTop: 28, marginBottom: 12 },
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
  savedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
    gap: 12,
    borderLeftWidth: 5,
    borderLeftColor: '#e17055',
  },
  savedTitle: { fontSize: 17, fontWeight: '700' },
  savedSub: { marginTop: 2, fontSize: 13 },
  delete: { fontSize: 18, paddingHorizontal: 4 },
  builder: { borderRadius: 20, padding: 16 },
  row: { flexDirection: 'row', gap: 10 },
  input: {
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  titleInput: { marginBottom: 10 },
  addBtn: { borderRadius: 12, paddingHorizontal: 18, justifyContent: 'center' },
  addText: { fontWeight: '700' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginVertical: 14 },
  chip: { borderRadius: 16, paddingHorizontal: 12, paddingVertical: 6 },
  saveBtn: {
    borderWidth: 1.5,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  saveText: { fontSize: 16, fontWeight: '800' },
  createBtn: {
    flex: 1,
    backgroundColor: '#e17055',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  createText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  disabled: { opacity: 0.4 },
  proCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  proCardOn: { borderColor: '#F5A623' },
  proTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  proTitle: { fontSize: 17, fontWeight: '800' },
  proSub: { marginTop: 2, fontSize: 13 },
  palettes: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  paletteCard: {
    width: '48%',
    borderRadius: 16,
    padding: 12,
    borderWidth: 2,
    gap: 10,
  },
  swatches: { flexDirection: 'row', gap: 4 },
  swatch: { flex: 1, height: 22, borderRadius: 6 },
  paletteLabel: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  paletteName: { fontWeight: '700', fontSize: 15 },
  lockIcon: { position: 'absolute', right: 10, top: 8, fontSize: 14 },
  quota: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  quotaText: { fontSize: 13, fontWeight: '600' },
});
