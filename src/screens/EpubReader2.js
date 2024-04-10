import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, Platform,ActivityIndicator } from 'react-native';
import { SafeAreaView, useWindowDimensions } from 'react-native';
import { Reader, ReaderProvider } from '@epubjs-react-native/core';
import {
  ReadiumView
} from 'react-native-readium';
import RNFS from 'react-native-fs';


import { ReaderButton } from './ReaderButton';
import { TableOfContents } from './TableOfContents';
import { ReaderSetting as ReaderSettings } from './ReaderSetting'
import { Notes } from './Notes';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';

import {
  Settings,
  Appearance,
} from 'react-native-readium';



const EpubReader2  = ({route}) => {

  const DEFAULT_SETTINGS = new Settings();
  DEFAULT_SETTINGS.appearance = Appearance.DEFAULT;

  const file2=route.params.file2;
  const init=route.params.init;

  console.log("initBwoyFile2",file2);
  console.log("initBwoy",init.toUpperCase());



  const EPUB_URL = route.params;
  const EPUB_PATH = `${RNFS.DocumentDirectoryPath}/`+file2.split("/").pop();

  console.log("Passed content",EPUB_PATH);

  const { width, height } = useWindowDimensions();


  useEffect(() => {
    async function run() {

      if (Platform.OS === 'web') {
        setFile({
          url: file2,
          initialLocation: INITIAL_LOCATION,
        });
      } else {
        const exists = await RNFS.exists(EPUB_PATH);
        if (!exists) {
          console.log(`Downloading file: '${EPUB_URL}'`);
          const { promise } = RNFS.downloadFile({
            fromUrl: file2,
            toFile: EPUB_PATH,
            background: true,
            discretionary: true,
          });

          // wait for the download to complete
          await promise;
        } else {
          console.log(`File already exists. Skipping download.`);
        }

        setFile({
          url: EPUB_PATH,
          initialLocation: INITIAL_LOCATION,
        });
      }
    }

    run()
  }, []);

//   if (file) {
    return (
    //   <View style={styles.container}>
    //     <View style={styles.controls}>
    //       <View style={styles.button}>
    //         <TableOfContents
    //           items={toc}
    //           onPress={ 
    //             (loc) => {
    //               let location=loc.href;
    //               var title3 =loc.title;
    //               console.log("Location",location);
    //               console.log("Location Object ",title3);
    //               setLocation(loc);
    //             }
 
    //           }
    //         />
    //       </View>
    //       <View style={styles.button}>
    //         {/* <Notes
    //           items={toc}
    //           onPress={(loc) => {
    //             const location=loc.href;
    //             const title =loc.title;

    //             // setLocation({ href: location, type: 'application/xhtml+xml', title: title })
    //             (locator: Locator) => setLocation(locator)
    //           }
    //           }
    //         /> */}
    //       </View>
    //       <View style={styles.button}>
    //         <ReaderSettings
    //           settings={settings}
    //           onSettingsChanged={(s) => setSettings(s)}
    //         />
    //       </View>
    //     </View>

    //     <View style={styles.reader}>
          
    //       <View style={styles.readiumContainer}>
    //         <Epub
    //             src={EPUB_PATH}
    //             ref={(epub) => this.epub = epub}
    //             flow={'paginated'}
    //             onLoadComplete={(numPages, epub) => {
    //                 const toc = epub.getToc();
    //                 console.log('Table of Contents:', toc);
    //             }}
    //             />
    //       </View>
          
    //     </View>
    //   </View>
      <SafeAreaView>
        <ReaderProvider>
            <Reader
            src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
            width={width}
            height={height}
            fileSystem={useFileSystem}
            />
        </ReaderProvider>
    </SafeAreaView>
    );
//   }

//   return (
//     <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
//       <ActivityIndicator
//             style={{ height: 80 }}
//             color="#FFFFFF"
//             size="large"
//         />
//         <Text style={{alignSelf:'center'}}>Downloading File ...</Text>
//     </View>
//   );
}

const styles = StyleSheet.create({
  container: {
    // height: Platform.OS === 'web' ? '100vh' : '100%',
  },
  reader: {
    flexDirection: 'row',
    width: '100%',
    height: '95%',
  },
  readiumContainer: {
    width: Platform.OS === 'web' ? '80%' : '100%',
    height: '97%',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    margin: 10,
  },
});

export default EpubReader2;