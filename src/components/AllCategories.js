import React ,{useState,useEffect} from "react";
import {View,FlatList,Image,ScrollView, Text,TouchableOpacity,StyleSheet,ActivityIndicator} from 'react-native';
import RNFS from 'react-native-fs';
import { DatabaseConnection } from '../database/database-connection';
import {Dimensions} from 'react-native';
import { getCategories } from "../service/storeService";



const db = DatabaseConnection.getdb();


const AllCategories = ({navigation }) => {



  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;



  const capitalize=(str)=>{
    //capitalize
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


useEffect(() => {
      const fetchData = async () => {
          const data = await getCategories();
          setBooks(data);
          setIsLoading(false);

      }
      fetchData();
      navigation.setOptions({
        title: capitalize('Book Categories'),
      });

    }, [navigation]);

  console.log("All Book Books",books);

  const renderBooks = ({ item }) => {
  
    const name =item.category_name;
    const ttl = item.total_books;
    const imgr =item.category_image;
    const id=item.cid;



    return (

      <View style={{marginEnd:10,width:windowWidth*0.3,marginBottom:10,marginRight:"auto"}}>
        <TouchableOpacity onPress={()=>{
            navigation.navigate('GroupedBooks',{cat_id:id});}}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:10 }}>
            <View style={{ backgroundColor: "#eee", borderRadius: 5, overflow: "hidden" }}>
                <Image
                  source={{uri:imgr}}
                  style={{
                    height: windowHeight*0.20,
                    width: windowWidth*0.3
                  }}
                  // resizeMode="contain"
                />
              <View >
                <Text style={{ marginBottom: 5,marginTop:5, flexWrap: 'wrap',
                alignSelf:'center' }} numberOfLines={2}>{name}</Text>
                <Text style={{ marginBottom: 5,marginTop:5,fontSize:12, flexWrap: 'wrap',
                alignSelf:'center' }} numberOfLines={2}>({ttl}) items</Text>
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
    //   backgroundColor: '#D8D9DA',
    },
    
    buttons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },

    scrollViewContainer: {},

    row: {
        flex: 1,
        justifyContent: "space-around",
        alignSelf:'center'
      }
  });




  return (
    <View style={styles.container}>
          <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} 
           contentContainerStyle={{ flexGrow: 1, justifyContent: 'center',marginTop:5 }}>
            <View style={styles.scrollViewContainer}>
                <FlatList data={books} renderItem={renderBooks} numColumns={3} columnWrapperStyle={styles.row}
                contentContainerStyle={{padding:'auto',marginLeft:"auto"}}  />
            </View>

          </ScrollView>

        
    </View>
  );
};





export default AllCategories;