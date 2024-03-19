import React , { useEffect, useState } from 'react';
import { View, Image, StyleSheet,FlatList ,SafeAreaView,ScrollView} from 'react-native';
import { Text, Card,  Divider } from '@rneui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HTMLView from 'react-native-htmlview';
import { useNavigation } from '@react-navigation/native';
import {Dimensions} from 'react-native';
import { ListItem } from '@rneui/base';
import { getArticleDetails } from '../service/devotionalService';
import { getWordOfMonth } from '../service/wordOfMonthService';

const ArticleDetails = ({ route, navigation }) => {

    const { id } = route.params;
    const [words, setWords] = useState();
    const [moreNews, setMoreNews] = useState();
   
    useEffect(() => {
  
        const fetchData = async () => {
            const data = await getArticleDetails(id);
            const morenews = await getWordOfMonth();
            // console.log("Filtered array",morenews.filter((x) => x.id !== id))
            setWords(data);
            setMoreNews(morenews.filter((x) => x.id !== id));
            
        }
        fetchData();
  
    }, []);

    const renderMoreNews =({item})=>{

      return (
        <TouchableOpacity onPress={()=>{navigation.push('Rhapsody of Realities',{id:item.id})}}>
        <ListItem bottomDivider>
           <Image
             style={styles.image}
             source={{uri: item.img_url}} 
             resizeMode={"cover"} // <- needs to be "cover" for borderRadius to take effect on Android
           />
           <ListItem.Content>
             <ListItem.Title style={{fontSize:14, fontWeight :'600'}}>{item.title}</ListItem.Title>
             <ListItem.Subtitle style={styles.excert}   numberOfLines={4}>{item.excerpt}</ListItem.Subtitle>
             <Text style={{color:'#cf8d2e', fontSize:12 , textTransform : 'uppercase'  }}>{item.postdate}</Text>
           </ListItem.Content>
        </ListItem>
        </TouchableOpacity>
      )
    }

    
    const renderItem = ({item}) => {
  

     return(
      <View>
        <TouchableOpacity>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginBottom:10 }}>
                    <View style={{ backgroundColor: "#eee", borderRadius: 10, overflow: "hidden" }}>
                    <Image
                    source={{uri:item.img_url}}
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
                        value={item.content}
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
    <ScrollView showsVerticalScrollIndicator={false}>

       <FlatList data={words} renderItem={renderItem} 
         ItemSeparatorComponent={() => <View style={{height: 2}} />}/>

      
      <View style={{backgroundColor:"white"}}>
        <Text style={{fontWeight:"bold",marginTop:25,marginLeft:10}}>More Rhapsody News</Text>
        <FlatList data={moreNews} renderItem={renderMoreNews} 
          ItemSeparatorComponent={() => <View style={{height:1}} />}/>
        
      </View>



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