import React ,{useEffect,useState}  from "react";
import {View, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import { Card } from '@rneui/themed';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyCalender =()=>{




    return (
        <View>
        

       </View>

    )
}


const StudyTracker = () => {
    const navigation = useNavigation();

    const [myDatesArray, setMyDatesArray] = useState([]);
    const [rankingResponse,setRankingResponse] = useState('');
    const [username,setUserName] = useState();
    const [selectedMonth, setSelectedMonth] = useState();
    const [selectedMonthDays, setSelectedMonthDays] = useState();
    const [keyScanner, setKeyScanner] = useState();
    const [numberOfReadDays, setNumberOfDaysRead] = useState(0);
    // const [setNumberOfDaysReadObject]=useState();

    useEffect(()=>{
        const fetchData =async()=>{
            const email = await AsyncStorage.getItem("email");
            const nom = await AsyncStorage.getItem("name");
            setUserName(nom);
            let obj={};


            axios.get('https://backend3.rhapsodyofrealities.org/read/get/'+email)
              .then(function (res) {
                
                console.log("Response --",res.data.response);
                let dates =res.data.response;
                let datesArray = dates.split(",");
                for (let i = 0; i < datesArray.length; i++) {
                    obj[datesArray[i]] = { selected: true, selectedColor: 'green' };
                    
                }

                setMyDatesArray(obj);

                const date = new Date();
                let month = date.getMonth() + 1;
                let year = date.getFullYear();
            
                //   returns padding or leading zero if single digit
                let paddedNum = String(month).padStart(2, '0'); // '04'
            
                //   console.log("key scanner",year+'-'+paddedNum)
                setKeyScanner(year+'-'+paddedNum);
                let numberOfDaysReadObject= Object.fromEntries(
                    Object.entries(myDatesArray).filter(([key]) => key.startsWith(keyScanner)));
            
                // setNumberOfDaysRead(numberOfDaysReadObject);
                        
                let nomOfDaysRead=Object.keys(numberOfDaysReadObject).length;
                setNumberOfDaysRead(nomOfDaysRead);
            
            
                console.log("Number of Days in Month",new Date(year, month, 0).getDate());
                setSelectedMonthDays(new Date(year, month, 0).getDate());
            
            
                rankReaderPerformancePercen(selectedMonthDays, nomOfDaysRead, username);
               
        
                


              })

        }

        fetchData();
        

    })
    






    const handleMonthChange = (date) => {
        const { year, month } = date;
        console.log("Number in Month",month);
        setSelectedMonth({ year, month });
  
        //   returns padding or leading zero if single digit
        let paddedNum = String(month).padStart(2, '0'); // '04'
  
      //   console.log("key scanner",year+'-'+paddedNum)
        setKeyScanner(year+'-'+paddedNum);
        let numberOfDaysReadObject= Object.fromEntries(
          Object.entries(myDatesArray).filter(([key]) => key.startsWith(keyScanner)));

        // setNumberOfDaysRead(numberOfDaysReadObject);
  
        setNumberOfDaysRead(Object.keys(numberOfDaysReadObject).length);
    
        let numberOfReadDays=(Object.keys(numberOfDaysReadObject).length);
  
  
        console.log("Number of Days in Month",new Date(year, month, 0).getDate());
        setSelectedMonthDays(new Date(year, month, 0).getDate());
  
  
        rankReaderPerformancePercen(selectedMonthDays, numberOfReadDays, username);
  
      };

    const rankReaderPerformancePercen=(numberOfDaysInMonthsofar, numberOfReadDays, username)=> {
        setNumberOfDaysRead(numberOfReadDays);

        let readDaysRanking = (numberOfReadDays * 100) / numberOfDaysInMonthsofar; // percentage ranking
        console.log("Month Days ...", "" + numberOfDaysInMonthsofar + "");// test if the days are correct
        console.log("Read Days ...", "" + numberOfReadDays + "");// test if the days are correct
        console.log("Ranking Result ...", "" + readDaysRanking + "");// test if the ranking function works
        

        if (readDaysRanking == 0) {// No days read
            let lowRank = "You haven't read Rhapsody yet this month";
            setRankingResponse(lowRank);

        } else if (readDaysRanking <= 30) {
            let lowRank = "You can do better " + username + ". Your study score is " + readDaysRanking + "%";
            setRankingResponse(lowRank);

        } else if ((readDaysRanking > 30) && (readDaysRanking <= 70)) {

            let moderateRank = "Keep working on it " + username + ". You're improving. Your study score is now " + readDaysRanking + "%";
            setRankingResponse(moderateRank);
        } else if (readDaysRanking > 70) {
            let highRank = "Good job " + username + "! Your Read Score is " + readDaysRanking + "%";
            setRankingResponse(highRank);

        }
    
    } 

  return (
       <View>
         <Calendar 
            markedDates={myDatesArray} 
            onMonthChange={(date) => handleMonthChange(date)}
            theme={{ 
                backgroundColor: '#ffffff', 
                calendarBackground: '#ffffff', 
                textSectionTitleColor: '#b6c1cd', 
                selectedDayBackgroundColor: 'green', 
                selectedDayTextColor: '#ffffff', 
                todayTextColor: '#00adf5', 
                dayTextColor: '#2d4150', 
                textDisabledColor: '#d9e1e8', 
                dotColor: '#00adf5', 
                selectedDotColor: '#ffffff', 
                arrowColor: '#00adf5', 
                monthTextColor: '#00adf5', 
                indicatorColor: 'green', 
                textDayFontFamily: 'monospace', 
                textMonthFontFamily: 'monospace', 
                textDayHeaderFontFamily: 'monospace', 
                textDayFontSize: 16, 
                textMonthFontSize: 16, 
                textDayHeaderFontSize: 16 
            }} 
        /> 

        <View>
        <View style={{flexDirection:'row'}}>
                <View >
                    <Card containerStyle={{backgroundColor:'green',borderRadius: 30,width:50, height:50}}>
                        {/* <Text style={{color:'white',alignSelf:'center'}}>0</Text>     */}
                    </Card>
                </View>
                
                <Text style={{marginTop:20}}>
                    Green Shows Days read. You have read Rhapsody {'\n'}for {numberOfReadDays} Days.
                </Text>

            </View>
            <View style={{flexDirection:'row'}}>
                <View >
                    <Card containerStyle={{backgroundColor:'blue',borderRadius: 30,width:50, height:50}}>
                        <Text style={{color:'white',alignSelf:'center'}}>0</Text>    
                    </Card>
                </View>
                <Text style={{marginTop:20}}>
                    {rankingResponse}
                </Text>

            </View>
         </View>
         

       </View>
  );
};

export default StudyTracker;