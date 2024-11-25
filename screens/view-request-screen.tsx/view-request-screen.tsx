import { StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ActiveRequest} from '../../Shared/Types';
import DQ_BaseHeader from '../../components/DQ_BaseHeader';
import DQ_Paragraph from '../../components/DQ_Paragraph';
import DQ_Button from '../../components/DQ_Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Get_CMS_Entry } from '../../Shared/CMSSharedFunction';
import { GetEntry } from '../../Shared/settings';
import { CancelRequest } from '../../Shared/SharedService';

export default function ViewRequestScreen({navigation, route}: any) {
  const [request, setRequest] = useState<ActiveRequest>();
  const [policyNo, setPolicyNo] = useState<string>('');
  const [productName, setProductName] = useState<string>('');
  useEffect(() => {
    const {item, policyNo: _policyNo, productName:_productName} = route.params;
    setRequest(item);
    setPolicyNo(_policyNo);
    setProductName(_productName);
    console.log(item)
  }, [route.params]);

  const Cancel_Request= async(request:ActiveRequest)=>{
    const result = await CancelRequest(policyNo, request?.requestSerno);
    if(result?.status){
        navigation.goBack();
    }
  }
  return <SafeAreaView style={{flex:1}}>
    <DQ_BaseHeader variant='textCenter' textCenter={request?.polAction} press={()=>navigation.goBack()}/>
    <View style={styles.mainContainer}>
        <DQ_Paragraph content={productName} textAlign='center' fontFamily='Nexa Bold'/>
        <View style={styles.infoContainer}>
            <View style={styles.leftSide}>
                <View style={styles.dataContainer}>
                <DQ_Paragraph content={Get_CMS_Entry('policyNo_str','', GetEntry().language )} fontSize={13} textColor="black" fontFamily='Nexa Bold'/>
                <DQ_Paragraph content={policyNo} fontSize={15} fontFamily='Nexa Bold'/>
                </View>
                <View style={styles.dataContainer}>
                <DQ_Paragraph content={Get_CMS_Entry('effective_date_str','', GetEntry().language )} fontSize={13} textColor="black" fontFamily='Nexa Bold'/>
                <DQ_Paragraph content={request?.sinception} fontSize={15} fontFamily='Nexa Bold'/>
                </View>
                <View style={styles.dataContainer}>
                <DQ_Paragraph content={Get_CMS_Entry('request_notes_str','', GetEntry().language )} fontSize={13} textColor="black" fontFamily='Nexa Bold'/>
                <DQ_Paragraph content={request?.requestNote} fontSize={15} fontFamily='Nexa Bold'/>
                </View>
            </View>
            <View>
                <View style={styles.dataContainer}>
                <DQ_Paragraph content={Get_CMS_Entry('request_status_str','', GetEntry().language )} fontSize={13} textColor="black" fontFamily='Nexa Bold'/>
                <DQ_Paragraph content={request?.requestStatus} fontSize={15} fontFamily='Nexa Bold'/>
                </View>
            </View>
        </View>
        {request?.allowCancel && <View>
            <DQ_Button title={Get_CMS_Entry('cancel_request_str','', GetEntry().language)} onPress={()=>Cancel_Request(request)}/>
        </View>}
    </View>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
    mainContainer:{
        margin:20,
        flex:1,
    },
    infoContainer:{
        alignContent:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        padding:20,
        marginTop:15,
        flex:0.98,
    },
    leftSide:{
        gap:20
    },
    dataContainer:{
        gap:5
    }
});
