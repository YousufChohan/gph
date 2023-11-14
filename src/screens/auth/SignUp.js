import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {Modal, TextInput} from 'react-native-paper';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import TextField from '../../component/inputField';
import {STYLES} from '../../constants/styles';
import {COLORS, IMAGES} from '../../constants/theme';
import image from '../../../assets/images/eyeOpen.png';
import {REACT_APP_BASE_URL} from '../../constants/url';
import axios from 'axios';

export default function SignUp({navigation}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control the modal
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  async function signUp() {
    console.log(REACT_APP_BASE_URL);
    console.log(firstName);
    // console.log(lastName);
    // console.log(mobile);
    // console.log(email);
    await axios
      .post(`${REACT_APP_BASE_URL}/signup`, {
        firstName: firstName,
        lastName: lastName,
        mobile: mobile,
        email: email,
        password: password,
        role: 'Customer',
      })
      .then(async res => {
        console.log(firstName);
        console.log(lastName);
        console.log(mobile);
        console.log(email);
        // console.log(password);
        console.log(res.data);
        toggleModal();
      })
      .catch(async er => {
        Alert.alert(
          'Your Form is Incomplete or wrong',
          `${
            er.response.data.message
              ? er.response.data.message
              : 'Something went wrong'
          }`,
          [
            {
              text: 'Try Again',
              onPress: () => console.log('Try again Pressed'),
            },
          ],
        );
      });
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            backgroundColor: '#FFF',
            paddingHorizontal: 20,
            paddingTop: 30,
            flex: 1,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              resizeMode="contain"
              style={{width: 25, height: 25}}
              source={IMAGES.back}
            />
          </TouchableOpacity>
          <View style={{height: 40}}>
            <Text
              style={{
                fontSize: 35,
                color: '#000',
                fontFamily: 'Poppins-SemiBold',
              }}>
              Garata!
            </Text>
          </View>
          <Text
            style={{
              fontSize: 14.5,
              fontWeight: '600',
              color: '#000',
              fontFamily: 'Poppins-SemiBold',
            }}>
            Publishing House
          </Text>
          <Text style={[STYLES.h2, {marginTop: 25}]}>Create Account</Text>
          <Text style={[STYLES.text, {marginBottom: 30}]}>
            Please complete the registration form first.{' '}
          </Text>
          <View>
            <Text style={STYLES.h3}>First Name</Text>
            <TextField
              onChangeText={text => setFirstName(text)}
              label="Enter Your First Name"
            />
          </View>
          <View>
            <Text style={STYLES.h3}>Last Name</Text>
            <TextField
              onChangeText={text => setLastName(text)}
              label="Enter Your Last Name"
            />
          </View>
          <View>
            <Text style={STYLES.h3}>Email</Text>
            <TextField
              onChangeText={text => setEmail(text)}
              label="Enter Your Email Address"
            />
          </View>
          <View>
            <Text style={STYLES.h3}>Phone Number</Text>
            <TextField
              onChangeText={text => setMobile(text)}
              label="Enter Your Phone Number"
            />
          </View>
          <View>
            <Text style={STYLES.h3}>Password</Text>
            <TextField
              onChangeText={text => setPassword(text)}
              label="Enter Your Password"
              secureTextEntry={showPassword ? false : true}
              right={
                <TextInput.Icon
                  name={() => (
                    <TouchableOpacity
                      onPress={() => {
                        setShowPassword(!showPassword);
                      }}>
                      {showPassword ? (
                        <Image
                          resizeMode="contain"
                          style={{width: 25}}
                          source={IMAGES.passshow}
                        />
                      ) : (
                        <Image
                          resizeMode="contain"
                          style={{width: 25}}
                          source={IMAGES.passhide}
                        />
                      )}
                    </TouchableOpacity>
                  )}
                />
              }
            />
          </View>

          <TouchableOpacity
            style={[STYLES.button, {marginVertical: 32}]}
            onPress={() => {
              if (
                firstName !== null &&
                lastName !== null &&
                email !== null &&
                mobile !== null &&
                password !== null
              ) {
                signUp();
              } else {
                Alert.alert(
                  'Incomplete Form',
                  `${
                    firstName
                      ? 'Please fill all the fields first'
                      : 'Please fill all the fields first'
                  }`,
                  [
                    {
                      text: 'Ok',
                      onPress: () => console.log('Ok Pressed'),
                    },
                  ],
                );
              }
            }}>
            <Text style={STYLES.buttonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal visible={isModalVisible} animationType="slide" transparent={false}>
        <View style={{height: '40%'}}></View>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              resizeMode="contain"
              style={{width: 250, marginBottom: 20}}
              source={require('../../../assets/images/successfullycreated.png')}
            />
            <Text style={STYLES.h2}>Account Successfully Created! </Text>
            <Text style={[STYLES.text, {textAlign: 'center', marginTop: 12}]}>
              You’ve successfully create your account? Please login to your
              account.
            </Text>
            <TouchableOpacity
              style={[STYLES.button, {marginTop: 100, width: '100%'}]}
              onPress={() => navigation.navigate('Login')}>
              <Text style={STYLES.buttonText}>Login Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    zIndex: 20,
    // flex: 1,
    height: '60%',
    bottom: 0,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  modalContent: {
    alignSelf: 'flex-end',
    width: '100%',
    backgroundColor: COLORS.white,
    padding: 20,
    alignItems: 'center',
  },
});
