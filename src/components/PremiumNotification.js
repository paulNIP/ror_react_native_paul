import React,{useEffect,useState} from 'react';
import { View,Text, StyleSheet,Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFS from 'react-native-fs';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Annotations } from '../examples';


import { DatabaseConnection } from '../database/database-connection';
import { getDailyDevotionalBooks } from '../service/storeService';
import { getProfile } from '../service/authService';
import { getBookDetails } from '../service/libraryService';
import { useNavigation } from '@react-navigation/native'; 

const db = DatabaseConnection.getdb();


const PremiumNotification = () => {

   const [subscribed, setSubscribed] = useState(false);
   const [books, setBooks] = useState();
   const navigation =useNavigation();


   useEffect(() => {
    async function setData() {
      const mail=await AsyncStorage.getItem('email');
      if(mail){
        const subscribe = await getProfile(mail);
        console.log("bsnnsnnsnns",subscribe.subscription.status);
        if(subscribe.subscription.status!=='expired'){
          setSubscribed(true);

        }
        const bks = await getDailyDevotionalBooks();
        let id =bks.books[0].id;
        const bookDetail =await getBookDetails(id);
        console.log("bOOk details",bookDetail);
        setBooks(bookDetail);


      }
      

    }
    setData();

  }, []);
   const openEpub=(url,initial)=>{
    navigation.navigate('EpubReader',{file2:url,location:initial});

   }

    const openRhapsodyReader = async() => {


        let url =books[0].book_file_url;

        let options = { weekday: 'long', day: 'numeric'};
        let prnDt =  new Date().toLocaleTimeString('en-us', options);
        let initialLocation =prnDt.split(',')[0]; 
        console.log("Initial Location", initialLocation);
        const EPUB_PATH = `${RNFS.DocumentDirectoryPath}/`+url.split("/").pop();
        const exists = await RNFS.exists(EPUB_PATH);
        if (!exists) {
          Alert.alert("Book doesnot exist in your Library Please Download It from your Library");
        } else {
          openEpub(url,initialLocation); 
        }

        


    };

return (
  <>
     {subscribed && (
      <View style={styles.contentView}> 
       <MaterialCommunityIcons  style={{alignContent:'center',justifyContent:'center'}}
       name="book-open-variant" size={25} color="#0099e5" />    
       <Text style={{marginTop:5}}>You are on a Premium Plan</Text>
       <TouchableOpacity onPress={openRhapsodyReader}>
        <Text style={styles.titleText} >
          Open in Rhapsody Reader</Text>
        </TouchableOpacity>
        
      </View>
       )} 

      {!subscribed &&(
      <View style={{flexDirection:'row'}}>
          <MaterialCommunityIcons  style={{alignContent:'center',justifyContent:'center', paddingTop : 9, paddingBottom : 10}}
           name="information" size={35} color="#D8A623" />
          <Text style={{marginTop : 0, paddingRight : 10,color:'#007CC0'}}> To unlock thecomplete devotional for the month and enjoy its full features. subscribe to the Premium Plan &#160;
              <TouchableOpacity
                  onPress={() => { navigation.navigate('Subscription'); }}
              ><Text style={{color: '#FF0000'}}>UPGRADE</Text>
              </TouchableOpacity>
           </Text>
          
        </View>)}
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