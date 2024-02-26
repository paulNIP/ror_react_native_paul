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


const BookmarkedArticles = () => {

  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  let [flatListItems, setFlatListItems] = useState([]);
  const [words, setWords] = useState([]);
  const db = DatabaseConnection.getbookmarked_articles_databaseDB();

 
  useEffect(() => {

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
          // console.log('itemData:', res.rows);
          // if (res.rows.length == 0) {

          // }else{
            

          // }
        }
      );
    });
    


  }, []);

  console.log("Words",words);
  words.map((k, i) => {
    console.log("Data 33",k.article_json);

  })





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
            let art=l.article_json;
          console.log("OBject article",art);

            return (

            <TouchableOpacity onPress={()=>{navigation.navigate('ArticleDetails',{date:l.date})}}>
            <ListItem key={i} bottomDivider>
               <Image
                 style={styles.image}
                 source={{uri: l.image}} 
                 resizeMode={"cover"} // <- needs to be "cover" for borderRadius to take effect on Android
               />
               <ListItem.Content>
                 <ListItem.Title>{l.title}</ListItem.Title>
                 <ListItem.Subtitle style={{color:'#999999'}}>{l.art}</ListItem.Subtitle>
                 <Text style={{color:'#606060'}}>{l.art}</Text>
               </ListItem.Content>
            </ListItem>
            </TouchableOpacity>
            )
          })
     }  

     </ScrollView> 


  <View intensity={60}  style={{ height: 450, 
   position:'absolute',width:Dimensions.get('window').width, top:630}}>
    <MaterialCommunityIcons style={{alignSelf:'center',marginTop:10,marginBottom:10}} name="lock" size={25} color="#F9A825" />
    <Button
          title="Unlock with a Higher Package"
          color='#F9A825'
          onPress={() => {navigation.navigate('Subscription')}}
        />

  </View>


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
    width: 100,
    height: 100,
    borderRadius: 15
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
  });

export default  BookmarkedArticles;