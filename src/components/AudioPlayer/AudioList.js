import React ,{useState} from 'react';
import { StyleSheet, FlatList,SafeAreaView,ScrollView,ActivityIndicator,RefreshControl, } from 'react-native';
import { songs } from './mocks';
import AudioItem from './AudioItem';
import AudioBottom from './AudioBottom';
import AudioModal from './AudioModal';

import useSound from '../../hooks/useSound';
import useSoundNotifications from '../../hooks/useSoundNotifications';

const AudioList = () => {
  const {
    duration,
    setSource,
    play,
    pause,
    position,
    progress,
    isPlay,
    playFromPosition,
    setFinishFunc,
  } = useSound();

  const { pushNotification, setAction } = useSoundNotifications();

  const [selected, setSelected] = React.useState(null);
  const [modal, setModal] = React.useState(false);
  const [audio, setAudio] = useState();

  // getting current month
  const month=new Date().getMonth();

  useEffect(() => {

    const fetchData = async () => {
        const data = await getBookDetails(book_id);
        setAudio(data);

    }
    fetchData();

  }, []);

  function playSound(index, shouldPlay) {
    if (index !== null) {
      setSource({ uri: songs[index].url, shouldPlay });
    } else {
      setSource(null);
    }

    setSelected(index);
  }

  const onSelect = (index) => {
    if (index === selected) index = null;
    playSound(index, selected === null || isPlay);
  };

  const prev = () => {
    const index = selected === 0 ? songs.length - 1 : selected - 1;
    playSound(index, isPlay);
  };

  const next = () => {
    const index = selected === songs.length - 1 ? 0 : selected + 1;
    playSound(index, isPlay);
  };

  React.useEffect(() => {
    setFinishFunc(() => next.bind(this));
  }, []);

  React.useEffect(() => {
    selected &&
      pushNotification({
        title: songs[selected].title,
        position,
        duration,
        isPlay,
        pause,
      });
    setAction(() => (isPlay ? pause : play));
  }, [position, isPlay]);
  



  return (
      <>
      {/* <Button title="push" onPress={pushMusicNotification}></Button> */}
      <ScrollView>
      <FlatList 
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <AudioItem
            item={item}
            isPlay={isPlay}
            selected={index === selected}
            onSelect={() => onSelect(index)}
          />
        )}
      />

      {refreshing ? <ActivityIndicator /> : null}
          <FlatList
            data={userData}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            enableEmptySections={true}
            renderItem={ItemView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={loadUserData} />
            }
          />


      {selected !== null && (
        <AudioBottom
          item={songs[selected]}
          progress={progress}
          onPress={() => setModal(!modal)}
          isPlay={isPlay}
          play={play}
          pause={pause}
        />
      )}
      {selected !== null && (
        <AudioModal
          item={songs[selected]}
          duration={duration}
          visible={modal}
          close={() => setModal(!modal)}
          progress={progress}
          position={position}
          isPlay={isPlay}
          pause={pause}
          play={play}
          prev={prev}
          next={next}
          playFromPosition={playFromPosition}
          index={selected}
          images={songs.map((el) => el.preview)}
        />
      )}

</ScrollView>
    </>

  );
};

const styles = StyleSheet.create({});

export default AudioList;
