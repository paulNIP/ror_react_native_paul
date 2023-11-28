import React from 'react';
import { View,Text, StyleSheet,Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const PremiumNotification = () => {

    const openRhapsodyReader = () => {
        Alert. alert('Opening Rhapsody Reader');
      };

return (
  <>
      <View style={styles.contentView}> 
       <MaterialCommunityIcons  style={{alignContent:'center',justifyContent:'center'}}
       name="book-open-variant" size={25} color="#0099e5" />    
       <Text style={{marginTop:5}}>You are on a Premium Plan</Text>
       <Text style={styles.titleText} onPress={openRhapsodyReader}>Open in Rhapsody Reader</Text>
      </View>
  </>
);
};

const styles = StyleSheet.create({
contentView: {
  flex: 1,
  flexDirection:'row',
  alignSelf:'center',
  verticalAlign:'middle',
  marginTop: 15,
  marginBottom:15
},
titleText:{
    color:'#f44336',
    marginTop:5
}
});

export default PremiumNotification;