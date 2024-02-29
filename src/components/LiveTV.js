import React , { useEffect, useState } from 'react';
import { View, StyleSheet, Button,Text ,FlatList,Image} from 'react-native';
import Video from 'react-native-video';
import { liveTvService } from '../service/liveTvService';
import {Dimensions} from 'react-native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LiveTV=()=> {

    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [vid, setVid] = useState([]);

    useEffect(() => {

      const fetchData = async () => {
          const data = await liveTvService()
          setVid(data)

      }
      fetchData();

    }, []);

    const renderLiveTvs = ({ item }) => {

      const video_url = item.url;;
      console.log(video_url);

      
      return (
      <View style={styles.container}>

      <Video
        source={{ uri: video_url }}
        paused={true}
        style={styles.video}
        controls={true}
        resizeMode="contain"
      />

      {/* <Image
            source={require('../assets/play_thumb.png')}
            style={{
              alignSelf:'center',
              height: 50,
              width: 50,
              marginTop:-windowHeight*0.16
            }}
            // resizeMode="contain"
      /> */}


        
        <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{marginBottom:15,alignItems:'flex-start'}}>
            <Text style={{marginLeft:10,fontWeight:'bold'}}>LIVE: RHAPSODY TV 24-HOURS{'\n'}LIVESTREAM</Text>
            <Text style={{marginLeft:10,color:'#999999'}}>SHOWING NOW</Text>
          </View>
          <View style={{marginBottom:15,alignItems:'flex-end',marginRight:10}}>
            {/* <Button
                title={status.isPlaying ? 'Pause' : 'Play'}
                color='#F9A825'
                onPress={() =>
                  status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                }
              /> */}
          </View>
        </View>
      </View>
      );
    };


    return (

      <>
      <View style={styles.container}>
        <FlatList data={vid} renderItem={renderLiveTvs} />
      </View>
      
    </>
      
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#D8D9DA',
  },
  video: {
    alignSelf: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height*0.23,
    marginTop:10,
    marginBottom:10
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LiveTV;