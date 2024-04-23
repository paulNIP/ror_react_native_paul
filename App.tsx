import React,{useEffect,useState} from 'react';
import { View, Text, StyleSheet,Image, TouchableOpacity,StatusBar, Platform,I18nManager, DeviceEventEmitter } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LogBox } from 'react-native';

//import AppIntroSlider to use it
import 'react-native-gesture-handler';

import AudioScreen from './src/screens/AudioScreen';
import HomeScreen from './src/screens/HomeScreen';
import LibraryScreen from './src/screens/LibraryScreen';
import StoreScreen from './src/screens/StoreScreen';
import MoreScreen from './src/screens/MoreScreen';
import SubscriptionsScreen from './src/screens/SubscriptionsScreen';
import { withIAPContext } from "react-native-iap";
import WalletScreen from './src/screens/WalletScreen';
import LoginPage from './src/screens/Auth/LoginPage';
import RegistrationPage from './src/screens/Auth/RegistrationPage';
import PastArticles from './src/screens/PastArticles';
import RelatedArticles from './src/screens/RelatedArticles';
import SavedArticles from './src/screens/SavedArticles';
import SearchArticles from './src/screens/SearchArticles';
import ArticleDetails from './src/screens/ArticleDetails';
import ProfileScreen from './src/screens/ProfileScreen';
import RhapsodyTVScreen from './src/screens/RhapsodyTVScreen';
import { Annotations } from './src/examples';

import Testimony from './src/screens/Testimony';
import BookDetails from './src/screens/BookDetails';
import PrayerRequest from './src/screens/PrayerRequest';
import Favourites from './src/screens/Favourites';
import StudyTracker from './src/screens/StudyTracker';
import BookmarkedArticles from './src/screens/BookmarkedArticles';
import EmailCodeAuth from './src/screens/Auth/EmailCodeAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from "@react-navigation/stack";

import OnboardingScreen from './src/screens/OnBoardingScreen';
import AppFeedBack from './src/screens/AppFeedBack';
import FeedBack from './src/screens/FeedBack';
import { Linking, Alert } from 'react-native'; // Import Alert from 'react-native'

import VersionCheck from 'react-native-version-check';
import SplashScreen from 'react-native-splash-screen';



import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import { getAudioArticles } from './src/service/devotionalService';
import LanguageSelect from './src/screens/LanguageSelect';
import VideoDetail from './src/screens/VideoDetail';
import LanguageBooks from './src/screens/LanguageBooks';
import GroupedBooks from './src/components/GroupedBooks';
import BookCategories from './src/components/BookCategories';
import AllCategories from './src/components/AllCategories';
import PrivacyPolicy from './src/screens/PrivacyPolicy';
import AboutUs from './src/screens/AboutUs';
import EditProfile from './src/screens/EditProfile';
import Settings from './src/screens/Settings';
import { OldSubscription } from './src/screens/OldSubscription';
// import EpubReader from './src/screens/EpubReader';
import { DatabaseConnection } from './src/database/database-connection';
import { getProfile } from './src/service/authService';
import Splash from './src/screens/Splash';
import RhapsodyNews from './src/screens/RhapsodyNews';
import LatestBooks from './src/screens/LatestBooks';
import axios from 'axios';
import AllNotes from './src/screens/AllNotes';
// import { NotificationListener, requestUserPermission } from './src/service/pushNotificationManager';
import AppNotes from './src/screens/AppNotes';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

LogBox.ignoreLogs([
  "ViewPropTypes will be removed",
  "ColorPropType will be removed",
  ]);


export type StackParamList = {
  AppFeedBack: undefined;
  Welcome:undefined;
  Login:undefined;
  OnboardingScreen:undefined;
  RecipeDetail:{ id: string };
  Registration:{email:string};
  LanguageBooks:{lang:string};
  BookDetails:{book_id:string};
  ArticleDetails:{id:string};
  GroupedBooks:{cat_id:string,category:string};
  BookCategories:undefined;
  AllCategories:undefined;
  Settings:undefined;
  LatestBooks:undefined;
  RhapsodyNews:undefined;
  EditProfile:{email:string};
  PrivacyPolicy:undefined;
  FeedBack:{id:string};
  Annotations:{file:string};
  AppNotes:undefined;
};

const StackHeader = createStackNavigator<StackParamList>();

export type StackNavigation = StackNavigationProp<StackParamList>;

export const screens = [
  {
    name: "Subscription",
    title: "Subscription",
    component: withIAPContext(SubscriptionsScreen),
    section: "Context"
  },
  {
    name: "OldSubscription",
    title: "OldSubscription",
    component: withIAPContext(OldSubscription),
    section: "Context",
    color: "#cebf38",
  },
  {
    name: "BookDetails",
    title: "BookDetails",
    component: withIAPContext(BookDetails),
    section: "Context",
    color: "#cebf38",
  },
];





const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#D8A623",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};




function HomeStackNavigator() {

  const [name, setName] = useState<any>();
  const navigation = useNavigation<StackNavigation>();
   
  useEffect(() => {
      LogBox.ignoreLogs([
        "ViewPropTypes will be removed",
        "ColorPropType will be removed",
        ]);

      const fetchData = async () => {
          let mail=await AsyncStorage.getItem('email');
          if(mail===null){
            setName('Guest');
          }else{
            let data = await getProfile(mail);
            setName(data.name);

          }
          
          
      }
      fetchData();

  }, []);

  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} 
      options={{
        title: '',
        headerLeft: () => (
          <View style={{flexDirection:"row"}}>
            <Text style={{color:'white',fontWeight:"bold",marginLeft:30,marginRight:30,fontSize:18,marginTop:5}}>Welcome</Text>
            <Text style={{color:'black',fontWeight:"bold",fontSize:18,marginTop:5}}>{name}</Text>
           <Image
                style={{width:40,height:40,marginLeft:10}}
                source={require('./src/assets/prof.png')}
              />
            {/* <Text style={{fontSize:18,color:"white",fontWeight:"bold",marginLeft:10}}>Welcome Guest</Text> */}
          </View>
         ),
        headerRight: () => (
          <View style={{marginRight:10}}>
            

                  <TouchableOpacity onPress={()=>{
                    navigation.navigate('AppFeedBack');
                  }}>
                    <Text style={{fontWeight:"bold",color:'#FFFFFF',fontSize:18}}>FEEDBACK</Text>
                  </TouchableOpacity>



          </View>
         )}}/>
      {/* <Stack.Screen name="Subscription" component={SubscriptionsScreen} /> */}
      {screens.map(({ name, component, title }) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
        />
      ))}
      <Stack.Screen name="My Wallet" component={WalletScreen} />
      <Stack.Screen name="LanguageSelect" component={LanguageSelect} />
      <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }}/>
      <Stack.Screen name="Registration" component={RegistrationPage} options={{ headerShown: false }}/>
      <Stack.Screen name="Past Articles" component={PastArticles} />
      <Stack.Screen name="Related Articles" component={RelatedArticles} />
      <Stack.Screen name="Saved Articles" component={BookmarkedArticles} />
      <Stack.Screen name="Search Article" component={SearchArticles} />
      <Stack.Screen name="Rhapsody of Realities" component={ArticleDetails} />
      <Stack.Screen name="EmailCodeAuth" component={EmailCodeAuth} />
      <Stack.Screen name="VideoDetail" component={VideoDetail} />
      <Stack.Screen name="Rhapsody TV" component={RhapsodyTVScreen} />
      <Stack.Screen name="Your Notes" component={AppNotes} />
      <Stack.Screen name="LatestBooks" component={LatestBooks}
       options={{
        title: 'Latest Books',
      }} />
      <Stack.Screen name="EpubReader" component={Annotations} 
        options={{
          title: 'Document Reader',
        }}/>
      <Stack.Screen name="RhapsodyNews" component={RhapsodyNews} 
        options={{
          title: 'Rhapsody News',
        }}/>
      <Stack.Screen name="AppFeedBack" component={AppFeedBack}  options={{
        title: 'FeedBack' 
      }} />

      <Stack.Screen name="AllNotes" component={AllNotes}  options={{
        title: '',
        headerLeft: () => (
          <View style={{flexDirection:"row"}}>
            <Text style={{color:'white',fontWeight:"bold",marginLeft:30,marginRight:30,fontSize:18,marginTop:5}}>Welcome</Text>
           <Image
                style={{width:40,height:40,marginLeft:10}}
                source={require('./src/assets/prof.png')}
              />

          </View>
         ),
        headerRight: () => (
          <View style={{marginRight:10}}>
                  <TouchableOpacity onPress={()=>{
                    navigation.navigate('AppFeedBack');
                  }}>
                    <Text style={{fontWeight:"bold",color:'#FFFFFF',fontSize:18}}>FEEDBACK</Text>
                  </TouchableOpacity>



          </View>
         )}} />


    </Stack.Navigator>
  );
}

function AudioStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center',
                    headerStyle: {
                      backgroundColor: "#D8A623",
                    },
                    headerTintColor: "white",
                    headerBackTitle: "Back"}}>
      <Stack.Screen name="Rhapsody Audio" component={AudioScreen} 
      // options={{
      //           headerTitleStyle: { 
      //               textAlign:"center", 
      //               flex:1 
      //           },
              
      //         }}
       />
    </Stack.Navigator>
  );
}



function LibraryStackNavigator() {

  const navigation = useNavigation<StackNavigation>();

  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Rhapsody Library" component={LibraryScreen} />
      <Stack.Screen name="EpubReader" component={Annotations} 
      options={{
        title: 'Document Reader',
        }}
         
         />
    </Stack.Navigator>
  );
}

function StoreStackNavigator() {

  const navigation = useNavigation<StackNavigation>();

  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Rhapsody Store" component={StoreScreen}
      options={{
        title: '',
        headerLeft: () => (
          <View style={{flexDirection:"row"}}>
            <Text style={{color:'white',fontWeight:"bold",marginLeft:30,marginRight:30,fontSize:18,marginTop:5}}>Rhapsody</Text>
            <Text style={{color:'black',fontWeight:"bold",fontSize:18,marginTop:5}}>Store</Text>
           <Image
                style={{width:40,height:40,marginLeft:10}}
                source={require('./src/assets/prof.png')}
              />
            {/* <Text style={{fontSize:18,color:"white",fontWeight:"bold",marginLeft:10}}>Welcome Guest</Text> */}
          </View>
         ),
        headerRight: () => (
          <View style={{marginRight:10}}>
                  <TouchableOpacity onPress={()=>{
                    navigation.navigate('AppFeedBack');
                  }}>
                    <Text style={{fontWeight:"bold",color:'#FFFFFF',fontSize:18}}>FEEDBACK</Text>
                  </TouchableOpacity>

          </View>
         )}}
      
      />
      <Stack.Screen name="LanguageBooks" component={LanguageBooks}
          options={{
            headerRight: () => (
              <View style={{marginRight:10,flexDirection:'row'}}>
                      <TouchableOpacity onPress={()=>{
                        navigation.navigate('AppFeedBack');
                      }}>
                        <Text style={{fontWeight:"bold",color:'#FFFFFF',fontSize:18}}>FEEDBACK</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>{
                        navigation.navigate('AppFeedBack');
                      }}>
                        <MaterialCommunityIcons  name='lock' color='#FFFFFF'/>
                      </TouchableOpacity>
              </View>
            )}}
      
      />

<Stack.Screen name="GroupedBooks" component={GroupedBooks}
          options={{
            headerRight: () => (
              <View style={{marginRight:10,flexDirection:'row'}}>
                      <TouchableOpacity onPress={()=>{
                        navigation.navigate('AppFeedBack');
                      }}>
                        <Text style={{fontWeight:"bold",color:'#FFFFFF'}}>FEEDBACK</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>{
                        navigation.navigate('AppFeedBack');
                      }}>
                        <MaterialCommunityIcons  name='lock' color='#FFFFFF'/>
                      </TouchableOpacity>
              </View>
            )}}
      
      />
    <Stack.Screen name="BookCategories" component={BookCategories}
          options={{
            headerRight: () => (
              <View style={{marginRight:10,flexDirection:'row'}}>
                      <TouchableOpacity onPress={()=>{
                        navigation.navigate('AppFeedBack');
                      }}>
                        <Text style={{fontWeight:"bold",color:'#FFFFFF'}}>FEEDBACK</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>{
                        navigation.navigate('AppFeedBack');
                      }}>
                        <MaterialCommunityIcons  name='lock' color='#FFFFFF'/>
                      </TouchableOpacity>
              </View>
            )}}
      
      />

<Stack.Screen name="AllCategories" component={AllCategories}
          options={{
            headerRight: () => (
              <View style={{marginRight:10,flexDirection:'row'}}>
                      <TouchableOpacity onPress={()=>{
                        navigation.navigate('AppFeedBack');
                      }}>
                        <Text style={{fontWeight:"bold",color:'#FFFFFF'}}>FEEDBACK</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>{
                        navigation.navigate('AppFeedBack');
                      }}>
                        <MaterialCommunityIcons  name='lock' color='#FFFFFF'/>
                      </TouchableOpacity>
              </View>
            )}}
      
      />

    <Stack.Screen name="BookDetails" component={BookDetails}
          options={{
            headerRight: () => (
              <View style={{marginRight:10,flexDirection:'row'}}>
                      <TouchableOpacity onPress={()=>{
                        navigation.navigate('AppFeedBack');
                      }}>
                        <Text style={{fontWeight:"bold",color:'#FFFFFF',fontSize:18}}>FEEDBACK</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>{
                        navigation.navigate('AppFeedBack');
                      }}>
                        <MaterialCommunityIcons  name='lock' color='#FFFFFF'/>
                      </TouchableOpacity>
              </View>
            )}}
      
      />

    <Stack.Screen name="FeedBack" component={FeedBack}
      />
    </Stack.Navigator>
  );
}

function MoreStackNavigator() {

  const [name, setName] = useState<any>();
  const navigation = useNavigation<StackNavigation>();
  const [email, setEmail] = useState<any>();
   
  useEffect(() => {

      const fetchData = async () => {
          let data = await AsyncStorage.getItem('name');
          if(data==null){
            setName('Guest')

          }else{
            setName(data)
          }

          let mail = await AsyncStorage.getItem('email');
          setEmail(mail);

          
      }
      fetchData();

  }, []);

  const logOutUser = async () => {
    //clear email from local storage
    try {
        await AsyncStorage.removeItem("user_id");
        await AsyncStorage.removeItem("country");
        await AsyncStorage.removeItem("email");
        await AsyncStorage.removeItem("expiry_date");
        await AsyncStorage.removeItem("is_registered");
        await AsyncStorage.removeItem("name");
        await AsyncStorage.removeItem("platform");
        await AsyncStorage.removeItem("subscription");
        await AsyncStorage.removeItem("hasLoggedIn");

        DeviceEventEmitter.emit('reload.app');
         //redirect user
        navigation.navigate('Welcome');
        return true;
    }
    catch(exception) {
        return false;
    }
   
    
      
  };

  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="More Settings" component={MoreScreen} 
      options={{
        title: 'Welcome ' +name,
        headerRight: () => (
          <View style={{marginRight:10}}>
            
              {
                name==='Guest' ?(
                  <TouchableOpacity onPress={()=>{navigation.navigate('Login')}} >
                    <Text style={{fontWeight:"bold",color:'#FFFFFF',fontSize:18}}>Log In</Text>
                  </TouchableOpacity>

                ):(
                  <TouchableOpacity onPress={logOutUser} >
                    <Text style={{fontWeight:"bold",color:'#FFFFFF',fontSize:18}}>Log Out</Text>
                  </TouchableOpacity>

                )
              }


          </View>
         ),
      }}/>
      <Stack.Screen name="Profile" component={ProfileScreen} 
          options={{
            title: 'My Profile ',
            headerRight: () => (
              <View style={{marginRight:10,flexDirection:'row'}}>
                      <TouchableOpacity onPress={()=>{
                        navigation.navigate('Settings');
                      }} >
                        <MaterialCommunityIcons  name='cog-outline' size={25} color='#FFFFFF' />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>{}} >
                        <MaterialCommunityIcons  name='refresh' size={25} color='#FFFFFF' />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>{
                        navigation.navigate('EditProfile',{email:email});
                      }} >
                        <MaterialCommunityIcons  name='dots-vertical' size={25} color='#FFFFFF' />
                      </TouchableOpacity>
              </View>
            )
          }}
      
      />
      <Stack.Screen name="Rhapsody TV" component={RhapsodyTVScreen} />
      <Stack.Screen name="LatestBooks" component={LatestBooks} 
      options={{
        title: 'Latest Books ',
        
      }}/>
      <Stack.Screen name="Testimony" component={Testimony} 
      />

      <Stack.Screen name="EditProfile" component={EditProfile}
      options={{
        title: 'Edit Profile ',
        
      }} />
      <Stack.Screen name="AboutUs" component={AboutUs} 
      options={{
        title: 'About Us ',
        
      }}/>
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} 
      options={{
        title: 'Privacy Policy ',
        
      }}
      />
      <Stack.Screen name="Settings" component={Settings} />

      <Stack.Screen name="Prayer Request" component={PrayerRequest} />
      <Stack.Screen name="Favourite Books" component={Favourites} />
      <Stack.Screen name="Study Tracker" component={StudyTracker}    
            options={{
              title: 'Rhapsody Study Tracker',
            }}
      />
      <Stack.Screen name="Bookmarked Articles" component={BookmarkedArticles} />
      
    </Stack.Navigator>
  );
}

function TabNavigator() {

  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName= "home";
  
        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Audio') {
          iconName = 'music-note';
        } else if (route.name === 'Library') {
          iconName = 'bookshelf';
        }else if (route.name === 'Store') {
          iconName = 'cart';
          } else if (route.name === 'More') {
          iconName = 'dots-horizontal';
          }
  
        return <MaterialCommunityIcons  name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#D8A623',
      tabBarInactiveTintColor: '#333333',
      })}
    >
      <Tab.Screen name="Welcome" component={HomeStackNavigator} options={{headerShown: false}} />
      <Tab.Screen name="Audio" component={AudioStackNavigator} options={{headerShown: false}} />
      <Tab.Screen name="Library" component={LibraryStackNavigator} options={{headerShown: false}} />
      <Tab.Screen name="Store" component={StoreStackNavigator} options={{headerShown: false}}  />
      <Tab.Screen name="More" component={MoreStackNavigator} options={{headerShown: false}} />
    </Tab.Navigator>
  );
}



export default function App() {

  LogBox.ignoreLogs([
    "ViewPropTypes will be removed",
    "ColorPropType will be removed",
    ]);

  const [showRealApp, setShowRealApp] = useState<any>();
  const [appUrl, setStoreUrl] = useState<any>();
  const [splashing,setSplashing] = useState(true);

  const db = DatabaseConnection.getdevotionalsDB();
  
  
   
  useEffect(() => {
    // Hide the splash screen when the component is mounted
    SplashScreen.hide();
    // requestUserPermission();
    // NotificationListener();

    setTimeout(() => {
      setSplashing(false);
    },5000);

    DeviceEventEmitter.emit('reload.app');
    const checkAppVersion = async () => {
      try {
const latestVersion = Platform.OS === 'ios'? await fetch('https://itunes.apple.com/in/lookup?bundleId=com.rhapsody.dailydevotionals')
                .then(r => r.json())
                .then((res) => { return res?.results[0]?.version })
                : await VersionCheck.getLatestVersion({
                    provider: 'playStore',
                    packageName: ' packageName like com.app',
                    ignoreErrors: true,
                });

        const currentVersion = VersionCheck.getCurrentVersion();

        if (latestVersion > currentVersion) {

          VersionCheck.getStoreUrl({appID: '463739646'}).then(
            storeUrl => {
              console.log(storeUrl);
              setStoreUrl(storeUrl);
            },
          );

          Alert.alert(
            'Update Required',
'A new version of the app is available. Please update to continue using the app.',
            [
              {
                text: 'Update Now',
                onPress: () => {
                  Linking.openURL(appUrl
                    // Platform.OS === 'ios'? VersionCheck.getAppStoreUrl({ appID: '463739646' }): await VersionCheck.getPlayStoreUrl({ packageName: 'com.rhapsodyreader' })
                  );
                },
              },
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              }
            ],
            { cancelable: true },
            // { cancelable: false }
          );
        } else {
          // App is up-to-date; proceed with the app
        }
      } catch (error) {
        // Handle error while checking app version
        console.error('Error checking app version:', error);
      }
    };
      const fetchData = async () => {
          const hasOnBoarded = await AsyncStorage.getItem('hasOnBoarded');
          setShowRealApp(hasOnBoarded);
          
      }
      //const fetch audio devotionals
      const fetchAudioDevotionals = async () => {  
        let currentmonth =  String(new Date().getMonth() + 1).padStart(2, "0");
        const audio = await getAudioArticles(currentmonth);
        for (var i = 0; i < audio.length; i++) {

          let date= audio[i].date;
          let formated_date= audio[i].formated_date;
          let url= audio[i].url;
          let audio_id= audio[i].audio_id;
          let title= audio[i].title;
          let photo_link= audio[i].photo_link;


          //slect from db if exists
      db.transaction((tx:any) => {
        tx.executeSql('SELECT * FROM audio_devotionals where date = ?',
         [date],(tx:any, results:any) => {
            if(results.rows.length>0){


            }else{
                  
                    db.transaction((tx:any) => {
                      tx.executeSql(
                        'INSERT INTO audio_devotionals (date,formated_date,url,audio_id,title,photo_link) VALUES (?, ?,?,?,?,?)',
                        [date,
                          formated_date,
                          url,
                          audio_id,
                          title,
                          photo_link],
                        (tx:any, results:any) => {
                          // console.log('INSERT successful');
                        },
                        (error:any) => {
                          console.error('Error executing INSERT SQL: ', error);
                        }
                      );
                    });
              
            }
        });
        });


        }
        
        
      }

      
      fetchAudioDevotionals();
      fetchData();
      // checkAppVersion();

      const syncDataInBackground = async () => {
        try {
          // Perform data syncing here
        const email = await AsyncStorage.getItem("email");
        if(email===null){

        }else{
          // syncBookmarkedArticlesData();
          // syncCalenderData();
          // uploadCalenderData();


            // axios.get('https://backend3.rhapsodyofrealities.org/read/get/'+email)
            //         .then((res) => {
            //     console.log("Read Dates",res.data);
            // })
            //   .catch((err) => {
            //     console.log("Error",err)
            // });


          const link = 'https://backend3.rhapsodyofrealities.org/get/notes';
          const syncData ={
            "email":email
          }
          
          // axios.post(link,syncData)
          //   .then((res) => {
          //     console.log("Sync Results ",res.data.result)
          // })
          //   .catch((err) => {
          //     console.log(err);
          // });

        }
     

    //                 String sync_status = jsonArray.getJSONObject(0).getString("sync_status");
    //                 if(sync_status.equals("0")){
    //                     Toast.makeText(getContext(), "No notes to be Synced", Toast.LENGTH_SHORT).show();
    //                 }else{
    //                     for (int i = 0; i < jsonArray.length(); i++) {

    //                         JSONObject object = jsonArray.getJSONObject(i);
    //                         String id;
    //                         try {
    //                             id = object.getString("id");
    //                         } catch (JSONException e) {
    //                             id = String.valueOf(object.getInt("id"));
    //                             e.printStackTrace();
    //                         }
    //                         String noteid = object.getString("noteid");
    //                         String notetitle = object.getString("notetitle");
    //                         String notebody = object.getString("notebody");
    //                         String notestatus = object.getString("notestatus");
    //                         String notestime = object.getString("notestime");
    //                         String notetype = object.getString("notetype");

    //                         //query each id or title
    //                         final Cursor cursor = notesdb.get_bk_based_on_uniqid(noteid);
    //                         if (cursor.moveToFirst()) {
    //                             Log.d("datacheck", id + " exist");
    //                         } else {
    //                             Log.d("datacheck", id + " no exist, so insert");
    //                             //insert into db
    //                             notesdb.insertnote(notetitle, noteid, notebody, notestatus, notetype, notestime, "");
    //                             ref();
    //                         }
    //                     }
    //                     //after the loop
    //                     Toast.makeText(getContext(), "Notes Synced Successfully", Toast.LENGTH_SHORT).show();
    //                 }

    //             } catch (JSONException e) {
    //                 e.printStackTrace();
    //                 if(getActivity() != null){
    //                     Toast.makeText(getContext(), "Notes Sync Failed, check Your internet Connection", Toast.LENGTH_LONG).show();
    //                 }
    //             }
    //         }

    //         @Override
    //         public void onFailure(int statusCode, Header[] headers, byte[] responseBody, Throwable error) {
    //             pb_refresh_notes.setVisibility(View.GONE);
    //             if(getActivity() != null){
    //                 Toast.makeText(getContext(), "Notes Sync Failed, check Your internet Connection", Toast.LENGTH_LONG).show();
    //             }
    //         }
    //     });
    // }
        } catch (error) {
          console.error('Background sync error:', error);
        }
      };
  
      const backgroundSyncInterval = setInterval(() => {
        syncDataInBackground();
      }, 1 * 60 * 1000); // Execute every 15 minutes
  
      return () => {
        clearInterval(backgroundSyncInterval);
      };

  }, []);



	return (
		
<>
{splashing ?(
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash}  options={{headerShown: false}}/>
    </Stack.Navigator>
  </NavigationContainer>
):( 
  <NavigationContainer>
  <StatusBar
backgroundColor='#D8A623'
/>
{showRealApp ? (
  <Tab.Navigator 
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName= "home";
  
        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Audio') {
          iconName = 'music-note';
        } else if (route.name === 'Library') {
          iconName = 'bookshelf';
        }else if (route.name === 'Store') {
          iconName = 'cart';
          } else if (route.name === 'More') {
          iconName = 'dots-horizontal';
          }
  
        return <MaterialCommunityIcons  name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#D8A623',
      tabBarInactiveTintColor: '#333333',
      })}>
    
    <Tab.Screen name="Welcome" component={HomeStackNavigator} options={{headerShown: false}} />
    <Tab.Screen name="Audio" component={AudioStackNavigator} options={{headerShown: false}} />
    <Tab.Screen name="Library" component={LibraryStackNavigator} options={{headerShown: false}} />
    <Tab.Screen name="Store" component={StoreStackNavigator} options={{headerShown: false}}  />
    <Tab.Screen name="More" component={MoreStackNavigator} options={{headerShown: false}} />
  </Tab.Navigator>
  ) : (
    <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="OnBoardingScreen" component={OnboardingScreen}  options={{headerShown: false}}/>
        <Stack.Screen name="HomeScreen" component={TabNavigator}  options={{headerShown: false}}/>
    </Stack.Navigator>
  )}
  </NavigationContainer>

)}


     
     
</>
	);
}

