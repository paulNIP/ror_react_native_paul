import React,{useEffect,useState} from 'react';
import { View, Text, StyleSheet,Image, TouchableOpacity,StatusBar, Platform } from 'react-native';
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
import SubscriptionScreen from './src/screens/SubscriptionsScreen';
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
import PrayerRequest from './src/screens/PrayerRequest';
import Favourites from './src/screens/Favourites';
import StudyTracker from './src/screens/StudyTracker';
import BookmarkedArticles from './src/screens/BookmarkedArticles';
import EmailCodeAuth from './src/screens/Auth/EmailCodeAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from "@react-navigation/stack";

import OnboardingScreen from './src/screens/OnBoardingScreen';
import AppFeedBack from './src/screens/AppFeedBack';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


export type StackParamList = {
  AppFeedBack: undefined;
};

const StackHeader = createStackNavigator<StackParamList>();

export type StackNavigation = StackNavigationProp<StackParamList>;




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
            setName('Guest')

          }else{
            setName(data)
          }
          
      }
      fetchData();

  }, []);



  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={HomeScreen} 
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
      <Stack.Screen name="Subscription" component={SubscriptionScreen} />
      <Stack.Screen name="My Wallet" component={WalletScreen} />
      <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }}/>
      <Stack.Screen name="Registration" component={RegistrationPage} options={{ headerShown: false }}/>

      <Stack.Screen name="Past Articles" component={PastArticles} />
      <Stack.Screen name="Related Articles" component={RelatedArticles} />
      <Stack.Screen name="Saved Articles" component={SavedArticles} />
      <Stack.Screen name="Search Article" component={SearchArticles} />
      <Stack.Screen name="Rhapsody of Realities" component={ArticleDetails} />
      <Stack.Screen name="EmailCodeAuth" component={EmailCodeAuth} />
      <Stack.Screen name="AppFeedBack" component={AppFeedBack}  options={{
        title: 'FeedBack'
        
      }} />
    </Stack.Navigator>
  );
}

function AudioStackNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Rhapsody Audio" component={AudioScreen} />
    </Stack.Navigator>
  );
}

function LibraryStackNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Rhapsody Library" component={LibraryScreen} />
    </Stack.Navigator>
  );
}

function StoreStackNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Rhapsody Store" component={StoreScreen} />
    </Stack.Navigator>
  );
}

function MoreStackNavigator() {

  const [name, setName] = useState<any>();
   
  useEffect(() => {

      const fetchData = async () => {
          let data = await AsyncStorage.getItem('name');
          if(data==null){
            setName('Guest')

          }else{
            setName(data)
          }
          
      }
      fetchData();

  }, []);

  console.log("Yyuuuddbcbcbcnbcb bkfj",name);
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="More Settings" component={MoreScreen} 
      options={{
        title: 'Welcome ' +name,
        headerLeft: () => (
          <View style={{flexDirection:"row"}}>
           <Image
                style={{width:35,height:35,marginLeft:10}}
                source={require('./src/assets/prof.png')}
              />
            {/* <Text style={{fontSize:18,color:"white",fontWeight:"bold",marginLeft:10}}>Welcome Guest</Text> */}
          </View>
         ),
        headerRight: () => (
          <View style={{marginRight:10}}>
            
              {
                name==='Guest' ?(
                  <TouchableOpacity >
                    <Text style={{fontWeight:"bold",color:'#FFFFFF',fontSize:18}}>Log In</Text>
                  </TouchableOpacity>

                ):(
                  <TouchableOpacity >
                    <Text style={{fontWeight:"bold",color:'#FFFFFF',fontSize:18}}>Log Out</Text>
                  </TouchableOpacity>

                )
              }


          </View>
         ),
      }}/>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Rhapsody TV" component={RhapsodyTVScreen} />
      <Stack.Screen name="Testimony" component={Testimony} />
      <Stack.Screen name="Prayer Request" component={PrayerRequest} />
      <Stack.Screen name="Favourite Books" component={Favourites} />
      <Stack.Screen name="Study Tracker" component={StudyTracker} />
      <Stack.Screen name="Bookmarked Articles" component={BookmarkedArticles} />
      
    </Stack.Navigator>
  );
}



export default function App() {

  const [showRealApp, setShowRealApp] = useState<any>();
   
  useEffect(() => {

      const fetchData = async () => {
          const hasOnBoarded = await AsyncStorage.getItem('hasOnBoarded');   
          setShowRealApp(hasOnBoarded);
          
      }
      fetchData();

  }, []);



	return (
		
<>
{showRealApp ? (
  <NavigationContainer>
  <StatusBar
backgroundColor='#D8A623'
/>
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
</NavigationContainer>
) : (
  <OnboardingScreen/>
)}
</>
	);
}

