import axios from 'axios';
import Strings from '../constants/Strings';
import {DatabaseConnection} from '../database/database-connection';

const jsoncache = DatabaseConnection.getjsoncacheDB();

const getBooks = async () => {
  return new Promise((resolve, reject) => {

          axios.get(Strings.BOOKS_URL+'/fetch')
            .then((res) => {
              resolve(res.data.EBOOK_APP);
              console.log("All Books",res.data.EBOOK_APP);
          })
            .catch((err) => {
              reject(err)
          });
  });
};

const getCategories = async () => {
    const getCat = await checkCache('bookcategories')
    if(getCat){
        return getCat
    }else{
        //fetch the data from live URL
        try {
            const response = await axios.get(`${Strings.BOOKS_URL}/fetch`);
            const categoryData = response.data.EBOOK_APP.category_list;
            await putDataIntoCache('bookcategories', JSON.stringify ( categoryData) );
            return categoryData;
        } catch (error) {
            console.error('bookcategories Failed to get categories', error);
        }
    }
};

const checkCache = (key) => {
    return new Promise((resolve, reject) => {
        jsoncache.transaction((txn) => {
            txn.executeSql(
                'SELECT jsoncontent FROM jsoncache WHERE jsontitle = ? and jsondate = ? order by id desc limit 1',
                [key, getCurrentDate()],
                (tx, results) => {
                    if (results.rows.length > 0) {
                        //cache found
                        const data = results.rows.item(0).jsoncontent;
                        resolve(JSON.parse(data));
                    } else {
                        //cache not found
                        resolve(null);
                    }
                },
                (error) => {
                    console.error('Failed to execute query', error);
                    reject(error);
                },
            );
        });
    });
};

/**
 * Inserts data into the JSON cache if it does not already exist.
 * @param {string} key - The key for the data in the cache.
 * @param {any} data - The data to insert into the cache.
 * @returns {Promise<void>} - A promise that resolves when the data is inserted successfully or rejects with an error.
 */
const putDataIntoCache = async (key, data) => {
    try {
        return jsoncache.transaction((txn) => {
            txn.executeSql(
                'SELECT jsontitle FROM jsoncache WHERE jsontitle = ? and jsondate = ?',
                [key, getCurrentDate()],
                (tx, selectResults) => {
                    if (selectResults.rows.length > 0) {
                        console.log('Data already exists, insertion not needed');
                    } else {
                        txn.executeSql(
                            'INSERT into jsoncache (jsontitle, jsoncontent, jsondate) values(?,?, ?)',
                            [key, data, getCurrentDate() ],
                            (tx, insertResults) => {
                                if (insertResults.rowsAffected > 0) {
                                    console.log('Data inserted successfully');
                                }
                            },
                            (error) => {
                                console.error('Failed to execute query', error);
                            }
                        );
                    }
                },
                (error) => {
                    console.error('Failed to execute query', error);
                }
            );
        });
    } catch (error) {
        console.error('Failed to put data into cache', error);
    }
};


/**
 * Returns the current date in the format "YYYY-MM-DD".
 * @returns {string} The current date in the format "YYYY-MM-DD".
 */
const getCurrentDate=()=>{
    let date = new Date().getDate(),
        month = new Date().getMonth() + 1,
        year = new Date().getFullYear()
    return year + '-' + month + '-' + date;
}


const getProsperity = async () => {
  return new Promise((resolve, reject) => {

          axios.get(Strings.BOOKS_URL+'/fetch')
            .then((res) => {
              resolve(res.data.EBOOK_APP.prosperity);
          })
            .catch((err) => {
              reject(err)
          });
  });
};

const getHolySpirit = async () => {
  return new Promise((resolve, reject) => {

          axios.get(Strings.BOOKS_URL_V2)
            .then((res) => {
                const holyspiritBooks = res.data.EBOOK_APP.find((category) => category.cat_id === 15 );
                if (holyspiritBooks) {
                    resolve(holyspiritBooks);
                }
          })
            .catch((err) => {
              reject(err)
          });
  });
};

const getDivineHealing = async () => {
  return new Promise((resolve, reject) => {

          axios.get(Strings.BOOKS_URL_V2)
            .then((res) => {
                const healingBooks = res.data.EBOOK_APP.find((category) => category.cat_id  === 17 );
                if (healingBooks) {
                    resolve(healingBooks);
                }
          })
            .catch((err) => {
              reject(err)
          });
  });
};

const getSoulWining = async () => {
  return new Promise((resolve, reject) => {

          axios.get(Strings.BOOKS_URL_V2)
            .then((res) => {
                const soulwinningBooks = res.data.EBOOK_APP.find((category) => category.cat_id === 3);
                if (soulwinningBooks) {
                    resolve(soulwinningBooks);
                }
          })
            .catch((err) => {
              reject(err)
          });
  });
};

const getChildrenDevotional = async () => {
  return new Promise((resolve, reject) => {

          axios.get(Strings.BOOKS_URL+'/fetch')
            .then((res) => {
              resolve(res.data.EBOOK_APP.children_devotionals);
          })
            .catch((err) => {
              reject(err)
          });
  });
};

const getChildrenBooks = async () => {
    return new Promise((resolve, reject) => {

        axios.get(Strings.BOOKS_URL_V2)
            .then((res) => {
                const childrenBooks = res.data.EBOOK_APP.find((category) => category.cat_id=== 1);
                if (childrenBooks) {
                    resolve(childrenBooks);
                }
            })
            .catch((err) => {
                reject(err)
            });
    });
};

const getChistianLiving = async () => {
  return new Promise((resolve, reject) => {

          axios.get(Strings.BOOKS_URL_V2)
            .then((res) => {
                const xtianlivingBooks = res.data.EBOOK_APP.find((category) => category.cat_id === 16);
                if (xtianlivingBooks) {
                    resolve(xtianlivingBooks);
                }
          })
            .catch((err) => {
              reject(err)
          });
  });
};

const getFaithProsperity = async () => {
  return new Promise((resolve, reject) => {
          axios.get(Strings.BOOKS_URL_V2)
            .then((res) => {
                const prosperityBooks = res.data.EBOOK_APP.find((category) => category.cat_id === 14 );
                if (prosperityBooks) {
                    resolve(prosperityBooks);
                }
          })
            .catch((err) => {
              reject(err)
          });
  });
};

const getPrayer = async () => {
  return new Promise((resolve, reject) => {

          axios.get(Strings.BOOKS_URL_V2)
            .then((res) => {
                const prayerBooks = res.data.EBOOK_APP.find((category) => category.cat_id === 18 );
                if (prayerBooks) {
                    resolve(prayerBooks);
                }
          })
            .catch((err) => {
              reject(err)
          });
  });
};

const getTeenDevotional = async () => {
  return new Promise((resolve, reject) => {

          axios.get(Strings.BOOKS_URL_V2)
            .then((res) => {
                const teevoBooks = res.data.EBOOK_APP.find((category) => category.cat_id === 19);
                if (teevoBooks) {
                    resolve(teevoBooks);
                }
          })
            .catch((err) => {
              reject(err)
          });
  });
};

export const getAvanziniBooks = async () => {
    return new Promise((resolve, reject) => {

        axios.get(Strings.BOOKS_URL_V2)
            .then((res) => {
                const avanziniBooks = res.data.EBOOK_APP.find((category) => category.cat_id === 30);
                if (avanziniBooks) {
                    resolve(avanziniBooks);
                }
            })
            .catch((err) => {
                reject(err)
            });
    });
};

const getPopularBooks = async () => {
  return new Promise((resolve, reject) => {

          axios.get(Strings.BOOKS_URL+'/fetch')
            .then((res) => {
              resolve(res.data.EBOOK_APP.popular_books);
          })
            .catch((err) => {
              reject(err)
          });
  });
};

const getTranslatedBooks = async () => {
  return new Promise((resolve, reject) => {

          axios.get(Strings.BOOKS_URL+'/store/translated')
            .then((res) => {
              resolve(res.data.EBOOK_APP);
          })
            .catch((err) => {
              reject(err)
          });
  });
};


const getFeaturedBooks = async () => {
  return new Promise((resolve, reject) => {

          axios.get(Strings.BOOKS_URL+'/featured')
            .then((res) => {
              resolve(res.data.response);
              console.log("Books latyests ",res.data.reponse);

          })
            .catch((err) => {
              reject(err)
          });
  });
};

const getKidsBooks = async () => {
  return new Promise((resolve, reject) => {

          axios.get(Strings.BOOKS_URL+'/store/kids')
            .then((res) => {
              resolve(res.data.EBOOK_APP[0]);
          })
            .catch((err) => {
              reject(err)
          });
  });
};




const getEarlyReaders = async () => {
  return new Promise((resolve, reject) => {

          axios.get(Strings.BOOKS_URL+'/store/early-readers')
            .then((res) => {
              resolve(res.data.EBOOK_APP[0]);
          })
            .catch((err) => {
              reject(err)
          });
  });
};


const getDailyDevotionalBooks = async () => {
  return new Promise((resolve, reject) => {

          axios.get(Strings.BOOKS_URL+'/store/devotionals')
            .then((res) => {
              resolve(res.data.EBOOK_APP[0]);
          })
            .catch((err) => {
              reject(err)
          });
  });
};


const getAllTranslatedBooks = async () => {
  return new Promise((resolve, reject) => {

          axios.get(Strings.BOOKS_URL+'/store/translated/all')
            .then((res) => {
              resolve(res.data.EBOOK_APP[0].languages);
          })
            .catch((err) => {
              reject(err)
          });
  });
};



const getLangaugeTranslatedBooks = async (language) => {
  console.log("API Language",language.lang);
  return new Promise((resolve, reject) => {
          axios.post('https://books-api.rhapsodyofrealities.org/books/lang', {
            lang: language.lang
          })
          .then((res) => {
            resolve(res.data.result)
        })
          .catch((err) => {
            reject(err)
        });
  });
};


const getCategorySelectedBooks = async (cat) => {
  return new Promise((resolve, reject) => {
          axios.post('https://books-api.rhapsodyofrealities.org/catfetch', {
            cat_id: cat
          })
          .then((res) => {
            console.log("Category ID",res.data.result);
            resolve(res.data.result)
        })
          .catch((err) => {
            reject(err)
        });
  });
};

const getPrivacyPolicy = async () => {
  return new Promise((resolve, reject) => {

          axios.get(Strings.API_URL+'/app/details')
            .then((res) => {
              resolve(res.data.EBOOK_APP[0].app_privacy_policy);
          })
            .catch((err) => {
              reject(err)
          });
  });
};





export { getBooks,getTranslatedBooks,getAllTranslatedBooks,getLangaugeTranslatedBooks,getFeaturedBooks,
  getCategories,getProsperity,
  getHolySpirit,getDivineHealing,
  getSoulWining,getChildrenDevotional,getChildrenBooks,
  getChistianLiving,getPrayer,getTeenDevotional,
  getKidsBooks,getCategorySelectedBooks,getPrivacyPolicy,
  getEarlyReaders,getDailyDevotionalBooks,getFaithProsperity
  // getPopularBooks,getTranslatedBooks
 }