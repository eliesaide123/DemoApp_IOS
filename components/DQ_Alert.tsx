// components/DQ_Alert.tsx
import Icon from '@react-native-vector-icons/fontawesome6';
import { Modal, StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native';
import DQ_Button from './DQ_Button';

const logo = require('../assets/images/DataQuest_Logo.png');

export default function DQ_Alert({
  isVisible,
  hideAlert,
  btnList,
  children,
}: any) {
  return (
    <View>
      <Modal
        visible={isVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={hideAlert}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.alert}>
              <TouchableOpacity onPress={hideAlert}>
                <View style={styles.closeButton}>
                  <Icon name="circle-xmark" size={18} color="#ffc02c" />
                </View>
              </TouchableOpacity>
              <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo} resizeMode="contain" />
              </View>
              <View style={styles.alertMessage}>{children}</View>
              {btnList && (
                <View style={styles.alertButtonGroup}>
                  <FlatList
                    data={btnList}
                    renderItem={({ item }) => (
                      <View style={{ margin: 5 }}>
                        <DQ_Button title={item.title} onPress={item.press} />
                      </View>
                    )}
                    keyExtractor={(item) => item.title}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000080',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '85%',
    maxWidth: 400,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  alert: {
    width: '100%',
    maxWidth: 500,
    maxHeight: 600,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 9,
    backgroundColor: '#fff',
    padding: 15,
  },
  closeButton: {
    alignItems: 'flex-end',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 90,
  },
  alertMessage: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 25,
    flexDirection: 'column',
  },
  alertButtonGroup: {
    marginTop: 0,
    marginBottom: 8,
    justifyContent: 'center',
  },
});
