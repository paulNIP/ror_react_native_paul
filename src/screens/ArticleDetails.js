import React , { useEffect, useState } from 'react';
import { View, Image, StyleSheet,FlatList ,Button,SafeAreaView,ScrollView} from 'react-native';
import { Text, Card,  Divider } from '@rneui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HTMLView from 'react-native-htmlview';
import { useNavigation } from '@react-navigation/native';
import {Dimensions} from 'react-native';
import { getArticleDetails } from '../service/devotionalService';

const windowUnlockHeight = Dimensions.get('window').height*75;


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

    console.log("Worddddf",words);
  return (
    <SafeAreaView>
    <ScrollView>

        {
          words.map((l, i) => {

            return (
                    <TouchableOpacity>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:10,marginBottom:10 }}>
                    <View style={{ backgroundColor: "#eee", borderRadius: 10, overflow: "hidden" }}>
                    <Image
                    source={{uri:l.image}}
                    style={{
                        height: 200,
                        width: 'auto'
                    }}
                    // resizeMode="contain"
                    />
                    <View style={{ marginBottom:10,backgroundColor:'#FFFFFF',padding:10 }}>
                    <Text style={{flexWrap: 'wrap',alignSelf:'center',marginTop:10,color:'#999999'}}>{l.postdate}</Text>
                    <Text style={{flexWrap: 'wrap',alignSelf:'center',marginTop:10}}>{l.title}</Text>
                    <Divider style={{width:100, alignSelf:'center'}} color='red' width={2}/>
                    
                    <HTMLView style={{marginTop:10}}
                        value={l.body}
                        stylesheet={webViewStyle}
                        
                        />

                    </View>
                    </View>
                    </View>
                    </TouchableOpacity>
            )

          })
     }  

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