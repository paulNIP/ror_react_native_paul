import React,{useEffect,useState} from 'react';
import { View,Text, StyleSheet,Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFS from 'react-native-fs';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getdb();


const PremiumNotification = ({navigation}) => {

   let [rhapsodyData, setRhapsodyData] = useState();
   const [subscribed, setSubscribed] = React.useState(null);

   useEffect(() => {
    async function setData() {
      const subscribe = await AsyncStorage.getItem("subscription");
      setSubscribed(subscribe);

    }
    setData();

  }, []);

    const openRhapsodyReader = () => {

        var monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"];
        // get current month rhapsody
        var d = new Date();
        var bk =monthNames[d.getMonth()];
        console.log("BOOK MINE",bk);


        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM book_download where book_download_title LIKE ?',
            ['%' + bk + '%'],
            (tx, results) => {
              var len = results.rows.length;
              console.log('len000', results.rows.item(0));
              if (len > 0) {
                setRhapsodyData(results.rows.item(0).book_download_title);
                //open Rhapsody using Epub Reader
                navigation.navigate('EpubReader',{file:results.rows.item(0).book_download_title,location:''})

              } else {
                Alert.alert("The "+bk+" Rhapsody is not available in your Library. \nPlease download it from the Store");
              }
            }
          );
        });

      };

return (
  <>
     {subscribed==='active' ? (
      <View style={styles.contentView}> 
       <MaterialCommunityIcons  style={{alignContent:'center',justifyContent:'center'}}
       name="book-open-variant" size={25} color="#0099e5" />    
       <Text style={{marginTop:5}}>You are on a Premium Plan</Text>
       <TouchableOpacity onPress={openRhapsodyReader}>
       <Text style={styles.titleText} >
        Open in Rhapsody Reader</Text>
        </TouchableOpacity>
        
      </View>):(null)}

      {subscribed==='inactive' || !subscribed  ? (
      <View style={{flexDirection:'row'}}>
          <MaterialCommunityIcons  style={{alignContent:'center',justifyContent:'center'}}
           name="information" size={35} color="#D8A623" /> 
          <Text style={{flexWrap:'wrap'}}>To unlock the complete devotional for the month and enjoy its full features,
           subscribe to the Premium Plan 
            <TouchableOpacity onPress={()=>{ navigation.navigate('Subscription');}}>
              <Text style={{color:'#FF0000',marginTop:10}}> UPGRADE </Text>
            </TouchableOpacity>
           </Text>
          
        </View>):(null)}
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