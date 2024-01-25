
import axios from 'axios';
import Strings from '../constants/Strings';


const getBooks = async () => {
  return new Promise((resolve, reject) => {

          axios.get(Strings.BOOKS_URL+'/fetch')
            .then((res) => {
              resolve(res.data.EBOOK_APP);
          })
            .catch((err) => {
              reject(err)
          });
  });
};

const getCategories = async () => {
    return new Promise((resolve, reject) => {

            axios.get(Strings.BOOKS_URL+'/fetch')
              .then((res) => {
                resolve(res.data.EBOOK_APP.category_list);
            })
              .catch((err) => {
                reject(err)
            });
    });
};

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

          axios.get(Strings.BOOKS_URL+'/fetch')
            .then((res) => {
              resolve(res.data.EBOOK_APP.holy_spirit);
          })
            .catch((err) => {
              reject(err)
          });
  });
};

const getDivineHealing = async () => {
  return new Promise((resolve, reject) => {

          axios.get(Strings.BOOKS_URL+'/fetch')
            .then((res) => {
              resolve(res.data.EBOOK_APP.divine_healing);
          })
            .catch((err) => {
              reject(err)
          });
  });
};

const getSoulWining = async () => {
  return new Promise((resolve, reject) => {

          axios.get(Strings.BOOKS_URL+'/fetch')
            .then((res) => {
              resolve(res.data.EBOOK_APP.soul_wining);
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
const getChistianLiving = async () => {
  return new Promise((resolve, reject) => {

          axios.get(Strings.BOOKS_URL+'/fetch')
            .then((res) => {
              resolve(res.data.EBOOK_APP.christian_living);
          })
            .catch((err) => {
              reject(err)
          });
  });
};

const getPrayer = async () => {
  return new Promise((resolve, reject) => {

          axios.get(Strings.BOOKS_URL+'/fetch')
            .then((res) => {
              resolve(res.data.EBOOK_APP.prayer);
          })
            .catch((err) => {
              reject(err)
          });
  });
};

const getTeenDevotional = async () => {
  return new Promise((resolve, reject) => {

          axios.get(Strings.BOOKS_URL+'/fetch')
            .then((res) => {
              resolve(res.data.EBOOK_APP.teen_devotional);
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

const getAllTranslatedBooks = async () => {
  return new Promise((resolve, reject) => {

          axios.get(Strings.BOOKS_URL+'/store/translated/all')
            .then((res) => {
              resolve(res.data.EBOOK_APP);
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





export { getBooks,getTranslatedBooks,getAllTranslatedBooks,getLangaugeTranslatedBooks
  // ,
  // getCategories,getProsperity,
  // getHolySpirit,getDivineHealing,
  // getSoulWining,getChildrenDevotional,
  // getChistianLiving,getPrayer,getTeenDevotional,
  // getPopularBooks,getTranslatedBooks
 }