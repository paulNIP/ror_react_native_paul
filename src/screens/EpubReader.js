import React from "react";
import {StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useWindowDimensions } from 'react-native';
// import { Reader, ReaderProvider } from '@epubjs-react-native/core';
// import { useFileSystem } from '@epubjs-react-native/file-system'; // for Bare React Native project

const EpubReader = ({ route, navigation }) => {

  const { file } = route.params;
  

  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    const d = new Date();
    let day = weekday[d.getDay()]+" "+d.getDate;

    console.log(day);

//   const navigation = useNavigation();
  const { width, height } = useWindowDimensions();

  return (
    <ReaderProvider>
        <SafeAreaView style={styles.container}>
        {/* <Reader
            // src="https://s3.amazonaws.com/moby-dick/OPS/package.opf" 
            src={file}
            width={width}
            height={height * 0.8}
            fileSystem={useFileSystem}
            initialLocation="Friday 22"
            
          
        /> */}
        </SafeAreaView>
    </ReaderProvider>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
    },
  });

export default EpubReader;