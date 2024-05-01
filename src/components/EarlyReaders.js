import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  StatusBar,View,TouchableOpacity,Image,Dimensions,FlatList
} from 'react-native';
import { Divider,Button} from '@rneui/themed';
import { useNavigation } from "@react-navigation/native";
import { getEarlyReaders } from "../service/storeService";


const windowWidth = Dimensions.get('window').width;



const EarlyReaders = () => {
    
    const [books, setBooks] = useState();
    const [bookCategory, setBookCategory] = useState();
    const [categoryID, setCategoryID] = useState();
    const [bookDescription, setBookDescription] = useState();

    const navigation =useNavigation()


    useEffect(() => {

        const fetchData = async () => {
            const data = await getEarlyReaders();
            setBooks(data.books);
            setBookCategory(data.category_name);
            setCategoryID(data.cat_id);
            setBookDescription(data.category_description);
        }
        fetchData();

        }, []);



    const goToTranslatedBooks=(cat)=>{
        navigation.navigate('GroupedBooks',{cat_id:cat,category:bookCategory});

    }

    const renderItem = ({ item }) => {
        const imgr = item.book_cover_img;
        return (
            <View style={{marginEnd:10,width:Dimensions.get('window').width*0.25}}>
                <TouchableOpacity onPress={()=>navigation.navigate('BookDetails',{book_id:item.id,code:item.apple_product_code})}>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:10 }}>
                        <View style={{ backgroundColor: "#eee", borderRadius: 5, overflow: "hidden" }}>
                            <Image
                                source={{uri:imgr,cache: 'force-cache'}}
                                style={{
                                    height: Dimensions.get('window').height*0.2,
                                    width: windowWidth*0.25
                                }}
                                // resizeMode="contain"
                            />
                            <View style={{height:50}}>
                                <Text style={styles.BookTitle} numberOfLines={5}>{item.book_title}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };


  return (
    <View>
        { bookCategory &&(
        <View>
            <View style={{ flexDirection: 'row',marginHorizontal:10, marginTop:35,marginBottom:15,alignContent:'space-between' }}>
            <Divider orientation="vertical" width={5} />
            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                <View style={{marginBottom:15,alignItems:'flex-start',width:windowWidth*0.7}}>
                <Text style={styles.CategoryTitle}>{bookCategory}</Text>
                <Text style={styles.CategorySubTitle}>{bookDescription}</Text>
                </View>
                <View style={{marginBottom:15,alignItems:'flex-end',marginLeft:'auto',width:windowWidth*0.3}}>
                  <Button title="VIEW ALL" type="outline"  color="warning" onPress={()=>{
                        goToTranslatedBooks(categoryID);
                  }}
                          titleStyle={styles.StoreViewAllButton}
                  />
                </View>
            </View>
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} 
            showsVerticalScrollIndicator={false} style={{marginHorizontal:10}}>
                <FlatList data={books} renderItem={renderItem} horizontal={true} ItemSeparatorComponent={() => <View style={{height: 5}} />}/>
            </ScrollView>
        </View>

        )}
        
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
    CategoryTitle : {
        marginLeft: 10,
        fontWeight: '600',
        fontSize : 16,
        color :'#52565e',
        textTransform : 'uppercase'
    },
    CategorySubTitle : {
        marginLeft: 10,
        color: '#999999',
        fontWeight : '400',
        fontSize:13
    },
    StoreViewAllButton :{
        fontSize: 12
    },
    BookTitle : {
        marginBottom: 5,
        marginTop:5,
        flexWrap: 'wrap',
        alignSelf:'center',
        width:windowWidth*0.2,
        fontSize : 10,
        textTransform :'uppercase'
    }

});

export default EarlyReaders;