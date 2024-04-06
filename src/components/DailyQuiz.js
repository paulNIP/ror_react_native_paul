import React , { useEffect, useState } from 'react';
import { View, StyleSheet,Text,Image, FlatList,Button,Alert,Modal,Dimensions } from 'react-native';
import { getDailyQuiz } from '../service/quizService';
import { RadioButton } from 'react-native-paper';
import SnackBar from 'react-native-snackbar-component';
import { useFormik } from 'formik';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Overlay } from '@rneui/themed';
// import jwt from 'jsonwebtoken';


const windowHeight = Dimensions.get('window').height*0.6;
const windowWidth = Dimensions.get('window').width*0.8;

const DailyQuiz = () => {


  const [quiz, setQuiz] = useState([]);
  const [msg, setMessage] = useState();
  const [msg2, setMessage2] = useState();
  const [answer, setAnswer] = useState();
  const [email, setEmail] = useState();
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible2);
  };




  // const secretKey = 'bGS6lzFqvvSQJhdslLOxatm7/Vk7mLQyzqaS34Q4oR1ew='; // Replace with your own secret key
  // map_data.put("value", pref.getString("userEmail",null));
  // if(package_amt == null){
  //     map_data.put("value",pref.getString("userEmail",null));
  // }else{
  //     map_data.put("email",pref.getString("userEmail",null));
  //     map_data.put("value",String.valueOf(package_amt));
  //     map_data.put("time_stamp",String.valueOf(System.currentTimeMillis()));
  // }
  // String key_string = "bGS6lzFqvvSQJhdslLOxatm7/Vk7mLQyzqaS34Q4oR1ew=";
  // SecretKey key = Keys.hmacShaKeyFor(key_string.getBytes());

  // const payload = { email: email, value: 'example', time_stamp: Date.now() }; // Customize payload as needed

  // const generateToken = (payload) => {
  //   return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Adjust the expiration time as needed
  // };





 
  useEffect(() => {

      const fetchData = async () => {
          const data = await getDailyQuiz()
          setQuiz(data);
          setAnswer(data[0].answer);
          const mail= await AsyncStorage.getItem('email');
          setEmail(mail);

      }
      fetchData();

  }, []);
  // setAnswer(quiz[0].answer);
  // console.log("Answer me",answer);


  const [checked, setChecked] = React.useState('');
  const [value, setValue] = React.useState('');

  const formik = useFormik({
    initialValues: { gender: '' },
    onSubmit: values => {
      // console.log("Selected answer",quiz[0].an);
      if (values.gender===answer) {
        // Submit Quiz Points
        const data={
          "questions": 1,
          "last_read": new Date().toISOString().slice(0, 10),
          "email": email,
          "password": "rabadaba"
        }

        axios({
          method: 'post',
          url: 'https://rowtoken.rhapsodyofrealities.org/api/question/add',
          data: data
          })
          .then(response => {
            
            setMessage2(response.data.response);
            setVisible2(true);

          })
          .catch(err => {
            Alert.alert('quiz submit error', err.message, [{ text: 'Okay' }]);
          })


    } else {
        setVisible(true);
        setMessage('Failed Attempt');
        // doReadAndEarnAttempts();

        // // Submit Quiz Points
        // const data={
        //   "date": new Date().toISOString().slice(0, 10),
        // }

        // axios({
        //   method: 'post',
        //   url: 'https://rhapsodysubscriptions.org/api/qn/attempt',
        //   data: data
        //   })
        //   .then(response => {
        //     console.log(response);

        //   })
        //   .catch(err => {
        //     Alert.alert('quiz submit error', err.message, [{ text: 'Okay' }]);
        //   })
      }
      
      
    }
  });

  const renderQuiz = ({ item }) => {

    return (
      <View style={{backgroundColor:"#fdedeb",marginTop:30,padding:20, borderRadius : 30}}>
        <Text h4 style={{alignSelf:'center', fontWeight : '700', marginBottom: 20, color : '#d20962' }}> TODAY'S QUIZ</Text>
            <Text style={{flexWrap:'wrap', fontSize : 16}}> {item.question}</Text>

            <RadioButton.Group
                     onValueChange={formik.handleChange('gender')}
                     value={formik.values.gender}
                     >
                    
                    <View style={{flexDirection:'row',alignContent:'center'}}>
                       <RadioButton.IOS value='A'>{item.option_a}</RadioButton.IOS>
                       <TouchableOpacity>
                       <Text style={{marginTop:10}}>{item.option_a}</Text>
                       </TouchableOpacity>
                       </View>
                    
                    <View style={{flexDirection:'row',alignContent:'center'}}>
                       <RadioButton.IOS value='B'></RadioButton.IOS>
                       <TouchableOpacity>
                       <Text style={{marginTop:10}}>{item.option_b}</Text>
                       </TouchableOpacity>
                       </View>
                    
                    <View style={{flexDirection:'row',alignContent:'center'}}>
                       <RadioButton.IOS value='C'></RadioButton.IOS>
                       <TouchableOpacity>
                        <Text style={{marginTop:10}}>{item.option_c}</Text>
                        
                        </TouchableOpacity>
                       </View>
                    
                   </RadioButton.Group>

                   {/* <Button  title='submit answer' onPress={formik.handleSubmit} >Enter</Button> */}
                      <TouchableOpacity style={{borderRadius:5,backgroundColor:'#007CC0',
                      height:40,justifyContent:'center',alignContent:'center'}}  onPress={formik.handleSubmit} >
                        <Text style={{color:'#FFFFFF',alignSelf:'center'}}>SUBMIT ANSWER</Text>
                      </TouchableOpacity>

                   <Text style={{marginTop:5,alignSelf:'center', fontSize : 10}}>EARN 1 BONUS POINT</Text>

      </View>
    );
  };


return (
  <>
    <View style={styles.container}>
      <FlatList data={quiz} renderItem={renderQuiz} />
            {/* Network snack bar */}
      
            <Overlay ModalComponent={Modal} fullScreen={false}
              isVisible={visible2} 
              onBackdropPress={toggleOverlay} overlayStyle={{width:windowWidth,height:windowHeight,padding:30}}>
                
                <View style={{alignSelf:'center'}}>
                   <Image style={styles.sunrays} source={require('../assets/sunrays.png')} />
                   <Image  style={styles.logo} source={require('../assets/logo.png')} />
                   
                </View>
                <View style={{flexDirection:'row',alignSelf:'center',marginTop:70}}>
                   <Image style={styles.wing} source={require('../assets/left_wing.png')} />
                   <Text>
                     Congrats
                   </Text>
                   <Image style={styles.wing} source={require('../assets/right_wing.png')} />
                </View>
                
                <Text style={{flexWrap:'wrap',alignSelf:'center'}}>
                     {msg2}
                </Text>
                <Button
                  title="Ok"
                  onPress={() => setVisible2(!visible2)}
                />
              </Overlay>
      <SnackBar visible={visible} textMessage={msg}
        actionHandler={()=>{setVisible(false);}} actionText="OKAY"/>
    </View>
    
  </>
);
};

const styles = StyleSheet.create({
container: {
  
},
// logo:{
//   width:30,
//   height:30,
// },
sunrays:{
  width:150,
  height:150
},
logo:{
  width:50,
  height:50,
  alignSelf:'center',
  marginTop:-100
}

});

export default DailyQuiz;