/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import DQ_BaseHeader from '../../components/DQ_BaseHeader';
import DQ_PolicyIconDescription from '../../components/DQ_PolicyIconDescription';
import DQ_TabView from '../../components/DQ_TabView';
import DQ_Contract from '../../components/DQ_Contract';
import DQ_Vehicle from '../../components/DQ_Vehicle';
import DQ_Insured from '../../components/DQ_Insured';
import DQ_InsuredCovers from '../../components/DQ_InsuredCovers';
import _shared from '../common';
import DQ_Loader from '../../components/DQ_Loader';
import DQ_InsuredRisks from '../../components/DQ_InsuredRisks';
import DQ_Dependent from '../../components/DQ_Dependent';
import DQ_FAB from '../../components/DQ_FAB';
import {useAlert} from '../../hooks/useAlert';
import DQ_Alert from '../../components/DQ_Alert';
import DQ_Paragraph from '../../components/DQ_Paragraph';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  GetDetails,
  GetPolicyDetails,
  GetRequestActions,
  RequestPrint,
} from '../../Shared/SharedService';
import {Get_CMS_Entry} from '../../Shared/CMSSharedFunction';
import {GetEntry} from '../../Shared/settings';
import { useFocusEffect } from '@react-navigation/native';

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

const componentMapping: {[key: string]: any} = {
  contract: DQ_Contract,
  vehicle: DQ_Vehicle,
  insuredDep: DQ_Dependent,
  insuredData: DQ_Insured,
  insuredRisks: DQ_InsuredRisks,
  insuredCoverData: DQ_InsuredCovers,
};

const titleMapping: {[key: string]: string} = {
  contract: 'Contract',
  vehicle: 'Vehicle',
  insuredDep: 'Dependent',
  insuredData: 'Insured',
  insuredRisks: 'Insured Risks',
  insuredCoverData: 'Insured Covers',
};

export default function PolicyDetails({navigation, route}: any) {
  const [groupCode, setGroupCode] = useState<string>('');
  const [policyNo, setPolicyNo] = useState<string>('');
  const [tabs, setTabs] = useState<any[]>([]);
  const [policyData, setPolicyData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [clickedFAB, setClickedFAB] = useState<boolean>(false);
  const [policyActions, setPolicyActions] = useState<any>(null);
  const [specialActions, setSpecialActions] = useState<any>(null);
  const [btnList, setBtnList] = useState<any[]>([]);

  const [actions, setActions] = useState<any>({
    predefinedActions: [],
    policyActions: [],
    specialActions: [],
  });

  const {isVisible, showAlert, hideAlert, errorMessage} = useAlert();

  const navigateToComponent = (navigateTo: any, params?: any) => {
    return navigation.navigate(navigateTo, params || {});
  };
  const {
    policyNo: _policyNo,
    groupCode: grpCode,
    policyDetailsURI: _policyDetailsURI,
    policyInsCoversURI: _policyInsCoversURI,
    policyDataURI: _policyDataURI,
    suffix: _suffix,
    currency: _currency,
  } = route.params;

  const callPrintService = async (url: any, actionCode: any) => {
    handleOverlayClick();
    setBtnList([
      {
        title: 'Ok',
        press: async () => {
          await RequestPrint(
            _shared.userId,
            _shared.pin,
            _shared.role,
            _policyNo,
            url,
            actionCode,
          );
          hideAlert();
        },
      },
      {
        title: 'Cancel',
        press: () => {
          hideAlert();
        },
      },
    ]);
    showAlert(Get_CMS_Entry('print_policy_conf_str', '', GetEntry().language));
  };

  const callServiceWithURL = async (url: any) => {
    const result = await GetDetails(_policyNo, url);
    const policyDetails = result?.response?.policyDetails;
    if (url.includes('address')) {
      handleOverlayClick();
      if (policyDetails && 'legalAddress' in policyDetails) {
        setBtnList(
          [
            policyDetails?.legalAddress[0]?.gpsLocation !== "" && {
              title: 'Go To Direction',
              press: () => {
                // TODO: Add your logic here
              },
            },
            {
              title: 'Cancel',
              press: () => {
                hideAlert();
              },
            },
          ].filter(Boolean)
        );
        showAlert(policyDetails?.legalAddress[0].addressString);
      }
    } else if (url.includes('beneficiary')) {
      handleOverlayClick();
      setBtnList([
        {
          title: 'Ok',
          press: () => {
            hideAlert();
          },
        },
      ]);
      if (policyDetails && 'beneficiaries' in policyDetails) {
        const textClause = policyDetails.beneficiaries[0]?.textClause;
        showAlert(policyDetails?.beneficiaries[0].textClause);
      }
    }
  };

  const getRequestsActions = async (policyNo: string, productName: string) => {
    const result = await GetRequestActions(policyNo);
    setPolicyActions(result?.policyActionsData.policyActions);
    setSpecialActions(result?.policyActionsData.specialActions);
    setActions((prev: any) => ({
      ...prev,
      policyActions: result?.policyActionsData.policyActions?.map(
        (item: any) => ({
          ...item,
          goTo: 'Request',
          params:{policyAction: item.actionDesc, productName: productName, policyNo: policyNo, actionCode: item.actionCode, },
          iconName: 'clipboard-list',
        }),
      ),
      specialActions: result?.policyActionsData.specialActions?.map(
        (item: any) => ({
          ...item,
          iconName:
            item.actionCode === 'MOBILE' ? 'mobile-screen-button' : 'envelope',
        }),
      ),
    }));
  };

  const getActions = (contractData: any) => {
    const predefinedActions = [
      {
        attr: 'canPrintPolicy',
        value: String(contractData[0].canPrintPolicy || ''),
        title: 'Print Policy',
        iconName: 'person-circle-plus',
        actionCode: 'RqPrintPolicy',
        url: '/request/print',
        actionPrint: true,
      },
      {
        attr: 'hasBeneficiary',
        value: String(contractData[0].hasBeneficiary || ''),
        title: 'Beneficiary',
        iconName: 'person-circle-plus',
        url: '/policy/beneficiary',
      },
      {
        attr: 'hasLegalAddress',
        value: String(contractData[0].hasLegalAddress || ''),
        title: 'Legal Address',
        iconName: 'location-dot',
        url: '/policy/address',
      },
      {
        attr: 'hasClaims',
        value: String(contractData[0].hasClaims || ''),
        title: 'Policy Claims',
        iconName: 'file-pen',
        goTo: 'Claims',
        params: {PolicyNo: _policyNo, OS_Only: _policyNo.length <= 0},
      },
      {
        attr: 'hasDuePremiums',
        value: String(contractData[0].hasDuePremiums || ''),
        title: 'Due Premiums',
        iconName: 'business-time',
      },
      {
        attr: 'hasPendingRequests',
        value: String(contractData[0].hasPendingRequests || ''),
        title: 'My Requests',
        iconName: 'clipboard-list',
        goTo: 'Requests',
        params: {policyNo: _policyNo},
      },
      {
        attr: 'canPrintAlpSoa',
        value: String(contractData[0].canPrintAlpSoa || ''),
        title: 'Print SOA',
        iconName: 'person-circle-plus',
        actionCode: 'RqPrintPolicy',
        url: '/request/print',
      },
      {
        attr: 'canRenewPolicy',
        value: String(contractData[0].canRenewPolicy || ''),
        title: 'Renew',
        iconName: 'clipboard-list',
      },
    ];
    setActions((prev: any) => ({
      ...prev,
      predefinedActions,
    }));
  };

  useFocusEffect(
    useCallback(() => {
    const initializePolicyDetails = async () => {
      try {
        setIsLoading(true);

        setGroupCode(grpCode);
        setPolicyNo(_policyNo);

        const result = await GetPolicyDetails(
          _policyNo,
          _policyDetailsURI,
        );

        const policyDetails = result?.policyDetails;
        await getRequestsActions(_policyNo, policyDetails['contract'][0].productName);
        await getActions(policyDetails.contract);

        const updatedTabs: any[] = [];
        Object.keys(componentMapping).forEach(key => {
          if (
            policyDetails[key] &&
            (Array.isArray(policyDetails[key])
              ? policyDetails[key].length > 0
              : true)
          ) {
            const TabContent = componentMapping[key];
            if (TabContent == DQ_Contract) {
              updatedTabs.push({
                key: titleMapping[key],
                title: titleMapping[key],
                content: (
                  <TabContent
                    item={policyDetails[key]}
                    contractAdditional={policyDetails['contractAdditional']}
                    groupCode={grpCode}
                    suffix={_suffix}
                  />
                ),
              });
            } else if (TabContent == DQ_InsuredCovers) {
              updatedTabs.push({
                key: titleMapping[key],
                title: titleMapping[key],
                content: (
                  <TabContent
                    item={policyDetails[key]}
                    coversURL={_policyInsCoversURI}
                    policyNo={_policyNo}
                    suffix={_suffix}
                    currency={_currency}
                  />
                ),
              });
            } else if (TabContent == DQ_InsuredRisks) {
              updatedTabs.push({
                key: titleMapping[key],
                title: titleMapping[key],
                content: (
                  <TabContent
                    item={policyDetails[key]}
                    coversURL={_policyInsCoversURI}
                    policyDataURI={_policyDataURI}
                    policyNo={_policyNo}
                    suffix={_suffix}
                    currency={_currency}
                  />
                ),
              });
            } else {
              updatedTabs.push({
                key: titleMapping[key],
                title: titleMapping[key],
                content: (
                  <TabContent item={policyDetails[key]} suffix={_suffix} />
                ),
              });
            }
          }
        });

        setTabs(updatedTabs);
        setPolicyData(policyDetails);
      } catch (error) {
        console.error('Error fetching policy details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    initializePolicyDetails();
  }, [
    _policyDataURI,
    _policyDetailsURI,
    _policyInsCoversURI,
    _policyNo,
    _currency,
    _suffix,
    grpCode,
  ]),);

  const handleOverlayClick = () => setClickedFAB(prev => !prev);

  return (
    <SafeAreaView style={styles.rootElement}>
      <DQ_Alert isVisible={isVisible} hideAlert={hideAlert} btnList={btnList}>
        <DQ_Paragraph
          content={errorMessage}
          textColor="black"
          textAlign="center"
          fontSize={14}
        />
      </DQ_Alert>
      <DQ_BaseHeader
        variant="textCenter"
        textCenter={groupCode}
        press={() => navigation.goBack()}
        capitalized
      />
      {clickedFAB && (
        <View style={styles.overlay} onTouchStart={handleOverlayClick} />
      )}
      <View style={styles.fab}>
        {actions.predefinedActions.length > 0 && (
          <DQ_FAB
            clicked={clickedFAB}
            setClicked={setClickedFAB}
            actions={actions}
            navigateToComponent={navigateToComponent}
            callPrintService={callPrintService}
            callServiceWithURL={callServiceWithURL}
          />
        )}
      </View>
      <View>
        {groupCode && policyNo && (
          <DQ_PolicyIconDescription
            src={imageMapping[groupCode]}
            policyNo={policyNo}
          />
        )}
      </View>
      {isLoading ? (
        <DQ_Loader loading={isLoading} />
      ) : (
        <DQ_TabView tabs={tabs} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootElement: {flex: 1, backgroundColor: '#ebebeb'},
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 1,
  },
  fab: {position: 'relative', top: 13, right: -290, zIndex: 500},
});
