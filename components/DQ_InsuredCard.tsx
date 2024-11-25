import Icon from '@react-native-vector-icons/fontawesome6';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  ScrollView
} from 'react-native';

const DQ_InsuredCard = ({ title, count, children, locked = false }: any) => {
  const [collapsed, setCollapsed] = useState(true);
  const [animation] = useState(new Animated.Value(0));

  const getDynamicFontSize = (text : any) => {
    const length = String(text).length;
    if (length <= 10) return 16;
    if (length <= 20) return 14;
    if (length <= 30) return 12;
    return 12;
  };

  useEffect(() => {
    if (count === 1 && !locked) {
      setCollapsed(false);
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [count, locked]);

  const toggleCollapse = () => {
    if (locked) return;
    setCollapsed(!collapsed);
    Animated.timing(animation, {
      toValue: collapsed ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const opacityInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const rotateInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg'],
  });

  const backgroundColor = collapsed ? (locked ? '#0160ae' : 'white') : '#0160ae';
  const color = collapsed ? (locked ? 'white' : 'black') : 'white';
  const chevronColor = collapsed ? (locked ? '#0160ae' : 'black') : 'white';

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.cardBorder, { backgroundColor }]}>
        <TouchableWithoutFeedback onPress={toggleCollapse}>
          <View style={styles.InlineElements}>
            <View style={{width:240}}>
              <Text
              style={[
                styles.textFormat,
                { color, fontSize: locked ? 13 : getDynamicFontSize(title), textAlign: 'left' }
              ]}
            >
              {title}
            </Text>
            </View>
            <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
              <Icon name="chevron-down" size={14} color={chevronColor} iconStyle="solid" />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </View>      
      <Animated.View
        style={{
          opacity: opacityInterpolate,
          height: collapsed ? 0 : 'auto',
          overflow: 'visible',
          width:'100%',
          marginTop:-20
        }}
      >
        <ScrollView style={{overflow: 'visible',padding:20}}>
          {children}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardBorder: {
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 9,
    margin: 10,
    padding: 15,
    minHeight: 85,
  },
  InlineElements: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15,
  },
  textFormat: {
    fontWeight: '600',
    color: 'black',
  },
});

export default DQ_InsuredCard;
