/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { SafeAreaView, useWindowDimensions, StyleSheet } from 'react-native';
import { ReaderProvider, Reader } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/file-system';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Header } from './Header';
import { TableOfContents } from './TableOfContents';
import { Footer } from './Footer';

export function Toc() {
  const { width, height } = useWindowDimensions();

  const bottomSheetRef = React.useRef<BottomSheet>(null);
  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView>
        <ReaderProvider>
          <Header
            onOpenTocList={() => bottomSheetRef.current?.snapToIndex(0)}
          />

          <Reader
            src="https://rhapsodyofrealities.b-cdn.net/app/books/epub2024-april.epub"
            width={width}
            height={height * 0.8}
            fileSystem={useFileSystem}
          />

          <TableOfContents
            ref={bottomSheetRef}
            onClose={() => bottomSheetRef.current?.close()}
          />

          <Footer />
        </ReaderProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
