// import React in our code
import React,{useState,useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';

// import all the components we are going to use
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { Icon } from '@rneui/themed';
import { getProfile } from '../service/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FirstScreen = () => {

  const navigation = useNavigation();

  const [profile, setProfile] = useState([]);
  const [email, setEmail] = useState();


    useEffect(() => {

      const getEmail = async () => {
        try {
          const value = await AsyncStorage.getItem('email')
          if(value !== null) {
            // value previously stored
            setEmail(value)
          }
        } catch(e) {
          // error reading value
        }
      }
      getEmail();

      const fetchData = async () => {
          const data = await getProfile(email)
          setProfile(data)

      }
      
      fetchData(email);

    }, []);

  

  return (
    <View style={styles.container}>
      <Image style={{width:'auto',height:150}}
        source={require('../assets/greybands.jpeg')} />
      <Image
        style={styles.logoStyle}
        source={require('../assets/prof.png')}
      />
      <Text style={{marginLeft:10,marginTop:30,alignSelf:'center'}}>My Profile</Text>
      <Text style={{marginLeft:10,alignSelf:'center',color:'#89CFF0'}}>Personal Information</Text>
      <TouchableOpacity onPress={()=>{navigation.navigate('Edit Profile')}} 
      style={{alignSelf:'center',backgroundColor:'#F9A825',width:100}}
       >
        <View style={{flexDirection:'row'}}>
        <Icon style={{marginEnd:10, marginStart:20}} name="lead-pencil" type="material-community" color="grey" />
        <Text style={{color:'grey',marginTop:3}}>Edit</Text>
        </View>
      </TouchableOpacity>

      <View style={{flexDirection:'row'}}>
        <Icon style={{marginEnd:10, marginStart:10}} name="account-box" type="material-community" color="grey" />
        <Text style={{color:'grey'}}>FULL NAMES</Text>
        </View>
        <Text style={{marginStart:10,marginTop:5,marginBottom:5}}>{profile.name}</Text>

        <View style={{flexDirection:'row'}}>
        <Icon style={{marginEnd:10, marginStart:10}} name="email" type="material-community" color="grey" />
        <Text style={{color:'grey'}}>EMAIL ADDRESS</Text>
        </View>
        <Text style={{marginStart:10,marginTop:5,marginBottom:5}}>{profile.email}</Text>

        <View style={{flexDirection:'row'}}>
        <Icon style={{marginEnd:10, marginStart:10}} name="phone" type="material-community" color="grey" />
        <Text style={{color:'grey'}}>PHONE NUMBER</Text>
        </View>
        <Text style={{marginStart:10,marginTop:5,marginBottom:5}}>{profile.phone}</Text>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius:15,
    marginTop:5
  },
  paragraphStyle: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoStyle: {
    height: 100,
    width: 100,
    alignSelf:'center',
    marginTop:-120
  },
});

export default FirstScreen;