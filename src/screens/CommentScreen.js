import React from "react";
import {View, Text,ScrollView,TextInput,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from '@rneui/themed';
import {Dimensions} from 'react-native';


const CommentScreen = () => {
    const navigation = useNavigation();
    const [text, onChangeText] = React.useState('Useless Text');
  return (
       <View>
        <ScrollView>
          <View style={{flexDirection:'row'}}>

          <Image style={{width:40,height:40,borderRadius:25,marginLeft:10}}
        source={require('../assets/greybands.jpeg')} />
           <TextInput
        
        onChangeText={onChangeText}
        value={text}
        style={{width:Dimensions.get('window').width*0.7,marginLeft:10}}
      />
          <TouchableOpacity style={{width:Dimensions.get('window').width*0.1}}>
            <Icon style={{ alignSelf:'center'}} name="send" type="material-community" color="grey" />
          </TouchableOpacity>
          </View>

        </ScrollView>
       </View>
  );
};

export default CommentScreen;