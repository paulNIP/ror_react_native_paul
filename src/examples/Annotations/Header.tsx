/* eslint-disable @typescript-eslint/no-use-before-define */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { useReader } from '@epubjs-react-native/core';
import { IconButton } from 'react-native-paper';

interface Props {
  onOpenBookmarksList: () => void;
  onOpenThemeList: () => void;
  onOpenSearchList: () => void;
  onOpenFontSettings: () => void;

}



export function Header({ onOpenBookmarksList,onOpenThemeList,onOpenSearchList,onOpenFontSettings }: Props) {
  const navigation = useNavigation();
  const {
    bookmarks,
    isBookmarked,
    addBookmark,
    removeBookmark,
    getCurrentLocation,
  } = useReader();

  const handleChangeBookmark = () => {
    const location = getCurrentLocation();
    console.log(location);

    if (!location) return;

    if (isBookmarked) {
      const bookmark = bookmarks.find(
        (item) =>
          item.location.start.cfi === location?.start.cfi &&
          item.location.end.cfi === location?.end.cfi
      );

      if (!bookmark) return;
      removeBookmark(bookmark);
    } else addBookmark(location);
  };




  return (
    <View style={styles.container}>
      <IconButton
        icon="menu"
        size={22}
        onPress={() => navigation.goBack()}
      />

      <View style={styles.actions}>
        <IconButton
          icon='arrow-left'
          size={20}
          animated
          onPress={handleChangeBookmark}
        /> 

        <IconButton
          icon='note-plus'
          size={20}
          animated
          onPress={handleChangeBookmark}
        /> 

        <IconButton
          icon='cog'
          size={20}
          animated
          onPress={onOpenThemeList}
        /> 
        <IconButton
          icon='lead-pencil'
          size={20}
          animated
          onPress={handleChangeBookmark}
        /> 

        <IconButton
          icon='magnify'
          size={20}
          animated
          onPress={onOpenSearchList}
        />    

        <IconButton
          icon={isBookmarked ? 'bookmark' : 'bookmark-outline'}
          size={20}
          animated
          onPress={handleChangeBookmark}
        />

        <IconButton
          icon="format-list-bulleted-square"
          size={20}
          animated
          onPress={onOpenBookmarksList}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    // marginBottom:20,
    // marginTop:20
  },
  themeIcon: {
    width: 24,
    height: 24,
    borderRadius: 32,
    borderColor: '#000',
    borderWidth: 2,
    marginRight: 10,
  },
  actions: {
    alignItems:'flex-end',
    display: 'flex',
    flexDirection: 'row',
  },
});
