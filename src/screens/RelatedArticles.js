import React , { useEffect, useState } from 'react';
import { View, Image, StyleSheet,FlatList ,Button,SafeAreaView,ScrollView} from 'react-native';
import { Text, Card,  Divider } from '@rneui/themed';
import { ListItem ,Avatar} from '@rneui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import {Dimensions} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getPastArticles, getRelatedArticles } from '../service/devotionalService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getWallet } from '../service/authService';


const RelatedArticles = ({ route, navigation }) => {

  const { title } = route.params;



  const [words, setWords] = useState([]);
  const [packageLevel, setPackageLevel] = useState();
  const [padLock, setPadLock] = useState(false);
  const [subscription_status,setSubscriptionStatus] =useState();
 
  useEffect(() => {
      const loadProfile =async()=>{
        const mail=await AsyncStorage.getItem('email');
        if(mail===null){

        }else{
          //check Read and Earn user
          const profile = await getWallet(mail);
          let pckg_level=profile.class;
          setPackageLevel(profile.class);
          setSubscriptionStatus(profile.status);
          if (pckg_level !=="" ) {
            if (pckg_level==="level1" || pckg_level==="level2") {
                setPadLock(true);
            }

            if (subscription_status===1 || pckg_level==="level1" || pckg_level==="level2") {
              setPadLock(true);

            }

          }else{//just lock it off
            setPadLock(true);
          }


        }

      }
      const fetchData = async () => {
          const data = await getRelatedArticles(title);
          setWords(data)
      }
      fetchData();
      loadProfile();

  }, []);
return (
  <SafeAreaView>
  <ScrollView showsVerticalScrollIndicator={false}>

      {
        words.map((l, i) => {

          return (
          <TouchableOpacity onPress={()=>{

            if (packageLevel !=="" ) {
              if (packageLevel==="level1" || packageLevel==="level2") {
                  setPadLock(true);
    
              }else if (subscription_status===1 || packageLevel==="level1" || packageLevel==="level2") {
                setPadLock(true);
    
              }else{
                navigation.navigate('ArticleDetails',{date:l.pdate});

              }
    
            }
            
            
            }}>
          <ListItem key={i} bottomDivider>
             <Image
               style={styles.image}
               source={{uri: l.image}} 
               resizeMode={"cover"} // <- needs to be "cover" for borderRadius to take effect on Android
             />
             <ListItem.Content>
               <ListItem.Title style={styles.RelatedArticlesTitle}>{l.title}</ListItem.Title>
               <ListItem.Subtitle style={styles.RelatedArticlesExcerpt} numberOfLines={3}>{l.excerpt}</ListItem.Subtitle>
               <Text style={styles.RelatedArticlesDate}>{l.pdate}</Text>
             </ListItem.Content>
          </ListItem>
          </TouchableOpacity>
          )
        })
   }  

{padLock &&(
  <View intensity={100}  style={{ height: 400, 
    backgroundColor: 'white',
        opacity:0.7,
    position:'absolute',width:Dimensions.get('window').width, top:630}}>
     <MaterialCommunityIcons style={{alignSelf:'center',marginTop:10,marginBottom:10}} name="lock" size={25} color="#F9A825" />
     <Button
           title="Unlock with a Higher Package"
           color='#F9A825'
           onPress={() => {navigation.navigate('Subscription')}}
         />
   
   </View>

)}

   </ScrollView> 
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
  RelatedArticlesExcerpt: {
    color:'#59626a',
    lineHeight:22,
    fontWeight :'300',
    fontSize:14
  },
  RelatedArticlesTitle : {
    fontSize:14,
    fontWeight :'600'
  },
  RelatedArticlesDate : {
    color:'#cf8d2e',
    fontSize:12 ,
    textTransform : 'uppercase'
  }
  });

export default RelatedArticles;