import React, { useState } from 'react';
import { Text, ScrollView,View,TextInput,StyleSheet } from 'react-native';
import { ListItem, Overlay, Icon } from '@rneui/themed';
import type { Link } from 'react-native-readium';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export interface NotesProps {
  items?: Link[] | null;
  onPress?: (locator: Link) => void;
}

export const Notes: React.FC<NotesProps> = ({
  items: externalItems,
  onPress,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onToggleOpen = () => setIsOpen(!isOpen);
  const items = externalItems || [];

  const [text, onChangeText] = React.useState('Useless Text');
  const [title, onChangeTitle] = React.useState('');
  const [note, onChangeNote] = React.useState('');

  return (
    <>
       <MaterialCommunityIcons
        name="file-plus"
        // type="font-awesome"
        color='#D8A623'
        size={30}
        onPress={onToggleOpen}
      />
      <Overlay
        isVisible={isOpen}
        onBackdropPress={onToggleOpen}
        overlayStyle={{
          width: '90%',
          marginVertical: 100,
        }}
      >
        <ScrollView>
          <View style={{backgroundColor:'#007CC0',height:40,alignContent:'center',justifyContent:'center'}}>
            <Text style={{color:'#FFFFFF',alignSelf:'center'}}>NOTES</Text>
            
          </View>
          <View style={{flexDirection:'row'}}>
            <View>
                <MaterialCommunityIcons
                    name="check-circle"
                    // type="font-awesome"
                    color='#B2D2A4'
                    size={30}
                    onPress={onToggleOpen}
                />
            </View>
            <View>
                <MaterialCommunityIcons
                    name="delete"
                    // type="font-awesome"
                    size={30}
                    onPress={onToggleOpen}
                />
            </View>
          </View>
          <View style={{backgroundColor:'#B6B6B4'}}>
            <TextInput
                    style={styles.input}
                    onChangeText={onChangeTitle}
                    value={title}
                    placeholder="Title"
                    
                />
          </View>
          
          <TextInput
                style={styles.input2}
                onChangeText={onChangeNote}
                value={note}
                placeholder="Note"
                multiline={true}
                
            />
        </ScrollView>
      </Overlay>
    </>
  );
}

const styles = StyleSheet.create({
    input: {
      height: 30,
      margin: 12,
      alignItems:'center'
    },
    input2: {
        height: 300,
        margin: 12,
        padding: 10,
       
      },
  });
  
  export default Notes;