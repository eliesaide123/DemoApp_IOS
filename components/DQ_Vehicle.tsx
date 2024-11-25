import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Get_CMS_Entry } from '../Shared/CMSSharedFunction';
import { GetEntry } from '../Shared/settings';

export default function DQ_Vehicle({item, suffix}: any) {
  const excludeKeys = ['vehicleNo', 'vehicleData'];

  return (
    <ScrollView style={styles.contractContainer}>
      <View>        
        {typeof item[0] === 'object' && item[0] !== null ? (
          Object.entries(item[0]).map(([key, value]) => (
            !excludeKeys.includes(key) && value !== null && (
              <View key={key} style={styles.contractRow}>
                <Text style={styles.label}>{Get_CMS_Entry(key, suffix, GetEntry().language)}</Text>
                <Text style={styles.value}>{String(value)}</Text>
              </View>
            )
          ))
        ) : (
          <Text>{String(item[0])}</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contractContainer: {
    padding: 12,
    backgroundColor: '#ebebeb',
    flex: 1,
    width:'100%'
  },
  contractRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 9,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
  },
  label: {
    fontWeight: 'bold',
    flex: 1,
  },
  value: {
    flex: 1,
    textAlign: 'right',
  },
});