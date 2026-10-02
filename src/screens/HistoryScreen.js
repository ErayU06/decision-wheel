import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

const formatDate = (iso) =>
  new Date(iso).toLocaleString('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

export default function HistoryScreen({ history, onClear, onBack }) {
  const { theme } = useTheme();

  const confirmClear = () =>
    Alert.alert('Geçmişi temizle', 'Tüm geçmiş kayıtları silinecek.', [
      { text: 'Vazgeç', style: 'cancel' },
      { text: 'Temizle', style: 'destructive', onPress: onClear },
    ]);

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={styles.header}>
        <Pressable onPress={onBack} hitSlop={12}>
          <Text style={[styles.back, { color: theme.text }]}>‹ Geri</Text>
        </Pressable>
        <Text style={[styles.title, { color: theme.text }]}>Geçmiş</Text>
        <Pressable onPress={confirmClear} disabled={history.length === 0} hitSlop={12}>
          <Text style={[styles.clear, history.length === 0 && styles.disabled]}>Temizle</Text>
        </Pressable>
      </View>

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🎡</Text>
            <Text style={[styles.emptyText, { color: theme.muted }]}>
              Henüz bir sonuç yok. Çarkı çevir, kararlar burada birikir!
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: theme.surface }]}>
            <Text style={[styles.result, { color: theme.text }]}>{item.result}</Text>
            <Text style={[styles.meta, { color: theme.muted }]}>
              {item.wheelTitle} · {formatDate(item.date)}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  back: { fontSize: 18, fontWeight: '600' },
  title: { fontSize: 22, fontWeight: '800' },
  clear: { color: '#d63031', fontSize: 16, fontWeight: '700' },
  disabled: { opacity: 0.35 },
  list: { padding: 20, paddingTop: 8, flexGrow: 1 },
  item: { padding: 16, borderRadius: 16, marginBottom: 10 },
  result: { fontSize: 20, fontWeight: '800' },
  meta: { marginTop: 4, fontSize: 13 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30 },
  emptyEmoji: { fontSize: 56 },
  emptyText: { marginTop: 12, textAlign: 'center', fontSize: 16 },
});
