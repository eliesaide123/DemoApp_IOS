import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import DQ_InsuredCard from './DQ_InsuredCard';
import DQ_Paragraph from './DQ_Paragraph';
import _shared from '../screens/common';
import {Get_CMS_Entry} from '../Shared/CMSSharedFunction';
import {GetEntry} from '../Shared/settings';
import { GetGenRisk } from '../Shared/SharedService';
import { GenRiskDataItems } from '../Shared/Types';

export default function DQ_InsuredRisks({
  item,
  policyNo,
  coversURL,
  policyDataURI,
  currency,
  suffix,
}: any) {
  const [covers, setCovers] = useState<GenRiskDataItems[]>([]);

  useEffect(() => {
    const Get_Covers = async () => {
      const result = await GetGenRisk(
        policyNo,
        item[0]?.riskNo,
        policyDataURI,
      );
      if(result?.riskDetails?.dataItems) {
        setCovers(result?.riskDetails?.dataItems || []);
      }
    };
    Get_Covers();
  }, [coversURL, policyDataURI, policyNo, item]);

  // Check if all itemCovers properties are null
  const isAllCoversNull = (covers: any) => {
    if (Array.isArray(covers)) {
      // If covers is an array, check if it's empty
      return covers.length === 0;
    } else if (covers && typeof covers === 'object') {
      // If covers is an object, check if all values are null
      return Object.entries(covers).every(([key, value]) => value === null);
    }
    // If covers is neither an array nor an object, treat it as empty
    return true;
  };

  const getDynamicFontSize = (text: any) => {
    const length = String(text).length;
    if (length <= 10) return 16; // Short text, larger font
    if (length <= 20) return 14; // Medium text, medium font
    if (length <= 30) return 12; // Long text, smaller font
    return 12; // Very long text, smallest font
  };

  return (
    <ScrollView style={styles.contractContainer}>
      <View>
        {Array.isArray(item) &&
          item.length > 0 &&
          item.map((obj, index) => {
            // Check if covers are null or empty to set the locked state
            const locked = isAllCoversNull(covers);
            return (
              <DQ_InsuredCard
                title={obj['riskType']}
                key={index}
                count={item.length}
                locked={locked} // Apply locked attribute here
              >
                <>
                  <View style={styles.additionalDataRow}>
                    <View style={styles.header}>
                      <DQ_Paragraph
                        content={Get_CMS_Entry(
                          'item_insured_str',
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
                        content={`${Get_CMS_Entry(
                          'sum_insured_str',
                          suffix,
                          GetEntry().language,
                        )} USDF`}
                        textColor="white"
                        fontFamily="Nexa Bold"
                        fontSize={13}
                        textAlign="center"
                      />
                    </View>
                  </View>
                  <ScrollView style={{overflow: 'visible', padding: 20}}>
                    {Array.isArray(covers) &&
                      covers.length > 0 &&
                      covers.map((itm: any, itIndex) => (
                        <View key={itIndex} style={styles.propertyRow}>
                          <View style={styles.contractRow}>
                            <DQ_Paragraph
                              content={itm['itemDesc']}
                              fontFamily="Nexa Bold"
                              fontSize={14}
                              textColor="black"
                              textAlign="left"
                              textWidth={150}
                            />
                            <DQ_Paragraph
                              content={itm['itemSI']}
                              fontFamily="Nexa Light"
                              fontSize={14}
                              textColor="black"
                              textAlign="right"
                              textWidth={150}
                            />
                          </View>

                          {itm.itemCovers.map((i: any) => (
                            <View
                              key={i.itemCoverName}
                              style={styles.description}>
                              <DQ_Paragraph
                                content={i.itemCoverName}
                                fontFamily="Nexa Light"
                                fontSize={getDynamicFontSize(
                                  i.itemCoverName + 'extratextextra',
                                )}
                                textColor="#727272"
                              />
                            </View>
                          ))}
                        </View>
                      ))}
                  </ScrollView>
                </>
              </DQ_InsuredCard>
            );
          })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contractContainer: {
    padding: 12,
    backgroundColor: '#ebebeb',
    flex: 1, // Ensures it takes full available space
    width: '100%',
    overflow: 'scroll',
  },
  contractRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  propertyRow: {
    paddingVertical: 7,
    width: '100%',
    marginHorizontal: -20,
    marginBottom: 5,
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
  },
  description: {
    paddingHorizontal: 15,
    marginTop: 15,
  },
  additionalDataRow: {
    position: 'relative',
    top: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    backgroundColor: '#6e6e6e',
    flexWrap: 'wrap',
    padding: 15,
    paddingHorizontal: 20,
    gap: 20,
    width: '128%',
    height: 50,
    marginHorizontal: -40,
    marginBottom: 7,
  },
  header: {
    flex: 0.4,
  },
  label: {
    width: 50,
  },
});
