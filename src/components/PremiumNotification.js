import React,{useEffect,useState} from 'react';
import { View,Text, StyleSheet,Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFS from 'react-native-fs';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { DatabaseConnection } from '../database/database-connection';
import { getDailyDevotionalBooks } from '../service/storeService';
import { getProfile } from '../service/authService';
import { getBookDetails } from '../service/libraryService';
import { useNavigation } from '@react-navigation/native';

const db = DatabaseConnection.getdb();


const PremiumNotification = () => {

   const [subscribed, setSubscribed] = React.useState(null);
   const [books, setBooks] = useState();
   const navigation =useNavigation();


   useEffect(() => {
    async function setData() {
      const mail=await AsyncStorage.getItem('email');
      if(mail===null){

      }else{
        const subscribe = await getProfile(mail);

        const bks = await getDailyDevotionalBooks();
        //get book details by the current Devotional ID
        const bookDetail =await getBookDetails(bks.books[0].id);
        setBooks(bookDetail);
        setSubscribed(subscribe.subscription.status);
        


      }
      

    }
    setData();

  }, []);
   const openEpub=(url,init)=>{
    console.log("urlfile",url);
    navigation.navigate('EpubReader',{file2:url,init:init});

   }

    const openRhapsodyReader = () => {

        let url =books[0].book_file_url;
        let options = { weekday: 'long', day: 'numeric'};
        let prnDt =  new Date().toLocaleTimeString('en-us', options);
        let initialLocation =prnDt.split(',')[0]; 
        console.log("Initial Location", initialLocation);
        openEpub(url,initialLocation);
        

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
          <MaterialCommunityIcons  style={{alignContent:'center',justifyContent:'center', paddingTop : 9, paddingBottom : 10}}
           name="information" size={35} color="#D8A623" />
          <Text style={{marginTop : 0, paddingRight : 10}}> Subscribe to Premium &#160;
              <TouchableOpacity
                  onPress={() => { navigation.navigate('Subscription'); }}
                  style={{
                      borderColor: '#FF0000',
                      borderWidth: 0.5,
                      borderRadius: 5,
                      paddingTop: 8,
                      paddingLeft : 15,
                      paddingRight : 15,
                      paddingBottom : 5,
                      backgroundColor: 'transparent'
                  }}
              ><Text style={{color: '#FF0000', fontSize: 12}}>UPGRADE</Text>
              </TouchableOpacity>
           </Text>
          
        </View>):null}
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