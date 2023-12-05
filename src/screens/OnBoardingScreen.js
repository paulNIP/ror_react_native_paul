import { View,Dimensions,StyleSheet ,Image,Text,StatusBar} from 'react-native';
import React from 'react';

//import AppIntroSlider to use it
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { DatabaseConnection } from '../database/database-connection';






const data = [
  {
    title: 'Welcome to Rhapsody of Realities',
    text: 'The life-changing truths in this edition will refresh, transform and prepare you for a very fulfilling, fruitful and rewarding experience with God’s Word.',
    image: require('../assets/welcome1_2.png'),
    bg: 'white',
  },
  {
    title: 'Great New Features',
    text: 'Enjoy over 18 New exciting features!',
    image: require('../assets/welcome2_2.png'),
    bg: 'white',
  },
  {
    title: 'Rich Bookstore',
    text: "Enjoy our bookstore with hundreds of books available!",
    image: require('../assets/welcome3_3.png'),
    bg: 'white',
  },
  {
    title: 'Be more with Rhapsody Subscriptions',
    text: "Enjoy Reading points, Timer, Wallet feature, Gift of subscription and lots more!",
    image: require('../assets/welcome4_4.png'),
    bg: 'white',
  },
];

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const db = DatabaseConnection.getdb();
const devotionalsDB = DatabaseConnection.getdevotionalsDB();
const bookmarked_articles_databaseDB = DatabaseConnection.getbookmarked_articles_databaseDB();
const posts_feed_dbDB = DatabaseConnection.getposts_feed_dbDB();
const jsoncacheDB = DatabaseConnection.getjsoncacheDB();
const responses_databaseDB = DatabaseConnection.getresponses_databaseDB();
const rhapsodyDaysReadDb = DatabaseConnection.getrhapsodyDaysReadDb();

const settings_database = DatabaseConnection.getsettings_database();
const userDB = DatabaseConnection.getuserDB();

const _renderItem = ({item}) => {
  return (
    <View
      style={[
        styles.slide,
        {
          backgroundColor: item.bg,
        },
      ]}>
      
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );
};

const _keyExtractor = (item) => item.title;


const OnboardingScreen = () => {


  const navigation = useNavigation();

  

  const completeOnboarding = async() =>{
    //Flip Onboarding
    await AsyncStorage.setItem('hasOnBoarded',JSON.stringify({hasOnboarded:true}));
    //Set Theme
    await AsyncStorage.setItem('THEME_COLOR','#D8A623');
    navigation.navigate("Welcome");
    
  
  }



  return(

  <View style={{flex: 1}}>
    <StatusBar translucent backgroundColor="transparent" />
    <AppIntroSlider
      keyExtractor={_keyExtractor}
      renderItem={_renderItem}
      bottomButton
      onDone={()=>{
        // Create and Initialize Databases
        if(Platform.OS !=='web'){

          // Check if the items table exists if not create it
  
            db.executeSql(
              'CREATE TABLE IF NOT EXISTS book (id  INTEGER PRIMARY KEY,book_title  TEXT,book_description TEXT, image  TEXT, cover_image  TEXT,book_file_type  TEXT,book_file_url  TEXT, book_rate TEXT,book_rate_avg  TEXT,book_view  TEXT, book_author_name  TEXT)',[], (result) => {
                console.log("book Table created successfully");
              }, (error) => {
                console.log("Create table error", error)
              }
            );
  
            db.executeSql(
              'CREATE TABLE IF NOT EXISTS book_download (book_id  INTEGER PRIMARY KEY,book_download_title  TEXT,image_download  TEXT, book_download_author_name TEXT, book_download_url  TEXT)',[], (result) => {
                console.log("book_download Table created successfully");
              }, (error) => {
                console.log("Create table error", error)
              }
            );
  
            bookmarked_articles_databaseDB.executeSql(
              'CREATE TABLE IF NOT EXISTS bookmarked_articles_table (row_id INTEGER PRIMARY KEY AUTOINCREMENT, article_json  TEXT,article_date_key TEXT)',[], (result) => {
                console.log("bookmarked_articles_table Table created successfully");
              }, (error) => {
                console.log("Create table error", error)
              }
            );
          
  
            devotionalsDB.executeSql(
              'CREATE TABLE IF NOT EXISTS devotionals (id integer primary key, title text,excerpt text,img text,full_devo text,further text , confession text, r1 text, r2 text, devodate text, confess_title text, quiz text)',[], (result) => {
                console.log("devotionals Table created successfully");
              }, (error) => {
                console.log("Create table error", error)
              }
            );
        
            posts_feed_dbDB.executeSql(
              'CREATE TABLE IF NOT EXISTS feed_data (id integer primary key autoincrement, post_id text unique,post_email text, post_names text,post_text text,post_image text,post_image_name text, post_time text, post_audience text,post_comments_number text, post_likes_number text,groupname text )',[], (result) => {
                console.log("feed_data Table created successfully");
              }, (error) => {
                console.log("Create table error", error)
              }
            );
          
            jsoncacheDB.executeSql(
              'CREATE TABLE IF NOT EXISTS jsoncache (id integer primary key, jsontitle text, jsoncontent json, jsondate text)',[], (result) => {
                console.log("jsoncache Table created successfully");
              }, (error) => {
                console.log("Create table error", error)
              }
            );
          
        
            responses_databaseDB.executeSql(
              'CREATE TABLE IF NOT EXISTS responses_table (row_id INTEGER PRIMARY KEY AUTOINCREMENT,response  VARCHAR UNIQUE,response_key  VARCHAR)',[], (result) => {
                console.log("responses_table Table created successfully");
              }, (error) => {
                console.log("Create table error", error)
              }
            );
          
  
            rhapsodyDaysReadDb.executeSql(
              'CREATE TABLE IF NOT EXISTS daysReadTable (id INTEGER PRIMARY KEY, KEY_READ_ID TEXT)',[], (result) => {
                console.log("daysReadTable Table created successfully");
              }, (error) => {
                console.log("Create table error", error)
              }
            );
  
  
            settings_database.executeSql(
              'CREATE TABLE IF NOT EXISTS settings_table (_id INTEGER PRIMARY KEY AUTOINCREMENT, setting VARCHAR UNIQUE,value VARCHAR DEFAULT null)',[], (result) => {
                console.log("settings_table Table created successfully");
              }, (error) => {
                console.log("Create table error", error)
              }
            );
        
            userDB.executeSql(
              'CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, names TEXT,email text, phone text, password text, status text, statustype text, exp_date text, local_img_url text, img_name text, lastlogin text)',[], (result) => {
                console.log("user Table created successfully");
              }, (error) => {
                console.log("Create table error", error)
              }
            );
  
  
  
  
  
        }

        
        completeOnboarding();
        
  


        }
      }
      showSkipButton
      showPrevButton
      data={data}
    />
  </View>
   );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'blue',
  },
  image: {
    width: windowWidth,
    height: windowHeight*0.6
  },
  text: {
    marginTop:10,
    color: '#000000',
    textAlign: 'center',
    
  },
  title: {
    marginTop:50,
    fontSize: 22,
    color: '#000000',
    textAlign: 'center',
  },
});

export default OnboardingScreen;

