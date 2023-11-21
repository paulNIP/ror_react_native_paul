
import axios from 'axios';
import Strings from '../constants/Strings';



const getLatestBooks = async () => {
    return new Promise((resolve, reject) => {

            axios.get(Strings.BOOKS_URL+'/front')
              .then((res) => {
                // console.log(res.data.EBOOK_APP[0].related_books)
                resolve(res.data.EBOOK_APP[0].related_books)
            })
              .catch((err) => {
                reject(err)
            });
    });
};



export { getLatestBooks }