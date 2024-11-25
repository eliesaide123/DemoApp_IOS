import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DQ_Paragraph from './DQ_Paragraph'

export default function DQ_Badge({text}:any) {
  return (
    <View style={styles.badge}>
        <DQ_Paragraph content={text} fontSize={14} textColor='white' textAlign='center' fontWeight='bold'/>
    </View>
  )
}

const styles = StyleSheet.create({
    badge:{
        position:'absolute',
        top:-2,
        right:7,
        width:20,
        height:20,
        backgroundColor:'#f06f1d',
        borderRadius:40,
        justifyContent:'center'
    }
})