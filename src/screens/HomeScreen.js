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
import { LinearGradient } from 'expo-linear-gradient';
import { CATEGORIES } from '../data/categories';
import { useTheme } from '../theme/ThemeContext';
import { PALETTES } from '../data/palettes';
import ProBadge from '../components/ProBadge';
import Icon from '../components/Icons';
import { FREE_WHEEL_LIMIT, usePro } from '../premium/ProContext';
import { useLanguage } from '../i18n/LanguageContext';

const SAVED_GRADIENTS = [
  ['#F2709C', '#FF9472'],
  ['#667EEA', '#764BA2'],
  ['#11998E', '#38A169'],
  ['#F5576C', '#A855F7'],
];

export default function HomeScreen({
  onSelect,
  onOpenHistory,
  savedWheels,
  onSaveWheel,
  onDeleteWheel,
}) {
  const { theme, toggle } = useTheme();
  const { t, lang, toggleLang, pick } = useLanguage();
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
  const wheelTitle = title.trim() || t('myWheel');

  const save = () => {
    if (!isPro && savedWheels.length >= FREE_WHEEL_LIMIT) {
      showUpgrade(t('limitWheels', { n: FREE_WHEEL_LIMIT }));
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
            style={[styles.langBtn, { backgroundColor: theme.surface }]}
            onPress={toggleLang}
            accessibilityLabel={t('a11yLanguage')}
          >
            <Text style={styles.iconText}>{lang === 'tr' ? '🇹🇷' : '🇬🇧'}</Text>
            <Text style={[styles.langText, { color: theme.text }]}>{lang.toUpperCase()}</Text>
          </Pressable>
          <Pressable
            style={[styles.iconBtn, { backgroundColor: theme.surface }]}
            onPress={onOpenHistory}
            accessibilityLabel={t('a11yHistory')}
          >
            <Text style={styles.iconText}>🕘</Text>
          </Pressable>
          <Pressable
            style={[styles.iconBtn, { backgroundColor: theme.surface }]}
            onPress={toggle}
            accessibilityLabel={t('a11yTheme')}
          >
            <Text style={styles.iconText}>{theme.mode === 'dark' ? '☀️' : '🌙'}</Text>
          </Pressable>
        </View>

        <Text style={[styles.heading, { color: theme.text }]}>{t('appTitle')}</Text>
        <Text style={[styles.sub, { color: theme.muted }]}>{t('appSubtitle')}</Text>

        {/* 1. Create your own wheel — first thing the user sees */}
        <View style={[styles.builder, { backgroundColor: theme.surface }]}>
          <LinearGradient
            colors={['#FF7A59', '#E1306C']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.builderBanner}
          >
            <View style={styles.bannerIcon}>
              <Icon name="sparkle" size={22} color="#fff" />
            </View>
            <View style={styles.flex}>
              <Text style={styles.bannerTitle}>{t('createOwn')}</Text>
              <Text style={styles.bannerSub}>{t('createSub')}</Text>
            </View>
          </LinearGradient>

          <View style={styles.builderBody}>
            <TextInput
              style={[styles.input, styles.titleInput, { backgroundColor: theme.inputBg, color: theme.text }]}
              value={title}
              onChangeText={setTitle}
              placeholder={t('wheelTitlePlaceholder')}
              placeholderTextColor={theme.placeholder}
            />
            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.flex, { backgroundColor: theme.inputBg, color: theme.text }]}
                value={input}
                onChangeText={setInput}
                placeholder={t('addOptionPlaceholder')}
                placeholderTextColor={theme.placeholder}
                onSubmitEditing={add}
                returnKeyType="done"
              />
              <Pressable style={[styles.addBtn, { backgroundColor: theme.accent }]} onPress={add}>
                <Text style={[styles.addText, { color: theme.accentText }]}>{t('add')}</Text>
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
                  {t('savedQuota', {
                    n: Math.min(savedWheels.length, FREE_WHEEL_LIMIT),
                    max: FREE_WHEEL_LIMIT,
                  })}
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
                <Text style={[styles.saveText, { color: theme.text }]}>{t('save')}</Text>
              </Pressable>
              <Pressable
                style={[styles.createBtn, !ready && styles.disabled]}
                disabled={!ready}
                onPress={() => onSelect({ title: wheelTitle, items: custom, color: '#e17055' })}
              >
                <Text style={styles.createText}>
                  {ready ? t('spinWheel') : t('addAtLeastTwo')}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* 2. Saved wheels — prominent cards above the presets */}
        {savedWheels.length > 0 && (
          <>
            <View style={styles.savedHeader}>
              <Icon name="star" size={20} color="#F5A623" />
              <Text style={[styles.savedHeading, { color: theme.text }]}>{t('savedWheels')}</Text>
              <View style={styles.countPill}>
                <Text style={styles.countText}>{savedWheels.length}</Text>
              </View>
            </View>
            <Text style={[styles.savedSub, { color: theme.muted }]}>{t('savedWheelsSub')}</Text>
            {savedWheels.map((w, idx) => (
              <Pressable
                key={w.id}
                onPress={() =>
                  onSelect({
                    title: w.title,
                    items: w.items,
                    color: SAVED_GRADIENTS[idx % SAVED_GRADIENTS.length][0],
                  })
                }
                style={styles.savedShadow}
              >
                <LinearGradient
                  colors={SAVED_GRADIENTS[idx % SAVED_GRADIENTS.length]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.savedCard}
                >
                  <View style={styles.savedTop}>
                    <View style={styles.flex}>
                      <Text style={styles.savedTitle} numberOfLines={1}>{w.title}</Text>
                      <Text style={styles.savedCount}>
                        {t('optionsCount', { n: w.items.length })}
                      </Text>
                    </View>
                    <Pressable
                      hitSlop={12}
                      onPress={() => onDeleteWheel(w.id)}
                      style={styles.deleteBtn}
                      accessibilityLabel={t('a11yDeleteWheel')}
                    >
                      <Text style={styles.deleteText}>✕</Text>
                    </Pressable>
                  </View>
                  <View style={styles.savedChips}>
                    {w.items.slice(0, 3).map((it, i) => (
                      <View key={`${it}-${i}`} style={styles.savedChip}>
                        <Text style={styles.savedChipText} numberOfLines={1}>{it}</Text>
                      </View>
                    ))}
                    {w.items.length > 3 && (
                      <View style={styles.savedChip}>
                        <Text style={styles.savedChipText}>
                          {t('moreOptions', { n: w.items.length - 3 })}
                        </Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.spinPill}>
                    <Icon name="play" size={14} color="#2d3436" />
                    <Text style={styles.spinPillText}>{t('spinShort')}</Text>
                  </View>
                </LinearGradient>
              </Pressable>
            ))}
          </>
        )}

        {/* 3. Presets */}
        <Text style={[styles.section, { color: theme.text }]}>{t('presets')}</Text>
        {CATEGORIES.map((cat) => (
          <Pressable
            key={cat.id}
            style={[styles.card, { backgroundColor: cat.color }]}
            onPress={() =>
              onSelect({ title: pick(cat.title), items: pick(cat.items), color: cat.color })
            }
          >
            <Text style={styles.cardEmoji}>{cat.emoji}</Text>
            <View style={styles.flex}>
              <Text style={styles.cardTitle}>{pick(cat.title)}</Text>
              <Text style={styles.cardSub}>{t('optionsCount', { n: pick(cat.items).length })}</Text>
            </View>
            <Text style={styles.chev}>›</Text>
          </Pressable>
        ))}

        <Text style={[styles.section, { color: theme.text }]}>{t('wheelColors')}</Text>
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
                onPress={() => (locked ? showUpgrade(t('limitPalette')) : setPaletteId(p.id))}
              >
                <View style={styles.swatches}>
                  {p.colors.slice(0, 5).map((c, i) => (
                    <View key={i} style={[styles.swatch, { backgroundColor: c }]} />
                  ))}
                </View>
                <View style={styles.paletteLabel}>
                  <Text style={[styles.paletteName, { color: theme.text }]}>{pick(p.name)}</Text>
                  {p.pro && <ProBadge />}
                </View>
                {locked && <Text style={styles.lockIcon}>🔒</Text>}
              </Pressable>
            );
          })}
        </View>

        {/* Pro test switch (mock until IAP is wired up) */}
        <View style={[styles.proCard, { backgroundColor: theme.surface }, isPro && styles.proCardOn]}>
          <View style={styles.flex}>
            <View style={styles.proTitleRow}>
              <Text style={[styles.proTitle, { color: theme.text }]}>
                {isPro ? t('proActive') : t('freePlan')}
              </Text>
              <ProBadge />
            </View>
            <Text style={[styles.proSub, { color: theme.muted }]}>{t('simulatePro')}</Text>
          </View>
          <Switch
            value={isPro}
            onValueChange={setPro}
            trackColor={{ true: '#F5A623' }}
            accessibilityLabel={t('a11ySimulatePro')}
          />
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
  langBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 42,
    borderRadius: 21,
    paddingHorizontal: 12,
  },
  langText: { fontSize: 14, fontWeight: '800' },
  heading: { fontSize: 34, fontWeight: '900' },
  sub: { fontSize: 15, marginTop: 4 },
  section: { fontSize: 18, fontWeight: '800', marginTop: 28, marginBottom: 12 },

  // Create section
  builder: { borderRadius: 22, marginTop: 22, overflow: 'hidden' },
  builderBanner: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16 },
  bannerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerTitle: { color: '#fff', fontSize: 18, fontWeight: '900' },
  bannerSub: { color: 'rgba(255,255,255,0.9)', fontSize: 13, marginTop: 2 },
  builderBody: { padding: 16 },
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
  quota: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  quotaText: { fontSize: 13, fontWeight: '600' },
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

  // Saved wheels
  savedHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 28 },
  savedHeading: { fontSize: 22, fontWeight: '900' },
  countPill: {
    backgroundColor: '#F5A623',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 1,
  },
  countText: { color: '#2d3436', fontSize: 12, fontWeight: '900' },
  savedSub: { fontSize: 13, marginTop: 2, marginBottom: 12 },
  savedShadow: {
    marginBottom: 14,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  savedCard: { borderRadius: 24, padding: 18 },
  savedTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  savedTitle: { color: '#fff', fontSize: 24, fontWeight: '900' },
  savedCount: { color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: '600', marginTop: 2 },
  deleteBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: { color: '#fff', fontSize: 13, fontWeight: '800' },
  savedChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 14 },
  savedChip: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    maxWidth: '60%',
  },
  savedChipText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  spinPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 14,
  },
  spinPillText: { color: '#2d3436', fontSize: 15, fontWeight: '900' },

  // Presets
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

  // Palettes
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

  // Pro switch
  proCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 28,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  proCardOn: { borderColor: '#F5A623' },
  proTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  proTitle: { fontSize: 17, fontWeight: '800' },
  proSub: { marginTop: 2, fontSize: 13 },
});
