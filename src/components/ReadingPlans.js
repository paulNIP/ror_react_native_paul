import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, ImageBackground, StyleSheet, Dimensions, 
  TextInput, TouchableOpacity,Alert, Image,FlatList,Button } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import HTMLView from 'react-native-htmlview';
import Carousel from 'react-native-snap-carousel';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import styles from '../screens/styles'
import SubscriptionPlanDetails from './SubscriptionPlanDetails';


const ReadingPlans = () => {

  const carouselRef = useRef(null)

    const [lista, setLista] = useState([
        {
            title:"O Justiceiro",
            description: "<h4>An Ordered HTML List</h4><p>Benefits</p><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol><p>App features</p><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol>",
            eligibility: "<h4>An Ordered HTML List</h4><p>Benefits</p><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol><p>App features</p><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol>",
            img: require('../assets/basic_2_99.png'),
            img_header: require('../assets/basic_2_header_99.png')
        },
        {
            title:"Bad Boys for life",
            description: "Terceiro episódio das histórias dos policiais Burnett (Martin Lawrence) e Lowrey (Will Smith), que devem encontrar e prender os mais perigosos traficantes de drogas da cidade.",
            eligibility: "<h4>An Ordered HTML List</h4><p>Benefits</p><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol><p>App features</p><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol>",
            img: require('../assets/basic_4_header.png'),
            img_header: require('../assets/basic_4.png')
        },
        {
            title:"Viúva Negra",
            description: "Em Viúva Negra, após seu nascimento, Natasha Romanoff (Scarlett Johansson) é dada à KGB, que a prepara para se tornar sua agente definitiva.",
            eligibility: "<h4>An Ordered HTML List</h4><p>Benefits</p><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol><p>App features</p><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol>",
            img: require('../assets/basic_6_header_3months.png'),
            img_header: require('../assets/basic_6_3months.png')
        },
        {
            title:"Free Guy",
            description: "Um caixa de banco preso a uma entediante rotina tem sua vida virada de cabeça para baixo quando ele descobre que é personagem em um brutalmente realista vídeo game de mundo aberto.",
            eligibility: "<h4>An Ordered HTML List</h4><p>Benefits</p><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol><p>App features</p><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol>",
            img: require('../assets/basic_12_header_3months.png'),
            img_header: require('../assets/basic_12_3months.png')
        },
        {
            title:"Top Gun: MAVERICK",
            description: "Em Top Gun: Maverick, depois de mais de 30 anos de serviço como um dos principais aviadores da Marinha, o piloto à moda antiga Maverick (Tom Cruise) enfrenta drones e prova que o fator humano ainda é fundamental no mundo contemporâneo das guerras tecnológicas.",
            eligibility: "<h4>An Ordered HTML List</h4><p>Benefits</p><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol><p>App features</p><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol>",
            img: require('../assets/basic_24_header_yearly.png'),
            img_header: require('../assets/basic_24_yearly.png')
        },
        {
            title:"BloodShot",
            description: "Bloodshot é um ex-soldado com poderes especiais: o de regeneração e a capacidade de se metamorfosear. ",
            eligibility: "<h4>An Ordered HTML List</h4><p>Benefits</p><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol><p>App features</p><ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol>",
            img: require('../assets/basic_48_header_yearly.png'),
            img_header: require('../assets/basic_48_yearly.png')
        },
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
                            
                            <View style={{marginTop: 10}}>
                                <View style={{borderTopRightRadius:30,borderTopLeftRadius:30}}>
                                    <Image
                                        style={{width:Dimensions.get('window').width,marginTop:-5,
                                        resizeMode:'contain',height:Dimensions.get('window').width*0.5,
                                        borderTopRightRadius:20,borderTopLeftRadius:20}}
                                        source={lista[activeIndex].img_header}
                                    />
                                </View>
                                <View style={{borderTopRightRadius:20,borderTopLeftRadius:20,marginLeft:20,marginRight:20,marginBottom:50}}>
                                    <Text style={{ flexWrap: 'wrap',fontWeight:"bold",marginBottom:5,marginTop:5}}>Subscribe to this package and get access to 30+ life Changing article</Text>
                                    <Text style={{ flexWrap: 'wrap',fontWeight:"bold"}}>Benefits</Text>

                                    <View style={{ padding: 10 }}>
                                        <FlatList
                                            data={[
                                                { key: 'Acess to Rhapsody Daily Articles for 1 Month' },
                                                { key: 'Get 1 point instantly!' },
                                                { key: 'Read Rhapsody Daily & get 1 point each day!' },
                                                { key: 'Redeemable Reading points' },
                                                // { key: 'Mexico City' },
                                                // { key: 'Cairo' },
                                                // { key: 'Dhaka' },
                                                // { key: 'Mumbai' },
                                                // { key: 'Beijing' },
                                                // { key: 'Osaka' },
                                            ]}
                                            renderItem={({ item }) => {
                                                return (
                                                <View style={{ marginBottom: 5 }}>
                                                    <Text>{`\u25CF ${item.key}`}</Text>
                                                </View>
                                                );
                                            }}
                                            />
                                        </View>

                                    <Text style={{ flexWrap: 'wrap',fontWeight:"bold"}}>App features</Text>

                                    <View style={{ padding: 10 }}>
                                        <FlatList
                                            data={[
                                                { key: 'Popup Bible' },
                                                { key: 'Change theme' },
                                                { key: 'Save and View your saved articles' },
                                                { key: 'Take and save notes' },
                                                { key: 'Reading Points' },
                                                // { key: 'Cairo' },
                                                // { key: 'Dhaka' },
                                                // { key: 'Mumbai' },
                                                // { key: 'Beijing' },
                                                // { key: 'Osaka' },
                                            ]}
                                            renderItem={({ item }) => {
                                                return (
                                                <View style={{ marginBottom: 5 }}>
                                                    <Text>{`\u25CF ${item.key}`}</Text>
                                                </View>
                                                );
                                            }}
                                            />
                                        </View>

                                        <TouchableOpacity style={{alignItems: 'center',
                                            backgroundColor: '#D8A623',
                                            padding: 10,borderRadius:5}} onPress={()=>{}}>
                                            <Text>SUBSCRIBE</Text>
                                        </TouchableOpacity>
                                        <Text style={{alignSelf:'center',marginBottom:5,marginTop:5}}> or </Text>
                                        <TouchableOpacity style={{alignItems: 'center',
                                            backgroundColor: '#12A3B4',
                                            padding: 10,borderRadius:5}} onPress={()=>{}}>
                                            <Text>USE VOUCHER CODE</Text>
                                        </TouchableOpacity>

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



export default ReadingPlans;