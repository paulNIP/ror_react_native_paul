import React,{useEffect} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNBootSplash from 'react-native-bootsplash';

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


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#D8A623",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};


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
      <Stack.Screen name="More Settings" component={MoreScreen} />
    </Stack.Navigator>
  );
}

export default function App() {


	return (
		<NavigationContainer>
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
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});