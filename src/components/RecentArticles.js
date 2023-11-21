import React,{useState,useEffect} from 'react';
import Strings from '../constants/Strings';
import { View, StyleSheet,Text,TouchableOpacity,Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getDailyDevotional } from '../service/devotionalService';





const RecentArticles=()=> {

    const navigation = useNavigation();

    const [devotional, setDevotional] = useState([]);
    


    useEffect(() => {
  
        const fetchData = async () => {
            const data = await getDailyDevotional();
            setDevotional(data);
  
        }
        fetchData();
  
      }, []);
  
      let navigateToRelated = () => {
        navigation.navigate("Related Articles",{title:devotional[0].title})
 
      };


      const date=new Date().toISOString().slice(0, 10).toString();
      const devo=JSON.stringify(devotional);
    
      let bookmarkArticle = () => {

        
      };

    return (
        <View style={styles.container}>
            
            <View style={styles.content}>
            <TouchableOpacity style={styles.roundButton}
            onPress={()=>navigation.navigate('Past Articles')}
            >
            <MaterialCommunityIcons style={{alignSelf:'center'}} name="history" size={25} color="#F9A825" />
                <Text style={{alignSelf:'center',fontSize:12,color:'#F9A825'}}>PAST </Text>
                <Text style={{alignSelf:'center',fontSize:12,color:'#F9A825'}}>ARTICLES</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
            <TouchableOpacity style={styles.roundButton}
            onPress={navigateToRelated}
            >
                <MaterialCommunityIcons style={{alignSelf:'center'}} name="select-all" size={25} color="#F9A825" />
                <Text style={{alignSelf:'center',fontSize:12,color:'#F9A825'}}>RELATED </Text>
                <Text style={{alignSelf:'center',fontSize:12,color:'#F9A825'}}>ARTICLES</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
            <TouchableOpacity style={styles.roundButton}
            onPress={()=>navigation.navigate('Saved Articles')}
            >
                <MaterialCommunityIcons style={{alignSelf:'center'}} name="format-list-bulleted-square" size={25} color="#F9A825" />
                <Text style={{alignSelf:'center',fontSize:12,color:'#F9A825'}}>SAVED </Text>
                <Text style={{alignSelf:'center',fontSize:12,color:'#F9A825'}}>ARTICLES</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <TouchableOpacity style={styles.roundButton}
                onPress={bookmarkArticle}
                >
                    <MaterialCommunityIcons style={{alignSelf:'center'}} name="bookmark" size={25} color="#F9A825" />
                    <Text style={{alignSelf:'center',fontSize:12,color:'#F9A825'}}>SAVE</Text>
                    <Text style={{alignSelf:'center',fontSize:12,color:'#F9A825'}}>THIS ARTICLE</Text>
                </TouchableOpacity>
            </View>

            {/* receipt */}
            <View style={styles.content}> 
                <TouchableOpacity style={styles.roundButton}
                onPress={()=>navigation.navigate('Search Article')}
                >
                    <MaterialCommunityIcons style={{alignSelf:'center'}} name="file-find-outline" size={25} color="#F9A825" />
                    <Text style={{alignSelf:'center',fontSize:12,color:'#F9A825'}}>SEARCH </Text>
                    <Text style={{alignSelf:'center',fontSize:12,color:'#F9A825'}}>ARTICLES</Text>
                </TouchableOpacity>
            </View>
            
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      marginTop:10,
      justifyContent:'space-between',
      marginBottom:20,
      marginLeft:10,
      marginRight:10
    },
    content: {
        alignSelf:'center'
    },
   });

export default RecentArticles;
