import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import ProBadge from '../components/ProBadge';
import { FREE_HISTORY_LIMIT, usePro } from '../premium/ProContext';
import { useLanguage } from '../i18n/LanguageContext';

const formatDate = (iso, locale) =>
  new Date(iso).toLocaleString(locale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

export default function HistoryScreen({ history, onClear, onBack }) {
  const { theme } = useTheme();
  const { t, locale } = useLanguage();
  const { isPro, showUpgrade } = usePro();
  const visible = isPro ? history : history.slice(0, FREE_HISTORY_LIMIT);
  const hidden = history.length - visible.length;

  const confirmClear = () =>
    Alert.alert(t('clearHistoryTitle'), t('clearHistoryMessage'), [
      { text: t('cancel'), style: 'cancel' },
      { text: t('clear'), style: 'destructive', onPress: onClear },
    ]);

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={styles.header}>
        <Pressable onPress={onBack} hitSlop={12}>
          <Text style={[styles.back, { color: theme.text }]}>{t('back')}</Text>
        </Pressable>
        <Text style={[styles.title, { color: theme.text }]}>{t('history')}</Text>
        <Pressable onPress={confirmClear} disabled={history.length === 0} hitSlop={12}>
          <Text style={[styles.clear, history.length === 0 && styles.disabled]}>{t('clear')}</Text>
        </Pressable>
      </View>

      <FlatList
        data={visible}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListFooterComponent={
          hidden > 0 ? (
            <Pressable
              style={[styles.lock, { borderColor: '#F5A623' }]}
              onPress={() => showUpgrade(t('limitHistory', { n: FREE_HISTORY_LIMIT }))}
            >
              <ProBadge />
              <Text style={[styles.lockText, { color: theme.text }]}>
                {t('historyLocked', { n: hidden })}
              </Text>
            </Pressable>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🎡</Text>
            <Text style={[styles.emptyText, { color: theme.muted }]}>
              {t('historyEmpty')}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: theme.surface }]}>
            <Text style={[styles.result, { color: theme.text }]}>{item.result}</Text>
            <Text style={[styles.meta, { color: theme.muted }]}>
              {item.wheelTitle} · {formatDate(item.date, locale)}
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
  lock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: 16,
    marginTop: 4,
  },
  lockText: { flex: 1, fontSize: 14, fontWeight: '600' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30 },
  emptyEmoji: { fontSize: 56 },
  emptyText: { marginTop: 12, textAlign: 'center', fontSize: 16 },
});
