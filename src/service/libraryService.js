
import axios from 'axios';
import Strings from '../constants/Strings';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// storing data
const storeUser = async (value) => {
    try {
      await AsynStorage.setItem("user", JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

// getting data
const getUser = async () => {
    try {
      const userData = JSON.parse(await AsynStorage.getItem("user"))
    } catch (error) {
     console.log(error); 
    }
  };

const getLibrary = async () => {
    const mail= await AsyncStorage.getItem('email');
    return new Promise((resolve, reject) => {

            axios.post(Strings.BOOKS_URL+'/library', {
                email: mail
              })
              .then((res) => {
                console.log("Library Books",res.data.result);
                resolve(res.data.result)
            })
              .catch((err) => {
                reject(err)
            });
    });
};

const getCategoryList =async (cat_id)=>{
  return new Promise((resolve, reject) => {

    axios.post(Strings.BOOKS_URL+'/catfetch', {
      cat_id: cat_id

      })
      .then((res) => {
        //console.log(res.data.result)
        resolve(res.data.result)
    })
      .catch((err) => {
        reject(err)
    });
});
}

const getNotesList =async (email)=>{
  return new Promise((resolve, reject) => {

    axios.post(Strings.BOOKS_URL+'/catfetch', {
      email: email
      })
      .then((res) => {
        //console.log(res.data.result)
        resolve(res.data.result)
    })
      .catch((err) => {
        reject(err)
    });
});
}

const getBookDetails =async (book_id)=>{
  return new Promise((resolve, reject) => {

    axios.post(Strings.BOOKS_URL+'/book', {
      book_id: book_id

      })
      .then((res) => {
        resolve(res.data.EBOOK_APP);
    })
      .catch((err) => {
        reject(err)
    });
});
}


const getAudios = async (month) => {
  return new Promise((resolve, reject) => {

          axios.get('https://backend3.rhapsodyofrealities.org/audio/english/'+month)
            .then((res) => {
              console.log(res.data.response)
              resolve(res.data.response)
          })
            .catch((err) => {
              reject(err)
          });
  });
};






export { getLibrary ,getCategoryList,getBookDetails,getAudios}