import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import DQ_Paragraph from './DQ_Paragraph';
import Icon from '@react-native-vector-icons/fontawesome6';

interface DQ_PolicyCardProps {
  item: any;
  policyNo:string
  press: () => void;
}

export default function DQ_RequestCard({ item, policyNo, press }: DQ_PolicyCardProps) {
  console.log(item)
  return (
    <TouchableOpacity onPress={press}>
      <View style={styles.cardContainer}>
            <View style={[styles.InlineElements, styles.spaceBetween]}>
              <View style={[styles.InlineElements, styles.gap20]}>
                <DQ_Paragraph
                  content={item.polAction}
                  textColor="black"
                  fontSize={14}
                  fontFamily="Nexa Bold"
                />
              </View>
              <View>
                <Icon
                  name="arrow-right"
                  size={14}
                  color="#005cbf"
                  iconStyle="solid"
                  style={{ marginHorizontal: 2 }}
                />
              </View>
            </View>
            <View style={[styles.InlineElements, styles.marginTop15]}>
              <DQ_Paragraph
                content={policyNo}
                textColor="black"
                fontSize={12}
              />
              <DQ_Paragraph
                content={item.requestStatus + " - " + item.statusdate}
                textColor="black"
                fontSize={12}
              />
            </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    margin:10,
    borderRadius: 10,
    padding:25,
    paddingBottom:45,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 9,
  },
  spaceBetween: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageTint: {
    tintColor: 'white',
  },
  cardImage: {
    width: 26,
    height: 16,
  },
  InlineElements: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
  },
  marginTop10: {
    marginTop: 10,
  },
  marginTop15: {
    marginTop: 15,
  },
  gap5: {
    gap: 5,
  },
  gap20: {
    gap: 20,
  },
});
