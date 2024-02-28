import React , { useEffect, useState,useRef,useCallback } from 'react';
import { View,Modal, StyleSheet,Text,Pressable,TouchableOpacity, FlatList,Button, Image,Vibration,Alert } from 'react-native';
import Strings from '../constants/Strings';
import { getDailyDevotional } from '../service/devotionalService';
import AccountChips from './AccountChips';
import HTMLView from 'react-native-htmlview';
import DailyQuiz from './DailyQuiz';
import {Overlay } from '@rneui/themed';
import { WebView } from 'react-native-webview';

import { Divider } from '@rneui/themed';
import {Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CountDownTimer from 'react-native-countdown-timer-hooks';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getProfile, getWallet } from '../service/authService';
import AsyncStorage from "@react-native-async-storage/async-storage";


const windowHeight = Dimensions.get('window').height*0.6;
const windowWidth = Dimensions.get('window').width*0.8;



const DailyDevotional = () => {


  const [visible, setVisible] = useState(false);
  const [shouldShow, setShouldShow] = useState(true);
  const [visibleCongs, setVisibleCongs] = useState(false);

  const [status, setStatus] = useState();
  const [points, setPoints] = useState();
  const [loggedIn, setLoggedIn] = React.useState(null);
  const [subscribed, setSubscribed] = React.useState(null);
  
  const initialMinutes = 5; // Initial minutes
  const initialSeconds = 0; // Initial seconds
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

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



  React.useEffect(() => {
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
          const email= await AsyncStorage.getItem('email');
          if(email==null){

          }else{
            const data = await getProfile(email);
            setStatus(data.subscription.status);
            console.log("Profile data 0025",status);

          }

      }
      fetchData();

    }, []);

    

    useEffect(() => {
  
        const fetchData = async () => {
            const email= await AsyncStorage.getItem('email');
            if(email==null){
              setPoints('-');

            }else{
              const data = await getWallet(email);
              setPoints(data.reading_points);

            }
            
  
        }
        fetchData();
  
      }, []);

    useEffect(() => {
      let interval;
  
      if (isActive && (minutes > 0 || seconds > 0)) {
        interval = setInterval(() => {
          if (seconds === 0) {
            if (minutes === 0) {
              Vibration.vibrate(10 * ONE_SECOND_IN_MS);
              toggleReadingOverlay();
              setIsActive(false);
              setIsCompleted(true);
              //display completed message
              clearInterval(interval);
            } else {
              setMinutes((prevMinutes) => prevMinutes - 1);
              setSeconds(59);
            }
          } else {
            setSeconds((prevSeconds) => prevSeconds - 1);
          }
        }, 1000);
      }
  
      return () => {
        clearInterval(interval);
      };
    }, [isActive, minutes, seconds]);


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




  const [devotional, setDevotional] = useState([]);

  useEffect(() => {

      const fetchData = async () => {
          const data = await getDailyDevotional()
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

  const readMore = async () => {

    const email= await AsyncStorage.getItem('email');
    if(email==null){
      Alert.alert(
        'Warning',
        'Please login to access premium content',
        [
          {
            text: 'Ok'
          },
        ],
        { cancelable: false }
      );

    }else{
      const data = await getProfile(email);
      if(data.subscription.status==='active'){
        setShouldShow(!shouldShow);
        startTimer();
        setTimerEnd(false);
        refTimer.current.resetTimer();

      }else{
        navigation.navigate('Subscription');
      }

    }


  }


  const renderDevotional = ({ item }) => {

    const img = item.image;
    const body = item.body;

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
        
        <AccountChips style={{marginTop:10}}/>
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
                      isActive ?(<Text>
                        {minutes.toString().padStart(2, '0')}:
                        {seconds.toString().padStart(2, '0')}
                      </Text>):(
                        <Text>
                        00:00
                      </Text>
                      )
                    }

                  {(isCompleted && !isActive) ?(
                    <TouchableOpacity>
                      <Text style={{ fontSize: 14, color: '#008000' }}>
                        Completed
                        </Text>
                    </TouchableOpacity>

                  ):(null)}
                
                
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
          <Divider style={{width:100,color:'#DAA520', alignSelf:'center'}} color='red' width={2}/>
          <Text style={styles.excerpt}>{item.excerpt}</Text>
          <View style={styles.fixToText}>
             <TouchableOpacity style={{backgroundColor:"red",height:40,borderRadius:5}} onPress={readMore}>
               <Text style={{color:"#FFFFFF", fontWeight:'bold',alignSelf:'center',padding:10}} >Read more</Text>
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
            <Text style={styles.confess}>{item.confess}</Text>
            <Text style={styles.heading}>{Strings.furtherStudy}</Text>
            <Pressable onPress={()=>toggleOverlay(study)} >
              <Text style={styles.verses} >{item.study}</Text>
            </Pressable>

            <Text style={styles.heading}>{Strings.oneyrBibleReadingPlan}</Text>
            <Pressable onPress={()=>toggleOverlay(BA)}  >
              <Text style={styles.verses}>{item.BA}</Text>
            </Pressable>

            <Text style={styles.heading}>{Strings.secondyrBibleReadingPlan}</Text>
            <Pressable onPress={()=>toggleOverlay(BB)}>
              <Text style={styles.verses}>{item.BB}</Text>
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

              {/* <Overlay ModalComponent={Modal} fullScreen={false}
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
                     Congratulations you have recieved 1 point(s) for reading the day's article
                </Text>
                <Text style={{flexWrap:'wrap',alignSelf:'center'}}>
                     Answer the Question and get 1 extra bonus point.
                </Text>
                <Button
                  title="Ok"
                  onPress={() => setVisibleCongs(!visibleCongs)}
                />
              </Overlay> */}

          </View>) }

          {subscribed==='inactive' ? (<Overlay ModalComponent={Modal} fullScreen={false}
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
  p: { fontSize:16 } ,
  a:{
    textDecorationLine:'underline',
  color:'#007cc0'}
});

const styles = StyleSheet.create({
container: {
  flex: 1,
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
  fontFamily: 'robo-med',
  fontSize:18
},
excerpt: {
  fontFamily: 'robo-regular',
  fontSize:16
},
heading: {
  alignItems:'center',
  fontFamily: 'robo-bold',
  marginTop: 10,
  marginBottom:10,
  alignSelf:'center',
  flex: 1,
  flexDirection:'column',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  fontSize:20
},
confess: {
  fontFamily: 'robo-regular',
  fontSize:16
},
centeredView: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 22,
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
}

});

export default DailyDevotional;