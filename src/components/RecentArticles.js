import React,{useState,useEffect} from 'react';
import Strings from '../constants/Strings';
import { View, StyleSheet,Text,TouchableOpacity,Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { getDailyDevotional } from '../service/devotionalService';
import { DatabaseConnection } from '../database/database-connection';





const RecentArticles=()=> {

    const navigation = useNavigation();

    const [devotional, setDevotional] = useState();
    const db = DatabaseConnection.getbookmarked_articles_databaseDB();
    


    useEffect(() => {
  
        const fetchData = async () => {
            const data = await getDailyDevotional();
            setDevotional(data);
  
        }
        fetchData();
  
      }, []);
  
      let navigateToRelated = () => {
        navigation.navigate("Related Articles",{title:devotional[0].title})
 
      };


      const date=new Date().toISOString().slice(0, 10).toString();
      const devo=JSON.stringify(devotional);
    
      const bookmarkArticle = () => {

        const data={
            title:devotional[0].title,
            excerpt:devotional[0].excerpt,
            img:devotional[0].image,
            full_devo:devotional[0].body,
            further:devotional[0].study,
            confession:devotional[0].confess,
            r1:devotional[0].BA,
            r2:devotional[0].BB,
            title_confession:devotional[0].confess_title,
            pdate: new Date().toISOString().slice(0, 10),
            opening_scripture:"-"
      }

      console.log("Bookmarke",data);
      const currentDate=new Date().toISOString().slice(0, 10);

        db.transaction(function (txn) {
            txn.executeSql(
              "SELECT article_date_key FROM bookmarked_articles_table WHERE article_date_key=?",
              [currentDate],
              function (tx, res) {
                console.log('item:', res.rows.length);
                if (res.rows.length > 0) {
                  //insert into DB
                  txn.executeSql(
                    'INSERT INTO bookmarked_articles_table (article_date_key,article_json) VALUES(? ,?)',
                    [
                      currentDate,
                      data,
                    ]
                  );
    
                  Alert.alert(
                    'Success',
                    'Bookmarked sucessfully',
                    [
                      {
                        text: 'Ok'
                      },
                    ],
                    { cancelable: false }
                  );

                }else{
                  Alert.alert(
                    'Error',
                    'Already added to Bookmarks',
                    [
                      {
                        text: 'Ok'
                      },
                    ],
                    { cancelable: false }
                  );
      
                }
              }
            );
          });
      

        
      };

    return (
        <View style={styles.container}>
            
            <View style={styles.content}>
            <TouchableOpacity style={styles.roundButton}
            onPress={()=>navigation.navigate('Past Articles')}
            >
            <MaterialCommunityIcons style={{alignSelf:'center'}} name="history" size={25} color="#D8A623" />
                <Text style={{alignSelf:'center',fontSize:12,color:'#D8A623'}}>PAST </Text>
                <Text style={{alignSelf:'center',fontSize:12,color:'#D8A623'}}>ARTICLES</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
            <TouchableOpacity style={styles.roundButton}
            onPress={navigateToRelated}
            >
                <MaterialCommunityIcons style={{alignSelf:'center'}} name="select-all" size={25} color="#D8A623" />
                <Text style={{alignSelf:'center',fontSize:12,color:'#D8A623'}}>RELATED </Text>
                <Text style={{alignSelf:'center',fontSize:12,color:'#D8A623'}}>ARTICLES</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
            <TouchableOpacity style={styles.roundButton}
            onPress={()=>navigation.navigate('Saved Articles')}
            >
                <MaterialCommunityIcons style={{alignSelf:'center'}} name="format-list-bulleted-square" size={25} color="#D8A623" />
                <Text style={{alignSelf:'center',fontSize:12,color:'#D8A623'}}>SAVED </Text>
                <Text style={{alignSelf:'center',fontSize:12,color:'#D8A623'}}>ARTICLES</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <TouchableOpacity style={styles.roundButton}
                onPress={bookmarkArticle}
                >
                    <MaterialCommunityIcons style={{alignSelf:'center'}} name="bookmark" size={25} color="#D8A623" />
                    <Text style={{alignSelf:'center',fontSize:12,color:'#D8A623'}}>SAVE</Text>
                    <Text style={{alignSelf:'center',fontSize:12,color:'#D8A623'}}>THIS ARTICLE</Text>
                </TouchableOpacity>
            </View>

            {/* receipt */}
            <View style={styles.content}> 
                <TouchableOpacity style={styles.roundButton}
                onPress={()=>navigation.navigate('Search Article')}
                >
                    <MaterialCommunityIcons style={{alignSelf:'center'}} name="file-find-outline" size={25} color="#D8A623" />
                    <Text style={{alignSelf:'center',fontSize:12,color:'#D8A623'}}>SEARCH </Text>
                    <Text style={{alignSelf:'center',fontSize:12,color:'#D8A623'}}>ARTICLES</Text>
                </TouchableOpacity>
            </View>
            
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      marginTop:10,
      justifyContent:'space-between',
      marginBottom:20,
      marginLeft:10,
      marginRight:10
    },
    content: {
        alignSelf:'center'
    },
   });

export default RecentArticles;
