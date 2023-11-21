import React , { useEffect, useState } from 'react';
import { View, Image,SafeAreaView,FlatList, StyleSheet,Button,TouchableOpacity} from 'react-native';
import { Text, Card,  Divider } from '@rneui/themed';
import { ListItem ,Avatar} from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { getWordOfMonth } from '../service/wordOfMonthService';


const SavedArticles = () => {


  const navigation = useNavigation();

  const [words, setWords] = useState([]);

  const date='';
 
  useEffect(() => {

      const fetchData = async () => {
          const data = await getWordOfMonth();
          setWords(data)
      }
      fetchData();

  }, []);


  let [flatListItems, setFlatListItems] = useState([]);


  let listItemView = (item) => {
    // const obj=JSON.parse(item.article_json);
    // console.log(obj[0].title);
    return (
      <View
        key={item.user_id}
        style={{ backgroundColor: '#EEE', marginTop: 20, padding: 30, borderRadius: 10 }}>
        <Text style={styles.textheader}>Código</Text>
        <Text style={styles.textbottom}>{item.row_id}</Text>

        <Text style={styles.textheader}>Nome</Text>
        <Text style={styles.textbottom}>{JSON.stringify(item.article_json)}</Text>

        <Text style={styles.textheader}>Contato</Text>
        <Text style={styles.textbottom}>{item.article_date_key}</Text>

      </View>
    );
  };

  return (
//     <>
//     <View style={styles.container}>

//         {
//           words.map((l, i) => {

//             return i === 0 ?
// <TouchableOpacity onPress={()=>{navigation.navigate('Article')}}>
// <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:10,marginBottom:10 }}>
// <View style={{ backgroundColor: "#eee", borderRadius: 10, overflow: "hidden" }}>
// <Image
//   source={{uri:l.img_url}}
//   style={{
//     height: 200,
//     width: 'auto'
//   }}
//   // resizeMode="contain"
// />
// <View style={{ marginBottom:10,backgroundColor:'#FFFFFF',padding:10 }}>
// <Text style={{flexWrap: 'wrap',alignSelf:'center',marginTop:10,color:'#999999'}}>{l.postdate}</Text>
// <Text style={{flexWrap: 'wrap',alignSelf:'center',marginTop:10}}>{l.title}</Text>
// <Divider style={{width:100, alignSelf:'center'}} color='red' width={2}/>
// <Text style={{flexWrap: 'wrap',alignSelf:'center',marginTop:10,marginBottom:20}}>{l.excerpt}</Text>

// </View>
// </View>
// </View>
// </TouchableOpacity>
          

//                :
//             <TouchableOpacity onPress={()=>{navigation.navigate('Article')}}>
//             <ListItem key={i} bottomDivider>
//                <Image
//                  style={styles.image}
//                  source={{uri: l.img_url}} 
//                  resizeMode={"cover"} // <- needs to be "cover" for borderRadius to take effect on Android
//                />
//                <ListItem.Content>
//                  <ListItem.Title>{l.title}</ListItem.Title>
//                  <ListItem.Subtitle style={{color:'#999999'}}>{l.excerpt}</ListItem.Subtitle>
//                  <Text style={{color:'#606060'}}>{l.postdate}</Text>
//                </ListItem.Content>
//             </ListItem>
//             </TouchableOpacity>
//           })
//      }   

      
//         <Button
//           title="More from Rhapsody News"
//           color='#F9A825'
//           onPress={() => Alert.alert('Simple Button pressed')}
//         />
//     </View>
// </>

<SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ marginTop: 30 }}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={flatListItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom:15
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
  });

export default SavedArticles;