// Inside DQ_Loader Component (renaming from DQ_Button)

import React from 'react';
import { Text, Pressable, StyleSheet, View, ActivityIndicator } from 'react-native';

interface DQLoaderProps {
  title: string;
  onPress: () => void;
  loading?: boolean; // Add loading prop
}

const DQ_LoaderBtn: React.FC<DQLoaderProps> = ({ title, onPress, loading = false }) => {
  return (
    <Pressable
      style={[styles.button, { opacity: loading ? 0.5 : 1 }]} // Disable button during loading
      onPress={onPress}
      disabled={loading} // Disable button while loading
    >
      {loading ? (
        <ActivityIndicator size="small" color="#0160ae" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ffbe23',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily:'Nexa Bold'
  },
});

export default DQ_LoaderBtn;
