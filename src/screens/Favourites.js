import React,{useState,useEffect} from "react";
import {SafeAreaView,View, Text,
  StatusBar,FlatList,Image,StyleSheet,TouchableOpacity,ScrollView,Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NetworkInfo } from "react-native-network-info";
import { DatabaseConnection } from "../database/database-connection";
import { ListItem ,Avatar} from '@rneui/themed';
import { Divider } from "react-native-paper";


const Favourites = () => {
  const navigation = useNavigation();
  const db = DatabaseConnection.getdb();

  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM favourite_books',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            // console.log("Favourite SQL Book",results.rows.item(i));
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        }
      );
    });

    console.log("Favourite Books now",flatListItems);

  }, []);

  let listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.2,
          width: '100%',
          backgroundColor: '#808080'
        }}
      />
    );
  };

  let listItemView = (item) => {
    const imgr = item.image;

    return (
      <View style={{marginEnd:10,width:120,alignContent:"space-between",marginStart:10,marginTop:5}}>
      <TouchableOpacity >
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
                <Text style={{ marginBottom: 5,marginTop:5,fontSize:10, 
                  flexWrap: 'wrap',alignSelf:'center',width:100 }} numberOfLines={5}>{item.title}</Text>
              </View>
              <View style={{flexDirection:"row"}}>
                <Text style={{ marginBottom: 5,marginTop:5,fontSize:10, 
                  flexWrap: 'wrap',alignSelf:'center',width:100 }} numberOfLines={5}>{item.title}</Text>
              </View>


            </View>
            </View>
        </TouchableOpacity>
    </View>
    );
  };

  return (
        <>
        <SafeAreaView style={{ flex: 1 }}>
        <ScrollView >
          <View >
          
            {
              flatListItems.map((l, i) => {
                const img_url=l.book_cover_img;

                return (
                <TouchableOpacity >
                <ListItem key={i} bottomDivider>
                   <Image
                     style={styles.image}
                     source={{uri: l.image}} 
                     resizeMode={"cover"} // <- needs to be "cover" for borderRadius to take effect on Android
                   />
                   <ListItem.Content>
                     <ListItem.Title numberOfLines={2}>{l.book_title}</ListItem.Title>

                     <ListItem.Subtitle style={{color:'#999999'}}numberOfLines={3}>{l.book_description}</ListItem.Subtitle>
                     <Divider style={{width:'auto'}} color='red' width={5}/>
                     <Text style={{color:'#606060'}}>By {l.book_author_name}</Text>
                   </ListItem.Content>
                </ListItem>
                </TouchableOpacity>
                )

              })
         }   

          </View>
          </ScrollView>
        </SafeAreaView>
        </>
  );
};


const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width*0.25,
    height: Dimensions.get('window').height*0.18,
    borderRadius: 5
  },

  });

export default Favourites;