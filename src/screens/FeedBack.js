import React , { useEffect, useState } from 'react';
import {View, Text,SafeAreaView,ScrollView,FlatList,TextInput,StyleSheet,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getBookDetails } from '../service/libraryService';
import { Card } from '@rneui/themed';
import { Button } from '@rneui/themed';
import {Dimensions} from 'react-native';
import { Divider } from '@rneui/base';
import Strings from '../constants/Strings';
import axios from 'axios';

const FeedBack = ({ route, navigation }) => {


  const { book_id } = route.params;

  const [book, setBook] = useState();
  const [feedback, onChangeFeedBack] = useState('');
  
  const [msg, setMsg] = useState();
  //snack bar message
  const [regError,setRegError]  = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  


  useEffect(() => {

      const fetchData = async () => {
            const data = await getBookDetails(book_id);
            setBook(data);
  
        }
        fetchData();
        navigation.setOptions({
          title: 'Report Book',
        });
  
      }, [navigation]);

      const reportBook=()=>{

        const data={
          "user_id": profileId,
          "email": user_email,
          "report_book_id": AId,
          "report": comment
        }

        axios.post(Strings.BOOKS_URL+'/reportbook', data)
                .then(response => {
                console.log("Books Response Response:",response.data.result);
                  if(response.data.result[0].success==='1'){
                    setIsLoading(false);
                    setMsg(response.data.result[0].msg);
                    setRegError(true);

                  }else{
                    setIsLoading(false);
                    setMsg(response.data.result[0].msg);
                    setRegError(true);

                    
                  }

                })
                .catch(error => {
                    setMsg('An error occurred, please try again.');
                    setRegError(true);

        });

              //     client.post(getBaseContext(),report_book_url,stringEntity, "application/json", new AsyncHttpResponseHandler() {
              //         @Override
              //         public void onSuccess(int statusCode, Header[] headers, byte[] responseBody) {
          
              //             Log.d("Response", new String(responseBody));
              //             String res = new String(responseBody);
          
              //             try {
              //                 JSONObject jsonObject = new JSONObject(res);
          
              //                 JSONArray jsonArray = jsonObject.getJSONArray("EBOOK_APP");
          
              //                 for (int i = 0; i < jsonArray.length(); i++) {
          
              //                     JSONObject object = jsonArray.getJSONObject(i);
              //                     String msg = object.getString("msg");
              //                     String success = object.getString("success");
          
              //                     if (success.equals("1")) {
              //                         Toast.makeText(ReportBookActivity.this, msg, Toast.LENGTH_SHORT).show();
              //                         onBackPressed();
              //                     }
          
              //                 }
          
              //             } catch (JSONException e) {
              //                 e.printStackTrace();
              //             }
          
              //         }
          
              //         @Override
              //         public void onFailure(int statusCode, Header[] headers, byte[] responseBody, Throwable error) {
          
              //         }
              //     });
              // }
      }

      const renderBook = ({ item }) => {

        return (
    
          <View>
                <View style={{flexDirection:"row",marginLeft:10,marginBottom:10}}>
                    <Image
                        style={{width: Dimensions.get('window').width*0.2, 
                        height: Dimensions.get('window').height*0.2,borderRadius: 5, marginTop:10}}
                        source={{uri: item.book_cover_img}} 
                        resizeMode={"cover"} 
                    />
                    
                </View>

                <Card>
                  <Text>Enquiries, Complaints or Feedback</Text>
                  <Divider/>
                  <TextInput
                    multiline={true}
                    onChangeText={onChangeFeedBack}
                    placeholder="Type complaint here"
                    
                    
                  />
                  <Button size="sm" type="clear" onPress={() => console.log('aye')}>
                    SUBMIT
                  </Button>
                </Card>


                

          </View>
        );
      };

  return (
       <SafeAreaView style={styles.container}>

                <ScrollView 
                >
                   <FlatList data={book} renderItem={renderBook}  ItemSeparatorComponent={() => <View style={{height: 5}} />}/>
                </ScrollView>

        </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedBack;