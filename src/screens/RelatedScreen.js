import React , { useEffect, useState } from 'react';
import { View, Image, StyleSheet,FlatList ,Button,ScrollView} from 'react-native';
import { Text, Card,  Divider } from '@rneui/themed';
import { getWordOfMonth } from '../service/wordOfMonthService';
import { ListItem ,Avatar} from '@rneui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


const RelatedScreen=(props)=>{


  const navigation = useNavigation();
  


  const renderVideoItem = ({ item }) => {

    const video_url = item.url;

    
    return (
      <View style={styles.container}>
         <TouchableOpacity onPress={()=>{navigation.navigate('Article')}}>
                <ListItem bottomDivider>
                   <Image
                     style={styles.image}
                     source={{uri: item.thumbnail}} 
                     resizeMode={"cover"} // <- needs to be "cover" for borderRadius to take effect on Android
                   />
                   <ListItem.Content>
                     <ListItem.Title>{item.title}</ListItem.Title>
                     <ListItem.Subtitle style={{color:'#999999'}}>{item.description}</ListItem.Subtitle>
                   </ListItem.Content>
                </ListItem>
                </TouchableOpacity>
     </View>
    );
  };

 

  


    return (
        <>
        <View style={styles.container}>
           <ScrollView>
           {props.map((prop, index) => (
            <View key={index}>
              <Text>Type: {prop.title}</Text>
              <Text>Age: {prop.age}</Text>
            </View>
          ))}
           <FlatList data={props.relatedVideos} renderItem={renderVideoItem} />

            </ScrollView>
            
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
      width: 100,
      height: 100,
      borderRadius: 15
    },
    name: {
      fontSize: 16,
      marginTop: 5,
    },
    });

export default RelatedScreen;