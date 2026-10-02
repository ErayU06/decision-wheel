import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from './Icons';
import { useTheme } from '../theme/ThemeContext';
import { usePro, PRO_HISTORY_LIMIT } from '../premium/ProContext';
import { useLanguage } from '../i18n/LanguageContext';

export default function UpgradeModal() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { upgrade, hideUpgrade, setPro } = usePro();

  const perks = [
    {
      icon: 'infinity',
      colors: ['#7C3AED', '#A855F7'],
      title: t('perkWheels'),
      sub: t('perkWheelsSub'),
    },
    {
      icon: 'clock',
      colors: ['#0EA5E9', '#6366F1'],
      title: t('perkHistory', { n: PRO_HISTORY_LIMIT }),
      sub: t('perkHistorySub'),
    },
    {
      icon: 'drop',
      colors: ['#F59E0B', '#EF4444'],
      title: t('perkPalettes'),
      sub: t('perkPalettesSub'),
    },
  ];

  return (
    <Modal transparent animationType="fade" visible={!!upgrade} onRequestClose={hideUpgrade}>
      <View style={styles.backdrop}>
        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <LinearGradient
              colors={['#6D28D9', '#DB2777', '#F97316']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.hero}
            >
              <Pressable
                style={styles.closeBtn}
                onPress={hideUpgrade}
                hitSlop={12}
                accessibilityLabel={t('close')}
              >
                <Text style={styles.closeText}>✕</Text>
              </Pressable>

              <View style={[styles.spark, { top: 22, left: 26 }]}>
                <Icon name="sparkle" size={16} color="rgba(255,255,255,0.7)" />
              </View>
              <View style={[styles.spark, { top: 60, right: 40 }]}>
                <Icon name="sparkle" size={22} color="rgba(255,255,255,0.55)" />
              </View>
              <View style={[styles.spark, { bottom: 24, left: 46 }]}>
                <Icon name="sparkle" size={12} color="rgba(255,255,255,0.6)" />
              </View>

              <View style={styles.crownRing}>
                <View style={styles.crownCircle}>
                  <Icon name="crown" size={38} color="#FBBF24" />
                </View>
              </View>
              <Text style={styles.heroTitle}>{t('upgradeTitle')}</Text>
              <Text style={styles.heroTagline}>{t('paywallTagline')}</Text>
            </LinearGradient>

            <View style={styles.body}>
              {upgrade?.reason ? (
                <View style={[styles.reason, { backgroundColor: theme.inputBg }]}>
                  <Text style={styles.reasonIcon}>🔒</Text>
                  <Text style={[styles.reasonText, { color: theme.text }]}>{upgrade.reason}</Text>
                </View>
              ) : null}

              <View style={styles.perks}>
                {perks.map((p) => (
                  <View key={p.icon} style={styles.perkRow}>
                    <LinearGradient colors={p.colors} style={styles.perkIcon}>
                      <Icon name={p.icon} size={22} color="#fff" />
                    </LinearGradient>
                    <View style={styles.flex}>
                      <Text style={[styles.perkTitle, { color: theme.text }]}>{p.title}</Text>
                      <Text style={[styles.perkSub, { color: theme.muted }]}>{p.sub}</Text>
                    </View>
                    <View style={styles.checkBadge}>
                      <Icon name="check" size={14} color="#fff" strokeWidth={3} />
                    </View>
                  </View>
                ))}
              </View>

              <Pressable
                style={styles.ctaShadow}
                onPress={() => {
                  setPro(true);
                  hideUpgrade();
                }}
              >
                <LinearGradient
                  colors={['#FBBF24', '#F59E0B', '#F97316']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.cta}
                >
                  <Icon name="crown" size={20} color="#2d3436" />
                  <Text style={styles.ctaText}>{t('activatePro')}</Text>
                </LinearGradient>
              </Pressable>

              <Pressable onPress={hideUpgrade} hitSlop={10}>
                <Text style={[styles.later, { color: theme.muted }]}>{t('notNow')}</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(8,6,20,0.72)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxHeight: '92%',
    borderRadius: 30,
    overflow: 'hidden',
  },
  hero: { alignItems: 'center', paddingTop: 34, paddingBottom: 28, paddingHorizontal: 24 },
  closeBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  closeText: { color: '#fff', fontSize: 13, fontWeight: '800' },
  spark: { position: 'absolute' },
  crownRing: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  crownCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(30,10,60,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTitle: { color: '#fff', fontSize: 30, fontWeight: '900', marginTop: 16 },
  heroTagline: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
  },
  body: { padding: 22 },
  reason: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 18,
  },
  reasonIcon: { fontSize: 16 },
  reasonText: { flex: 1, fontSize: 14, fontWeight: '600' },
  perks: { gap: 16 },
  perkRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  perkIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  perkTitle: { fontSize: 16, fontWeight: '800' },
  perkSub: { fontSize: 13, marginTop: 2 },
  checkBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaShadow: {
    marginTop: 26,
    borderRadius: 18,
    shadowColor: '#F59E0B',
    shadowOpacity: 0.45,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderRadius: 18,
    paddingVertical: 16,
  },
  ctaText: { color: '#2d3436', fontSize: 18, fontWeight: '900' },
  later: { marginTop: 16, fontSize: 15, textAlign: 'center', fontWeight: '600' },
});
