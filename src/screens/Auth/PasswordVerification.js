import React ,{useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PasswordVerification=({ route, navigation })=> {

    const { email } = route.params;

    return (
      <View style={styles.container}>

        
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },


});

export default PasswordVerification;