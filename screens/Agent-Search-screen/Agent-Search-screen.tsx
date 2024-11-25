/* eslint-disable no-trailing-spaces */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import DQ_BaseHeader from '../../components/DQ_BaseHeader';
import DQ_TabView from '../../components/DQ_TabView';
import DQ_TextBox from '../../components/DQ_TextBox';
import DQ_Button from '../../components/DQ_Button';
import DQ_Paragraph from '../../components/DQ_Paragraph';
import {Dropdown} from 'react-native-element-dropdown';
import _shared from '../common';
import DQ_Alert from '../../components/DQ_Alert';
import {useAlert} from '../../hooks/useAlert';
import {Get_CMS_Entry} from '../../Shared/CMSSharedFunction';
import {GetEntry} from '../../Shared/settings';
import { fetchRoleAndPin, getAgentSearchOptions, PerformSearch } from '../../Shared/SharedService';

const AgentSearchScreen = ({navigation, route}: any) => {
  const [genders, setGenders] = useState<
    {entityCode: string; entityDesc: string}[]
  >([]);
  const [genderMapping, setGenderMapping] = useState<{[key: string]: string}>(
    {},
  );
  const [selectedGender, setSelectedGender] = useState(''); // Example default value
  const [firstName, setFirstName] = useState<string>('');
  const [fatherName, setFatherName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [policyNumber, setPolicyNumber] = useState<string>(''); // Static value for policy number
  const [pin, setPin] = useState<string>('');
  const [_agentPinRole, setAgentPinRole] = useState<any>();
  const [errorMsg, setErrorMsg] = useState<string>('No Data Found!');
  const {isVisible, showAlert, hideAlert} = useAlert();
  const [loading, setLoading] = useState(false);

  const searchParams = {
    searchByName: {
      gender: selectedGender || null,
      firstName: firstName || null,
      fatherName: fatherName || null,
      lastName: lastName || null,
    },
    searchByPN: {
      policyNo: policyNumber || null,
    },
    searchByPin: {
      pin: pin || null,
    },
  };

  useEffect(() => {
    const fetchGenders = async () => {
      const id = _shared.userId;
      const agentRolePin = await fetchRoleAndPin(id);
      setAgentPinRole(agentRolePin);
      const options = await getAgentSearchOptions();
      setGenders(options);
      
      const mapping = options.reduce(
        (acc: {[key: string]: string}, gender: any) => {
          acc[gender.entityCode] = gender.entityDesc;
          return acc;
        },
        {},
      );
      setGenderMapping(mapping);
    };

    fetchGenders();
  }, []);

  const PerformSearchService = async (searchType: string) => {
    setLoading(true);
    let params;

    if (searchType === 'PIN') {
      params = {SearchType: 'PIN', ByPin: searchParams.searchByPin.pin};
    } else if (searchType === 'P') {
      params = {SearchType: 'P', ByPolicyNo: searchParams.searchByPN.policyNo};
    } else if (searchType === 'PH') {
      params = {
        SearchType: 'PH',
        ByGender: genderMapping[selectedGender] || null,
        ByFirstName: searchParams.searchByName.firstName,
        ByFather: searchParams.searchByName.fatherName,
        ByFamily: searchParams.searchByName.lastName,
      };
    }

    const result = await PerformSearch(
      _shared.userId,
      _agentPinRole.role,
      _agentPinRole.pin,
      params,
    );
    if (result.length > 0) {
      navigation.navigate('AgentResult', {params});
    } else {
      setErrorMsg('No Data Found!');
      showAlert('No Data Found!');
    }
    setLoading(false);
  };

  const tabs = [
    {
      key: 'first',
      title: 'Name',
      content: (
        <ScrollView style={{width: '100%', flex: 1}}>
          <View style={styles.TextBox}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={genders.map(gender => ({
                label: gender.entityDesc,
                value: gender.entityCode,
              }))}
              labelField="label"
              valueField="value"
              placeholder="Select Gender"
              value={selectedGender}
              onChange={item => {
                setSelectedGender(item.value);
              }}
            />
            <DQ_TextBox
              placeholder={Get_CMS_Entry(
                'first_name_str',
                '',
                GetEntry().language,
              )}
              borderColor="#bbbec3"
              value={firstName}
              onChangeText={setFirstName}
            />
            <DQ_TextBox
              placeholder={Get_CMS_Entry('father_name_str', '', GetEntry().language)}
              borderColor="#bbbec3"
              value={fatherName}
              onChangeText={setFatherName}
            />
            <DQ_TextBox
              placeholder={Get_CMS_Entry('last_name_str', '', GetEntry().language)}
              borderColor="#bbbec3"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
          <View style={styles.SearchButton}>
            <DQ_Button
              title={Get_CMS_Entry('search_str', '', GetEntry().language)}
              onPress={() => PerformSearchService('PH')}
              loading={loading}
            />
          </View>
        </ScrollView>
      ),
    },
    {
      key: 'second',
      title: 'Policy Number',
      content: (
        <ScrollView style={{width: '100%', flex: 1}}>
          <View style={styles.TextBox}>
            <DQ_TextBox
              borderColor="#bbbec3"
              placeholder={Get_CMS_Entry('policy_number_str', '', GetEntry().language)}
              hintText={Get_CMS_Entry('example_policy_number_agent', '', GetEntry().language)}
              value={policyNumber}
              onChangeText={setPolicyNumber}
            />
          </View>
          <View style={styles.SearchButton}>
            <DQ_Button
              title={Get_CMS_Entry('search_str', '', GetEntry().language)}
              onPress={() => PerformSearchService('P')}
              loading={loading}
            />
          </View>
        </ScrollView>
      ),
    },
    {
      key: 'third',
      title: 'PIN',
      content: (
        <ScrollView style={{width: '100%', flex: 1}}>
          <View style={styles.TextBox}>
            <DQ_TextBox
              placeholder={Get_CMS_Entry('pin_str', '', GetEntry().language)}
              value={pin}
              onChangeText={setPin}
            />
          </View>
          <View style={styles.SearchButton}>
            <DQ_Button
              title={Get_CMS_Entry('search_str', '', GetEntry().language)}
              onPress={() => PerformSearchService('PIN')}
              loading={loading}
            />
          </View>
        </ScrollView>
      ),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <DQ_Alert
        isVisible={isVisible}
        hideAlert={hideAlert}
        btnList={[
          {
            title: 'Ok',
            press: () => {
              hideAlert();
            },
          },
        ]}>
        <DQ_Paragraph
          content={errorMsg}
          textColor="black"
          textAlign="center"
          fontSize={14}
        />
      </DQ_Alert>
      {/* <DQ_BaseHeader
        navigation={navigation}
        press={() => navigation.goBack()}
      /> */}

      <View style={styles.mainTitle}>
        <DQ_Paragraph
          fontSize={18}
          content={_shared.userId}
          textAlign="center"
          fontFamily="Nexa Bold"
        />
      </View>

      <View style={styles.ButtonView}>
        <DQ_Button title="Renewal Portal System" />
      </View>

      <View style={styles.SearchText}>
        <Text>Search by</Text>
      </View>

      <DQ_TabView tabs={tabs} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainTitle: {
    margin: 20,
  },
  portalButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  portalButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  formContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  SearchButton: {
    padding: 20,
    width: '100%',
    alignContent: 'center',
    alignSelf: 'center',
  },

  ButtonView: {
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 20,
  },
  SearchText: {
    fontSize: 50,
    paddingLeft: 15,
    paddingBottom: 20,
  },
  TextBox: {
    padding: 16,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    flex: 1,
    width: '100%',
  },
  dropdown: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: '#ccc',
  },
  placeholderStyle: {
    color: '#888',
    fontSize: 16,
  },
  selectedTextStyle: {
    color: '#000',
    fontSize: 16,
  },
});

export default AgentSearchScreen;
