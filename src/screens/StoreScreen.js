import React  , { useEffect, useState } from 'react';
import {View, Text,SafeAreaView,ScrollView,StyleSheet, StatusBar,TouchableOpacity,Image,FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Divider} from '@rneui/themed';
import { Button } from '@rneui/themed';



import { getBooks
  //  getCategories, getChildrenDevotional, getChistianLiving,
  //  getDivineHealing, getHolySpirit, getPopularBooks, getPrayer, getProsperity, getSoulWining,
  //   getTeenDevotional, getTranslatedBooks
  
  } from "../service/storeService";


const StoreScreen = ({ navigation }) => {

  const [books, setBooks] = useState([]);




  const renderCategories = ({ item }) => {

    const imgr = item.category_image;

    return (
      <View style={{marginEnd:10,width:100}}>
        <TouchableOpacity onPress={()=>navigation.navigate('Book List',{cat_id:item.cid})}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:10 }}>
            <View style={{ backgroundColor: "#eee", borderRadius: 5, overflow: "hidden" }}>
                <Image
                  source={{uri:imgr,cache: 'force-cache'}}
                  style={{
                    height: 150,
                    width: 100
                  }}
                  // resizeMode="contain"
                />


              <View style={{height:50}}>
                <Text style={{ marginBottom: 5,marginTop:5,fontSize:10, flexWrap: 'wrap',alignSelf:'center',width:100 }} numberOfLines={5}>{item.category_name}</Text>
              </View>
              <Text style={{ marginBottom: 5,fontSize:10}}>
                  [ {item.total_books} ] item(s) {item.cat_id}
              </Text>
            </View>
            </View>
          </TouchableOpacity>
      </View>
    );
  };

  const renderProsperity = ({ item }) => {

    const imgr = item.book_cover_img;

    
    return (
      <View style={{marginEnd:10,width:100}}>
        <TouchableOpacity onPress={()=>navigation.navigate('BookDetails',{book_id:item.id})}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:10 }}>
            <View style={{ backgroundColor: "#eee", borderRadius: 5, overflow: "hidden" }}>
                <Image
                  source={{uri:imgr,cache: 'force-cache'}}
                  style={{
                    height: 150,
                    width: 100
                  }}
                  // resizeMode="contain"
                />

              <View style={{height:50}}>
                <Text style={{ marginBottom: 5,marginTop:5,fontSize:10, flexWrap: 'wrap',alignSelf:'center',width:100 }} numberOfLines={5}>{item.book_title}</Text>
              </View>
              <Text style={{ marginBottom: 5,fontSize:10}}>
                  By Pastor Chris {'\n'}Oyakhilome
              </Text>
            </View>
            </View>
          </TouchableOpacity>
      </View>
    );
  };

  const renderHolySpirit = ({ item }) => {

    const imgr = item.book_cover_img;

    
    return (
      <View style={{marginEnd:10,width:100}}>
        <TouchableOpacity onPress={()=>navigation.navigate('BookDetails',{book_id:item.id})}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:10 }}>
            <View style={{ backgroundColor: "#eee", borderRadius: 5, overflow: "hidden" }}>
                <Image
                  source={{uri:imgr,cache: 'force-cache'}}
                  style={{
                    height: 150,
                    width: 100
                  }}
                  // resizeMode="contain"
                />

              <View style={{height:50}}>
                <Text style={{ marginBottom: 5,marginTop:5,fontSize:10, flexWrap: 'wrap',alignSelf:'center',width:100 }} numberOfLines={5}>{item.book_title}</Text>
              </View>
              <Text style={{ marginBottom: 5,fontSize:10}}>
                  By Pastor Chris {'\n'}Oyakhilome
              </Text>
            </View>
            </View>
          </TouchableOpacity>
      </View>
    );
  };

  const renderDivineHealing = ({ item }) => {

    const imgr = item.book_cover_img;

    
    return (
      <View style={{marginEnd:10,width:100}}>
        <TouchableOpacity onPress={()=>navigation.navigate('BookDetails',{book_id:item.id})}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:10 }}>
            <View style={{ backgroundColor: "#eee", borderRadius: 5, overflow: "hidden" }}>
                <Image
                  source={{uri:imgr,cache: 'force-cache'}}
                  style={{
                    height: 150,
                    width: 100
                  }}
                  // resizeMode="contain"
                />
              <View style={{height:50}}>
                <Text style={{ marginBottom: 5,marginTop:5,fontSize:10, flexWrap: 'wrap',alignSelf:'center',width:100 }} numberOfLines={5}>{item.book_title}</Text>
              </View>
              <Text style={{ marginBottom: 5,fontSize:10}}>
                  By Pastor Chris {'\n'}Oyakhilome
              </Text>
            </View>
            </View>
          </TouchableOpacity>
      </View>
    );
  };

  const renderSoulWining = ({ item }) => {

    const imgr = item.book_cover_img;

    
    return (
      <View style={{marginEnd:10,width:100}}>
        <TouchableOpacity onPress={()=>navigation.navigate('BookDetails',{book_id:item.id})}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:10 }}>
            <View style={{ backgroundColor: "#eee", borderRadius: 5, overflow: "hidden" }}>
                <Image
                  source={{uri:imgr,cache: 'force-cache'}}
                  style={{
                    height: 150,
                    width: 100
                  }}
                  // resizeMode="contain"
                />

              <View style={{height:50}}>
                <Text style={{ marginBottom: 5,marginTop:5,fontSize:10, flexWrap: 'wrap',alignSelf:'center',width:100 }} numberOfLines={5}>{item.book_title}</Text>
              </View>
              <Text style={{ marginBottom: 5,fontSize:10}}>
                  By Pastor Chris {'\n'}Oyakhilome
              </Text>
            </View>
            </View>
          </TouchableOpacity>
      </View>
    );
  };

  const renderChildrenDevtional = ({ item }) => {

    const imgr = item.book_cover_img;

    
    return (
      <View style={{marginEnd:10,width:100}}>
        <TouchableOpacity onPress={()=>navigation.navigate('BookDetails',{book_id:item.id})}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:10 }}>
            <View style={{ backgroundColor: "#eee", borderRadius: 5, overflow: "hidden" }}>
                <Image
                  source={{uri:imgr,cache: 'force-cache'}}
                  style={{
                    height: 150,
                    width: 100
                  }}
                  // resizeMode="contain"
                />

              <View style={{height:50}}>
                <Text style={{ marginBottom: 5,marginTop:5,fontSize:10, flexWrap: 'wrap',alignSelf:'center',width:100 }} numberOfLines={5}>{item.book_title}</Text>
              </View>
              <Text style={{ marginBottom: 5,fontSize:10}}>
                  By Pastor Chris {'\n'}Oyakhilome
              </Text>
            </View>
            </View>
          </TouchableOpacity>
      </View>
    );
  };

  const renderChristianLiving = ({ item }) => {

    const imgr = item.book_cover_img;

    
    return (
      <View style={{marginEnd:10,width:100}}>
        <TouchableOpacity onPress={()=>navigation.navigate('BookDetails',{book_id:item.id})}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:10 }}>
            <View style={{ backgroundColor: "#eee", borderRadius: 5, overflow: "hidden" }}>
                <Image
                  source={{uri:imgr,cache: 'force-cache'}}
                  style={{
                    height: 150,
                    width: 100
                  }}
                  // resizeMode="contain"
                />

              <View style={{height:50}}>
                <Text style={{ marginBottom: 5,marginTop:5,fontSize:10, flexWrap: 'wrap',alignSelf:'center',width:100 }} numberOfLines={5}>{item.book_title}</Text>
              </View>
              <Text style={{ marginBottom: 5,fontSize:10}}>
                  By Pastor Chris {'\n'}Oyakhilome
              </Text>
            </View>
            </View>
          </TouchableOpacity>
      </View>
    );
  };

  const renderPrayer = ({ item }) => {

    const imgr = item.book_cover_img;

    
    return (
      <View style={{marginEnd:10,width:100}}>
        <TouchableOpacity onPress={()=>navigation.navigate('BookDetails',{book_id:item.id})}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:10 }}>
            <View style={{ backgroundColor: "#eee", borderRadius: 5, overflow: "hidden" }}>
                <Image
                  source={{uri:imgr,cache: 'force-cache'}}
                  style={{
                    height: 150,
                    width: 100
                  }}
                  // resizeMode="contain"
                />

              <View style={{height:50}}>
                <Text style={{ marginBottom: 5,marginTop:5,fontSize:10, flexWrap: 'wrap',alignSelf:'center',width:100 }} numberOfLines={5}>{item.book_title}</Text>
              </View>
              <Text style={{ marginBottom: 5,fontSize:10}}>
                  By Pastor Chris {'\n'}Oyakhilome
              </Text>
            </View>
            </View>
          </TouchableOpacity>
      </View>
    );
  };

  const renderTeenDevotional = ({ item }) => {

    const imgr = item.book_cover_img;

    
    return (
      <View style={{marginEnd:10,width:100}}>
        <TouchableOpacity onPress={()=>navigation.navigate('BookDetails',{book_id:item.id})}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:10 }}>
            <View style={{ backgroundColor: "#eee", borderRadius: 5, overflow: "hidden" }}>
                <Image
                  source={{uri:imgr,cache: 'force-cache'}}
                  style={{
                    height: 150,
                    width: 100
                  }}
                  // resizeMode="contain"
                />

              <View style={{height:50}}>
                <Text style={{ marginBottom: 5,marginTop:5,fontSize:10, flexWrap: 'wrap',alignSelf:'center',width:100 }} numberOfLines={5}>{item.book_title}</Text>
              </View>
              <Text style={{ marginBottom: 5,fontSize:10}}>
                  By Pastor Chris {'\n'}Oyakhilome
              </Text>
            </View>
            </View>
          </TouchableOpacity>
      </View>
    );
  };

  const renderPopularBooks = ({ item }) => {

    const imgr = item.book_cover_img;

    
    return (
      <View style={{marginEnd:10,width:100}}>
        <TouchableOpacity onPress={()=>navigation.navigate('BookDetails',{book_id:item.id})}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:10 }}>
            <View style={{ backgroundColor: "#eee", borderRadius: 5, overflow: "hidden" }}>
                <Image
                  source={{uri:imgr,cache: 'force-cache'}}
                  style={{
                    height: 150,
                    width: 100
                  }}
                  // resizeMode="contain"
                />


              <View style={{height:50}}>
                <Text style={{ marginBottom: 5,marginTop:5,fontSize:10, flexWrap: 'wrap',alignSelf:'center',width:100 }} numberOfLines={5}>{item.book_title}</Text>
              </View>
              <Text style={{ marginBottom: 5,fontSize:10}}>
                  By Pastor Chris {'\n'}Oyakhilome
              </Text>
            </View>
            </View>
          </TouchableOpacity>
      </View>
    );
  };

  const renderTranslatedBooks = ({ item }) => {

    const imgr = item.book_cover_img;

    
    return (
      <View style={{marginEnd:10,width:100}}>
        <TouchableOpacity onPress={()=>navigation.navigate('BookDetails',{book_id:item.id})}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginEnd:10 }}>
            <View style={{ backgroundColor: "#eee", borderRadius: 5, overflow: "hidden" }}>
                <Image
                  source={{uri:imgr,cache: 'force-cache'}}
                  style={{
                    height: 150,
                    width: 100
                  }}
                  // resizeMode="contain"
                />


              <View style={{height:50}}>
                <Text style={{ marginBottom: 5,marginTop:5,fontSize:10, flexWrap: 'wrap',alignSelf:'center',width:100 }} numberOfLines={5}>{item.book_title}</Text>
              </View>
              <Text style={{ marginBottom: 5,fontSize:10}}>
                  By Pastor Chris {'\n'}Oyakhilome
              </Text>
            </View>
            </View>
          </TouchableOpacity>
      </View>
    );
  };


  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView}>
        <View style={{ flexDirection: 'row',marginHorizontal:10, marginTop:15,marginBottom:15,alignContent:'space-between' }}>
          <Divider orientation="vertical" width={5} />
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{marginBottom:15,alignItems:'flex-start'}}>
            <Text style={{marginLeft:10,fontWeight:'bold'}}>BOOK CATEGORIES</Text>
          </View>
          <View style={{marginBottom:15,alignItems:'flex-end'}}>
            <Button title="VIEW ALL" type="outline"  color="warning" />
          </View>
          </View>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginHorizontal:10}}>
            <FlatList data={books.category_list} renderItem={renderCategories} numColumns={700} ItemSeparatorComponent={() => <View style={{height: 5}} />}/>
        </ScrollView>
        

        <View style={{ flexDirection: 'row',marginHorizontal:10, marginTop:15,marginBottom:15,alignContent:'space-between' }}>
          <Divider orientation="vertical" width={5} />
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{marginBottom:15,alignItems:'flex-start'}}>
            <Text style={{marginLeft:10,fontWeight:'bold'}}>BOOKS</Text>
            <Text style={{marginLeft:10,color:'#999999'}}>Other Books by Pastor Chris Oyakhilome</Text>
          </View>
          <View style={{marginBottom:15,alignItems:'flex-end'}}>
            <Button title="VIEW ALL" type="outline"  color="warning" />
          </View>
          </View>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginHorizontal:10}}>
            <FlatList data={books.popular_books} renderItem={renderPopularBooks} numColumns={700} ItemSeparatorComponent={() => <View style={{height: 5}} />}/>
        </ScrollView>
        

        <View style={{ flexDirection: 'row',marginHorizontal:10, marginTop:15,marginBottom:15,alignContent:'space-between' }}>
          <Divider orientation="vertical" width={5} />
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{marginBottom:15,alignItems:'flex-start'}}>
            <Text style={{marginLeft:10,fontWeight:'bold'}}>DAILY DEVOTIONAL</Text>
            <Text style={{marginLeft:10,color:'#999999'}}>Rhapsodyof Realities Daily Devotional</Text>
          </View>
          <View style={{marginBottom:15,alignItems:'flex-end'}}>
            <Button title="VIEW ALL" type="outline"  color="warning" />
          </View>
          </View>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginHorizontal:10}}>
            <FlatList data={books.popular_books} renderItem={renderPopularBooks} numColumns={700} ItemSeparatorComponent={() => <View style={{height: 5}} />}/>
        </ScrollView>
        
        

        <View style={{ flexDirection: 'row',marginHorizontal:10, marginTop:15,marginBottom:15,alignContent:'space-between' }}>
          <Divider orientation="vertical" width={5} />
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{marginBottom:15,alignItems:'flex-start'}}>
            <Text style={{marginLeft:10,fontWeight:'bold'}}>Teevo</Text>
            <Text style={{marginLeft:10,color:'#999999'}}>Rhapsody of Realities for Teenagers</Text>
          </View>
          <View style={{marginBottom:15,alignItems:'flex-end'}}>
            <Button title="VIEW ALL" type="outline"  color="warning" />
          </View>
          </View>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginHorizontal:10}}>
            <FlatList data={books.teen_devotional} renderItem={renderTeenDevotional} numColumns={700} ItemSeparatorComponent={() => <View style={{height: 5}} />}/>
        </ScrollView>
        

        <View style={{ flexDirection: 'row',marginHorizontal:10, marginTop:15,marginBottom:15,alignContent:'space-between' }}>
          <Divider orientation="vertical" width={5} />
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{marginBottom:15,alignItems:'flex-start'}}>
            <Text style={{marginLeft:10,fontWeight:'bold'}}>Prayer</Text>
            <Text style={{marginLeft:10,color:'#999999'}}>Books on prayer by Pastor Chris Oyakhilome</Text>
          </View>
          <View style={{marginBottom:15,alignItems:'flex-end'}}>
            <Button title="VIEW ALL" type="outline"  color="warning" />
          </View>
          </View>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginHorizontal:10}}>
            <FlatList data={books.prayer} renderItem={renderPrayer} numColumns={700} ItemSeparatorComponent={() => <View style={{height: 5}} />}/>
        </ScrollView>

        <View style={{ flexDirection: 'row',marginHorizontal:10, marginTop:15,marginBottom:15,alignContent:'space-between' }}>
          <Divider orientation="vertical" width={5} />
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{marginBottom:15,alignItems:'flex-start'}}>
            <Text style={{marginLeft:10,fontWeight:'bold'}}>Faith & Prosperity</Text>
            <Text style={{marginLeft:10,color:'#999999'}}>Books on Faith & Prosperity by Pastor Chris Oyakhilome</Text>
          </View>
          <View style={{marginBottom:15,alignItems:'flex-end'}}>
            <Button title="VIEW ALL" type="outline"  color="warning" />
          </View>
          </View>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginHorizontal:10}}>
            <FlatList data={books.prosperity} renderItem={renderProsperity} numColumns={700} ItemSeparatorComponent={() => <View style={{height: 5}} />}/>
        </ScrollView>

        <View style={{ flexDirection: 'row',marginHorizontal:10, marginTop:15,marginBottom:15,alignContent:'space-between' }}>
          <Divider orientation="vertical" width={5} />
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{marginBottom:15,alignItems:'flex-start'}}>
            <Text style={{marginLeft:10,fontWeight:'bold'}}>Holy Spirit</Text>
            <Text style={{marginLeft:10,color:'#999999'}}>Books on Healing by Pastor Chris Oyakhilome</Text>
          </View>
          <View style={{marginBottom:15,alignItems:'flex-end'}}>
            <Button title="VIEW ALL" type="outline"  color="warning" />
          </View>
          </View>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginHorizontal:10}}>
            <FlatList data={books.holy_spirit} renderItem={renderHolySpirit} numColumns={700} ItemSeparatorComponent={() => <View style={{height: 5}} />}/>
        </ScrollView>

        <View style={{ flexDirection: 'row',marginHorizontal:10, marginTop:15,marginBottom:15,alignContent:'space-between' }}>
          <Divider orientation="vertical" width={5} />
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{marginBottom:15,alignItems:'flex-start'}}>
            <Text style={{marginLeft:10,fontWeight:'bold'}}>Divine Healing</Text>
            <Text style={{marginLeft:10,color:'#999999'}}>Books on Divine healing by Pastor Chris Oyakhilome</Text>
          </View>
          <View style={{marginBottom:15,alignItems:'flex-end'}}>
            <Button title="VIEW ALL" type="outline"  color="warning" />
          </View>
          </View>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginHorizontal:10}}>
            <FlatList data={books.divine_healing} renderItem={renderDivineHealing} numColumns={700} ItemSeparatorComponent={() => <View style={{height: 5}} />}/>
        </ScrollView>

        <View style={{ flexDirection: 'row',marginHorizontal:10, marginTop:15,marginBottom:15,alignContent:'space-between' }}>
          <Divider orientation="vertical" width={5} />
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{marginBottom:15,alignItems:'flex-start'}}>
            <Text style={{marginLeft:10,fontWeight:'bold'}}>Children's Devotional</Text>
            <Text style={{marginLeft:10,color:'#999999'}}>Childrens Books by Pastor Chris Oyakhilome</Text>
          </View>
          <View style={{marginBottom:15,alignItems:'flex-end'}}>
            <Button title="VIEW ALL" type="outline"  color="warning" />
          </View>
          </View>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginHorizontal:10}}>
            <FlatList data={books.children_devotionals} renderItem={renderChildrenDevtional} numColumns={700} ItemSeparatorComponent={() => <View style={{height: 5}} />}/>
        </ScrollView>

        <View style={{ flexDirection: 'row',marginHorizontal:10, marginTop:15,marginBottom:15,alignContent:'space-between' }}>
          <Divider orientation="vertical" width={5} />
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{marginBottom:15,alignItems:'flex-start'}}>
            <Text style={{marginLeft:10,fontWeight:'bold'}}>Soul Wining</Text>
            <Text style={{marginLeft:10,color:'#999999'}}>Books on Soul Wining by Pastor Chris Oyakhilome</Text>
          </View>
          <View style={{marginBottom:15,alignItems:'flex-end'}}>
            <Button title="VIEW ALL" type="outline"  color="warning" />
          </View>
          </View>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginHorizontal:10}}>
            <FlatList data={books.soul_wining} renderItem={renderSoulWining} numColumns={700} ItemSeparatorComponent={() => <View style={{height: 5}} />}/>
        </ScrollView>

        <View style={{ flexDirection: 'row',marginHorizontal:10, marginTop:15,marginBottom:15,alignContent:'space-between' }}>
          <Divider orientation="vertical" width={5} />
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{marginBottom:15,alignItems:'flex-start'}}>
            <Text style={{marginLeft:10,fontWeight:'bold'}}>Christian Living</Text>
            <Text style={{marginLeft:10,color:'#999999'}}>Christian Living</Text>
          </View>
          <View style={{marginBottom:15,alignItems:'flex-end'}}>
            <Button title="VIEW ALL" type="outline"  color="warning" />
          </View>
          </View>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginHorizontal:10}}>
            <FlatList data={books.christian_living} renderItem={renderChristianLiving} numColumns={700} ItemSeparatorComponent={() => <View style={{height: 5}} />}/>
        </ScrollView>

        <View style={{ flexDirection: 'row',marginHorizontal:10, marginTop:15,marginBottom:15,alignContent:'space-between' }}>
          <Divider orientation="vertical" width={5} />
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{marginBottom:15,alignItems:'flex-start'}}>
            <Text style={{marginLeft:10,fontWeight:'bold'}}>BOOKS TRANSLATIONS</Text>
            <Text style={{marginLeft:10,color:'#999999'}}>Translated Books by Pastor Chris Oyakhilome</Text>
          </View>
          <View style={{marginBottom:15,alignItems:'flex-end'}}>
            <Button title="VIEW ALL" type="outline"  color="warning" />
          </View>
          </View>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginHorizontal:10}}>
            <FlatList data={books.translated_books} renderItem={renderTranslatedBooks} numColumns={700} ItemSeparatorComponent={() => <View style={{height: 5}} />}/>
        </ScrollView>
        
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {

  }

});


export default StoreScreen;