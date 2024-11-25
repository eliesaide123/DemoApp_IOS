import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from '@react-native-vector-icons/ionicons'; // Ensure this package is installed
import DQ_BaseHeader from '../../components/DQ_BaseHeader';
import DQ_Paragraph from '../../components/DQ_Paragraph';
import _shared from '../common';
import WalkThroughScreen from '../walkThrough-screen/walkThrough-screen';
import AgentSearchScreen from '../Agent-Search-screen/Agent-Search-screen';
import DQ_Loader from '../../components/DQ_Loader';
import CSConnect from '../csconnect-screen/CSConnect';

const Drawer = createDrawerNavigator();

function CustomDrawerContent({navigation}: any) {  

  return (
    <DrawerContentScrollView>
      {/* Drawer Header */}
      <View style={styles.drawerHeader}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.closeDrawer()}
          >
            <Icon name="close-circle" color="#ffbe26" size={22} />
          </TouchableOpacity>
          <DQ_Paragraph content="MRS. LEILA ARAB" fontFamily="Nexa Bold" />
          <TouchableOpacity style={styles.editIcon}>
            <Icon name="pencil" size={16} color="#015faf" />
          </TouchableOpacity>
        </View>
        <View style={styles.roleSection}>
          <DQ_Paragraph
            content="Policy Holder"
            fontSize={12}
            fontFamily="Nexa Bold"
            textColor="grey"
          />
          <TouchableOpacity style={styles.changeRoleButton}>
            <Icon name="person" color="#015faf" />
            <DQ_Paragraph content="Change Role" fontSize={12} fontFamily="Nexa Bold" />
          </TouchableOpacity>
        </View>
        <View style={styles.kycSection}>
          <DQ_Paragraph content="KYC 0/10" fontSize={12} fontFamily="Nexa Bold" />
        </View>
      </View>

      {/* Drawer Items */}
      <DrawerItem
        label="Home"
        labelStyle={styles.drawerLabel}
        icon={() => <Icon name="home-outline" size={20} color="#000" />}
        onPress={() => navigation.navigate('Drawer')}
      />
      <DrawerItem
        label="Notifications"
        labelStyle={styles.drawerLabel}
        icon={() => <Icon name="notifications-outline" size={20} color="#000" />}
        onPress={() => {}}
      />
      <DrawerItem
        label="About Us"
        labelStyle={styles.drawerLabel}
        icon={() => <Icon name="information-circle-outline" size={20} color="#000" />}
        onPress={() => {}}
      />
      <DrawerItem
        label="Privacy Policy"
        labelStyle={styles.drawerLabel}
        icon={() => <Icon name="document-text-outline" size={20} color="#000" />}
        onPress={() => {}}
      />
      <DrawerItem
        label="Settings"
        labelStyle={styles.drawerLabel}
        icon={() => <Icon name="settings-outline" size={20} color="#000" />}
        onPress={() => {}}
      />
      <DrawerItem
        label="Contact Us"
        labelStyle={styles.drawerLabel}
        icon={() => <Icon name="call-outline" size={20} color="#000" />}
        onPress={() => {}}
      />
      <DrawerItem
        label="Chat"
        labelStyle={styles.drawerLabel}
        icon={() => <Icon name="chatbox-ellipses-outline" size={20} color="#000" />}
        onPress={() => {}}
      />
      <DrawerItem
        label="Walkthrough"
        labelStyle={styles.drawerLabel}
        icon={() => <Icon name="walk-outline" size={20} color="#000" />}
        onPress={() => navigation.navigate('WalkThrough')}
      />
      <DrawerItem
        label="Logout"
        labelStyle={styles.drawerLabel}
        icon={() => <Icon name="log-out-outline" size={20} color="#000" />}
        onPress={() => {}}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // useEffect(() => {
  //   try{
  //     setIsLoading(true)
  //   }catch(error: any){}
  //   finally{
  //     setIsLoading(false)
  //   }    
  // }, [])

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <DQ_Loader loading={isLoading} /> */}
      <Drawer.Navigator
        drawerContent={({navigation:_nav}) => <CustomDrawerContent navigation={_nav} />}
        screenOptions={{
          headerShown: true,
          header: ({navigation: _nav}) => (
            <DQ_BaseHeader drawer navigation={_nav} roleNumber={_shared.roleNumber} />
          ),
          drawerStyle: {
            borderTopRightRadius: 40,
            borderBottomRightRadius: 40,
            overflow: 'hidden',
            backgroundColor: '#fff',
          },
        }}
      >
        <Drawer.Screen name="Home" component={_shared.role !== 'A' ? CSConnect : AgentSearchScreen} />
        <Drawer.Screen name="WalkThrough" component={WalkThroughScreen} options={{headerShown:false}}/>
      </Drawer.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  closeButton: {
    position: 'absolute',
    top: -25,
    right: 5,
  },
  editIcon: {
    padding: 4,
  },
  roleSection: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 7,
  },
  changeRoleButton: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  kycSection: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  drawerLabel: {
    fontFamily: 'Nexa Bold', // Ensure this font is linked correctly
    fontSize: 14,
    color: '#000',
  },
});
