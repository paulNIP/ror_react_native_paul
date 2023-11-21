import React from "react";
import { Text, View,Button,Image, ImageBackground,TouchableOpacity ,Platform,KeyboardAvoidingView,StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {Dimensions} from 'react-native';





function OTPVerification({ navigation }) {

    state = {
        otp: ''
      }
    
    const handleOTPChange = (otp) => {
        this.setState({ otp })
      }
    
    const  clearOTP = () => {
        this.setState({ otp: undefined })
      }
    
      const   autoFill = () => {
        this.setState({ otp: '221198' })
      }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={require('../../assets/login_new_bg.png')} resizeMode="cover" style={styles.image}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, justifyContent: "center", alignItems: "center", marginRight:20,marginLeft:20 }}>
            
            <Image style={styles.image2} source={require('../../assets/logo.png')} />
            <Text style={{alignSelf:"flex-start",fontSize:28}}>Verification Code</Text>
            <Text style={{alignSelf:"flex-start",fontSize:18,marginBottom:40}}>Please enter verification code sent to your email</Text>
              {/* <TextInput
                  label="Email"
                  style={{width:Dimensions.get('window').width*0.9,marginBottom:40}}
                  left={<TextInput.Icon icon="email" />}
                /> */}
                <OTPInput
                    value={this.state.otp}
                    onChange={this.handleOTPChange}
                    tintColor="#FB6C6A"
                    offTintColor="#BBBCBE"
                    otpLength={6}
                    />
                    

    <Text style={{  marginRight:20,marginLeft:20 }}>By clicking continue , you agree to our Terms and</Text>
    <Text>Conditions and Privacy policy</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert("Simple Button pressed")}
      >
        <Text style={{color:'white'}}>Continue</Text>
      </TouchableOpacity>

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

export default OTPVerification;
