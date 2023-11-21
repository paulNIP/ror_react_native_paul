import React , { useEffect, useState } from 'react';
import { View, StyleSheet,Text,Image, FlatList,Button } from 'react-native';
import { getDailyQuiz } from '../service/quizService';
import { RadioButton } from 'react-native-paper';
import { Snackbar } from 'react-native-paper';
import { useFormik } from 'formik';




const DailyQuiz = () => {


  const [quiz, setQuiz] = useState([]);
  const [response, setResponse] = useState();
  const [answer, setAnswer] = useState();
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);
 
  useEffect(() => {

      const fetchData = async () => {
          const data = await getDailyQuiz()
          setQuiz(data)

      }
      fetchData();

  }, []);

  const [checked, setChecked] = React.useState('');
  const [value, setValue] = React.useState('');

  const formik = useFormik({
    initialValues: { gender: '' },
    onSubmit: values => {
      console.log(values.gender);
      // axios({
      //   method: 'post',
      //   url: 'api end point url',
      //   data: {
      //     'gender': values.gender
      //   },
        
      //   })
      //   .then(response => {
      //     console.log(response);
      //   })
      //   .catch(err => {
      //     Alert.alert('An error occurred!', err.message, [{ text: 'Okay' }]);
      //   })
    }
  });

  const renderQuiz = ({ item }) => {

    return (
      <View style={{backgroundColor:"#fdedeb",marginTop:30,padding:20}}>
        <Text h4 style={{alignSelf:'center'}}> TODAY'S QUIZ</Text>
            <Text>{item.question}</Text>
            
            

            <RadioButton.Group
                     onValueChange={formik.handleChange('gender')}
                     value={formik.values.gender}
                     >
                    
                    <View style={{flexDirection:'row',alignContent:'center'}}>
                       <RadioButton value='A'></RadioButton>
                       <Text style={{marginTop:10}}>{item.option_a}</Text>
                       </View>
                    
                    <View style={{flexDirection:'row',alignContent:'center'}}>
                       <RadioButton value='B'></RadioButton>
                       <Text style={{marginTop:10}}>{item.option_b}</Text>
                       </View>
                    
                    <View style={{flexDirection:'row',alignContent:'center'}}>
                       <RadioButton value='C'></RadioButton>
                       <Text style={{marginTop:10}}>{item.option_c}</Text>
                       </View>
                    
                   </RadioButton.Group>
                   <Button  title='submit answer' onPress={formik.handleSubmit} >Enter</Button>
                   <Text style={{marginTop:10,alignSelf:'center'}}>EARN 1 BONUS POINT</Text>
            <Snackbar style={{alignSelf:'center'}}
              visible={visible}
              onDismiss={onDismissSnackBar}
              action={{
                label: 'Undo',
                onPress: () => {
                  // Do something
                },
              }}>
              <View style={{flexDirection:'row'}}>
                <Image  style={styles.logo} source={require('../assets/logo.png')} />
                <Text>{item.answer.toLowerCase()+'hhh'+checked}</Text>
              </View>
            </Snackbar>

      </View>
    );
  };


return (
  <>
    <View style={styles.container}>
      <FlatList data={quiz} renderItem={renderQuiz} />
    </View>
    
  </>
);
};

const styles = StyleSheet.create({
container: {
  
},
logo:{
  width:30,
  height:30,
}
});

export default DailyQuiz;