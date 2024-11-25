// components/DQ_Dropdown.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

type DQ_DropdownProps = {
  label?: string;
  data: any[];
  value: string;
  onChange: (item: any) => void;
  placeholder: string;
  labelField: string;
  valueField: string;
  error?: string;
};

const DQ_Dropdown = ({
  label,
  data,
  value,
  onChange,
  placeholder,
  labelField,
  valueField,
  error,
}: DQ_DropdownProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Dropdown
        data={data}
        labelField={labelField}
        valueField={valueField}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={styles.dropdown}
        itemTextStyle={styles.itemText}
        placeholderStyle={styles.placeholder}
      />

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    color: 'black',
    marginBottom: 5,
  },
  dropdown: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  itemText: {
    fontSize: 14,
    color: 'black',
  },
  placeholder: {
    fontSize: 14,
    color: '#bbb',
  },
  error: {
    color: 'red',
    marginTop: 5,
    fontSize: 12,
  },
});

export default DQ_Dropdown;
