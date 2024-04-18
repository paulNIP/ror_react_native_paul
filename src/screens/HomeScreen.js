import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TurboModuleRegistry
} from 'react-native';
import WordOfMonth from '../components/WordOfMonth';
import DailyDevotional from '../components/DailyDevotional';
import PremiumNotification from '../components/PremiumNotification';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AdsSlider from '../components/AdsSlider';
import LatestBooks from '../components/LatestBooks';
import RhapsodyTV from '../components/RhapsodyTV';
import {Divider} from '@rneui/themed';
import {Button} from '@rneui/themed';
import LiveTV from '../components/LiveTV';
import RecentArticles from '../components/RecentArticles';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Import ActionButton
import ActionButton from 'react-native-action-button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Overlay} from '@rneui/themed';
import {Dimensions, Image, Animated, Easing} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { getProfile } from '../service/authService';

const THEME_COLOR = '##D8A623';
const windowHeight = Dimensions.get('window').height * 0.6;
const windowWidth = Dimensions.get('window').width * 0.8;

const HomeScreen = () => {
  const navigation = useNavigation();

  const [visibleCongs, setVisibleCongs] = useState(false);
  const [theme, setTheme] = useState(false);
  const [note, setNotes] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const toggleReadingOverlay = () => {
    setVisibleCongs(!visibleCongs);
  };

  const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));

  Animated.timing(rotateAnimation, {
    toValue: 1,
    duration: 800,
  }).start(() => {
    rotateAnimation.setValue(0);
  });


  const interpolateRotating = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '720deg'],
  });

  const animatedStyle = {
    transform: [
      {
        rotate: interpolateRotating,
      },
    ],
    width: 150,
    height: 150,
  };

  useEffect(() => {
    async function setExpiry() {
      const expiryData = await AsyncStorage.getItem('expiry_date');
      console.log('expiry Date ', expiryData);

      if (expiryData == null) {
        setVisibleCongs(true);
      } else {
        setVisibleCongs(false);
      }

      const mail =await AsyncStorage.getItem('email');
      if(mail){

        const status= await getProfile(mail);
        if(status.subscription.status!=='expired' || status.subscription.status!==undefined){
          setSubscribed(true);

        }

      }
    }
    setExpiry();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={THEME_COLOR} />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={{
          backgroundColor : '#ffffff'
        }}>
          <DailyDevotional />
          <PremiumNotification />
          <RecentArticles />

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              marginTop: 15,
              alignContent: 'space-between',
              marginBottom: 20,
            }}>
            <Divider orientation="vertical" width={5} />

          </View>
          <LiveTV />
          <AdsSlider />

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              marginTop: 40,
              marginBottom: 15,
              alignContent: 'space-between',
            }}>
            <Divider orientation="vertical" width={2}  />

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{marginBottom: 15, alignItems: 'flex-start'}}>
                <Text style={styles.sectionTitle}>
                  LATEST BOOKS
                </Text>
                <Text style={styles.sectionSubTitle}>
                  Books by Pastor Chris Oyakhilome
                </Text>
              </View>
              <View style={{marginBottom: 15, alignItems: 'flex-end'}}>
                <Button
                  title="VIEW ALL"
                  type="outline"
                  color="warning"
                  onPress={() => {
                    navigation.navigate('LatestBooks');
                  }}
                  titleStyle={styles.sectionViewAllButton}
                />
              </View>
            </View>
          </View>

          <LatestBooks />

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              marginTop: 40,
              marginBottom: 15,
              alignContent: 'space-between',
            }}>
            <Divider orientation="vertical" width={2} />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{marginBottom: 15, alignItems: 'flex-start'}}>
                <Text style={styles.sectionTitle}>
                  RHAPSODY TV
                </Text>
                <Text style={styles.sectionSubTitle}>
                  Real Impact, Real Stories
                </Text>
              </View>
              <View style={{marginBottom: 15, alignItems: 'flex-end'}}>
                <Button
                  title="VIEW ALL"
                  type="outline"
                  color="warning"
                  onPress={() => {
                    navigation.navigate('Rhapsody TV');
                  }}
                  titleStyle={styles.sectionViewAllButton}
                />
              </View>
            </View>
          </View>

          <RhapsodyTV />

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              marginTop: 40,
              marginBottom: 15,
              alignContent: 'space-between',
            }}>
            <Divider orientation="vertical" width={2} />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{marginBottom: 15, alignItems: 'flex-start'}}>
                <Text style={styles.sectionTitle}>
                  RHAPSODY NEWS
                </Text>
                <Text style={styles.sectionSubTitle}>
                  Your latest news from Rhapsody of Realities
                </Text>
              </View>
              <View style={{marginBottom: 15, alignItems: 'flex-end'}}>
                {/* <Button title="VIEW ALL" type="outline" /> */}
              </View>
            </View>
          </View>
          <WordOfMonth />

          <ActionButton buttonColor="#D8A623">
            {/*Inner options of the action button*/}
            {/*Icons here
             https://infinitered.github.io/ionicons-version-3-search/
           */}
            <ActionButton.Item
              buttonColor="#D8A623"
              title="Change Theme"
              onPress={() => {
                if(!subscribed){
                  alert('Change Theme');

                }else{
                  setTheme(true);
                }
                
              
              }}>
              <MaterialCommunityIcons
                style={{alignSelf: 'center'}}
                name="format-paint"
                size={30}
                color="white"
              />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#D8A623"
              title="Notes"
              onPress={() => {
                if(!subscribed){
                  navigation.navigate('Your Notes');

                }else{
                  setNotes(true);
                }
                

              }
              }>
              <MaterialCommunityIcons
                style={{alignSelf: 'center'}}
                name="lead-pencil"
                size={30}
                color="white"
              />
            </ActionButton.Item>
          </ActionButton>

          <Overlay
            ModalComponent={Modal}
            fullScreen={false}
            isVisible={visibleCongs}
            onBackdropPress={toggleReadingOverlay}
            overlayStyle={{
              width: windowWidth,
              height: windowHeight,
              padding: 30,
            }}>
            <View style={{alignSelf: 'center'}}>
              <Animated.Image
                style={animatedStyle}
                source={require('../assets/sunrays.png')}
              />
              <Image
                style={styles.logo}
                source={require('../assets/logo.png')}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop: 70,
              }}>
              <Image
                style={styles.wing}
                source={require('../assets/left_wing.png')}
              />
              <Text style={{color: '#D8A623'}}>Upgrade</Text>
              <Image
                style={styles.wing}
                source={require('../assets/right_wing.png')}
              />
            </View>

            <Text style={{alignSelf: 'center',flexWrap:"wrap"}}>
              Gain Exclusive access to life changing articles on various topics such as health finances, spiritual growth and faith. Plus Bible references, reading plans, extensive search
            </Text>

            <Text style={{alignSelf: 'center'}}>and lots more!{'\n'}</Text>
            <Button
              title="Subscribe Now"
              color="#D8A623"
              onPress={() => {
                navigation.navigate('Subscription');
                setVisibleCongs(!visibleCongs);
              }}
            />
          </Overlay>

          <Overlay
            ModalComponent={Modal}
            fullScreen={false}
            isVisible={note}
            onBackdropPress={toggleReadingOverlay}
            overlayStyle={{
              width: windowWidth,
              height: windowHeight*0.7,
              padding: 10,
            }}>
            <View style={{flexDirection:'row',marginTop:-45}}>
              <TouchableOpacity style={{marginLeft:"auto"}} onPress={()=>{setNotes(false);}}>
              <MaterialCommunityIcons
                name="close-circle-outline"
                size={25}
                color="white"
              />
              </TouchableOpacity>
            </View>
            <View style={{alignSelf: 'center'}}>
              <Animated.Image
                style={animatedStyle}
                source={require('../assets/sunrays.png')}
              />
              <Image
                style={styles.logo}
                source={require('../assets/logo.png')}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop: 70,
              }}>
              <Image
                style={styles.wing}
                source={require('../assets/left_wing.png')}
              />
              <Text style={{color: '#D8A623'}}>Upgrade</Text>
              <Image
                style={styles.wing}
                source={require('../assets/right_wing.png')}
              />
            </View>

            <Text style={{alignSelf: 'center',flexWrap:'wrap'}}>
              To write and save your notes synced and available anytime,upgrade to a Premium Plan
            </Text>

            <Button
              style={{marginTop:10}}
              title="Subscribe Now"
              color="#D8A623"
              onPress={() => {
                navigation.navigate('Subscription');
                setVisibleCongs(!visibleCongs);
              }}
            />
          </Overlay>

          <Overlay
            ModalComponent={Modal}
            fullScreen={false}
            isVisible={theme}
            onBackdropPress={toggleReadingOverlay}
            overlayStyle={{
              width: windowWidth,
              height: windowHeight*0.7,
              padding: 10,
            }}>
            <View style={{flexDirection:'row',marginTop:-45}}>
              <TouchableOpacity style={{marginLeft:"auto"}} onPress={()=>{setTheme(false)}}>
              <MaterialCommunityIcons
                name="close-circle-outline"
                size={25}
                color="white"
              />
              </TouchableOpacity>
            </View>
            <View style={{alignSelf: 'center'}}>
              <Animated.Image
                style={animatedStyle}
                source={require('../assets/sunrays.png')}
              />
              <Image
                style={styles.logo}
                source={require('../assets/logo.png')}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop: 70,
              }}>
              <Image
                style={styles.wing}
                source={require('../assets/left_wing.png')}
              />
              <Text style={{color: '#D8A623'}}>Upgrade</Text>
              <Image
                style={styles.wing}
                source={require('../assets/right_wing.png')}
              />
            </View>

            <Text style={{alignSelf: 'center',flexWrap:'wrap'}}>
              To be able to change the feel and look of your app.Upgrade to Premiun Plan by Subscribing
            </Text>

            <Button
              style={{marginTop:10}}
              title="Subscribe Now"
              color="#D8A623"
              onPress={() => {
                navigation.navigate('Subscription');
                setVisibleCongs(!visibleCongs);
              }}
            />
          </Overlay>




        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  scrollView: {
    marginHorizontal: 5,
  },
  vertical: {
    marginBottom: 5,
    marginHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
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
  sunrays: {
    width: 150,
    height: 150,
  },
  logo: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginTop: -100,
  },
  sectionTitle : {
    marginLeft: 10,
    fontWeight: '600',
    fontSize : 16,
    color :'#52565e'
  },
  sectionSubTitle : {
    marginLeft: 10,
    color: '#999999',
    fontWeight : '300',
    fontSize:13
  },
  sectionViewAllButton :{
    fontSize: 12
  }
});

export default HomeScreen;
