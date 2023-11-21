import React from "react";
import {View, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import { Card } from '@rneui/themed';

const MyCalendar = () => { 
    return ( 
        <View> 
            <Calendar 
                markedDates={{ 
                    '2023-06-25': { selected: true, marked: true }, 
                    '2023-06-24': { marked: true }, 
                    '2023-06-26': { 
                        marked: true, dotColor: 'red', 
                        activeOpacity: 0 
                    }, 
                }} 
                theme={{ 
                    backgroundColor: '#ffffff', 
                    calendarBackground: '#ffffff', 
                    textSectionTitleColor: '#b6c1cd', 
                    selectedDayBackgroundColor: '#00adf5', 
                    selectedDayTextColor: '#ffffff', 
                    todayTextColor: '#00adf5', 
                    dayTextColor: '#2d4150', 
                    textDisabledColor: '#d9e1e8', 
                    dotColor: '#00adf5', 
                    selectedDotColor: '#ffffff', 
                    arrowColor: '#00adf5', 
                    monthTextColor: '#00adf5', 
                    indicatorColor: 'blue', 
                    textDayFontFamily: 'monospace', 
                    textMonthFontFamily: 'monospace', 
                    textDayHeaderFontFamily: 'monospace', 
                    textDayFontSize: 16, 
                    textMonthFontSize: 16, 
                    textDayHeaderFontSize: 16 
                }} 
            /> 
        </View> 
    ); 
}; 

const StudyTracker = () => {
    const navigation = useNavigation();
  return (
       <View>
         <MyCalendar /> 
         <View>
         <View style={{flexDirection:'row'}}>
                <View >
                    <Card containerStyle={{backgroundColor:'green',borderRadius: 30,width:50, height:50}}>
                        {/* <Text style={{color:'white',alignSelf:'center'}}>0</Text>     */}
                    </Card>
                </View>
                <Text style={{marginTop:20}}>
                    Green Shows Days read. You have read Rhapsody {'\n'}for 0 Days.
                </Text>

            </View>
            <View style={{flexDirection:'row'}}>
                <View >
                    <Card containerStyle={{backgroundColor:'blue',borderRadius: 30,width:50, height:50}}>
                        <Text style={{color:'white',alignSelf:'center'}}>0</Text>    
                    </Card>
                </View>
                <Text style={{marginTop:20}}>
                    You have'nt read Rhapsody yet this{'\n'}Month.
                </Text>

            </View>

         </View>
       </View>
  );
};

export default StudyTracker;