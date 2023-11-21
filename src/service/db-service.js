import React from 'react'

import * as SQLite from "expo-sqlite"
import Strings from '../constants/Strings';

const db = SQLite.openDatabase(Strings.DATABASE_NAME)

const getUsers = (setUserFunc) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'select * from users',
        [],
        (_, { rows: { _array } }) => {
          setUserFunc(_array)
        }
      );
    },
    (t, error) => { console.log("db error load users"); console.log(error) },
    (_t, _success) => { console.log("loaded users")}
  );
}

const insertUser = (userName, successFunc) => {
  db.transaction( tx => {
      tx.executeSql( 'insert into users (name) values (?)', [userName] );
    },
    (t, error) => { console.log("db error insertUser"); console.log(error);},
    (t, success) => { successFunc() }
  )
}

//onUpgrade
const dropDatabaseTablesAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'drop table users',
        [],
        (_, result) => { resolve(result) },
        (_, error) => { console.log("error dropping users table"); reject(error)
        }
      ),tx.executeSql(
        'drop table users',
        [],
        (_, result) => { resolve(result) },
        (_, error) => { console.log("error dropping users table"); reject(error)
        }
      )
    })
  })
}



//create tables book & book_download
const setupDatabaseAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
          'create table if not exists '+Strings.DATABASE_NAME+' (id integer primary key not null,book_title  TEXT, book_description TEXT,image TEXT,cover_image TEXT,book_file_type TEXT,'+
            'book_file_url TEXT,book_rate TEXT,'+
            'book_rate_avg TEXT,book_view TEXT,book_author_name TEXT );'+
            'create table if not exists '+Strings.TABLE_NAME_DOWNLOAD+' (book_id integer primary key not null,book_download_title  TEXT, image_download TEXT,book_download_author_name TEXT,book_download_url TEXT);'
        );
      },
      (_, error) => { console.log("db error creating tables"); console.log(error); reject(error) },
      (_, success) => { resolve(success)}
    )
  })
}

const setupUsersAsync = async () => {
  return new Promise((resolve, _reject) => {
    db.transaction( tx => {
        tx.executeSql( 'insert into users (id, name) values (?,?)', [1, "john"] );
      },
      (t, error) => { console.log("db error insertUser"); console.log(error); resolve() },
      (t, success) => { resolve(success)}
    )
  })
}

export const database = {
  getUsers,
  insertUser,
  setupDatabaseAsync,
  setupUsersAsync,
  dropDatabaseTablesAsync,
}