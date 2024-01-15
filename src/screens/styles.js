import { StyleSheet, Dimensions } from 'react-native'

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    imgBg:{
        flex: 1,
        width: null,
        height: null,
        opacity: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#000'
    },
    viewSearch:{
        marginTop: 15,
        backgroundColor: "#FFF",
        elevation: 10,
        borderRadius: 5,
        marginVertical: 10,
        width: '95%',
        flexDirection: 'row',
        alignSelf: 'center'
    },
    input:{
        width: '90%',
        padding: 13,
        paddingLeft: 20,
        fontSize: 17,
    },
    icon:{
        position: 'absolute',
        right: 20,
        top: 15
    },
    slideView:{
        width: '100%',
        height: 300,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginTop:15
    },
    carousel:{
        flex: 1,
        overflow: 'visible'
    },
    carouselImg:{
        alignSelf: 'center',
        width: 150,
        height: 150,
        borderRadius: 10,
    },
    carouselIcon:{
        position: 'absolute',
        top: 15,
        right: 15
    },
    moreInfo:{
        backgroundColor:'#F6F6F6',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        flexDirection: "row",
        justifyContent: 'space-around',
        marginTop:-110
    },
    movieTitle:{
        paddingLeft: 15,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#131313',
        marginBottom: 5,
        marginTop:10
    },
    movieDesc:{
        paddingLeft: 15,
        fontSize: 14,
        color: '#131313',
    }

})

export default styles