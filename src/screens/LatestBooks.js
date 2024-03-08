import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,TouchableOpacity,View,Image
} from 'react-native';
import { FlatList } from 'react-native';
import { ListItem ,Divider} from '@rneui/themed';
import {Dimensions} from 'react-native';
import { getFeaturedBooks } from '../service/storeService';
import RNFS from '../utils/RNFS';
import { exists } from 'react-native-fs';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const LatestBooks = () => {


    const [words, setWords] = useState([]);
   
    useEffect(() => {
  
        const fetchData = async () => {
            const data = await getFeaturedBooks();
            setWords(data)
        }
        fetchData();
  
    }, []);

    const checkFile=async(EPUB_PATH)=>{
      return await RNFS.exists(EPUB_PATH);
    }

    const renderItem = ({item})=>{

      let file =item.book_title+'.epub';
      const EPUB_PATH = `${RNFS.DocumentDirectoryPath}/`+file;

      const exists=checkFile(EPUB_PATH);
      console.log("File existenecehgg",exists);

      return(
        <View>
                <ListItem bottomDivider>
                   <Image
                     style={styles.image}
                     source={{uri: item.book_cover_img}} 
                     resizeMode={"cover"} // <- needs to be "cover" for borderRadius to take effect on Android
                   />
                   <ListItem.Content>
                     <ListItem.Title>{item.book_title}</ListItem.Title>
                     <ListItem.Subtitle style={{color:'#999999'}} numberOfLines={2}>{item.book_description}</ListItem.Subtitle>
                     
                     <Text style={{color:'#606060',marginTop:5}}>{item.author_name}</Text>
                     <Divider style={{width:'auto',color:'#606060' }} color='#606060' width={5}/>
                     {exists ?(

                      <View style={{flexDirection:'row',marginTop:5}}>
                      <TouchableOpacity style={{backgroundColor:'#D8A623',
                      padding:5,width:120,borderRadius:20,marginRight:5}}>
                                <Text style={{color:'white',alignSelf:'center'}}>Read Book</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{backgroundColor:'white',padding:5,width:120,
                            borderRadius:20,borderColor:'red',borderWidth:2}}>
                              <Text style={{color:'red',alignSelf:'center'}}>Delete Book</Text>
                            </TouchableOpacity>
                      </View>
                     ):(
                      <TouchableOpacity style={{backgroundColor:'gray',
                      padding:5,width:120,borderRadius:20,marginTop:5}}>
                          <Text style={{color:'white',alignSelf:'center'}}>Buy ${item.price}</Text>
                      </TouchableOpacity>
                     )}
                     

                   </ListItem.Content>
                </ListItem>
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
    height: windowHeight*0.14,
    borderRadius: 15
  },
});

export default LatestBooks;