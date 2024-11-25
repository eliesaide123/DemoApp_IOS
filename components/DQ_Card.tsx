import Icon from '@react-native-vector-icons/fontawesome6';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
} from 'react-native';

const DQ_Card = ({ title, count = 0, children, isOpen, onPress, id }:any ) => {
  const [animation] = useState(new Animated.Value(isOpen ? 1 : 0));

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isOpen]);

  const toggleCollapse = () => {
    if (count > 0 && onPress) {
      onPress(id);
    }
  };

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 250],
  });

  const rotateInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg'],
  });

  const opacityInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const backgroundColor = isOpen ? '#0160ae' : 'white';
  const color = isOpen ? 'white' : 'black';

  return (
    <View style={[styles.cardBorder, { backgroundColor }]}>
      <TouchableWithoutFeedback onPress={toggleCollapse}>
        <View style={styles.InlineElements}>
          <Text style={[styles.textFormat, { color }]}>{title}</Text>
          <View style={styles.InlineElements}>
            <View
              style={[
                styles.bubble,
                { backgroundColor: count > 0 ? '#f06e1e' : '#0160ae' },
              ]}
            >
              <Text style={styles.whiteText}>{count}</Text>
            </View>
            <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
              <Icon
                name="chevron-down"
                size={14}
                color={count > 0 ? color : 'white'}
                iconStyle="solid"
              />
            </Animated.View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Animated.View style={{ height: heightInterpolate }}>
        <Animated.View
          style={{
            opacity: opacityInterpolate,
            marginTop: 20,
          }}
        >
          {children}
        </Animated.View>
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
    elevation: 5,
    margin: 10,
    padding: 15,
  },
  InlineElements: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15,
  },
  bubble: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
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

export default DQ_Card;
