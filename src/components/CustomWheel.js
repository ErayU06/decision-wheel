import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { G, Path, Text as SvgText, Circle } from 'react-native-svg';
import Animated, {
  Easing,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import * as Haptics from 'expo-haptics';
import { useAudioPlayer } from 'expo-audio';
import { SLICE_COLORS } from '../data/categories';

const tickSound = require('../../assets/sounds/tick.wav');
const winSound = require('../../assets/sounds/win.wav');

const polar = (cx, cy, r, deg) => {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};

const slicePath = (cx, cy, r, start, end) => {
  const a = polar(cx, cy, r, start);
  const b = polar(cx, cy, r, end);
  const large = end - start > 180 ? 1 : 0;
  return `M${cx},${cy} L${a.x},${a.y} A${r},${r} 0 ${large} 1 ${b.x},${b.y} Z`;
};

const CustomWheel = forwardRef(function CustomWheel(
  { items, colors = SLICE_COLORS, size = 320, onResult, onSpinStart },
  ref
) {
  const n = items.length;
  const sliceAngle = 360 / n;
  const rotation = useSharedValue(0);
  const spinning = useRef(false);
  const tick = useAudioPlayer(tickSound);
  const win = useAudioPlayer(winSound);

  const r = size / 2 - 6;
  const c = size / 2;

  const slices = useMemo(
    () =>
      items.map((label, i) => {
        const start = i * sliceAngle;
        const end = start + sliceAngle;
        const mid = start + sliceAngle / 2;
        const textPos = polar(c, c, r * 0.62, mid);
        const text = label.length > 13 ? `${label.slice(0, 12)}…` : label;
        return { label: text, path: slicePath(c, c, r, start, end), mid, textPos, color: colors[i % colors.length] };
      }),
    [items, colors, sliceAngle, c, r]
  );

  const onTick = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    tick.seekTo(0);
    tick.play();
  }, [tick]);

  const finish = useCallback(
    (index) => {
      spinning.current = false;
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      win.seekTo(0);
      win.play();
      onResult?.(items[index], index);
    },
    [items, onResult, win]
  );

  // Fires a haptic/sound tick each time a slice boundary passes the pointer.
  useAnimatedReaction(
    () => Math.floor(rotation.value / sliceAngle),
    (cur, prev) => {
      if (prev !== null && cur !== prev) scheduleOnRN(onTick);
    }
  );

  useImperativeHandle(ref, () => ({
    spin: () => {
      if (spinning.current || n < 2) return;
      spinning.current = true;
      onSpinStart?.();
      const index = Math.floor(Math.random() * n);
      const jitter = (Math.random() - 0.5) * sliceAngle * 0.7;
      const targetMod = (360 - (index * sliceAngle + sliceAngle / 2 + jitter) + 720) % 360;
      const current = rotation.value;
      const base = Math.ceil(current / 360) * 360;
      const final = base + 360 * (5 + Math.floor(Math.random() * 3)) + targetMod;
      rotation.value = withTiming(
        final,
        { duration: 5000, easing: Easing.out(Easing.cubic) },
        (done) => {
          if (done) scheduleOnRN(finish, index);
        }
      );
    },
  }));

  const wheelStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View style={{ width: size, height: size + 24, alignItems: 'center' }}>
      <View style={styles.pointer} />
      <Animated.View style={[{ width: size, height: size, marginTop: 14 }, wheelStyle]}>
        <Svg width={size} height={size}>
          <Circle cx={c} cy={c} r={r + 4} fill="#2D3436" />
          {slices.map((s, i) => (
            <G key={i}>
              <Path d={s.path} fill={s.color} stroke="#fff" strokeWidth={2} />
              <SvgText
                x={s.textPos.x}
                y={s.textPos.y}
                fill="#fff"
                fontSize={n > 10 ? 11 : 13}
                fontWeight="bold"
                textAnchor="middle"
                alignmentBaseline="middle"
                transform={`rotate(${s.mid - 90} ${s.textPos.x} ${s.textPos.y})`}
              >
                {s.label}
              </SvgText>
            </G>
          ))}
          <Circle cx={c} cy={c} r={22} fill="#fff" stroke="#2D3436" strokeWidth={4} />
        </Svg>
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  pointer: {
    position: 'absolute',
    top: 0,
    zIndex: 10,
    width: 0,
    height: 0,
    borderLeftWidth: 14,
    borderRightWidth: 14,
    borderTopWidth: 28,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#2D3436',
  },
});

export default CustomWheel;
