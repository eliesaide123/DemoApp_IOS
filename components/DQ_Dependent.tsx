import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DQ_InsuredCard from './DQ_InsuredCard';

export default function DQ_Dependent({item}:any) {
  return (
    <ScrollView style={styles.contractContainer}>
      <View>        
        {Array.isArray(item) && item.length > 0 && (          
          item.map((obj, index) => (
            <DQ_InsuredCard title={obj["insuredData"]} key={index} locked></DQ_InsuredCard>
          ))
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    contractContainer: {
      padding: 12,
      backgroundColor: '#ebebeb',
      flex: 1,
      width: '100%',
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