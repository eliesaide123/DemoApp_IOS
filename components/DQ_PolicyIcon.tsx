import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function DQ_PolicyIcon({src}: any) {
  return (
    <View style={styles.Image_Container}>
        <View style={styles.Inline_Image}>
          <Image
            source={src}
            style={styles.Rounded_Image}
            resizeMode="contain"
          />
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
    Image_Container: {
        padding: 1,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
      },
      Rounded_Image: {
        width: 55,
        height: 55,
        padding: 10,
      },
      Inline_Image: {
        borderWidth: 1,
        borderColor: '#175384',
        borderRadius: 60,
        padding: 7,
      },
})