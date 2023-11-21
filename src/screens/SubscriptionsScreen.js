import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, ImageBackground, StyleSheet, Dimensions, 
  TextInput, TouchableOpacity, Image } from 'react-native';

import Carousel from 'react-native-snap-carousel'

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

import styles from './styles'


const SubscriptionPlans = () => {

  const carouselRef = useRef(null)

    const [lista, setLista] = useState([
        {
            title:"O Justiceiro",
            text: "Após o assassinato de sua família, Frank Castle está traumatizado e sendo caçado. No submundo do crime, ele se tornará aquele conhecido como O Justiceiro",
            release: 2018,
            img: 'https://sujeitoprogramador.com/wp-content/uploads/2020/05/background.jpg'
        },
        {
            title:"Bad Boys for life",
            text: "Terceiro episódio das histórias dos policiais Burnett (Martin Lawrence) e Lowrey (Will Smith), que devem encontrar e prender os mais perigosos traficantes de drogas da cidade.",
            release: 2020,
            img: 'https://sujeitoprogramador.com/wp-content/uploads/2020/05/badboy.jpg'
        },
        {
            title:"Viúva Negra",
            text: "Em Viúva Negra, após seu nascimento, Natasha Romanoff (Scarlett Johansson) é dada à KGB, que a prepara para se tornar sua agente definitiva.",
            release: 2020,
            img: 'https://sujeitoprogramador.com/wp-content/uploads/2020/05/blackwidow.jpg'
        },
        {
            title:"Free Guy",
            text: "Um caixa de banco preso a uma entediante rotina tem sua vida virada de cabeça para baixo quando ele descobre que é personagem em um brutalmente realista vídeo game de mundo aberto.",
            release: 2020,
            img: 'https://sujeitoprogramador.com/wp-content/uploads/2020/05/freeguy.jpg'
        },
        {
            title:"Top Gun: MAVERICK",
            text: "Em Top Gun: Maverick, depois de mais de 30 anos de serviço como um dos principais aviadores da Marinha, o piloto à moda antiga Maverick (Tom Cruise) enfrenta drones e prova que o fator humano ainda é fundamental no mundo contemporâneo das guerras tecnológicas.",
            release: 2020,
            img: 'https://sujeitoprogramador.com/wp-content/uploads/2020/05/topgun.jpeg'
        },
        {
            title:"BloodShot",
            text: "Bloodshot é um ex-soldado com poderes especiais: o de regeneração e a capacidade de se metamorfosear. ",
            release: 2020,
            img: 'https://sujeitoprogramador.com/wp-content/uploads/2020/05/blood.jpg'
        },
    ]);

    const [background, setBackground] = useState(lista[0].img)

    const [activeIndex, setActiveIndex] = useState(0)

    const _renderItem = ({item, index}) => {
        return (
            <View>
                <TouchableOpacity>
                    <Image
                        source={{uri: item.img}}
                        style={styles.carouselImg}
                    />
                    {/* <Icon name="play-circle-outline" color="#FFF" size={30} style={styles.carouselIcon}/> */}
                </TouchableOpacity>
            </View>
        )
    }
  


  return (
    <ScrollView style={styles.container}>
            <View style={{flex:1, height: screenHeight}}>
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
                            <View >
                                <Image
                                    source={{uri: lista[activeIndex].img}}
                                    style={{width:'100%',height:200,borderTopLeftRadius:10,borderTopRightRadius:10}}
                                />
                                
                                <Text style={styles.movieTitle}>{lista[activeIndex].title}</Text>
                                <Text style={styles.movieDesc}>{lista[activeIndex].text}</Text>
                                <TouchableOpacity style={stylesMo.button} onPress={()=>{console.log('purchase')}}>
                                  <Text>Press Here</Text>
                                </TouchableOpacity>
                            </View>
                            {/* <Icon name="queue" color="#131313" size={20} style={{marginRight: 15, marginTop: 10}}/> */}
                        </View>
                </View>
            </View>
        </ScrollView>


  );
};


const stylesMo = StyleSheet.create({

  button: {
    alignItems: 'center',
    backgroundColor: '#F9A825',
    padding: 10,
    marginTop:10,
    borderRadius:8
  }
});



export default SubscriptionPlans;