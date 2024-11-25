import React from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';

interface DQ_LoaderProps {
  loading: boolean;
}

const DQ_Loader: React.FC<DQ_LoaderProps> = (loading) => {
  if (!loading) return null;

  return (
    <View style={styles.loaderContainer}>
      <View style={styles.loaderBox}>
        <ActivityIndicator size="large" color="#00437b" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999, // Ensures loader is on top of other content
  },
  loaderBox: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#000',
  },
});

export default DQ_Loader;
