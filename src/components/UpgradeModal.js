import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import ProBadge from './ProBadge';
import { useTheme } from '../theme/ThemeContext';
import { usePro, PRO_HISTORY_LIMIT } from '../premium/ProContext';
import { useLanguage } from '../i18n/LanguageContext';

export default function UpgradeModal() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { upgrade, hideUpgrade, setPro } = usePro();
  const perks = [t('perkWheels'), t('perkHistory', { n: PRO_HISTORY_LIMIT }), t('perkPalettes')];

  return (
    <Modal transparent animationType="fade" visible={!!upgrade} onRequestClose={hideUpgrade}>
      <View style={styles.backdrop}>
        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          <ProBadge style={styles.badge} />
          <Text style={[styles.title, { color: theme.text }]}>{t('upgradeTitle')}</Text>
          {upgrade?.reason ? (
            <Text style={[styles.reason, { color: theme.muted }]}>{upgrade.reason}</Text>
          ) : null}
          <View style={styles.perks}>
            {perks.map((p) => (
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
            <Text style={styles.primaryText}>{t('activatePro')}</Text>
          </Pressable>
          <Pressable onPress={hideUpgrade} hitSlop={10}>
            <Text style={[styles.later, { color: theme.muted }]}>{t('notNow')}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

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
