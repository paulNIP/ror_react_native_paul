
// import React in our code
import React,{useState,useEffect} from 'react';

// import all the components we are going to use
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { Icon } from '@rneui/themed';
import { getProfile } from '../service/authService';

const SecondScreen = () => {

  const [profile, setProfile] = useState([]);


  useEffect(() => {

    const fetchData = async () => {
        const data = await getProfile()
        setProfile(data)

    }
    fetchData();

  }, []);

  return (
    <View style={styles.container}>
      <Text style={{marginLeft:10,marginTop:30,alignSelf:'center'}}>My Subcription Plan</Text>
      <Text style={{marginLeft:10,alignSelf:'center',color:'#89CFF0'}}>Personal Information</Text>
     

      <View style={{flexDirection:'row'}}>
        <Text style={{color:'grey', marginStart:10}}>SUBSCRIPTION STATUS</Text>
        </View>
        <Text style={{marginStart:10,marginTop:5,marginBottom:5}}>Paul Otim</Text>

        <View style={{flexDirection:'row'}}>
        <Text style={{color:'grey', marginStart:10}}>EXPIRY DATE</Text>
        </View>
        <Text style={{marginStart:10,marginTop:5,marginBottom:5}}>paulalex.otim@outlook.com</Text>

    <TouchableOpacity style={{alignSelf:'center',backgroundColor:'#F9A825',padding:10,marginBottom:10}}>
        <View style={{flexDirection:'row',backgroundColor:'F9A825'}}>
        <Text style={{color:'grey',marginTop:3}}>UPDATE SUBSCRIPTION</Text>
        </View>
      </TouchableOpacity>


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

export default SecondScreen;