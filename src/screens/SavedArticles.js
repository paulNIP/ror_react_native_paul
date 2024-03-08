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