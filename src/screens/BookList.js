import React ,{useState,useEffect} from "react";
import {View,FlatList,Image,ScrollView, Text,TouchableOpacity,StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider} from '@rneui/themed';
import { getCategoryList, getLibrary } from "../service/libraryService";



const BookList = ({ route, navigation }) => {

  
  const { cat_id } = route.params;

  const [books, setBooks] = useState([]);

    useEffect(() => {

      const fetchData = async () => {
          const data = await getCategoryList(cat_id)
          setBooks(data)

      }
      fetchData();

    }, []);

  const renderBooks = ({ item }) => {

    const imgr = item.book_image;
    return (

      <View style={{marginEnd:10,width:120,alignContent:"space-between",marginStart:10,marginTop:5}}>
      <TouchableOpacity onPress={()=>navigation.navigate('BookDetails',{book_id:item.id})}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:5 }}>
            <View style={{ backgroundColor: "#eee", borderRadius: 5, overflow: "hidden" }}>
                <Image
                  source={{uri:imgr}}
                  style={{
                    height: 150,
                    width: 120
                  }}
                  // resizeMode="contain"
                />
              <View >
                <Text style={{ marginBottom: 5,marginTop:5,fontSize:10, flexWrap: 'wrap',alignSelf:'center',width:100 }} numberOfLines={5}>{item.title}</Text>
              </View>
              <View style={{flexDirection:"row"}}>
                <Text style={{ marginBottom: 5,marginTop:5,fontSize:10, flexWrap: 'wrap',alignSelf:'center',width:100 }} numberOfLines={5}>{item.title}</Text>
              </View>
              <View style={{backgroundColor:'#F9A825',marginStart:10,marginEnd:10,height:20, borderRadius:50}}>
                <TouchableOpacity onPress={()=>{navigation.navigate('EpubReader',{
                  file: item.url
                })}}>
                  <Text style={{alignSelf:"center",fontSize:8,marginTop:5}}>Read Book</Text>
                </TouchableOpacity>
              </View>
              <View style={{backgroundColor:'#FF0000',marginStart:10,marginEnd:10,marginTop:5,height:20,marginBottom:5, borderRadius:50,borderStyle:"solid"}}>
                <TouchableOpacity>
                  <Text style={{alignSelf:"center",fontSize:8,marginTop:5}}>Delete Book</Text>
                </TouchableOpacity>
              </View>
            </View>
            </View>
          </TouchableOpacity>
    </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#D8D9DA',
    },
    
    buttons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });




  return (
    <View style={styles.container}>
        <View style={{flexDirection:'row',justifyContent:'space-between',backgroundColor:"#F9A825"}}>
                <View style={{flexDirection:'row'}}> 
                <TouchableOpacity
                    >
                    <Text style={{ fontSize: 14, color: 'white' }}>
                        1 Books in your Library
                    </Text>
                </TouchableOpacity>
                </View>
                <View>
                    <Divider orientation="vertical" width={5} />
                </View>
                <View style={{flexDirection:'row'}}>
                        <TouchableOpacity>
                        <MaterialCommunityIcons  name="view-comfy" size={30} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                        <MaterialCommunityIcons  name="view-list" size={30} color="white" />
                        </TouchableOpacity>
                </View>

        </View>



        <ScrollView showsHorizontalScrollIndicator={false} >
      
         <FlatList data={books} renderItem={renderBooks} numColumns={3} 
         contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
         ItemSeparatorComponent={() => <View style={{height: 2}} />}/>
         </ScrollView>
    </View>
  );
};

export default BookList;