import { FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import DQ_BaseHeader from '../../components/DQ_BaseHeader';
import { ActiveRequest, GetRequestsRequestData } from '../../Shared/Types';
import DQ_RequestCard from '../../components/DQ_RequestCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GetRequests } from '../../Shared/SharedService';
import _shared from '../common';

export default function RequestsListScreen({navigation, route}:any) {
    const [requests, setRequests] = useState<GetRequestsRequestData[]>([]);

    useEffect(()=>{
        const {policyNo} = route.params || {};
        const Get_Requests = async()=>{
            const result = await GetRequests(policyNo ?? null);
            const _requests = result?.requestsData.policies;
            setRequests(_requests ?? []);

        };
        Get_Requests();
    });

  return (
    <SafeAreaView >
      <DQ_BaseHeader
      variant="textCenter"
      textCenter="MY REQUESTS"
      press={()=>{navigation.navigate('Drawer', {UserPin:_shared.pin})}}
      />
     <View style={styles.RequestsContainer}>
            <FlatList
                data={requests}
                renderItem={({ item }) => (
                    <View>
                        <FlatList
                            data={item.activeRequests}
                            renderItem={({ item: subItem }:any) => (
                                <DQ_RequestCard
                                item={subItem}
                                policyNo={item.policyNo}
                                press={()=>navigation.navigate('ViewRequest',{item: subItem, policyNo: item.policyNo, productName:item.productName})}/>
                            )}
                            keyExtractor={(item:ActiveRequest) => item?.requestSerno.toString()}
                        />
                    </View>
                )}
                keyExtractor={(item:GetRequestsRequestData, index:number) => String(item.productName + item.policyNo + index) }
            />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    RequestsContainer:{
        padding:15,
    },
});
