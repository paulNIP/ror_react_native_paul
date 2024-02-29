import React , { useEffect, useState } from 'react';
import { View, Image, StyleSheet,FlatList ,Button,SafeAreaView,ScrollView} from 'react-native';
import { Text, Card,  Divider } from '@rneui/themed';
import { ListItem ,Avatar} from '@rneui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import {Dimensions} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DatabaseConnection } from '../database/database-connection';
import { ActivityIndicator } from 'react-native';
import { getWallet } from '../service/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';


const BookmarkedArticles = () => {

  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  let [flatListItems, setFlatListItems] = useState([]);
  const [words, setWords] = useState([]);
  const db = DatabaseConnection.getbookmarked_articles_databaseDB();
  const [packageLevel, setPackageLevel] = useState();
  const [padLock, setPadLock] = useState(false);
  const [subscription_status,setSubscriptionStatus] =useState();


 
  useEffect(() => {
    const fetchData =async()=>{
      const mail=await AsyncStorage.getItem('email');
      if(mail===null){

      }else{
        //check Read and Earn user
        const profile = await getWallet(mail);
        let pckg_level=profile.class;
        setPackageLevel(profile.class);
        setSubscriptionStatus(profile.status);
        if (pckg_level !=="" ) {
          if (pckg_level==="level1" || pckg_level==="level2") {
              setPadLock(true);

          }

          if (subscription_status===1 || pckg_level==="level1" || pckg_level==="level2") {
            setPadLock(true);

          }

        }else{//just lock it off
          setPadLock(true);
        }


      }

    }
    fetchData();
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT * FROM bookmarked_articles_table",
        [],
        function (tx, res) {
          var temp = [];
          for (let i = 0; i < res.rows.length; ++i)
            temp.push(res.rows.item(i));
          setWords(temp);
          setIsLoading(false);

        }
      );
    });
    


  }, []);

  return (
    <SafeAreaView>
    <ScrollView>

      {isLoading &&(
        <View style={{flex:1,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
          <ActivityIndicator
              style={{ alignContent:'center',justifyContent:'center' }}
              color="#FFFFFF"
              size="large"
            />
        </View>
      )}
        

        {
          !isLoading && words.map((l, i) => {
            
            let art=JSON.parse(l.article_json);

            return (

            <TouchableOpacity onPress={()=>{
              if (packageLevel !=="" ) {
                if (packageLevel==="level1" || packageLevel==="level2") {
                    setPadLock(true);
      
                }else if (subscription_status===1 || packageLevel==="level1" || packageLevel==="level2") {
                  setPadLock(true);
      
                }else{
                  navigation.navigate('Rhapsody of Realities',{date:art.pdate});

                }
      
              }
              
              }}>
            <ListItem key={i} bottomDivider>
               <Image
                 style={styles.image}
                 source={{uri: art.img}} 
                 resizeMode={"cover"} // <- needs to be "cover" for borderRadius to take effect on Android
               />
               <ListItem.Content>
                 <ListItem.Title>{art.title}</ListItem.Title>
                 <ListItem.Subtitle style={{color:'#999999'}} numberOfLines={3}>{art.excerpt}</ListItem.Subtitle>
                 <Text style={{color:'#606060'}}>{art.pdate}</Text>
               </ListItem.Content>
            </ListItem>
            </TouchableOpacity>
            )
          })
     }  

     </ScrollView> 


  {padLock&&(
    <View intensity={60}  style={{ height: 450, 
      backgroundColor: 'white',
        opacity:0.7,
    position:'absolute',width:Dimensions.get('window').width, top:630}}>
      <MaterialCommunityIcons style={{alignSelf:'center',marginTop:10,marginBottom:10}} name="lock" size={25} color="#F9A825" />
      <Button
            title="Unlock with a Higher Package"
            color='#F9A825'
            onPress={() => {navigation.navigate('Subscription')}}
          />

    </View>
  
  )}


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom:15
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  image: {
    width: Dimensions.get('window').width*0.23,
    height: Dimensions.get('window').height*0.12,
    borderRadius: 15
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
  });

export default  BookmarkedArticles;