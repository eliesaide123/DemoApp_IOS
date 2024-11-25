import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';
 
export default function DQ_TextBox({
    placeholder = 'Enter text',
    value,
    onChangeText,
    keyboardType = 'default',
    secureTextEntry = false,
    backgroundColor = 'white',
    textColor = '#333',
    borderColor = 'black',
    hintText = undefined,
    fontFamily = 'Nexa Regular',
    placeholderColor = "#888",
    hintTextColor="grey",
    errorMessage
} : any) {
 
  const fF = fontFamily.toString();
 
  function handleChangeText(e: string) {
    onChangeText(e);
  }
    return (
      <View style={styles.mainContainer}>
        <View style={[styles.container, {backgroundColor, borderColor}]}>
          <TextInput
            style={[styles.input, {color: textColor, fontFamily: fF}]}
            placeholder={placeholder}
            placeholderTextColor={placeholderColor}
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
          />
        </View>
        {errorMessage && <Text style={{color: borderColor, marginHorizontal:5, marginTop:5, fontFamily:'Nexa Light', fontSize:14}}>{errorMessage}</Text>}
        {hintText && <Text style={{color: hintTextColor, marginHorizontal:5, fontFamily, fontSize:12}}>{hintText}</Text>}
      </View>
    );
}
 
const styles = StyleSheet.create({
    mainContainer:{
        marginVertical:8,
    },
    container: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 3,
        borderWidth: 1,
    },
    input: {
        fontSize: 16,
        height: 40,
    },
});