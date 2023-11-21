import React , { useEffect, useState } from 'react';
import {StyleSheet,ScrollView,View,Text,Image,Alert,FlatList,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useWindowDimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider} from '@rneui/themed';
import { Button } from '@rneui/themed';
import Strings from '../constants/Strings';
import { getBookDetails } from '../service/libraryService';
import {Dimensions} from 'react-native';




const BookDetails = ({ route, navigation }) => {

  const { book_id } = route.params;

  const [book, setBook] = useState();
  


    useEffect(() => {

        const fetchData = async () => {
            const data = await getBookDetails(book_id);
            setBook(data);
  
        }
        fetchData();
  
      }, []);

  

      const renderRelatedBooks = ({ item }) => {

        const imgr = item.book_cover_img;
    
        
        return (
          <View style={{marginEnd:10,width:100}}>
            <TouchableOpacity onPress={()=>navigation.navigate('BookDetails',{book_id:item.id})}>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:10 }}>
                <View style={{ backgroundColor: "#eee", borderRadius: 5, overflow: "hidden" }}>
                    <Image
                      source={{uri:imgr}}
                      style={{
                        height: 150,
                        width: 100
                      }}
                      // resizeMode="contain"
                    />
                  <View style={{height:50}}>
                    <Text style={{ marginBottom: 5,marginTop:5,fontSize:10, flexWrap: 'wrap',alignSelf:'center',width:100 }} numberOfLines={5}>{item.book_title}</Text>
                  </View>
                  <Text style={{ marginBottom: 5,fontSize:10}}>
                      By Pastor Chris {'\n'}Oyakhilome
                  </Text>
                </View>
                </View>
              </TouchableOpacity>
          </View>
        );
      };



    const renderBook = ({ item }) => {

        return (
    
          <View>
                <Image
                     style={{width: Dimensions.get('window').width, height: 220}}
                     source={{uri: item.book_bg_img}} 
                     resizeMode={"cover"} 
                />
                <View style={{flexDirection:"row",marginLeft:10,marginBottom:10}}>
                    <Image
                        style={{width: 100, height: 150,borderRadius: 10, marginTop:-100}}
                        source={{uri: item.book_cover_img}} 
                        resizeMode={"cover"} 
                    />
                    <View style={{marginTop:-40,marginBottom:20}}> 
                        <Text style={{marginLeft:10,color:'#818589',fontWeight:'bold'}}>{item.book_title}</Text>
                        <Text style={{marginLeft:10, color:'#818589'}}>By Pastor Chris Oyakhilome D.S.C D.D </Text>

                        <View style={{flexDirection:"row",alignContent:"space-between",marginTop:10}}>
                            <Text style={{marginLeft:10,marginRight:10, marginTop:4}}>PRICE : </Text>
                           
                           <TouchableOpacity style={{borderRadius: 4,padding:4,height:40,
                                                  backgroundColor: '#F9A825',marginEnd:20}}>
                                <Text>BUY US ${item.price}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{borderRadius: 4,padding:4,height:40,
                                                  backgroundColor: '#F9A825',}}>
                            <Text>PROMO CODE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <Divider/>
                <View style={{flexDirection:"row",justifyContent:"space-around", marginTop:5,marginBottom:5}}>
                    <View>
                      <TouchableOpacity  onPress={()=>{
                        

// if (db.checkId(Constant_Api.scdLists.get(0).getId())) {
//   method.addData(db, 0);
//   image_favorite.setImageResource(R.drawable.ic_fav_hov);
// } else {
//   db.deleteDetail(Constant_Api.scdLists.get(0).getId());
//   image_favorite.setImageResource(R.drawable.ic_favourite);
//   Toast.makeText(BookDetailActivity.this, getResources().getString(R.string.remove_to_favourite), Toast.LENGTH_SHORT).show();
// }

                      }}>
                        <MaterialCommunityIcons  style={{alignSelf:"center"}} name="cards-heart" size={30} color="#808080" />
                        <Text style={{alignSelf:"center"}}>Favourite</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity onPress={()=>{}}
                      >
                        <MaterialCommunityIcons style={{alignSelf:"center"}} name="cloud-download" size={30} color="#5D3FD3" />
                        <Text style={{alignSelf:"center"}}>Download</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                     <TouchableOpacity  onPress={()=>{}}>

                        <MaterialCommunityIcons style={{alignSelf:"center"}} name="file-multiple-outline" size={30} color="#9AC4F8" />
                        <Text style={{alignSelf:"center"}} >Read</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                    <TouchableOpacity  onPress={()=>navigation.navigate("FeedBack",{book_id:book_id})}>
                        <MaterialCommunityIcons style={{alignSelf:"center"}} name="information" size={30} color="#F9A825" />
                        <Text style={{alignSelf:"center"}} >FeedBack</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <Divider/>
                <Text style={{marginTop:10,marginLeft:10,fontSize:20,fontWeight:"bold"}}>Description</Text>
                <Divider/>
                <Text style={{marginTop:10,marginLeft:20}}>{item.book_description}</Text>

                <View style={{ flexDirection: 'row',marginHorizontal:10, marginTop:15,marginBottom:15,alignContent:'space-between' }}>
                <Divider orientation="vertical" width={5} />
                <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{marginBottom:15,alignItems:'flex-start'}}>
                        <Text style={{marginLeft:10,fontWeight:'bold'}}>RELATED BOOKS</Text>
                        <Text style={{marginLeft:10,color:'#999999'}}>Books related to the title above</Text>
                    </View>
                    <View style={{marginBottom:15,alignItems:'flex-end'}}>
                        <Button title="VIEW ALL" type="outline"  color="warning" />
                    </View>
                </View>

                
                </View>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginHorizontal:10}}>
                    <FlatList data={item.related_books} renderItem={renderRelatedBooks} numColumns={700} ItemSeparatorComponent={() => <View style={{height: 5}} />}/>
                </ScrollView>
          
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

export default BookDetails;