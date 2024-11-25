import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import DQ_BaseHeader from '../../components/DQ_BaseHeader';
import DQ_Paragraph from '../../components/DQ_Paragraph';

import DQ_Dropdown from '../../components/DQ_Dropdown';
import Icon from '@react-native-vector-icons/fontawesome6';
import DQ_TextBox from '../../components/DQ_TextBox';
import DQ_Button from '../../components/DQ_Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DQ_Alert from '../../components/DQ_Alert';
import {useAlert} from '../../hooks/useAlert';
import DatePicker from 'react-native-modern-datepicker';
import {ClaimSettle, SettleDetails} from '../../Shared/Types';
import DQ_Loader from '../../components/DQ_Loader';
import { Get_CMS_Entry } from '../../Shared/CMSSharedFunction';
import { GetEntry } from '../../Shared/settings';
import { GetClaimsSettle, SettleClaim } from '../../Shared/SharedService';

const regexExpression = '^\\w{15,34}$';

// Function to validate IBAN
const isValidIban = (iban: string) => {
  try {
    if (typeof regexExpression === 'string') {
      const regex = new RegExp(regexExpression);
      return regex.test(iban);
    }
  } catch (error) {
    console.error('IBAN Validation Error:', error);
  }
  return false;
};

export default function ClaimSettlement({navigation, route}: any) {
  const [policyNo, setPolicyNo] = useState<string>('');
  const [imsClaimsNo, setImsClaimsNo] = useState<string>('');
  const [imsClaimsRef, setImsClaimsRef] = useState<string>('');
  const [imsClaimRefLabel, setIMSClaimRefLabel] = useState<string>('');
  const [claimAmountLabel, setClaimAmountLabel] = useState<string>('');
  const [toBeSettledAmount, setToBeSettledAmount] = useState<string>('');
  const [inception, setInception] = useState<string>('');
  const [inceptionLabel, setInceptionLabel] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [settleDetails, setSettleDetails] = useState<SettleDetails[]>([]);
  const [disclaimer, setDisclaimer] = useState<string>('');
  const [editInception, setEditInception] = useState<boolean>(false);
  const [action, setAction] = useState<string>('');
  const [actions, setActions] = useState<any[]>([]);
  const [banks, setBanks] = useState<any[]>([]);
  const [selectedBank, setSelectedBank] = useState<any>(null);
  const [iban, setIban] = useState<string>('');
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [date, setDate] = useState<string>('');
  const [loading, isLoading] = useState<boolean>(false);

  const {isVisible, showAlert, hideAlert, errorMessage} = useAlert();

  useEffect(() => {
    const {
      policyNo: _policyNo,
      imsClaimsNo: _imsClaimsNo,
      imsClaimsRef: _imsClaimsRef,
      claimNo: _imsClaimRefLabel,
      claimAmount: _settledAmountLabel,
      date: _occuredOnLabel,
      toBeSettledAmount: _toBeSettledAmount,
      notes: _notes,
      settleDetails: _settleDetails,
    } = route.params;

    setPolicyNo(_policyNo);
    setImsClaimsNo(_imsClaimsNo);
    setImsClaimsRef(_imsClaimsRef);
    setIMSClaimRefLabel(_imsClaimRefLabel);
    setClaimAmountLabel(_settledAmountLabel);
    setToBeSettledAmount(_toBeSettledAmount);
    setNotes(_notes);
    setSettleDetails(_settleDetails);

    const Get_Settle_options = async () => {
      try {
        isLoading(true);
        const result: any = await GetClaimsSettle(
          _policyNo,
          _imsClaimsNo,
          'RqClmToSetlC',
        );
        const inception =
          result.response.claimSettleOptionsData.claimSettleOptions[0]
            .inception;
        setInception(inception);

        const disclaimer =
          result.response.claimSettleOptionsData.claimSettleOptions[0]
            .disclaimer;
        setDisclaimer(disclaimer);

        const _setEditInception =
          result.response.claimSettleOptionsData.claimSettleOptions[0]
            .editInception;
        setEditInception(_setEditInception);

        const inceptionKey = Object.keys(
          result.response.claimSettleOptionsData.claimSettleOptions[0],
        ).find(key => key === 'inception');
        setInceptionLabel(Get_CMS_Entry('date_str', '', GetEntry().language));

        const actionsData =
          result.response.claimSettleOptionsData.claimSettleOptions[0].actions;
        setActions(actionsData);

        const banksData =
          result.response.claimSettleOptionsData.claimSettleOptions[0].banks;
        setBanks(banksData);
      } catch (error: any) {
      } finally {
        isLoading(false);
      }
    };

    Get_Settle_options();
  }, [route.params]);

  function handleDateChange(date: string) {
    setDate(date); // Update the date when changed
    setOpenDatePicker(false); // Close the date picker modal
  }

  const claimSettle: ClaimSettle = {
    requestReference: imsClaimsRef,
    policyNo: policyNo,
    imsClaimNo: imsClaimsNo,
    actionCode: action,
    settleAction: 'RqClmToSetlC',
    inception: inception,
    bank: selectedBank,
    iban: iban,
    notes: notes,
    settleDetails: settleDetails,
  };

  const handleSettlementConfirmation = async () => {
    try {
      isLoading(true);
      const result = await SettleClaim(claimSettle);
      if (result?.status) {
        hideAlert();
      }
    } catch (error: any) {
    } finally {
      isLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {loading && <DQ_Loader loading={loading} />}
      <KeyboardAwareScrollView>
        <DQ_BaseHeader
          press={() => navigation.goBack()}
          variant="textCenter"
          textCenter={Get_CMS_Entry('claims_screen_title', '', GetEntry().language)}
          uppercased
        />
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              gap: 20,
              marginBottom: 50,
            }}>
            <View style={styles.innerContainer}>
              <DQ_Paragraph content={Get_CMS_Entry('claim_settlement_str', '', GetEntry().language)} textAlign="center" />
            </View>
            <View style={styles.container}>
              <View style={styles.spaceBetweenContainer}>
                <DQ_Paragraph content={imsClaimRefLabel} textColor="black" />
                <DQ_Paragraph content={imsClaimsRef} textColor="#5392c4" />
              </View>
              <View style={styles.spaceBetweenContainer}>
                <DQ_Paragraph content={claimAmountLabel} textColor="black" />
                <DQ_Paragraph content={toBeSettledAmount} textColor="#5392c4" />
              </View>
              <View style={styles.spaceBetweenContainer}>
                <DQ_Paragraph content={inceptionLabel} textColor="black" />
                <View
                  style={{flexDirection: 'row', gap: 15, alignItems: 'center'}}>
                  {!editInception && (
                    <TouchableOpacity onPress={() => setOpenDatePicker(true)}>
                      <Icon
                        name="pen-to-square"
                        iconStyle="solid"
                        color="#5392c4"
                        size={14}
                      />
                    </TouchableOpacity>
                  )}
                  {openDatePicker && (
                    <Modal
                      animationType="fade"
                      transparent={true}
                      visible={openDatePicker}
                      onRequestClose={() => setOpenDatePicker(false)}>
                      <View style={styles.modalContainer}>
                        <Pressable onPress={() => setOpenDatePicker(false)}>
                          <DatePicker
                            mode="calendar"
                            options={{
                              selectedTextColor: '#fff',
                              textHeaderColor: '#0560ac',
                              mainColor: '#0560ac',
                              textSecondaryColor: '#0560ac',
                              borderColor: 'transparent',
                            }}
                            selected={date}
                            onDateChange={handleDateChange}
                            style={styles.datePicker} // Apply style to make it smaller
                          />
                          <View style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Close</Text>
                          </View>
                        </Pressable>
                      </View>
                    </Modal>
                  )}
                  <DQ_Paragraph content={date ? date : inception} />
                </View>
              </View>
              <View style={{flexDirection: 'column'}}>
                <DQ_Dropdown
                  data={actions}
                  value={action}
                  onChange={item => setAction(item.description)}
                  placeholder={Get_CMS_Entry('select_action_str', '', GetEntry().language)}
                  labelField="description"
                  valueField="description"
                />
                {action === 'Bank Transfer' && (
                  <View>
                    <DQ_Dropdown
                      data={banks}
                      value={selectedBank ?? ''}
                      onChange={item => setSelectedBank(item)}
                      placeholder={Get_CMS_Entry('bank_str', '', GetEntry().language)}
                      labelField="bankName"
                      valueField="bankNo"
                    />
                    <DQ_TextBox
                      value={iban}
                      backgroundColor="#f2f2f2"
                      onChangeText={(text: string) => {
                        const trimmedText = text.trim();
                        setIban(trimmedText);

                        // Validate the IBAN and log the result
                        if (isValidIban(trimmedText)) {
                          setIban(trimmedText); // Set the value if valid
                        } else {
                          console.log('incorrect');
                        }
                      }}
                      placeholder={Get_CMS_Entry('iban_str', '', GetEntry().language)}
                    />
                  </View>
                )}
                <View>
                  <DQ_Paragraph
                    content={disclaimer}
                    fontSize={9}
                    textColor="#b0b0b0"
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.outerContainerBtn}>
            <DQ_Button
              title={Get_CMS_Entry('submit_str', '', GetEntry().language)}
              onPress={() =>
                showAlert(
                  `${Get_CMS_Entry('amount_of_str', '', GetEntry().language)} ${toBeSettledAmount} ${Get_CMS_Entry( `will_be_settled_${action.toLowerCase().includes("check")? "cheque": action.toLowerCase().includes("wish") ? "wish" : "account"}`, 'str', GetEntry().language)}`,
                )
              }
            />
          </View>
        </View>
        <DQ_Alert
          isVisible={isVisible}
          hideAlert={hideAlert}
          btnList={[
            {
              title: Get_CMS_Entry('confirm_settlment_str', '', GetEntry().language),
              press: () => {
                handleSettlementConfirmation();
                setTimeout(() => {
                    hideAlert()
                }, 1000);
                {loading && <DQ_Loader loading={loading} />}
              },
            },
            {
              title: Get_CMS_Entry('cancel_str', '', GetEntry().language),
              press: () => {
                hideAlert();
              },
            },
          ]}>
          <DQ_Paragraph
            content={errorMessage}
            textColor="black"
            textAlign="center"
            fontSize={14}
          />
        </DQ_Alert>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  innerContainer: {
    marginTop: 15,
  },
  container: {
    paddingHorizontal: 15,
  },
  spaceBetweenContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  outerContainerBtn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  datePicker: {
    width: 300, // Adjust width to make the picker smaller
    height: 300, // Adjust height to make it smaller
    backgroundColor: 'white', // Ensure the background is visible
    borderRadius: 10, // Optional rounded corners
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#ffbe26',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10, // Add margin to separate from the picker
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
