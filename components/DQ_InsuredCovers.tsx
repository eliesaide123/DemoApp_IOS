import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import DQ_InsuredCard from './DQ_InsuredCard';
import DQ_Paragraph from './DQ_Paragraph';
import _shared from '../screens/common';
import {GetEntry} from '../Shared/settings';
import {Get_CMS_Entry} from '../Shared/CMSSharedFunction';
import {GetAdvancedLifeCover} from '../Shared/SharedService';
import { Cover } from '../Shared/Types';

export default function DQ_InsuredCovers({
  item,
  coversURL,
  policyNo,
  suffix,
  currency,
}: any) {
  const [covers, setCovers] = useState<Cover[]>([]);

  useEffect(() => {
    const Get_Covers = async () => {
      console.log(JSON.stringify(item));
      const result = await GetAdvancedLifeCover(
        policyNo,
        item[0]?.riskNo,
        coversURL,
      );
      if (result && 'riskDetails' in result) {
        const _covers = result?.riskDetails?.covers || [];
        setCovers(_covers || []);
      }
    };
    Get_Covers();
  }, [coversURL, policyNo, item]);

  const getDynamicFontSize = (text: any) => {
    const length = String(text).length;
    if (length <= 10) return 14; // Short text, larger font
    if (length <= 20) return 12; // Medium text, medium font
    if (length <= 30) return 10; // Long text, smaller font
    return 12; // Very long text, smallest font
  };

  return (
    <ScrollView style={styles.contractContainer}>
      <View>
        {Array.isArray(item) &&
          item.length > 0 &&
          item.map((obj, index) => (
            <DQ_InsuredCard
              title={obj['insuredData'] || obj['riskType'] || 'Insured Data'}
              key={index}
              count={item.length}>
              <View style={styles.additionalDataRow}>
                <View style={styles.header}>
                  <DQ_Paragraph
                    content={Get_CMS_Entry(
                      'cover_desc_deduct_str',
                      suffix,
                      GetEntry().language,
                    )}
                    textColor="white"
                    fontFamily="Nexa Bold"
                    fontSize={13}
                    textAlign="center"
                  />
                </View>
                <View style={styles.header}>
                  <DQ_Paragraph
                    content={
                      Get_CMS_Entry(
                        'sum_insured_str',
                        suffix,
                        GetEntry().language,
                      ) +
                      ' ' +
                      currency
                    }
                    textColor="white"
                    fontFamily="Nexa Bold"
                    fontSize={13}
                    textAlign="center"
                  />
                </View>
              </View>
              {Array.isArray(covers) &&
                covers.length > 0 &&
                covers.map((cover, coverIndex) => (
                  <View key={coverIndex}>
                    <View style={styles.contractRow}>
                      <DQ_Paragraph
                        content={cover['insuredCover']}
                        fontFamily="Nexa Bold"
                        textAlign="left"
                        fontSize={getDynamicFontSize(cover['insuredCover'])}
                        textColor="black"
                        textWidth={150}
                      />
                      <DQ_Paragraph
                        content={cover['insuredSI']}
                        fontFamily="Nexa Bold"
                        textAlign="right"
                        fontSize={14}
                        textColor="black"
                        textWidth={150}
                      />
                    </View>
                  </View>
                ))}
            </DQ_InsuredCard>
          ))}
      </View>
    </ScrollView>
  );
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
    width: '114%',
    marginHorizontal: -20,
    backgroundColor: '#dcdcdc',
    marginBottom: 5,
    padding: 10,
    borderRadius: 5,
  },
  additionalDataRow: {
    position: 'relative',
    top: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    backgroundColor: '#3cc8f0',
    flexWrap: 'wrap',
    padding: 15,
    gap: 20,
    width: '128%',
    height: 50,
    marginHorizontal: -40,
    marginBottom: 7,
    marginTop: 10,
  },
  header: {
    flex: 0.4,
  },
  label: {
    width: 50,
  },
  value: {
    flex: 1,
    textAlign: 'right',
  },
});
