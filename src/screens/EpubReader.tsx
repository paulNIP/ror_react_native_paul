import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, Platform,ActivityIndicator } from 'react-native';
import {
  ReadiumView
} from 'react-native-readium';
import type { Link, Locator, File } from 'react-native-readium';
import RNFS from 'react-native-fs';

// import RNFS from '../utils/RNFS';
// import {
//   EPUB_URL,
//   EPUB_PATH,
//   INITIAL_LOCATION,
//   DEFAULT_SETTINGS,
// } from '../consts';
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




type RootStackParamList = {
  EpubReader: { file2: string,init:string };
};

type MyScreenRouteProp = RouteProp<RootStackParamList, 'EpubReader'>;

interface MyScreenProps {
  route: MyScreenRouteProp;
}



export const EpubReader: React.FC<MyScreenProps> = ({route}) => {

  const DEFAULT_SETTINGS = new Settings();
  DEFAULT_SETTINGS.appearance = Appearance.DEFAULT;

  const file2=route.params.file2;
  const init=route.params.init;

  console.log("initBwoyFile2",file2);
  console.log("initBwoy",init.toUpperCase());

  const INITIAL_LOCATION: Locator = {
    href: '/OEBPS/Text/february-2024-epub.xhtml',
    title: init.toUpperCase(),
    type: 'application/xhtml+xml',
    target: 27,
    locations: {
      position: 24,
      progression: 0,
      totalProgression: 0.03392330383480826
    },
  };

  const EPUB_URL = route.params;
  const EPUB_PATH = `${RNFS.DocumentDirectoryPath}/`+file2.split("/").pop();

  console.log("Passed content",EPUB_PATH);

  const [toc, setToc] = useState<Link[] | null>([]);
  const [file, setFile] = useState<File>();
  const [location, setLocation] = useState<Locator | Link>();
  const [settings, setSettings] = useState<Partial<Settings>>(DEFAULT_SETTINGS);
  const ref = useRef<any>();

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

  if (file) {
    return (
      <View style={styles.container}>
        <View style={styles.controls}>
          <View style={styles.button}>
            <TableOfContents
              items={toc}
              onPress={ 
                (loc) => {
                  let location=loc.href;
                  let title3 =loc.title;
                  console.log("Location",location);
                  console.log("Location Object ",title3);
                  let goTo ={
                    href: '/OEBPS/Text/february-2024-epub.xhtml',
                    title: title3,
                    type: 'application/xhtml+xml',
                    target: 27,
                    locations: {
                      position: 24,
                      progression: 0,
                      totalProgression: 0.03392330383480826
                    },
                  };
                  setLocation(goTo);

                  
                }
 
              }
            />
          </View>
          <View style={styles.button}>
            <Notes
              items={toc}
              onPress={(loc) => {
                const location=loc.href;
                const title =loc.title;

                // setLocation({ href: location, type: 'application/xhtml+xml', title: title })
                (locator: Locator) => setLocation(locator)
              }
              }
            />
          </View>
          <View style={styles.button}>
            <ReaderSettings
              settings={settings}
              onSettingsChanged={(s) => setSettings(s)}
            />
          </View>
        </View>

        <View style={styles.reader}>
          {Platform.OS === 'web' ? (
            <ReaderButton
              name="chevron-left"
              style={{ width: '10%' }}
              onPress={() => ref.current?.prevPage()}
            />
          ) : null}
          <View style={styles.readiumContainer}>
            <ReadiumView
              ref={ref}
              file={file}
              location={location}
              settings={settings}
              onLocationChange={(locator: Locator) => setLocation(locator)}
              onTableOfContents={(toc: Link[] | null) => {
                if (toc) setToc(toc)
              }}
            />
          </View>
          {Platform.OS === 'web' ? (
            <ReaderButton
              name="chevron-right"
              style={{ width: '10%' }}
              onPress={() => ref.current?.nextPage()}
            />
          ) : null}
        </View>
      </View>
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
    height: '100%',
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

export default EpubReader;