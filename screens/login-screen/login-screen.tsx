import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import DQ_TextBox from '../../components/DQ_TextBox';
import DQ_Paragraph from '../../components/DQ_Paragraph';
import DQ_Link from '../../components/DQ_Link';
import DQ_EyeComponentTextBox from '../../components/DQ_EyeComponentTextBox';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import _shared from '../common';
import DQ_Alert from '../../components/DQ_Alert';
import {useAlert} from '../../hooks/useAlert';
import {LoginCredentials} from '../../Shared/Types';
import SharedService, { CSConnectService, LoginService } from '../../Shared/SharedService';
import {Get_CMS_Entry} from '../../Shared/CMSSharedFunction';
import {GetEntry} from '../../Shared/settings';
import DQ_Button from '../../components/DQ_Button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export default function LoginScreen({navigation}: any) {
  const logo = require('../../assets/images/DQ_LOGO.png');
  const lightFont = 'Nexa Regular';
  
  const validationSchema = yup.object().shape({
    webUserID: yup.string().required(Get_CMS_Entry('user_id_req_str', '', GetEntry().language)),    
    password: yup.string().min(6, Get_CMS_Entry("min_chars_str", '', GetEntry().language)).required(Get_CMS_Entry('pass_req_str', '', GetEntry().language)),    
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      webUserID: '',
      password: '',
    },
  });

  const {isVisible, showAlert, hideAlert, errorMessage} = useAlert();

  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let credentials: LoginCredentials;

  // Set alert handler in useEffect
  useEffect(() => {
    SharedService.setAlertHandler(showAlert);
  }, [showAlert]);

  const handleLogin = async () => {
    try {
      setIsLoading(true); // Show loader
      credentials = {
        mA_UserID: userId,
        cS_UserID: userId,
        cS_Password: password,
      };
      const result = await LoginService(credentials);
      console.log(result)
      _shared.ui_token = result?.response.imS_UIToken || '';
      _shared.userId = userId;
      if(result){
        const checkRoleResult = await CSConnectService();
      _shared.role = checkRoleResult?.response.user_Role || "";
      if (checkRoleResult?.response.user_Role) {
        navigation.navigate('Drawer');
      }
      }
    } catch (err: any) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.mainContainer}>
      <DQ_Alert
        isVisible={isVisible}
        hideAlert={hideAlert}
        btnList={[
          {
            title: 'Ok',
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

      <View style={styles.headerText}>
        <Image source={logo} />
      </View>

      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.inlineSubContainer}>
            <DQ_Paragraph
              content={Get_CMS_Entry('login_welcome_str', '', GetEntry().language)}
              fontSize={18}
              textColor="#555"
              textAlign="center"
            />
            <DQ_Paragraph
              content={Get_CMS_Entry('login_to_your_acc', '', GetEntry().language)}
              fontSize={18}
              textColor="grey"
              textAlign="center"
            />
          </View>

          <View style={styles.inlineSubContainerItems}>
          <Controller
              control={control}
              name="webUserID"
              render={({ field: { onChange, value } }: any) => (
                <DQ_TextBox
                  placeholder={Get_CMS_Entry('web_user_id', '', GetEntry().language)}                  
                  borderColor={errors.webUserID? "red" : "grey"}
                  value={value}
                  onChangeText={(text:any) => {
                    setUserId(text);
                    onChange(text)
                  }}
                  fontFamily={lightFont}
                  errorMessage={errors.webUserID?.message}
                />
              )}
            />          
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }: any) => (
                <DQ_EyeComponentTextBox
                  placeholder={Get_CMS_Entry('pass_str', '', GetEntry().language)}                  
                  borderColor={errors.password? "red" : "grey"}
                  value={password}
                  onChangeText={(text: any) => {
                    setPassword(text)
                    onChange(text)
                  }}
                  fontFamily={lightFont}
                  errorMessage={errors.password?.message}
                />
              )}
            />        
            <DQ_Link
              textAlign="right"
              fontSize={12}
              content={Get_CMS_Entry(
                'forgot_pass_question_str',
                '',
                GetEntry().language,
              )}
              textColor="#7aabd2"
              underline={true}
              goTo="ForgotPassword"
              onPress={() => navigation.navigate('ForgotPassword')}
            />
          </View>

          <View style={styles.inlineSubContainerItemsButton}>
            <DQ_Button
              title={Get_CMS_Entry('login_str', '', GetEntry().language)}
              onPress={handleSubmit(handleLogin)}
              loading={isLoading}
            />
          </View>

          <Pressable
            style={styles.inlineSubContainerFooter}
            onPress={() => navigation.navigate('Register')}>
            <DQ_Paragraph
              fontSize={12}
              textColor="black"
              fontFamily='Nexa Light'
              content={Get_CMS_Entry('dont_have_acc', '', GetEntry().language)}
            />
            <DQ_Link
              textAlign="center"
              fontSize={12}
              content={Get_CMS_Entry('register_now_str', '', GetEntry().language)}
              textColor="#7aabd2"
              underline={true}
              onPress={()=>navigation.navigate('Register')}
            />
          </Pressable>
        </View>
      </View>

      <View style={styles.footer}>
        <DQ_Link
          textAlign="center"
          content={Get_CMS_Entry('guest_mode_str', '', GetEntry().language)}
          textColor="white"
          underline={true}
          goTo="Guest"
          fontSize={18}
          uppercased={true}
          onPress={() => navigation.navigate('Guest')}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#005faf',
  },
  headerText: {
    flex: 0.2,
    margin: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 0.6,
    margin: 5,
  },
  subContainer: {
    flex: 1,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  inlineSubContainer: {
    alignItems: 'center',
    padding: 10,
    gap: 3,
  },
  inlineSubContainerItems: {
    margin: 10,
    marginBottom: 70,
  },
  inlineSubContainerItemsButton: {
    flex: 0.8,
    padding: 10,
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
  inlineSubContainerFooter: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    marginBottom: 10,
    padding: 15,
  },
  footer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#005faf',
    marginTop: 30,
  },
});
