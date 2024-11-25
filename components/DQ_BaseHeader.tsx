import Icon from '@react-native-vector-icons/fontawesome6';
import {default as Ionicon} from '@react-native-vector-icons/ionicons';
import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import DQ_Paragraph from './DQ_Paragraph';

const logo = require('../assets/images/DQ_LOGO.png');
const miniLogo = require('../assets/images/DQ_LOGO_MINI.png');  // Assume you have a mini version of the logo here
const changeRoleLogo = require('../assets/images/mutlirole.png');

export default function DQ_BaseHeader({
  navigation,
  press,
  roleNumber = 1,
  variant = 'logoCenter',  // 'logoCenter' for structure 1, 'textCenter' for structure 2
  textCenter,
  userId,
  drawer=false,
  ...props
}: any) {
  return (
    <View style={styles.header}>
      <View style={styles.commands}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={drawer ? navigation.openDrawer : press}>
          {drawer ? <Ionicon name="menu" size={24} color="white"/>:<Icon name="chevron-left" size={18} color="#FFFFFF" iconStyle="solid" />}
        </TouchableOpacity>
        
        {/* Role Change Icon if roleNumber > 1 */}
        {roleNumber > 1 && (
          <TouchableOpacity onPress={() => navigation.navigate('Roles', {userId})}>
            <Image source={changeRoleLogo} style={styles.changeRoleIcon} resizeMode="contain" />
          </TouchableOpacity>
        )}
      </View>

      {/* Conditional rendering based on the `variant` prop */}
      {variant === 'logoCenter' ? (
        // Structure 1: Logo in the center
        <View style={styles.centerContent}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </View>
      ) : (
        // Structure 2: Text in the center, mini logo on the right
        <>
          <View style={styles.textcenterContent}>
            <DQ_Paragraph content={textCenter} textAlign="center" textColor="white" fontSize={18} fontFamily='Nexa Bold' {...props}/>
          </View>
          <View style={styles.rightIcon}>
            <Image source={miniLogo} style={styles.miniLogo} resizeMode="contain" />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#005faf',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderStartEndRadius: 20,
    borderEndEndRadius: 20,
    zIndex:10
  },
  commands: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: 10,
  },
  backButton: {
    padding: 15,
    height: 50,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  changeRoleIcon: {
    width: 30,
    height: 25,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf:'center',
    marginRight:50,
    top:-3
  },
  textcenterContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf:'center',
    textAlign:'center',
    marginRight:30,
    marginTop:5,
    top:-3
  },
  logo: {
    height: 50,
  },
  centerText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  rightIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniLogo: {
    width: 30,
    height: 30,
  },
});

