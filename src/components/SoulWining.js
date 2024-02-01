import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  StatusBar,View,TouchableOpacity,Image,Dimensions,FlatList
} from 'react-native';
import { Divider,Button} from '@rneui/themed';
import { getKidsBooks } from "../service/storeService";
import { useNavigation } from "@react-navigation/native";


const windowWidth = Dimensions.get('window').width;

const renderItem = ({ item }) => {

    const imgr = item.book_cover_img;

    
    return (
      <View style={{marginEnd:10,width:100}}>
        <TouchableOpacity onPress={()=>navigation.navigate('BookDetails',{book_id:item.id})}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:10 }}>
            <View style={{ backgroundColor: "#eee", borderRadius: 5, overflow: "hidden" }}>
                <Image
                  source={{uri:imgr,cache: 'force-cache'}}
                  style={{
                    height: Dimensions.get('window').height*0.2,
                    width: windowWidth*0.23
                  }}
                  // resizeMode="contain"
                />

              <View style={{height:50}}>
                <Text style={{ marginBottom: 5,marginTop:5, 
                    flexWrap: 'wrap',alignSelf:'center',width:100 }} numberOfLines={5}>{item.book_title}</Text>
              </View>
              <Text style={{ marginBottom: 5,marginLeft:3}}>
                  {item.author_name}
              </Text>
            </View>
            </View>
          </TouchableOpacity>
      </View>
    );
  };

const SoulWining = () => {
    
    const [books, setBooks] = useState();
    const [bookCategory, setBookCategory] = useState();
    const [categoryID, setCategoryID] = useState();
    const [bookDescription, setBookDescription] = useState();

    const navigation =useNavigation()


    useEffect(() => {

        const fetchData = async () => {
            const data = await getKidsBooks();
            setBooks(data.books);
            setBookCategory(data.category_name);
            setCategoryID(data.cat_id);
            setBookDescription(data.category_description);


        }
        fetchData();

        }, []);

    console.log("Category mmmm",categoryID);

    const goToTranslatedBooks=(cat)=>{
        navigation.navigate('GroupedBooks',{cat_id:cat,category:bookCategory});

    }



  return (
    <View>
        { bookCategory &&(

        <View>
            <View style={{ flexDirection: 'row',marginHorizontal:10, marginTop:15,marginBottom:15,alignContent:'space-between' }}>
            <Divider orientation="vertical" width={5} />
            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                <View style={{marginBottom:15,alignItems:'flex-start',width:windowWidth*0.7}}>
                <Text style={{marginLeft:10,fontWeight:'bold',flexWrap:'wrap'}}>{bookCategory}</Text>
                <Text style={{marginLeft:10,flexWrap:"wrap"}}>{bookDescription}</Text>
                </View>
                <View style={{marginBottom:15,alignItems:'flex-end',marginLeft:'auto',width:windowWidth*0.3}}>
                  <Button title="VIEW ALL" type="outline"  color="warning" onPress={()=>{
                        goToTranslatedBooks(categoryID);
                  }} />
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

});

export default SoulWining;