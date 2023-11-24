import React,{useEffect,useState} from 'react';
import { View, Text, StyleSheet,Image, Button,TouchableOpacity,StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNBootSplash from 'react-native-bootsplash';
//import AppIntroSlider to use it
import AppIntroSlider from 'react-native-app-intro-slider';


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



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

type AppStackParamList = {
  Login: undefined;

};

const AuthStack = createStackNavigator<AppStackParamList>();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#D8A623",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const slides = [
  {
    key: 's1',
    text: 'Welcome to Rhapsody of Realities',
    title: 'The life-changing truths in this edition will refresh, transform and prepare you for a very fulfilling, fruitful and rewarding experience with God’s Word.',
    // image: require('./src/assets/welcome1_2.png'),
    backgroundColor: '#20d2bb',
  },
  {
    key: 's2',
    title: 'Great New Features',
    text: 'Enjoy over 18 New exciting features!',
    // image: require('./src/assets/welcome2_2.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 's3',
    title: 'Rich Bookstore',
    text: 'Enjoy our bookstore with hundreds of books available!',
    // image: require('./src/assets/welcome3_3.png'),
    backgroundColor: '#22bcb5',
  },
  {
    key: 's4',
    title: 'Be more with Rhapsody Subscriptions',
    text: 'Enjoy Reading points, Timer, Wallet feature, Gift of subscription and lots more!',
    // image: require('./src/assets/welcome4_4.png'),
    backgroundColor: '#3395ff',
  },
  
];


function HomeStackNavigator() {



  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={HomeScreen} />
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
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="More Settings" component={MoreScreen} 
      options={{
        title: 'Welcome Guest',
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
            <TouchableOpacity >
                <Text style={{fontWeight:"bold",color:'#FFFFFF',fontSize:18}}>Log In</Text>
                {/* <Text style={{fontWeight:"bold",color:'#FFFFFF'}}>Log Out</Text> */}
           </TouchableOpacity>
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

  const [showRealApp, setShowRealApp] = useState(false);

const onDone = () => {
  setShowRealApp(true);
};
const onSkip = () => {
  setShowRealApp(true);
};

const RenderItem = (item:any) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: item.backgroundColor,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 100,
      }}>
      <Text style={styles.introTitleStyle}>
        {item.title}
      </Text>
      {/* <Image
        style={styles.introImageStyle}
        source={item.image} /> */}
      <Text style={styles.introTextStyle}>
        {item.text}
      </Text>
    </View>
  );
};


	return (
		

// <>
// {showRealApp ? (
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
// ) : (
//   <AppIntroSlider
//     data={slides}
//     renderItem={RenderItem}
//     onDone={onDone}
//     showSkipButton={true}
//     onSkip={onSkip}
//   />
// )}
// </>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
    padding:10
	},

  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  introImageStyle: {
    width: 200,
    height: 200,
  },
  introTextStyle: {
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 30,
  },
  introTitleStyle: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },


});