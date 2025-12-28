import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const TaskTableSkeleton = () => {
  return (
    <View style={{ padding: 15 }}>
      {[1, 2, 3, 4].map((i) => (
        <View key={i} style={styles.skeletonCard}>
          <View style={styles.circle} />
          <View style={styles.lines}>
            <View style={styles.lineLarge} />
            <View style={styles.lineSmall} />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonCard: { flexDirection: 'row', backgroundColor: '#eee', padding: 15, borderRadius: 12, marginBottom: 10, alignItems: 'center' },
  circle: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#ddd' },
  lines: { flex: 1, marginLeft: 15 },
  lineLarge: { width: '70%', height: 12, backgroundColor: '#ddd', borderRadius: 4, marginBottom: 8 },
  lineSmall: { width: '40%', height: 10, backgroundColor: '#ddd', borderRadius: 4 }
});

export default TaskTableSkeleton;