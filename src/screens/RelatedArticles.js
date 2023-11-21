import React , { useEffect, useState } from 'react';
import { View, Image, StyleSheet,FlatList ,Button,SafeAreaView,ScrollView} from 'react-native';
import { Text, Card,  Divider } from '@rneui/themed';
import { ListItem ,Avatar} from '@rneui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import {Dimensions} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { BlurView } from 'expo-blur';
import { getPastArticles, getRelatedArticles } from '../service/devotionalService';


const RelatedArticles = ({ route, navigation }) => {

  const { title } = route.params;



  const [words, setWords] = useState([]);
 
  useEffect(() => {

      const fetchData = async () => {
          const data = await getRelatedArticles(title);
          setWords(data)
      }
      fetchData();

  }, []);
return (
  <SafeAreaView>
  <ScrollView>

      {
        words.map((l, i) => {

          return (
          <TouchableOpacity onPress={()=>{navigation.navigate('ArticleDetails',{date:l.date})}}>
          <ListItem key={i} bottomDivider>
             <Image
               style={styles.image}
               source={{uri: l.image}} 
               resizeMode={"cover"} // <- needs to be "cover" for borderRadius to take effect on Android
             />
             <ListItem.Content>
               <ListItem.Title>{l.title}</ListItem.Title>
               <ListItem.Subtitle style={{color:'#999999'}}>{l.excerpt}</ListItem.Subtitle>
               <Text style={{color:'#606060'}}>{l.date}</Text>
             </ListItem.Content>
          </ListItem>
          </TouchableOpacity>
          )
        })
   }  

   </ScrollView> 

{/* <View style={{ height: 200, 
 position:'absolute', left: 40, top:630,right:40}}> */}
<BlurView intensity={100}  style={{ height: 400, 
 position:'absolute',width:Dimensions.get('window').width, top:630}}>
  <MaterialCommunityIcons style={{alignSelf:'center',marginTop:10,marginBottom:10}} name="lock" size={25} color="#F9A825" />
  <Button
        title="Unlock with a Higher Package"
        color='#F9A825'
        onPress={() => {navigation.navigate('Subscription')}}
      />

</BlurView>


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

export default RelatedArticles;