import { Image,View,TouchableOpacity,Text } from 'react-native';
import React from 'react';

import Onboarding from 'react-native-onboarding-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';




const completeOnboarding = async() =>{
    //Flip Onboarding
    await AsyncStorage.setItem('hasOnBoarded',JSON.stringify({hasOnboarded:true}))
    


}

const Done = ({...props}) => (
    <TouchableOpacity
    {...props} 
    >
    <Text style={{fontSize:16, marginHorizontal:20}}>Done</Text>
    </TouchableOpacity>
)

const Dots = ({selected}) => {
    let backgroundColor;
    backgroundColor = selected ? 'blue' : 'black'
    return (
    <View
    style={{
        width:24,
        height:6,
        marginHorizontal:3,
        backgroundColor
    }}
    />
    )
}

const OnboardingScreen = ({navigation}) => (
  <Onboarding
    onDone={()=>navigation.replace('Login')}
    DotComponent={Dots}
    onSkip={()=>navigation.replace('Login')}
    DoneButtonComponent={Done}
    pages={[
      {
        backgroundColor: '#fff',
        image: <Image source={require('../assets/welcome1_2.png')} />,
        title: 'Welcome to Rhapsody of Realities',
        subtitle: 'The life-changing truths in this edition will refresh, transform and prepare you for a very fulfilling, fruitful and rewarding experience with God’s Word.',
      },
      {
        backgroundColor: '#fe6e58',
        image: <Image source={require('../assets/welcome2_2.png')} />,
        title: 'Great New Features',
        subtitle: 'Enjoy over 18 New exciting features!',
      },
      {
        backgroundColor: '#999',
        image: <Image source={require('../assets/welcome3_3.png')} />,
        title: 'Rich Bookstore',
        subtitle: "Enjoy our bookstore with hundreds of books available!",
      },
      {
        backgroundColor: '#999',
        image: <Image source={require('../assets/welcome4_4.png')} />,
        title: 'Be more with Rhapsody Subscriptions',
        subtitle: "Enjoy Reading points, Timer, Wallet feature, Gift of subscription and lots more!",
      },
    ]}
  />
);

export default OnboardingScreen;

