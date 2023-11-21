import React ,{useState} from "react";
import {View, TextInput,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, Card, Button, Icon } from '@rneui/themed';


const Testimony = () => {
    const navigation = useNavigation();
    const [value, onChangeText] = React.useState('Useless Multiline Placeholder');
  return (
       <View>
        <Card containerStyle={{borderRadius:5}}>
          <Image
            style={{ borderRadius:50,width:100,height:100,alignSelf:'center',marginTop:30
             }}
            source={
                require('../assets/prof.png')
            }
          />
          <Text style={{ marginBottom: 10,alignSelf:'center',marginTop:10,marginBottom:10,fontSize:18 }}>
            Share Testimony
          </Text>
          <View
            style={{
                backgroundColor: value,
                borderColor:'#89CFF0',
                borderWidth:1,
                borderRadius:5
            }}>
                <TextInput
                    multiline={true}
                    numberOfLines={8}
                    style={{marginLeft:5}}
                    placeholder="Share your testimony"
                    />

          </View>
          <Button
            buttonStyle={{
              borderRadius: 5,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
              marginTop:20
            }}
            title="Submit"
          />
        </Card>
       </View>
  );
};

export default Testimony;