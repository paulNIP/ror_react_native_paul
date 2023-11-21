import React ,{ useState, useRef, useEffect } from 'react';
import Strings from '../constants/Strings';
import { View, StyleSheet,Text,Button,TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CountDownTimer from 'react-native-countdown-timer-hooks';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getWallet } from '../service/authService';

const ReadAndEarn=()=> {

    const options = { weekday: 'long', day: 'numeric', year: 'numeric', month: 'long' };
    const today = new Date().toLocaleDateString("en-US", options);

    // Timer References
    const refTimer = useRef();

    // For keeping a track on the Timer
    const [timerEnd, setTimerEnd] = useState(false);

    const timerCallbackFunc = (timerFlag) => {
        // Setting timer flag to finished
        setTimerEnd(timerFlag);
        console.warn(
        'You can alert the user by letting him know that Timer is out.',
        );
    };

    const [points, setPoints] = useState();

    useEffect(() => {
  
        const fetchData = async () => {
            const email= await AsyncStorage.getItem('email');
            const data = await getWallet(email);
            setPoints(data.reading_points);
  
        }
        fetchData();
  
      }, []);

    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <View style={{flexDirection:'row'}}> 
                    <MaterialCommunityIcons style={{marginTop:-2}} name="timer-outline" size={25} color="red" />
                    <View style={{ display: timerEnd ? 'none' : 'flex' }}>
                    <CountDownTimer
                        ref={refTimer}
                        timestamp={10}
                        timerCallback={timerCallbackFunc}
                        containerStyle={{
                            justifyContent: 'center',
                            alignItems: 'left',
                        }}
                        textStyle={{
                            fontSize: 20,
                            color: 'black',
                            letterSpacing: 0.25,
                        }}
                    />
                </View>
                <TouchableOpacity
                    style={{
                    display: timerEnd ? 'flex' : 'none',
                    }}
                    onPress={() => {
                    setTimerEnd(false);
                    refTimer.current.resetTimer();
                    }}>
                    <Text style={{ fontSize: 14, color: '#008000' }}>
                    Completed
                    </Text>
                </TouchableOpacity>
                
                </View>
                <View>
                  <Text style={{color:'#606060'}} >{today}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <MaterialCommunityIcons name="arrow-up-bold-circle-outline" style={{marginTop:-2}} size={25} color="red" />
                     <Text> {points} pt(s)</Text>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:-3,
    },
    square: {
    },
   });

export default ReadAndEarn;