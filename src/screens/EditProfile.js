import React from "react";

import { useNavigation } from '@react-navigation/native';

// import all the components we are going to use
import {Text, View, StyleSheet,TouchableOpacity,TextInput} from 'react-native';



const EditProfile = ({navigation}) => {

  const [text, onChangeText] = React.useState('Useless Text');
  const [number, onChangeNumber] = React.useState('');

  return (
    <View style={styles.container}>
    <Text style={{marginLeft:10,marginTop:30}}>FULL NAMES</Text>
    <TextInput
        onChangeText={onChangeText}
        value={text}
        placeholder="useless placeholder"
        style={{marginStart:10}}
      />
   

    <View style={{flexDirection:'row'}}>
      <Text style={{color:'grey', marginStart:10}}>EMAIL ADDRESS</Text>
      </View>
      <TextInput
        onChangeText={onChangeText}
        value={text}
        placeholder="useless placeholder"
        style={{marginStart:10}}
      />

      <View style={{flexDirection:'row'}}>
      <Text style={{color:'grey', marginStart:10}}>PHONE NUMBER</Text>
      </View>
      <TextInput
        onChangeText={onChangeText}
        value={text}
        placeholder="useless placeholder"
        style={{marginStart:10}}
      />

  <TouchableOpacity style={{alignSelf:'center',backgroundColor:'#F9A825',padding:10,marginBottom:10}}>
      <View style={{flexDirection:'row',backgroundColor:'F9A825'}}>
      <Text style={{color:'grey',marginTop:3}}>UPDATE PROFILE</Text>
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


export default EditProfile;