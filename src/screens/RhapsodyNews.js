import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,TouchableOpacity,View,Image
} from 'react-native';
import { FlatList } from 'react-native';
import { getWordOfMonth } from '../service/wordOfMonthService';
import { ListItem } from '@rneui/themed';
import {Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const RhapsodyNews = () => {

    const navigation =  useNavigation();
    const [words, setWords] = useState([]);
   
    useEffect(() => {
  
        const fetchData = async () => {
            const data = await getWordOfMonth();
            setWords(data)
        }
        fetchData();
  
    }, []);

    const renderItem =({item})=>{

      return(
        <View>
          <TouchableOpacity onPress={()=>{navigation.navigate('Rhapsody of Realities',{id:item.id})}}>
                <ListItem bottomDivider>
                   <Image
                     style={styles.image}
                     source={{uri: item.img_url}} 
                     resizeMode={"cover"} // <- needs to be "cover" for borderRadius to take effect on Android
                   />
                   <ListItem.Content>
                     <ListItem.Title>{item.title}</ListItem.Title>
                     <ListItem.Subtitle style={{color:'#999999'}} numberOfLines={4}>{item.excerpt}</ListItem.Subtitle>
                     <Text style={{color:'#606060'}}>{item.postdate}</Text>
                   </ListItem.Content>
                </ListItem>
                </TouchableOpacity>
        </View>
      )
    }



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
         <FlatList data={words} renderItem={renderItem} 
         ItemSeparatorComponent={() => <View style={{height: 2}} />}/>
         
        
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
  },
  image: {
    width: windowWidth*0.2,
    height: windowHeight*0.12,
    borderRadius: 15
  },
});

export default RhapsodyNews;