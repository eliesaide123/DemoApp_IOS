import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DQ_Button from './DQ_Button'

export default function DQ_InnerCard_Grid({children, buttonText,buttonWidth, onPress}:any) {
  return (
    <View style={styles.whiteBg}>
      <View>{children}</View>
      <View style={[styles.buttonView, {width: buttonWidth}]}>
      <DQ_Button title={buttonText} onPress={onPress} fontSize={14}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    whiteBg:{
        backgroundColor:'white',
        padding:10,
        borderRadius:10,
        gap:20
    },
    buttonView:{
        justifyContent:'center',
        alignSelf:'center'
    }
})