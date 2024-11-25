/* eslint-disable react/react-in-jsx-scope */
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';

import DQ_Button from '../../components/DQ_Button';
import DQ_TextBox from '../../components/DQ_TextBox';
import DQ_Paragraph from '../../components/DQ_Paragraph';
import DQ_Link from '../../components/DQ_Link';
import DQ_EyeComponentTextBox from '../../components/DQ_EyeComponentTextBox';
import DQ_CheckBox from '../../components/DQ_CheckBox';
import Icon from '@react-native-vector-icons/fontawesome6';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Get_CMS_Entry } from '../../Shared/CMSSharedFunction';
import { GetEntry } from '../../Shared/settings';
import _shared from '../common';

export default function RegistrationScreen({ navigation }: any) {
  const logo = require('../../assets/images/DQ_LOGO.png');

  const regularFont = 'Nexa Regular';
  const lightFont = 'Nexa Regular';
  const boldFont = 'Nexa Bold';

  const validationSchema = yup.object().shape({
    policyNumber: yup.string().required(Get_CMS_Entry("policy_req_str", "", GetEntry().language)),
    policyExpiry: yup.string().required('Expiry date is required'),
    pin: yup.string().required(Get_CMS_Entry("pin_req_str", "", GetEntry().language)),
    email: yup.string().email(Get_CMS_Entry("valid_email_str", "", GetEntry().language)).required(Get_CMS_Entry("email_req_str", "", GetEntry().language)),
    mobileNumber: yup.string().required(Get_CMS_Entry("mobile_req_str", "", GetEntry().language)),
    webUserID: yup.string().required(Get_CMS_Entry("user_id_req_str", "", GetEntry().language)),
    password: yup.string().min(6, Get_CMS_Entry("min_chars_str", "", GetEntry().language)).required(Get_CMS_Entry("pass_req_str", "", GetEntry().language)),
    confirmPassword: yup.string().oneOf([yup.ref('password')]).required(Get_CMS_Entry("pass_req_str", "", GetEntry().language)),
    isChecked: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      policyNumber: '',
      policyExpiry: '',
      pin: '',
      email: '',
      mobileNumber: '',
      webUserID: '',
      password: '',
      confirmPassword: '',
      isChecked: false,
    },
  });

  const checkBoxLabel = () => (
    <View style={styles.checkBoxLabel}>
      <DQ_Paragraph
        content={Get_CMS_Entry('agree_to_str', '', GetEntry().language)}
        fontSize={12}
        textColor="black"
        textAlign="center"
      />
      <DQ_Link
        textAlign="center"
        fontSize={12}
        content={Get_CMS_Entry('terms_cond_str', '', GetEntry().language)}
        textColor="#68a2cf"
        underline={true}
        goTo=""
      />
    </View>
  );

  const onSubmit = (data: any) => {
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Icon
          name="chevron-left"
          size={18}
          color="white"
          style={styles.icon}
          iconStyle="solid"
        />
      </TouchableOpacity>
      <View style={styles.headerText}>
        <Image source={logo} />
      </View>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.inlineSubContainer}>
            <DQ_Paragraph
              content={Get_CMS_Entry('welcome_str', '', GetEntry().language)}
              fontSize={18}
              fontFamily={regularFont}
              textColor="#555"
              textAlign="center"
              uppercased={true}
            />
            <DQ_Paragraph
              content={Get_CMS_Entry('enter_policy_title_str', '', GetEntry().language)}
              fontSize={18}
              fontFamily={lightFont}
              textColor="#ced1d4"
              textAlign="center"
            />
          </View>
          <View style={styles.inlineSubContainerItems}>
          <DQ_TextBox
                  placeholder={Get_CMS_Entry('policy_number_str', '', GetEntry().language)}
                  hintText={Get_CMS_Entry('example_policy_str', '', GetEntry().language)}
                  borderColor={errors.policyNumber? "red" : "grey"}
                  fontFamily={lightFont}
                  errorMessage={errors.policyNumber?.message}
                />
            <Controller
              control={control}
              name="policyExpiry"
              render={({ field: { onChange, value } }: any) => (
                <DQ_TextBox
                  placeholder={Get_CMS_Entry('policy_expiry_str', '', GetEntry().language)}
                  borderColor={errors.policyExpiry? "red" : "grey"}
                  value={value}
                  onChangeText={onChange}
                  fontFamily={lightFont}
                  errorMessage={errors.policyExpiry?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="pin"
              render={({ field: { onChange, value } }: any) => (
                <DQ_TextBox
                  placeholder={Get_CMS_Entry('pin_str', '', GetEntry().language)}
                  hintText={Get_CMS_Entry('found_on_policies', '', GetEntry().language)}
                  borderColor={errors.pin? "red" : "grey"}
                  value={value}
                  onChangeText={onChange}
                  fontFamily={lightFont}
                  errorMessage={errors.pin?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } } : any) => (
                <DQ_TextBox
                  placeholder={Get_CMS_Entry('email_str', '', GetEntry().language)}
                  borderColor={errors.pin? "red" : "grey"}
                  value={value}
                  onChangeText={onChange}
                  fontFamily={lightFont}
                  errorMessage={errors.email?.message}

                />
              )}
            />
            <Controller
              control={control}
              name="mobileNumber"
              render={({ field: { onChange, value } } : any) => (
                <DQ_TextBox
                  placeholder={Get_CMS_Entry('mobile_str', '', GetEntry().language)}
                  hintText={Get_CMS_Entry('example_phone_str', '', GetEntry().language)}
                  borderColor={errors.mobileNumber? "red" : "grey"}
                  value={value}
                  onChangeText={onChange}
                  fontFamily={lightFont}
                  errorMessage={errors.mobileNumber?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="webUserID"
              render={({ field: { onChange, value } } : any) => (
                <DQ_TextBox
                  placeholder={Get_CMS_Entry('web_user_id', '', GetEntry().language)}
                  hintText={Get_CMS_Entry('choose_web_user_ID', '', GetEntry().language)}
                  borderColor={errors.webUserID? "red" : "grey"}
                  value={value}
                  onChangeText={onChange}
                  fontFamily={lightFont}
                  errorMessage={errors.webUserID?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } } : any) => (
                <DQ_EyeComponentTextBox
                  placeholder={Get_CMS_Entry('pass_str', '', GetEntry().language)}
                  borderColor={errors.password? "red" : "grey"}
                  value={value}
                  onChangeText={onChange}
                  fontFamily={lightFont}
                  errorMessage={errors.password?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }: any) => (
                <DQ_EyeComponentTextBox
                  placeholder={Get_CMS_Entry('retype_pass_str', '', GetEntry().language)}
                  borderColor={errors.pin? "red" : "grey"}
                  value={value}
                  onChangeText={onChange}
                  fontFamily={lightFont}
                  errorMessage={errors.confirmPassword?.message}
                />
              )}
            />
          </View>
          <View style={styles.inlineSubContainerItemsButton}>
            <Controller
              control={control}
              name="isChecked"
              render={({ field: { onChange, value } }: any) => (
                <DQ_CheckBox
                  Component={checkBoxLabel}
                  checked={value}
                  onChange={onChange}
                  checkBoxColor="#0062af"
                />
              )}
            />
            {errors.isChecked && <Text style={{ color: 'red' }}>{errors.isChecked.message}</Text>}
            <DQ_Button
              title={Get_CMS_Entry('register_str', '', GetEntry().language)}
              fontFamily={boldFont}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <DQ_Paragraph
          fontSize={12}
          content={Get_CMS_Entry('already_have_acc_str', '', GetEntry().language)}
          textColor="white"
          fontFamily={lightFont}
        />
        <DQ_Link
          textAlign="center"
          fontSize={12}
          content={Get_CMS_Entry('login_here_str', '', GetEntry().language)}
          textColor="white"
          underline={true}
          fontFamily={lightFont}
          onPress={()=>navigation.navigate("Login")}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    marginTop: 30,
    padding: 10,
    height: 50,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  headerText: {
    flex: 0.2,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#005faf',
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
  },
  inlineSubContainerItemsButton: {
    flex: 0.8,
    padding: 10,
    justifyContent: 'flex-end',
  },
  footer: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    marginBottom: 15,
  },
  checkBoxLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  icon: {
    padding: 5,
  },
});
