import * as React from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { Reader, ReaderProvider, useReader } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/file-system';
import { styles } from './styles';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header as HeaderRNE, HeaderProps, Icon } from '@rneui/themed';

function Inner() {
  const { width, height } = useWindowDimensions();
  const { search, searchResults, goToLocation } = useReader();
  const [term, setTerm] = React.useState('');

  return (
      <SafeAreaProvider>
      <View style={styles.options}>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Type a name to Search"
            onChangeText={(text) => setTerm(text)}
          />

          <TouchableOpacity
            onPress={() => {
              search(term);
            }}
          >
            <Text>Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Reader
        src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
        width={width}
        height={height * 0.5}
        fileSystem={useFileSystem}
      />

      <FlatList
        data={searchResults}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => goToLocation(item.cfi)}>
            <Text>{item.excerpt}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaProvider>

  );
}

export function Search() {
  return (
    <ReaderProvider>
      <Inner />
    </ReaderProvider>
  );
}
