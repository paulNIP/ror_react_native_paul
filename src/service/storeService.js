
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
                console.log("Book Categories",res.data.EBOOK_APP.category_list);
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


const getFeaturedBooks = async () => {
  return new Promise((resolve, reject) => {

          axios.get(Strings.BOOKS_URL+'/featured')
            .then((res) => {
              resolve(res.data.response);
              console.log("Featured Response Books",res.data.response);
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
              console.log("Featured Response Books",res.data.EBOOK_APP[0]);
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

              console.log("Meee",res.data.EBOOK_APP[0].languages);
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





export { getBooks,getTranslatedBooks,getAllTranslatedBooks,getLangaugeTranslatedBooks,getFeaturedBooks,
  getCategories,getProsperity,
  getHolySpirit,getDivineHealing,
  getSoulWining,getChildrenDevotional,
  getChistianLiving,getPrayer,getTeenDevotional,
  getKidsBooks,getCategorySelectedBooks
  // getPopularBooks,getTranslatedBooks
 }