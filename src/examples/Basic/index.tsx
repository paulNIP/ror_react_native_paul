import  React,{useEffect, useState} from 'react';
import { SafeAreaView,ActivityIndicator,View,Text,TouchableOpacity, useWindowDimensions } from 'react-native';
import { Reader, ReaderProvider,useReader } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/file-system';
import RNFS from 'react-native-fs';


export function Basic() {
  const { width, height } = useWindowDimensions();

  const[appFile,setAppFile]=useState(false);
  

  const file ='https://rhapsodyofrealities.b-cdn.net/app/books/epub2024-april.epub';
  const EPUB_PATH = `${RNFS.DocumentDirectoryPath}/`+file.split("/").pop();
  const epub =
  'https://rhapsodyofrealities.b-cdn.net/app/books/epub2024-april.epub';

  useEffect(() => {
    async function run() {


        const exists = await RNFS.exists(EPUB_PATH);

        if (!exists) {
          console.log(`Downloading file: '${file}'`);
          const { promise } = RNFS.downloadFile({
            fromUrl: file,
            toFile: EPUB_PATH,
            background: true,
            discretionary: true,
          });

          // wait for the download to complete
          await promise;

          
        } else {
          setAppFile(true);
          console.log(`File already exists. Skipping download.`);
        }
    }

    run()
  }, []);

  function Inner() {
    const { width, height } = useWindowDimensions();
    const { goNext, goPrevious } = useReader();
    // const handleAddMark = (text, cfiRange) => {
    //   addMark(text, cfiRange);
    // };
    return (
      <SafeAreaView style={{ flex: 1 }}>
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

  if(appFile){
    return (
      <SafeAreaView>
        <ReaderProvider>
          <Inner/>
        </ReaderProvider>
      </SafeAreaView>
    );

  }


    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator
              style={{ height: 80 }}
              color="#FFFFFF"
              size="large"
          />
          <Text style={{alignSelf:'center'}}>Downloading File ...</Text>
      </View>
    );




}
