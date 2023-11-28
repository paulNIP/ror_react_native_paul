import SQLite from 'react-native-sqlite-storage'

// Conexão com o Banco de Dados do Sqlite 
export const DatabaseConnection = {
    getBookmarkedConnection: () => SQLite.openDatabase({
        name: 'bookmarked_articles_database',
        location: 'default'
      },
      () => { console.log("Database connected!") },
      error => console.log("Database error", error)), 

    getdb: () => SQLite.openDatabase(
    {
        name: 'MyBook',
        location: 'default'
      },
      () => { console.log("Database connected!") },
      error => console.log("Database error", error)
    
    ), // returns Database object
    getdevotionalsDB: () => SQLite.openDatabase(
    {
        name: 'devotionals',
        location: 'default'
      },
      () => { console.log("Database connected!") },
      error => console.log("Database error", error)), // returns Database object
    getbookmarked_articles_databaseDB: () => SQLite.openDatabase(
    {
        name: 'bookmarked_articles_database',
        location: 'default'
      },
      () => { console.log("Database connected!") },
      error => console.log("Database error", error)), // returns Database object
    getposts_feed_dbDB: () => SQLite.openDatabase(
    {
        name: 'posts_feed_db',
        location: 'default'
      },
      () => { console.log("Database connected!") },
      error => console.log("Database error", error)), // returns Database object
    getjsoncacheDB: () => SQLite.openDatabase(
    {
        name: 'jsoncache',
        location: 'default'
      },
      () => { console.log("Database connected!") },
      error => console.log("Database error", error)), // returns Database object
    getresponses_databaseDB: () => SQLite.openDatabase(
    {
        name: 'responses_database',
        location: 'default'
      },
      () => { console.log("Database connected!") },
      error => console.log("Database error", error)), // returns Database object
    getrhapsodyDaysReadDb: () => SQLite.openDatabase(
    {
        name: 'rhapsodyDaysReadDb',
        location: 'default'
      },
      () => { console.log("Database connected!") },
      error => console.log("Database error", error)), // returns Database object
    getsettings_database: () =>  SQLite.openDatabase(
    {
        name: 'settings_database',
        location: 'default'
      },
      () => { console.log("Database connected!") },
      error => console.log("Database error", error)),
    getuserDB: () => SQLite.openDatabase(
    {
        name: 'user',
        location: 'default'
      },
      () => { console.log("Database connected!") },
      error => console.log("Database error", error)),
  
};