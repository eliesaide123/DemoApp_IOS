import {StyleSheet, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import DQ_PolicyIcon from '../../components/DQ_PolicyIcon';
import DQ_BaseHeader from '../../components/DQ_BaseHeader';
import DQ_PolicyCard from '../../components/DQ_PolicyCard';
import _shared from '../common';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GetPolicyService } from '../../Shared/SharedService';
const imageMapping: {[key: string]: any} = {
  health: require('../../assets/images/health.png'),
  life: require('../../assets/images/life.png'),
  motor: require('../../assets/images/motor.png'),
  property: require('../../assets/images/property.png'),
  personal: require('../../assets/images/personal.png'),
  travel: require('../../assets/images/travel.png'),
  investment: require('../../assets/images/investment.png'),
  expat: require('../../assets/images/expat.png'),
  liability: require('../../assets/images/liability.png'),
  marine: require('../../assets/images/marine.png'),
  engrisk: require('../../assets/images/engrisk.png'),
  other: require('../../assets/images/other.png'),
  protection: require('../../assets/images/protection.png'),
};
export default function PolicyList({navigation, route}: any) {
  const [groupCode, setGroupCode] = useState<string>('');
  const [policyList, setPolicyList] = useState<any[]>([]);
  const [pin, setPin] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    console.log("Policy List Screen")
    const {groupCode: _groupCode} = route.params;
    const Get_Policy = async () => {
      const result = await GetPolicyService(
        _groupCode
      );
      
      const policies = result?.response.responseData.policyList      
      setPolicyList(policies ?? []);
      setGroupCode(_groupCode.toLowerCase());
      setPin(pin);
      setRole(role);
      setUserId(userId);
    };

    Get_Policy();
  }, [route.params, pin, role, userId]);
  return (
    <SafeAreaView style={styles.rootElement}>
      <DQ_BaseHeader press={()=> navigation.goBack()} variant="textCenter" textCenter={groupCode} capitalized/>
      <View style={styles.topView}>
        <View style={styles.iconView}>
          {groupCode && <DQ_PolicyIcon src={imageMapping[groupCode]} />}
        </View>
        <View style={styles.marginList}>
          {policyList && groupCode && (
            <FlatList
              data={policyList}
              keyExtractor={(item: any) => item.policyNo.toString()}
              renderItem={({item}) => (
                <DQ_PolicyCard
                  src={imageMapping[groupCode]}
                  item={item}
                  press={() => {
                    navigation.navigate('PolicyDetails', {
                      policyNo: item.policyNo,
                      groupCode,
                      pin,
                      role,
                      userId,
                      policyDetailsURI: item.policyDetailsURI,
                      policyInsCoversURI: item.policyInsCoversURI,
                      policyDataURI: item.policyDataURI,
                      suffix:item.suffix,
                      currency: item.currency
                    });
                  }}
                />
              )}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootElement: {
    flex: 1,
  },
  topView: {
    flex: 1,
  },
  iconView: {
    flex: 0.2,
    marginTop: 25,
  },
  marginList: {
    flex: 0.75,
    marginHorizontal:10,
    marginTop:-20,
  },
});
