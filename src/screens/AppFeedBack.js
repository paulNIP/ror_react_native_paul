
import React, { useState,useEffect } from "react"; 
import { 
    View, 
    Text, 
    TouchableOpacity, 
    FlatList, Image,ActivityIndicator,
    StyleSheet, ScrollView,SafeAreaView
} from "react-native";
import { Divider } from "react-native-paper";
import { TextInput,HelperText } from 'react-native-paper';
import axios from 'axios';
import { Formik } from 'formik';
import {Dropdown} from 'sharingan-rn-modal-dropdown';
import { getOSVersion,getAppVersion,getDeviceModel } from "../utils/Utils";
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import VersionCheck from 'react-native-version-check'
import DeviceInfo from 'react-native-device-info'
import Strings from "../constants/Strings";
import SnackBar from 'react-native-snackbar-component';


const AppFeedBack = () => {

  const [showDropDown, setShowDropDown] = useState(false);
  const {gender, setGender} = useState('');
  const [isLoading, setIsLoading] = useState(false);

    //new variables
  const [valueSS, setValueSS] = useState('');


  const onChangeSS = (value) => {
    setValueSS(value);
  };




  const [phone,setPhone]  = useState('');
  const [duration,setDuration]  = useState('');
  const [description,setDescription]  = useState('');


  const [subscription,setSubcription]  = useState();
  const [userid,setSetUserID]  = useState('');
  const [country,setCountry] = useState('');
  const [email,setEmail]  = useState('');
  const [name,setName]  = useState('');

  const [regMessage,setRegMessage]  = useState('');
  const [regError,setRegError]  = useState(false);
     //form submitted
    const [isSubmit, setIsSubmit] = useState(false);

  

  useEffect(() => {
  
    const fetchData = async () => {
        const country = await AsyncStorage.getItem('country');
        const email = await AsyncStorage.getItem('email');
        const name = await AsyncStorage.getItem('name');
        const userid =  await AsyncStorage.getItem('user_id');
        const sub =  await AsyncStorage.getItem('subscription');

        //set user data from 
        setCountry(country);
        setEmail(email);
        setName(name);
        setSetUserID(userid);
        if(sub==='active'){

            setSubcription(1);
        }else if(sub==='inactive'){
            setSubcription(0);

        }else{
            setSubcription(0);
        }

    }
    fetchData();

}, []);



    const handleSubmit=()=>{
        //send data online
        setIsSubmit(true);
        setIsLoading(true);

        const data = {
            email:email,
            name:name,
            phone:phone,
            country:country,
            user_id:userid,
            device_model:DeviceInfo.getModel(),
            android_api_version:DeviceInfo.getSystemVersion(),
            app_version:VersionCheck.getCurrentVersion(),
            how_long:duration,
            error_type:valueSS,
            detailed_description:description,
            subscription_status:subscription

        };


        console.log("Feed Back Data",data);
        axios.post(Strings.SUBMIT_SUPPORT, data)
        .then(response => {
          console.log("Resend Response:",response.data);
          if(response.data.status == 1){
            setIsLoading(false);
            setRegMessage('Submitted Successfully');
            setRegError(true)
          }else{
            setIsLoading(false);
            setRegMessage('An error occurred, please try again.');
            setRegError(true)
          }
  
        })
        .catch(error => {
            setRegMessage('An error occurred, please try again.');
            setRegError(true)
  
        });
        
    }


      const data2 = [
        {
          value: 'It Crashed',
          label: 'It Crashed',
        },
        {
          value: 'It hangs or not Responding',
          label: 'It hangs or not Responding',

        },
        {
          value: 'Missing Books',
          label: 'Missing Books',

        },
        {
          value: 'Subscription',
          label: 'Subscription',

        },
        {
            value: 'Login',
            label: 'Login',

          },
          {
            value: 'Other',
            label: 'Other',
          },
      ];
      




  return (


        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} >

        <View > 

           <Image
                style={{width:100,height:100,alignSelf:"center",marginTop:25,marginBottom:25}}
                source={require('../assets/logo.png')}
            />

            <Text style={{alignSelf:'center',fontSize:22,marginBottom:10,marginTop:10}}>FAQ</Text>
            <Divider/>



            <Collapse>
                <CollapseHeader>
                <View style={{height:50,backgroundColor:'#d2f2d4',alignContent:"center",marginBottom:10}}>
                    <Text style={{alignContent:'center',marginLeft:40,marginTop:15}}>SUBSCRIPTION ISSUES</Text>
                </View>
                </CollapseHeader>
                <CollapseBody>
                <Text style={{marginLeft:20,marginBottom:10,fontWeight:"bold",marginTop:5}}>{`\u25CF `}How to cancel subscription</Text>
                <Text style={{marginLeft:20,flexWrap:'wrap'}}>
                    To process subscription cancellation, you need to do this from your Apple store account. 
                    Under your settings, you will find an option to cancel a subscription</Text>

                <Text style={{marginLeft:20,marginBottom:10,fontWeight:"bold",marginTop:5}}>{`\u25CF `}
                How to renew or upgrade subscription</Text>
                <Text style={{marginLeft:20,flexWrap:'wrap',marginBottom:10}}>
                    To renew or upgrade subscription cancellation,check your profile pageon the App and select the new subscription option. 
                    </Text>
                </CollapseBody>
            </Collapse>


            <Collapse>
                <CollapseHeader>
                <View style={{height:50,backgroundColor:'#d2f2d4',alignContent:"center",marginBottom:10}}>
                    <Text style={{alignContent:'center',marginLeft:40,marginTop:15}}>LOGIN ISSUES</Text>
                </View>
                </CollapseHeader>
                <CollapseBody>
                <Text style={{marginLeft:20,marginBottom:10,fontWeight:"bold",marginTop:5}}>{`\u25CF `}How to change password</Text>
                <Text style={{marginLeft:20,flexWrap:'wrap'}}>
                    To change your password, simply select forgot password on the login page using the email address you signed up with and you will be sent a password reset code.</Text>

                <Text style={{marginLeft:20,marginBottom:10,fontWeight:"bold",marginTop:5}}>{`\u25CF `}
                No password and reset email</Text>
                <Text style={{marginLeft:20,flexWrap:'wrap'}}>
                    If you selected to reset the password but have not yet recieved the reset password email yet, Please check and ensure the following. 
                    </Text>
                <Text style={{marginLeft:20,flexWrap:'wrap'}}>
                    Make sure you are trying to login to the right account. 
                    </Text>
                    <Text style={{marginLeft:20,flexWrap:'wrap'}}>
                    Check your junk / spam email folder(s) for the message
                    </Text>
                    <Text style={{marginLeft:20,flexWrap:'wrap'}}>
                    If you have unsubscribed us from the our emails, then you may not be able to recieve the password reset link. 
                    </Text>
                    <Text style={{marginLeft:20,flexWrap:'wrap'}}>
                    Please check your email settings and go into unsubscribe list and remove us from that list.
                    </Text>
                    <Text style={{marginLeft:20,flexWrap:'wrap',marginBottom:10}}>
                    or Download the App from the app store and try to login again 
                    </Text>
                </CollapseBody>
            </Collapse>


            <Collapse>
                <CollapseHeader>
                <View style={{height:50,backgroundColor:'#d2f2d4',alignContent:"center",marginBottom:10}}>
                    <Text style={{alignContent:'center',marginLeft:40,marginTop:15}}>OTHER ISSUES</Text>
                </View>
                </CollapseHeader>
                <CollapseBody>
                <Text style={{marginLeft:20,marginBottom:10,fontWeight:"bold",marginTop:5}}>{`\u25CF `}Blank home page</Text>
                <Text style={{marginLeft:20,flexWrap:'wrap'}}>
                    Check your internet connection</Text>
                    <Text style={{marginLeft:20,flexWrap:'wrap'}}>
                    Clear your cache memory</Text>
                <Text style={{marginLeft:20,flexWrap:'wrap'}}>
                    Reopen your App</Text>

                <Text style={{marginLeft:20,marginBottom:10,fontWeight:"bold",marginTop:5}}>{`\u25CF `}
                Rhapsody in other languages</Text>
                <Text style={{marginLeft:20,flexWrap:'wrap'}}>
                    New languages can be acessed by selecting the language setting to change the language. 
                    </Text>

                    <Text style={{marginLeft:20,marginBottom:10,fontWeight:"bold",marginTop:5}}>{`\u25CF `}
                App is crushing (IOS)</Text>
                <Text style={{marginLeft:20,flexWrap:'wrap'}}>
                    Check that your IOS version can support the app
                    </Text>
                    <Text style={{marginLeft:20,flexWrap:'wrap'}}>
                    Ensure you have the latest version of the app
                    </Text>
                    <Text style={{marginLeft:20,flexWrap:'wrap'}}>
                    Clear the cached memory of your phoneand try to reopen it.
                    </Text>
                    <Text style={{marginLeft:20,flexWrap:'wrap',marginBottom:10}}>
                    Contact support here if the issue persists.
                    </Text>
                </CollapseBody>
            </Collapse>

            <Collapse>
                <CollapseHeader>
                <View style={{height:50,backgroundColor:'#d2f2d4',alignContent:"center",marginBottom:10}}>
                    <Text style={{alignContent:'center',marginLeft:40,marginTop:15}}>IN-APP INQUIRIES</Text>
                </View>
                </CollapseHeader>
                <CollapseBody>
                <Text style={{marginLeft:20,marginBottom:10,fontWeight:"bold",marginTop:5,flexWrap:'wrap'}}>{`\u25CF `}How to search for past Rhapsody of Realities editions</Text>
                <Text style={{marginLeft:20,flexWrap:'wrap'}}>
                    As a premium subscriber, click on the store icon to access the previous Rhapsody available for free there</Text>

                <Text style={{marginLeft:20,flexWrap:'wrap'}}>
                    As a Basic subscriber, simply upgrade to Prmium to gain acess to this feature</Text>
                <Text style={{marginLeft:20,marginBottom:10,fontWeight:"bold",marginTop:5}}>{`\u25CF `}
                How to search for related articles</Text>
                <Text style={{marginLeft:20,flexWrap:'wrap'}}>
                    As a Premium Subscriber, simply check under the daily R articles on the home page and click on the button that says View all related Article type in the topic you are interested in and click search 
                    </Text>
                    <Text style={{marginLeft:20,marginBottom:10,fontWeight:"bold",marginTop:5}}>{`\u25CF `}
                How to recover saved notes on a different/new device</Text>
                <Text style={{marginLeft:20,flexWrap:'wrap'}}>
                    Open Rhapsody app more tab select notes and sync notes. 
                    </Text>

                    <Text style={{marginLeft:20,marginBottom:10,fontWeight:"bold",marginTop:5}}>{`\u25CF `}
                How to change fonts, decrease/increase fonts</Text>
                <Text style={{marginLeft:20,flexWrap:'wrap'}}>
                    To change the font size on the Rhapsody Reader, Select A+ option on the menu ribon at the top of the reader. This option enables you not only increase the font size but also change the font. 
                    </Text>
                    <Text style={{marginLeft:20,flexWrap:'wrap'}}>
                    This option is available on the Rhapsody reader for Premium Subscribers only, to acess it simply upgrade to Premium
                     
                    </Text>

                    <Text style={{marginLeft:20,marginBottom:10,fontWeight:"bold",marginTop:5}}>{`\u25CF `}
                How to download Rhapsody of Realities book</Text>
                <Text style={{marginLeft:20,flexWrap:'wrap',marginBottom:10}}>
                    Collapse the menu bar by clicking on the menu icon,select the Rhapsody or book of your choice,
                     after making the purchase, click to download and then select to open in Rhapsody Reader. 
                     
                    </Text>
                </CollapseBody>
            </Collapse>


            <Text style={{alignSelf:'center',marginBottom:20,marginTop:40}}>CONTACT ROR APP CARE DIRECTLY</Text>
            <Divider/>
            <Text style={{marginTop:10}}>TEL: +1(601) 600-2363</Text>
            <Text>KingsChat: @rhapsodyappcare</Text>
            <Text>Email: rhapsodyappsupport@rhapsodyofrealities.org</Text>

        </View> 

        <View style={{marginTop:40}}>
               
                {/* Inqiury / Query Form */}
                    <View>
                        <View style={{marginBottom:20}}>
                            <TextInput
                        value={phone}
                        onChangeText={newText => setPhone(newText)}
                        placeholder="Phone  Number"
                        left={<TextInput.Icon icon="eye" />}
                        />
                        {isSubmit && phone === "" ? <HelperText type="error" visible={true}>
                            Phone number is Required
                            </HelperText> : null} 
                        </View>

                        <View style={{marginBottom:20}}>
                                <Dropdown
                                    label="Choose Error Type"
                                    data={data2}
                                    value={valueSS}
                                    onChange={onChangeSS}
                                    
                                />
                                </View>

                                {isSubmit && valueSS === "" ? <HelperText type="error" visible={true}>
                            Error type is Required
                            </HelperText> : null} 

                        
                        <View style={{marginBottom:20}}>
                                <TextInput
                                value={duration}
                                onChangeText={newText => setDuration(newText)}
                                placeholder="How long it has happened"
                                left={<TextInput.Icon icon="eye" />}
                                />

                            {isSubmit && duration === "" ? <HelperText type="error" visible={true}>
                                                        Duration is Required
                                                        </HelperText> : null} 
                        </View>

                        <View style={{marginBottom:20}}>
                            <TextInput
                            value={description}
                            multiline={true}
                            onChangeText={newText => setDescription(newText)}
                            placeholder="Detailed description of issue"
                            left={<TextInput.Icon icon="search" />}
                            />
                            {isSubmit && description === "" ? <HelperText type="error" visible={true}>
                            Description is Required
                            </HelperText> : null} 

                        </View>
                        
                        <View style={{marginBottom:20}}>
                        <TouchableOpacity onPress={handleSubmit} style={{backgroundColor:'#55aaff',
                        borderRadius:5,height:45}}>
                            <Text style={{alignSelf:'center',color:'white',verticalAlign:'middle',marginTop:15}}>Submit</Text>
                        </TouchableOpacity>
                            
                        </View>
                    </View>

        </View>

        {isLoading && (
        <View style={{  
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
          <ActivityIndicator
            style={{ height: 80 }}
            color="#C00"
            size="large"
          />
          </View>
        )}

              {/* failed Registration snack bar */}
        <SnackBar visible={regError} textMessage={regMessage} 
        actionHandler={()=>{setRegError(false);}} actionText="OKAY"/>

        

            
        </ScrollView>


  );
};


const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        backgroundColor:'#F6F6F6',
    }, 
    scrollView: {
        marginHorizontal: 10,
      },
    header: { 
        fontSize: 30, 
        fontWeight: "bold", 
        marginBottom: 20, 
        color: "green", 
        textAlign: "center", 
    }, 
    subheader: { 
        fontSize: 20, 
        fontWeight: "bold", 
        marginBottom: 20, 
        textAlign: "center", 
    }, 
    itemContainer: { 
        marginBottom: 15, 
        padding: 10, 
        backgroundColor: "white", 
        borderRadius: 5, 
        elevation: 3, 
    }, 
    itemTouchable: { 
        borderRadius: 10, 
        overflow: "hidden", 
    }, 
    itemTitle: { 
        fontSize: 18, 
        fontWeight: "bold", 
        color: "#333", 
    }, 
    itemContent: { 
        marginTop: 10, 
        fontSize: 14, 
        color: "#666", 
    }, 
}); 

export default AppFeedBack;