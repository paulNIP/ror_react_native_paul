import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,Share,Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Dimensions,ImageBackground,Image,View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider } from '@rneui/themed';
//import Ionicons
// import Icon from 'react-native-ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  ActionSheetCell,
  ButtonCell,
  createValidator,
  DatePickerCell,
  emailValidator,
  Form,
  PushButtonCell,
  Section,
  SwitchCell,
  TextInputCell,
} from 'react-native-forms';
import Icon from 'react-native-vector-icons/Ionicons';




const MoreScreen = () => {
  const navigation = useNavigation();

  const settings = [
    {
      name: 'Display language'
    },
    {
      name: 'About'
    }
  ];

  const [name, setName] = useState();
  const [subscription, setSubscription] = useState();
   
  useEffect(() => {

      const fetchData = async () => {
          let data = await AsyncStorage.getItem('name');
          let data2 = await AsyncStorage.getItem('subscription');
          if(data==null){
            setName('Guest');

          }else{
            setName(data)
            
          }

          if(data2==null){
            setSubscription('Basic User');

          }else{
            setSubscription(data2);
            
          }
          
      }
      fetchData();

  }, []);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Rhapsody of Realities. Enjoy unlimited teachings from God\'s word through the NEW Rhapsody of Realities Daily Devotional APP 3.0. Everything you need to have the Number one daily devotional on the go, all wrapped up in one experience.',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };


  const navigateTo = async (route) => {
    const email= await AsyncStorage.getItem('email');
    if(email==null){
      Alert.alert('Notification', 'Inorder to Proceed, Please Login', [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'Login', onPress: () => {
                 navigation.navigate('Login');

              }},
            ]);

    }
    else{
      navigation.navigate(route);

    }

    
    
  }


  return (
    <SafeAreaView style={styles.container}>
    <ScrollView >

      <ImageBackground source={require('../assets/menubar_blue.png')}resizeMode="cover" 
          style={{width:Dimensions.get('window').width,
           height:Dimensions.get('window').height*0.35,marginTop:-40}}>
        <View style={{flexDirection:'row',marginStart:30}}>
          <Image style={{width:100,height:100,marginTop:70}}
              source={require('../assets/logo.png')}
            />
            <View style={{marginTop:90,marginLeft:10}}>
              <Text style={{marginBottom:5,fontSize:18,color:'white',fontWeight:'bold'}}>{name}</Text>
              <Text style={{marginBottom:5,fontSize:18,color:'white',fontWeight:'bold'}}>{subscription}</Text>

            </View>

        </View>
        
      </ImageBackground>
      <View style={{marginHorizontal:10}}>
        <TouchableOpacity style={{marginBottom:5,marginTop:5}} 
        onPress={()=>{navigation.navigate('Welcome')}}>
          <View style={{flexDirection:'row'}}>
            <MaterialCommunityIcons style={{marginEnd:10}} 
              name="home" size={30} color="gray" />
              <Text style={{fontSize:18,marginTop:2}}>Home</Text> 
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{marginBottom:5,marginTop:5}} 
            onPress={()=>{
             //Got to Profile if user is logged in
             navigateTo('Profile')}}>
          <View style={{flexDirection:'row'}}>
            <MaterialCommunityIcons style={{marginEnd:10}} 
              name="account" size={30} color="gray" />
              <Text style={{fontSize:18,marginTop:2}}>Profile</Text> 
          </View>
        </TouchableOpacity>
        <Divider style={{width:Dimensions.get('window').width, alignSelf:'center'}} color='gray' width={1}/>

        <TouchableOpacity style={{marginBottom:5,marginTop:5}} onPress={()=>{
          //Got to Rhapsody if user is logged in
          navigation.navigate('Rhapsody TV');
          
          }}>
          <View style={{flexDirection:'row'}}>
            <MaterialCommunityIcons style={{marginEnd:10}} 
              name="television-play" size={30} color="gray" />
              <Text style={{fontSize:18,marginTop:2}}>Rhapsody TV</Text> 
          </View>
        </TouchableOpacity>

        <Divider style={{width:Dimensions.get('window').width, alignSelf:'center'}} color='gray' width={1}/>

        <TouchableOpacity style={{marginBottom:5,marginTop:5}} onPress={()=>{
            //Got to Testimony if user is logged in
            navigateTo('Testimony')}}>
          <View style={{flexDirection:'row'}}>
            <MaterialCommunityIcons style={{marginEnd:10}} 
              name="microphone-variant" size={30} color="gray" />
              <Text style={{fontSize:18,marginTop:2}}>Testimony</Text> 
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{marginBottom:5,marginTop:5}} onPress={
          ()=>{
            //Got to Testimony if user is logged in
            navigateTo('Prayer Request')}}>
          <View style={{flexDirection:'row'}}>
            <MaterialCommunityIcons style={{marginEnd:10}} 
              name="human-handsup" size={30} color="gray" />
              <Text style={{fontSize:18,marginTop:2}}>Prayer Request</Text> 
          </View>
        </TouchableOpacity>

        <Divider style={{width:Dimensions.get('window').width, alignSelf:'center'}} color='gray' width={1}/>

        <TouchableOpacity style={{marginBottom:5,marginTop:5}} onPress={
          ()=>{
            //Got to Testimony if user is logged in
            navigateTo('Favourite Books')}
          }>
          <View style={{flexDirection:'row'}}>
            <MaterialCommunityIcons style={{marginEnd:10}} 
              name="heart" size={30} color="gray" />
              <Text style={{fontSize:18,marginTop:2}}>Favourite Books</Text> 
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{marginBottom:5,marginTop:5}} onPress={
          ()=>{
            //Got to Testimony if user is logged in
            navigateTo('Study Tracker')}}>
          <View style={{flexDirection:'row'}}>
            <MaterialCommunityIcons style={{marginEnd:10}} 
              name="timelapse" size={30} color="gray" />
              <Text style={{fontSize:18,marginTop:2}}>Study Tracker</Text> 
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{marginBottom:5,marginTop:5}} onPress={
          ()=>{
            //Got to Testimony if user is logged in
            navigateTo('Bookmarked Articles')}}>
          <View style={{flexDirection:'row'}}>
            <MaterialCommunityIcons style={{marginEnd:10}} 
              name="bookmark-multiple" size={30} color="gray" />
              <Text style={{fontSize:18,marginTop:2}}>Bookmarked Articles</Text> 
          </View>
        </TouchableOpacity>
        <Divider style={{width:Dimensions.get('window').width, alignSelf:'center'}} color='gray' width={1}/>

        <TouchableOpacity style={{marginBottom:5,marginTop:5}} onPress={()=>{navigation.navigate('')}}>
          <View style={{flexDirection:'row'}}>
            {/* <MaterialCommunityIcons style={{marginEnd:10}} 
              name="file-find-outline" size={30} color="gray" /> */}
              <Icon name="globe-outline" size={30} color="gray" style={{marginEnd:10}}  />
              <Text style={{fontSize:18,marginTop:2}}>Language</Text> 
             
              {/* <View style={{flexDirection:'row'}}>

                <Text style={{fontSize:18,marginTop:2}}>English</Text> 
                <MaterialCommunityIcons style={{marginEnd:10}} 
              name="file-find-outline" size={30} color="gray" />
              </View> */}
              
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{marginBottom:5,marginTop:5}} onPress={onShare}>
          <View style={{flexDirection:'row'}}>
            <MaterialCommunityIcons style={{marginEnd:10}} 
              name="share" size={30} color="gray" />
              <Text style={{fontSize:18,marginTop:2}}>Share App</Text> 
          </View>
        </TouchableOpacity>

        {
          settings.map((item) => (
            <Text key={item.name}>{item.name}</Text>
          ))
        }

      </View>

    </ScrollView>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {

    },

  });

export default MoreScreen;