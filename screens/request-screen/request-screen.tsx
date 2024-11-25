import {
  Alert,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import DQ_BaseHeader from '../../components/DQ_BaseHeader';
import DQ_Paragraph from '../../components/DQ_Paragraph';
import {Get_CMS_Entry} from '../../Shared/CMSSharedFunction';
import {GetEntry} from '../../Shared/settings';
import {RequestAction, RequestUploadAction, SubmitRequest} from '../../Shared/SharedService';
import _shared from '../common';
import {ApiResponseRqAction, RequestUploadFile} from '../../Shared/Types';
import DQ_Button from '../../components/DQ_Button';
import {Box, NativeBaseProvider, TextArea} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {FlatList} from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import Icon from '@react-native-vector-icons/fontawesome6';
import {
  Asset,
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import DQ_Loader from '../../components/DQ_Loader';
import {useAlert} from '../../hooks/useAlert';
import DQ_Alert from '../../components/DQ_Alert';

export default function RequestScreen({navigation, route}: any) {
  const [policyAction, setPolicyAction] = useState('');
  const [productName, setProductName] = useState('');
  const [actionCode, setActionCode] = useState('');
  const [requestRef, setRequestRef] = useState('');
  const [policyNo, setPolicyNo] = useState('');
  const [date, setDate] = useState('');
  const [editInception, setEditInception] = useState<boolean>(false);
  const [policySerNo, setPolicySerNo] = useState<number>();
  const [helpMsg, setHelpMsg] = useState<string>('');
  const [maxFileUpload, setMaxFileUpload] = useState<number>(0);
  const [disclaimer, setDisclaimer] = useState<string>('');
  const [textAreaContent, setTextAreaContent] = useState<string>('');
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [photos, setPhotos] = useState<any[]>([]);
  const [base64Photos, setBase64Photos] = useState<
    RequestUploadFile[] | undefined
  >([]);
  const [reasonCode, setReasonCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const {isVisible, showAlert, hideAlert, errorMessage} = useAlert();

  useEffect(() => {
    console.log('Policy Screen');
    const {
      policyAction: _polAct,
      productName: _prodName,
      policyNo: _policyNo,
      actionCode:_actionCode
    } = route.params;

    setPolicyAction(_polAct);
    setProductName(_prodName);
    setPolicyNo(_policyNo);
    setActionCode(_actionCode)

    const Call_Request_Action = async () => {
      setLoading(true);
      const result: ApiResponseRqAction | undefined = await RequestAction(
        _policyNo,
        _polAct,
      );
      setDate(
        result?.response?.requestInfoData?.requestInfo[0]?.inception ?? '',
      );
      setEditInception(
        result?.response?.requestInfoData?.requestInfo[0]?.editInception ??
          false,
      );
      setHelpMsg(
        result?.response?.requestInfoData?.requestInfo[0]?.helpMsg ?? '',
      );
      setMaxFileUpload(
        result?.response?.requestInfoData?.requestInfo[0]?.maxFileUpload ?? 0,
      );
      setDisclaimer(
        result?.response?.requestInfoData?.requestInfo[0]?.disclaimer ?? '',
      );
      setRequestRef(
        result?.response?.requestInfoData?.requestInfo[0]?.requestReference ??
          '',
      );
      setReasonCode(
        result?.response?.requestInfoData?.requestInfo?.[0]?.reasons?.[0]?.reasonCode ?? ''
      );
      setPolicySerNo(
        result?.response?.requestInfoData?.requestInfo[0]?.policySerNo ??
          0,
      )
      setLoading(false);
    };

    Call_Request_Action();
  }, [route.params]);

  function handleDateChange(date: string) {
    setDate(date);
    setOpenDatePicker(false);
  }

  const renderUploadCard = ({item, index}: {item: Asset; index: number}) => (
    <TouchableOpacity key={index} onPress={() => selectImage(index)}>
      <View style={styles.uploadCards}>
        {item?.uri ? (
          <Image source={{uri: item.uri}} style={styles.uploadCardsImage} />
        ) : (
          <DQ_Paragraph
            style={styles.inlineUploadCards}
            textAlign="center"
            content="+" // The "+" inside each card
            textColor="black"
          />
        )}
      </View>
    </TouchableOpacity>
  );

  const selectImage = (index: number) => {
    Alert.alert(
      'Upload Image',
      'Choose an option',
      [
        {text: 'Camera', onPress: () => openCamera(index)},
        {text: 'Gallery', onPress: () => openGallery(index)},
        {text: 'Cancel', style: 'cancel'},
      ],
      {cancelable: true},
    );
  };

  const openCamera = (index: number) => {
    const options: CameraOptions = {
      mediaType: 'photo',
      saveToPhotos: true,
      quality: 1,
      includeBase64: true, // Enable base64 encoding
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        Alert.alert('Cancelled', 'User cancelled image picker');
      } else if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const source = response.assets[0];

        if (source.base64) {
          setBase64Photos((prevBase64Photos = []) => {
            const updatedBase64Photos = [...prevBase64Photos];

            const base64Object = {
              fileName: source.fileName || '',
              payload: source.base64 || '',
            };

            updatedBase64Photos.splice(index, 1, base64Object);

            return updatedBase64Photos;
          });
        }

        setPhotos(prevPhotos => {
          const updatedPhotos = [...prevPhotos];
          updatedPhotos.splice(index, 1, source);
          return updatedPhotos;
        });
        console.log('Captured Image:', source);
      }
    });
  };

  const openGallery = (index: number) => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1, 
      selectionLimit: maxFileUpload - photos.length,
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        Alert.alert('Cancelled', 'User cancelled image picker');
      } else if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImages = response.assets;

        selectedImages.forEach((image, idx) => {
          if (image.base64) {
            setBase64Photos((prevBase64Photos = []) => {
              const updatedBase64Photos = [...prevBase64Photos];
              const base64Object = {
                fileName: image.fileName || '',
                payload: image.base64 || '',
              };

              updatedBase64Photos.splice(index + idx, 1, base64Object);
              return updatedBase64Photos;
            });
          }
        });

        setPhotos(prevPhotos => {
          const updatedPhotos = [...prevPhotos];
          selectedImages.forEach((image, idx) => {
            updatedPhotos.splice(index + idx, 1, image);
          });
          return updatedPhotos;
        });
      }
    });
  };

  const combinedData = [
    ...photos,
    ...Array.from({length: maxFileUpload - photos.length}),
  ];

  const handleSubmit = async () => {
    setLoading(true)
    if (base64Photos?.length === 0) {
      showAlert(
        Get_CMS_Entry('did_not_upload_any_doc', '', GetEntry().language),
      );
    } else {
      const uploadResultStatus = await UploadFilesToServer();
      if(uploadResultStatus){
        const submitResult = await Submit_Request();
      }
    }

  };

  const UploadFilesToServer = async () => {
    const result = await RequestUploadAction(
      policyNo,
      requestRef,
      base64Photos,
    );
    return result?.response.status;
  };

  const Submit_Request = async () => {
    const attachList = base64Photos
      ?.map(photo => photo?.fileName)
      .filter(Boolean)
      .join(',');
    const result = await SubmitRequest(policyNo, requestRef, policySerNo, actionCode, reasonCode,date, attachList, textAreaContent);
    if(result?.response.status){
      setLoading(false)
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
        <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
          <DQ_Alert
            isVisible={isVisible}
            hideAlert={hideAlert}
            btnList={[
              {
                title: 'Submit',
                press: () => {
                  Submit_Request()
                },
              },
              {
                title: 'Cancel',
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
          {loading && <DQ_Loader loading={loading} />}
          <DQ_BaseHeader
            variant="textCenter"
            textCenter={policyAction}
            press={() => navigation.goBack()}
          />
          <View style={styles.paragraphPadding15}>
            <DQ_Paragraph content={productName} textAlign="center" />
          </View>
          <View style={styles.actionCodePolicyNo}>
            <DQ_Paragraph
              textColor="black"
              content={Get_CMS_Entry('policyNo_str', '', GetEntry().language)}
            />
            <DQ_Paragraph content={policyNo} />
          </View>
          <View style={styles.actionCodePolicyNo}>
            <DQ_Paragraph
              textColor="black"
              content={Get_CMS_Entry(
                'effective_date_str',
                '',
                GetEntry().language,
              )}
            />
            <View style={{flexDirection: 'row', gap: 15, alignItems: 'center'}}>
              {editInception && (
                <TouchableOpacity onPress={() => setOpenDatePicker(true)}>
                  <Icon
                    name="pen-to-square"
                    iconStyle="solid"
                    color="#5392c4"
                    size={14}
                  />
                </TouchableOpacity>
              )}
              {openDatePicker && (
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={openDatePicker}
                  onRequestClose={() => setOpenDatePicker(false)}>
                  <View style={styles.modalContainer}>
                    <Pressable onPress={() => setOpenDatePicker(false)}>
                      <DatePicker
                        mode="calendar"
                        options={{
                          selectedTextColor: '#fff',
                          textHeaderColor: '#0560ac',
                          mainColor: '#0560ac',
                          textSecondaryColor: '#0560ac',
                          borderColor: 'transparent',
                        }}
                        selected={date}
                        onDateChange={handleDateChange}
                        style={styles.datePicker} // Apply style to make it smaller
                      />
                      <View style={styles.closeButton}>
                        <DQ_Paragraph
                          style={styles.closeButtonText}
                          content="Close"
                          textColor="white"
                        />
                      </View>
                    </Pressable>
                  </View>
                </Modal>
              )}
              <DQ_Paragraph content={date} />
            </View>
            <DQ_Paragraph content={helpMsg} />
            <View style={styles.textAreaContainer}>
              <NativeBaseProvider>
                <Box alignItems="center" w="100%">
                  <TextArea
                    h={100}
                    w="100%"
                    maxW="340"
                    value={textAreaContent}
                    onChangeText={text => setTextAreaContent(text)}
                    tvParallaxProperties={undefined}
                    onTextInput={undefined}
                    autoCompleteType={undefined}
                  />
                </Box>
              </NativeBaseProvider>
            </View>
          </View>
          <View style={styles.innerContainer}>
            <DQ_Paragraph
              textColor="black"
              content={Get_CMS_Entry('upload_docs', '', GetEntry().language)}
            />
            <DQ_Paragraph textColor="black" content={` ${maxFileUpload})`} />
          </View>

          <View style={styles.mainUploadContainer}>
            {maxFileUpload > 0 ? (
              <FlatList
                data={combinedData}
                renderItem={renderUploadCard}
                keyExtractor={(item, index) => index.toString()}
                horizontal
              />
            ) : (
              <DQ_Paragraph
                textAlign="center"
                content="No upload cards available"
                textColor="grey"
              />
            )}
          </View>

          <View style={styles.disclaimerPhrase}>
            <DQ_Paragraph content={disclaimer} textColor="grey" fontSize={10} />
          </View>

          <View style={styles.btnContainer}>
            <DQ_Button
              title="Submit"
              isLoading={false}
              onPress={handleSubmit}
            />
          </View>
        </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ebebeb',
  },
  paragraphPadding15: {
    padding: 15,
  },
  actionCodePolicyNo: {
    flex: 0.2,
    padding: 10,
  },
  textAreaContainer: {
    alignItems: 'center',
  },
  textArea: {
    width: '90%',
    maxWidth: 350,
    minHeight: 100,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: '#ebebeb',
  },
  innerContainer: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 10,
    marginBottom: 5,
  },
  mainUploadContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
    gap: 10,
  },
  uploadCards: {
    backgroundColor: '#a5a5a0',
    width: 120,
    height: 80,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  cardContent: {
    fontSize: 16,
    color: 'black',
  },
  inlineUploadCards: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  disclaimerPhrase: {
    flex: 1,
    padding: 10,
    marginBottom: 20,
  },
  btnContainer: {
    justifyContent: 'flex-end',
    padding: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  datePicker: {
    width: 300, // Adjust width to make the picker smaller
    height: 300, // Adjust height to make it smaller
    backgroundColor: 'white', // Ensure the background is visible
    borderRadius: 10, // Optional rounded corners
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#ffbe26',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10, // Add margin to separate from the picker
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  uploadCardsImage: {
    width: '100%', // Ensure the image takes up the full width of the card
    height: '100%', // Ensure the image takes up the full height of the card
    borderRadius: 8, // Keep the same border radius as the card
    resizeMode: 'cover', // Make sure the image covers the whole area without distorting
  },
});
