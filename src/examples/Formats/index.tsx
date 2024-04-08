import * as React from 'react';
import * as DocumentPicker from 'expo-document-picker';
import {
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,StyleSheet
} from 'react-native';
import { Reader, ReaderProvider,useReader } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/file-system';
import { Header } from '@rneui/themed';
import { Header as HeaderRNE, HeaderProps, Icon } from '@rneui/themed';


import base64 from './base64';


const epub =
  'https://rhapsodyofrealities.b-cdn.net/app/books/epub2024-april.epub';
  // const epub ='https://epubjs-react-native.s3.amazonaws.com/failing-forward.epub';
const opf = 'https://s3.amazonaws.com/moby-dick/OPS/package.opf';

function Inner() {
  const { width, height } = useWindowDimensions();
  const { goNext, goPrevious } = useReader();
  // const handleAddMark = (text, cfiRange) => {
  //   addMark(text, cfiRange);
  // };
  return (
    <SafeAreaView style={{ flex: 1 }}>
       <HeaderRNE
      leftComponent={{
        icon: 'menu',
        color: '#fff',
      }}
      rightComponent={
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={()=>{}}>
              <Icon name="description" color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={()=>{}}
            >
              <Icon type="antdesign" name="rocket1" color="white" />
            </TouchableOpacity>
          </View>
      }
      centerComponent={{ text: 'Header', style: styles.heading }}
    />
      <TouchableOpacity onPress={() => goPrevious()}>
        <Text>Previous</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => goNext()}>
        <Text>Next</Text>
      </TouchableOpacity>
      <Reader
        src={epub}
        width={width}
        enableSelection={true}
        enableSwipe={true}
        height={height}
        fileSystem={useFileSystem}
      />
    </SafeAreaView>
  );
}

export function Formats() {
  const { width, height } = useWindowDimensions();
  const [src, setSrc] = React.useState(epub);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.options}>
        <TouchableOpacity onPress={() => setSrc(opf)}>
          <Text>Book (.opf)</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSrc(epub)}>
          <Text>Book (.epub)</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSrc(base64)}>
          <Text>Book (base64)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Instructions',
              'To make this work copy the books (.epub) located on your computer and paste in the emulator',
              [
                {
                  text: 'Ok',
                  onPress: async () => {
                    const { assets } = await DocumentPicker.getDocumentAsync();

                    if (assets && assets[0].uri) setSrc(assets[0].uri);
                  },
                },
              ]
            );
          }}
        >
          <Text>Book (local)</Text>
        </TouchableOpacity>
      </View>

      <ReaderProvider>
        <Inner/>
      </ReaderProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#397af8',
    marginBottom: 20,
    width: '100%',
    paddingVertical: 15,
  },
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
  },
  subheaderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  options: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  currentFormat: {
    textAlign: 'center',
  },
  });
  

