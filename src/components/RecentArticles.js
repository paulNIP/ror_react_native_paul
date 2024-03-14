import React,{useState,useEffect} from 'react';
import Strings from '../constants/Strings';
import { View, StyleSheet,Text,TouchableOpacity,Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { getDailyDevotional } from '../service/devotionalService';
import { DatabaseConnection } from '../database/database-connection';
import AsyncStorage from "@react-native-async-storage/async-storage";
import strings from "../constants/Strings";


const RecentArticles=()=> {

    const navigation = useNavigation();

    const [devotional, setDevotional] = useState();
    const [bookmarkable, setBookmarkable] = useState(false);
    const db = DatabaseConnection.getbookmarked_articles_databaseDB();
  

    useEffect(() => {
  
        const fetchData = async () => {
            const data = await getDailyDevotional();
            setDevotional(data);

            const currentDate=new Date().toISOString().slice(0, 10);
            db.transaction(function (txn) {
                txn.executeSql(
                  "SELECT article_date_key FROM bookmarked_articles_table WHERE article_date_key=?",
                  [currentDate],
                  function (tx, res) {
                    console.log('item:0000000', res.rows.length);
                    if(res.rows.length>0){
                      setBookmarkable(false);

                    }else{
                      setBookmarkable(true);
                    }
                    
                  }
                );
              });
  
        }
        fetchData();
  
      }, []);
  

    const navigateToRelated = async()=>{
        const email= await AsyncStorage.getItem('email')
        if(email){
            const devotionalTitle = devotional && devotional[0] ? devotional[0].title : '';
            navigation.navigate("Related Articles", { title: devotionalTitle });
        }else{
            navigation.navigate('Login')
        }
    }

    const navigateToPastArticles = async()=>{
        const email= await AsyncStorage.getItem('email')
        if(email){
            navigation.navigate('Past Articles')
        }else{
            navigation.navigate('Login')
        }
    }

    const navigateToSavedArticles = async () => {
        const email = await AsyncStorage.getItem('email')
        if (email) {
            navigation.navigate('Saved Articles')
        } else {
            navigation.navigate('Login')
        }
    }

    const navigateToSearch = async()=>{
        const email = await AsyncStorage.getItem('email')
        if (email) {
            navigation.navigate('Search Article')
        } else {
            navigation.navigate('Login')
        }
    }


    const date = new Date().toISOString().slice(0, 10).toString();
    const devo = JSON.stringify(devotional);

    const bookmarkArticle = async () => {
        const email = await AsyncStorage.getItem('email')
        if (!email) {
            navigation.navigate('Login')
        } else {
            const data = {
                title: devotional[0].title,
                excerpt: devotional[0].excerpt,
                img: devotional[0].image,
                full_devo: devotional[0].body,
                further: devotional[0].study,
                confession: devotional[0].confess,
                r1: devotional[0].BA,
                r2: devotional[0].BB,
                title_confession: devotional[0].confess_title,
                pdate: new Date().toISOString().slice(0, 10),
                opening_scripture: "-"
            }

            const currentDate = new Date().toISOString().slice(0, 10);
            let info = JSON.stringify(data);

            db.transaction(function (txn) {
                txn.executeSql(
                    "SELECT article_date_key FROM bookmarked_articles_table WHERE article_date_key=?",
                    [currentDate],
                    function (tx, res) {
                        console.log('item:', res.rows.length);
                        if (res.rows.length <= 0) {
                            //insert into DB
                            txn.executeSql(
                                'INSERT INTO bookmarked_articles_table (article_date_key,article_json) VALUES(? ,?)',
                                [
                                    currentDate,
                                    info,
                                ]
                            );

                            Alert.alert(
                                'Success',
                                'Bookmarked sucessfully',
                                [{
                                    text: 'Ok'
                                }, ], {
                                    cancelable: false
                                }
                            );

                        } else {
                            Alert.alert(
                                'Error',
                                'Failed to Bookmark article',
                                [{
                                    text: 'Ok'
                                }, ], {
                                    cancelable: false
                                }
                            );

                        }
                    }
                );
            });
        }
    };

    return (
        <View style={styles.container}>
            
            <View style={styles.content}>
            <TouchableOpacity style={styles.roundButton}
            onPress={
                navigateToPastArticles
            }>
            <MaterialCommunityIcons style={{alignSelf:'center'}} name="history" size={25} color="#D8A623" />
                <Text style={{alignSelf:'center',fontSize:10,color:'#D8A623'}}>PAST </Text>
                <Text style={{alignSelf:'center',fontSize:10,color:'#D8A623'}}>ARTICLES</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
            <TouchableOpacity style={styles.roundButton}
            onPress={navigateToRelated}
            >
                <MaterialCommunityIcons style={{alignSelf:'center'}} name="select-all" size={25} color="#D8A623" />
                <Text style={{alignSelf:'center',fontSize:10,color:'#D8A623'}}>RELATED </Text>
                <Text style={{alignSelf:'center',fontSize:10,color:'#D8A623'}}>ARTICLES</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
            <TouchableOpacity style={styles.roundButton}
                onPress={navigateToSavedArticles}
            >
                <MaterialCommunityIcons style={{alignSelf:'center'}} name="format-list-bulleted-square" size={25} color="#D8A623" />
                <Text style={{alignSelf:'center',fontSize:10,color:'#D8A623'}}>SAVED </Text>
                <Text style={{alignSelf:'center',fontSize:10,color:'#D8A623'}}>ARTICLES</Text>
                </TouchableOpacity>
            </View>
            {
              bookmarkable &&(
                <View style={styles.content}>
                    <TouchableOpacity style={styles.roundButton}
                    onPress={bookmarkArticle}
                    >
                        <MaterialCommunityIcons style={{alignSelf:'center'}} name="bookmark" size={25} color="#D8A623" />
                        <Text style={{alignSelf:'center',fontSize:10,color:'#D8A623'}}>SAVE</Text>
                        <Text style={{alignSelf:'center',fontSize:10,color:'#D8A623'}}>THIS ARTICLE</Text>
                    </TouchableOpacity>
                </View>
              )
            }
            

            {/* receipt */}
            <View style={styles.content}> 
                <TouchableOpacity style={styles.roundButton}
                onPress={navigateToSearch}
                >
                    <MaterialCommunityIcons style={{alignSelf:'center'}} name="magnify" size={25} color="#D8A623" />
                    <Text style={{alignSelf:'center',fontSize:10,color:'#D8A623'}}>ROR </Text>
                    <Text style={{alignSelf:'center',fontSize:10,color:'#D8A623'}}>SEARCH</Text>
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
