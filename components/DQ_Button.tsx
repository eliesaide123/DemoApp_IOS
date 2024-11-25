import React from 'react';
import {Pressable, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function DQ_Button({
  title,
  onPress,
  backgroundColor = '#ffbe23',
  textColor = '#FFFFFF',
  fontFamily = 'Nexa Regular',
  fontSize,
  loading = false
}: any) {
  return (
    <Pressable
      style={({pressed}) => [
        styles.button,
        {backgroundColor: pressed ? '#ffcc22' : backgroundColor, opacity: loading ? 0.5 : 1},
      ]}
      onPress={onPress}
      disabled={loading}
      >
      {loading ? (
                <ActivityIndicator size="small" color="#0160ae" />
            ) : (
      <Text style={[styles.buttonText, {color: textColor, fontFamily, fontSize}]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16
  },
});
