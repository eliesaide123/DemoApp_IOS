/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  ScrollView,
  Pressable,
  Animated,
} from 'react-native';
import DQ_Card from '../../components/DQ_Card';
import DQ_InnerCard_Grid from '../../components/DQ_InnerCard_Grid';
import DQ_Paragraph from '../../components/DQ_Paragraph';
import DQ_GoButton from '../../components/DQ_GoButton';
import DQ_Badge from '../../components/DQ_Badge';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import _shared from '../common';
import DQ_Loader from '../../components/DQ_Loader';
import {CSConnectService} from '../../Shared/SharedService';
import {Get_CMS_Entry} from '../../Shared/CMSSharedFunction';
import {GetEntry} from '../../Shared/settings';
import {useFocusEffect} from '@react-navigation/native';
const imageMapping: {[key: string]: any} = {
  'health.png': require('../../assets/images/health.png'),
  'life.png': require('../../assets/images/life.png'),
  'motor.png': require('../../assets/images/motor.png'),
  'property.png': require('../../assets/images/property.png'),
  'personal.png': require('../../assets/images/personal.png'),
  'travel.png': require('../../assets/images/travel.png'),
  'investment.png': require('../../assets/images/investment.png'),
  'expat.png': require('../../assets/images/expat.png'),
  'liability.png': require('../../assets/images/liability.png'),
  'marine.png': require('../../assets/images/marine.png'),
  'engrisk.png': require('../../assets/images/engrisk.png'),
  'other.png': require('../../assets/images/other.png'),
  'protection.png': require('../../assets/images/protection.png'),
};

const Item = ({
  name,
  groupCode,
  nbrPolicies,
  navigation,
}: {
  name: string;
  groupCode: string;
  nbrPolicies: number;
  navigation: NativeStackScreenProps<any>['navigation'];
}) => {
  const imageName = `${groupCode.toLowerCase()}.png`;
  const [isLongPressed, setIsLongPress] = useState(false);
  const scaleAnim = new Animated.Value(1);

  const handlePressIn = () => {
    setIsLongPress(true);
    Animated.timing(scaleAnim, {
      toValue: 1.1, // Scale up slightly
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setIsLongPress(false);
    Animated.timing(scaleAnim, {
      toValue: 1, // Scale back to normal
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    if (nbrPolicies > 0)
      navigation.navigate('PolicyList', {
        groupCode,
      });
  };
  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}>
      <View style={styles.Image_Container}>
        <View
          style={[styles.Inline_Image, isLongPressed && styles.longPressStyle]}>
          <Image
            source={imageMapping[imageName]}
            style={[
              styles.Rounded_Image,
              isLongPressed && styles.longPressImage,
            ]}
            resizeMode="contain"
          />
        </View>
        {nbrPolicies > 0 && <DQ_Badge text={nbrPolicies} />}
        <View style={styles.InlineText}>
          <Text style={styles.Product_Name}>{name}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default function CSConnect({navigation, route}: any) {
  const [prodGroups, setProdGroups] = useState<any[]>([]);
  const [osPremiums, setOsPremiums] = useState<any[]>([]);
  const [osClaims, setOsClaims] = useState<any[]>([]);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [pendingRenewals, setPendingRenewals] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [pin, setPin] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [openCard, setOpenCard] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      const Get_CS_Connect = async () => {
        setIsLoading(true);
        let _UserPin = '';
        if (route.params) {
          const {pin: UserPin} = route.params;
          _UserPin = String(UserPin);
        }
        const result = await CSConnectService();

        if (result && result.response) {
          const _roles = result?.response?.responseData.userData[0].roles;
          const _pin = result?.response?.user_Pin;
          _shared.pin = _pin?.toString() || '';
          setPin(_pin?.toString() || '');
          const _role = result?.response?.user_Role;
          _shared.role = _role || '';
          setRole(_role || '');
          setRoles(_roles || []);
          _shared.roleNumber = _roles?.length ?? 1;

          if (result?.response.responseData.prodGroups) {
            const sortedProdGroups =
              result.response.responseData.prodGroups.sort(
                (a: any, b: any) => a.groupSeq - b.groupSeq,
              );
            setProdGroups(sortedProdGroups);
          }
          if (result?.response.responseData.osPremiums)
            setOsPremiums(result.response.responseData.osPremiums);
          if (result?.response.responseData.osClaims)
            setOsClaims(result.response.responseData.osClaims);
          if (result?.response.responseData.pendingRequests)
            setPendingRequests(result.response.responseData.pendingRequests);
          if (result?.response.responseData.pendingRenewals)
            setPendingRenewals(result.response.responseData.pendingRenewals);
        }

        setIsLoading(false);
      };

      setUserId(_shared.userId);
      Get_CS_Connect();

      // Optional: Cleanup logic if necessary.
      return () => {
        setIsLoading(false);
      };
    }, [route.params]),
  );

  const handleCardPress = (cardId: any) => {
    setOpenCard(prevOpenCard => (prevOpenCard === cardId ? null : cardId));
  };

  const getOustandingPremiums = (premiums: any) => {
    return premiums.reduce((acc: any, item: any) => {
      return (acc += item.nbrPremiums);
    }, 0);
  };

  const getOustandingClaims = (claims: any) => {
    console.log();
    return claims.reduce((acc: any, item: any) => {
      return (acc += item.nbrOSClaims);
    }, 0);
  };

  return (
    <SafeAreaView style={{flex:1}}>
        {!isLoading ? (
          <View style={{marginTop:5}}>
          <ScrollView>
            <View style={styles.Products_Container}>
              <FlatList
                horizontal
                data={prodGroups}
                renderItem={({item}) => (
                  <Item
                    name={item.groupName}
                    groupCode={item.groupCode}
                    nbrPolicies={item.nbrPolicies}
                    navigation={navigation}
                  />
                )}
                keyExtractor={item => item.groupCode}
              />
            </View>
            <View style={styles.cardsContainer}>
              {osPremiums && (
                <DQ_Card
                  title={Get_CMS_Entry(
                    'outstanding_premiums_str',
                    '',
                    GetEntry().language,
                  )}
                  count={getOustandingPremiums(osPremiums)}
                  isOpen={openCard === 'osPremiums'}
                  onPress={() => handleCardPress('osPremiums')}>
                  <DQ_InnerCard_Grid buttonText="Pay Online" buttonWidth={120}>
                    {osPremiums.map((premium: any, index: number) => {
                      return (
                        <View key={index} style={styles.InlineElements}>
                          <DQ_Paragraph
                            content={premium?.nbrPremiums}
                            textColor="black"
                            fontSize={14}
                          />
                          <DQ_Paragraph
                            content={'Premiums'}
                            fontSize={14}
                            textColor="black"
                          />
                          <DQ_Paragraph
                            content={premium?.fresh ? 'Fresh' : ''}
                            textColor="black"
                            fontSize={14}
                          />
                          <DQ_Paragraph
                            content={
                              premium?.osAmount + ' ' + premium?.currency
                            }
                            textColor="#7dadd6"
                            fontSize={14}
                          />
                        </View>
                      );
                    })}
                  </DQ_InnerCard_Grid>
                </DQ_Card>
              )}
              {osClaims && (
                <DQ_Card
                  title={Get_CMS_Entry(
                    'my_claims_str',
                    '',
                    GetEntry().language,
                  )}
                  count={getOustandingClaims(osClaims)}
                  isOpen={openCard === 'osClaims'}
                  onPress={() => handleCardPress('osClaims')}>
                  <DQ_InnerCard_Grid
                    buttonText="Check My Claims"
                    onPress={() => {
                      navigation.navigate('Claims', {
                        policyNo: null,
                        OS_Only: true,
                      });
                    }}
                    buttonWidth={160}>
                    <View style={styles.TwoInlineElements}>
                      <DQ_Paragraph
                        content={getOustandingClaims(osClaims)}
                        textColor="black"
                        fontSize={14}
                      />
                      <DQ_Paragraph
                        content={Get_CMS_Entry(
                          'oustanding_claims_str',
                          '',
                          GetEntry().language,
                        )}
                        fontSize={14}
                        textColor="black"
                      />
                      <DQ_Paragraph
                        content={''}
                        fontSize={14}
                        textColor="black"
                      />
                      <DQ_Paragraph
                        content={''}
                        fontSize={14}
                        textColor="black"
                      />
                    </View>
                    {osClaims.map((item: any, index: number) => (
                      <View style={styles.InlineElements} key={index}>
                        <View style={styles.InlineElement}>
                          <DQ_Paragraph
                            content={item.nbrReadyToSettle}
                            fontSize={14}
                          />
                          <View style={{width: 100}}>
                            <DQ_Paragraph
                              content={Get_CMS_Entry(
                                'ready_to_settle_str',
                                '',
                                GetEntry().language,
                              )}
                              fontSize={14}
                              textColor="black"
                            />
                          </View>
                        </View>
                        <DQ_Paragraph
                          content={item?.fresh ? 'Fresh' : ''}
                          textColor="black"
                          fontSize={14}
                        />
                        <DQ_Paragraph
                          content={item.r2SAmount + ' ' + item.currency}
                          textColor="#7dadd6"
                          fontSize={14}
                        />
                      </View>
                    ))}
                  </DQ_InnerCard_Grid>
                </DQ_Card>
              )}
              {pendingRenewals && (
                <DQ_GoButton
                  title={Get_CMS_Entry('Renewals', '', GetEntry().language)}
                  count={pendingRenewals[0]?.nbrRenewals}
                />
              )}
              {pendingRequests && (
                <DQ_GoButton
                  title={Get_CMS_Entry(
                    'pending_request_str',
                    '',
                    GetEntry().language,
                  )}
                  count={pendingRequests[0]?.nbrRequests}
                  press={() => {
                    pendingRequests[0]?.nbrRequests > 0
                      ? navigation.navigate('Requests')
                      : {};
                  }}
                />
              )}
            </View>
          </ScrollView>
        </View>
      ): <DQ_Loader loading={isLoading}/>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Products_Container: {
    paddingTop: 15,
  },
  longPressStyle: {
    backgroundColor: '#0160ae',
  },
  longPressImage: {
    tintColor: 'white',
  },
  Image_Container: {
    padding: 1,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 110,
    flex: 1,
  },
  Product_Name: {
    marginTop: 10,
    textAlign: 'center',
    width: 80,
    flexWrap: 'wrap',
    color: '#005faf',
    fontWeight: '700',
  },
  Rounded_Image: {
    width: 45,
    height: 45,
    padding: 10,
  },
  Inline_Image: {
    borderWidth: 1,
    borderColor: '#175384',
    borderRadius: 60,
    padding: 7,
    flex: 0.5,
  },
  InlineText: {
    flex: 0.5,
  },
  mainHeader: {
    flex: 1,
  },
  cardsContainer: {
    marginTop: 30,
  },
  InlineElements: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  InlineElement: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 30,
  },
  TwoInlineElements: {
    flexDirection: 'row',
    gap: 30,
    alignItems: 'center',
    padding: 5,
  },
});
