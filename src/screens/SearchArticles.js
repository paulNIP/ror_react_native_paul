import React , { useEffect, useState } from 'react';
import { View, Image, StyleSheet,FlatList ,Button,SafeAreaView,ScrollView} from 'react-native';
import { Text, Card,  Divider } from '@rneui/themed';
import { ListItem ,Avatar} from '@rneui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import {Dimensions,TextInput} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DatabaseConnection } from '../database/database-connection';
import { ActivityIndicator } from 'react-native';
import { getRelatedArticles } from '../service/devotionalService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  getWallet } from '../service/authService';


const SearchArticles = () => {

  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  let [flatListItems, setFlatListItems] = useState([]);
  const [words, setWords] = useState([]);
  const db = DatabaseConnection.getbookmarked_articles_databaseDB();

  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [packageLevel, setPackageLevel] = useState();
  const [padLock, setPadLock] = useState(false);
  const [searchLock, setSearchLock] = useState(false);

  const searchFunction = async(text) => {
    setSearchText(text);
    text = text.toLowerCase();
    if (text === "") {
      setData([]);
    }
    else {
      const searchResult= await getRelatedArticles(text);
      // console.log("Search Results Datatabse",searchResult);
      setData(searchResult);
    }
  }

 
  useEffect(() => {
    const fetchData =async()=>{
      const mail=await AsyncStorage.getItem('email');
      if(mail===null){

      }else{
        //check Read and Earn user
        const profile = await getWallet(mail);
        let pckg_level=profile.class;
        setPackageLevel(profile.class);
        if (pckg_level !=="" ) {
          if (pckg_level==="level1" || pckg_level==="level2") {
              setPadLock(true);
              setSearchLock(false);
          }

          if (subscription_status.equals("inactive") || pckg_level==="level1" || pckg_level==="level2") {
            setPadLock(true);
            setSearchLock(false);
          }

        }else{//just lock it off
          setSearchLock(true);
          setPadLock(true);
        }


      }

    }
    

    setIsLoading(false);
    fetchData();
    


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

    <View style={styles.searchSection}>
        <MaterialCommunityIcons  style={styles.searchIcon} name='magnify' color='#D8A623' size={25}/>
        <TextInput
            style={styles.input}
            editable={searchLock}
            selectTextOnFocus={searchLock}
            placeholder="Search"
            onChangeText={text => searchFunction(text)}
            underlineColorAndroid="transparent"
        />
    </View>
        

        {
          !isLoading && data.map((l, i) => {
            

            return (

            <TouchableOpacity onPress={()=>{navigation.navigate('Rhapsody of Realities',{date:l.pdate})}}>
            <ListItem key={i} bottomDivider>
               <Image
                 style={styles.image}
                 source={{uri: l.image}} 
                 resizeMode={"cover"} // <- needs to be "cover" for borderRadius to take effect on Android
               />
               <ListItem.Content>
                 <ListItem.Title>{l.title}</ListItem.Title>
                 <ListItem.Subtitle style={{color:'#999999'}} numberOfLines={3}>{l.excerpt}</ListItem.Subtitle>
                 <Text style={{color:'#606060'}}>{l.pdate}</Text>
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

  searchSection: {
    flex: 1,
    marginTop:15,
    marginBottom:10,
    borderRadius:15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',

},
searchIcon: {
    padding: 10,
},
input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
},
  });

export default  SearchArticles;