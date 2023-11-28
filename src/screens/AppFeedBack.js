
import React, { useState } from "react"; 
import { 
    View, 
    Text, 
    TouchableOpacity, 
    FlatList, Image,
    StyleSheet, ScrollView,SafeAreaView
} from "react-native";
import { Divider } from "react-native-paper";
import { TextInput } from 'react-native-paper';
import { useFormik } from 'formik';
import {Picker} from '@react-native-picker/picker';
import { Button, Title } from 'react-native-paper';

const ExpandableListItem = ({ item }) => { 
    const [expanded, setExpanded] = useState(false); 
    const [text, setText] = React.useState("");
  
    const toggleExpand = () => { 
        setExpanded(!expanded); 
    }; 
  
    return ( 
        <View style={styles.itemContainer}> 
            <TouchableOpacity 
                onPress={toggleExpand} 
                style={styles.itemTouchable} 
            > 
                <Text style={styles.itemTitle}> 
                    {item.title} 
                </Text> 
            </TouchableOpacity> 
            {expanded && ( 
                <Text style={styles.itemContent}> 
                    {item.content} 
                </Text> 
            )} 
        </View> 
    ); 
}; 
  
const ExpandableList = ({ data }) => { 
    const renderItem = ({ item }) => ( 
        <ExpandableListItem item={item} /> 
    ); 
  
    return ( 
        <FlatList 
            data={data} 
            renderItem={renderItem} 
            keyExtractor={(item) => item.id.toString()} 
        /> 
    ); 
};

const AppFeedBack = () => {

    const cities = [
        {name:"Los Angeles", id: 1},
        {name:"Philadelphia", id: 2},
        {name:"Chicago", id: 3},
        {name:"Washington DC", id: 4},
        {name:"New York", id: 5},
        {name:"San Diego", id: 6},
        {name:"Fort Worth", id: 7},
        {name:"Houston", id: 8},
        {name:"Cleveland", id: 9},
        {name:"Pittsburg", id: 10},
        {name:"Detroit", id: 11},
        {name:"Jacksonville", id: 12},
        {name:"Denver", id: 13},
        {name:"Columbus", id: 14},
        {name:"El Paso", id: 15},
        {name:"New Orleans", id: 16},
        {name:"Cincinnati", id: 17},
        {name:"Nashville", id: 18},
        {name:"Miami", id: 19},
        {name:"Tampa", id: 20},
        {name:"Bakersfield", id: 22},
        {name:"Tuscon", id: 23},
        {name:"Baltimore", id: 25},
        {name:"St Louis", id: 26},
        {name:"Las Vegas", id: 27},
        {name:"Memphis", id: 28},
        {name:"Seatle", id: 29},
        {name:"San Fransisco", id: 30},
   ];



    const data = [ 
        { 
            id: 1, 
            title: "SUBSCRIPTION ISSUES", 
            content: 
                `JavaScript (JS) is the most popular  
                lightweight, interpreted compiled  
                programming language. It can be used  
                for both Client-side as well as  
                Server-side developments. JavaScript  
                also known as a scripting language  
                for web pages.`, 
        }, 
        { 
            id: 2, 
            title: "LOGIN ISSUES", 
            content: 
                `A Computer Science portal for geeks.  
                It contains well written, well thought  
                and well explained computer science and  
                programming articles`, 
        }, 
        { 
            id: 2, 
            title: "OTHER ISSUES", 
            content: 
                `Python is a high-level, general-purpose,  
                and very popular programming language.  
                Python programming language (latest  
                Python 3) is being used in web development,  
                Machine Learning applications, along with 
                all cutting-edge technology in Software  
                Industry.`, 
        }, 
        { 
            id: 3, 
            title: "IN-APP INQUIRIES", 
            content: 
                `Python is a high-level, general-purpose,  
                and very popular programming language.  
                Python programming language (latest  
                Python 3) is being used in web development,  
                Machine Learning applications, along with 
                all cutting-edge technology in Software  
                Industry.`, 
        }, 
        // ...more items 
    ]; 

    const formik = useFormik({
        initialValues: {
          firstName: '',
          lastName: '',
          email: '',
        },
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
      });




  return (
       <SafeAreaView style={styles.container}>

        <ScrollView style={styles.scrollView} >

        <View > 

           <Image
                style={{width:150,height:150,alignSelf:"center"}}
                source={require('../assets/logo.png')}
            />

            <Text style={{alignSelf:'center',fontSize:22,marginBottom:10,marginTop:10}}>FAQ</Text>
            <Divider/>

            <ExpandableList data={data} /> 
            <Text>CONTACT ROR APP CARE DIRECTLY</Text>
            <Divider/>
            <Text>TEL: +1(601) 600-2363</Text>
            <Text>KingsChat: @rhapsodyappcare</Text>
            <Text>Email: rhapsodyappsupport@rhapsodyofrealities.org</Text>

        </View> 

        <View>
                {/* <Picker
                        enabled={true}
                        mode="dropdown"
                        placeholder="Select City"
                        onValueChange={formik.handleChange('city_name')}
                        selectedValue={formik.values.city_name}
                >
                {cities.map((item) => {
                    return
                    (<Picker.Item
                        label={item.name.toString()}
                        value={item.name.toString()}
                        key={item.id.toString()} />)
                    })}

                </Picker> */}

                <Picker
                selectedValue={null}
                onValueChange={null}>
                {cities.map((item) => {
                    return
                    (<Picker.Item
                        label={item.name}
                        value={item.name}
                        key={item.id} />)
                    })}
                </Picker>

                <Button
                        mode="contained"
                        title='submit'
                        onPress={formik.handleSubmit}
                >
                    Enter
                </Button>
        </View>
            
        </ScrollView>

        </SafeAreaView>
  );
};


const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        backgroundColor:'#F6F6F6',
    }, 
    scrollView: {
        marginHorizontal: 10,
      },
    header: { 
        fontSize: 30, 
        fontWeight: "bold", 
        marginBottom: 20, 
        color: "green", 
        textAlign: "center", 
    }, 
    subheader: { 
        fontSize: 20, 
        fontWeight: "bold", 
        marginBottom: 20, 
        textAlign: "center", 
    }, 
    itemContainer: { 
        marginBottom: 15, 
        padding: 10, 
        backgroundColor: "white", 
        borderRadius: 5, 
        elevation: 3, 
    }, 
    itemTouchable: { 
        borderRadius: 10, 
        overflow: "hidden", 
    }, 
    itemTitle: { 
        fontSize: 18, 
        fontWeight: "bold", 
        color: "#333", 
    }, 
    itemContent: { 
        marginTop: 10, 
        fontSize: 14, 
        color: "#666", 
    }, 
}); 

export default AppFeedBack;