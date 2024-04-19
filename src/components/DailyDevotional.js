import React , { useEffect, useState,useRef,useCallback } from 'react';
import { View,Modal,ScrollView, StyleSheet,
  Text,Pressable,TouchableOpacity, FlatList,Button, Image,Vibration,Alert,TextInput } from 'react-native';
import Strings from '../constants/Strings';
import { getDailyDevotional, getLanguages } from '../service/devotionalService';
import HTMLView from 'react-native-htmlview';
import DailyQuiz from './DailyQuiz';
import {Overlay,ListItem } from '@rneui/themed';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import { Divider } from '@rneui/themed';
import {Dimensions,Platform} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getProfile, getWallet } from '../service/authService';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  decode,
  verify,
  isSignatureValid,
  SignJWT,
  thumbprint,
  sha256ToBase64,
  EncryptJwe,
  getRemoteJWKSet,
} from '@pagopa/io-react-native-jwt';

import { generate, sign, getPublicKey,CryptoError } from '@pagopa/io-react-native-crypto';


const windowHeight = Dimensions.get('window').height*0.6;
const windowWidth = Dimensions.get('window').width*0.8;



const DailyDevotional = () => {


  const [visible, setVisible] = useState(false);
  const [shouldShow, setShouldShow] = useState(true);
  const [visibleCongs, setVisibleCongs] = useState(false);
  const [visibleRead, setVisibleRead] = useState(false);

  const [status, setStatus] = useState();
  const [points, setPoints] = useState();
  const [loggedIn, setLoggedIn] = React.useState(null);
  const [subscribed, setSubscribed] = React.useState(null);

  const initialMinutes = 0; // Initial minutes
  const initialSeconds = 10; // Initial seconds
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [userEmail, setUserEmail] = useState();
  const [rneMessage, setRneMessage] = useState();
  const [readCompletion,setReadCompletion] =useState();
  const [language, setLanguage] = useState();
  const [allTranslatedLanguages, setAllTranslatedLanguages] = useState();
  const [searchText, setSearchText] = useState('');


  // Factory to create context bound to a key
  const createCryptoContext = (keyTag) => ({
    getPublicKey : () => getPublicKey(keyTag),
    getSignature : (value) => sign(value, keyTag),
  });

  // Vibration after reading
  const ONE_SECOND_IN_MS = 1000;

  const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    2 * ONE_SECOND_IN_MS,
    3 * ONE_SECOND_IN_MS,
  ];

  const PATTERN_DESC =
    Platform.OS === 'android'
      ? 'wait 1s, vibrate 2s, wait 3s'
      : 'wait 1s, vibrate, wait 2s, vibrate, wait 3s';

  const searchFunction = (text) => {
    setSearchText(text);
    text = text.toLowerCase();
    if (text === "") {
        setAllTranslatedLanguages(allTranslatedLanguages);
    }
    else {
      let filteredLanguages = allTranslatedLanguages.filter(allTranslatedLanguage => (allTranslatedLanguage.toLowerCase().startsWith(text)))
      setAllTranslatedLanguages(filteredLanguages);
    }
  }

  const setPrefferdLanguage =async (lang) => {

    console.log("yweyyehenjejejkekke",lang);

    await AsyncStorage.setItem('language',lang);
    const data = await getDailyDevotional();
    setDevotional(data)
    setVisible(!visible);
  }



  useEffect(() => {
    async function setData() {
      const logData = await AsyncStorage.getItem("hasLoggedIn");
      const subscribe = await AsyncStorage.getItem("subscription");

      setSubscribed(subscribe);
      if (logData == null) {
        setLoggedIn(false);
        AsyncStorage.setItem("hasLoggedIn", "false");
      } else {
        setLoggedIn(true);
      }

    }
    setData();

  }, []);


  useEffect(() => {
    const fetchData = async () => {
      const email = await AsyncStorage.getItem('email');

      if (email == null) {

      } else {
        setUserEmail(email);
        const data = await getProfile(email);
        setStatus(data.subscription.status);
      }

      const lang =await getLanguages();
        setAllTranslatedLanguages(lang.languages)
        let data = await AsyncStorage.getItem('language');
        if(data==null){

        }else{
          setLanguage(data)
        }

    }
    fetchData();

  }, []);

    //Fetch Points every 2 minute
    const fetchPoints = async () => {
      const mail = await AsyncStorage.getItem('email');
      if (mail === null) {

      } else {
        const profile = await getWallet(mail);
        setPoints(profile.totalpoints);
      }
    };

    
    useEffect(() => {
      const myInterval = setInterval(fetchPoints, 5000);
      return () => {
        // should clear the interval when the component unmounts
        clearInterval(myInterval);
      };

    }, []);


    useEffect(() => {
      let interval;

      if (isActive && (minutes > 0 || seconds > 0)) {
        interval = setInterval(() => {
          if (seconds === 0) {
            if (minutes === 0) {
              clearInterval(interval);
            } else {
              setMinutes((prevMinutes) => prevMinutes - 1);
              setSeconds(59);
            }
          } else {
            setSeconds((prevSeconds) => prevSeconds - 1);
          }
        }, 1000);
      } else if (readCompletion) {
        //Do read if complet
        doReadAndEarnArticlePoints();
        // toggleReadingOverlay();
        setIsActive(false);
        setIsCompleted(true);
        //display completed message
      }

      return () => {
        clearInterval(interval);
      };

      // [isActive, minutes, seconds]
    }, []);


    const startTimer = () => {
      setIsActive(true);
    };

    const stopTimer = () => {
      setIsActive(false);
    };

    const resetTimer = () => {
      setIsActive(false);
      setMinutes(initialMinutes);
      setSeconds(initialSeconds);
    };




  const toggleOverlay = (event) => {
    Strings.READING=event;
    setVisible(!visible);
  };

  const toggleReadingOverlay = () => {
    setVisibleCongs(!visibleCongs);
  };

  const toggleReadOverlay = () => {
    setVisibleRead(!visibleRead);
  };

  const navigation = useNavigation();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      setShouldShow(true);

    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);




  const [devotional, setDevotional] = useState();

  useEffect(() => {

      const fetchData = async () => {
          const read =await AsyncStorage.getItem("rne_date");
          setReadCompletion(true);
          const data = await getDailyDevotional();
          setDevotional(data)
      }
      fetchData();

  }, []);

  const options = { weekday: 'long', day: 'numeric', year: 'numeric', month: 'long' };
  const today = new Date().toLocaleDateString("en-US", options);

  // Timer References
  const refTimer = useRef();

  // For keeping a track on the Timer
  const [timerEnd, setTimerEnd] = useState(false);

  const timerCallbackFunc = (timerFlag) => {

      setTimerEnd(timerFlag);



  };

  const navigateToSubscription =async() =>{
    const mail=await AsyncStorage.getItem('email');
    if(mail===null){
       navigation.navigate('Login');
    }else{
      if(status==='active'){
        navigation.navigate('Subscription');

      }else if(status!=='active' && status !=null){
        navigation.navigate('Subscription');

      }else{
        navigation.navigate('Subscription');

      }

    }

  }

  const navigateToLanguages =async() =>{
    const mail=await AsyncStorage.getItem('email');
    if(mail===null){
       navigation.navigate('Login');
    }else{
      setVisible(true);

    }
    
  }

  const navigateToWallet =async ()=>{
    const mail = await AsyncStorage.getItem('email');
    if(mail===null){
      navigation.navigate('Login');
    }else{
      if(status==='active'){
        navigation.navigate('My Wallet');
      }else if(status!=='active' && status !=null){
        navigation.navigate('My Wallet');
      }
    }
    
  }

  const readMore = async () => {
    const email= await AsyncStorage.getItem('email');
    if(email==null){
      navigation.navigate('Login');
    }else{
      const data = await getProfile(email);
      if(data.subscription.status==='active'){
        setShouldShow(!shouldShow);
        if(setReadCompletion){

        }else{
          startTimer();
          setTimerEnd(false);
          refTimer.current.resetTimer();
        }
      }else{
        navigation.navigate('Subscription');
      }
    }
  }

  //set reading completed
  const setReadingCompleted=async()=>{
    const rne_date= await AsyncStorage.getItem('rne_date');
    if(rne_date==null){
      await AsyncStorage.setItem('rne_date',new Date().toISOString().slice(0, 10));

    }

  }



  //Do read and earn points
  const doReadAndEarnArticlePoints=async()=> {
    const randomKeyTag = Math.random().toString(36).substring(2, 5);
    try {
      const pk = await generate(randomKeyTag);
      // console.log("pksnsnndnd",pk)
    } catch (e) {
      const {message, userInfo} =  e;
      // console.log("Generation Erriorttt",message);
    }

    const crypto = createCryptoContext(randomKeyTag);

    // Create jwt
    const signedJwt = await new SignJWT(crypto)
      .setPayload({
        sub: 'demoApp',
        iss: 'PagoPa',
      })
      .setProtectedHeader({ typ: 'JWT' })
      .sign();

    console.log("Generated tokennbfnjfj",signedJwt);


    const post_data={
        "article": 1,
        "last_read": new Date().toISOString().slice(0, 10),
        "password":"rabadaba",
        "email":userEmail
    }

    axios.post('https://rowtoken.rhapsodyofrealities.org/api/read/add',data, {
      //example with bearer token
      headers: {
        'Authentication': 'Bearer '+signedJwt
      }
    })
    .then(function (res) {
      // console.log("Read and Earn response",res.data.response);
      if(res.data.status===1){
        Vibration.vibrate(10 * ONE_SECOND_IN_MS);
        setRneMessage(res.data.response);

        setVisibleCongs(true);
        //call method to insert in read and earn Dates
        setReadingCompleted();


      }else{
        setRneMessage(res.data.response);
        setVisibleRead(true);
        setReadingCompleted();

      }


    })
    .catch(function (error) {
        console.log(error);
    });

}

  const renderDevotional = ( {item} ) => {

    const img = (language) ? item.photo_link:item.image;
    const body = item.content_body;
    const study= Strings.VERSE_URL+item.study;
    const BA= Strings.VERSE_URL+item.BA;
    const BB= Strings.VERSE_URL+item.BB;



    return (

      <View >
        <Image
          style={{width: 'auto', height: Dimensions.get('window').height*0.23,borderRadius: 5}}
          source={{
            uri: img,
          }}
          // resizeMode={'cover'} // cover or contain its upto you view look
        />

        {/* <AccountChips style={{marginTop:10}}/> */}

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
      <View style={styles.contentView}>
      
          <TouchableOpacity style={styles.roundButton}
            onPress={navigateToWallet}
            >
            <Text>Check Wallet</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.roundButton}
            onPress={navigateToSubscription}
            >
            <Text>Upgrade Subscription</Text>
          </TouchableOpacity>

            <TouchableOpacity style={styles.roundButton}
            onPress={navigateToLanguages}
            >
            <View style={{flexDirection:"row"}}>
                {/* <FontAwesome name="globe" size={20} color="#900" /> */}
                <MaterialCommunityIcons  size={20} name='earth' color='gray'/>
                <Text> Language - {language}</Text>
            </View>
          </TouchableOpacity>


      </View>

      <Overlay ModalComponent={Modal} fullScreen={false}
            isVisible={visible} 
            onBackdropPress={toggleOverlay} overlayStyle={{width:Dimensions.get('window').width*0.8,height:Dimensions.get('window').height*0.8}}>
                <Text style={{alignSelf:'center',marginTop:20,fontWeight:'bold'}}>
                        Choose Language
                </Text>
                <TextInput 
                placeholderTextColor="black"
                placeholder="Search available languages"
                value={searchText}
                style={{height:40}}
                onChangeText={text => searchFunction(text)}
                />
                <FlatList   
                data={allTranslatedLanguages} 
                extraData={ allTranslatedLanguages }
                showsVerticalScrollIndicator={ false }
                keyExtractor={(item) => item} 
                 renderItem={({item}) =>   
                 <ListItem bottomDivider onPress={()=>{setPrefferdLanguage(item)}}>
                 <ListItem.Content>
                   <ListItem.Title>{item} </ListItem.Title>
                 </ListItem.Content>
               </ListItem>} />
            </Overlay> 
      </ScrollView>







        {/* <ReadAndEarn/> */}
        {status===undefined ?(
                    <View>
                      <Text style={{color:'#606060',alignSelf:'center'}} >{today}</Text>
                    </View>

        ):(

          <View style={{flexDirection:'row',justifyContent:'space-between'}}>

                <View style={{flexDirection:'row'}}>
                    <MaterialCommunityIcons style={{marginTop:-2}} name="timer-outline" size={25} color="red" />
                    {
                      readCompletion &&(
                        <TouchableOpacity>
                          <Text style={{ fontSize: 14, color: '#008000' }}>
                            Completed
                            </Text>
                        </TouchableOpacity>

                      )
                    }

                    {!readCompletion&&(
                        <Text>
                          {minutes.toString().padStart(2, '0')}:
                          {seconds.toString().padStart(2, '0')}
                        </Text>
                      )}
                </View>
                  <View>
                    <Text style={{color:'#606060'}} >{today}</Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                      <MaterialCommunityIcons name="arrow-up-bold-circle-outline" style={{marginTop:-2}} size={25} color="red" />
                      <Text>  {points} pt(s)</Text>
                  </View>

            </View>


        )}



        {shouldShow ? ( <View  style={{padding:10}}>
          <View style={{justifyContent:'center'}}>
          <Text style={styles.heading} >{item.title}</Text></View>
          <Divider style={{width:100,color:'#DAA520', alignSelf:'center'}} color='#fe5000'  width={0.9}/>
          <Text style={styles.excerpt}>{item.excerpt}</Text>
          <View style={styles.fixToText}>
             <TouchableOpacity style={{backgroundColor:"red",height:40,borderRadius:5}} onPress={readMore}>
               <Text style={{color:"#FFFFFF", fontWeight:'500',alignSelf:'center', paddingTop: 10, paddingBottom : 0, paddingRight :10 , paddingLeft : 10 }} >Read more</Text>
             </TouchableOpacity>
          </View>
          </View>
        ) : null

        }

        {shouldShow ? null
         : (
          <View style={{marginBottom:20,padding:10}} >
            <Text style={styles.heading}>{item.title}</Text>
            <Divider style={{width:100, alignSelf:'center'}} color='red' width={2}/>
            <HTMLView style={{marginTop:10}}
              value={body}
              onLinkPress={(url) => {
                Strings.READING=url;
                toggleOverlay(url);
              }}
              stylesheet={webViewStyle}

            />

            <Text style={styles.heading}>{Strings.prayer}</Text>
            <Text style={styles.confess}>{item.confession_or_prayer}</Text>
            <Text style={styles.heading}>{item.further_study_title}</Text>
            <Pressable onPress={()=>toggleOverlay(study)} >
              <Text style={styles.verses} >{item.further_study}</Text>
            </Pressable>

            <Text style={styles.heading}>{item.one_yearbb_title}</Text>
            <Pressable onPress={()=>toggleOverlay(BA)}  >
              <Text style={styles.verses}>{item.one_yearbb}</Text>
            </Pressable>

            <Text style={styles.heading}>{item.two_yearbb_title}</Text>
            <Pressable onPress={()=>toggleOverlay(BB)}>
              <Text style={styles.verses}>{item.two_yearbb}</Text>
            </Pressable>

            <DailyQuiz/>
            <Overlay ModalComponent={Modal} fullScreen={false}
              isVisible={visible}
              onBackdropPress={toggleOverlay} overlayStyle={{width:windowWidth,height:windowHeight}}>
                <Text style={styles.textSecondary}>
                     SCRIPTURE REFERENCE
                </Text>
                <WebView source={{ uri: Strings.READING }} style={{ flex: 1 }} />
              </Overlay>

              <Overlay ModalComponent={Modal} fullScreen={false}
              isVisible={visibleCongs}
              onBackdropPress={toggleReadingOverlay} overlayStyle={{width:windowWidth,height:windowHeight,padding:30}}>

                <View style={{alignSelf:'center'}}>
                   <Image style={styles.sunrays} source={require('../assets/sunrays.png')} />
                   <Image  style={styles.logo} source={require('../assets/logo.png')} />

                </View>
                <View style={{flexDirection:'row',alignSelf:'center',marginTop:70}}>
                   <Image style={styles.wing} source={require('../assets/left_wing.png')} />
                   <Text>
                     Congrats
                   </Text>
                   <Image style={styles.wing} source={require('../assets/right_wing.png')} />
                </View>

                <Text style={{flexWrap:'wrap',alignSelf:'center'}}>
                     {rneMessage}
                </Text>
                <Button
                  title="Ok"
                  onPress={() => setVisibleCongs(!visibleCongs)}
                />
              </Overlay>

          </View>) }

          {/* Overlay for read message */}
          <Overlay ModalComponent={Modal} fullScreen={false}
              isVisible={visibleRead}
              onBackdropPress={toggleReadOverlay} overlayStyle={{width:windowWidth,height:windowHeight*0.5}}>
                <View style={{backgroundColor:'#D8A623',height:70}}>

                </View>
                <Image  style={styles.logo2} source={require('../assets/logo.png')} />
                <Text style={{alignSelf:'center',marginTop:20}}>
                    STATUS
                </Text>
                <Text style={{alignSelf:'center',flexWrap:'wrap',marginTop:10}}>
                  {rneMessage}</Text>
                <Button
                  title="OKAY"
                  color="#D8A623"
                  onPress={() => {
                    setVisibleRead(!visibleRead);
                  }}
                />
          </Overlay>

          {subscribed==='inactive' ? (
            <Overlay ModalComponent={Modal} fullScreen={false}
              isVisible={visibleCongs}
              onBackdropPress={toggleReadingOverlay} overlayStyle={{width:windowWidth,height:windowHeight,padding:30}}>

                <View style={{alignSelf:'center'}}>
                   <Image style={styles.sunrays} source={require('../assets/sunrays.png')} />
                   <Image  style={styles.logo} source={require('../assets/logo.png')} />

                </View>
                <View style={{flexDirection:'row',alignSelf:'center',marginTop:70}}>
                   <Image style={styles.wing} source={require('../assets/left_wing.png')} />
                   <Text style={{color:'#D8A623'}}>
                     Upgrade
                   </Text>
                   <Image style={styles.wing} source={require('../assets/right_wing.png')} />
                </View>

                <Text style={{alignSelf:'center'}}>
                    To unlock the full bible, enjoy the Further
                </Text>
                <Text style={{alignSelf:'center'}}>Study and Daily Bible Reading, Upgrade to a</Text>
                <Text style={{alignSelf:'center'}}>Premium Plan.</Text>
                <Button
                  title="Subscribe Now"
                  color="#D8A623"
                  onPress={() => {
                    navigation.navigate('Subscription');
                    setVisibleCongs(!visibleCongs);
                  }}
                />
              </Overlay>)
         : null}

      </View>
    );
  };


return (

  <>
    <View style={styles.container} >
      <FlatList data={devotional} renderItem={renderDevotional} />
    </View>

  </>
);
};

const webViewStyle = StyleSheet.create({
  p: {
    fontSize: 16,
    fontFamily : 'Roboto',
    lineHeight:22,
    fontWeight :'300',
    paddingLeft:10,
    paddingRight :10,
    color : '#000000'
  },
  a: {
    textDecorationLine: 'underline',
    color: '#007cc0'
  }
});

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#ffffff',
},

fixToText: {
  flexDirection: 'row',
  marginTop:5,
  justifyContent: 'space-between',
},
verses: {
  textDecorationLine: 'underline',
  justifyContent: 'center',
  color:'#007cc0',
  alignSelf:'center',
  fontFamily : 'Roboto',
  fontSize:15,
  lineHeight:22,
  paddingLeft:20,
  paddingRight :20,
  paddingTop :10 ,
  fontWeight :'300'
},
excerpt: {
  fontFamily : 'Roboto',
  fontSize:16,
  lineHeight:22,
  paddingLeft:20,
  paddingRight :20,
  paddingTop :10 ,
  fontWeight :'300',
  color : '#000000'
},
heading: {
  alignItems:'center',
  fontFamily: 'roboto',
  marginTop: 10,
  marginBottom:10,
  alignSelf:'center',
  flex: 1,
  flexDirection:'column',
  justifyContent: 'center',
  flexWrap: 'wrap',
  fontSize:20,
  fontWeight : '700',
  color :'#52565e'
},
contentView: {
  flex: 1,
  flexDirection:'row',
  alignItems:'center',
  alignSelf:'center',
  // justifyContent: 'space-between',
  justifyContent: 'center',
  marginVertical: 15,
  padding:5,
  alignContent:"center"


},
roundButton: {
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10,
  marginEnd:5,
  borderRadius: 20,
  backgroundColor: '#D8D9DA',
},
confess: {
  fontFamily : 'Roboto',
  fontSize:15,
  lineHeight:22,
  paddingLeft:20,
  paddingRight :20,
  paddingTop :10 ,
  fontWeight :'300'
},
centeredView: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 22
},
modalView: {
  margin: 20,
  backgroundColor: 'white',
  borderRadius: 10,
  padding: 35,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},
sunrays:{
  width:150,
  height:150
},
logo:{
  width:50,
  height:50,
  alignSelf:'center',
  marginTop:-100
},
logo2:{
  width:50,
  height:50,
  marginTop:-60,
  alignSelf:'center'
}

});

export default DailyDevotional;