import React ,{useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View,Button,Image, ImageBackground,TouchableOpacity ,Platform,KeyboardAvoidingView,StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from 'react-native-paper';
import {Dimensions} from 'react-native';

import { Snackbar } from 'react-native-paper';
import axios from 'axios';
import Strings from '../../constants/Strings';
import AsyncStorage from '@react-native-async-storage/async-storage';




const EmailCodeAuth=({ route, navigation })=> {

    const { email } = route.params.email;
    const { user_data } = route.params;

    console.log(user_data);

    const [otp, setOtp] = useState(['', '', '', '','','']);  
    const handleOtpChange = (value, index) => {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);    // Move focus to the next box if the current one has a value
      // if (value && index < newOtp.length - 1) {
      //   this.inputs[index + 1].focus();
      // }



    };  

    const [loggedIn, setLoggedIn] = React.useState(null);
    React.useEffect(() => {
      async function setData() {
        const appData = await AsyncStorage.getItem("hasOnBoarded");
        if (appData == null) {
          setFirstLaunch(true);
          AsyncStorage.setItem("hasOnBoarded", "false");
        } else {
          setFirstLaunch(false);
        }
      }
      setData();
    }, []);
    
    const inputs = [];

    //snack bar component
    const [visible, setVisible] = React.useState(false);

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);

    const saveUserData = async() =>{

      //Flip Onboarding
      await AsyncStorage.setItem('country',user_data.country);
      await AsyncStorage.setItem('email',user_data.email);
      await AsyncStorage.setItem('expiry_date',user_data.expiry_date);
      await AsyncStorage.setItem('is_registered',user_data.is_registered);
      await AsyncStorage.setItem('name',user_data.name);
      await AsyncStorage.setItem('platform',user_data.platform);
      await AsyncStorage.setItem('subscription',user_data.subscription);

      await AsyncStorage.setItem('hasLoggedIn',"true");
      
    }

      //function to check user email
  const verifyCode = () => {

    return new Promise((resolve, reject) => {

        axios.post(Strings.BRIDGE_URL+'user/verify_email', {
          email_token: otp.join("")
          })
          .then((res) => {
            console.log(res.data)
            resolve(res.data)
            //login logic
            if (res.data.status == 1) {
              //insert data into user DB local storage sqlite

              saveUserData();
              navigation.navigate('Welcome')
              
            } else {
              //toggle snack bar
              onToggleSnackBar
            }//end of login logic


        })
          .catch((err) => {
            reject(err)
        });
  });
  };

    return (
        <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground source={require('../../assets/login_new_bg.png')} resizeMode="cover" style={styles.image}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, justifyContent: "center", alignItems: "center", marginRight:20,marginLeft:20 }}>
              
              <Image style={styles.image2} source={require('../../assets/logo.png')} />
              <Text style={{alignSelf:"flex-start",fontSize:28}}>Verification Code</Text>
              <Text style={{alignSelf:"flex-start",fontSize:16,marginBottom:40}}>Please enter verification code sent to your email</Text>
              
              <View style={styles.otp}>
                {otp.map((string, index) => (
                  <TextInput
                    key={index}
                    style={styles.box}
                    maxLength={1}
                    // keyboardType="numeric"
                    onChangeText={(value) => handleOtpChange(value, index)}
                    value={string}
                    ref={(input) => {
                      inputs[index] = input;
                    }}
                  />
                ))}
              </View>

      
        <TouchableOpacity
          style={styles.button}
          onPress={() => verifyCode()}
        >
          <Text style={{color:'white'}}>Next</Text>
        </TouchableOpacity>


        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Undo',
            onPress: () => {
              onToggleSnackBar
            },
          }}>
          Invalid verification code. Try again
        </Snackbar>
  
        </KeyboardAvoidingView>
        </ImageBackground>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    otp: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      flex: 1,
      justifyContent: 'center',
    },
    box: {
      borderWidth: 1,
      borderColor: 'black',
      width: 50,
      height: 50,
      margin: 5,
      textAlign: 'center',
      fontSize: 18,
    },
    image2: {
      width: 96,
      height: 96,
      borderRadius: 24,
      marginBottom:20,
      marginTop:-20
    },
    button: {
      alignItems: 'center',
      backgroundColor: '#2196F3',
      height: 50,
      borderRadius:10,
      width: Dimensions.get('window').width*0.9,
      marginTop: 20,
      justifyContent: 'center',
    },

    borderStyleBase: {
        width: 30,
        height: 45
      },
    
      borderStyleHighLighted: {
        borderColor: "#03DAC6",
      },
    
      underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
      },
    
      underlineStyleHighLighted: {
        borderColor: "#03DAC6",
      },
    
  
  });
  

export default EmailCodeAuth;