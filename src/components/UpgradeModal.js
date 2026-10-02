import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import ProBadge from './ProBadge';
import { useTheme } from '../theme/ThemeContext';
import { usePro, FREE_HISTORY_LIMIT, FREE_WHEEL_LIMIT, PRO_HISTORY_LIMIT } from '../premium/ProContext';

const PERKS = [
  'Sınırsız özel çark kaydet',
  `Tüm geçmişe eriş (son ${PRO_HISTORY_LIMIT})`,
  'Özel çark renk paletleri',
];

export default function UpgradeModal() {
  const { theme } = useTheme();
  const { upgrade, hideUpgrade, setPro } = usePro();

  return (
    <Modal transparent animationType="fade" visible={!!upgrade} onRequestClose={hideUpgrade}>
      <View style={styles.backdrop}>
        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          <ProBadge style={styles.badge} />
          <Text style={[styles.title, { color: theme.text }]}>Pro'ya Yükselt</Text>
          {upgrade?.reason ? (
            <Text style={[styles.reason, { color: theme.muted }]}>{upgrade.reason}</Text>
          ) : null}
          <View style={styles.perks}>
            {PERKS.map((p) => (
              <Text key={p} style={[styles.perk, { color: theme.text }]}>✓  {p}</Text>
            ))}
          </View>
          <Pressable
            style={styles.primary}
            onPress={() => {
              setPro(true);
              hideUpgrade();
            }}
          >
            <Text style={styles.primaryText}>Pro'yu Etkinleştir (Test)</Text>
          </Pressable>
          <Pressable onPress={hideUpgrade} hitSlop={10}>
            <Text style={[styles.later, { color: theme.muted }]}>Şimdi Değil</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export const limitReasons = {
  wheels: `Ücretsiz hesapta en fazla ${FREE_WHEEL_LIMIT} özel çark kaydedebilirsin.`,
  history: `Ücretsiz hesapta yalnızca son ${FREE_HISTORY_LIMIT} kayıt görünür.`,
  palette: 'Özel renk paletleri Pro kullanıcılara özel.',
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: { width: '100%', borderRadius: 28, padding: 26, alignItems: 'center' },
  badge: { paddingHorizontal: 12, paddingVertical: 4 },
  title: { fontSize: 26, fontWeight: '900', marginTop: 12 },
  reason: { fontSize: 15, textAlign: 'center', marginTop: 8 },
  perks: { alignSelf: 'stretch', marginVertical: 18, gap: 8 },
  perk: { fontSize: 16, fontWeight: '600' },
  primary: {
    backgroundColor: '#F5A623',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 28,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  primaryText: { color: '#2d3436', fontSize: 17, fontWeight: '900' },
  later: { marginTop: 16, fontSize: 15 },
});
