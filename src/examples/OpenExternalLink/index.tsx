import * as React from 'react';
import { Linking, SafeAreaView, useWindowDimensions } from 'react-native';
import { Reader, ReaderProvider } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/file-system';

export function OpenExternalLink() {
  const { width, height } = useWindowDimensions();

  return (
    <SafeAreaView>
      <ReaderProvider>
        <Reader
          src="https://rhapsodyofrealities.b-cdn.net/app/books/epub2024-april.epub"
          width={width}
          height={height}
          fileSystem={useFileSystem}
          initialLocation="pr01s04.xhtml"
          onPressExternalLink={(url) => {
            Linking.openURL(url);
          }}
        />
      </ReaderProvider>
    </SafeAreaView>
  );
}
