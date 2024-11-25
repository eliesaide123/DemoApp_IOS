import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DQ_Paragraph from './DQ_Paragraph';
import { Get_CMS_Entry } from '../Shared/CMSSharedFunction'
import { GetEntry } from '../Shared/settings';

export default function DQ_Contract({
  item,
  contractAdditional,
  groupCode,
  suffix
}: any) {
  const excludeKeys = [
    'firstInception',
    'canRenewPolicy',
    'canPrintPolicy',
    'canPrintAlpSoa',
    'hasLegalAddress',
    'hasBeneficiary',
    'hasDuePremiums',
    'hasClaims',
    'hasPendingRequests',
  ];
  return (
    <ScrollView
      style={styles.contractContainer}
      contentContainerStyle={styles.scrollContent}>
      <View>
        {typeof item[0] === 'object' && item[0] !== null ? (
          Object.entries(item[0]).map(
            ([key, value]) =>
              !excludeKeys.includes(key) &&
              value !== null && (
                <View key={key} style={styles.contractRow}>
                  <Text style={styles.label}>{Get_CMS_Entry(key, suffix, GetEntry().language)}</Text>
                  <Text style={styles.value}>{String(value)}</Text>
                </View>
              ),
          )
        ) : (
          <Text>{String(item[0])}</Text>
        )}

        {contractAdditional && (
          <View>
            {Object.entries(contractAdditional[0]).map(([key, value], index) => {
              if(key.toLowerCase() == 'plan' || (groupCode.toLowerCase() == 'travel' && index == 0)){
                return(
                  <View key={key} style={styles.additionalDataRow}>
                  <DQ_Paragraph content={key.toLowerCase() == 'plan' ? value + " " + Get_CMS_Entry(key, suffix, GetEntry().language) : "Additional Data" } textColor='white'/>
                </View>
                )
              }
              return (
                !excludeKeys.includes(key) &&
              value !== null && ( <View key={key} style={styles.contractRow}>
                  <Text style={styles.label}>{Get_CMS_Entry(key, suffix, GetEntry().language)}</Text>
                  <Text style={styles.value}>{String(value)}</Text>
                </View>)
              );
            })}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contractContainer: {
    padding: 12,
    backgroundColor: '#ebebeb',
    width: '100%',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  contractRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 9,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    padding:5,
  },
  additionalDataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 9,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    backgroundColor:"#3cc8f0",
    padding:5,
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
