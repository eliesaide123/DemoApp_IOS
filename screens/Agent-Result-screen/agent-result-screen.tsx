import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import DQ_Paragraph from '../../components/DQ_Paragraph';
import _shared from '../common';
import DQ_PolicyCard from '../../components/DQ_PolicyCard';
import Icon from '@react-native-vector-icons/fontawesome6';
import DQ_Loader from '../../components/DQ_Loader';
import { PerformSearch } from '../../Shared/SharedService';


const imageMapping: {[key: string]: any} = {
    'dq.png': require('../../assets/images/DataQuest_Logo.png'),
    'agent.png': require('../../assets/images/agent.png'),
  };

export default function AgentResult({navigation, route}:any) {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

      useEffect(()=>{
        const {params} = route.params;
        PerformSearchService(params);

      },[route.params])

      const PerformSearchService = async (params:any) => {
        setLoading(true);
        const result = await PerformSearch(params);
        setSearchResults(result|| []);
        setLoading(false);
      };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {loading && <DQ_Loader loading={loading} />}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={18} color="#005faf" iconStyle="solid" />
        </TouchableOpacity>
        <View style={styles.dqLogo}>
        <Image
          source={imageMapping['dq.png']}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </View>
      <View style={styles.agentLogo}>
        <Image 
          source={imageMapping['agent.png']}
          resizeMode="contain"
          style={styles.AgentlogoImage}
        />
        <DQ_Paragraph content={_shared.userId} fontFamily='Nexa Bold' fontSize={20} textAlign='center'/>
      </View>

      {searchResults.length > 0 &&(
        <View style={styles.users}>
          <FlatList
              data={searchResults}
              renderItem={({item}) => (
                <DQ_PolicyCard
                  item={item}
                  variant='agent'
                  press={()=>{navigation.navigate("ProductPolicy", {pin: item.pin})}}
                  />)}  
              keyExtractor={(item: any) => String(item.pin)}
            />
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    mainContainer:{
        flex : 1,
    },

    dqLogo: {
        flex : 0.15,
        padding:20,
    },

    logoImage: {
        width: 200,
        height: 100,
        alignSelf: 'center',
      },

    agentLogo: {
        flex : 0.25,
        padding:10,
        gap:20
    },

    AgentlogoImage : {
        width: 120,
        height:120,
        alignSelf: 'center',
    },
    users:{
      flex:0.5,
      margin:10
    },
    backButton: {
      padding: 15,
      height: 50,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
})