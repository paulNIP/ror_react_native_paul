import React, { useState,useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,ScrollView,ActivityIndicator,
  TouchableOpacity,FlatList
} from 'react-native';
import Colors from '../constants/Colors';
import Slider from 'react-native-slider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import PlayButton from '../components/PlayButton';
import { getAudioArticles, getPlaylist } from '../service/devotionalService';
import { ListItem } from '@rneui/themed';
import RNFS from 'react-native-fs';
import Spinner from 'react-native-loading-spinner-overlay';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


//import RNFetchBlob from 'rn-fetch-blob';

import {Platform, PermissionsAndroid} from 'react-native';

import {NativeModules} from 'react-native';
const RNFetchBlob = NativeModules.RNFetchBlob;

// let dirs = RNFetchBlob.fs.dirs.DocumentDir;
// const db = DatabaseConnection.getdevotionalsDB();



function AudioScreen() {

  const [isAlreadyPlay, setisAlreadyPlay] = useState(false);
  const [duration, setDuration] = useState('00:00:00');
  const [timeElapsed, setTimeElapsed] = useState('00:00:00');
  const [percent, setPercent] = useState(0);
  const [current_track, setCurrentTrack] = useState(0);
  const [inprogress, setInprogress] = useState(false);
  const [audioRecorderPlayer] = useState(new AudioRecorderPlayer());
  const [progress, setProgress] = useState(0);

  const [audioArray,setAudioArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [spinner, setSpinner] = useState(false);




/// grant permission in android
const getDownloadPermissionAndroid = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'File Download Permission',
        message: 'Your permission is required to save Files to your device',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) return true;
  } catch (err) {
    console.log('err', err);
  }
};

const downloadFile = async url => {
  // Get the app's cache directory
  const {config, fs} = RNFetchBlob;
  const cacheDir = fs.dirs.DownloadDir;

  // Generate a unique filename for the downloaded image
  let file =url.slice(27);
  // const filename = url.split('/').pop();
  const filePath = `${cacheDir}/${file}`;

  

  try {
    // Download the file and save it to the cache directory
    const configOptions = Platform.select({
      ios: {
        fileCache: true,
        path: filePath,
        appendExt: url.split('.').pop(),
      },
      android: {
        fileCache: true,
        path: filePath,
        appendExt: url.split('.').pop(),
        addAndroidDownloads: {
          // Related to the Android only
          useDownloadManager: true,
          notification: true,
          path: filePath,
          description: 'File',
        },
      },
    });

    const response = await RNFetchBlob.config(configOptions).fetch('GET', url);

    // Return the path to the downloaded file
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};


// end of download function

  useEffect(() => {

  
    const fetchData = async () => {
        const files= await getPlaylist();
    
        let month = new Date().getMonth() + 1;

        for (let i = month; i >0; i--) {
          if(String(i).length===1){

            const data = await getAudioArticles(String(i).padStart(2, "0"));
            for(let j = 0; j < data.length; j++) {
              let obj = data[j];
              // Insert data into local DB if Doesnot Exist
              setAudioArray(current => [...current, obj]);
              
            }

          }else{
            const data = await getAudioArticles(month);
            // Insert data into local DB  if Doesnot Exist
            for(let j = 0; j < data.length; j++) {
              let obj = data[j];
              setAudioArray(current => [...current, obj]);

            }
          }
        }

    }
    fetchData();
    setIsLoading(false);
    

  }, []);


  const changeTime = async (seconds) => {
    // 50 / duration
    let seektime = (seconds / 100) * duration;
    setTimeElapsed(seektime);
    audioRecorderPlayer.seekToPlayer(seektime);
  };

  const onStartPress = async (e) => {
    let fileurl =audioArray[current_track].url;


    const {config, fs} = RNFetchBlob;
    const cacheDir = fs.dirs.DownloadDir;
    
    // Generate a unique filename for the downloaded image
    let file =fileurl.slice(27);
    // const filename = url.split('/').pop();
    const filePath = `${cacheDir}/${file}`;

    //check if file exists
    if (await RNFS.exists(filePath)){
        //play directly
        //play the music file 
      setisAlreadyPlay(true);
      setInprogress(true);


      audioRecorderPlayer.startPlayer(filePath);
      audioRecorderPlayer.setVolume(1.0);

      audioRecorderPlayer.addPlayBackListener(async (e) => {
        if (e.current_position === e.duration) {
          audioRecorderPlayer.stopPlayer();
        }
        let percent = Math.round(
          (Math.floor(e.current_position) / Math.floor(e.duration)) * 100,
        );
        setTimeElapsed(e.current_position);
        setPercent(percent);
        setDuration(e.duration);
      });
    } else {
        // Download before playing
        setSpinner(true);
    downloadFile(fileurl).then(res => {
      setSpinner(false);
      console.log("Downloaded file Audio Path",res.path());
      
      // RNFetchBlob.ios.previewDocument(res.path());
      //play the music file 
      setisAlreadyPlay(true);
      setInprogress(true);


      audioRecorderPlayer.startPlayer(res.path());
      audioRecorderPlayer.setVolume(1.0);

      audioRecorderPlayer.addPlayBackListener(async (e) => {
        if (e.current_position === e.duration) {
          audioRecorderPlayer.stopPlayer();
        }
        let percent = Math.round(
          (Math.floor(e.current_position) / Math.floor(e.duration)) * 100,
        );
        setTimeElapsed(e.current_position);
        setPercent(percent);
        setDuration(e.duration);
      });
    });
    }

    

  };


  const onStartPlay = async (fileurl) => {

    //get index of value
    const index = audioArray.findIndex(object => {
      return object.url === fileurl;
    });
    
    //set to display currently selected
    setCurrentTrack(index);
    setSpinner(true);
    downloadFile(fileurl).then(res => {
      setSpinner(false);
      console.log("Downloaded file Audio Path",res.path());
      // RNFetchBlob.ios.previewDocument(res.path());
      //play the music file 
      setisAlreadyPlay(true);
      setInprogress(true);
      audioRecorderPlayer.startPlayer(res.path());
      audioRecorderPlayer.setVolume(1.0);

      audioRecorderPlayer.addPlayBackListener(async (e) => {
        if (e.current_position === e.duration) {
          audioRecorderPlayer.stopPlayer();
        }
        let percent = Math.round(
          (Math.floor(e.current_position) / Math.floor(e.duration)) * 100,
        );
        setTimeElapsed(e.current_position);
        setPercent(percent);
        setDuration(e.duration);
      });
    });
    
  };

  const onPausePress = async (e) => {
    setisAlreadyPlay(false);
    audioRecorderPlayer.pausePlayer();
  };

  const onStopPress = async (e) => {
    await audioRecorderPlayer.stopPlayer();
    await audioRecorderPlayer.removePlayBackListener();
  };

  const onForward = async () => {
    let curr_track = audioArray[current_track];
    let current_index = audioArray.indexOf(curr_track) + 1;
    if (current_index === audioArray.length) {
      setCurrentTrack(1);
    } else {
      setCurrentTrack((current_track) => current_track + 1);
    }
    onStopPress().then(async () => {
      await onStartPress();
    });
  };

  const onBackward = async () => {
    let curr_track = audioArray[current_track];

    let current_index = audioArray.indexOf(curr_track);

    if (current_index === 0) {
      setCurrentTrack(audioArray.length);
    } else {
      setCurrentTrack((current_track) => current_track - 1);
    }
    onStopPress().then(async () => {
      await onStartPress();
    });
  };



  return (
    <SafeAreaView >
      <ScrollView >
          {isLoading ? 
          (null ): (
            

        <View style={{backgroundColor:"#D8A623",borderBottomStartRadius:80,borderBottomEndRadius:80}}>
          <Spinner
            visible={spinner}
            textContent={'Loading...'}
            textStyle={{color: '#FFF'}}
          />

        <View style={{ alignItems: 'center' }}>
          <View style={styles.coverContainer}>
            {audioArray.length!=0?(
              <Image
              source={{
                uri: audioArray[current_track].photo_link,
              }}
              style={styles.cover}
              />  
              ):(null)}
          </View>

          <View style={styles.trackname}>
          {audioArray.length!=0?(
            <View>
              <Text style={{ color:'#FFFFFF', fontWeight: 'bold',alignSelf:'center' }}>
                {audioArray[current_track].title}
              </Text>
              <Text style={{ color:'#FFFFFF',alignSelf:'center'}}>
                {audioArray[current_track].formated_date}
              </Text>
            </View>
            ):(null)}
          </View>
        </View>
        <View style={styles.seekbar}>
          <Slider
            minimumValue={0}
            maximumValue={100}
            trackStyle={styles.track}
            thumbStyle={styles.thumb}
            value={percent}
            minimumTrackTintColor="#93A8B3"
            onValueChange={(seconds) => changeTime(seconds)}
          />
          <View style={styles.inprogress}>
            <Text style={[styles.textLight, styles.timeStamp]}>
              {!inprogress
                ? timeElapsed
                : audioRecorderPlayer.mmssss(Math.floor(timeElapsed))}
            </Text>
            <Text style={[styles.textLight, styles.timeStamp]}>
              {!inprogress
                ? duration
                : audioRecorderPlayer.mmssss(Math.floor(duration))}
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => onBackward()}>
            {/* <FontAwesome name="backward" size={32} color="#93A8B3" /> */}
            <MaterialCommunityIcons  name='skip-previous' size={35} color='#FFFFFF' />
          </TouchableOpacity>
          {!isAlreadyPlay ? (
            <PlayButton function={() => onStartPress()} state="play" />
          ) : (
            <PlayButton function={() => onPausePress()} state="pause" />
          )}
          <TouchableOpacity onPress={() => onForward()}>
            {/* <FontAwesome name="forward" size={32} color="#93A8B3" /> */}
            <MaterialCommunityIcons  name='skip-next' size={35} color='#FFFFFF' />
          </TouchableOpacity>
        </View>

        </View>
        
        )
        
        }



        {
              audioArray.map((l, i) => {
                let url=l.url;
                return (
                <TouchableOpacity onPress={()=>{
                  onStartPlay(url);
                 }}>
                <ListItem key={i} bottomDivider>
                   <Image
                     style={styles.image}
                     source={{uri: l.photo_link}} 
                     resizeMode={"cover"} // <- needs to be "cover" for borderRadius to take effect on Android
                   />
                   <ListItem.Content>
                     <ListItem.Title>{l.title}</ListItem.Title>
                    
                     <Text style={{color:'#606060'}}>{l.formated_date}</Text>
                   </ListItem.Content>
                </ListItem>
                </TouchableOpacity>
                )
              })
         } 

        {loading &&
            <View style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text>Downloading audio</Text>
              <ActivityIndicator size='large' />
            </View>
        }

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAEC',
  },
  textLight: {
    color: '#B6B7BF',
  },
  text: {
    color: '#8E97A6',
  },
  titleContainer: { alignItems: 'center', marginTop: 24 },
  textDark: {
    color: '#3D425C',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:5,
    marginBottom:5
  },
  coverContainer: {
    marginTop: 32,
    width: 120,
    height: 120,
    shadowColor: '#5D3F6A',
    shadowOffset: { height: 15 },
    shadowRadius: 8,
    shadowOpacity: 0.3,
  },
  cover: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  track: {
    height: 2,
    borderRadius: 1,
    backgroundColor: '#FFF',
  },
  thumb: {
    width: 8,
    height: 8,
    backgroundColor: '#3D425C',
  },
  timeStamp: {
    fontSize: 11,
    fontWeight: '500',
  },
  seekbar: { margin: 30 },
  inprogress: {
    marginTop: -12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trackname: { alignItems: 'center', marginTop: 15 },



  user: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 15
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },

  spinnerTextStyle: {
    color: '#FFF',
    justifyContent:'center'
  },

});





export default AudioScreen;