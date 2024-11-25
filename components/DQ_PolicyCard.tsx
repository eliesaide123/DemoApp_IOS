import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import DQ_Paragraph from './DQ_Paragraph';
import Icon from '@react-native-vector-icons/fontawesome6';

interface DQ_PolicyCardProps {
  src?: any;
  item: any;
  press: () => void;
  variant?: 'policy' | 'agent';
}

export default function DQ_PolicyCard({ src, item, press, variant = 'policy' }: DQ_PolicyCardProps) {
  return (
    <TouchableOpacity onPress={press}>
      <View style={styles.cardContainer}>
        {variant === 'policy' ? (
          <>
            {/* Policy variant content */}
            <View style={[styles.InlineElements, styles.spaceBetween]}>
              <View style={[styles.InlineElements, styles.gap20]}>
                <Image
                  source={src}
                  style={[styles.imageTint, styles.cardImage]}
                  resizeMode="contain"
                />
                <DQ_Paragraph
                  content={item.policyNo}
                  textColor="white"
                  fontSize={14}
                  fontFamily="Nexa Bold"
                />
              </View>
              <View>
                <Icon
                  name="arrow-right"
                  size={14}
                  color="#ffbe23"
                  iconStyle="solid"
                  style={{ marginHorizontal: 2 }}
                />
              </View>
            </View>
            <View style={[styles.InlineElements, styles.gap5, styles.marginTop15]}>
              <DQ_Paragraph
                content={item.productTag}
                textColor="white"
                fontSize={10}
              />
            </View>
            <View style={[styles.InlineElements, styles.marginTop10]}>
              <DQ_Paragraph
                content={item.policyTag}
                textColor="white"
                fontSize={10}
              />
            </View>
            {item.expiryTag && (
              <View style={[styles.InlineElements, styles.marginTop15]}>
                <Icon
                  name="calendar-days"
                  size={12}
                  color="white"
                  iconStyle='solid'
                  style={{ marginHorizontal: 2 }}
                />
                <DQ_Paragraph
                  content={item.expiryTag}
                  textColor="white"
                  fontSize={10}
                />
              </View>
            )}
          </>
        ) : (
          // Agent variant content
          <>
            <View style={[styles.InlineElements, styles.spaceBetween]}>
              <View style={[styles.InlineElements, styles.gap20]}>
                <DQ_Paragraph
                  content={item.fullName}
                  textColor="white"
                  fontSize={14}
                  fontFamily="Nexa Bold"
                />
              </View>
              <View>
                <Icon
                  name="arrow-right"
                  size={14}
                  color="#ffbe23"
                  iconStyle="solid"
                  style={{ marginHorizontal: 2 }}
                />
              </View>
            </View>
            <View style={[styles.InlineElements, styles.gap5, styles.marginTop15]}>
              <Icon name="location-dot" size={12} color="white" iconStyle='solid' style={{ marginHorizontal: 2 }} />
              <DQ_Paragraph
                content={item.address}
                textColor="white"
                fontSize={10}
              />
            </View>
            <View style={[styles.InlineElements, styles.gap5, styles.marginTop10]}>
              <Icon name="phone" size={12} color="white" iconStyle='solid' style={{ marginHorizontal: 2 }} />
              <DQ_Paragraph
                content={item.phones || "N/A"}
                textColor="white"
                fontSize={10}
              />
            </View>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#005faf',
    marginVertical: 10,
    borderRadius: 10,
    padding: 20,
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
