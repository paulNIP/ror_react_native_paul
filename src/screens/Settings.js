import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,View,
  StatusBar,Share,Alert
} from 'react-native';
import Rate, { AndroidMarket } from 'react-native-rate'


import { ListItem } from '@rneui/themed';


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


const Settings = ({navigation}) => {

  const [rated, setRated] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
            <View>
            <ListItem onPress={()=>{navigation.navigate('AboutUs')}}>
                <ListItem.Content>
                <ListItem.Title>About Us</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            <ListItem onPress={()=>{navigation.navigate('PrivacyPolicy')}}>
                <ListItem.Content>
                <ListItem.Title>Privacy policy</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>

            <ListItem onPress={onShare}>
                <ListItem.Content>
                <ListItem.Title>Share App</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>

            <ListItem onPress={()=>{
                 const options = {
                    AppleAppID:"463739646",
                    GooglePackageName:"com.rhapsodyreader",
                    AmazonPackageName:"com.rhapsodyreader",
                    OtherAndroidURL:"http://www.randomappstore.com/app/47172391",
                    preferredAndroidMarket: AndroidMarket.Google,
                    preferInApp:false,
                    openAppStoreIfInAppFails:true,
                    fallbackPlatformURL:"https://play.google.com/store/apps/details?id=com.rhapsodyreader&hl=en&gl=US",
                }
                Rate.rate(options, (success, errorMessage)=>{
                    if (success) {
                    // this technically only tells us if the user successfully 
                    //went to the Review Page. Whether they actually did anything, we do not know.
                    setRated(true);
                    
                    }
                    if (errorMessage) {
                    // errorMessage comes from the native code. Useful for debugging, but probably not for users to view
                      console.error(`Example page Rate.rate() error: ${errorMessage}`)
                       Alert.alert(errorMessage);
                    }
                });
            }}> 
                <ListItem.Content>
                <ListItem.Title>Rate App</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 10,
  },
});

export default Settings;