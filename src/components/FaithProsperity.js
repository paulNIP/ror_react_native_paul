import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  StatusBar,View,TouchableOpacity,Image,Dimensions,FlatList
} from 'react-native';
import { Divider,Button} from '@rneui/themed';
import { useNavigation } from "@react-navigation/native";
import { getFaithProsperity } from "../service/storeService";


const windowWidth = Dimensions.get('window').width;

const renderItem = ({ item }) => {

    const imgr = item.book_cover_img;

    
    return (
      <View style={{marginEnd:10,width:Dimensions.get('window').width*0.23}}>
        <TouchableOpacity onPress={()=>navigation.navigate('BookDetails',{book_id:item.aid})}>
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
              Pastor Chris Oyakhilome D.Sc., D.D.
              </Text>
            </View>
            </View>
          </TouchableOpacity>
      </View>
    );
  };

const FaithProsperity = () => {
    
    const [books, setBooks] = useState();
    const [bookCategory, setBookCategory] = useState();
    const [categoryID, setCategoryID] = useState();
    const [bookDescription, setBookDescription] = useState();

    const navigation =useNavigation()


    useEffect(() => {

        const fetchData = async () => {
            const data = await getFaithProsperity();
            setBooks(data);
            setCategoryID(data[0].cat_id);

            


        }
        fetchData();

        }, []);

    console.log("Prayer Books Good",books);

    const goToTranslatedBooks=(cat)=>{
        navigation.navigate('GroupedBooks',{cat_id:categoryID});

    }



  return (
    <View>
        { books &&(

        <View>
            <View style={{ flexDirection: 'row',marginHorizontal:10, marginTop:15,marginBottom:15,alignContent:'space-between' }}>
            <Divider orientation="vertical" width={5} />
            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                <View style={{marginBottom:15,alignItems:'flex-start',width:windowWidth*0.7}}>
                <Text style={{marginLeft:10,fontWeight:'bold',flexWrap:'wrap'}}>Faith & Prosperity</Text>
                <Text style={{marginLeft:10,flexWrap:"wrap"}}>Books on prayer by Pastor Chris Oyakhilome D.Sc., D.D.</Text>
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

export default FaithProsperity;