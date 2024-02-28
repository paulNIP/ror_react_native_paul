import React,{useEffect,useState} from 'react';
import { View, Text, StyleSheet,Image, TouchableOpacity,StatusBar, Platform,I18nManager, DeviceEventEmitter } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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


import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import memoize from "lodash.memoize"; // Use for caching/memoize for better performance
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
import EpubReader from './src/screens/EpubReader';
import { DatabaseConnection } from './src/database/database-connection';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


export type StackParamList = {
  AppFeedBack: undefined;
  Welcome:undefined;
  Login:undefined;
  OnboardingScreen:undefined;
  RecipeDetail:{ id: string };
  Registration:{email:string};
  LanguageBooks:{lang:string};
  BookDetails:{book_id:string};
  GroupedBooks:{cat_id:string,category:string};
  BookCategories:undefined;
  AllCategories:undefined;
  Settings:undefined;
  EditProfile:{email:string};
  PrivacyPolicy:undefined;
  FeedBack:{id:string};
  EpubReader:{file:string};
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

      const fetchData = async () => {
          let data = await AsyncStorage.getItem('name');
          if(data==null){
            setName('Guest');

          }else{
            setName(data);
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
      <Stack.Screen name="AppFeedBack" component={AppFeedBack}  options={{
        title: 'FeedBack' 
      }} />


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
      <Stack.Screen name="EpubReader" component={EpubReader} 
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
   ),
}}
      
      />
      <Stack.Screen name="Rhapsody TV" component={RhapsodyTVScreen} />
      <Stack.Screen name="Testimony" component={Testimony} />

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

  const [showRealApp, setShowRealApp] = useState<any>();
  const [appUrl, setStoreUrl] = useState<any>();

  const db = DatabaseConnection.getdevotionalsDB();
  
  
   
  useEffect(() => {

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
                          console.log('INSERT successful');
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

      checkAppVersion();
      fetchAudioDevotionals();
      fetchData();

  }, []);



	return (
		
<>

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

</>
	);
}

