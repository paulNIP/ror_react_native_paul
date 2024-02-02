import React ,{useState,useEffect} from "react";
import {View, TextInput,Image,ActivityIndicator, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import axios from "axios";
import Strings from "../constants/Strings";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SnackBar from 'react-native-snackbar-component';
import moment from 'moment';

const PrayerRequest = () => {
    const navigation = useNavigation();
    const [text, onChangeText] = useState('');
    const [msg, setMsg] = useState();
    const [email, setEmail] = useState();
    const [prayer, setPrayer] = useState('');

    //snack bar message
    const [regError,setRegError]  = useState(false);
    const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
  
      const fetchData = async () => {
          const email = await AsyncStorage.getItem('email');
          setEmail(email);
      }
      fetchData();
  
  }, []);


  return (
       <View >
        <Card containerStyle={{borderRadius:5}}>
          <Image
            style={{ borderRadius:50,width:100,height:100,alignSelf:'center',marginTop:30
             }}
            source={
                require('../assets/prof.png')
            }
          />
          <Text style={{ marginBottom: 10,alignSelf:'center',marginTop:10,marginBottom:10,fontSize:18 }}>
            Prayer Request
          </Text>
          <View
            style={{
                borderColor:'#89CFF0',
                borderWidth:1,
                borderRadius:5
            }}>
                <TextInput
                    multiline={true}
                    numberOfLines={8}
                    style={{marginLeft:5}}
                    onChangeText={newText => setPrayer(newText)}
                    placeholder="Share your prayer request"
                    />

          </View>
          <Button
            buttonStyle={{
              borderRadius: 5,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
              marginTop:20
            }}
            title="Submit"
            onPress={()=>{

              setIsLoading(true);
              const data = {
                email:email,
                prayer_request:prayer,
                device_date: moment().format('yyyy-MM-DD')
    
              };
              if(prayer===''){
                   setIsLoading(false);
                   setMsg('Prayer Request cannot be empty');
                   setRegError(true);
              }else{
                axios.post(Strings.API_URL+'/prequest', data)
                .then(response => {
                console.log("Prayer Response Response:",response.data.result);
                  if(response.data.result[0].success==='1'){
                    setIsLoading(false);
                    setMsg(response.data.result[0].msg);
                    setRegError(true);

                  }else{
                    setIsLoading(false);
                    setMsg(response.data.result[0].msg);
                    setRegError(true);

                    
                  }

                })
                .catch(error => {
                    setMsg('An error occurred, please try again.');
                    setRegError(true);

                });

              }
              

            }}
          />
        </Card>

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
            color="#FFFFFF"
            size="large"
          />
          </View>
        )}

                      {/* failed Registration snack bar */}
        <SnackBar visible={regError} textMessage={msg}  position='bottom'
        actionHandler={()=>{setRegError(false);}} actionText="OKAY"/>
       </View>
  );
};

export default PrayerRequest;