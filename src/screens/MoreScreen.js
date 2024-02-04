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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ListItem,Icon } from '@rneui/themed';



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
// import Icon from 'react-native-vector-icons/Ionicons';




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
    <ScrollView  showsVerticalScrollIndicator={false}>

      <ImageBackground source={require('../assets/menubar_blue.png')}resizeMode="cover" 
          style={{width:Dimensions.get('window').width,
           height:Dimensions.get('window').height*0.35,marginTop:-40}}>
        <View style={{flexDirection:'row',marginStart:30,marginTop:-30}}>
          <Image style={{width:100,height:100,marginTop:120}}
              source={require('../assets/logo.png')}
            />
            <View style={{marginTop:140,marginLeft:10}}>
              <Text style={{marginBottom:5,fontSize:18,color:'white',fontWeight:'bold'}}>{name}</Text>
              <Text style={{marginBottom:5,fontSize:18,color:'white',fontWeight:'bold'}}>{subscription}</Text>

            </View>

        </View>
        
      </ImageBackground>


      <View style={{borderRadius:15,marginLeft:10,marginRight:10}}>
          <ListItem onPress={()=>{navigation.navigate('Welcome')}}  bottomDivider >
                  <View style={{borderRadius:5,width:30,
                    height:30,backgroundColor:'#D8A623',justifyContent:'center'}}>
                    <Icon name="home" type="material-community" color="#FFFFFF" />
                  </View>
                    
                    <ListItem.Content>
                    <ListItem.Title>Home</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron/>

          </ListItem>

          <ListItem onPress={()=>{
             //Got to Profile if user is logged in
             navigateTo('Profile')}}  bottomDivider >
                  <View style={{borderRadius:5,width:30,
                    height:30,backgroundColor:'#D8A623',justifyContent:'center'}}>
                    <Icon name="account-circle" type="material-community" color="#FFFFFF" />
                  </View>
                    <ListItem.Content>
                    <ListItem.Title>Profile</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron/>
      
          </ListItem>
      </View>

     
      <View style={{borderRadius:15,marginLeft:10,marginRight:10}}>
      <ListItem onPress={()=>{
          //Got to Rhapsody if user is logged in
          navigation.navigate('Rhapsody TV');
          
          }
      }  bottomDivider  style={{marginTop:10}}>
                <View style={{borderRadius:5,width:30,
                    height:30,backgroundColor:'#D8A623',justifyContent:'center'}}>
                    <Icon name="television-play" type="material-community" color="#FFFFFF" />
                  </View>
                <ListItem.Content>
                <ListItem.Title>Rhapsody TV</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron/>
  
      </ListItem>
      </View>

      <View style={{borderRadius:15,marginLeft:10,marginRight:10}}>
      <ListItem onPress={()=>{
            //Got to Testimony if user is logged in
            navigateTo('Testimony')}}  bottomDivider  style={{marginTop:10}} >
                <View style={{borderRadius:5,width:30,
                    height:30,backgroundColor:'#D8A623',justifyContent:'center'}}>
                    <Icon name="microphone-variant" type="material-community" color="#FFFFFF" />
                  </View>
                <ListItem.Content>
                <ListItem.Title>Testimony</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron/>
  
      </ListItem>

      <ListItem onPress={()=>{
            //Got to Testimony if user is logged in
            navigateTo('Prayer Request')}}  bottomDivider >
                <View style={{borderRadius:5,width:30,
                    height:30,backgroundColor:'#D8A623',justifyContent:'center'}}>
                    <Icon name="hands-pray" type="material-community" color="#FFFFFF" />
                  </View>
                <ListItem.Content>
                <ListItem.Title>Prayer Request</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron/>
  
      </ListItem>
      </View>


      <View style={{borderRadius:15,marginLeft:10,marginRight:10}}>

      <ListItem onPress={
        ()=>{
          //Got to Testimony if user is logged in
          navigateTo('Favourite Books')}
      }  bottomDivider style={{marginTop:10}}>
                <View style={{borderRadius:5,width:30,
                    height:30,backgroundColor:'#D8A623',justifyContent:'center'}}>
                    <Icon name="heart" type="material-community" color="#FFFFFF" />
                  </View>
                <ListItem.Content>
                <ListItem.Title>Favourite Books</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron/>
  
      </ListItem>

      <ListItem onPress={()=>{
            //Got to Testimony if user is logged in
            navigateTo('Study Tracker')}}  bottomDivider >
                <View style={{borderRadius:5,width:30,
                    height:30,backgroundColor:'#D8A623',justifyContent:'center'}}>
                    <Icon name="clock-time-eight-outline" type="material-community" color="#FFFFFF" />
                  </View>
                <ListItem.Content>
                <ListItem.Title>Study Tracker</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron/>
  
      </ListItem>

      <ListItem onPress={
        ()=>{
            //Got to Testimony if user is logged in
            navigateTo('Bookmarked Articles')}
            }  bottomDivider >
                <View style={{borderRadius:5,width:30,
                    height:30,backgroundColor:'#D8A623',justifyContent:'center'}}>
                    <Icon name="bookmark-multiple" type="material-community" color="#FFFFFF" />
                  </View>
                <ListItem.Content>
                <ListItem.Title>Bookmarked Articles</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron/>
  
      </ListItem>
      </View>

      <View style={{borderRadius:15,marginLeft:10,marginRight:10}}>
      <ListItem onPress={()=>{
        //Got to Testimony if user is logged in
        navigateTo('LanguageSelect')}}  bottomDivider style={{marginTop:10}}>
                <View style={{borderRadius:5,width:30,
                    height:30,backgroundColor:'#D8A623',justifyContent:'center'}}>
                    <Icon name="earth" type="material-community" color="#FFFFFF" />

                  </View>
                <ListItem.Content>
                <ListItem.Title>Language</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron/>
  
      </ListItem>
      <ListItem onPress={onShare} >
                <View style={{borderRadius:5,width:30,
                    height:30,backgroundColor:'#D8A623',justifyContent:'center'}}>
                    <Icon name="share" type="material-community" color="#FFFFFF" />
                  </View>
                <ListItem.Content>
                <ListItem.Title>Share App</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron/>
  
      </ListItem>
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