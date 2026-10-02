import Svg, { Circle, Path } from 'react-native-svg';

// Small 24x24 icon set drawn with react-native-svg (no icon font needed).
const ICONS = {
  crown: { fill: true, d: 'M3 19h18v2H3zM3 7l4.5 4L12 4l4.5 7L21 7l-2 10H5z' },
  sparkle: { fill: true, d: 'M12 2l2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2z' },
  star: { fill: true, d: 'M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z' },
  drop: { fill: true, d: 'M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z' },
  infinity: {
    d: 'M12 12c2-3 3.5-3.5 5-3.5a3.5 3.5 0 0 1 0 7c-1.5 0-3-.5-5-3.5-2-3-3.5-3.5-5-3.5a3.5 3.5 0 0 0 0 7c1.5 0 3-.5 5-3.5z',
  },
  clock: { circle: true, d: 'M12 7v5l3 2' },
  check: { d: 'M5 12.5l4.5 4.5L19 7' },
  play: { fill: true, d: 'M8 5v14l11-7z' },
};

export default function Icon({ name, size = 24, color = '#fff', strokeWidth = 2 }) {
  const icon = ICONS[name];
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {icon.circle && (
        <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth={strokeWidth} fill="none" />
      )}
      <Path
        d={icon.d}
        fill={icon.fill ? color : 'none'}
        stroke={icon.fill ? 'none' : color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
