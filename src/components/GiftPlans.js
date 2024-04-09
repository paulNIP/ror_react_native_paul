import React, { useState, useRef } from 'react';
import { View, Text, ScrollView,  StyleSheet, Dimensions, 
  TouchableOpacity, Image,FlatList } from 'react-native';


import Carousel from 'react-native-snap-carousel';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import styles from '../screens/styles'



const GiftPlans = () => {

  const carouselRef = useRef(null)

    const [lista, setLista] = useState([
        {
            title:"O Justiceiro",
            description: "<h4>An Ordered HTML List</h4><p>Benefits</p><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol><p>App features</p><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol>",
            eligibility: "<h4>An Ordered HTML List</h4><p>Benefits</p><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol><p>App features</p><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol>",
            img: require('../assets/gift_15_header.png'),
            img_header: require('../assets/gift_15.png')
        },
        {
            title:"Bad Boys for life",
            description: "Terceiro episódio das histórias dos policiais Burnett (Martin Lawrence) e Lowrey (Will Smith), que devem encontrar e prender os mais perigosos traficantes de drogas da cidade.",
            eligibility: "<h4>An Ordered HTML List</h4><p>Benefits</p><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol><p>App features</p><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol>",
            img: require('../assets/gift_50_header.png'),
            img_header: require('../assets/gift_50.png')
        },
        {
            title:"Viúva Negra",
            description: "Em Viúva Negra, após seu nascimento, Natasha Romanoff (Scarlett Johansson) é dada à KGB, que a prepara para se tornar sua agente definitiva.",
            eligibility: "<h4>An Ordered HTML List</h4><p>Benefits</p><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol><p>App features</p><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol>",
            img: require('../assets/gift_150_header.png'),
            img_header: require('../assets/gift_150.png')
        },
        {
            title:"Free Guy",
            description: "Um caixa de banco preso a uma entediante rotina tem sua vida virada de cabeça para baixo quando ele descobre que é personagem em um brutalmente realista vídeo game de mundo aberto.",
            eligibility: "<h4>An Ordered HTML List</h4><p>Benefits</p><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol><p>App features</p><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol>",
            img: require('../assets/gift_1500_header.png'),
            img_header: require('../assets/gift_1500.png')
        }

    ]);

    const [background, setBackground] = useState(lista[0].img)

    const [activeIndex, setActiveIndex] = useState(0)

    const _renderItem = ({item, index}) => {

        const img=item.img;
        return (
            <View>
                <TouchableOpacity>
                    <Image
                        source={img}
                        style={styles.carouselImg}
                    />
                </TouchableOpacity>
            </View>
        )
    }
  


  return (
    <ScrollView style={styles.container}>
            <View style={{flex:1, height: screenHeight+100}}>
                <View style={{...StyleSheet.absoluteFill}}>

                        <View style={styles.slideView}>
                            <Carousel
                                style={styles.carousel}
                                ref={carouselRef}
                                data={lista}
                                renderItem={_renderItem}
                                sliderWidth={screenWidth}
                                itemWidth={200}
                                inactiveSlideOpacity={0.5}
                                onSnapToItem={(index) => {
                                    setBackground(lista[index].img)
                                    setActiveIndex(index)
                                }}
                            />
                        </View>
                        
                        <View style={styles.moreInfo}>
                            
                            <View style={{marginTop: 10,borderTopRightRadius:30,borderTopLeftRadius:30}}>
                                <View style={{borderTopRightRadius:30,borderTopLeftRadius:30}}>
                                    <Image
                                        style={{width:Dimensions.get('window').width,marginTop:-5,
                                        resizeMode:'contain',height:Dimensions.get('window').width*0.5,
                                        borderTopRightRadius:30,borderTopLeftRadius:30}}
                                        source={lista[activeIndex].img_header}
                                    />
                                </View>
                                <View style={{borderTopRightRadius:20,borderTopLeftRadius:20,marginLeft:20,marginRight:20,marginBottom:50}}>
                                    <Text style={{ flexWrap: 'wrap',fontWeight:"bold"}}>Benefits</Text>

                                    {activeIndex===0&&(
                                        <View style={{ padding: 10 }}>
                                        <FlatList
                                            data={[
                                                { key: 'Gift A subscription for this amount and get 19 copies distributed to others' },

                                            ]}
                                            renderItem={({ item }) => {
                                                return (
                                                <View style={{ marginBottom: 5 }}>
                                                    <Text style={{flexWrap:'wrap' }}>{`\u25CF ${item.key}`}</Text>
                                                </View>
                                                );
                                            }}
                                            />
                                        </View>

                                    )}
                                    {activeIndex===1&&(
                                        <View style={{ padding: 10 }}>
                                        <FlatList
                                            data={[
                                                { key: 'Gift A subscription for this amount and get 65 copies distributed to others' },

                                            ]}
                                            renderItem={({ item }) => {
                                                return (
                                                <View style={{ marginBottom: 5 }}>
                                                    <Text style={{flexWrap:'wrap' }}>{`\u25CF ${item.key}`}</Text>
                                                </View>
                                                );
                                            }}
                                            />
                                        </View>
                                        
                                        )}
                                        {activeIndex===2&&(
                                            <View style={{ padding: 10 }}>
                                            <FlatList
                                                data={[
                                                    { key: 'Gift A subscription for this amount and get 188 copies distributed to others' },
    
                                                ]}
                                                renderItem={({ item }) => {
                                                    return (
                                                    <View style={{ marginBottom: 5 }}>
                                                        <Text style={{flexWrap:'wrap' }}>{`\u25CF ${item.key}`}</Text>
                                                    </View>
                                                    );
                                                }}
                                                />
                                            </View>
                                        
                                        )}
                                        {activeIndex===3&&(

                                            <View style={{ padding: 10 }}>
                                            <FlatList
                                                data={[
                                                    { key: 'Gift A subscription for this amount and get 1,875 copies distributed to others' },

                                                ]}
                                                renderItem={({ item }) => {
                                                    return (
                                                    <View style={{ marginBottom: 5}}>
                                                        <Text style={{flexWrap:'wrap' }}>{`\u25CF ${item.key}`}</Text>
                                                    </View>
                                                    );
                                                }}
                                                />
                                            </View>
                                        
                                        )}

                                        <Text style={{alignSelf:'center',fontWeight:'bold',flexWrap:'wrap',marginBottom:10}}>
                                            This gift package is also available for purchase by visiting rhapsodysubscriptions.org
                                        </Text>
 
                                        <TouchableOpacity style={{alignItems: 'center',
                                            backgroundColor: '#D8A623',
                                            padding: 10,borderRadius:5}} onPress={()=>{}}>
                                            <Text>SUBSCRIBE</Text>
                                        </TouchableOpacity>
                                        {/* <Text style={{alignSelf:'center',marginBottom:5,marginTop:5}}> or </Text> */}
                                        {/* <TouchableOpacity style={{alignItems: 'center',
                                            backgroundColor: '#12A3B4',
                                            padding: 10,borderRadius:5}} onPress={()=>{}}>
                                            <Text>USE VOUCHER CODE</Text>
                                        </TouchableOpacity> */}

                                        <View style={{height:100}}>

                                        </View>

                                </View>
                                

                            </View>
                        </View>
                </View>
            </View>
        </ScrollView>


  );
};



export default GiftPlans;