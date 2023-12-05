import React , { useEffect, useState } from 'react';
import { View, StyleSheet, Button,Text ,FlatList} from 'react-native';
import Video from 'react-native-video';
import { liveTvService } from '../service/liveTvService';
import {Dimensions} from 'react-native';


const windowWidth = Dimensions.get('window').width;

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
        {/* <Video
          ref={video}
          style={styles.video}
          source={{
            uri: video_url,
          }}
          useNativeControls
          resizeMode={ResizeMode.COVER}
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        /> */}

        {/* <VideoPlayer
          video={{uri: 'https://example.com/video.mp4'}}
          videoWidth={1600}
          videoHeight={900}
          autoplay={true}
          defaultMuted={false}
          loop={false}
        /> */}

        <Video  
            source={{url: video_url}}                  // the video file
            paused={true}                  // make it start    
            style={styles.video}  // any style you want
            repeat={false}             // make it a loop
        />

        
        <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{marginBottom:15,alignItems:'flex-start'}}>
            <Text style={{marginLeft:10,fontWeight:'bold'}}>LIVE: RHAPSODY TV 24-HOURS{'\n'}LIVESTREAM</Text>
            <Text style={{marginLeft:10,color:'#999999'}}>SHOWING NOW</Text>
          </View>
          <View style={{marginBottom:15,alignItems:'flex-end',marginRight:10}}>
            <Button
                title={status.isPlaying ? 'Pause' : 'Play'}
                color='#F9A825'
                onPress={() =>
                  status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                }
              />
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
    height: 200,
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