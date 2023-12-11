import React, { useState,useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,ScrollView,
  TouchableOpacity,
} from 'react-native';
import Colors from '../constants/Colors';
import Slider from 'react-native-slider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';
import PlayButton from '../components/PlayButton';
import { getAudioArticles } from '../service/devotionalService';
import { DatabaseConnection } from '../database/database-connection';


let dirs = RNFetchBlob.fs.dirs.DocumentDir;
const db = DatabaseConnection.getdevotionalsDB();

const playlist = [
  {
    title: 'Emergence of Talents',
    path: 'track1.mp3',
    cover:
      'https://images.unsplash.com/photo-1515552726023-7125c8d07fb3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80',
  },
  {
    title: 'Shippuden',
    path: 'track2.mp3',
    cover:
      'https://images.unsplash.com/photo-1542359649-31e03cd4d909?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80',
  },
  {
    title: 'Rising Dragon',
    path: 'track3.mp3',
    cover:
      'https://images.unsplash.com/photo-1512036666432-2181c1f26420?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
  },
  {
    title: 'Risking it all',
    path: 'track4.mp3',
    cover:
      'https://images.unsplash.com/photo-1501761095094-94d36f57edbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=401&q=80',
  },
  {
    title: 'Gekiha',
    path: 'track5.mp3',
    cover:
      'https://images.unsplash.com/photo-1471400974796-1c823d00a96f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
  },
];


function AudioScreen() {

  const [isAlreadyPlay, setisAlreadyPlay] = useState(false);
  const [duration, setDuration] = useState('00:00:00');
  const [timeElapsed, setTimeElapsed] = useState('00:00:00');
  const [percent, setPercent] = useState(0);
  const [current_track, setCurrentTrack] = useState(0);
  const [inprogress, setInprogress] = useState(false);
  const [audioRecorderPlayer] = useState(new AudioRecorderPlayer());
  const [audioArray,setAudioArray] = useState([]);

  useEffect(() => {
  
    const fetchData = async () => {
        let month = new Date().getMonth() + 1;

        for (let i = month; i >0; i--) {
          if(String(i).length===1){
            //console.log("Month Digits",String(i).padStart(2, "0"));// results in "04"
            const data = await getAudioArticles(String(i).padStart(2, "0"));
            // Insert data into local DB if Doesnot Exist

            for(let j = 0; j < data.length; j++) {
              let obj = data[j];

              db.transaction((tx) => {
                tx.executeSql('SELECT * FROM audio_devotionals where formated_date=?', [obj.formated_date], (tx, results) => {

                    if(results.rows.length>0){
                      //Dont insert into DB

                    }else{
                      //insert into db
                      //insert into Database
                      let sql = "INSERT INTO audio_devotionals (date,formated_date,url,audio_id,title,photo_link) VALUES (?, ?,?,?,?,?)";
                      let params = [obj.date,obj.formated_date,obj.url,obj.audio_id,obj.title,obj.photo_link]; //storing user data in an array
                      db.executeSql(sql, params, (result) => {
                          // console.log("Success Audio created successfully.");
                      }, (error) => {
                          // console.log("Create user error", error);
                      });
                    }
                });
            });
              
            }

            


          }else{
            const data = await getAudioArticles(month);
            // Insert data into local DB  if Doesnot Exist
            for(let j = 0; j < data.length; j++) {
              let obj = data[j];

              db.transaction((tx) => {
                tx.executeSql('SELECT * FROM audio_devotionals where formated_date=?', [obj.formated_date], (tx, results) => {

                    if(results.rows.length>0){
                      //Dont insert into DB

                    }else{
                      //insert into db
                      //insert into Database
                      let sql = "INSERT INTO audio_devotionals (date,formated_date,url,audio_id,title,photo_link) VALUES (?, ?,?,?,?,?)";
                      let params = [obj.date,obj.formated_date,obj.url,obj.audio_id,obj.title,obj.photo_link]; //storing user data in an array
                      db.executeSql(sql, params, (result) => {
                          console.log("Success Audio created successfully.");
                      }, (error) => {
                          console.log("Create user error", error);
                      });
                    }
                });
            });
            }


          }
        }

    }

    const loadData = async () => {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM audio_devotionals', [], (tx, results) => {

          for (let i = 0; i < results.rows.length; ++i) {
            // console.log("DB Results",results.rows.item(i));
            audioArray.push(results.rows.item(i));
          }
        });
      });

    }
    fetchData();
    loadData();

  }, []);

  console.log("DB COMPANY DATA",audioArray);

  const changeTime = async (seconds) => {
    // 50 / duration
    let seektime = (seconds / 100) * duration;
    setTimeElapsed(seektime);
    audioRecorderPlayer.seekToPlayer(seektime);
  };

  const onStartPress = async (e) => {
    setisAlreadyPlay(true);
    setInprogress(true);
    const path = 'file://' + dirs + '/' + playlist[current_track].path;
    audioRecorderPlayer.startPlayer(path);
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
    let curr_track = playlist[current_track];
    let current_index = playlist.indexOf(curr_track) + 1;
    if (current_index === playlist.length) {
      setCurrentTrack(1);
    } else {
      setCurrentTrack((current_track) => current_track + 1);
    }
    onStopPress().then(async () => {
      await onStartPress();
    });
  };

  const onBackward = async () => {
    let curr_track = playlist[current_track];

    let current_index = playlist.indexOf(curr_track);

    if (current_index === 0) {
      setCurrentTrack(5);
    } else {
      setCurrentTrack((current_track) => current_track - 1);
    }
    onStopPress().then(async () => {
      await onStartPress();
    });
  };

  return (
    <SafeAreaView >
      <ScrollView>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.coverContainer}>
            <Image
              source={{
                uri: playlist[current_track].cover,
              }}
              style={styles.cover}
            />
          </View>

          <View style={styles.trackname}>
            <Text style={[styles.textDark, { fontSize: 20, fontWeight: '500' }]}>
              {playlist[current_track].title}
            </Text>
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
            <FontAwesome name="backward" size={32} color="#93A8B3" />
          </TouchableOpacity>
          {!isAlreadyPlay ? (
            <PlayButton function={() => onStartPress()} state="play" />
          ) : (
            <PlayButton function={() => onPausePress()} state="pause" />
          )}
          <TouchableOpacity onPress={() => onForward()}>
            <FontAwesome name="forward" size={32} color="#93A8B3" />
          </TouchableOpacity>
        </View>
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
    borderRadius: 110,
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
});





export default AudioScreen;