import Icon from '@react-native-vector-icons/fontawesome6';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const DQ_GoButton = ({ title, count = 0, press }: any) => {
  
  return (
    <View style={[styles.cardBorder]}>
      <TouchableOpacity onPress={press}>
        <View style={styles.InlineElements}>
          <Text style={[styles.textFormat]}>{title}</Text>
          <View style={styles.InlineElements}>
            <View
              style={[
                styles.bubble,
                { backgroundColor: count > 0 ? '#f06e1e' : '#0160ae' },
              ]}
            >
              <Text style={styles.whiteText}>{count}</Text>
            </View>
             <View>
              <Icon name="chevron-right" size={14} color={count > 0 ? 'black' : 'white'} iconStyle="solid" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardBorder: {
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
    padding: 15,
  },
  InlineElements: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },
  bubble: {
    width: 24, // Adjust width for a better fit
    height: 24, // Adjust height for a better fit
    borderRadius: 12, // Circle shape
    justifyContent: 'center',
    alignItems: 'center', // Center text inside the bubble
  },
  whiteText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 13,
  },
  textFormat: {
    fontWeight: '600',
    color: 'black',
  },
});

export default DQ_GoButton;
