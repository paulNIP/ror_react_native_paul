import React,{useState,useEffect} from "react";
import { Text, Image, ImageBackground,TouchableOpacity ,Platform,KeyboardAvoidingView,StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from 'react-native-paper';
import {Dimensions} from 'react-native';
import axios from 'axios';
import Strings from '../../constants/Strings';
import { useNavigation } from '@react-navigation/native';
import { Snackbar } from 'react-native-paper';
import { PulseLoader,
  DotsLoader,
  TextLoader,
  BubblesLoader,
  CirclesLoader,
  BreathingLoader,
  RippleLoader,
  LinesLoader,
  MusicBarLoader,
  EatBeanLoader,
  DoubleCircleLoader,
  RotationCircleLoader,
  RotationHoleLoader,
  CirclesRotationScaleLoader,
  NineCubesLoader,
  LineDotsLoader,
  ColorDotsLoader,
  OpacityDotsLoader } from 'react-native-indicator';




function LoginPage() {

  const [email, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  //snack bar component
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);


  //function to check user email
  const getUserInfo = (email) => {
        setIsLoading(true);

        return new Promise((resolve, reject) => {

          axios.post(Strings.BRIDGE_URL+'user/check', {
            email: email,
            send_mail:1
            })
            .then((res) => {
              //console.log(res.data.is_registered)
              resolve(res.data)
              setIsLoading(false);
              //login logic
              if (res.data.status == 1) {
                if(res.data.is_registered==="yes"){
                    if (res.data.platform==="app") {
                                navigation.navigate('PasswordVerification',{
                                  email: email
                                })
                    } else if(res.data.platform==="rae"){
                                console.log(res.data);
                                navigation.navigate('EmailCodeAuth',{
                                  user_data: res.data,
                                  email:email

                                })

                    }
                }else{
                            navigation.navigate('Registration',{
                              email:email

                            })
                }
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
            <Text style={{alignSelf:"flex-start",fontSize:28}}>Get started</Text>
            <Text style={{alignSelf:"flex-start",fontSize:18,marginBottom:40}}>Provide your email to signin or sign up</Text>
              <TextInput
                  label="Email"
                  autoCapitalize="none"
                  autoCompleteType="email"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onChangeText={newText => setUserEmail(newText)}
                  style={{width:Dimensions.get('window').width*0.9,marginBottom:40}}
                  left={<TextInput.Icon icon="email" />}
                />

    <Text style={{  marginRight:20,marginLeft:20 }}>By clicking continue , you agree to our Terms and</Text>
    <Text>Conditions and Privacy policy</Text>

    {isLoading ? (

      <DotsLoader/>

      ) : (
      // Show login Button
      <TouchableOpacity
        style={styles.button}
        onPress={() => getUserInfo(email)}
      >
        <Text style={{color:'white'}}>Continue</Text>
      </TouchableOpacity>)}

      <TouchableOpacity
        style={{marginTop:15}}
        onPress={() => {navigation.navigate('HomeScreen')}}
      >
        <Text style={{color:'black'}}>Continue as Guest</Text>
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
        An error occurred! Please retry.
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
  image: {
    flex: 1,
    justifyContent: 'center',
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
  

});

export default LoginPage;
