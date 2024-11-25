import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import _shared from '../common';

export default function WalkThroughScreen({navigation} : any) {
  return (    
    <View style={styles.mainContainer}>      
      <Onboarding
        pages={[
          {
            backgroundColor: '#005CBF',
            image: (
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../assets/images/firstscreen.jpg')}
                  style={styles.inlineImageContainer}
                />
              </View>
            ),
            title: (
              <View style={styles.bottomContainer}>
                <Text style={styles.title}>MY POLICIES</Text>
                <Text style={styles.subtitle}>Check all the info on one page! Payments, Requests, Claims...</Text>
              </View>
            ),
            subtitle: '',
          },
          {
            backgroundColor: '#005CBF',
            image: (
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../assets/images/secondscreen.jpg')}
                  style={styles.inlineImageContainer}
                />
              </View>
            ),
            title: (
              <View style={styles.bottomContainer}>
                <Text style={styles.title}>AGENT?</Text>
                <Text style={styles.subtitle}>3 types of search filters available. By Name, Policy number, and Pin.</Text>
              </View>
            ),
            subtitle: '',
          },
          {
            backgroundColor: '#005CBF',
            image: (
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../assets/images/thirdscreen.jpg')}
                  style={styles.inlineImageContainer}
                />
              </View>
            ),
            title: (
              <View style={styles.bottomContainer}>
                <Text style={styles.title}>SWITCH PROFILE</Text>
                <Text style={styles.subtitle}>Switch between your profiles with one simple click.</Text>
              </View>
            ),
            subtitle: '',
          }, {
            backgroundColor: '#005CBF',
            image: (
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../assets/images/fourthscreen.jpg')}
                  style={styles.inlineImageContainer}
                />
              </View>
            ),
            title: (
              <View style={styles.bottomContainer}>
                <Text style={styles.title}>PAYMENTS</Text>

                <Text style={styles.subtitle}>Pay now your premiums directly from the app!</Text>
              </View>
            ),
            subtitle: '',
          }, {
            backgroundColor: '#005CBF',
            image: (
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../assets/images/fifthscreen.jpg')}
                  style={styles.inlineImageContainer}
                />
              </View>
            ),
            title: (
              <View style={styles.bottomContainer}>
                <Text style={styles.title}>NOTIFICATIONS</Text>
                <Text style={styles.subtitle}>Check all your notifications in one Place!</Text>
              </View>
            ),
            subtitle: '',
          },
        ]}
        showDone={true}
        showNext={true}
        showSkip={true}
        bottomBarHighlight={true}
        nextLabel="Next"
        skipLabel="Skip"
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
        onSkip={_shared.userId === '' ? async() => {await AsyncStorage.setItem('walkthroughCompleted', 'true'); navigation.navigate("Login");} : async()=>{navigation.goBack()} }
        onNext={() => {}}
        onDone={ _shared.userId === '' ? async() => { await AsyncStorage.setItem('walkthroughCompleted', 'true'); navigation.navigate("Login")} : async()=>{navigation.goBack()}}
        
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#005CBF',
  },
  imageContainer: {
    flexGrow: 0.6,
  },
  inlineImageContainer: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
  },
  bottomContainer: {
    flex: 0.6,
    backgroundColor: '#FFF',
    padding: 10,
    margin: -70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '95%',
  },
  title: {
    color: '#005CBF',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 5,
    margin: 10,
  },
  subtitle: {
    flex: 0.8,
    color: '#005CBF',
    fontSize: 14,
    padding: 10,
    textAlign: 'center',
  },
  dotStyle: {
    backgroundColor: '#005CBF',
  },
  inactiveDotStyle: {
    backgroundColor: '#CCC',
  },
});
