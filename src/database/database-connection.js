import SQLite from 'react-native-sqlite-storage';

// Refactor: Extract helper function
const openDatabase = (dbName) => SQLite.openDatabase({
        name: dbName,
        location: 'default'
    },
    () => {
    }, // Commented for readability
    error => console.log("Database error", error),
);

// New refactored export const declaration
export const DatabaseConnection = {
    getBookmarkedConnection: () => openDatabase('bookmarked_articles_database'),
    getdb: () => openDatabase('MyBook'),
    getdevotionalsDB: () => openDatabase('devotionals'),
    getbookmarked_articles_databaseDB: () => openDatabase('bookmarked_articles_database'),
    getposts_feed_dbDB: () => openDatabase('posts_feed_db'),
    getjsoncacheDB: () => openDatabase('jsoncache'),
    getresponses_databaseDB: () => openDatabase('responses_database'),
    getrhapsodyDaysReadDb: () => openDatabase('rhapsodyDaysReadDb'),
    getsettings_database: () => openDatabase('settings_database'),
    getuserDB: () => openDatabase('user'),
    getNotesDB: () => openDatabase('notes_db'),
};