import React , { useEffect, useState } from 'react';
import { View, StyleSheet,Text, FlatList,Button,ScrollView,Image, TouchableOpacity } from 'react-native';
import { Card } from '@rneui/themed';
import { getLatestBooks } from '../service/latestBooksService';
import { Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';



const LatestBooks = () => {


  const [books, setBooks] = useState([]);
  const navigation= useNavigation();
 
  useEffect(() => {

      const fetchData = async () => {
          const data = await getLatestBooks()
          setBooks(data)
      }
      fetchData();

  }, []);

 

  const renderBooks = ({ item }) => {

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
              <Text style={{ marginBottom: 5,fontSize:7,alignSelf:'center' }}>
                  By {item.author_name}
              </Text>
            </View>
            </View>
          </TouchableOpacity>
      </View>
    );
  };


return (
  <>
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <FlatList data={books} renderItem={renderBooks} numColumns={6} ItemSeparatorComponent={() => <View style={{height: 5}} />}/>
      </ScrollView>
    </View>
    
  </>
);
};

const styles = StyleSheet.create({
      container: {
        flex: 1,
        marginTop: 10,
      },
      image: {
        flex: 1,
        width: "100%",
        height: "100%",
      },
});

export default LatestBooks;