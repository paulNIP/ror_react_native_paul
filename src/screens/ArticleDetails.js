import React , { useEffect, useState } from 'react';
import { View, Image, StyleSheet,FlatList ,SafeAreaView,ScrollView} from 'react-native';
import { Text, Card,  Divider } from '@rneui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HTMLView from 'react-native-htmlview';
import { useNavigation } from '@react-navigation/native';
import {Dimensions} from 'react-native';
import { getArticleDetails } from '../service/devotionalService';

const ArticleDetails = ({ route, navigation }) => {

    const { date } = route.params;
    const [words, setWords] = useState([]);
   
    useEffect(() => {
  
        const fetchData = async () => {
            const data = await getArticleDetails(date);
            setWords(data)
        }
        fetchData();
  
    }, []);

    
    const renderItem = ({ item }) => {
      console.log("Worddddf",item);
  

     return(
      <View>
        <TouchableOpacity>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginBottom:10 }}>
                    <View style={{ backgroundColor: "#eee", borderRadius: 10, overflow: "hidden" }}>
                    <Image
                    source={{uri:item.image}}
                    style={{
                        height: Dimensions.get('window').height*0.25,
                        width: 'auto'
                    }}
                    // resizeMode="contain"
                    />
                    <View style={{ marginBottom:10,backgroundColor:'#FFFFFF',padding:10 }}>
                    <Text style={{flexWrap: 'wrap',alignSelf:'center',marginTop:10,color:'#999999'}}>{item.postdate}</Text>
                    <Text style={{flexWrap: 'wrap',alignSelf:'center',marginTop:10}}>{item.title}</Text>
                    <Divider style={{width:100, alignSelf:'center'}} color='red' width={2}/>
                    
                    <HTMLView style={{marginTop:10}}
                        value={item.body}
                        stylesheet={webViewStyle}
                        
                        />

                    </View>
                    </View>
                    </View>
                    </TouchableOpacity>
      </View>

     )
  }
  
  return (
    <SafeAreaView>
    <ScrollView>

       <FlatList data={words} renderItem={renderItem} 
         ItemSeparatorComponent={() => <View style={{height: 2}} />}/>

     </ScrollView> 
    </SafeAreaView>
    
  );
};

const webViewStyle = StyleSheet.create({ 
    p: { fontSize:16 } ,
    a:{
      textDecorationLine:'underline',
    color:'#007cc0'}
  });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom:15
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
  });

export default ArticleDetails;