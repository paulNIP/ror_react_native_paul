import React , { useEffect, useState } from 'react';
import {View, Text,SafeAreaView,ScrollView,FlatList,TextInput,StyleSheet,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getBookDetails } from '../service/libraryService';
import { Card } from '@rneui/themed';
import { Button } from '@rneui/themed';
import {Dimensions} from 'react-native';
import { Divider } from '@rneui/base';

const FeedBack = ({ route, navigation }) => {


  const { book_id } = route.params;

  const [book, setBook] = useState();
  


  useEffect(() => {

        const fetchData = async () => {
            const data = await getBookDetails(book_id);
            setBook(data);
  
        }
        fetchData();
        navigation.setOptions({
          title: capitalize('Report Book'),
        });
  
      }, [navigation]);

      const renderBook = ({ item }) => {

        return (
    
          <View>
                <View style={{flexDirection:"row",marginLeft:10,marginBottom:10}}>
                    <Image
                        style={{width: 150, height: 250,borderRadius: 10, marginTop:10}}
                        source={{uri: item.book_cover_img}} 
                        resizeMode={"cover"} 
                    />
                    
                </View>

                <Card>
                  <Text>Enquiries, Complaints or Feedback</Text>
                  <Divider/>
                  <TextInput
                    
                    
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