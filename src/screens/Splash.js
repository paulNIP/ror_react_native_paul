import React from "react";
import {View, Text,Dimensions,StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';


const Splash = () => {
    const navigation = useNavigation();
    const background = require('../assets/vid.mp4');

  return (
       <View >
         <Video
            source={background}
            paused={false}
            style={styles.video}
            controls={false}
            resizeMode="cover"
            />
       </View>
  );
};

const styles = StyleSheet.create({
    video: {
      alignSelf: 'center',
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    }

  });

export default Splash;