import './gesture-handler';
import React, {useEffect, useState} from 'react';
import WalkThroughScreen from './screens/walkThrough-screen/walkThrough-screen';
import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/login-screen/login-screen';
import RegistrationScreen from './screens/registration-screen/registration-screen';
import ChangeRole from './screens/change-role-screen/ChangeRole';
import PolicyList from './screens/Policy-List-screen/policy-list-screen';
import AgentSearch from './screens/Agent-Search-screen/Agent-Search-screen';
import PolicyDetails from './screens/policy-details-screen/policy-details-screen';
import AgentResult from './screens/Agent-Result-screen/agent-result-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ClaimsScreen from './screens/claims-screen/claims-screen';
import ViewRequestScreen from './screens/view-request-screen.tsx/view-request-screen';
import ClaimSettlement from './screens/claim-settlement-screen/claim-settlement-screen';
import DrawerScreen from './screens/drawer-screen/drawer-screen';
import CSConnect from './screens/csconnect-screen/CSConnect';
import RequestsListScreen from './screens/requests-list-screen/requests-list-screen';
import RequestScreen from './screens/request-screen/request-screen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isWalkthroughComplete, setIsWalkthroughComplete] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Check AsyncStorage for the key that determines if walkthrough is completed
    const checkWalkthroughStatus = async () => {
      try {
        const walkthroughStatus = await AsyncStorage.getItem(
          'walkthroughCompleted',
        );
        if (walkthroughStatus === 'true') {
          setIsWalkthroughComplete(true);
        }
      } catch (error) {
        console.error('Error reading AsyncStorage', error);
      } finally {
        setLoading(false); // Set loading to false once the check is done
      }
    };

    checkWalkthroughStatus();
  }, []);

  // If loading, display a loading indicator until AsyncStorage check is complete
  if (loading) {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBar translucent backgroundColor="rgb(0, 95, 175)" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar translucent backgroundColor="rgb(0, 95, 175)" />
      <NavigationContainer>
        <Stack.Navigator>
          {!isWalkthroughComplete && (
            <Stack.Screen
              name="WalkThrough"
              component={WalkThroughScreen}
              options={{
                headerShown: false,
                headerStyle: {
                  backgroundColor: '#f4511e',
                },
              }}
            />
          )}
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: '#f4511e',
              },
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegistrationScreen}
            options={{
              headerShown: false,
            }}
          />
           <Stack.Screen
            name="Drawer"
            component={DrawerScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CSConnect"
            component={CSConnect}
            options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: '#f4511e',
              },
            }}
          />
          <Stack.Screen
            name="Roles"
            component={ChangeRole}
            options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: '#f4511e',
              },
            }}
          />
          <Stack.Screen
            name="PolicyList"
            component={PolicyList}
            options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: '#f4511e',
              },
            }}
          />
          <Stack.Screen
            name="AgentSearch"
            component={AgentSearch}
            options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: '#f4511e',
              },
            }}
          />
          <Stack.Screen
            name="AgentResult"
            component={AgentResult}
            options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: '#f4511e',
              },
            }}
          />
          <Stack.Screen
            name="PolicyDetails"
            component={PolicyDetails}
            options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: '#f4511e',
              },
            }}
          />
          <Stack.Screen
            name="Claims"
            component={ClaimsScreen}
            options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: '#f4511e',
              },
            }}
          />
          <Stack.Screen
            name="ClaimsSettlement"
            component={ClaimSettlement}
            options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: '#f4511e',
              },
            }}
          />
          <Stack.Screen
            name="Requests"
            component={RequestsListScreen}
            options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: '#f4511e',
              },
            }}
          />
          <Stack.Screen
            name="ViewRequest"
            component={ViewRequestScreen}
            options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: '#f4511e',
              },
            }}
          />
          <Stack.Screen
            name="Request"
            component={RequestScreen}
            options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: '#f4511e',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
