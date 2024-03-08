import React,{useState,useEffect} from "react";
import { getAllTranslatedBooks, getCategories, getTranslatedBooks } from "../service/storeService";
import { ScrollView,Text,View,Dimensions,
    TouchableOpacity,Image,FlatList,Modal,TextInput,StyleSheet } from "react-native";
import { Divider,ListItem} from '@rneui/themed';
import { Button } from '@rneui/themed';
import {Overlay } from '@rneui/themed';
import { useNavigation } from "@react-navigation/native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';





const BookCategories = () => {

    const navigation =useNavigation();
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;


    const [visible, setVisible] = useState(false);

     
    const [books, setBooks] = useState();
    const [translatedDescription, setTranslatedDescription] = useState();
    const [translatedBooks, setTranslatedBooks] = useState();
    const [allTranslatedLanguages, setAllTranslatedLanguages] = useState();
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
  
      const fetchData = async () => {
          const data = await getCategories();
          setBooks(data);

  
      }
      fetchData();

  
    }, []);




    const goToTranslatedBooks=(language)=>{
        navigation.navigate('AllCategories');

    }


        

    const renderBooks = ({ item }) => {
        
        const imgr = item.category_image;
        const category_name = item.category_name;
        const total_books = item.total_books;

        return (
            <View style={{marginEnd:10,width:windowWidth*0.3,
                borderTopRightRadius:5,
                borderBottomLeftRadius:5,
                borderTopLeftRadius:5,
                borderBottomRightRadius:5}}>
                <TouchableOpacity onPress={()=>{goToTranslatedBooks(category_name);}}>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:10 }}>
                    <View style={{ backgroundColor: "#eee", borderRadius: 5, overflow: "hidden" }}>
                        <Image
                        source={{uri:imgr,
                        cache: 'force-cache'}}
                        style={{
                            height: 150,
                            width: windowWidth*0.3
                        }}
                        />
                    <View style={{height:50,flex:1}}>
                        <Text style={{  marginLeft:10,marginTop:5,
                            flexWrap: 'wrap' }}
                            >{category_name}</Text>
                        <Text style={{  marginLeft:10,marginTop:5,
                            flexWrap: 'wrap' }}
                            >({total_books}) Items</Text>
                    </View>
                    </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
      };

    return (


        <View >
            <View style={{ flexDirection: 'row',marginHorizontal:10, marginTop:15,marginBottom:15,alignContent:'space-between' }}>
                <Divider orientation="vertical" width={5} />
                <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                <View style={{marginBottom:15,alignItems:'flex-start',width:windowWidth*0.65}}>
                    <Text style={{marginLeft:10}}>BOOK CATEGORIES</Text>
                    
                </View>
                <View style={{marginBottom:15,alignItems:'flex-end',marginLeft:'auto',width:windowWidth*0.3}}>
                    <Button title="VIEW ALL" type="outline"  color="warning" onPress={()=>{
                        goToTranslatedBooks();
                    }}/>
                </View>
                </View>
            </View>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}  
             showsVerticalScrollIndicator={false} style={{marginHorizontal:10}}  >
                 <FlatList data={books} renderItem={renderBooks} horizontal={true}
                   />

            </ScrollView>  
            <Divider style={{marginTop:10}}/>

        </View>
        



        
    );
}

const styles = StyleSheet.create({
    searchBar: {
      width: wp(80),
      height: hp(6),
      borderWidth: wp(0.2),
      borderRadius: wp(3),
      borderColor: '#999999',
      backgroundColor: '#ffffff',
      marginTop: wp(7),
      paddingLeft: wp(4.5),
      fontSize: wp(4),
      color: 'black'
    },

  });
  

export default BookCategories;