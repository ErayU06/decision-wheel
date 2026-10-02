import { StyleSheet, Text, View } from 'react-native';

export default function ProBadge({ style }) {
  return (
    <View style={[styles.badge, style]}>
      <Text style={styles.text}>PRO</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#F5A623',
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 2,
    alignSelf: 'center',
  },
  text: { color: '#2d3436', fontSize: 11, fontWeight: '900', letterSpacing: 0.8 },
});
