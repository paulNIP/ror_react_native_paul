import React , { useEffect, useState } from 'react';
import { View, Image, StyleSheet,FlatList ,Button,} from 'react-native';
import { Text, Card,  Divider } from '@rneui/themed';
import { getWordOfMonth } from '../service/wordOfMonthService';
import { ListItem ,Avatar} from '@rneui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const WordOfMonth=()=>{

  const navigation = useNavigation();

  const [words, setWords] = useState([]);
 
  useEffect(() => {

      const fetchData = async () => {
          const data = await getWordOfMonth()
          setWords(data)
      }
      fetchData();

  }, []);

  console.log("Selected Articles",words);


    return (
        <>
        <View style={styles.container}>

            {
              words.slice(0, 4).map((l, i) => {

                return i === 0 ?
<TouchableOpacity onPress={()=>{navigation.navigate('Rhapsody of Realities',{date:l.pdate})}}>
<View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:10,marginBottom:10 }}>
<View style={{ backgroundColor: "#eee", borderRadius: 10, overflow: "hidden" }}>
    <Image
      source={{uri:l.img_url}}
      style={{
        height: 200,
        width: 'auto'
      }}
      // resizeMode="contain"
    />
  <View style={{ marginBottom:10,backgroundColor:'#FFFFFF',padding:10 }}>
    <Text style={{flexWrap: 'wrap',alignSelf:'center',marginTop:10,color:'#cf8d2e'}}>{l.postdate}</Text>
    <Text style={{flexWrap: 'wrap',alignSelf:'center',marginTop:10, fontSize:16, fontWeight :'600'}}>{l.title}</Text>
    <Divider style={{width:100, alignSelf:'center'}} color='red' width={1}/>
    <Text style={{flexWrap: 'wrap',alignSelf:'center',marginTop:10,marginBottom:20 , color:'#59626a', lineHeight:22,  fontWeight :'300', fontSize:14 }}>{l.excerpt}</Text>
  </View>
</View>
</View>
</TouchableOpacity>
              

                   :
                <TouchableOpacity onPress={()=>{navigation.navigate('Rhapsody of Realities',{date:l.pdate})}}>
                <ListItem key={i} bottomDivider>
                   <Image
                     style={styles.image}
                     source={{uri: l.img_url}} 
                     resizeMode={"cover"} // <- needs to be "cover" for borderRadius to take effect on Android
                   />
                   <ListItem.Content>
                     <ListItem.Title style={{fontSize:14, fontWeight :'600'}}>{l.title}</ListItem.Title>
                     <ListItem.Subtitle style={styles.excert}   numberOfLines={4}>{l.excerpt}</ListItem.Subtitle>
                     <Text style={{color:'#cf8d2e', fontSize:12 , textTransform : 'uppercase'  }}>{l.postdate}</Text>
                   </ListItem.Content>
                </ListItem>
                </TouchableOpacity>
              })
         }   

          <TouchableOpacity style={{backgroundColor:'#D8A623',
               alignSelf:'center',marginTop:15,borderRadius:5}} onPress={()=>{
                navigation.navigate('RhapsodyNews');
               }}>
            <Text style={{color:'#FFFFFF',fontWeight:'bold',padding:10,alignSelf:'center'}}>
              More from Rhapsody News
            </Text>
          </TouchableOpacity>

          

        </View>
    </>
    );
}

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
      width: windowWidth*0.2,
      height: windowHeight*0.12,
      borderRadius: 15
    },
    name: {
      fontSize: 16,
      marginTop: 5,
    },
    excert :{
        color:'#59626a',
        lineHeight:22,
        fontWeight :'300',
        fontSize:14
    }
    });

export default WordOfMonth;