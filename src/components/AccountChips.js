import React ,{useEffect,useState} from 'react';
import { View, ScrollView, StyleSheet,TouchableOpacity,Text } from 'react-native';
import { Chip, withTheme, lightColors } from '@rneui/themed';
import AsyncStorage from "@react-native-async-storage/async-storage";


import { useNavigation } from '@react-navigation/native';
import { getProfile } from '../service/authService';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const AccountChips = () => {
  const navigation = useNavigation();
  const walletClickedHandler = () => {
    navigation.navigate('Wallet');
  };

  const subscriptionClickedHandler = () => {
    navigation.navigate('Subscription');
  };

  const [profile, setProfile] = useState();
  const [status, setStatus] = useState();
  const [language, setLanguage] = useState();


  useEffect(() => {

      const fetchData = async () => {
          const email= await AsyncStorage.getItem('email');
          if(email==null){

          }else{
            const data = await getProfile(email);
            setProfile(data);
            setStatus(data.subscription.status);

          }

          let data = await AsyncStorage.getItem('language');
          if(data==null){
            setLanguage('English')
          }else{
            setLanguage(data)
          }



      }
      fetchData();

    }, []);




return (
  <>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.contentView}>
      
          <TouchableOpacity style={styles.roundButton}
            onPress={()=>{
              if(status==='active'){
                navigation.navigate('My Wallet');

              }else if(status!=='active' && status !=null){
                navigation.navigate('My Wallet');

              }else{
                navigation.navigate('Login');

              }
            }}
            >
            <Text>Check Wallet</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.roundButton}
            onPress={()=>{
              if(status==='active'){
                navigation.navigate('Subscription');

              }else if(status!=='active' && status !=null){
                navigation.navigate('Subscription');

              }else{
                navigation.navigate('Subscription');

              }
            }}
            >
            <Text>Upgrade Subscription</Text>
          </TouchableOpacity>

          { status==='active' ?(null):
          
            (
              // return if profile subscription is inactive or null
              <TouchableOpacity style={styles.roundButton}
              onPress={()=>{
                navigation.navigate('LanguageSelect');

              }}
              >
              <View style={{flexDirection:"row"}}>
                  <FontAwesome name="globe" size={20} color="#900" />
                  <Text> Language - {language}</Text>
              </View>
            </TouchableOpacity>
            )
        
        
           }
          

      </View>
    </ScrollView>
  </>
);
};

const styles = StyleSheet.create({
    contentView: {
      flex: 1,
      flexDirection:'row',
      alignItems:'center',
      justifyContent: 'space-between',
      justifyContent: 'center',
      marginVertical: 15,
      padding:5


    },
    roundButton: {
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      marginEnd:5,
      borderRadius: 20,
      backgroundColor: '#D8D9DA',
    },
});

export default AccountChips;