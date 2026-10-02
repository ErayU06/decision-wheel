import { useEffect, useRef, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import CustomWheel from '../components/CustomWheel';
import { useTheme } from '../theme/ThemeContext';
import { usePro } from '../premium/ProContext';
import { useLanguage } from '../i18n/LanguageContext';

const CONFETTI = ['🎉', '🎊', '✨', '🥳', '🎈', '⭐'];

// One-shot confetti: falls once and fades out, so nothing keeps moving behind the result.
function Confetti({ index }) {
  const y = useSharedValue(-40);
  const opacity = useSharedValue(1);
  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: y.value }],
  }));
  useEffect(() => {
    const duration = 2200 + (index % 5) * 300;
    y.value = withTiming(700, { duration });
    opacity.value = withDelay(duration * 0.6, withTiming(0, { duration: duration * 0.4 }));
  }, [index, y, opacity]);
  return (
    <Animated.Text
      style={[styles.confetti, { left: `${(index * 53) % 95}%` }, style]}
    >
      {CONFETTI[index % CONFETTI.length]}
    </Animated.Text>
  );
}

function ResultModal({ result, onClose, onAgain }) {
  const { theme } = useTheme();
  const { t } = useLanguage();
  // Pops in once and then stays perfectly still.
  const scale = useSharedValue(0.85);
  useEffect(() => {
    scale.value = withSpring(1, { damping: 16, stiffness: 180 });
  }, [scale]);
  const cardStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Modal transparent animationType="fade" visible onRequestClose={onClose}>
      <View style={styles.backdrop}>
        {Array.from({ length: 24 }, (_, i) => (
          <Confetti key={i} index={i} />
        ))}
        <Animated.View style={[styles.card, { backgroundColor: theme.surface }, cardStyle]}>
          <Text style={styles.cardEmoji}>🎉</Text>
          <Text style={[styles.cardLabel, { color: theme.muted }]}>{t('decisionMade')}</Text>
          <Text style={[styles.cardResult, { color: theme.text }]}>{result}</Text>
          <Pressable style={styles.primaryBtn} onPress={onAgain}>
            <Text style={styles.primaryText}>{t('spinAgain')}</Text>
          </Pressable>
          <Pressable onPress={onClose}>
            <Text style={[styles.link, { color: theme.muted }]}>{t('close')}</Text>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
}

export default function WheelScreen({ title, items, color = '#6C5CE7', onResult, onBack }) {
  const { palette } = usePro();
  const { t } = useLanguage();
  const wheelRef = useRef(null);
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);

  const spin = () => {
    setResult(null);
    wheelRef.current?.spin();
  };

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Pressable onPress={onBack} style={styles.back}>
        <Text style={styles.backText}>{t('back')}</Text>
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.wheelWrap}>
        <CustomWheel
          ref={wheelRef}
          items={items}
          colors={palette.colors}
          onSpinStart={() => setBusy(true)}
          onResult={(item) => {
            setBusy(false);
            setResult(item);
            onResult?.(item);
          }}
        />
      </View>
      <Pressable
        style={[styles.spinBtn, busy && { opacity: 0.5 }]}
        disabled={busy}
        onPress={spin}
      >
        <Text style={[styles.spinText, { color }]}>{busy ? t('spinning') : t('spin')}</Text>
      </Pressable>
      {result && (
        <ResultModal result={result} onClose={() => setResult(null)} onAgain={spin} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 60 },
  back: { position: 'absolute', top: 56, left: 20 },
  backText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  title: { color: '#fff', fontSize: 28, fontWeight: '800', marginTop: 36, marginBottom: 24, paddingHorizontal: 20, textAlign: 'center' },
  wheelWrap: { flex: 1, justifyContent: 'center' },
  spinBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 56,
    paddingVertical: 16,
    borderRadius: 40,
    marginBottom: 56,
    elevation: 4,
  },
  spinText: { fontSize: 22, fontWeight: '900', letterSpacing: 1 },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  confetti: { position: 'absolute', top: 0, fontSize: 28 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 28,
    padding: 32,
    width: '80%',
    alignItems: 'center',
  },
  cardEmoji: { fontSize: 64 },
  cardLabel: { fontSize: 16, color: '#636e72', marginTop: 8 },
  cardResult: {
    fontSize: 32,
    fontWeight: '900',
    color: '#2d3436',
    textAlign: 'center',
    marginVertical: 16,
  },
  primaryBtn: {
    backgroundColor: '#6C5CE7',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 30,
  },
  primaryText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  link: { color: '#636e72', marginTop: 16, fontSize: 16 },
});
