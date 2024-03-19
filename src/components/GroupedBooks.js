import React ,{useState,useEffect} from "react";
import {View,FlatList,Image,ScrollView, Text,TouchableOpacity,StyleSheet,ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider} from '@rneui/themed';
import RNFS from 'react-native-fs';
import { DatabaseConnection } from '../database/database-connection';
import {Dimensions} from 'react-native';
import { getAllTranslatedBooks, getCategorySelectedBooks, getLangaugeTranslatedBooks } from "../service/storeService";


const db = DatabaseConnection.getdb();


const GroupedBooks = ({ route, navigation }) => {

  const cat_id = route.params;

  const [books, setBooks] = useState([]);
  const [titleHeader, setTitle] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [currentProgress, setProgress] = useState(0);
  const [loadingState, setLoadingState] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [listAlign, setListAlign] = useState(true);

//   const capitalize=(str)=>{
//     //capitalize
//     return str.charAt(0).toUpperCase() + str.slice(1);
//   }

  const checkIfExist = async (str)=>{

    RNFS.exists(str)
        .then((exists) => {
            if (exists) {
                return 'File exists';
            } else {
                return 'File does not exist';
            }
        })
        .catch((error) => {
            console.log(error);
        });
    
  }

useEffect(() => {
      const fetchData = async () => {
          setIsLoading(true);
          const data = await getCategorySelectedBooks(cat_id.cat_id);
          const bookcat=data[0].category_name;
          setBooks(data);
          setTitle(bookcat);
          setIsLoading(false);

      }
      fetchData();
      navigation.setOptions({
        title: titleHeader,
      });

    }, [navigation]);

  const numberOfBooks=books.length;

  const renderListBooks = ({ item }) => {
  

    const imgr = item.book_image;
    const id = item.id;
    const url = item.url;
    const filePath = RNFS.DocumentDirectoryPath + "/"+item.id+".epub";
    const price =item.price;
    
    let exist='';
    //check if file exists
    RNFS.exists(filePath)
        .then((exists) => {
            if (exists) {
                exist= 'File exists';
            } else {
                exist= 'File does not exist';
            }
        })
        .catch((error) => {
            console.log(error);
    });



    return (
     <View style={{flexDirection:'row'}}>
        <View style={{marginEnd:10,width:windowWidth*0.3,marginBottom:10,marginRight:"auto"}}>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:10 }}>
                <View style={{  borderRadius: 5, overflow: "hidden" }}>
                    <Image
                    source={{uri:imgr}}
                    style={{
                        height: windowHeight*0.20,
                        width: windowWidth*0.3
                    }}
                    // resizeMode="contain"
                    />


                </View>
                </View>
        </View>
        <View style={{marginEnd:10,width:windowWidth*0.67,marginBottom:10,marginRight:"auto"}}>
            <View >
                <Text style={styles.BookTitle} numberOfLines={2}>{item.title}
                </Text>
                <Text style={styles.BookExcerpt} numberOfLines={4}>{item.book_description}
                </Text>
            </View>

                

                {/* list view */}

                    
                    <View>
                     <View style={{flexDirection:'row',marginTop:5,marginBottom:5,}}>
                         <Text style={{flexWrap:'wrap',marginBottom:5,marginTop:5,color:'#cf8d2e'}}>
                            {item.author}</Text>
                     </View> 
                     <Divider style={{width:'90%',color:'#DAA520'}} color='#A9A9A9' width={1}/> 

                     <View style={{flexDirection:'row',marginTop:10}}>

                        {exist && (
                            <View style={{flexDirection:'row'}}>
                            <TouchableOpacity onPress={()=>{}} 
                                style={{      
                                alignItems: 'center',
                                backgroundColor: '#D8A623',
                                height: 30,
                                width:130,
                                borderRadius:15,
                                marginTop: 5,
                                marginRight:10,
                                justifyContent: 'center'}}>

                                    <Text style={{alignSelf:"center",color:"#FFFFFF"}}>Open / Read Book</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>{}} 
                                    style={{      
                                        alignItems: 'center',
                                        backgroundColor: '#FFFFFF',
                                        borderBlockColor:'red',
                                        height: 30,
                                        width:130,
                                        borderRadius:15,
                                        marginTop: 5,
                                        justifyContent: 'center'}}
                                        >
                                    <Text style={{alignSelf:"center",color:'red'}}>Delete Book</Text>
                                </TouchableOpacity>
                       </View>

                        )}
                         
                        {!exist &&  (
                            <TouchableOpacity onPress={()=>{
                                navigation.navigate('BookDetails',{book_id:id});
                            }} 
                                style={{      
                                alignItems: 'center',
                                backgroundColor: '#4B4E53',
                                borderBlockColor:'red',
                                height: 30,
                                width:130,
                                borderRadius:15,
                                marginTop: 5,
                                justifyContent: 'center'}}
                                >
                            {price !=0 ?(<Text style={{alignSelf:"center",color:'#FFFFFF'}}>Buy ${price}</Text>)
                            :(<Text style={{alignSelf:"center",color:'#FFFFFF'}}>Download</Text>)}
                            </TouchableOpacity>
                         )}
                         
                     </View>


                    </View>

                {/* end of list view */}

        </View>
    </View>
    );
  };

  const renderBooks = ({ item }) => {
  

    const imgr = item.book_image;
    const id = item.id;
    const url = item.url;
    const filePath = RNFS.DocumentDirectoryPath + "/"+item.id+".epub";
    const price =item.price;
    
    let exist='';
    //check if file exists
    RNFS.exists(filePath)
        .then((exists) => {
            if (exists) {
                exist= 'File exists';
            } else {
                exist= 'File does not exist';
            }
        })
        .catch((error) => {
            console.log(error);
    });

    return (

      <View style={{marginEnd:10,width:windowWidth*0.3,marginBottom:10,marginRight:"auto"}}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:10 }}>
            <View style={{  borderRadius: 5, overflow: "hidden" }}>
                <Image
                  source={{uri:imgr}}
                  style={{
                    height: windowHeight*0.20,
                    width: windowWidth*0.3
                  }}
                  // resizeMode="contain"
                />
              <View >
                <Text style={{ marginBottom: 5,marginTop:5,fontSize:10, flexWrap: 'wrap',
                alignSelf:'center',width:100 }} numberOfLines={2}>{item.title}</Text>
              </View>

              {exist && (
            <View>
              <View style={{backgroundColor:'#D8A623',marginStart:10,
                marginEnd:10,height:30, borderRadius:50,
                marginTop:5,marginBottom:10}}>
                    <TouchableOpacity 
                    onPress={()=>{
                    }}>
                    <Text style={{alignSelf:"center",color:'white',
                    marginTop:5,marginBottom:5}}>Read Book</Text>
                </TouchableOpacity>
                </View>

                <View style={{backgroundColor:'#FFFFFF',marginStart:10,
                marginEnd:10,height:30, borderRadius:50,
                marginTop:5,marginBottom:10}}>
                    <TouchableOpacity 
                    onPress={()=>{
                    }}>
                    <Text style={{alignSelf:"center",color:'#FF0000',
                    marginTop:5,marginBottom:5}}>Delete Book</Text>
                </TouchableOpacity>
                </View>
                
                </View>
            )}

            {!exist && (
              <View style={{backgroundColor:'#4B4E53',marginStart:10,
                marginEnd:10,height:30, borderRadius:50,
                marginTop:5,marginBottom:10}}>
                    <TouchableOpacity 
                    onPress={()=>{
                        navigation.navigate('BookDetails',{book_id:id});
                    }}>

                    {
                    price!=0?(<Text style={{alignSelf:"center",color:'white',
                    marginTop:5,marginBottom:10}}>Buy ${price}</Text>):
                    (<Text style={{alignSelf:"center",color:'white',
                    marginTop:5,marginBottom:10}}>Download</Text>)}
                    
                </TouchableOpacity>
                </View>)}

            </View>
            </View>
    </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
       backgroundColor: '#ffffff',
    },
    
    buttons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },

    row: {
        flex: 1,
        justifyContent: "space-around",
        alignSelf:'center'
      },
      BookExcerpt: {
          marginBottom: 5,
          marginTop:5,
          flexWrap: 'wrap',
          fontWeight :'300',
          color : '#59626a',
          fontSize:14,
          lineHeight:20,
    },
      BookTitle :{
          fontSize:15,
          fontWeight :'600',
          marginBottom: 5,
          marginTop:5,
          flexWrap: 'wrap'
      }
  });




  return (
    <View style={styles.container}>
        <View style={{ flexDirection: 'row',backgroundColor:"#D8A623",height:50}}>
          <View style={{  alignSelf:"flex-start",justifyContent:'center',alignSelf:'center'}}>
            <Text style={{color:'#FFFFFF',marginLeft:10}}>
              {numberOfBooks} Books 
            </Text>
          </View>
          {/* {loggedIn? ( */}
          <View style={{ flexDirection: 'row',alignSelf:"flex-end",marginLeft:'auto',justifyContent:'center',alignSelf:'center' }}>
            <Divider orientation="vertical" width={2} />
            <TouchableOpacity onPress={()=>{
              setListAlign(false);
            }}>
              <Icon  name="view-comfy" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
              setListAlign(true);
            }}>
              <Icon  name="view-list" size={30} color="white" />
            </TouchableOpacity>
          </View>
          {/* ):null
          } */}
         </View>

          <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} 
          style={{flexGrow: 1,marginTop:10}}>


            {/* {isLoading && (
                <View style={{  
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                <ActivityIndicator
                    style={{ height: 80 }}
                    color="#DCDCDC"
                    size="large"
                />
                </View>
                )} */}

            {listAlign && (
                    <View >
                        <FlatList data={books} renderItem={renderListBooks} />
                    </View>
                    )}

            {!listAlign && (
                    <View >
                        <FlatList data={books} renderItem={renderBooks} numColumns={3} columnWrapperStyle={styles.row}
                        contentContainerStyle={{flexGrow:1,justifyContent:'center'}}  />
                    </View>
                    )}
          </ScrollView>

        
    </View>
  );
};





export default GroupedBooks;